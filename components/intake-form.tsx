"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

export function IntakeForm() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (event.currentTarget.checkValidity()) setSubmitted(true); }
  if (submitted) return <div className="intake-form flex min-h-[480px] flex-col items-center justify-center text-center" role="status"><span className="mb-5 grid size-14 place-items-center rounded-full bg-emerald-400/10 text-emerald-400"><CheckCircle2 className="size-7" /></span><h3 className="text-2xl font-semibold text-white">Request queued.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">A Big Rocket robotics engineer will review your requirements and reply within one business day.</p><button type="button" onClick={() => setSubmitted(false)} className="text-link mt-7">Submit another request</button></div>;
  return <form className="intake-form" onSubmit={submit} noValidate={false}>
    <div className="mb-7 flex items-center justify-between border-b border-white/[0.07] pb-5"><div><p className="font-mono text-xs text-white">developer_intake.yaml</p><p className="mt-1 text-xs text-slate-600">All fields required</p></div><span className="online-badge">● SECURE</span></div>
    <div className="grid gap-5 sm:grid-cols-2">
      <label>Full Name<input name="name" required autoComplete="name" placeholder="Ada Lovelace" /></label>
      <label>Work / University Email<input name="email" required type="email" autoComplete="email" placeholder="ada@roboticslab.edu" /></label>
      <label>Hardware Category Needed<select name="hardware" required defaultValue=""><option value="" disabled>Select category</option><option>Mobile Chassis (AMR)</option><option>Quadruped</option><option>Cobot Arm</option><option>Multiple / Not sure</option></select></label>
      <label>Estimated Start Date<input name="startDate" required type="date" /></label>
      <label className="sm:col-span-2">Primary Use Case<select name="useCase" required defaultValue=""><option value="" disabled>Select workload</option><option>SLAM &amp; Navigation</option><option>Reinforcement Learning</option><option>Computer Vision</option><option>Vision Grasping</option><option>Human-Robot Interaction</option><option>Other / Multi-modal</option></select></label>
    </div>
    <p className="mt-4 text-[11px] leading-5 text-slate-600">By submitting, you agree that Big Rocket may contact you about hardware availability. No marketing spam.</p>
    <button type="submit" className="button-primary mt-6 w-full">Send configuration request <ArrowRight className="size-4" /></button>
  </form>;
}