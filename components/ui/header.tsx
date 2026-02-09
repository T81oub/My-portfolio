"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Brain,
  FileText,
  FolderOpenDot,
  GraduationCap,
  HelpCircle,
  House,
  Mail,
  UserRoundCheck,
  X,
} from "lucide-react";
import { eventBus } from "./eventBus";
import portfolio from "@/portfolio.config";

const navItems = [
  { label: "About Me", icon: UserRoundCheck, prompt: "Tell me more about yourself.", help: "Learn who I am." },
  { label: "Experience", icon: BriefcaseBusiness, prompt: "Show me your work experiences.", help: "My work history." },
  { label: "Skills", icon: Brain, prompt: "What are your skills?", help: "My technical skills." },
  { label: "Projects", icon: FolderOpenDot, prompt: "What are your projects?", help: "Things I have built." },
  { label: "Education", icon: GraduationCap, prompt: "Tell me about your education.", help: "My academic background." },
  { label: "Resume", icon: FileText, prompt: "Can I see your resume?", help: "View or download my CV." },
  { label: "Contact", icon: Mail, prompt: "Give me your contact information.", help: "How to reach me." },
];

const helpItems = [
  { label: "Home", icon: House, help: "Back to the landing page." },
  ...navItems,
];

export default function HeaderMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [showHelp, setShowHelp] = useState(false);

  const askChatbot = (message: string) => {
    if (pathname === "/chatbot") {
      eventBus.emit(message);
    } else {
      router.push(`/chatbot?message=${encodeURIComponent(message)}`);
    }
  };

  return (
    <>
      {/* Brand */}
      <div className="brand-badge d-none d-lg-flex align-items-center gap-2">
        <span className="text-gradient">{portfolio.site.brand}</span>
        <span className="status-dot" />
      </div>

      {/* Navigation dock */}
      <nav className="nav-dock" aria-label="Main navigation">
        <button
          type="button"
          className={`dock-btn ${pathname === "/" ? "active" : ""}`}
          data-label="Home"
          aria-label="Home"
          onClick={() => router.push("/")}
        >
          <House size={19} />
        </button>
        {navItems.map(({ label, icon: Icon, prompt }) => (
          <button
            key={label}
            type="button"
            className="dock-btn"
            data-label={label}
            aria-label={label}
            onClick={() => askChatbot(prompt)}
          >
            <Icon size={19} />
          </button>
        ))}
      </nav>

      {/* Help button */}
      <button
        type="button"
        className="help-btn btn btn-glass btn-icon d-none d-sm-inline-flex"
        aria-label="About this portfolio"
        onClick={() => setShowHelp(true)}
      >
        <HelpCircle size={20} />
      </button>

      {/* Help modal */}
      {showHelp && (
        <>
          <div className="modal d-block modal-glass" tabIndex={-1} role="dialog" onClick={() => setShowHelp(false)}>
            <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content p-2">
                <div className="modal-header border-0">
                  <div>
                    <p className="eyebrow mb-1">How it works</p>
                    <h2 className="modal-title h4 section-title">Welcome to my interactive portfolio</h2>
                  </div>
                  <button
                    type="button"
                    className="btn btn-glass btn-icon ms-auto"
                    aria-label="Close"
                    onClick={() => setShowHelp(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="modal-body pt-0">
                  <p className="text-muted-soft">
                    This portfolio is powered by a large language model. Ask the assistant anything about my career,
                    or use the icons in the navigation bar to jump straight to a topic.
                  </p>
                  <div className="row g-3 mt-1">
                    {helpItems.map(({ label, icon: Icon, help }) => (
                      <div key={label} className="col-sm-6 col-lg-4">
                        <div className="glass-card h-100 p-3 d-flex gap-3 align-items-start">
                          <Icon size={20} className="flex-shrink-0 mt-1" color="#a5b4fc" />
                          <div>
                            <div className="fw-semibold">{label}</div>
                            <div className="small text-muted-soft">{help}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      )}
    </>
  );
}
