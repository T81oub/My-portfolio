import type { PortfolioConfig } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 *  PORTFOLIO CONFIGURATION
 * ---------------------------------------------------------------------------
 *  This is the only file you need to edit to make the portfolio yours.
 *  Everything below is EXAMPLE data — replace it with your own.
 *
 *  - Images go in   /public/images   and are referenced as "/images/..."
 *  - Your CV goes in /public/resume  and is referenced as "/resume/..."
 *
 *  The chatbot reads this file too, so it can answer questions about you.
 * ---------------------------------------------------------------------------
 */
const portfolio: PortfolioConfig = {
  site: {
    title: "Jane Doe | Machine Learning Engineer",
    description:
      "Interactive AI-powered portfolio of Jane Doe. Chat with an assistant to explore projects, skills, experience and education.",
    brand: "JANE DOE",
  },

  profile: {
    name: "Jane Doe",
    shortName: "Jane",
    title: "Machine Learning Engineer",
    roles: ["Machine Learning Engineer", "Data Scientist", "Full-Stack Developer"],
    location: "Paris, France",
    email: "jane.doe@example.com",
    avatar: "/images/avatar-placeholder.svg",
    openToWork: true,
    status: "Open to ML Engineer and Data Scientist roles",
    bio: [
      "Hello! I'm **Jane Doe**, a machine learning engineer with a background in computer science and applied mathematics. I enjoy turning messy data into products that people actually use.",
      "Over the last few years I have worked on **computer vision**, **forecasting** and **LLM-based applications**, from early prototypes to production systems running on the cloud.",
      "I'm currently looking for a team where I can keep learning, ship meaningful work and collaborate with curious people.",
    ],
    funFacts: [
      "Enjoys hiking and trail running on weekends",
      "Speaks English, French and Spanish",
      "Maintains a small open-source library for time-series feature engineering",
    ],
  },

  socials: [
    { platform: "github", label: "github.com/janedoe", url: "https://github.com/janedoe" },
    { platform: "linkedin", label: "linkedin.com/in/janedoe", url: "https://www.linkedin.com/in/janedoe" },
    { platform: "leetcode", label: "leetcode.com/u/janedoe", url: "https://leetcode.com/u/janedoe" },
  ],

  resumes: [
    { label: "English version", file: "/resume/example-resume.pdf" },
    // Add more versions if you have them:
    // { label: "Version française", file: "/resume/cv-fr.pdf" },
  ],

  skills: [
    {
      title: "Languages & Tools",
      skills: [
        { name: "Python", icon: "python" },
        { name: "TypeScript", icon: "typescript" },
        { name: "SQL", icon: "sql" },
        { name: "Git", icon: "git" },
        { name: "Docker", icon: "docker" },
        { name: "AWS", icon: "aws" },
      ],
    },
    {
      title: "Libraries & Frameworks",
      skills: [
        { name: "PyTorch", icon: "pytorch" },
        { name: "TensorFlow", icon: "tensorflow" },
        { name: "Scikit-learn", icon: "scikitlearn" },
        { name: "Pandas", icon: "pandas" },
        { name: "LangChain", icon: "langchain" },
        { name: "Next.js", icon: "nextjs" },
      ],
    },
    {
      title: "Expertise",
      skills: [
        { name: "Machine Learning" },
        { name: "Deep Learning" },
        { name: "Computer Vision" },
        { name: "NLP" },
        { name: "LLM Apps" },
        { name: "MLOps" },
      ],
    },
  ],

  experience: [
    {
      company: "Acme Analytics",
      role: "Machine Learning Engineer",
      location: "Paris, France",
      startDate: "Mar 2024",
      endDate: "Present",
      description: "Building forecasting and recommendation models for retail clients.",
      highlights: [
        "Designed a demand forecasting pipeline that reduced stock-outs by 18%.",
        "Deployed models as containerised APIs with automated retraining.",
        "Mentored two junior data scientists.",
      ],
    },
    {
      company: "Globex Corporation",
      role: "Data Scientist Intern",
      location: "Lyon, France",
      startDate: "Feb 2023",
      endDate: "Aug 2023",
      description: "Worked on defect detection for an industrial production line.",
      highlights: [
        "Trained a CNN-based classifier reaching 94% accuracy on real factory images.",
        "Built a labelling tool that cut annotation time in half.",
      ],
    },
  ],

  education: [
    {
      degree: "MSc in Computer Science, Artificial Intelligence",
      institution: "Example University",
      location: "Paris, France",
      startDate: "2022",
      endDate: "2024",
    },
    {
      degree: "BSc in Applied Mathematics",
      institution: "Sample Institute of Technology",
      location: "Lyon, France",
      startDate: "2019",
      endDate: "2022",
    },
  ],

  projects: [
    {
      title: "AI Portfolio Assistant",
      description:
        "An interactive portfolio where visitors chat with an LLM that answers questions and renders UI components through tool calling.",
      image: "/images/projects/example-project-1.svg",
      tools: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS"],
      category: "AI",
      startDate: "2026-01-05",
      status: "Completed",
      githubUrl: "https://github.com/janedoe/ai-portfolio",
    },
    {
      title: "Satellite Image Segmentation",
      description:
        "Semantic segmentation of buildings from satellite imagery with a U-Net model and a small web viewer for the predictions.",
      image: "/images/projects/example-project-2.svg",
      tools: ["Python", "PyTorch", "GeoPandas"],
      category: "AI",
      startDate: "2025-04-10",
      status: "Completed",
      githubUrl: "https://github.com/janedoe/satellite-segmentation",
    },
    {
      title: "Expense Tracker",
      description:
        "A full-stack web app to track and categorise personal expenses, with charts and CSV export.",
      image: "/images/projects/example-project-3.svg",
      tools: ["React", "Node.js", "PostgreSQL"],
      category: "Web",
      startDate: "2024-09-01",
      status: "In Progress",
      githubUrl: "https://github.com/janedoe/expense-tracker",
      liveDemoUrl: "https://example.com",
    },
  ],

  appearance: {
    defaultTheme: "light", // "light" | "dark"
    defaultFont: "sans", // "sans" | "serif" | "mono"
    defaultTextSize: "md", // "sm" | "md" | "lg"
  },

  chatbot: {
    welcomeMessage: "Hi! Ask me anything about my work, projects or skills.",
    tone: "Warm, friendly and professional. Short, natural sentences. Light use of emojis is fine.",
    privateTopics: ["family", "relationships", "religion", "politics", "health"],
  },
};

export default portfolio;
