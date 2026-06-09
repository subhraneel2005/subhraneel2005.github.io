import { Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MDXProvider } from '@mdx-js/react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { mdxComponents } from '../components/mdx'
import { blogPosts, blogComponents } from '../blogs/posts'
import ErrorBoundary from '../components/ErrorBoundary'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const tagColors: Record<string, string> = {
  dsa: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'binary-search': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  consistency: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  learning: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  discipline: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  aboutme: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  whoami: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  work: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'hire me': 'bg-green-500/10 text-green-400 border-green-500/20',
  'coding-agent': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  typescript: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  ai: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  cli: 'bg-stone-500/10 text-stone-400 border-stone-500/20',
  sidequests: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
}

function dateStr(date: string) {
  const lang = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
  return new Date(date).toLocaleDateString(lang, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function LoadingState() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-16" />
      <div className="h-10 bg-muted rounded w-3/4 mt-8" />
      <div className="h-4 bg-muted rounded w-32" />
      <div className="h-64 bg-muted rounded-xl mt-8" />
      <div className="space-y-3 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded w-full" />
        ))}
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-2 tracking-tight">404</h1>
        <p className="text-muted-foreground mb-6 text-sm">post not found</p>
        <Link to="/blogs">
          <Button variant="link" size="sm">
            &larr; back to blog
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()

  const post = blogPosts.find((p) => p.slug === slug)
  const Component = slug ? blogComponents[slug] : undefined

  if (!post || !Component) {
    return <NotFound />
  }

  const imageUrl = post.cover.startsWith('http')
    ? post.cover
    : `https://subhraneel2005.github.io${post.cover}`
  const postUrl = `https://subhraneel2005.github.io/blogs/${post.slug}`

  return (
    <>
      <Helmet>
        <title>{post.title} — Subhraneel Goswami</title>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>
      <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-5 py-10 sm:py-16">
        <Link to="/blogs" className="inline-block mb-10">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to blog
          </Button>
        </Link>

        <header className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4 leading-tight text-pretty">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-muted-foreground/50">
              <Calendar className="size-3.5" aria-hidden="true" />
              <span className="text-sm">{dateStr(post.date)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => {
              const color =
                tagColors[tag] ??
                'bg-neutral-800 text-neutral-400 border-neutral-700'
              return (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`text-[10px] ${color}`}
                >
                  {tag}
                </Badge>
              )
            })}
          </div>
        </header>

        {post.cover && (
          <div className="mb-10 rounded-xl overflow-hidden border border-border/50">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <ErrorBoundary>
          <Suspense fallback={<LoadingState />}>
            <div className="blog-content">
              <MDXProvider components={mdxComponents}>
                <Component />
              </MDXProvider>
            </div>
          </Suspense>
        </ErrorBoundary>

        <div className="mt-16 pt-8 border-t border-border">
          <Link to="/blogs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back to blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
