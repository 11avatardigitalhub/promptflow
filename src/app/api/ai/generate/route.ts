import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, model } = await request.json();

    if (model === "deepseek") {
      const apiKey = process.env.DEEPSEEK_API_KEY || "";
      
      if (!apiKey) {
        return NextResponse.json({ output: "Error: DeepSeek API key not set in Vercel environment variables." });
      }

      const res = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "user", content: prompt },
          ],
          stream: false,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return NextResponse.json({ output: `DeepSeek Error ${res.status}: ${JSON.stringify(data)}` });
      }
      
      return NextResponse.json({ output: data.choices?.[0]?.message?.content || "No content in response" });
    }

    return NextResponse.json({ output: "Model not supported yet" });
  } catch (error: any) {
    return NextResponse.json({ output: "Error: " + error.message });
  }
}