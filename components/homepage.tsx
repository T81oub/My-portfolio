"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { Socials } from "@/components/ui/Socials";
import { Textarea } from "./ui/textarea";
import portfolio from "@/portfolio.config";

const { profile } = portfolio;

export function HeroSection() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSend = () => {
    if (!message.trim()) return;
    router.push(`/chatbot?message=${encodeURIComponent(message.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-10">
      <FadeIn className="max-w-5xl pt-10 md:pt-[20vh] 2xl:pt-[15vh]">
        <h1 className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] sm:text-6xl">
          Hi, I&apos;m <br />
          {profile.name}
          <span className="wave">👋</span>
        </h1>
        <div className="flex flex-wrap items-center mt-3 mb-1 gap-x-1">
          {profile.openToWork && (
            <>
              Open to work
              <span className="relative flex h-2 w-2 self-center mx-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="mx-1">/</span>
            </>
          )}
          <AnimatedTitle />
        </div>
      </FadeIn>

      <Socials />

      <div className="relative w-full max-w-4xl">
        <Textarea
          placeholder="Ask me something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pr-14 min-h-[64px]"
        />
        <Button
          type="button"
          size="icon"
          onClick={handleSend}
          disabled={!message.trim()}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}
