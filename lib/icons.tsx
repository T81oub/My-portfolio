import type { IconType } from "react-icons";
import {
  FaAws,
  FaCode,
  FaDatabase,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaJava,
  FaLinkedin,
  FaMicrosoft,
  FaYoutube,
} from "react-icons/fa";
import {
  SiAnaconda,
  SiApachespark,
  SiCplusplus,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGo,
  SiGooglecloud,
  SiHuggingface,
  SiJavascript,
  SiJupyter,
  SiKaggle,
  SiKeras,
  SiKubernetes,
  SiLangchain,
  SiLeetcode,
  SiLinux,
  SiMedium,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOpenai,
  SiOpencv,
  SiPandas,
  SiPlotly,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiRust,
  SiScikitlearn,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiX,
} from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import type { SocialPlatform } from "./types";

interface SkillIcon {
  icon: IconType;
  color: string;
}

/**
 * Icons available for skills in portfolio.config.ts.
 * Use the key as the `icon` value, e.g. { name: "Python", icon: "python" }.
 */
export const skillIcons: Record<string, SkillIcon> = {
  python: { icon: SiPython, color: "#3776AB" },
  java: { icon: FaJava, color: "#F89820" },
  cpp: { icon: SiCplusplus, color: "#00599C" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  go: { icon: SiGo, color: "#00ADD8" },
  rust: { icon: SiRust, color: "#000000" },
  sql: { icon: FaDatabase, color: "#00758F" },
  mysql: { icon: SiMysql, color: "#00618A" },
  postgresql: { icon: SiPostgresql, color: "#4169E1" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  git: { icon: SiGit, color: "#F05032" },
  docker: { icon: SiDocker, color: "#2496ED" },
  kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  linux: { icon: SiLinux, color: "#000000" },
  aws: { icon: FaAws, color: "#FF9900" },
  azure: { icon: FaMicrosoft, color: "#0078D4" },
  gcp: { icon: SiGooglecloud, color: "#4285F4" },
  pytorch: { icon: SiPytorch, color: "#EE4C2C" },
  tensorflow: { icon: SiTensorflow, color: "#FF6F00" },
  keras: { icon: SiKeras, color: "#D00000" },
  scikitlearn: { icon: SiScikitlearn, color: "#F7931E" },
  pandas: { icon: SiPandas, color: "#150458" },
  numpy: { icon: SiNumpy, color: "#013243" },
  anaconda: { icon: SiAnaconda, color: "#44A833" },
  jupyter: { icon: SiJupyter, color: "#F37626" },
  spark: { icon: SiApachespark, color: "#E25A1C" },
  plotly: { icon: SiPlotly, color: "#3F4F75" },
  opencv: { icon: SiOpencv, color: "#5C3EE8" },
  langchain: { icon: SiLangchain, color: "#1C3C3C" },
  huggingface: { icon: SiHuggingface, color: "#FFB000" },
  openai: { icon: SiOpenai, color: "#412991" },
  react: { icon: SiReact, color: "#61DAFB" },
  nextjs: { icon: SiNextdotjs, color: "#000000" },
  nodejs: { icon: SiNodedotjs, color: "#339933" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4" },
  flask: { icon: SiFlask, color: "#000000" },
  django: { icon: SiDjango, color: "#092E20" },
  fastapi: { icon: SiFastapi, color: "#009688" },
};

const defaultSkillIcon: SkillIcon = { icon: GiArtificialIntelligence, color: "#2563EB" };

export function getSkillIcon(key?: string): SkillIcon {
  return (key && skillIcons[key.toLowerCase()]) || defaultSkillIcon;
}

export const socialIcons: Record<SocialPlatform, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
  x: SiX,
  kaggle: SiKaggle,
  medium: SiMedium,
  youtube: FaYoutube,
  website: FaGlobe,
  email: FaEnvelope,
};

export function getSocialIcon(platform: SocialPlatform): IconType {
  return socialIcons[platform] ?? FaCode;
}
