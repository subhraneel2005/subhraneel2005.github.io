import {
  Github,
  Twitter,
  Linkedin,
  Globe,
  BookOpen,
  Video,
  MessageSquare,
  Briefcase,
  Mail,
  MapPin,
} from "lucide-react";

export const profile = {
  name: "Subhraneel Goswami",
  username: "subhraneel2005",
  title: "Backend & AI Engineer",
  bio: "Building, Writing, Breaking. Documenting 0 - ∞",
  email: "subhraneeljobs@gmail.com",
  status: "Job Hunting",
  openToWork: true,
  avatar: "/new-me.png",
};

export const stats = [
  { label: "Projects", value: "6+" },
  { label: "Commits (2026)", value: "347" },
  { label: "Bugs", value: "∞" },
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
  },
];

export const education = [
  {
    school: "Institute of Engineering and Management Kolkata",
    degree: "Bachelor of Computer Applications",
    period: "Jun 2023 - May 2026",
    location: "Kolkata, IN",
  },
];

export const projects = [
  {
    title: "AI Terminal Coding Agent",
    id: "ai-terminal-coding-agent",
    description:
      "Built a CLI-based AI coding agent capable of autonomous tool usage for navigating and modifying codebases.",
    github: "https://github.com/subhraneel2005/sidequests",
    tags: [
      "TypeScript",
      "OpenRouter",
      "Google-Gemini",
      "Tool Calling",
      "Node.js",
    ],
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
      "Wrote comprehensive error recovery — the agent retries on API failures, rolls back partial file writes, and handles unexpected tool outputs gracefully.",
    ],
  },
  {
    title: "DDIA Labs",
    id: "ddia-labs",
    description:
      "Hands-on experiments replicating ideas from Designing Data-Intensive Applications by Martin Kleppmann — self-healing process supervision and Twitter-style fan-out strategies.",
    github: "https://github.com/subhraneel2005/ddia-lab",
    tags: [
      "TypeScript",
      "Node.js",
      "Process Supervision",
      "Heartbeats",
      "Fan-Out",
      "Strategy Pattern",
    ],
    image: "/ddia-lab.png",
    details: [
      "Experiment 1 — Self-Healing Supervisor: a supervisor process spawns and monitors a worker, restarting it on non-zero exit codes. Instead of preventing every failure, the system detects faults and recovers automatically.",
      "Workers now randomly pick a behavior (normal, hung, or crashed). Hang detection is done via JSON heartbeats — the supervisor kills a worker that goes silent for 10s.",
      "Restarts are limited to 10 consecutive failures with backoff, resetting on successful exit to avoid infinite restart loops.",
      "Experiment 2 — Twitter Fan-Out: simulates and compares Push (write-path) and Pull (read-path) delivery, showing the write-amplification vs read-amplification tradeoff.",
      "Measures work counts for VIP (500K followers) vs regular users; a hybrid VIP-only pull variant hints at how real systems merge pushed celebrity tweets with pulled regular ones.",
      "Cleanly separates the algorithms into interchangeable strategy classes (PushStrategy, PullStrategy) for easy comparison and swapping.",
    ],
  },
  {
    title: "Agentic AI Study Platform",
    id: "study-toolkit",
    description:
      "Built an open-source, student-first productivity platform to help students manage real academic workflows.",
    github: "https://github.com/subhraneel2005/study-toolkit",
    live: "https://study-toolkit.vercel.app",
    tags: [
      "Next.js",
      "TypeScript RSC",
      "Server Actions",
      "Vercel AI SDK",
      "Gemini",
    ],
    image: "/study-toolkit.png",
    details: [
      "Built an open-source, student-first productivity platform with AI-powered study tools including flashcard generation, quiz creation, and PDF Q&A.",
      "Used Next.js React Server Components and Server Actions for data fetching and mutations — minimal client JavaScript for fast page loads.",
      "Integrated Vercel AI SDK with Gemini for streaming AI responses in flashcards, quizzes, and document chat features.",
    ],
  },
  {
    title: "Multi-Agent Customer Support System",
    id: "multi-agent-cs",
    description:
      "Designed a multi-agent customer support orchestration system with specialized agents for triage, billing, technical, and general queries.",
    github: "https://github.com/subhraneel2005/multi-agent-cs-system",
    image: "/multi-agent-cs-system.png",
    tags: [
      "Python",
      "LangGraph",
      "FastAPI",
      "Qdrant",
      "Pydantic",
      "Redis",
      "Docker",
    ],
    details: [
      "Designed a multi-agent customer support orchestration system where specialized agents (triage, billing, technical, general) handle incoming queries based on intent classification.",
      "Used LangGraph to define agent state graphs — each agent has a structured workflow with tool-binding, conditional edges, and human-in-the-loop escalation.",
      "Built a FastAPI gateway that routes incoming requests to the appropriate agent graph based on LLM-based intent classification with fallback to general agent.",
      "Integrated Qdrant as a knowledge base vector store for FAQ retrieval — agents can query stored documentation and past resolutions to answer accurately.",
      "All agents share a structured Pydantic state schema for consistent message history, tool call tracking, and escalation management.",
      "Docker Compose setup with FastAPI, Qdrant, and Redis for easy local deployment.",
    ],
  },
];

