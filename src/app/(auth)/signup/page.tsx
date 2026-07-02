"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        email: email,
        name: name,
        role: "user",
        createdAt: new Date().toISOString(),
        promptsUsed: 0,
        quotaRemaining: 100,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account ðŸš€</h1>
        <p className="text-gray-500 text-center mb-6">Join PromptFlow AI - Free</p>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="password" placeholder="Password (6+ characters)" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500">
          Already have account? <Link href="/login" className="text-blue-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
