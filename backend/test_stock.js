const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: 'sk-50aacd7d318a4b72ad5698bf6251bc55',
  baseURL: 'https://api.deepseek.com/v1',
});

async function test() {
  console.log('Testing DeepSeek API with stock analysis prompt...');
  try {
    const prompt = `你是一名专业的投资分析师。请分析股票 300675 (未知公司)，当前价格 100.00，涨跌幅 0.00%。请提供一份简洁的投资分析报告，包括：
1. 行业地位分析
2. 财务表现评价
3. 增长驱动因素
4. 主要风险提示
5. 投资建议

请用中文回复，使用清晰的段落，每点用数字标出。`;

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "你是一名专业的股票投资分析师，擅长制造业公司分析。" },
        { role: "user", content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });
    
    console.log('Success! Response length:', completion.choices[0].message.content.length);
    console.log('First 200 chars:', completion.choices[0].message.content.substring(0, 200));
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Full error:', error);
  }
}

// Set timeout
setTimeout(() => {
  console.log('Timeout after 60 seconds');
  process.exit(1);
}, 60000);

test();