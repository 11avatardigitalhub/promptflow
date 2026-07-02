"use client";
import { useState } from "react";
import { callDeepSeek } from "@/lib/ai/deepseek";
import { callGemini } from "@/lib/ai/gemini";

export default function PromptFlowPage() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<"deepseek" | "gemini">("deepseek");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = model === "deepseek" ? await callDeepSeek(prompt) : await callGemini(prompt);
      setOutput(result);
      setStep(3);
    } catch (err) {
      setOutput("Error generating response");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Prompt Flow ðŸš€</h1>

      {step === 1 && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold">What do you want to create?</h2>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your problem or task here..." />
          <div className="flex gap-3">
            <button onClick={() => setModel("deepseek")}
              className={`px-4 py-2 rounded-lg ${model === "deepseek" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
              ðŸ¤– DeepSeek (Free)
            </button>
            <button onClick={() => setModel("gemini")}
              className={`px-4 py-2 rounded-lg ${model === "gemini" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
              ðŸ§  Gemini (Free)
            </button>
          </div>
          <button onClick={handleGenerate} disabled={!prompt || loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
            {loading ? "Generating..." : "Generate â†’"}
          </button>
        </div>
      )}

      {step === 3 && output && (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold">Output âœ…</h2>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">{output}</div>
          <button onClick={() => setStep(1)} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            New Prompt
          </button>
        </div>
      )}
    </div>
  );
}
