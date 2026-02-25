"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedTitle } from "@/components/ui/AnimatedTitle";
import { Socials } from "@/components/ui/Socials";
import portfolio from "@/portfolio.config";

const { profile } = portfolio;

const quickPrompts = ["What are your projects?", "What are your skills?", "Tell me about your experience."];

export function HeroSection() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const ask = (text: string) => {
    if (!text.trim()) return;
    router.push(`/chatbot?message=${encodeURIComponent(text.trim())}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ask(message);
  };

  return (
    <section className="hero container d-flex flex-column justify-content-center">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9 text-center">
          <FadeIn>
            {profile.openToWork && (
              <span className="chip mb-4">
                <span className="status-dot" />
                {profile.status}
              </span>
            )}

            <h1 className="hero-title mb-3">
              Hi, I&apos;m <span className="text-brand">{profile.name}</span>{" "}
              <span className="wave">👋</span>
            </h1>

            <p className="fs-3 mb-3">
              <AnimatedTitle />
            </p>

            <p className="lead text-muted-soft mx-auto mb-0" style={{ maxWidth: 620 }}>
              Skip the scrolling. Ask my AI assistant anything about my experience, projects and skills.
            </p>
          </FadeIn>

          <form onSubmit={handleSubmit} className="prompt-box mx-auto mt-5" style={{ maxWidth: 680 }}>
            <Sparkles size={20} className="flex-shrink-0 text-accent" />
            <input
              type="text"
              placeholder="Ask me something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Ask a question"
            />
            <button type="submit" className="btn btn-brand btn-icon flex-shrink-0" disabled={!message.trim()}>
              <ArrowUp size={20} />
              <span className="visually-hidden">Send</span>
            </button>
          </form>

          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            {quickPrompts.map((prompt) => (
              <button key={prompt} type="button" className="btn btn-glass btn-sm suggestion" onClick={() => ask(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <Socials className="justify-content-center mt-5" />
        </div>
      </div>
    </section>
  );
}
