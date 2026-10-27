import fs from 'fs'
import path from 'path'

const SITE_URL = 'https://subhraneel2005.github.io'

const blogPosts = [
  {
    slug: 'practising-dsa',
    title: 'learning and practicing',
    excerpt: 'my baby steps in the world of data structures and algorithms',
    cover: 'https://subhraneel.vercel.app/_next/image?url=%2Fimages%2Fblog0.png&w=3840&q=75',
  },
  {
    slug: 'trying-to-be-better',
    title: 'trying to be better',
    excerpt: 'just me trying to be better at what i do',
    cover: 'https://subhraneel.vercel.app/_next/image?url=%2Fimages%2Fblog1.png&w=3840&q=75',
  },
  {
    slug: 'whos-this-guy',
    title: 'who is this guy?',
    excerpt: 'here ive yapped about myself',
    cover: '/images/blog2.png',
  },
  {
    slug: 'built-my-own-claude-code',
    title: "i built a mini claude code from scratch. here's what i learned",
    excerpt: 'reverse engineering claude code and building my own coding agent from scratch',
    cover: '/images/blog4.png',
  },
  {
    slug: 'ai-memory-architectures',
    title: 'what i learned about ai memory after reading about llm wiki, hermes, and mem0',
    excerpt: 'exploring ai memory systems - from karpathy\'s llm wiki to hermes agent and mem0\'s analysis of how different frameworks handle long-term memory.',
    cover: '/ai%20memory.png',
  },
  {
    slug: 'self-healing-supervisor',
    title: 'building a self-healing supervisor in node.js',
    excerpt: 'a simple experiment in building reliable systems - a supervisor that monitors worker processes and automatically restarts them when they fail.',
    cover: '/Self%20Healing%20Supervisor.png',
  },
  {
    slug: 'twitter-fanout',
    title: 'reproducing x fan-out problem in code',
    excerpt: 'simulating and comparing push vs pull fan-out strategies for delivering tweets to timelines, inspired by chapter 11 of ddia.',
    cover: '/Twiter%20fanout.png',
  },
  {
    slug: 'openai-dots',
    title: "i broke down openai's new dots",
    excerpt:
      "breaking down what actually sits underneath openai's always-on dots - a persistent agent with memory, a cloud computer, and connected apps.",
    cover: '/dots-article-thumbnail.png',
  },
]

const workProjects = [
  {
    slug: 'dummy',
    title: 'dummy - local-first ai desktop assistant',
    description:
      'a local-first desktop ai assistant for macos, linux & windows - push-to-talk dictation, circle-capture screenshots, and a tool-using chat that drives a real browser, all running on your own machine with your own api keys.',
    image: '/dummy-thumbnail.png',
  },
  {
    slug: 'fuck-my-resume',
    title: 'fuck my resume - 1,000+ users, 22k page views',
    description:
      'an ai resume tailoring platform that turns a boring pdf into a job-tailored resume, then helps you land the role with cold outreach, a voice mock interviewer, and a public leaderboard.',
    image: '/fmr-thumbnail.png',
  },
  {
    slug: 'ai-terminal-coding-agent',
    title: 'ai terminal coding agent',
    description:
      'built a cli-based ai coding agent capable of autonomous tool usage for navigating and modifying codebases.',
    image: '/ai-coding-agent.png',
  },
  {
    slug: 'study-toolkit',
    title: 'agentic ai study platform',
    description:
      'built an open-source, student-first productivity platform to help students manage real academic workflows.',
    image: '/study-toolkit.png',
  },
  {
    slug: 'ai-edumark',
    title: 'ai edumark',
    description:
      'ai answer-sheet scanning and marks-card automation platform built at zenera labs - a turborepo monorepo that rasterizes scans, preprocesses pages, and extracts candidate marks with an openai vision model for human review.',
    image: '/projects/ai-edumark.png',
  },
  {
    slug: 'deep-research-multi-agent',
    title: 'deep research multi-agent system',
    description:
      'a langgraph multi-agent deep research pipeline built at zenera labs that decomposes questions, gathers and quality-scores evidence, critiques its own findings, and synthesizes citation-traceable reports streamed over sse to a next.js ui.',
    image: '/projects/deep-research.png',
  },
  {
    slug: 'healthos-claims-rag',
    title: 'healthos - claims intelligence rag',
    description:
      'claims intelligence service built at zenera labs - a deterministic claim validator plus a rag interpreter that turns payer policies and denial letters into evidence-cited, confidence-scored findings.',
    image: '/projects/healthos.png',
  },
  {
    slug: 'weapon-detection',
    title: 'offline ai weapon detection system',
    description:
      'a fully offline, real-time weapon detection system built at zenera labs for cctv feeds and mobile monitoring - edge-first yolov8 inference over rtsp, real-time websocket alerts, and an expo operator app, with no cloud dependency.',
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
<html lang="en" style="color-scheme: light;">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#F7F7F3" />
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
<meta property="og:site_name" content="subhraneel goswami" />
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
<html lang="en" style="color-scheme: light;">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#F7F7F3" />
<title>${escapeHtml(post.title)} - subhraneel goswami</title>
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
  'selected projects and case studies by subhraneel goswami - ai and backend engineering work shipped solo and with startups.'
const worksImage = `${SITE_URL}/works-opengraph.png`

const worksHtml = renderPage({
  title: 'works - subhraneel goswami',
  description: worksDescription,
  image: worksImage,
  imageWidth: 1600,
  imageHeight: 900,
  imageAlt: "subhraneel goswami's works ranked on a tier list - the goat.",
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
    title: `${project.title} - subhraneel goswami`,
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
