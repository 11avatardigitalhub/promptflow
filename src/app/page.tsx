import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <h1 className="text-6xl font-bold mb-4">ðŸš€ PromptFlow AI</h1>
      <p className="text-xl mb-8">AI Prompt Engineering Platform - 100% Free</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
          Login
        </Link>
        <Link href="/signup" className="px-8 py-3 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white/10">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
