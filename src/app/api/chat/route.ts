import { buildSystemPrompt } from "@/lib/chat-config";
import { retrieve } from "@/lib/rag";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user");

  const userText = lastUserMessage?.parts
    ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join(" ");

  const relevantChunks = userText ? await retrieve(userText) : [];
  const system = buildSystemPrompt(relevantChunks.map((c) => c.text));

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
