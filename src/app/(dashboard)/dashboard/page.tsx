"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const { userData, loading } = useAuthContext();

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-6">
        <h1 className="text-3xl font-bold">Welcome, {userData?.name || "User"}! ðŸ‘‹</h1>
        <p className="mt-2 opacity-90">Let's create amazing AI prompts today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Prompts Used</p>
          <p className="text-3xl font-bold">{userData?.promptsUsed || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Quota Remaining</p>
          <p className="text-3xl font-bold">{userData?.quotaRemaining || 100}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Role</p>
          <p className="text-xl font-bold capitalize">{userData?.role || "User"}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/prompt-flow" className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100">ðŸš€ New Prompt</Link>
          <Link href="/history" className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100">ðŸ“ History</Link>
          <Link href="/settings" className="p-4 bg-purple-50 rounded-xl text-center hover:bg-purple-100">âš™ï¸ Settings</Link>
          <Link href="/team" className="p-4 bg-orange-50 rounded-xl text-center hover:bg-orange-100">ðŸ‘¥ Team</Link>
        </div>
      </div>
    </div>
  );
}
