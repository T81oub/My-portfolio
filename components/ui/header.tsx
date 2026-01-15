"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { eventBus } from "./eventBus";
import portfolio from "@/portfolio.config";

import {
  HelpCircle,
  UserRoundCheck,
  BriefcaseBusiness,
  House,
  Mail,
  GraduationCap,
  FileText,
  Brain,
  X,
  FolderOpenDot,
} from "lucide-react";

type IconButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function IconWithTooltip({ icon, label, onClick }: IconButtonProps) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className="focus:outline-none"
        aria-label={label}
      >
        {icon}
      </button>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 
                      bg-gray-700 text-white text-xs rounded px-3 py-1 
                      opacity-0 group-hover:opacity-100 transition 
                      whitespace-nowrap z-10 pointer-events-none">
        {label}
      </div>
    </div>
  );
}

export default function HeaderMenu() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  const redirectToHomepage = () => {
    router.push("/");
  };

  const redirectToChat = (message: string) => {
    if (window.location.pathname === "/chatbot") {
      eventBus.emit(message);
    } else {
      const encodedMessage = encodeURIComponent(message);
      router.push(`/chatbot?message=${encodedMessage}`);
    }
  };

  const iconStyle = "w-6 h-6 text-white hover:text-blue-400 transition-colors";

  return (
    <>
      {/* Branding */}
      <div className="fixed top-4 left-4 z-50 group sm:flex hidden">
        <div className="flex items-center gap-2">
          <span className="text-white text-lg sm:text-xl font-bold tracking-wide select-none">
            <span className="text-blue-400">{portfolio.site.brand}</span>
          </span>
          <span className="relative flex h-3.5 w-3.5 self-center mx-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-br from-blue-500 to-gray-300 border-white shadow-sm"></span>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="fixed top-6 left-0 right-0 flex justify-center items-center z-50 w-full">
        <div className="flex gap-4 sm:gap-5 bg-neutral-900/50 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium shadow-lg">
          <IconWithTooltip
            icon={<House className={iconStyle} />}
            label="Home Page"
            onClick={redirectToHomepage}
          />
          <IconWithTooltip
            icon={<UserRoundCheck className={iconStyle} />}
            label="About Me"
            onClick={() => redirectToChat("Tell me more about yourself.")}
          />
          <IconWithTooltip
            icon={<BriefcaseBusiness className={iconStyle} />}
            label="Work Experience"
            onClick={() => redirectToChat("Show me your work experiences.")}
          />
          <IconWithTooltip
            icon={<Brain className={iconStyle} />}
            label="Skills"
            onClick={() => redirectToChat("What are your skills?")}
          />
          <IconWithTooltip
            icon={<FolderOpenDot className={iconStyle} />}
            label="Projects"
            onClick={() => redirectToChat("What are your Projects?")}
          />
          <IconWithTooltip
            icon={<GraduationCap className={iconStyle} />}
            label="Education"
            onClick={() => redirectToChat("Tell me about your education.")}
          />
          <IconWithTooltip
            icon={<FileText className={iconStyle} />}
            label="Resume"
            onClick={() => redirectToChat("Can I see your resume?")}
          />
          <IconWithTooltip
            icon={<Mail className={iconStyle} />}
            label="Contact"
            onClick={() => redirectToChat("Give me your contact information.")}
          />
        </div>
      </header>

      {/* Help Icon Button */}
      <div className="fixed top-4 right-4 z-50 group sm:flex hidden">
        <button
          onClick={() => setShowHelp(true)}
          aria-label="About this portfolio"
          className="focus:outline-none"
          type="button"
        >
          <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 hover:text-gray-300 transition-colors" />
        </button>
        <div
          className="absolute -bottom-5 right-0 bg-gray-700 text-white text-xs rounded px-3 py-1 
                     opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10 pointer-events-none
                     hidden sm:block"
        >
          About this portfolio
        </div>
      </div>

      {/* Help Overlay */}
      {showHelp && (
        <div className="fixed inset-0 bg-white/90 text-black flex flex-col items-center justify-center z-50 p-6 overflow-y-auto">
          <button
            onClick={() => setShowHelp(false)}
            aria-label="Close"
            className="absolute top-4 right-4 text-black hover:text-red-400 text-3xl font-bold"
          >
            <X />
          </button>

          <div className="max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Welcome to My Interactive Portfolio</h2>
            <p className="text-lg text-gray-600">
              This portfolio is powered by a large language model. You can interact with it using the chatbot to learn more about my career, skills, education, and experience. Click on any of the icons above to ask related questions or use the chatbot input to ask anything.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 text-left">
              <div>
                <House className="w-6 h-6 inline mr-2 text-blue-500" />
                <span className="font-medium">Home:</span> Return to the landing page.
              </div>
              <div>
                <UserRoundCheck className="w-6 h-6 inline mr-2 text-blue-500" />
                <span className="font-medium">About Me:</span> Learn who I am.
              </div>
              <div>
                <FolderOpenDot className="w-6 h-6 inline mr-2 text-blue-500" />
                <span className="font-medium">Projects:</span> Things I have built.
              </div>
              <div>
                <BriefcaseBusiness className="w-6 h-6 inline mr-2 text-blue-500" />
                <span className="font-medium">Experience:</span> My work history.
              </div>
              <div>
                <Brain className="w-6 h-6 inline mr-2 text-blue-500" />
                <span className="font-medium">Skills:</span> My technical and soft skills.
              </div>
              <div>
                <GraduationCap className="w-6 h-6 inline mr-2 text-blue-500" />
                <span className="font-medium">Education:</span> My academic background.
              </div>
              <div>
                <Mail className="w-6 h-6 inline mr-2 text-blue-500" />
                <span className="font-medium">Contact:</span> How to reach me.
              </div>
              <div>
                <FileText className="w-6 h-6 inline mr-2 text-blue-500" />
                <span className="font-medium">My CV:</span> View or download my resume.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
