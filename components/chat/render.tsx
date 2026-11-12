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
}

/** Maps each tool the model calls to the UI section it should display. */
const toolComponents: Record<string, React.ComponentType | null> = {
  getWorkExperiences: WorkExperiences,
  getProjects: Projects,
  getSkills: Skills,
  getEducation: Education,
  getCV: Resume,
  getAboutMe: AboutMe,
  getContact: Contact,
};

export default function ToolRenderer({ toolInvocations }: ToolRendererProps) {
  return (
    <div className="d-flex flex-column gap-3">
      {toolInvocations.map(({ toolCallId, toolName, result }) => {
        if (toolName in toolComponents) {
          const Component = toolComponents[toolName];
          return Component ? (
            <div key={toolCallId} className="tool-panel">
              <Component />
            </div>
          ) : null;
        }

        // Fallback for unknown tools: show the raw result
        return (
          <div key={toolCallId} className="tool-panel">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="h6 mb-0">{toolName}</h3>
              <span className="badge rounded-pill text-bg-success">Tool result</span>
            </div>
            <pre className="small mb-0">
              {typeof result === "object" ? JSON.stringify(result, null, 2) : String(result)}
            </pre>
          </div>
        );
      })}
    </div>
  );
}
