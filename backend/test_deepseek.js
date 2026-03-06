const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: 'sk-50aacd7d318a4b72ad5698bf6251bc55',
  baseURL: 'https://api.deepseek.com/v1',
});

async function test() {
  console.log('Testing DeepSeek API...');
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Say 'Hello, World!' in Chinese" }
      ],
      max_tokens: 50,
      temperature: 0.7,
    });
    
    console.log('Success! Response:', completion.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Full error:', error);
  }
}

// Set timeout
setTimeout(() => {
  console.log('Timeout after 30 seconds');
  process.exit(1);
}, 30000);

test();