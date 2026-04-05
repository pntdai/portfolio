import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CV_DIR = path.join(ROOT, "public", "cv");
const OUTPUT = path.join(ROOT, "src", "data", "cv-texts.json");

async function main() {
  let files;
  try {
    files = await fs.readdir(CV_DIR);
  } catch {
    console.warn("[extract-pdf] public/cv/ not found, writing empty output.");
    await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
    await fs.writeFile(OUTPUT, JSON.stringify([], null, 2));
    return;
  }

  const pdfFiles = files.filter((f) => f.toLowerCase().endsWith(".pdf"));
  if (pdfFiles.length === 0) {
    console.warn("[extract-pdf] No PDFs found in public/cv/");
    await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
    await fs.writeFile(OUTPUT, JSON.stringify([], null, 2));
    return;
  }

  const { PDFParse } = await import("pdf-parse");
  const results = [];

  for (const fileName of pdfFiles) {
    const filePath = path.join(CV_DIR, fileName);
    const data = await fs.readFile(filePath);
    const parser = new PDFParse({ data });
    const parsed = await parser.getText();
    results.push({ fileName, text: parsed.text });
    console.log(`[extract-pdf] Extracted ${fileName} (${parsed.text.length} chars)`);
  }

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, JSON.stringify(results, null, 2));
  console.log(`[extract-pdf] Wrote ${results.length} documents to ${OUTPUT}`);
}

main().catch((err) => {
  console.error("[extract-pdf] Failed:", err);
  process.exit(1);
});
