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
  name: "subhraneel goswami",
  username: "subhraneel2005",
  title: "backend & ai engineer",
  bio: "building, writing, breaking. documenting 0 - ∞",
  email: "subhraneeljobs@gmail.com",
  status: "job hunting",
  openToWork: true,
  avatar: "/new-me.png",
};

export const stats = [
  { label: "projects", value: "8+" },
  { label: "commits (2026)", value: "347" },
  { label: "bugs", value: "∞" },
];

export const socials = [
  {
    name: "github",
    url: "https://github.com/subhraneel2005",
    icon: Github,
    img: "/icons8-github-96.png",
    label: "github",
  },
  {
    name: "x/twitter",
    url: "https://x.com/subhraneeltwt",
    icon: Twitter,
    img: "/icons8-x-96.png",
    label: "x",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/subhraneel-goswami-599931282/",
    icon: Linkedin,
    img: "/icons8-linkedin-96.png",
    label: "linkedin",
  },
  {
    name: "email",
    url: "mailto:subhraneeljobs@gmail.com",
    icon: Mail,
    img: "/icons8-gmail-96.png",
    label: "gmail",
  },
];

export const education = [
  {
    school: "institute of engineering and management kolkata",
    degree: "bachelor of computer applications",
    period: "jun 2023 - may 2026",
    location: "kolkata, in",
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
    title: "dummy - local-first ai desktop assistant",
    id: "dummy",
    group: "personal",
    description:
      "a local-first desktop ai assistant for macos, linux & windows - push-to-talk dictation, circle-capture screenshots, and a tool-using chat that drives a real browser, all running on your own machine with your own api keys.",
    github: "https://github.com/subhraneel2005/dummy",
    tags: [
      "electron",
      "typescript",
      "next.js",
      "node.js",
      "vercel ai sdk",
      "sqlite",
    ],
    image: "/dummy-thumbnail.png",
    details: [
      "local-first electron desktop app: hold alt+d to dictate, transcribed entirely offline with whisper.cpp (base.en), polished by your chosen model, then copied to the clipboard.",
      "byok ai providers - openai, anthropic, google, xai, or openrouter - with api keys encrypted at rest via the os keychain (safestorage) and live model catalogs fetched per provider.",
      "circle-capture screenshots and pdf/markdown/text/csv attachments with provider-aware encoding, per-category byte caps, and content sniffing.",
      "two browser-automation lanes on the same toolloopagent: an embedded chromium page driven over raw cdp (8 tools, approval-gated writes) and an autonomous deep-task agent in its own chrome window.",
      "human-in-the-loop captcha handoff (pauses for you instead of bypassing), rate-limit resilience with backoff, and a mutex-guarded browser session pinned by regression tests.",
      "a / skills system with a bundled reverse engineering skill (rea-agents) that streams analysis and answers with rendered mermaid diagrams.",
      "embedded pty terminal (node-pty + xterm.js) that is human-only - no model tool can reach the shell.",
      "persistent chat, settings, keys, and attachments live in local sqlite (libsql + drizzle); no cloud account, no telemetry, nothing leaves the device except model calls.",
    ],
  },
  {
    title: "fuck my resume - 1,000+ users, 22k page views",
    id: "fuck-my-resume",
    group: "personal",
    description:
      "an ai resume tailoring platform that turns a boring pdf into a job-tailored resume, then helps you land the role with cold outreach, a voice mock interviewer, and a public leaderboard.",
    live: "https://fuck-my-resume.vercel.app/",
    tags: [
      "next.js",
      "typescript",
      "tailwind css",
      "better auth",
      "drizzle",
      "postgresql",
    ],
    image: "/fmr-thumbnail.png",
    details: [
      "launched to 1,000+ users with 18k+ impressions and 300+ likes on its x.com launch post.",
      "uploads a resume pdf + job description and uses an llm to rewrite/tailor the resume to that exact role, color-coding every ai change (added/rewritten bullets, new skills) so users can audit what changed before downloading.",
      "renders the tailored resume to pdf entirely in the browser with @react-pdf/renderer (no server-side latex toolchain) and also exports latex (.tex); linkedin/github contact links are parsed straight from the uploaded pdf.",
      "generates copy-paste-ready cold outreach emails and dms written with the tailored resume in hand.",
      "voice ai mock interviewer with minecraft-style seeded interview configs (difficulty, duration, deterministic questions), a hold-to-talk stt → llm → tts loop, scored feedback out of 10, and saved transcripts.",
      "free in-browser voice via transformers.js (whisper-tiny + kokoro) or premium openai voice; google keys fall back to the local browser voice since @ai-sdk/google exposes no stt.",
      "bring-your-own-key design: openai or google keys are encrypted server-side and every ai call is billed to the user - no server-side secrets or subscription wall.",
      "better auth (google + github oauth) on postgres/neon with drizzle orm; a public leaderboard ranks completed mock interviews by average score, then interview count.",
    ],
  },
  {
    title: "ai terminal coding agent",
    id: "ai-terminal-coding-agent",
    group: "personal",
    description:
      "built a cli-based ai coding agent capable of autonomous tool usage for navigating and modifying codebases.",
    github: "https://github.com/subhraneel2005/sidequests",
    tags: [
      "typescript",
      "openrouter",
      "google-gemini",
      "tool calling",
      "node.js",
    ],
    image: "/ai-coding-agent.png",
    details: [
      "built a cli-based ai coding agent that autonomously navigates, reads, and modifies codebases using tool calling - supporting 20+ tools (read file, edit, grep, glob, bash, etc.).",
      "integrated openrouter api for multi-model routing, with automatic fallback across gemini, claude, and gpt models based on availability/rate-limits.",
      "implemented token-efficient context management - maintains conversation history within a sliding window of ~100k tokens to stay under model context limits.",
      "built a diff-based file editing system that applies changes with line-level precision and automatic backup/restore on failure.",
      "extended tool system with bash execution (sandboxed), glob-based file discovery, and structured project tree mapping.",
      "added support for user-defined custom tools via a plugin-like configuration schema.",
      "implemented a permission system for dangerous operations (write, delete, bash) with allowlists.",
      "designed the system with a clean separation of tool interface, llm provider abstraction, and session management.",
      "wrote comprehensive error recovery - the agent retries on api failures, rolls back partial file writes, and handles unexpected tool outputs gracefully.",
    ],
  },
  {
    title: "agentic ai study platform",
    id: "study-toolkit",
    group: "personal",
    description:
      "built an open-source, student-first productivity platform to help students manage real academic workflows.",
    github: "https://github.com/subhraneel2005/study-toolkit",
    live: "https://study-toolkit.vercel.app",
    tags: [
      "next.js",
      "typescript rsc",
      "server actions",
      "vercel ai sdk",
      "gemini",
    ],
    image: "/study-toolkit.png",
    details: [
      "built an open-source, student-first productivity platform with ai-powered study tools including flashcard generation, quiz creation, and pdf q&a.",
      "used next.js react server components and server actions for data fetching and mutations - minimal client javascript for fast page loads.",
      "integrated vercel ai sdk with gemini for streaming ai responses in flashcards, quizzes, and document chat features.",
    ],
  },
  {
    title: "ai edumark",
    id: "ai-edumark",
    group: "startup",
    description:
      "ai answer-sheet scanning and marks-card automation platform built at zenera labs - a turborepo monorepo that rasterizes scans, preprocesses pages, and extracts candidate marks with an openai vision model for human review.",
    tags: [
      "next.js",
      "typescript",
      "turborepo",
      "postgresql",
      "opencv",
      "vercel ai sdk",
    ],
    image: "/projects/ai-edumark.png",
    details: [
      "built as a turborepo monorepo: a next.js 16 web app plus two background workers (image preprocessing and ai evaluation) sharing drizzle/neon postgres, better auth, and a shared ui package.",
      "single-pdf upload pipeline rasterizes multi-page answer booklets into per-page pngs with pdf-to-img, then stores them per organization and per sheet for downstream processing.",
      "image worker cleans every page: exif auto-rotate, opencv.js perspective correction (canny → quad → warp), denoise, contrast normalization, and blur/resolution quality checks that flag bad scans as needs_review.",
      "ai evaluation worker calls an openai vision model through the vercel ai sdk with a constrained zod schema, returning structured per-question marks and confidence - with a no-fabrication boundary that returns null + needsreview when uncertain.",
      "human-in-the-loop review ui shows reviewers the exact preprocessed images the model saw, lets them edit candidate marks, and finalizes/locks a sheet before it is released.",
      "question-paper upload + ai extraction bootstraps exams; teachers review/publish drafts, and students join via exam links.",
      "role-based access (owner/admin/teacher/student) via better auth organizations and custom rbac; students only see released marksheets, with ownership-checked reads.",
    ],
  },
  {
    title: "deep research multi-agent system",
    id: "deep-research-multi-agent",
    group: "startup",
    description:
      "a langgraph multi-agent deep research pipeline built at zenera labs that decomposes questions, gathers and quality-scores evidence, critiques its own findings, and synthesizes citation-traceable reports streamed over sse to a next.js ui.",
    tags: [
      "python",
      "langgraph",
      "fastapi",
      "pydantic",
      "next.js",
      "react",
    ],
    image: "/projects/deep-research.png",
    details: [
      "eight-node langgraph pipeline: intent extraction → planning → task generation → search/fetch → analysis → critique → follow-up search → synthesis.",
      "evidencestore normalizes, deduplicates, and quality-scores every source with a weighted composite (relevance 35%, freshness 25%, author 20%, content 20%).",
      "search-and-fetch uses exa for discovery and firecrawl for full-page content; follow-up search appends new evidence without overwriting prior results.",
      "a critique agent checks unsupported claims, missing evidence, weak sources, contradictions, and research gaps, then loops back for targeted follow-up research.",
      "synthesis produces a structured report where every claim links to specific evidence ids and source urls for claim-level traceability.",
      "fastapi exposes synchronous and sse streaming endpoints; a next.js frontend renders live pipeline progress across report/intent/planning/tasks/sources/evidence/analysis/critique tabs.",
      "70 pytest tests run fully offline in ~5s with mocked llm and api clients.",
    ],
  },
  {
    title: "healthos - claims intelligence rag",
    id: "healthos-claims-rag",
    group: "startup",
    description:
      "claims intelligence service built at zenera labs - a deterministic claim validator plus a rag interpreter that turns payer policies and denial letters into evidence-cited, confidence-scored findings.",
    tags: [
      "python",
      "fastapi",
      "rag",
      "postgresql",
      "pydantic",
      "vector databases",
    ],
    image: "/projects/healthos.png",
    details: [
      "led the claims intelligence track as claims intelligence lead - authored the denial-reason taxonomy, the payer claim-requirements knowledge base, and the end-to-end rag architecture design.",
      "track a validator: a rule engine that loads claim-type × payer requirements and returns a readiness score, violations, warnings, and missing-document reports before submission.",
      "track b rag interpreter: document ingestion + hybrid retrieval (bm25 + semantic with reciprocal rank fusion and mmr dedupe) feeding the shared ai gateway for denial interpretation.",
      "every answer cites source documents and is labeled by confidence (found / not found / potentially applicable / requires human confirmation), with below-threshold results routed to a human review queue.",
      "integrated four services (ai-gateway, claims-rag, document-intelligence, claim-risk) behind one integration facade, with a document-intelligence ingestion adapter and a claim-risk snapshot client.",
      "built denial taxonomy v1.0 (7 categories, l1/l2/l3 reasons) and a 6-claim-type × 6-payer requirements knowledge base covering coding rules, filing deadlines, and payer-specific rules.",
      "verified end-to-end with a live integrated-flow demo across process → ingest → interpret → validate → risk assessment.",
    ],
  },
  {
    title: "offline ai weapon detection system",
    id: "weapon-detection",
    group: "startup",
    description:
      "a fully offline, real-time weapon detection system built at zenera labs for cctv feeds and mobile monitoring - edge-first yolov8 inference over rtsp, real-time websocket alerts, and an expo operator app, with no cloud dependency.",
    tags: [
      "python",
      "yolov8",
      "onnx",
      "fastapi",
      "docker",
      "expo",
    ],
    image: "/projects/weapon-detection.png",
    details: [
      "took end-to-end ownership of a fully offline, real-time inference system covering model inference, video ingestion, backend services, local deployment, and mobile integration.",
      "edge-first detection pipeline using yolov8 exported to onnx (opset 17), opencv, fastapi, websockets, sqlite, docker, and an expo/react native app.",
      "per-camera async rtsp ingestion with capped inference concurrency; 13 rest endpoints plus a websocket alert feed, snapshot capture, and a detection log.",
      "retraining workflow in colab (150 epochs, mixup/copy-paste/erasing, hard-negative mining) with onnx export validated against pytorch at iou ≈ 0.98.",
      "live-tunable sensitivity thresholds and alert cooldowns via the api without restarts; alerts are acknowledged and audited through the mobile operator app.",
      "docker compose bundles the backend with a mediamtx rtsp relay for local test feeds; 15 api contract tests cover the endpoint surface.",
      "mobile operator view provides live per-camera feeds, alerts with snapshots, logs, and settings over the lan.",
    ],
  },
];

