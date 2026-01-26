import React from "react";
import { WorkExperiences } from "../workexperiences";
import { Projects } from "../projects";
import { AboutMe } from "../aboutme";
import { Skills } from "../skills";
import { Education } from "../education";
import { Contact } from "../contact";
import { Resume } from "../resume";

interface ToolRendererProps {
  toolInvocations: Array<{
    toolCallId: string;
    toolName: string;
    result?: unknown;
  }>;
  messageId: string;
}

export default function ToolRenderer({ toolInvocations }: ToolRendererProps) {
  return (
    <div className="w-full transition-all duration-300">
      {toolInvocations.map(({ toolCallId, toolName, result }) => {
        switch (toolName) {
          case "getWorkExperiences":
            return (
              <div key={toolCallId} className="w-full rounded-lg overflow-hidden">
                <WorkExperiences />
              </div>
            );

          case "getProjects":
            return (
              <div key={toolCallId} className="w-full rounded-lg overflow-hidden">
                <Projects />
              </div>
            );
          case "getSkills":
            return (
              <div key={toolCallId} className="w-full rounded-lg overflow-hidden">
                <Skills />
              </div>
            );
          case "getEducation":
            return (
              <div key={toolCallId} className="w-full rounded-lg overflow-hidden">
                <Education />
              </div>
            );
          case "getCV":
            return (
              <div key={toolCallId} className="w-full rounded-lg overflow-hidden">
                <Resume />
              </div>
            );
          case "getAboutMe":
            return (
              <div key={toolCallId} className="w-full rounded-lg overflow-hidden">
                <AboutMe />
              </div>
            );
         
          case "getContact":
            return (
              <div key={toolCallId} className="w-full rounded-lg overflow-hidden">
                <Contact />
              </div>
            );
          case "getHelp":
            // The assistant's text answer is enough here
            return null;

          default:
            // Fallback: render the raw result nicely
            return (
              <div
                key={toolCallId}
                className="bg-secondary/10 w-full rounded-lg p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-medium">{toolName}</h3>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-100">
                    Tool Result
                  </span>
                </div>
                <div className="mt-2">
                  {typeof result === "object" ? (
                    <pre className="bg-secondary/20 overflow-x-auto rounded p-3 text-sm">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  ) : (
                    <p>{String(result)}</p>
                  )}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
