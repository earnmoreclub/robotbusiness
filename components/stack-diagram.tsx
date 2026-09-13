import { Braces, Check, Cpu, Shield, Sparkles } from "lucide-react";
import { Reveal } from "./reveal";

const customerLayers = [
  [Sparkles, "LLM / VLM API", "Reasoning + action planning"],
  [Cpu, "Computer Vision (CUDA)", "Perception + inference"],
  [Braces, "ROS 2 / Navigation2", "Your autonomy stack"],
] as const;
const managedLayers = ["Motors & Kinematics", "Low-Level Firmware", "Hardware E-Stop Safety"];

export function StackDiagram() {
  return (
    <section id="architecture" className="border-y border-white/[0.06] bg-slate-950/45 py-24 sm:py-32" aria-labelledby="stack-title">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <Reveal>
          <p className="kicker"><span>//</span> SYSTEM_ARCHITECTURE</p>
          <h2 id="stack-title" className="section-title">Bring your own algorithm.</h2>
          <p className="section-copy">We abstract the failure-prone hardware layer without boxing in your software. Build where your team creates differentiated IP.</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-400">
            {["Root access to the application computer", "Native ROS graph and topic access", "Enforced safety below your code layer"].map(item => <li key={item} className="flex gap-3"><Check className="size-4 shrink-0 text-blue-400" />{item}</li>)}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="stack-frame">
            <div className="stack-label active"><span>Your Code &amp; Algorithms</span><span>YOU OWN THIS LAYER</span></div>
            <div className="space-y-2 p-3 sm:p-5">
              {customerLayers.map(([Icon, title, detail], index) => (
                <div className="stack-layer customer" key={title} style={{ marginInline: `${index * 10}px` }}>
                  <Icon /><strong>{title}</strong><span>{detail}</span>
                </div>
              ))}
            </div>
            <div className="stack-interface"><span>ROS 2 DDS INTERFACE</span><i /><span>LOCAL NETWORK · &lt;12MS</span></div>
            <div className="space-y-2 p-3 opacity-70 sm:p-5">
              {managedLayers.map((title, index) => <div className="stack-layer managed" key={title}><Shield /><strong>{title}</strong><span>BR_MANAGED_0{index + 1}</span></div>)}
            </div>
            <div className="stack-label"><span>Managed by Big Rocket</span><span>HARDWARE SLA INCLUDED</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}