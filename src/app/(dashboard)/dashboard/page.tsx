"use client";
import { useState } from "react";

const GEMINI_KEY = "AQ.Ab8RN6JSnY_APcfQxHIPOLU7h5VWJzc9LgdjoyBXzEFTACmkig";

export default function PromptFlowPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await res.json();
      setOutput(data.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data));
    } catch (e: any) {
      setOutput("Error: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Prompt Flow 🚀</h1>
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-40 p-4 border rounded-lg" placeholder="Describe your problem..." />
        <button onClick={generate} disabled={!prompt || loading}
          className="px-6 py-3 bg-green-600 text-white rounded-lg disabled:opacity-50">
          {loading ? "Generating..." : "Generate with Gemini →"}
        </button>
      </div>
      {output && (
        <div className="bg-white p-6 rounded-xl shadow mt-6">
          <h2 className="text-xl font-semibold mb-2">Output ✅</h2>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{output}</div>
        </div>
      )}
    </div>
  );
}