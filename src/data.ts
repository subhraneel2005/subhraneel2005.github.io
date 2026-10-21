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
  { label: "Projects", value: "8+" },
  { label: "Commits (2026)", value: "347" },
  { label: "Bugs", value: "∞" },
];

export const socials = [
  {
    name: "GitHub",
    url: "https://github.com/subhraneel2005",
    icon: Github,
    img: "/icons8-github-96.png",
    label: "GitHub",
  },
  {
    name: "X/Twitter",
    url: "https://x.com/subhraneeltwt",
    icon: Twitter,
    img: "/icons8-x-96.png",
    label: "X",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/subhraneel-goswami-599931282/",
    icon: Linkedin,
    img: "/icons8-linkedin-96.png",
    label: "LinkedIn",
  },
  {
    name: "Email",
    url: "mailto:subhraneeljobs@gmail.com",
    icon: Mail,
    img: "/icons8-gmail-96.png",
    label: "Gmail",
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

export interface Project {
  id: string;
  group: "personal" | "startup";
  title: string;
  description: string;
  github?: string;
  live?: string;
  image?: string;
  tags: string[];
  details: string[];
}

export const projects: Project[] = [
  {
    title: "Dummy — Local-first AI Desktop Assistant",
    id: "dummy",
    group: "personal",
    description:
      "A local-first desktop AI assistant for macOS, Linux & Windows — push-to-talk dictation, circle-capture screenshots, and a tool-using chat that drives a real browser, all running on your own machine with your own API keys.",
    github: "https://github.com/subhraneel2005/dummy",
    tags: [
      "Electron",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Vercel AI SDK",
      "SQLite",
    ],
    image: "/dummy-thumbnail.png",
    details: [
      "Local-first Electron desktop app: hold Alt+D to dictate, transcribed entirely offline with whisper.cpp (base.en), polished by your chosen model, then copied to the clipboard.",
      "BYOK AI providers — OpenAI, Anthropic, Google, xAI, or OpenRouter — with API keys encrypted at rest via the OS keychain (safeStorage) and live model catalogs fetched per provider.",
      "Circle-capture screenshots and PDF/Markdown/text/CSV attachments with provider-aware encoding, per-category byte caps, and content sniffing.",
      "Two browser-automation lanes on the same ToolLoopAgent: an embedded Chromium page driven over raw CDP (8 tools, approval-gated writes) and an autonomous deep-task agent in its own Chrome window.",
      "Human-in-the-loop CAPTCHA handoff (pauses for you instead of bypassing), rate-limit resilience with backoff, and a mutex-guarded browser session pinned by regression tests.",
      "A / skills system with a bundled Reverse Engineering skill (rea-agents) that streams analysis and answers with rendered Mermaid diagrams.",
      "Embedded PTY terminal (node-pty + xterm.js) that is human-only — no model tool can reach the shell.",
      "Persistent chat, settings, keys, and attachments live in local SQLite (libsql + Drizzle); no cloud account, no telemetry, nothing leaves the device except model calls.",
    ],
  },
  {
    title: "Fuck My Resume — 1,000+ users, 22K page views",
    id: "fuck-my-resume",
    group: "personal",
    description:
      "An AI resume tailoring platform that turns a boring PDF into a job-tailored resume, then helps you land the role with cold outreach, a voice mock interviewer, and a public leaderboard.",
    live: "https://fuck-my-resume.vercel.app/",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Better Auth",
      "Drizzle",
      "PostgreSQL",
    ],
    image: "/fmr-thumbnail.png",
    details: [
      "Launched to 1,000+ users with 18K+ impressions and 300+ likes on its X.com launch post.",
      "Uploads a resume PDF + job description and uses an LLM to rewrite/tailor the resume to that exact role, color-coding every AI change (added/rewritten bullets, new skills) so users can audit what changed before downloading.",
      "Renders the tailored resume to PDF entirely in the browser with @react-pdf/renderer (no server-side LaTeX toolchain) and also exports LaTeX (.tex); LinkedIn/GitHub contact links are parsed straight from the uploaded PDF.",
      "Generates copy-paste-ready cold outreach emails and DMs written with the tailored resume in hand.",
      "Voice AI mock interviewer with Minecraft-style seeded interview configs (difficulty, duration, deterministic questions), a hold-to-talk STT → LLM → TTS loop, scored feedback out of 10, and saved transcripts.",
      "Free in-browser voice via transformers.js (Whisper-tiny + Kokoro) or premium OpenAI voice; Google keys fall back to the local browser voice since @ai-sdk/google exposes no STT.",
      "Bring-your-own-key design: OpenAI or Google keys are encrypted server-side and every AI call is billed to the user — no server-side secrets or subscription wall.",
      "Better Auth (Google + GitHub OAuth) on Postgres/Neon with Drizzle ORM; a public leaderboard ranks completed mock interviews by average score, then interview count.",
    ],
  },
  {
    title: "AI Terminal Coding Agent",
    id: "ai-terminal-coding-agent",
    group: "personal",
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
    title: "Agentic AI Study Platform",
    id: "study-toolkit",
    group: "personal",
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
    title: "AI EduMark",
    id: "ai-edumark",
    group: "startup",
    description:
      "AI answer-sheet scanning and marks-card automation platform built at Zenera Labs — a Turborepo monorepo that rasterizes scans, preprocesses pages, and extracts candidate marks with an OpenAI vision model for human review.",
    tags: [
      "Next.js",
      "TypeScript",
      "Turborepo",
      "PostgreSQL",
      "OpenCV",
      "Vercel AI SDK",
    ],
    image: "/projects/ai-edumark.png",
    details: [
      "Built as a Turborepo monorepo: a Next.js 16 web app plus two background workers (image preprocessing and AI evaluation) sharing Drizzle/Neon Postgres, Better Auth, and a shared UI package.",
      "Single-PDF upload pipeline rasterizes multi-page answer booklets into per-page PNGs with pdf-to-img, then stores them per organization and per sheet for downstream processing.",
      "Image worker cleans every page: EXIF auto-rotate, OpenCV.js perspective correction (Canny → quad → warp), denoise, contrast normalization, and blur/resolution quality checks that flag bad scans as needs_review.",
      "AI evaluation worker calls an OpenAI vision model through the Vercel AI SDK with a constrained Zod schema, returning structured per-question marks and confidence — with a no-fabrication boundary that returns null + needsReview when uncertain.",
      "Human-in-the-loop review UI shows reviewers the exact preprocessed images the model saw, lets them edit candidate marks, and finalizes/locks a sheet before it is released.",
      "Question-paper upload + AI extraction bootstraps exams; teachers review/publish drafts, and students join via exam links.",
      "Role-based access (owner/admin/teacher/student) via Better Auth organizations and custom RBAC; students only see released marksheets, with ownership-checked reads.",
    ],
  },
  {
    title: "Deep Research Multi-Agent System",
    id: "deep-research-multi-agent",
    group: "startup",
    description:
      "A LangGraph multi-agent deep research pipeline built at Zenera Labs that decomposes questions, gathers and quality-scores evidence, critiques its own findings, and synthesizes citation-traceable reports streamed over SSE to a Next.js UI.",
    tags: [
      "Python",
      "LangGraph",
      "FastAPI",
      "Pydantic",
      "Next.js",
      "React",
    ],
    image: "/projects/deep-research.png",
    details: [
      "Eight-node LangGraph pipeline: intent extraction → planning → task generation → search/fetch → analysis → critique → follow-up search → synthesis.",
      "EvidenceStore normalizes, deduplicates, and quality-scores every source with a weighted composite (relevance 35%, freshness 25%, author 20%, content 20%).",
      "Search-and-fetch uses Exa for discovery and Firecrawl for full-page content; follow-up search appends new evidence without overwriting prior results.",
      "A critique agent checks unsupported claims, missing evidence, weak sources, contradictions, and research gaps, then loops back for targeted follow-up research.",
      "Synthesis produces a structured report where every claim links to specific evidence IDs and source URLs for claim-level traceability.",
      "FastAPI exposes synchronous and SSE streaming endpoints; a Next.js frontend renders live pipeline progress across Report/Intent/Planning/Tasks/Sources/Evidence/Analysis/Critique tabs.",
      "70 pytest tests run fully offline in ~5s with mocked LLM and API clients.",
    ],
  },
  {
    title: "HealthOS — Claims Intelligence RAG",
    id: "healthos-claims-rag",
    group: "startup",
    description:
      "Claims intelligence service built at Zenera Labs — a deterministic claim validator plus a RAG interpreter that turns payer policies and denial letters into evidence-cited, confidence-scored findings.",
    tags: [
      "Python",
      "FastAPI",
      "RAG",
      "PostgreSQL",
      "Pydantic",
      "Vector Databases",
    ],
    image: "/projects/healthos.png",
    details: [
      "Led the Claims Intelligence track as Claims Intelligence Lead — authored the denial-reason taxonomy, the payer claim-requirements knowledge base, and the end-to-end RAG architecture design.",
      "Track A validator: a rule engine that loads claim-type × payer requirements and returns a readiness score, violations, warnings, and missing-document reports before submission.",
      "Track B RAG interpreter: document ingestion + hybrid retrieval (BM25 + semantic with reciprocal rank fusion and MMR dedupe) feeding the shared AI gateway for denial interpretation.",
      "Every answer cites source documents and is labeled by confidence (found / not found / potentially applicable / requires human confirmation), with below-threshold results routed to a human review queue.",
      "Integrated four services (ai-gateway, claims-rag, document-intelligence, claim-risk) behind one integration facade, with a document-intelligence ingestion adapter and a claim-risk snapshot client.",
      "Built denial taxonomy v1.0 (7 categories, L1/L2/L3 reasons) and a 6-claim-type × 6-payer requirements knowledge base covering coding rules, filing deadlines, and payer-specific rules.",
      "Verified end-to-end with a live integrated-flow demo across process → ingest → interpret → validate → risk assessment.",
    ],
  },
  {
    title: "Offline AI Weapon Detection System",
    id: "weapon-detection",
    group: "startup",
    description:
      "A fully offline, real-time weapon detection system built at Zenera Labs for CCTV feeds and mobile monitoring — edge-first YOLOv8 inference over RTSP, real-time WebSocket alerts, and an Expo operator app, with no cloud dependency.",
    tags: [
      "Python",
      "YOLOv8",
      "ONNX",
      "FastAPI",
      "Docker",
      "Expo",
    ],
    image: "/projects/weapon-detection.png",
    details: [
      "Took end-to-end ownership of a fully offline, real-time inference system covering model inference, video ingestion, backend services, local deployment, and mobile integration.",
      "Edge-first detection pipeline using YOLOv8 exported to ONNX (opset 17), OpenCV, FastAPI, WebSockets, SQLite, Docker, and an Expo/React Native app.",
      "Per-camera async RTSP ingestion with capped inference concurrency; 13 REST endpoints plus a WebSocket alert feed, snapshot capture, and a detection log.",
      "Retraining workflow in Colab (150 epochs, mixup/copy-paste/erasing, hard-negative mining) with ONNX export validated against PyTorch at IoU ≈ 0.98.",
      "Live-tunable sensitivity thresholds and alert cooldowns via the API without restarts; alerts are acknowledged and audited through the mobile operator app.",
      "Docker Compose bundles the backend with a MediaMTX RTSP relay for local test feeds; 15 API contract tests cover the endpoint surface.",
      "Mobile operator view provides live per-camera feeds, alerts with snapshots, logs, and settings over the LAN.",
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
  Electron: `${CDN}/electron/electron-original.svg`,
  SQLite: `${CDN}/sqlite/sqlite-original.svg`,
  OpenCV: `${CDN}/opencv/opencv-original.svg`,
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
