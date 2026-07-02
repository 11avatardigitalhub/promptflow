"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface UserData { uid: string; email: string; name: string; role: string; promptsUsed: number; quotaRemaining: number; }
interface AuthContextType { user: User | null; userData: UserData | null; loading: boolean; }

const AuthContext = createContext<AuthContextType>({ user: null, userData: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);
      if (fbUser) {
        const snap = await getDoc(doc(db, "users", fbUser.uid));
        if (snap.exists()) setUserData(snap.data() as UserData);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return <AuthContext.Provider value={{ user, userData, loading }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
