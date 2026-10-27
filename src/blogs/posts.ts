import { lazy } from 'react'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  cover: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'practising-dsa',
    title: 'learning and practicing',
    date: '2026-01-04',
    excerpt: 'my baby steps in the world of data structures and algorithms',
    cover: 'https://subhraneel.vercel.app/_next/image?url=%2Fimages%2Fblog0.png&w=3840&q=75',
    tags: ['dsa', 'binary-search'],
  },
  {
    slug: 'trying-to-be-better',
    title: 'trying to be better',
    date: '2026-01-22',
    excerpt: 'just me trying to be better at what i do',
    cover: 'https://subhraneel.vercel.app/_next/image?url=%2Fimages%2Fblog1.png&w=3840&q=75',
    tags: ['consistency', 'learning', 'discipline'],
  },
  {
    slug: 'whos-this-guy',
    title: 'who is this guy?',
    date: '2026-01-27',
    excerpt: 'here ive yapped about myself',
    cover: '/images/blog2.png',
    tags: ['aboutme', 'whoami', 'work', 'hire me'],
  },
  {
    slug: 'built-my-own-claude-code',
    title: "i built a mini claude code from scratch. here's what i learned",
    date: '2026-02-01',
    excerpt:
      'reverse engineering claude code and building my own coding agent from scratch',
    cover: '/images/blog4.png',
    tags: ['coding-agent', 'typescript', 'ai', 'cli', 'learning', 'implementing'],
  },
  {
    slug: 'ai-memory-architectures',
    title: 'what i learned about ai memory after reading about llm wiki, hermes, and mem0',
    date: '2026-06-24',
    excerpt:
      'exploring ai memory systems - from karpathy\'s llm wiki to hermes agent and mem0\'s analysis of how different frameworks handle long-term memory.',
    cover: '/ai%20memory.png',
    tags: ['ai', 'memory', 'llm', 'rag', 'agents', 'learning'],
  },
  {
    slug: 'self-healing-supervisor',
    title: 'building a self-healing supervisor in node.js',
    date: '2026-06-23',
    excerpt:
      'a simple experiment in building reliable systems - a supervisor that monitors worker processes and automatically restarts them when they fail.',
    cover: '/Self%20Healing%20Supervisor.png',
    tags: ['nodejs', 'reliability', 'ddia', 'process-supervision', 'distributed-systems'],
  },
  {
    slug: 'twitter-fanout',
    title: 'reproducing x fan-out problem in code',
    date: '2026-07-11',
    excerpt:
      'simulating and comparing push vs pull fan-out strategies for delivering tweets to timelines, inspired by chapter 11 of ddia.',
    cover: '/Twiter%20fanout.png',
    tags: ['ddia', 'fan-out', 'distributed-systems', 'twitter', 'nodejs'],
  },
  {
    slug: 'openai-dots',
    title: "i broke down openai's new dots",
    date: '2026-10-03',
    excerpt:
      "breaking down what actually sits underneath openai's always-on dots - a persistent agent with memory, a cloud computer, and connected apps.",
    cover: '/dots-article-thumbnail.png',
    tags: ['ai', 'agents', 'openai', 'learning'],
  },
]

export const blogComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {
  'practising-dsa': lazy(() => import('./practising-dsa.mdx')),
  'trying-to-be-better': lazy(() => import('./trying-to-be-better.mdx')),
  'whos-this-guy': lazy(() => import('./whos-this-guy.mdx')),
  'built-my-own-claude-code': lazy(
    () => import('./built-my-own-claude-code.mdx'),
  ),
  'ai-memory-architectures': lazy(() => import('./ai-memory-architectures.mdx')),
  'self-healing-supervisor': lazy(() => import('./self-healing-supervisor.mdx')),
  'twitter-fanout': lazy(() => import('./twitter-fanout.mdx')),
  'openai-dots': lazy(() => import('./openai-dots.mdx')),
}
