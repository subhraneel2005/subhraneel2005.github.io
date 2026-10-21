import fs from 'fs'
import path from 'path'

const SITE_URL = 'https://subhraneel2005.github.io'

const blogPosts = [
  {
    slug: 'practising-dsa',
    title: 'Learning and practicing',
    excerpt: 'my baby steps in the world of data structures and algorithms',
    cover: 'https://subhraneel.vercel.app/_next/image?url=%2Fimages%2Fblog0.png&w=3840&q=75',
  },
  {
    slug: 'trying-to-be-better',
    title: 'Trying to be better',
    excerpt: 'just me trying to be better at what i do',
    cover: 'https://subhraneel.vercel.app/_next/image?url=%2Fimages%2Fblog1.png&w=3840&q=75',
  },
  {
    slug: 'whos-this-guy',
    title: 'Who is this guy?',
    excerpt: 'here ive yapped about myself',
    cover: '/images/blog2.png',
  },
  {
    slug: 'built-my-own-claude-code',
    title: "I Built a Mini Claude Code from Scratch. Here's What I Learned",
    excerpt: 'reverse engineering claude code and building my own coding agent from scratch',
    cover: '/images/blog4.png',
  },
  {
    slug: 'ai-memory-architectures',
    title: 'What i learned about ai memory after reading about llm wiki, hermes, and mem0',
    excerpt: 'Exploring AI memory systems — from Karpathy\'s LLM wiki to Hermes agent and Mem0\'s analysis of how different frameworks handle long-term memory.',
    cover: '/ai%20memory.png',
  },
  {
    slug: 'self-healing-supervisor',
    title: 'Building a Self-Healing Supervisor in Node.js',
    excerpt: 'A simple experiment in building reliable systems — a supervisor that monitors worker processes and automatically restarts them when they fail.',
    cover: '/Self%20Healing%20Supervisor.png',
  },
  {
    slug: 'twitter-fanout',
    title: 'Reproducing X fan-out problem in code',
    excerpt: 'Simulating and comparing Push vs Pull fan-out strategies for delivering tweets to timelines, inspired by Chapter 11 of DDIA.',
    cover: '/Twiter%20fanout.png',
  },
  {
    slug: 'openai-dots',
    title: "I broke down OpenAI's new Dots",
    excerpt:
      "Breaking down what actually sits underneath OpenAI's always-on Dots — a persistent agent with memory, a cloud computer, and connected apps.",
    cover: '/dots-article-thumbnail.png',
  },
]

const workProjects = [
  {
    slug: 'dummy',
    title: 'Dummy — Local-first AI Desktop Assistant',
    description:
      'A local-first desktop AI assistant for macOS, Linux & Windows — push-to-talk dictation, circle-capture screenshots, and a tool-using chat that drives a real browser, all running on your own machine with your own API keys.',
    image: '/dummy-thumbnail.png',
  },
  {
    slug: 'fuck-my-resume',
    title: 'Fuck My Resume — 1,000+ users, 22K page views',
    description:
      'An AI resume tailoring platform that turns a boring PDF into a job-tailored resume, then helps you land the role with cold outreach, a voice mock interviewer, and a public leaderboard.',
    image: '/fmr-thumbnail.png',
  },
  {
    slug: 'ai-terminal-coding-agent',
    title: 'AI Terminal Coding Agent',
    description:
      'Built a CLI-based AI coding agent capable of autonomous tool usage for navigating and modifying codebases.',
    image: '/ai-coding-agent.png',
  },
  {
    slug: 'study-toolkit',
    title: 'Agentic AI Study Platform',
    description:
      'Built an open-source, student-first productivity platform to help students manage real academic workflows.',
    image: '/study-toolkit.png',
  },
  {
    slug: 'ai-edumark',
    title: 'AI EduMark',
    description:
      'AI answer-sheet scanning and marks-card automation platform built at Zenera Labs — a Turborepo monorepo that rasterizes scans, preprocesses pages, and extracts candidate marks with an OpenAI vision model for human review.',
    image: '/projects/ai-edumark.png',
  },
  {
    slug: 'deep-research-multi-agent',
    title: 'Deep Research Multi-Agent System',
    description:
      'A LangGraph multi-agent deep research pipeline built at Zenera Labs that decomposes questions, gathers and quality-scores evidence, critiques its own findings, and synthesizes citation-traceable reports streamed over SSE to a Next.js UI.',
    image: '/projects/deep-research.png',
  },
  {
    slug: 'healthos-claims-rag',
    title: 'HealthOS — Claims Intelligence RAG',
    description:
      'Claims intelligence service built at Zenera Labs — a deterministic claim validator plus a RAG interpreter that turns payer policies and denial letters into evidence-cited, confidence-scored findings.',
    image: '/projects/healthos.png',
  },
  {
    slug: 'weapon-detection',
    title: 'Offline AI Weapon Detection System',
    description:
      'A fully offline, real-time weapon detection system built at Zenera Labs for CCTV feeds and mobile monitoring — edge-first YOLOv8 inference over RTSP, real-time WebSocket alerts, and an Expo operator app, with no cloud dependency.',
    image: '/projects/weapon-detection.png',
  },
]

