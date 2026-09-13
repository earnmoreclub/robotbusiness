"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

const links = [["Fleet", "#fleet"], ["Architecture", "#architecture"], ["Simulator", "#simulator"], ["Docs / SDK", "#docs"], ["Pricing", "#pricing"]];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#05070b]/80 backdrop-blur-xl">
      <div className="section-shell flex h-[68px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} className="nav-link">{label}</a>)}
        </nav>
        <a href="#intake" className="button-primary button-glow hidden lg:inline-flex">Request Dev Kit <span aria-hidden="true">↗</span></a>
        <button type="button" className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && <nav className="border-t border-white/[0.07] bg-[#070a10] px-5 pb-5 pt-2 lg:hidden" aria-label="Mobile navigation">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-white/[0.06] py-3.5 text-sm text-slate-300">{label}</a>)}
        <a href="#intake" onClick={() => setOpen(false)} className="button-primary mt-5 w-full">Request Dev Kit</a>
      </nav>}
    </header>
  );
}