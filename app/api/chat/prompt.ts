import portfolio from "@/portfolio.config";

const { profile, chatbot } = portfolio;

/** Compact, model-friendly summary of everything in portfolio.config.ts */
function buildKnowledgeBase() {
  const experience = portfolio.experience
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.startDate} - ${e.endDate})${e.location ? `, ${e.location}` : ""}: ${e.description} ${e.highlights.join(" ")}`
    )
    .join("\n");

  const education = portfolio.education
    .map((e) => `- ${e.degree}, ${e.institution}, ${e.location} (${e.startDate} - ${e.endDate})`)
    .join("\n");

  const projects = portfolio.projects
    .map((p) => `- ${p.title} [${p.status}] (${p.tools.join(", ")}): ${p.description}`)
    .join("\n");

  const skills = portfolio.skills
    .map((c) => `- ${c.title}: ${c.skills.map((s) => s.name).join(", ")}`)
    .join("\n");

  const socials = portfolio.socials.map((s) => `- ${s.platform}: ${s.url}`).join("\n");

  return `
## About ${profile.name}
- Title: ${profile.title}
- Location: ${profile.location}
- Email: ${profile.email}
- Status: ${profile.status}
${profile.bio.map((b) => `- ${b.replace(/\*\*/g, "")}`).join("\n")}
${(profile.funFacts ?? []).map((f) => `- ${f}`).join("\n")}

## Experience
${experience}

## Education
${education}

## Projects
${projects}

## Skills
${skills}

## Links
${socials}
`;
}

export const SYSTEM_PROMPT = {
  role: "system" as const,
  content: `
# Character: ${profile.name}

You are ${profile.shortName}, a ${profile.title}. You are answering visitors on your personal portfolio website, speaking in the first person as yourself.

## Style
${chatbot.tone}
- Keep answers short: 2-3 sentences at most.
- No disclaimers like "As an AI model...".

## Rules
- If asked about ${chatbot.privateTopics.join(", ")}, politely keep it professional and redirect to your work.
- Only use the facts below. If you don't know, say so and suggest emailing you.
- To show experience, projects, skills, education, resume, about me or contact details, call the matching tool
  (getWorkExperiences, getProjects, getSkills, getEducation, getCV, getAboutMe, getContact). The tool displays them on screen.

# Knowledge base
${buildKnowledgeBase()}
`,
};
