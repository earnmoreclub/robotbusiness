"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useLanguage } from "./language-provider";

export function IntakeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [paperTitle, setPaperTitle] = useState("");
  const { language } = useLanguage(); const zh = language === "zh-Hant";
  useEffect(() => {
    const handlePaper = (event: Event) => setPaperTitle((event as CustomEvent<string>).detail);
    window.addEventListener("big-rocket:paper", handlePaper);
    return () => window.removeEventListener("big-rocket:paper", handlePaper);
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (event.currentTarget.checkValidity()) setSubmitted(true); }
  if (submitted) return <div className="intake-form flex min-h-[480px] flex-col items-center justify-center text-center" role="status"><span className="mb-5 grid size-14 place-items-center rounded-full bg-emerald-400/10 text-emerald-400"><CheckCircle2 className="size-7" /></span><h3 className="text-2xl font-semibold text-white">{zh ? "申請已排入佇列。" : "Request queued."}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">{zh ? "Big Rocket 機器人工程師將審閱需求，並在一個工作日內回覆。" : "A Big Rocket robotics engineer will review your requirements and reply within one business day."}</p><button type="button" onClick={() => setSubmitted(false)} className="text-link mt-7">{zh ? "提交另一份申請" : "Submit another request"}</button></div>;
  return <form className="intake-form" onSubmit={submit} noValidate={false}>
    <div className="mb-7 flex items-center justify-between border-b border-white/[0.07] pb-5"><div><p className="font-mono text-xs text-white">developer_intake.yaml</p><p className="mt-1 text-xs text-slate-600">{zh ? "所有欄位皆為必填" : "All fields required"}</p></div><span className="online-badge">● {zh ? "安全" : "SECURE"}</span></div>
    <div className="grid gap-5 sm:grid-cols-2">
      <label>{zh ? "姓名" : "Full Name"}<input name="name" required autoComplete="name" placeholder="Ada Lovelace" /></label>
      <label>{zh ? "工作 / 大學電子郵件" : "Work / University Email"}<input name="email" required type="email" autoComplete="email" placeholder="ada@roboticslab.edu" /></label>
      <label>{zh ? "需要的硬體類別" : "Hardware Category Needed"}<select name="hardware" required defaultValue=""><option value="" disabled>{zh ? "選擇類別" : "Select category"}</option><option>{zh ? "移動底盤 (AMR)" : "Mobile Chassis (AMR)"}</option><option>{zh ? "四足機器人" : "Quadruped"}</option><option>{zh ? "協作機械臂" : "Cobot Arm"}</option><option>{zh ? "多種 / 不確定" : "Multiple / Not sure"}</option></select></label>
      <label>{zh ? "預計開始日期" : "Estimated Start Date"}<input name="startDate" required type="date" /></label>
      <label className="sm:col-span-2">{zh ? "主要使用情境" : "Primary Use Case"}<select name="useCase" required defaultValue=""><option value="" disabled>{zh ? "選擇工作負載" : "Select workload"}</option><option>SLAM &amp; Navigation</option><option>Reinforcement Learning</option><option>Computer Vision</option><option>Vision Grasping</option><option>Human-Robot Interaction</option><option>Other / Multi-modal</option></select></label>
      <label className="sm:col-span-2">{zh ? "研究論文 / 專案參考" : "Research Paper / Project Reference"}<input name="paper" value={paperTitle} onChange={(event) => setPaperTitle(event.target.value)} placeholder={zh ? "可選填：貼上論文標題" : "Optional: paste a paper title"} /></label>
    </div>
    <p className="mt-4 text-[11px] leading-5 text-slate-600">{zh ? "提交即表示你同意 Big Rocket 就硬體供應狀況聯絡你。我們不發送行銷垃圾郵件。" : "By submitting, you agree that Big Rocket may contact you about hardware availability. No marketing spam."}</p>
    <button type="submit" className="button-primary mt-6 w-full">{zh ? "送出配置申請" : "Send configuration request"} <ArrowRight className="size-4" /></button>
  </form>;
}