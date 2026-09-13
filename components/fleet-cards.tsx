"use client";

import { ArrowUpRight, Check, Radio, ScanLine } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./reveal";

type Tab = "Mechanical" | "Compute & Sensors" | "Software";
const tabs: Tab[] = ["Mechanical", "Compute & Sensors", "Software"];
const fleet = [
  { name: "AgileX Scout Mini", code: "BR-AMR-01", type: "AMR", visual: "amr", description: "Differential-drive development base for navigation, mapping, and autonomous inspection.", specs: { Mechanical: [["Payload", "50 kg"], ["Run time", "4 hr"], ["IP rating", "IP22"]], "Compute & Sensors": [["Compute", "Jetson Orin Nano"], ["LiDAR", "Ouster OS0"], ["Vision", "RealSense D455"]], Software: [["OS", "Ubuntu 22.04"], ["ROS", "ROS 2 Humble"], ["Simulation", "Gazebo + RViz"]] } },
  { name: "Unitree Go2 Pro", code: "BR-DOG-01", type: "QUADRUPED", visual: "dog", description: "Agile locomotion platform for terrain adaptation, embodied AI, and perception research.", specs: { Mechanical: [["Payload", "8 kg"], ["Run time", "2–4 hr"], ["IP rating", "IP54"]], "Compute & Sensors": [["Compute", "Jetson Orin NX"], ["LiDAR", "Hesai XT16"], ["Vision", "Depth + fisheye"]], Software: [["OS", "Ubuntu 22.04"], ["ROS", "ROS 2 Humble"], ["Control", "Low-level SDK"]] } },
  { name: "UR5e Cobot Arm", code: "BR-ARM-01", type: "6-AXIS", visual: "arm", description: "Collaborative manipulator for force control, visual grasping, and automation PoCs.", specs: { Mechanical: [["Payload", "5 kg"], ["Reach", "850 mm"], ["Repeatability", "±0.03 mm"]], "Compute & Sensors": [["Control", "UR Control Box"], ["Force", "6-axis F/T"], ["Vision", "RealSense D435"]], Software: [["OS", "Ubuntu 22.04"], ["ROS", "ROS 2 Humble"], ["Planning", "MoveIt 2"]] } },
] as const;

function ProductVisual({ type }: { type: string }) {
  return <div className="product-visual" role="img" aria-label={`${type} technical product rendering`}><span className="visual-live"><Radio className="size-3" /> UNIT READY</span><ScanLine className="visual-scan" />
    {type === "amr" && <svg viewBox="0 0 400 210"><path d="M86 93 135 57h147l43 35-17 66H102Z" className="machine-fill"/><path d="M112 88h181l-12 42H123Z" fill="#172033" stroke="#64748b"/><rect x="158" y="35" width="91" height="29" rx="8" className="machine-fill"/><ellipse cx="202" cy="36" rx="42" ry="9" fill="#60a5fa"/><circle cx="125" cy="157" r="30"/><circle cx="286" cy="157" r="30"/></svg>}
    {type === "dog" && <svg viewBox="0 0 400 210"><path d="M95 69h200l35 31-25 43H118L78 111Z" className="machine-fill"/><circle cx="295" cy="97" r="14" fill="#020617" stroke="#60a5fa" strokeWidth="3"/><path d="m119 137-31 54m72-50-15 51m145-51 17 51m-2-56 47 52" fill="none" stroke="#94a3b8" strokeWidth="13" strokeLinecap="round"/><path d="M71 193h32m28 0h29m133 0h30m18-3h33" stroke="#3b82f6" strokeWidth="8"/></svg>}
    {type === "arm" && <svg viewBox="0 0 400 210"><ellipse cx="202" cy="188" rx="75" ry="17" className="machine-fill"/><path d="M201 180v-52l-39-29 24-54 25 9-15 39 42 31-12 61" fill="none" stroke="#94a3b8" strokeWidth="28" strokeLinecap="round"/><circle cx="174" cy="99" r="17" fill="#2563eb"/><circle cx="200" cy="51" r="16" fill="#2563eb"/><path d="m210 44 53-18" stroke="#94a3b8" strokeWidth="18" strokeLinecap="round"/></svg>}
  </div>;
}

function FleetCard({ robot }: { robot: typeof fleet[number] }) {
  const [active, setActive] = useState<Tab>("Mechanical");
  return <article className="fleet-card"><ProductVisual type={robot.visual}/><div className="p-5 sm:p-6"><div className="flex justify-between font-mono text-[10px]"><span className="text-blue-400">{robot.code} · {robot.type}</span><span className="text-emerald-400">● AVAILABLE</span></div><h3 className="mt-3 text-xl font-semibold text-white">{robot.name}</h3><p className="mt-3 min-h-[60px] text-sm leading-6 text-slate-400">{robot.description}</p><div className="spec-tabs mt-5" role="tablist">{tabs.map(tab => <button role="tab" aria-selected={active === tab} type="button" key={tab} className={active === tab ? "active" : ""} onClick={() => setActive(tab)}>{tab}</button>)}</div><motion.dl key={active} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className="spec-list">{robot.specs[active].map(([label,value]) => <div key={label}><dt>{label}</dt><dd><Check/>{value}</dd></div>)}</motion.dl><a href="#intake" className="mt-5 flex items-center justify-between border-t border-white/[.07] pt-5 text-sm text-slate-300 hover:text-blue-400">Request this platform <ArrowUpRight className="size-4"/></a></div></article>;
}

export function FleetCards() {
  return <section id="fleet" className="border-y border-white/[.06] bg-slate-950/45 py-24 sm:py-32" aria-labelledby="fleet-title"><div className="section-shell"><Reveal><div className="section-heading"><p className="kicker"><span>//</span> HARDWARE_FLEET</p><h2 id="fleet-title">Real platforms. Root-level access.</h2><p className="section-copy">Choose the machine that matches your workload. Every unit arrives calibrated, safety-limited, and ready to join your ROS graph.</p></div></Reveal><div className="mt-12 grid gap-5 lg:grid-cols-3">{fleet.map((robot,index) => <Reveal key={robot.code} delay={index * .08}><FleetCard robot={robot}/></Reveal>)}</div></div></section>;
}