import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { blogPosts } from '../blogs/posts'
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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Blogs() {
  const navigate = useNavigate()

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-5 py-10 sm:py-16">
        <div className="flex items-center gap-3 mb-10">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Home
            </Button>
          </Link>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight mb-2 text-pretty">
          Blogs
        </h1>
        <p className="text-sm text-muted-foreground/60 mb-12">
          thoughts, experiments, and things i&rsquo;ve built
        </p>

        <div className="space-y-5">
          {sorted.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
            >
              <button
                onClick={() => navigate(`/blogs/${post.slug}`)}
                className="w-full text-left group block bg-card rounded-xl border border-border/50 transition-all duration-200 hover:border-border hover:shadow-sm active:scale-[0.99] overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-44 h-36 sm:h-auto bg-muted relative overflow-hidden shrink-0">
                    <img
                      src={post.cover}
                      alt={post.title}
                      width={176}
                      height={192}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
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
                  <div className="flex-1 p-5 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-medium text-muted-foreground/50">
                        {dateStr(post.date)}
                      </span>
                    </div>
                    <h2 className="text-base font-semibold tracking-tight mb-1.5 group-hover:text-foreground/80 transition-colors text-pretty">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground/60 leading-relaxed mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
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
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