export const experience = [
  {
    role: "ai engineer",

    company: "zenera labs",

    period: "aug 2026 - present",

    location: "bengaluru, remote",

    description:
      "building applied ml models and a fully offline, real-time edge ai detection system for cctv feeds and mobile monitoring.",

    details: [
      "developed and evaluated a breast cancer classification model using python and scikit-learn, analyzing classification performance across multiple evaluation metrics including precision, recall, f1-score, and confusion matrix.",

      "taking end-to-end ownership of a fully offline, real-time ai weapon detection inference system for cctv feeds, covering model inference, video ingestion, backend services, local deployment, and mobile integration; reviewed asynchronously by the manager and founder.",

      "engineering an edge-first detection pipeline using yolov8, onnx/ncnn, opencv, fastapi, websockets, sqlite, docker, and expo/react native, enabling local rtsp inference, real-time alerts, detection logs, and mobile monitoring without cloud dependency.",
    ],
  },

  {
    role: "backend & applied ai intern",

    company: "kasukabe labs",

    period: "oct 2025 - jan 2026",

    location: "kolkata, remote",

    description:
      "built an end-to-end ai video generation pipeline and production backend services using python, fastapi, and llms.",

    details: [
      "built an end-to-end ai video generation pipeline that converts text into narrated videos using llms, speech-to-text (stt), text-to-speech (tts), ffmpeg, and asynchronous processing.",

      "developed production backend apis using fastapi for orchestrating ai workflows, media generation, and file processing.",

      "implemented retrieval workflows and prompt pipelines to improve content generation quality and contextual relevance.",

      "worked with asynchronous task execution and long-running ai jobs for video generation and batched processing.",

      "integrated multiple ai models and external services into a unified backend pipeline while improving reliability and observability.",

      "documneted every step and decision while collaborating with the senior engineer to ship ai features and backend services.",

      "built the entire infinite canvas interface in next.js for visualizing ai service nodes, workflow graphs, and persistent chat interfaces with state persistence.",
    ],
  },

  {
    role: "full stack engineering intern",

    company: "jobsforce.ai",

    period: "mar 2025 - sep 2025",

    location: "remote",

    description:
      "built customer-facing ai products including a chrome extension and an end-to-end ai mock interviewer.",

    details: [
      "built a full-stack chrome extension using react, typescript, plasmo, node.js, and postgresql for ai-powered job assistance.",

      "developed an end-to-end ai mock interviewer with llm integrations, real-time interview workflows, backend apis, and conversational ai features.",

      "implemented authentication systems, api integrations, and backend services powering customer-facing applications.",

      "worked across the full stack using react, next.js, node.js, typescript, postgresql, and modern web development practices.",

      "collaborated closely with the engineering team to build, test, and ship production features used by customers.",

      "contributed to ai integrations and product features while participating in code reviews and iterative product development.",
    ],
  },
];

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const projectTagIcons: Record<string, string> = {
  typescript: `${CDN}/typescript/typescript-original.svg`,
  "typescript rsc": `${CDN}/typescript/typescript-original.svg`,
  javascript: `${CDN}/javascript/javascript-original.svg`,
  python: `${CDN}/python/python-original.svg`,
  java: `${CDN}/java/java-original.svg`,
  "go (learning)": `${CDN}/go/go-original-wordmark.svg`,
  sql: `${CDN}/mysql/mysql-original-wordmark.svg`,
  react: `${CDN}/react/react-original.svg`,
  "next.js": `${CDN}/nextjs/nextjs-original.svg`,
  expo: `${CDN}/expo/expo-original.svg`,
  electron: `${CDN}/electron/electron-original.svg`,
  sqlite: `${CDN}/sqlite/sqlite-original.svg`,
  opencv: `${CDN}/opencv/opencv-original.svg`,
  html5: `${CDN}/html5/html5-original.svg`,
  css3: `${CDN}/css3/css3-original.svg`,
  "tailwind css": `${CDN}/tailwindcss/tailwindcss-original.svg`,
  "node.js": `${CDN}/nodejs/nodejs-original.svg`,
  bun: `${CDN}/bun/bun-original.svg`,
  fastapi: `${CDN}/fastapi/fastapi-original.svg`,
  trpc: `${CDN}/trpc/trpc-original.svg`,
  redis: `${CDN}/redis/redis-original.svg`,
  postgresql: `${CDN}/postgresql/postgresql-original.svg`,
  mongodb: `${CDN}/mongodb/mongodb-original.svg`,
  prisma: `${CDN}/prisma/prisma-original.svg`,
  docker: `${CDN}/docker/docker-original.svg`,
  aws: `${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  git: `${CDN}/git/git-original.svg`,
  github: `${CDN}/github/github-original.svg`,
  vercel: `${CDN}/vercel/vercel-original.svg`,
  "vercel ai sdk": `${CDN}/vercel/vercel-original.svg`,
  gemini: "/icons/gemini.svg",
  "google-gemini": "/icons/gemini.svg",
  "gemini 2.5 flash": "/icons/gemini.svg",
  langgraph: "/icons/langgraph.svg",
  qdrant: "/icons/qdrant.svg",
  shadcn: "/icons/shadcn.svg",
  cursor: "/icons/cursor.svg",
  "claude code": "/icons/claude-code.svg",
  opencode: "/icons/opencode.svg",
  pydantic: "/icons/pydantic.svg",
  openrouter: "/icons/openrouter.svg",
};

export const skills = [
  {
    category: "languages",
    items: [
      { name: "typescript", icon: `${CDN}/typescript/typescript-original.svg` },
      { name: "javascript", icon: `${CDN}/javascript/javascript-original.svg` },
      { name: "python", icon: `${CDN}/python/python-original.svg` },
      { name: "java", icon: `${CDN}/java/java-original.svg` },
      { name: "go (learning)", icon: `${CDN}/go/go-original-wordmark.svg` },
      { name: "sql", icon: `${CDN}/mysql/mysql-original-wordmark.svg` },
    ],
  },
  {
    category: "frontend",
    items: [
      { name: "react", icon: `${CDN}/react/react-original.svg` },
      {
        name: "next.js (app router, rsc)",
        icon: `${CDN}/nextjs/nextjs-original.svg`,
      },
      { name: "expo", icon: `${CDN}/expo/expo-original.svg` },
      { name: "html5", icon: `${CDN}/html5/html5-original.svg` },
      { name: "css3", icon: `${CDN}/css3/css3-original.svg` },
      {
        name: "tailwind css",
        icon: `${CDN}/tailwindcss/tailwindcss-original.svg`,
      },
      { name: "shadcn/ui", icon: "/icons/shadcn.svg" },
    ],
  },
  {
    category: "backend",
    items: [
      { name: "node.js", icon: `${CDN}/nodejs/nodejs-original.svg` },
      { name: "bun", icon: `${CDN}/bun/bun-original.svg` },
      { name: "fastapi", icon: `${CDN}/fastapi/fastapi-original.svg` },
      { name: "rest apis" },
      { name: "trpc", icon: `${CDN}/trpc/trpc-original.svg` },
      { name: "websockets" },
      { name: "server actions" },
      { name: "authentication", icon: `${CDN}/oauth/oauth-original.svg` },
      { name: "authorization", icon: `${CDN}/oauth/oauth-original.svg` },
      { name: "jwt", icon: `${CDN}/oauth/oauth-original.svg` },
      { name: "redis", icon: `${CDN}/redis/redis-original.svg` },
    ],
  },
  {
    category: "databases & orm",
    items: [
      { name: "postgresql", icon: `${CDN}/postgresql/postgresql-original.svg` },
      { name: "mongodb", icon: `${CDN}/mongodb/mongodb-original.svg` },
      { name: "prisma", icon: `${CDN}/prisma/prisma-original.svg` },
    ],
  },
  {
    category: "ai & llm systems",
    items: [
      { name: "openai api" },
      { name: "gemini api", icon: "/icons/gemini.svg" },
      { name: "vercel ai sdk", icon: `${CDN}/vercel/vercel-original.svg` },
      { name: "tool calling" },
      { name: "streaming" },
      { name: "ai agents" },
      { name: "rag" },
      { name: "vector databases" },
      { name: "qdrant", icon: "/icons/qdrant.svg" },
      { name: "sentence transformers" },
      { name: "langgraph", icon: "/icons/langgraph.svg" },
    ],
  },
  {
    category: "infrastructure",
    items: [
      { name: "vercel", icon: `${CDN}/vercel/vercel-original.svg` },
      { name: "neondb" },
      {
        name: "aws",
        icon: `${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
      },
      { name: "docker", icon: `${CDN}/docker/docker-original.svg` },
      { name: "gcp" },
      { name: "kubernetes (learning)" },
    ],
  },
  {
    category: "developer tools",
    items: [
      { name: "git", icon: `${CDN}/git/git-original.svg` },
      { name: "github", icon: `${CDN}/github/github-original.svg` },
      { name: "cursor", icon: "/icons/cursor.svg" },
      { name: "claude code", icon: "/icons/claude-code.svg" },
      { name: "opencode", icon: "/icons/opencode.svg" },
    ],
  },
];
