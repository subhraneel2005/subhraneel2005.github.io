import { Github, Twitter, Linkedin, Globe, Cpu, BookOpen, Video, MessageSquare, Briefcase, Mail } from 'lucide-react';

export const profile = {
  name: "Subhraneel Goswami",
  username: "subhraneel2005",
  title: "Fullstack/AI Engineer",
  bio: "engineer . building anonymous Q&A app . documenting 0 - 1",
  email: "subhraneeljobs@gmail.com",
  status: "Anonymous AMA App",
  openToWork: true,
  avatar: "https://github.com/subhraneel2005.png",
};

export const stats = [
  { label: "Projects", value: "6+" },
  { label: "Commits (2026)", value: "347" },
  { label: "Bugs", value: "∞" }
];

export const socials = [
  {
    name: "GitHub",
    url: "https://github.com/subhraneel2005",
    icon: Github,
  },
  {
    name: "X/Twitter",
    url: "https://x.com/subhraneeltwt",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/subhraneel-goswami-599931282/",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:subhraneeljobs@gmail.com",
    icon: Mail,
  }
];

export const projects = [
  {
    title: "Anonymous AMA App",
    id: "ama",
    description: "Personal AMA page with strong spam protection & abuse filtering. Safe anonymous interactions with Gemini moderation.",
    github: "https://github.com/subhraneel2005/ama-app",
    tags: ["Next.js", "Gemini", "Postgres"],
    image: "https://raw.githubusercontent.com/subhraneel2005/me-link-in-bio/main/public/ama-gh.jpg"
  },
  {
    title: "UseCerebr",
    id: "knowledge-base",
    description: "A personal knowledge graph/second brain that connects ideas across sources like youtube videos, research papers, blogs and articles, X posts/arcticles.",
    github: "https://github.com/subhraneel2005/usecerebr",
    tags: ["Python", "FastAPI", "Qdrant", "OpenAI", "Redis", "Docker"],
    image: "https://raw.githubusercontent.com/subhraneel2005/subhraneel2005.github.io/main/public/usecerebr.png"
  },
  {
    title: "AI Terminal Coding Agent",
    id: "terminal",
    description: "Built a CLI-based AI coding agent capable of autonomous tool usage for navigating and modifying codebases.",
    github: "https://github.com/subhraneel2005/sidequests",
    tags: ["TypeScript", "OpenRouter", "Google-Gemini", "Tool Calling", "Node.js"],
    image: "https://raw.githubusercontent.com/subhraneel2005/me-link-in-bio/main/public/coding-agent-gh.jpg"
  },
  {
    title: "AI Video Generation Pipeline",
    id: "vidgen",
    description: "Built an end-to-end AI video generation pipeline that converts a single text prompt into ready-to-publish TikTok/Reels/Shorts videos.",
    github: "https://github.com/subhraneel2005/",
    tags: ["Remotion", "Whisper.cpp", "Eleven Labs", "TypeScript", "AI-SDK", "OpenAI"],
    image: "https://raw.githubusercontent.com/subhraneel2005/me-link-in-bio/main/public/vidgen-gh.jpg"
  },
  {
    title: "Agentic AI Study Platform",
    id: "study",
    description: "Built an open-source, student-first productivity platform to help students manage real academic workflows.",
    github: "https://github.com/subhraneel2005/study-toolkit",
    tags: ["Next.js", "TypeScript RSC", "Server Actions", "Vercel AI SDK", "Gemini"],
    image: "https://raw.githubusercontent.com/subhraneel2005/me-link-in-bio/main/public/study-toolkit-gh.jpg"
  }
];

export const experience = [
  {
    role: "Fullstack engineer",
    company: "Kasukabe Labs (Web and App dev Agency)",
    period: "Oct 2025 - Jan 2026",
    description: "Built a cross platform inventory management app for a business's warehouse, it included scanning, listing, adding, role based access control and many more. Made the app using expo."
  },
  {
    role: "Full Stack Developer Intern",
    company: "Jobsforce.ai",
    period: "Mar 2025 - Sep 2025",
    description: "Developed a full-stack AI-powered Chrome extension using Plasmo. Implemented real-time communication between LLMs and users using WebSockets and Node.js. Built scalable frontend data handling for 5,000+ job listings using pagination and infinite scroll. Designed and implemented secure authentication APIs with role-based access control middleware."
  }
];

export const skills = [
  "TypeScript", "JavaScript", "Python", "Java", "SQL",
  "React", "Next.js (App Router, RSC)", "HTML5", "CSS3", "Tailwind CSS", "shadcn/ui",
  "Node.js", "FastAPI", "REST APIs", "tRPC", "WebSockets", "Server Actions", "Authentication", "Authorization", "JWT", "Redis",
  "PostgreSQL", "MongoDB", "Prisma",
  "OpenAI API", "Gemini API", "Vercel AI SDK", "Tool Calling", "Streaming", "AI Agents", "RAG", "Vector Databases", "Qdrant", "Sentence Transformers",
  "Vercel", "NeonDB", "AWS", "Docker", "GCP",
  "Git", "GitHub", "Cursor", "Claude Code", "Opencode"
];
