/**
 * Types for portfolio.config.ts
 * Every piece of personal content shown on the site (and given to the chatbot)
 * is described by these interfaces.
 */

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "leetcode"
  | "x"
  | "kaggle"
  | "medium"
  | "youtube"
  | "website"
  | "email";

export interface SocialLink {
  platform: SocialPlatform;
  /** Text displayed next to the icon, e.g. "github.com/janedoe" */
  label: string;
  url: string;
}

export interface Resume {
  /** Button group title, e.g. "English version" */
  label: string;
  /** Path to a file inside /public, e.g. "/resume/resume-en.pdf" */
  file: string;
}

export interface Skill {
  name: string;
  /**
   * Optional icon key, see lib/icons.tsx for the full list
   * (e.g. "python", "react", "docker"). Falls back to a generic icon.
   */
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface WorkExperience {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export type ProjectStatus = "Completed" | "In Progress" | "Archived";

export interface Project {
  title: string;
  description: string;
  /** Path to an image inside /public */
  image?: string;
  tools: string[];
  /** Used for the filter buttons in the projects view */
  category: string;
  /** ISO date, e.g. "2025-03-01" */
  startDate: string;
  status: ProjectStatus;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface PortfolioConfig {
  site: {
    /** Browser tab title */
    title: string;
    /** Meta description used by search engines */
    description: string;
    /** Short brand text shown in the top-left corner */
    brand: string;
  };
  profile: {
    name: string;
    /** Short first name used in greetings, e.g. "Jane" */
    shortName: string;
    /** Main job title */
    title: string;
    /** Rotating titles in the hero section */
    roles: string[];
    location: string;
    email: string;
    /** Path to your photo inside /public */
    avatar: string;
    /** Shows the green "available" badge when true */
    openToWork: boolean;
    /** Status line shown in the hero and contact section */
    status: string;
    /** About me paragraphs. Supports **bold** markdown. */
    bio: string[];
    /** Free-form facts the chatbot can use (hobbies, languages...) */
    funFacts?: string[];
  };
  socials: SocialLink[];
  resumes: Resume[];
  skills: SkillCategory[];
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  chatbot: {
    /** Message shown before the visitor sends anything */
    welcomeMessage: string;
    /** Describes how the assistant should talk */
    tone: string;
    /** Topics the assistant should politely decline */
    privateTopics: string[];
  };
}
