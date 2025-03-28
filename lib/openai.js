export async function generateBulletPoints(text) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000", 
        "X-Title": "Resume Builder",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat", 
        messages: [
          {
            role: "system",
            content: "You are a resume expert. Return ONLY bullet points formatted like: - Point one\n- Point two"
          },
          {
            role: "user",
            content: `Convert this experience into 3 professional bullet points: ${text}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await response.json();
    console.log("API Response:", data); 
    
    const content = data.choices[0]?.message?.content;
    return content.split('\n').filter(line => line.trim().startsWith('-'));
    
  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw error;
  }
}