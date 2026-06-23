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
    slug: 'self-healing-supervisor',
    title: 'Building a Self-Healing Supervisor in Node.js',
    excerpt: 'A simple experiment in building reliable systems — a supervisor that monitors worker processes and automatically restarts them when they fail.',
    cover: '/Self%20Healing%20Supervisor.png',
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

fs.writeFileSync('dist/404.html', distIndex)
console.log('Generated dist/404.html')
