import { Helmet } from 'react-helmet-async'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { blogPosts } from '../blogs/posts'
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
    <>
      <Helmet>
        <title>Blogs — Subhraneel Goswami</title>
        <meta property="og:title" content="Blogs — Subhraneel Goswami" />
        <meta property="og:description" content="thoughts, experiments, and things I've built" />
        <meta property="og:image" content="https://subhraneel2005.github.io/opengraph.png" />
        <meta property="og:url" content="https://subhraneel2005.github.io/blogs" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
        <div className="flex items-center gap-3 mb-12">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Home
            </Button>
          </Link>
        </div>

        <h1 className="text-[40px] font-semibold tracking-tight mb-2 text-pretty leading-tight">
          Blogs
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          thoughts, experiments, and things i&rsquo;ve built
        </p>

        <div className="space-y-4">
          {sorted.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
            >
              <button
                onClick={() => navigate(`/blogs/${post.slug}`)}
                className="w-full text-left group block rounded-sm bg-card ring-1 ring-foreground/5 transition-all duration-150 ease-geist hover:ring-foreground/15 active:scale-[0.99] overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-44 h-36 sm:h-auto bg-muted relative overflow-hidden shrink-0">
                    <img
                      src={post.cover}
                      alt={post.title}
                      width={176}
                      height={192}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-150 ease-geist"
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
                      <span className="text-[14px] font-medium text-muted-foreground/70">
                        {dateStr(post.date)}
                      </span>
                    </div>
                    <h2 className="text-base font-semibold tracking-tight mb-1.5 group-hover:text-foreground/80 transition-colors text-pretty">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
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
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
