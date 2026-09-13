"use client";

import { ExternalLink, FileText, Rocket, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import type { ArxivPaper } from "@/lib/arxiv";

function Skeleton() { return <div className="arxiv-card animate-pulse space-y-5"><div className="h-3 w-2/5 rounded bg-slate-800"/><div className="h-6 w-11/12 rounded bg-slate-800"/><div className="h-4 w-1/2 rounded bg-slate-900"/><div className="space-y-2"><div className="h-3 rounded bg-slate-900"/><div className="h-3 w-4/5 rounded bg-slate-900"/></div><div className="mt-auto h-10 rounded bg-slate-800"/></div>; }

export function ArxivLiveFeed() {
  const [papers, setPapers] = useState<ArxivPaper[]>([]);
  const [fallback, setFallback] = useState(false);
  useEffect(() => { fetch("/api/arxiv-feed").then((response) => response.json()).then((data) => { setPapers(data.papers); setFallback(data.isFallback); }).catch(() => setFallback(true)); }, []);
  function deploy(paper: ArxivPaper) {
    window.dispatchEvent(new CustomEvent("big-rocket:paper", { detail: paper.title }));
    document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });
  }
  return <section id="research-wire" className="border-y border-white/[.06] bg-[#09090b] py-24 sm:py-32" aria-labelledby="arxiv-title"><div className="section-shell">
    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[.16em] text-emerald-400"><span className="arxiv-pulse"/> ● CS.RO SYNDICATION // CORNELL ARXIV PRE-PRINTS</div>
    <h2 id="arxiv-title" className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-.04em] text-white sm:text-5xl">Latest Robotics Research (Pre-Print Wire)</h2>
    <p className="section-copy">Daily algorithm breakthroughs fresh from the cs.RO feed. Prototype these concepts on Big Rocket hardware.</p>
    {fallback && <p className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-amber-400"><Terminal className="size-3"/> Upstream unavailable // showing cached lab references</p>}
    <div className="mt-12 grid gap-4 lg:grid-cols-2">{papers.length ? papers.map((paper) => <article className="arxiv-card flex flex-col" key={paper.id}><div className="flex items-center justify-between gap-3 font-mono text-[10px] text-cyan-400"><span>[ARXIV:{paper.primaryCategory}]</span><span className="text-slate-500">{paper.published}</span></div><h3 className="mt-5 text-lg font-bold leading-7 text-slate-100">{paper.title}</h3><p className="mt-2 text-xs text-slate-500">By {paper.authors.join(", ")}</p><p className="mt-5 min-h-[72px] text-sm leading-6 text-slate-400">{paper.summary}</p><div className="mt-6 grid gap-2 sm:grid-cols-2"><a className="button-secondary text-xs" href={paper.pdfLink} target="_blank" rel="noreferrer"><FileText className="size-4"/> Read Full PDF <ExternalLink className="size-3"/></a><button className="button-primary text-xs" onClick={() => deploy(paper)}><Rocket className="size-4"/> Deploy On Big Rocket</button></div></article>) : Array.from({ length: 5 }, (_, index) => <Skeleton key={index}/> )}</div>
  </div></section>;
}