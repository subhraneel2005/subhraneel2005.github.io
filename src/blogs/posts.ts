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
    title: 'Learning and practicing',
    date: '2026-01-04',
    excerpt: 'my baby steps in the world of data structures and algorithms',
    cover: 'https://subhraneel.vercel.app/_next/image?url=%2Fimages%2Fblog0.png&w=3840&q=75',
    tags: ['dsa', 'binary-search'],
  },
  {
    slug: 'trying-to-be-better',
    title: 'Trying to be better',
    date: '2026-01-22',
    excerpt: 'just me trying to be better at what i do',
    cover: 'https://subhraneel.vercel.app/_next/image?url=%2Fimages%2Fblog1.png&w=3840&q=75',
    tags: ['consistency', 'learning', 'discipline'],
  },
  {
    slug: 'whos-this-guy',
    title: 'Who is this guy?',
    date: '2026-01-27',
    excerpt: 'here ive yapped about myself',
    cover: '/images/blog2.png',
    tags: ['aboutme', 'whoami', 'work', 'hire me'],
  },
  {
    slug: 'built-my-own-claude-code',
    title: "I Built a Mini Claude Code from Scratch. Here's What I Learned",
    date: '2026-02-01',
    excerpt:
      'reverse engineering claude code and building my own coding agent from scratch',
    cover: '/images/blog4.png',
    tags: ['coding-agent', 'typescript', 'ai', 'cli', 'learning', 'implementing'],
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
}
