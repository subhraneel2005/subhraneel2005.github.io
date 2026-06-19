import { Github, Twitter, Linkedin, Globe, BookOpen, Video, MessageSquare, Briefcase, Mail, MapPin } from 'lucide-react';

export const profile = {
  name: "Subhraneel Goswami",
  username: "subhraneel2005",
  title: "Backend & Applied AI Engineer",
  bio: "Building, Writing, Breaking. Documenting 0 - ∞",
  email: "subhraneeljobs@gmail.com",
  status: "Job Hunting",
  openToWork: true,
  avatar: "/me.jpg",
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

export const education = [
  {
    school: "Institute of Engineering and Management Kolkata",
    degree: "Bachelor of Computer Applications",
    period: "Jun 2023 - May 2026",
    location: "Kolkata, IN"
  }
];

export const projects = [
  {
    title: "AI Terminal Coding Agent",
    id: "ai-terminal-coding-agent",
    description: "Built a CLI-based AI coding agent capable of autonomous tool usage for navigating and modifying codebases.",
    github: "https://github.com/subhraneel2005/sidequests",
    tags: ["TypeScript", "OpenRouter", "Google-Gemini", "Tool Calling", "Node.js"],
    image: "/ai-coding-agent.png",
    details: [
      "Built a CLI-based AI coding agent that autonomously navigates, reads, and modifies codebases using tool calling — supporting 20+ tools (read file, edit, grep, glob, bash, etc.).",
      "Integrated OpenRouter API for multi-model routing, with automatic fallback across Gemini, Claude, and GPT models based on availability/rate-limits.",
      "Implemented token-efficient context management — maintains conversation history within a sliding window of ~100k tokens to stay under model context limits.",
      "Built a diff-based file editing system that applies changes with line-level precision and automatic backup/restore on failure.",
      "Extended tool system with Bash execution (sandboxed), glob-based file discovery, and structured project tree mapping.",
      "Added support for user-defined custom tools via a plugin-like configuration schema.",
      "Implemented a permission system for dangerous operations (write, delete, bash) with allowlists.",
      "Designed the system with a clean separation of Tool interface, LLM provider abstraction, and Session management.",
      "Wrote comprehensive error recovery — the agent retries on API failures, rolls back partial file writes, and handles unexpected tool outputs gracefully."
    ]
  },
  {
    title: "Usecerebr",
    id: "usecerebr",
    description: "A personal knowledge graph/second brain that connects ideas across sources like youtube videos, research papers, blogs and articles, X posts/articles.",
    github: "https://github.com/subhraneel2005/usecerebr",
    tags: ["Python", "FastAPI", "Qdrant", "Gemini 2.5 Flash", "Redis", "Docker"],
    image: "/usecerbr.png",
    details: [
      "A personal knowledge graph / second brain connecting ideas across YouTube videos, research papers, blogs, articles, X posts, and GitHub repos.",
      "Ingests content via multiple sources: YouTube transcripts (yt-dlp), ArXiv papers (PDF parsing via PyMuPDF), web articles (trafilatura), and X/Twitter threads.",
      "Chunks and embeds content using sentence-transformers (all-MiniLM-L6-v2) and Gemini 2.5 Flash for high-quality semantic embeddings.",
      "Stores vectors in Qdrant with rich metadata (source type, URL, timestamp) for hybrid search (semantic + keyword + metadata filtering).",
      "Uses Redis for caching frequent queries and managing ingestion job queues, reducing response times by ~40%.",
      "Docker Compose setup with FastAPI, Qdrant, and Redis for easy local deployment."
    ]
  },
  {
    title: "Agentic AI Study Platform",
    id: "study-toolkit",
    description: "Built an open-source, student-first productivity platform to help students manage real academic workflows.",
    github: "https://github.com/subhraneel2005/study-toolkit",
    live: "https://study-toolkit.vercel.app",
    tags: ["Next.js", "TypeScript RSC", "Server Actions", "Vercel AI SDK", "Gemini"],
    image: "/study-toolkit.png",
    details: [
      "Built an open-source, student-first productivity platform with AI-powered study tools including flashcard generation, quiz creation, and PDF Q&A.",
      "Used Next.js React Server Components and Server Actions for data fetching and mutations — minimal client JavaScript for fast page loads.",
      "Integrated Vercel AI SDK with Gemini for streaming AI responses in flashcards, quizzes, and document chat features."
    ]
  },
  {
    title: "Multi-Agent Customer Support System",
    id: "multi-agent-cs",
    description: "Designed a multi-agent customer support orchestration system with specialized agents for triage, billing, technical, and general queries.",
    github: "https://github.com/subhraneel2005/multi-agent-cs-system",
    image: "/multi-agent-cs-system.png",
    tags: ["Python", "LangGraph", "FastAPI", "Qdrant", "Pydantic", "Redis", "Docker"],
    details: [
      "Designed a multi-agent customer support orchestration system where specialized agents (triage, billing, technical, general) handle incoming queries based on intent classification.",
      "Used LangGraph to define agent state graphs — each agent has a structured workflow with tool-binding, conditional edges, and human-in-the-loop escalation.",
      "Built a FastAPI gateway that routes incoming requests to the appropriate agent graph based on LLM-based intent classification with fallback to general agent.",
      "Integrated Qdrant as a knowledge base vector store for FAQ retrieval — agents can query stored documentation and past resolutions to answer accurately.",
      "All agents share a structured Pydantic state schema for consistent message history, tool call tracking, and escalation management.",
      "Docker Compose setup with FastAPI, Qdrant, and Redis for easy local deployment."
    ]
  }
];

export const experience = [
  {
    role: "Fullstack Engineer",
    company: "Kasukabe Labs (Web and App dev Agency)",
    period: "Oct 2025 - Jan 2026",
    location: "Kolkata, Remote",
    description: "Built a cross platform inventory management app for a business's warehouse using Expo and FastAPI.",
    details: [
      "Built a cross-platform inventory management app for a retail business warehouse using Expo (React Native).",
      "Implemented barcode scanning, inventory listing, add/edit items, role-based access control (Admin, Manager, Staff).",
      "Migrated the legacy PHP backend to a FastAPI + PostgreSQL stack improving API response times by ~60%.",
      "Designed a role-based middleware system with JWT authentication for secure API access.",
      "Set up Docker containers for the backend and database for consistent local-to-production deployments.",
      "Implemented push notifications via Firebase Cloud Messaging (FCM) for low-stock alerts and order confirmations.",
      "Created an admin dashboard with real-time inventory analytics and reporting."
    ]
  },
  {
    role: "Full Stack Developer Intern",
    company: "Jobsforce.ai",
    period: "Mar 2025 - Sep 2025",
    location: "SF, Remote",
    description: "Developed a full-stack AI-powered Chrome extension using Plasmo with real-time LLM communication.",
    details: [
      "Built an AI-powered Chrome extension for job descriptions, resumes, and cover letters using Plasmo, achieving 200+ daily users.",
      "Developed a Chrome extension content-script to auto-inject an LLM chat interface across job platforms (LinkedIn, Indeed, Wellfound) — serving ~500+ DAU.",
      "Engineered real-time bi-directional LLM streaming across browser - extension - backend using WebSockets and SSE for near-instant message delivery.",
      "Built scalable frontend data handling for 5,000+ job listings using pagination and infinite scroll patterns.",
      "Designed and implemented secure authentication APIs with role-based access control middleware in Node.js/Express."
    ]
  }
];

export const skills = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "Go (learning)", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js (App Router, RSC)", "Expo", "HTML5", "CSS3", "Tailwind CSS", "shadcn/ui"] },
  { category: "Backend", items: ["Node.js", "Bun", "FastAPI", "REST APIs", "tRPC", "WebSockets", "Server Actions", "Authentication", "Authorization", "JWT", "Redis"] },
  { category: "Databases & ORM", items: ["PostgreSQL", "MongoDB", "Prisma"] },
  { category: "AI & LLM Systems", items: ["OpenAI API", "Gemini API", "Vercel AI SDK", "Tool Calling", "Streaming", "AI Agents", "RAG", "Vector Databases", "Qdrant", "Sentence Transformers", "LangGraph"] },
  { category: "Infrastructure", items: ["Vercel", "NeonDB", "AWS", "Docker", "GCP", "Kubernetes (learning)"] },
  { category: "Developer Tools", items: ["Git", "GitHub", "Cursor", "Claude Code", "Opencode"] }
];
