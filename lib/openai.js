import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';

const openai = new ChatOpenAI({
  model: "deepseek/deepseek-r1:free",
  configuration: {
    baseURL: "https://openrouter.ai/api/v1/",
  },
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function generateBulletPoints(text) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    const completion = await openai.invoke([
      new SystemMessage("You are a resume expert. Return ONLY bullet points formatted like: - Point one\n- Point two"),
      new HumanMessage(`Convert this experience into 3 professional bullet points:\n${text}`)
    ]);

    const content = completion.content;
    const bulletPoints = content
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(point => point.trim());

    if (bulletPoints.length === 0) {
      console.error('No bullet points in response:', content);
      throw new Error('No bullet points were generated');
    }

    return bulletPoints;
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    throw new Error(`Failed to generate bullet points: ${error.message}`);
  }
}