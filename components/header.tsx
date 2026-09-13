"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageToggle, useLanguage } from "./language-provider";
import { Logo } from "./logo";

const copy = {
  en: {
    links: [["Fleet", "#fleet"], ["Architecture", "#architecture"], ["Simulator", "#simulator"], ["Docs / SDK", "#docs"], ["Pricing", "#pricing"]],
    request: "Request Dev Kit",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    open: "Open navigation menu",
    close: "Close navigation menu",
  },
  "zh-Hant": {
    links: [["硬體陣容", "#fleet"], ["系統架構", "#architecture"], ["模擬器", "#simulator"], ["文件 / SDK", "#docs"], ["租賃方案", "#pricing"]],
    request: "申請開發套件",
    mainNav: "主要導覽",
    mobileNav: "行動版導覽",
    open: "開啟導覽選單",
    close: "關閉導覽選單",
  },
} as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const text = copy[language];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#05070b]/80 backdrop-blur-xl">
      <div className="section-shell flex h-[68px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label={text.mainNav}>
          {text.links.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle compact />
          <a href="#intake" className="button-primary button-glow hidden lg:inline-flex">{text.request} <span aria-hidden="true">↗</span></a>
          <button type="button" className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden" aria-label={open ? text.close : text.open} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && <nav className="border-t border-white/[0.07] bg-[#070a10] px-5 pb-5 pt-2 lg:hidden" aria-label={text.mobileNav}>
        {text.links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-white/[0.06] py-3.5 text-sm text-slate-300">{label}</a>)}
        <a href="#intake" onClick={() => setOpen(false)} className="button-primary mt-5 w-full">{text.request}</a>
      </nav>}
    </header>
  );
}