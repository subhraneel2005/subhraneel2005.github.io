import { Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { ArrowLeft, Calendar } from 'lucide-react'
import { mdxComponents } from '../components/mdx'
import { blogPosts, blogComponents } from '../blogs/posts'
import ErrorBoundary from '../components/ErrorBoundary'

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

function Tag({ tag }: { tag: string }) {
  const colorClass =
    tagColors[tag] ??
    'bg-neutral-800 text-neutral-400 border-neutral-700'
  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colorClass}`}
    >
      {tag}
    </span>
  )
}

function LoadingState() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-neutral-800 rounded w-16" />
        <div className="h-10 bg-neutral-800 rounded w-3/4 mt-8" />
        <div className="h-4 bg-neutral-800 rounded w-32" />
        <div className="h-64 bg-neutral-800 rounded-xl mt-8" />
        <div className="space-y-3 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-neutral-800 rounded w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-2">404</h1>
        <p className="text-neutral-500 mb-6">post not found</p>
        <button
          onClick={() => navigate('/blogs')}
          className="text-sm font-bold text-neutral-400 hover:text-white transition-colors underline underline-offset-2 decoration-neutral-700"
        >
          ← back to blog
        </button>
      </div>
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const post = blogPosts.find((p) => p.slug === slug)
  const Component = slug ? blogComponents[slug] : undefined

  if (!post || !Component) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-5 py-8">
        <button
          onClick={() => navigate('/blogs')}
          className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </button>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-neutral-500">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </header>

        {post.cover && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 mb-8 border border-white/5">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.style.background =
                    'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)'
                }
              }}
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

        <div className="mt-16 pt-8 border-t border-neutral-800">
          <button
            onClick={() => navigate('/blogs')}
            className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </button>
        </div>
      </div>
    </div>
  )
}
