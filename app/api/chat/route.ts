import { mistral } from "@ai-sdk/mistral";
import { openai } from "@ai-sdk/openai";
import { streamText, type LanguageModel } from "ai";
import { SYSTEM_PROMPT } from "./prompt";
import { getWorkExperiences, getProjects, getSkills, getEducation, getCV, getAboutMe, getContact, getHelp } from "./tools";

export const maxDuration = 30;

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

    messages.unshift(SYSTEM_PROMPT);

    const tools = {
      getWorkExperiences,
      getProjects,
      getSkills,
      getEducation,
      getCV,
      getAboutMe,
      getContact,
      getHelp,
    };

    const result = streamText({
      model,
      messages,
      toolCallStreaming: true,
      tools,
      maxSteps: 2,
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
