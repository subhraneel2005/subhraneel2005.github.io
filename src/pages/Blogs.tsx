import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { blogPosts } from '../blogs/posts'

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

export default function Blogs() {
  const navigate = useNavigate()

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
        </div>

        <h1 className="text-3xl font-black tracking-tighter mb-2">Blog</h1>
        <p className="text-neutral-500 text-sm font-medium mb-10">
          thoughts, experiments, and things i've built
        </p>

        <div className="space-y-6">
          {sorted.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <button
                onClick={() => navigate(`/blogs/${post.slug}`)}
                className="w-full text-left group block bg-neutral-900/50 hover:bg-neutral-900 rounded-2xl border border-white/5 hover:border-white/10 transition-all overflow-hidden active:scale-[0.98]"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-40 sm:h-auto bg-neutral-800 relative overflow-hidden shrink-0">
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
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
                      <span className="text-[11px] font-bold text-neutral-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold tracking-tight mb-2 group-hover:text-white/80 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-neutral-500 font-medium leading-relaxed mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Tag key={tag} tag={tag} />
                      ))}
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
