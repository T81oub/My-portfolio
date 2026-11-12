import { mistral } from "@ai-sdk/mistral";
import { openai } from "@ai-sdk/openai";
import { streamText, type CoreMessage, type LanguageModel } from "ai";
import { SYSTEM_PROMPT } from "./prompt";
import { getWorkExperiences, getProjects, getSkills, getEducation, getCV, getAboutMe, getContact } from "./tools";

export const maxDuration = 30;

/** Token savers: only recent messages are sent, and answers are capped. */
const MAX_HISTORY_MESSAGES = 6;
const MAX_OUTPUT_TOKENS = 300;

interface ChatMessage {
  role: string;
  content: string;
  toolInvocations?: { toolName: string }[];
}

/**
 * Keeps the last few messages as plain text, starting on a user message.
 * Past tool calls become a short note: cheaper, and Mistral rejects a user
 * message that directly follows a tool result.
 */
function recentMessages(messages: ChatMessage[]): CoreMessage[] {
  const recent = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-MAX_HISTORY_MESSAGES);
  const firstUser = recent.findIndex((m) => m.role === "user");

  return recent
    .slice(Math.max(firstUser, 0))
    .map((m): CoreMessage => {
      if (m.role === "user") return { role: "user", content: m.content };
      const shown = m.toolInvocations?.map((t) => t.toolName).join(", ");
      return { role: "assistant", content: m.content || (shown ? `(Displayed: ${shown})` : "") };
    })
    .filter((m) => m.content !== "");
}

/**
 * Picks the chat model from the environment:
 * Mistral first (if MISTRAL_API_KEY is set), then OpenAI (if OPENAI_API_KEY is set).
 */
function getModel(): LanguageModel | null {
  if (process.env.MISTRAL_API_KEY) {
    return mistral(process.env.MISTRAL_MODEL || "ministral-3b-latest");
  }
  if (process.env.OPENAI_API_KEY) {
    return openai(process.env.OPENAI_MODEL || "gpt-4o-mini");
  }
  return null;
}

function errorHandler(error: unknown) {
  console.error("[CHAT-API] Error:", error);
  if (String((error as Error)?.message ?? error).includes("Rate limit")) {
    return "The AI provider's rate limit was reached. Please wait a minute and try again.";
  }
  if (error == null) {
    return "Unknown error";
  }
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  const model = getModel();
  if (!model) {
    console.error("[CHAT-API] No AI provider configured. Set MISTRAL_API_KEY or OPENAI_API_KEY in .env.local");
    return new Response(
      "I can't answer yet: no AI model API key has been added. " +
        "Add MISTRAL_API_KEY or OPENAI_API_KEY to .env.local, then restart the server.",
      { status: 503 }
    );
  }

  try {
    const { messages } = await req.json();

    const tools = {
      getWorkExperiences,
      getProjects,
      getSkills,
      getEducation,
      getCV,
      getAboutMe,
      getContact,
    };

    const result = streamText({
      model,
      messages: [SYSTEM_PROMPT, ...recentMessages(messages)],
      toolCallStreaming: true,
      tools,
      // One model call per question: when a tool is called, its UI section is the answer
      maxSteps: 1,
      maxTokens: MAX_OUTPUT_TOKENS,
      // Fail fast instead of waiting through several retries (free tiers are rate limited)
      maxRetries: 1,
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (error) {
    console.error("[CHAT-API] Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
