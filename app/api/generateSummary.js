// app/api/generateSummary.js
import { generateBulletPoints } from "../../lib/openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { experience } = req.body;
  if (!experience) {
    return res.status(400).json({ message: "Experience is required" });
  }
  const summary = await generateBulletPoints(experience);
  return res.status(200).json({ summary });
}