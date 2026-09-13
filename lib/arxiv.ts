import { XMLParser } from "fast-xml-parser";

export const ARXIV_FEED_URL =
  "http://export.arxiv.org/api/query?search_query=cat:cs.RO&sortBy=submittedDate&sortOrder=descending&max_results=5";

export type ArxivPaper = {
  id: string;
  title: string;
  authors: string[];
  published: string;
  summary: string;
  pdfLink: string;
  primaryCategory: "cs.RO";
};

const FALLBACK_PAPERS: ArxivPaper[] = [
  { id: "2405.12345", title: "Robust Reinforcement Learning for Agile Legged Locomotion", authors: ["Mina Patel", "Jon Bell", "Wei Zhang", "et al."], published: "2 days ago", summary: "A sim-to-real policy for agile legged robots that stays stable under changing terrain, payload, and actuator dynamics.", pdfLink: "https://arxiv.org/pdf/2405.12345", primaryCategory: "cs.RO" },
  { id: "2405.11802", title: "Semantic SLAM with Open-Vocabulary Scene Graphs", authors: ["Elena Rossi", "Noah Williams", "Soo-jin Kim"], published: "3 days ago", summary: "An open-vocabulary mapping system that joins geometric reconstruction with language-grounded object and room relationships.", pdfLink: "https://arxiv.org/pdf/2405.11802", primaryCategory: "cs.RO" },
  { id: "2405.11094", title: "Learning Contact-Rich Manipulation from Sparse Demonstrations", authors: ["Ava Thompson", "Carlos Mendes", "Priya Nair", "et al."], published: "4 days ago", summary: "A tactile-aware policy learning method that improves contact-rich manipulation when demonstrations and robot time are limited.", pdfLink: "https://arxiv.org/pdf/2405.11094", primaryCategory: "cs.RO" },
  { id: "2405.10761", title: "Multi-Agent Exploration with Decentralized Topological Planning", authors: ["Liam Chen", "Hannah Ortiz", "Omar Haddad"], published: "5 days ago", summary: "Decentralized exploration policies coordinate a heterogeneous robot team through compact topological maps and local negotiation.", pdfLink: "https://arxiv.org/pdf/2405.10761", primaryCategory: "cs.RO" },
  { id: "2405.10117", title: "Uncertainty-Aware Visual-Inertial Odometry in the Wild", authors: ["Theo Martin", "Yuki Sato", "Grace Okafor", "et al."], published: "6 days ago", summary: "A visual-inertial odometry pipeline that estimates confidence online and recovers more reliably from blur, glare, and sparse texture.", pdfLink: "https://arxiv.org/pdf/2405.10117", primaryCategory: "cs.RO" },
];

function text(value: unknown): string {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function cleanLatex(value: string): string {
  return text(value)
    .replace(/\\\((.*?)\\\)/g, "$1")
    .replace(/\\\[(.*?)\\\]/g, "$1")
    .replace(/\$\$(.*?)\$\$/g, "$1")
    .replace(/\$(.*?)\$/g, "$1")
    .replace(/\\(text|mathrm|mathbf|operatorname)\{([^{}]*)\}/g, "$2")
    .replace(/\\[a-zA-Z]+\s*/g, "")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function relativeDate(date: string): string {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
  if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

export function parseArxivFeed(xml: string): ArxivPaper[] {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const entries = parser.parse(xml)?.feed?.entry;
  const list = Array.isArray(entries) ? entries : entries ? [entries] : [];
  return list.slice(0, 5).map((entry: Record<string, unknown>) => {
    const rawLinks = Array.isArray(entry.link) ? entry.link : [entry.link];
    const pdf = rawLinks.find((link) => link?.["@_title"] === "pdf") as Record<string, string> | undefined;
    const rawId = text(entry.id);
    const id = rawId.split("/abs/").pop() ?? rawId;
    const rawAuthors = Array.isArray(entry.author) ? entry.author : [entry.author];
    const names = rawAuthors.map((author) => text((author as Record<string, unknown>)?.name)).filter(Boolean);
    return {
      id,
      title: text(entry.title),
      authors: [...names.slice(0, 3), ...(names.length > 3 ? ["et al."] : [])],
      published: relativeDate(text(entry.published)),
      summary: `${cleanLatex(text(entry.summary)).slice(0, 180).replace(/\s+\S*$/, "")}…`,
      pdfLink: text(pdf?.["@_href"]) || rawId.replace("/abs/", "/pdf/"),
      primaryCategory: "cs.RO",
    };
  });
}

export function fallbackPapers(): ArxivPaper[] { return FALLBACK_PAPERS; }