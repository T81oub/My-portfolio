import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "./prompt";
import { getWorkExperiences, getProjects, getSkills, getEducation, getCV, getAboutMe, getContact, getHelp } from "./tools";

export const maxDuration = 30;

function errorHandler(error: unknown) {
  console.error("[CHAT-API] Error:", error);
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
  if (!process.env.OPENAI_API_KEY) {
    console.error("[CHAT-API] OPENAI_API_KEY is not set. Add it to .env.local");
    return new Response("Chat is not configured on this server.", { status: 500 });
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
      model: openai(process.env.OPENAI_MODEL ?? "gpt-4o-mini"),
      messages,
      toolCallStreaming: true,
      tools,
      maxSteps: 2,
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (error) {
    console.error("[CHAT-API] Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
