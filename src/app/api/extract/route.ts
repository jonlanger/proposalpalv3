import { NextRequest } from "next/server";

export const maxDuration = 30;

/** Max characters kept per document; the text is stored in the browser's localStorage. */
const MAX_CHARS = 60_000;

/** Extracts plain text from an uploaded PDF, DOCX or text file. */
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return Response.json({ error: "No file uploaded" }, { status: 400 });

    const name = file.name.toLowerCase();
    const buf = new Uint8Array(await file.arrayBuffer());
    let text = "";

    if (name.endsWith(".pdf")) {
      const { extractText, getDocumentProxy } = await import("unpdf");
      const pdf = await getDocumentProxy(buf);
      const out = await extractText(pdf, { mergePages: true });
      text = out.text;
    } else if (name.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const out = await mammoth.extractRawText({ buffer: Buffer.from(buf) });
      text = out.value;
    } else if (/\.(txt|md|csv|json|html?)$/.test(name)) {
      text = new TextDecoder().decode(buf);
    } else {
      // PPTX/XLSX and others: keep the file name only.
      return Response.json({ text: "", supported: false });
    }

    text = text.replace(/\s+\n/g, "\n").replace(/[ \t]{2,}/g, " ").trim();
    return Response.json({ text: text.slice(0, MAX_CHARS), truncated: text.length > MAX_CHARS, supported: true });
  } catch (err) {
    console.error("[extract]", err);
    return Response.json({ error: "Could not read this file." }, { status: 500 });
  }
}
