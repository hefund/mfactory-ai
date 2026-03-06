require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { OpenAI } = require('openai');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database(process.env.DATABASE_PATH || './database.db');

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password_hash TEXT,
    subscription_tier TEXT DEFAULT 'free',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Analysis history table
  db.run(`CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    stock_symbol TEXT,
    analysis_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Stock cache table (store fetched stock data)
  db.run(`CREATE TABLE IF NOT EXISTS stock_cache (
    symbol TEXT PRIMARY KEY,
    data TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// DeepSeek AI client (OpenAI compatible API)
const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
});

// Alpha Vantage API base URL
const ALPHA_VANTAGE_BASE = 'https://www.alphavantage.co/query';

// Helper function to fetch stock data
async function fetchStockData(symbol) {
  // Check cache first
  return new Promise((resolve, reject) => {
    db.get('SELECT data, updated_at FROM stock_cache WHERE symbol = ?', [symbol], async (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      // If cache exists and is less than 1 hour old, use it
      if (row && (Date.now() - new Date(row.updated_at).getTime() < 3600000)) {
        resolve(JSON.parse(row.data));
        return;
      }

      // Otherwise fetch from API
      try {
        const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
        if (!apiKey) {
          // Fallback to mock data if no API key
          console.warn('ALPHA_VANTAGE_API_KEY not set, using mock data');
          const mockData = generateMockData(symbol);
          // Cache mock data
          db.run('INSERT OR REPLACE INTO stock_cache (symbol, data) VALUES (?, ?)', 
            [symbol, JSON.stringify(mockData)]);
          resolve(mockData);
          return;
        }

        // Fetch real data from Alpha Vantage
        const response = await axios.get(ALPHA_VANTAGE_BASE, {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol: symbol,
            apikey: apiKey
          }
        });

        const quote = response.data['Global Quote'];
        if (!quote) {
          throw new Error('No quote data returned');
        }

        const stockData = {
          symbol: symbol,
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: quote['10. change percent'],
          volume: parseInt(quote['06. volume']),
          latestTradingDay: quote['07. latest trading day']
        };

        // Cache the data
        db.run('INSERT OR REPLACE INTO stock_cache (symbol, data) VALUES (?, ?)', 
          [symbol, JSON.stringify(stockData)]);

        resolve(stockData);
      } catch (error) {
        console.error('Error fetching stock data:', error.message);
        // Fallback to mock data
        const mockData = generateMockData(symbol);
        resolve(mockData);
      }
    });
  });
}

// Generate mock data for demonstration
function generateMockData(symbol) {
  const mockPrices = {
    '300124': { price: 68.50, change: 2.3, name: '汇川技术' },
    '002747': { price: 42.80, change: 1.5, name: '埃斯顿' },
    '600519': { price: 1850.00, change: -0.5, name: '贵州茅台' },
    '00700': { price: 385.20, change: 2.1, name: '腾讯控股' },
  };

  const defaultData = { price: 100.00, change: 0.0, name: 'Unknown Company' };
  const data = mockPrices[symbol] || defaultData;

  return {
    symbol: symbol,
    price: data.price,
    change: data.change,
    changePercent: ((data.change / data.price) * 100).toFixed(2) + '%',
    volume: Math.floor(Math.random() * 10000000),
    latestTradingDay: new Date().toISOString().split('T')[0],
    companyName: data.name
  };
}

// Generate AI analysis using DeepSeek
async function generateAIAnalysis(stockSymbol, stockData) {
  try {
    // 简化提示词（方案B）
    const prompt = `简要分析股票 ${stockSymbol} 的投资价值，不超过100字。`;

    // 使用Promise.race添加超时控制
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('DeepSeek API timeout after 25 seconds')), 25000);
    });

    const completionPromise = openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "你是一名专业的股票投资分析师，擅长制造业公司分析。" },
        { role: "user", content: prompt }
      ],
      max_tokens: 150, // 减少token数量
      temperature: 0.7,
      timeout: 30000, // SDK层面的超时
    });

    const completion = await Promise.race([completionPromise, timeoutPromise]);
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI analysis:', error.message);
    return `由于技术原因，无法生成AI分析。以下是基础分析：${stockData.companyName || stockSymbol} 当前股价 ${stockData.price}，今日涨跌 ${stockData.changePercent}。建议关注公司基本面和技术面分析。`;
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get stock data and analysis
app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    
    // Fetch stock data
    const stockData = await fetchStockData(symbol);
    
    // Generate AI analysis
    const analysis = await generateAIAnalysis(symbol, stockData);
    
    // Return combined response
    res.json({
      success: true,
      symbol: symbol,
      stockData: stockData,
      analysis: analysis,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in stock endpoint:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Save analysis to history (requires authentication)
app.post('/api/analysis/save', (req, res) => {
  // For now, mock authentication
  const { userId, stockSymbol, analysisText } = req.body;
  
  if (!userId || !stockSymbol || !analysisText) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  db.run(
    'INSERT INTO analyses (user_id, stock_symbol, analysis_text) VALUES (?, ?, ?)',
    [userId, stockSymbol, analysisText],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ 
        success: true, 
        analysisId: this.lastID 
      });
    }
  );
});

// User registration
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }

  // Simple password hash (in production, use bcrypt)
  const passwordHash = Buffer.from(password).toString('base64');
  
  db.run(
    'INSERT INTO users (email, password_hash) VALUES (?, ?)',
    [email, passwordHash],
    function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ success: false, error: 'Email already exists' });
        }
        return res.status(500).json({ success: false, error: err.message });
      }
      
      res.json({ 
        success: true, 
        userId: this.lastID,
        message: 'User registered successfully'
      });
    }
  );
});

// User login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }

  const passwordHash = Buffer.from(password).toString('base64');
  
  db.get(
    'SELECT id, email, subscription_tier FROM users WHERE email = ? AND password_hash = ?',
    [email, passwordHash],
    (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
      
      // In production, generate JWT token
      res.json({
        success: true,
        userId: user.id,
        email: user.email,
        subscriptionTier: user.subscription_tier,
        token: 'mock-jwt-token-' + user.id
      });
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`MFactory AI backend server running on port ${port}`);
});