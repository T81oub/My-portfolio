"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendIcon, SquareIcon } from "lucide-react";

import ToolRenderer from "./chat/render";
import { eventBus } from "./ui/eventBus";
import portfolio from "@/portfolio.config";

export function Chatbot() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    append,
  } = useChat({ api: "/api/chat" });

  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("message");
  const [hasSentInitial, setHasSentInitial] = useState(false);
  
  // Messages sent from the header while already on /chatbot
  useEffect(() => {
    function handleNewMessage(message: string) {
      append({ role: "user", content: message });
    }

    eventBus.on(handleNewMessage);
    return () => {
      eventBus.off(handleNewMessage);
    };
  }, [append]);

  // Automatically send the message passed in the URL (?message=...)
  useEffect(() => {
    if (initialMessage && !hasSentInitial) {
      append({
        role: "user",
        content: initialMessage,
      });
      setHasSentInitial(true);
    }
  }, [initialMessage, hasSentInitial, append]);

  const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const displayMessages = useMemo(() => {
    const userMessages = messages.filter((m) => m.role === "user");
    const assistantMessages = messages.filter((m) => m.role === "assistant");

    const lastUser = userMessages[userMessages.length - 1];
    const lastAssistant = assistantMessages[assistantMessages.length - 1];

    const output = [];

    if (lastUser) output.push(lastUser);
    if (lastAssistant) output.push(lastAssistant);

    return output;
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full mx-auto bg-background max-h-[810px] max-w-[1150px] min-h-full overflow-hidden">
      <div className="flex-1 overflow-auto p-6 ">
        {messages.length === 0 && (
          <div className="flex flex-col justify-center items-center h-full">
            <Avatar className="w-8 h-8 border">
              <AvatarFallback>{portfolio.profile.shortName.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-lg text-muted-foreground mt-4">
              {portfolio.chatbot.welcomeMessage}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4 overflow-hidden">
          {displayMessages.map((message) => {
            if (
              message.role === "assistant" &&
              Array.isArray(message.toolInvocations) &&
              message.toolInvocations.length > 0
            ) {
              return (
                <div key={message.id} className="bg-muted rounded-lg w-full">
                  <div className="rounded-lg p-3 w-full max-w-full bg-white">
                      <Markdown>{message.content}</Markdown>
                  </div>
                  <ToolRenderer
                    toolInvocations={message.toolInvocations ?? []}
                    messageId={message.id}
                  />

                </div>
                
              );
            }

            if (message.role === "assistant") {
              return (
                <div key={message.id} className="rounded-lg p-3 w-full max-w-full">
                  <Markdown>{message.content}</Markdown>
                </div>
              );
            }

            if (message.role === "user") {
              return (
                <div key={message.id} className="flex justify-end">
                  <div className="bg-blue-600 rounded-lg p-3 max-w-[70%] text-white">
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>

      <form
        onSubmit={handleUserSubmit}
        className="px-4 py-3 sm:px-1 flex items-center gap-2 "
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="Ask me anything..."
            className="rounded-lg pr-12 min-h-[64px]"
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          {!isLoading ? (
            <Button
              type="submit"
              size="icon"
              disabled={!input?.trim() || isLoading}
              className="absolute bottom-3 right-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <SendIcon className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          ) : (
            <Button
              type="button"
              size="icon"
              onClick={stop}
              className="absolute bottom-3 right-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <SquareIcon className="w-5 h-5" />
              <span className="sr-only">Stop</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
