"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowUp, Square } from "lucide-react";
import ToolRenderer from "./chat/render";
import { eventBus } from "./ui/eventBus";
import portfolio from "@/portfolio.config";

const suggestions = [
  "Tell me more about yourself.",
  "What are your projects?",
  "What are your skills?",
  "Can I see your resume?",
];

const initial = portfolio.profile.shortName.charAt(0).toUpperCase();

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, append, error } = useChat({
    api: "/api/chat",
  });

  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("message");
  const [hasSentInitial, setHasSentInitial] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Messages sent from the navigation dock while already on /chatbot
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
      append({ role: "user", content: initialMessage });
      setHasSentInitial(true);
    }
  }, [initialMessage, hasSentInitial, append]);

  // Keep the latest message in view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading, error]);

  const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
  };

  const waitingForReply = isLoading && messages[messages.length - 1]?.role === "user";

  return (
    <div className="chat-shell">
      <div className="chat-scroll">
        {messages.length === 0 && (
          <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center px-3">
            <div className="chat-avatar mb-3" style={{ width: "3.5rem", height: "3.5rem", fontSize: "1.25rem" }}>
              {initial}
            </div>
            <h2 className="h4 section-title">{portfolio.chatbot.welcomeMessage}</h2>
            <p className="text-muted-soft mb-4">Pick a question below or type your own.</p>
            <div className="d-flex flex-wrap justify-content-center gap-2" style={{ maxWidth: 560 }}>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="btn btn-glass btn-sm suggestion"
                  onClick={() => append({ role: "user", content: s })}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="d-flex flex-column gap-4">
          {messages.map((message) => {
            if (message.role === "user") {
              return (
                <div key={message.id} className="d-flex">
                  <div className="bubble bubble-user">{message.content}</div>
                </div>
              );
            }

            if (message.role !== "assistant") return null;

            const hasTools = Array.isArray(message.toolInvocations) && message.toolInvocations.length > 0;

            return (
              <div key={message.id} className="d-flex gap-3 align-items-start">
                <div className="chat-avatar">{initial}</div>
                <div className="flex-grow-1 min-w-0 d-flex flex-column gap-3">
                  {message.content && (
                    <div className="bubble bubble-ai chat-markdown">
                      <Markdown>{message.content}</Markdown>
                    </div>
                  )}
                  {hasTools && <ToolRenderer toolInvocations={message.toolInvocations ?? []} />}
                </div>
              </div>
            );
          })}

          {waitingForReply && (
            <div className="d-flex gap-3 align-items-center">
              <div className="chat-avatar">{initial}</div>
              <div className="bubble bubble-ai">
                <span className="typing-dots" aria-label="Typing">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="d-flex gap-3 align-items-start" role="alert">
              <div className="chat-avatar bg-danger">
                <AlertTriangle size={15} />
              </div>
              <div className="bubble bubble-ai border-danger-subtle">{error.message || "Something went wrong."}</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <form onSubmit={handleUserSubmit} className="prompt-box mt-3">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={handleInputChange}
          aria-label="Message"
        />
        {isLoading ? (
          <button type="button" onClick={stop} className="btn btn-glass btn-icon flex-shrink-0" aria-label="Stop">
            <Square size={16} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="btn btn-brand btn-icon flex-shrink-0"
            aria-label="Send"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </form>
    </div>
  );
}
