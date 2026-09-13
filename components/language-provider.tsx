"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "zh-Hant";

const STORAGE_KEY = "big-rocket-language";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "zh-Hant") setLanguage(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
    document.title = language === "en"
      ? "Big Rocket | ROS-Ready Hardware as a Service"
      : "Big Rocket | ROS 即用型機器人硬體租賃服務";
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const label = language === "en" ? "Language" : "語言";

  return (
    <div className={`language-toggle ${compact ? "compact" : ""}`} role="group" aria-label={label}>
      <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
      <button type="button" className={language === "zh-Hant" ? "active" : ""} aria-pressed={language === "zh-Hant"} onClick={() => setLanguage("zh-Hant")}>繁中</button>
    </div>
  );
}