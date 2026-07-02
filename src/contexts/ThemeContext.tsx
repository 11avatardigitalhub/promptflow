"use client";
import { createContext, useContext, useEffect, useState } from "react";
interface ThemeConfig { logo: string; brandName: string; primaryColor: string; }
const ThemeContext = createContext<ThemeConfig>({ logo: "/next.svg", brandName: "PromptFlow AI", primaryColor: "#3B82F6" });
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<ThemeConfig>({ logo: "/next.svg", brandName: "PromptFlow AI", primaryColor: "#3B82F6" });
  useEffect(() => { document.documentElement.style.setProperty("--primary", theme.primaryColor); }, [theme]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
