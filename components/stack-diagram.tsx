import { Braces, Check, Cpu, Shield, Sparkles } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage } from "./language-provider";

const customerLayers = [
  [Sparkles, "LLM / VLM API", "Reasoning + action planning"],
  [Cpu, "Computer Vision (CUDA)", "Perception + inference"],
  [Braces, "ROS 2 / Navigation2", "Your autonomy stack"],
] as const;
const managedLayers = ["Motors & Kinematics", "Low-Level Firmware", "Hardware E-Stop Safety"];

export function StackDiagram() {
  const { language } = useLanguage(); const zh = language === "zh-Hant";
  return (
    <section id="architecture" className="border-y border-white/[0.06] bg-slate-950/45 py-24 sm:py-32" aria-labelledby="stack-title">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <Reveal>
          <p className="kicker"><span>//</span> SYSTEM_ARCHITECTURE</p>
          <h2 id="stack-title" className="section-title">{zh ? "帶上你自己的演算法。" : "Bring your own algorithm."}</h2>
          <p className="section-copy">{zh ? "我們抽象化容易故障的硬體層，卻不限制你的軟體。在團隊能創造差異化 IP 的地方建構。" : "We abstract the failure-prone hardware layer without boxing in your software. Build where your team creates differentiated IP."}</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-400">
            {(zh ? ["應用程式電腦的 Root 存取權", "原生 ROS graph 與 topic 存取", "在程式碼層之下強制執行安全機制"] : ["Root access to the application computer", "Native ROS graph and topic access", "Enforced safety below your code layer"]).map(item => <li className="flex gap-3" key={item}><Check className="size-4 shrink-0 text-blue-400" />{item}</li>)}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="stack-frame">
            <div className="stack-label active"><span>{zh ? "你的程式碼與演算法" : "Your Code & Algorithms"}</span><span>{zh ? "此層由你掌控" : "YOU OWN THIS LAYER"}</span></div>
            <div className="space-y-2 p-3 sm:p-5">
              {(zh ? [[Sparkles, "LLM / VLM API", "推理與行動規劃"], [Cpu, "Computer Vision (CUDA)", "感知與推論"], [Braces, "ROS 2 / Navigation2", "你的自主系統堆疊"]] as const : customerLayers).map(([Icon, title, detail], index) => (
                <div className="stack-layer customer" key={title} style={{ marginInline: `${index * 10}px` }}>
                  <Icon /><strong>{title}</strong><span>{detail}</span>
                </div>
              ))}
            </div>
            <div className="stack-interface"><span>ROS 2 DDS INTERFACE</span><i /><span>LOCAL NETWORK · &lt;12MS</span></div>
            <div className="space-y-2 p-3 opacity-70 sm:p-5">
              {(zh ? ["馬達與運動學", "底層韌體", "硬體急停安全"] : managedLayers).map((title, index) => <div className="stack-layer managed" key={title}><Shield /><strong>{title}</strong><span>BR_MANAGED_0{index + 1}</span></div>)}
            </div>
            <div className="stack-label"><span>{zh ? "由 Big Rocket 管理" : "Managed by Big Rocket"}</span><span>{zh ? "包含硬體 SLA" : "HARDWARE SLA INCLUDED"}</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}