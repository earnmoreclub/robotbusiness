import { NextResponse } from "next/server";
import { ARXIV_FEED_URL, fallbackPapers, parseArxivFeed } from "@/lib/arxiv";

export const revalidate = 21600;

export async function GET() {
  try {
    const response = await fetch(ARXIV_FEED_URL, {
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`arXiv responded with ${response.status}`);
    const papers = parseArxivFeed(await response.text());
    if (papers.length !== 5) throw new Error("Incomplete arXiv response");
    return NextResponse.json({ papers, isFallback: false });
  } catch (error) {
    console.error("arXiv feed unavailable; serving fallback papers", error);
    return NextResponse.json({ papers: fallbackPapers(), isFallback: true });
  }
}