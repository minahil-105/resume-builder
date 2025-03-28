import { generateBulletPoints } from "../../../lib/openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { experience } = await request.json();
    
    if (!experience) {
      return NextResponse.json(
        { message: "Experience is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { 
          message: "OpenRouter API key is not configured",
          error: "Please add OPENROUTER_API_KEY to your .env.local file"
        },
        { status: 500 }
      );
    }

    const summary = await generateBulletPoints(experience);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { 
        message: "Failed to generate suggestions",
        error: error.message || "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}