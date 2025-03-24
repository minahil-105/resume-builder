// lib/openai.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateBulletPoints(text) {
  const response = await openai.Completions.create({
    model: "text-davinci-003",
    prompt: `Generate professional resume bullet points for: ${text}`,
    max_tokens: 100,
  });
  return response.choices[0].text.trim().split("\n");
}