export const experience = [
  {
    role: "AI Engineer",

    company: "Zenera Labs",

    period: "Aug 2026 - Present",

    location: "Bengaluru, Remote",

    description:
      "Building applied ML models and a fully offline, real-time edge AI detection system for CCTV feeds and mobile monitoring.",

    details: [
      "Developed and evaluated a Breast Cancer Classification model using Python and scikit-learn, analyzing classification performance across multiple evaluation metrics including precision, recall, F1-score, and confusion matrix.",

      "Taking end-to-end ownership of a fully offline, real-time AI weapon detection inference system for CCTV feeds, covering model inference, video ingestion, backend services, local deployment, and mobile integration; reviewed asynchronously by the manager and founder.",

      "Engineering an edge-first detection pipeline using YOLOv8, ONNX/NCNN, OpenCV, FastAPI, WebSockets, SQLite, Docker, and Expo/React Native, enabling local RTSP inference, real-time alerts, detection logs, and mobile monitoring without cloud dependency.",
    ],
  },

  {
    role: "Backend & Applied AI Intern",

    company: "Kasukabe Labs",

    period: "Oct 2025 - Jan 2026",

    location: "Kolkata, Remote",

    description:
      "Built an end-to-end AI video generation pipeline and production backend services using Python, FastAPI, and LLMs.",

    details: [
      "Built an end-to-end AI video generation pipeline that converts text into narrated videos using LLMs, speech-to-text (STT), text-to-speech (TTS), FFmpeg, and asynchronous processing.",

      "Developed production backend APIs using FastAPI for orchestrating AI workflows, media generation, and file processing.",

      "Implemented retrieval workflows and prompt pipelines to improve content generation quality and contextual relevance.",

      "Worked with asynchronous task execution and long-running AI jobs for video generation and batched processing.",

      "Integrated multiple AI models and external services into a unified backend pipeline while improving reliability and observability.",

      "Documneted every step and decision while collaborating with the Senior engineer to ship AI features and backend services.",

      "Built the entire infinite canvas interface in Next.js for visualizing AI service nodes, workflow graphs, and persistent chat interfaces with state persistence.",
    ],
  },

  {
    role: "Full Stack Engineering Intern",

    company: "Jobsforce.ai",

    period: "Mar 2025 - Sep 2025",

    location: "Remote",

    description:
      "Built customer-facing AI products including a Chrome extension and an end-to-end AI Mock Interviewer.",

    details: [
      "Built a full-stack Chrome extension using React, TypeScript, Plasmo, Node.js, and PostgreSQL for AI-powered job assistance.",

      "Developed an end-to-end AI Mock Interviewer with LLM integrations, real-time interview workflows, backend APIs, and conversational AI features.",

      "Implemented authentication systems, API integrations, and backend services powering customer-facing applications.",

      "Worked across the full stack using React, Next.js, Node.js, TypeScript, PostgreSQL, and modern web development practices.",

      "Collaborated closely with the engineering team to build, test, and ship production features used by customers.",

      "Contributed to AI integrations and product features while participating in code reviews and iterative product development.",
    ],
  },
];

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const projectTagIcons: Record<string, string> = {
  TypeScript: `${CDN}/typescript/typescript-original.svg`,
  "TypeScript RSC": `${CDN}/typescript/typescript-original.svg`,
  JavaScript: `${CDN}/javascript/javascript-original.svg`,
  Python: `${CDN}/python/python-original.svg`,
  Java: `${CDN}/java/java-original.svg`,
  "Go (learning)": `${CDN}/go/go-original-wordmark.svg`,
  SQL: `${CDN}/mysql/mysql-original-wordmark.svg`,
  React: `${CDN}/react/react-original.svg`,
  "Next.js": `${CDN}/nextjs/nextjs-original.svg`,
  Expo: `${CDN}/expo/expo-original.svg`,
  HTML5: `${CDN}/html5/html5-original.svg`,
  CSS3: `${CDN}/css3/css3-original.svg`,
  "Tailwind CSS": `${CDN}/tailwindcss/tailwindcss-original.svg`,
  "Node.js": `${CDN}/nodejs/nodejs-original.svg`,
  Bun: `${CDN}/bun/bun-original.svg`,
  FastAPI: `${CDN}/fastapi/fastapi-original.svg`,
  tRPC: `${CDN}/trpc/trpc-original.svg`,
  Redis: `${CDN}/redis/redis-original.svg`,
  PostgreSQL: `${CDN}/postgresql/postgresql-original.svg`,
  MongoDB: `${CDN}/mongodb/mongodb-original.svg`,
  Prisma: `${CDN}/prisma/prisma-original.svg`,
  Docker: `${CDN}/docker/docker-original.svg`,
  AWS: `${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  Git: `${CDN}/git/git-original.svg`,
  GitHub: `${CDN}/github/github-original.svg`,
  Vercel: `${CDN}/vercel/vercel-original.svg`,
  "Vercel AI SDK": `${CDN}/vercel/vercel-original.svg`,
  Gemini: "/icons/gemini.svg",
  "Google-Gemini": "/icons/gemini.svg",
  "Gemini 2.5 Flash": "/icons/gemini.svg",
  LangGraph: "/icons/langgraph.svg",
  Qdrant: "/icons/qdrant.svg",
  shadcn: "/icons/shadcn.svg",
  Cursor: "/icons/cursor.svg",
  "Claude Code": "/icons/claude-code.svg",
  Opencode: "/icons/opencode.svg",
  Pydantic: "/icons/pydantic.svg",
  OpenRouter: "/icons/openrouter.svg",
};

export const skills = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", icon: `${CDN}/typescript/typescript-original.svg` },
      { name: "JavaScript", icon: `${CDN}/javascript/javascript-original.svg` },
      { name: "Python", icon: `${CDN}/python/python-original.svg` },
      { name: "Java", icon: `${CDN}/java/java-original.svg` },
      { name: "Go (learning)", icon: `${CDN}/go/go-original-wordmark.svg` },
      { name: "SQL", icon: `${CDN}/mysql/mysql-original-wordmark.svg` },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: `${CDN}/react/react-original.svg` },
      {
        name: "Next.js (App Router, RSC)",
        icon: `${CDN}/nextjs/nextjs-original.svg`,
      },
      { name: "Expo", icon: `${CDN}/expo/expo-original.svg` },
      { name: "HTML5", icon: `${CDN}/html5/html5-original.svg` },
      { name: "CSS3", icon: `${CDN}/css3/css3-original.svg` },
      {
        name: "Tailwind CSS",
        icon: `${CDN}/tailwindcss/tailwindcss-original.svg`,
      },
      { name: "shadcn/ui", icon: "/icons/shadcn.svg" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: `${CDN}/nodejs/nodejs-original.svg` },
      { name: "Bun", icon: `${CDN}/bun/bun-original.svg` },
      { name: "FastAPI", icon: `${CDN}/fastapi/fastapi-original.svg` },
      { name: "REST APIs" },
      { name: "tRPC", icon: `${CDN}/trpc/trpc-original.svg` },
      { name: "WebSockets" },
      { name: "Server Actions" },
      { name: "Authentication", icon: `${CDN}/oauth/oauth-original.svg` },
      { name: "Authorization", icon: `${CDN}/oauth/oauth-original.svg` },
      { name: "JWT", icon: `${CDN}/oauth/oauth-original.svg` },
      { name: "Redis", icon: `${CDN}/redis/redis-original.svg` },
    ],
  },
  {
    category: "Databases & ORM",
    items: [
      { name: "PostgreSQL", icon: `${CDN}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", icon: `${CDN}/mongodb/mongodb-original.svg` },
      { name: "Prisma", icon: `${CDN}/prisma/prisma-original.svg` },
    ],
  },
  {
    category: "AI & LLM Systems",
    items: [
      { name: "OpenAI API" },
      { name: "Gemini API", icon: "/icons/gemini.svg" },
      { name: "Vercel AI SDK", icon: `${CDN}/vercel/vercel-original.svg` },
      { name: "Tool Calling" },
      { name: "Streaming" },
      { name: "AI Agents" },
      { name: "RAG" },
      { name: "Vector Databases" },
      { name: "Qdrant", icon: "/icons/qdrant.svg" },
      { name: "Sentence Transformers" },
      { name: "LangGraph", icon: "/icons/langgraph.svg" },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Vercel", icon: `${CDN}/vercel/vercel-original.svg` },
      { name: "NeonDB" },
      {
        name: "AWS",
        icon: `${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
      },
      { name: "Docker", icon: `${CDN}/docker/docker-original.svg` },
      { name: "GCP" },
      { name: "Kubernetes (learning)" },
    ],
  },
  {
    category: "Developer Tools",
    items: [
      { name: "Git", icon: `${CDN}/git/git-original.svg` },
      { name: "GitHub", icon: `${CDN}/github/github-original.svg` },
      { name: "Cursor", icon: "/icons/cursor.svg" },
      { name: "Claude Code", icon: "/icons/claude-code.svg" },
      { name: "Opencode", icon: "/icons/opencode.svg" },
    ],
  },
];
