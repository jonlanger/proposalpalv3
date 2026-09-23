import { getProvider } from "@/lib/ai/provider";

export function GET() {
  try {
    const { name, model } = getProvider();
    return Response.json({ provider: name, model });
  } catch (err) {
    return Response.json({ provider: "error", model: "", message: (err as Error).message });
  }
}
