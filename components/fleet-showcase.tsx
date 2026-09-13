"use client";

import { ArrowUpRight, Box, Bot, Radio, ScanLine } from "lucide-react";
import { useState } from "react";

type Category = "All" | "Mobile Chassis (AMR)" | "Quadrupeds" | "Cobots";
const filters: Category[] = ["All", "Mobile Chassis (AMR)", "Quadrupeds", "Cobots"];
const fleet: { name: string; code: string; category: Exclude<Category, "All">; description: string; specs: string[]; visual: "amr" | "dog" | "arm" }[] = [
  { name: "AgileX Scout Mini", code: "BR-AMR-01", category: "Mobile Chassis (AMR)", description: "Compact 4WD differential mobile base for SLAM, navigation, and autonomous inspection stacks.", specs: ["4WD DIFF", "ROS 1 / ROS 2", "50 KG PAYLOAD", "LIDAR INCLUDED"], visual: "amr" },
  { name: "Unitree Go2 Pro", code: "BR-DOG-01", category: "Quadrupeds", description: "Agile quadruped platform for locomotion research, perception, and terrain adaptation RL testing.", specs: ["QUADRUPED", "3D LIDAR", "JETSON ORIN", "RL READY"], visual: "dog" },
  { name: "UR5e Cobot Arm", code: "BR-ARM-01", category: "Cobots", description: "Six-axis collaborative manipulator for visual grasping, force control, and manipulation research.", specs: ["6-AXIS", "F/T SENSORS", "5 KG PAYLOAD", "VISION READY"], visual: "arm" },
];

function ProductVisual({ type }: { type: "amr" | "dog" | "arm" }) {
  return <div className="product-visual" role="img" aria-label={`${type} technical product rendering`}>
    <span className="visual-live"><Radio className="size-3" /> UNIT READY</span><ScanLine className="visual-scan" />
    {type === "amr" && <svg viewBox="0 0 400 210"><path d="M86 93 135 57h147l43 35-17 66H102Z" className="machine-fill"/><path d="M112 88h181l-12 42H123Z" fill="#172033" stroke="#64748b"/><rect x="158" y="35" width="91" height="29" rx="8" className="machine-fill"/><ellipse cx="202" cy="36" rx="42" ry="9" fill="#60a5fa" opacity=".8"/><circle cx="125" cy="157" r="30"/><circle cx="286" cy="157" r="30"/><circle cx="125" cy="157" r="14" fill="#334155"/><circle cx="286" cy="157" r="14" fill="#334155"/></svg>}
    {type === "dog" && <svg viewBox="0 0 400 210"><path d="M95 69h200l35 31-25 43H118L78 111Z" className="machine-fill"/><circle cx="295" cy="97" r="14" fill="#020617" stroke="#60a5fa" strokeWidth="3"/><path d="m119 137-31 54m72-50-15 51m145-51 17 51m-2-56 47 52" fill="none" stroke="#94a3b8" strokeWidth="13" strokeLinecap="round"/><path d="M71 193h32m28 0h29m133 0h30m18-3h33" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round"/></svg>}
    {type === "arm" && <svg viewBox="0 0 400 210"><ellipse cx="202" cy="188" rx="75" ry="17" className="machine-fill"/><path d="M201 180v-52l-39-29 24-54 25 9-15 39 42 31-12 61" fill="none" stroke="#94a3b8" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round"/><circle cx="174" cy="99" r="17" fill="#2563eb"/><circle cx="200" cy="51" r="16" fill="#2563eb"/><path d="m210 44 53-18" stroke="#94a3b8" strokeWidth="18" strokeLinecap="round"/><path d="m266 26 18-13m-18 13 22 5" stroke="#60a5fa" strokeWidth="7" strokeLinecap="round"/></svg>}
  </div>;
}

export function FleetShowcase() {
  const [active, setActive] = useState<Category>("All");
  const visible = active === "All" ? fleet : fleet.filter(item => item.category === active);
  return <section id="fleet" className="border-y border-white/[0.06] bg-slate-950/50 py-24 sm:py-32" aria-labelledby="fleet-title">
    <div className="section-shell">
      <div className="section-heading"><p className="kicker"><span>//</span> HARDWARE_FLEET</p><h2 id="fleet-title">Production hardware. Developer access.</h2><p className="section-copy">Test against the platforms your autonomy stack will actually run on. Every unit is maintained, calibrated, and ready for code.</p></div>
      <div className="mt-10 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter hardware fleet">
        {filters.map(filter => <button key={filter} type="button" role="tab" aria-selected={active === filter} onClick={() => setActive(filter)} className={`filter-tab ${active === filter ? "active" : ""}`}>{filter}</button>)}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {visible.map(item => <article key={item.code} className="fleet-card">
          <ProductVisual type={item.visual} />
          <div className="p-6"><div className="flex items-center justify-between"><span className="font-mono text-[10px] tracking-widest text-blue-400">{item.code}</span><span className="flex items-center gap-1.5 text-[10px] text-emerald-400"><i className="size-1.5 rounded-full bg-emerald-400" /> IN STOCK</span></div><h3 className="mt-3 text-xl font-semibold text-white">{item.name}</h3><p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">{item.description}</p><div className="mt-5 grid grid-cols-2 gap-2">{item.specs.map(spec => <span key={spec} className="spec"><Box className="size-3" /> {spec}</span>)}</div><a href="#intake" className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5 text-sm font-medium text-slate-300 transition hover:text-blue-400">View datasheet <ArrowUpRight className="size-4" /></a></div>
        </article>)}
      </div>
      {visible.length === 1 && <button className="mx-auto mt-8 flex items-center gap-2 text-sm text-slate-500 hover:text-white" onClick={() => setActive("All")}><Bot className="size-4" /> Show all platforms</button>}
    </div>
  </section>;
}