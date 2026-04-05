import { embed, embedMany, cosineSimilarity } from "ai";
import { google } from "@ai-sdk/google";
import fs from "fs/promises";
import path from "path";

interface ChunkEntry {
  text: string;
  embedding: number[];
  metadata: { fileName: string; chunkIndex: number };
}

const embeddingModel = google.textEmbeddingModel("gemini-embedding-001");

let chunks: ChunkEntry[] = [];
let initPromise: Promise<void> | null = null;

function splitText(
  text: string,
  chunkSize = 1000,
  overlap = 200
): string[] {
  const result: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    const chunk = text.slice(start, end).trim();
    if (chunk.length > 0) result.push(chunk);
    start += chunkSize - overlap;
  }
  return result;
}

async function loadPdfs(): Promise<{ text: string; fileName: string }[]> {
  const cvDir = path.join(process.cwd(), "public", "cv");
  let files: string[];
  try {
    files = await fs.readdir(cvDir);
  } catch {
    console.warn("[RAG] public/cv/ directory not found, no documents loaded.");
    return [];
  }

  const pdfFiles = files.filter((f) => f.toLowerCase().endsWith(".pdf"));
  if (pdfFiles.length === 0) {
    console.warn("[RAG] No PDF files found in public/cv/");
    return [];
  }

  const results: { text: string; fileName: string }[] = [];

  for (const fileName of pdfFiles) {
    const filePath = path.join(cvDir, fileName);
    const data = await fs.readFile(filePath);
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data });
    const parsed = await parser.getText();
    results.push({ text: parsed.text, fileName });
  }

  return results;
}

async function initialize(): Promise<void> {
  const docs = await loadPdfs();
  if (docs.length === 0) {
    console.warn("[RAG] No documents to embed.");
    return;
  }

  const allChunks: { text: string; fileName: string; chunkIndex: number }[] =
    [];

  for (const doc of docs) {
    const parts = splitText(doc.text);
    parts.forEach((text, i) =>
      allChunks.push({ text, fileName: doc.fileName, chunkIndex: i })
    );
  }

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: allChunks.map((c) => c.text),
  });

  chunks = allChunks.map((c, i) => ({
    text: c.text,
    embedding: embeddings[i],
    metadata: { fileName: c.fileName, chunkIndex: c.chunkIndex },
  }));

  console.log(`[RAG] Initialized with ${chunks.length} chunks`);
}

async function ensureInitialized(): Promise<void> {
  if (chunks.length > 0) return;
  if (!initPromise) {
    initPromise = initialize().catch((err) => {
      initPromise = null;
      throw err;
    });
  }
  await initPromise;
}

export async function retrieve(
  query: string,
  topK = 5
): Promise<{ text: string; score: number }[]> {
  await ensureInitialized();

  if (chunks.length === 0) return [];

  const { embedding: queryEmbedding } = await embed({
    model: embeddingModel,
    value: query,
  });

  const scored = chunks.map((chunk) => ({
    text: chunk.text,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}
