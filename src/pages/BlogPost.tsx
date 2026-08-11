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
  dsa: 'bg-blue-100 text-blue-800 dark:bg-blue-1000/20 dark:text-blue-600',
  'binary-search': 'bg-blue-100 text-blue-800 dark:bg-blue-1000/20 dark:text-blue-600',
  consistency: 'bg-green-100 text-green-800 dark:bg-green-1000/20 dark:text-green-600',
  learning: 'bg-purple-100 text-purple-800 dark:bg-purple-1000/20 dark:text-purple-600',
  discipline: 'bg-amber-100 text-amber-800 dark:bg-amber-1000/20 dark:text-amber-600',
  aboutme: 'bg-pink-100 text-pink-800 dark:bg-pink-1000/20 dark:text-pink-600',
  whoami: 'bg-pink-100 text-pink-800 dark:bg-pink-1000/20 dark:text-pink-600',
  work: 'bg-amber-100 text-amber-800 dark:bg-amber-1000/20 dark:text-amber-600',
  'hire me': 'bg-green-100 text-green-800 dark:bg-green-1000/20 dark:text-green-600',
  'coding-agent': 'bg-purple-100 text-purple-800 dark:bg-purple-1000/20 dark:text-purple-600',
  typescript: 'bg-blue-100 text-blue-800 dark:bg-blue-1000/20 dark:text-blue-600',
  ai: 'bg-purple-100 text-purple-800 dark:bg-purple-1000/20 dark:text-purple-600',
  cli: 'bg-gray-100 text-gray-800 dark:bg-gray-1000/20 dark:text-gray-600',
  sidequests: 'bg-amber-100 text-amber-800 dark:bg-amber-1000/20 dark:text-amber-600',
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
      <div className="h-64 bg-muted rounded-sm mt-8" />
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
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
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
            <div className="flex items-center gap-1.5 text-muted-foreground/70">
              <Calendar className="size-3.5" aria-hidden="true" />
              <span className="text-sm">{dateStr(post.date)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => {
              const color =
                tagColors[tag] ??
                'bg-gray-100 text-gray-800 dark:bg-gray-1000/20 dark:text-gray-600'
              return (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`text-[12px] ${color}`}
                >
                  {tag}
                </Badge>
              )
            })}
          </div>
        </header>

        {post.cover && (
          <div className="mb-10 rounded-sm overflow-hidden ring-1 ring-foreground/5">
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