const distIndex = fs.readFileSync('dist/index.html', 'utf-8')

function resolveCover(cover) {
  if (cover.startsWith('http')) return cover
  return `${SITE_URL}${cover}`
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderPage({
  title,
  description,
  image,
  imageWidth,
  imageHeight,
  imageAlt,
  url,
  type,
}) {
  const dimensions =
    imageWidth && imageHeight
      ? `<meta property="og:image:width" content="${imageWidth}" />
<meta property="og:image:height" content="${imageHeight}" />`
      : ''
  const alt = escapeHtml(imageAlt || title)

  return `<!DOCTYPE html>
<html lang="en" class="dark" style="color-scheme: dark;">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#171717" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${url}" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:image" content="${image}" />
${dimensions}
<meta property="og:image:alt" content="${alt}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="${type}" />
<meta property="og:site_name" content="Subhraneel Goswami" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${image}" />
<meta name="twitter:image:alt" content="${alt}" />
${distIndex.match(/<link[^>]+rel="stylesheet"[^>]*>/)?.[0] || ''}
</head>
<body style="overflow-x: hidden;">
<div id="root"></div>
${distIndex.match(/<script[^>]+src="\/assets\/index-[^"]+"[^>]*><\/script>/)?.[0] || ''}
</body>
</html>`
}

for (const post of blogPosts) {
  const imageUrl = resolveCover(post.cover)
  const postUrl = `${SITE_URL}/blogs/${post.slug}`

  const html = `<!DOCTYPE html>
<html lang="en" class="dark" style="color-scheme: dark;">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#171717" />
<title>${escapeHtml(post.title)} — Subhraneel Goswami</title>
<meta property="og:title" content="${escapeHtml(post.title)}" />
<meta property="og:description" content="${escapeHtml(post.excerpt)}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:url" content="${postUrl}" />
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${imageUrl}" />
${distIndex.match(/<link[^>]+rel="stylesheet"[^>]*>/)?.[0] || ''}
</head>
<body style="overflow-x: hidden;">
<div id="root"></div>
${distIndex.match(/<script[^>]+src="\/assets\/index-[^"]+"[^>]*><\/script>/)?.[0] || ''}
</body>
</html>`

  const dir = `dist/blogs/${post.slug}`
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
  console.log(`Generated ${dir}/index.html`)
}

const worksDescription =
  'Selected projects and case studies by Subhraneel Goswami — AI and backend engineering work shipped solo and with startups.'
const worksImage = `${SITE_URL}/works-opengraph.png`

const worksHtml = renderPage({
  title: 'Works — Subhraneel Goswami',
  description: worksDescription,
  image: worksImage,
  imageWidth: 1600,
  imageHeight: 900,
  imageAlt: "Subhraneel Goswami's works ranked on a tier list — the goat.",
  url: `${SITE_URL}/works`,
  type: 'website',
})

fs.mkdirSync('dist/works', { recursive: true })
fs.writeFileSync(path.join('dist/works', 'index.html'), worksHtml)
console.log('Generated dist/works/index.html')

for (const project of workProjects) {
  const imageUrl = resolveCover(project.image)
  const projectUrl = `${SITE_URL}/works/${project.slug}`

  const html = renderPage({
    title: `${project.title} — Subhraneel Goswami`,
    description: project.description,
    image: imageUrl,
    imageAlt: `${project.title} preview`,
    url: projectUrl,
    type: 'article',
  })

  const dir = `dist/works/${project.slug}`
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
  console.log(`Generated ${dir}/index.html`)
}

fs.writeFileSync('dist/404.html', distIndex)
console.log('Generated dist/404.html')
