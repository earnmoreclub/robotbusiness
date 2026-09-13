"use client";

import { useLanguage } from "./language-provider";

export function Logo() {
  const { language } = useLanguage();
  return (
    <a href="#top" className="group inline-flex items-center gap-2.5" aria-label={language === "en" ? "Big Rocket home" : "Big Rocket 首頁"}>
      <span className="logo-mark" aria-hidden="true"><i /><i /></span>
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">Big Rocket</span>
    </a>
  );
}