import { ArrowRight, Code2, LockKeyhole } from "lucide-react";
import { Reveal } from "./reveal";
import { useLanguage } from "./language-provider";

const code = [
  { content: <><span className="syntax-purple">import</span> <span className="syntax-blue">bigrocket</span></> },
  { content: "" },
  { content: <span className="syntax-muted"># Initialize leased hardware via local network</span> },
  { content: <>robot <span className="syntax-purple">=</span> bigrocket.<span className="syntax-blue">connect</span>(</> },
  { content: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-green">&quot;BR-DOG-01&quot;</span>, auth_token<span className="syntax-purple">=</span><span className="syntax-green">&quot;sk_test_123&quot;</span></> },
  { content: <>)</> },
  { content: <>robot.<span className="syntax-blue">enable_safety_override</span>(<span className="syntax-orange">False</span>)</> },
  { content: <>robot.cmd_vel.<span className="syntax-blue">publish</span>(linear<span className="syntax-purple">=</span><span className="syntax-orange">1.5</span>, angular<span className="syntax-purple">=</span><span className="syntax-orange">0.0</span>)</> },
];

export function CodeBlock() {
  const { language } = useLanguage();
  const zh = language === "zh-Hant";
  return (
    <section id="docs" className="section-shell scroll-mt-20 py-24 sm:py-32" aria-labelledby="integration-title">
      <Reveal className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="kicker"><span>//</span> SDK_INTEGRATION</p>
          <h2 id="integration-title" className="section-title">{zh ? "零阻力 ROS 整合。" : "Zero Friction ROS Integration."}</h2>
          <p className="section-copy">{zh ? "幾秒內連接租用的機器人車隊。原生支援 Python、C++ 與 ROS 2 Humble，不受供應商綁定。" : "Connect to your leased fleet in seconds. Native support for Python, C++, and ROS 2 Humble. No vendor lock-in."}</p>
          <div className="mt-8 grid grid-cols-3 gap-2">
            {[["PY", "Python 3.11"], ["C++", "rclcpp"], ["ROS", "Humble"]].map(([short, label]) => (
              <div key={short} className="language-chip"><strong>{short}</strong><span>{label}</span></div>
            ))}
          </div>
          <a href="#intake" className="text-link mt-8">{zh ? "開啟 API 參考" : "Open API reference"} <ArrowRight className="size-4" /></a>
        </div>

        <div className="code-window" aria-label={zh ? "Big Rocket Python SDK 範例" : "Big Rocket Python SDK example"}>
          <div className="code-titlebar">
            <div className="flex gap-2" aria-hidden="true"><i /><i /><i /></div>
            <span className="flex items-center gap-2"><Code2 className="size-3.5 text-blue-400" /> connect.py</span>
            <span>PYTHON 3.11</span>
          </div>
          <div className="code-tabs"><span className="active">connect.py</span><span>robot.yaml</span><span>README.md</span></div>
          <pre className="overflow-x-auto p-5 text-[12px] leading-7 sm:p-7 sm:text-[13px]"><code>
            {code.map((line, index) => <span className="line" key={index}><b>{String(index + 1).padStart(2, "0")}</b>{line.content}</span>)}
          </code></pre>
          <div className="code-console"><span>›</span> {zh ? "已驗證 ·" : "Authenticated ·"} BR-DOG-01 <b className="flex items-center gap-1"><LockKeyhole className="size-3" /> TLS</b></div>
        </div>
      </Reveal>
    </section>
  );
}