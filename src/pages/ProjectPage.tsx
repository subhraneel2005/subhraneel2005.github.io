import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { projects, projectTagIcons } from '../data'

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-2 tracking-tight">404</h1>
        <p className="text-muted-foreground mb-6 text-sm">project not found</p>
        <Link to="/">
          <Button variant="link" size="sm">
            &larr; back home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.id === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
        <Link to="/" className="inline-block mb-10">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.175, 0.885, 0.32, 1.1] }}
        >
          {project.image && (
            <div className="aspect-video bg-muted rounded-sm overflow-hidden mb-8 relative ring-1 ring-foreground/5">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3 leading-tight text-pretty">
            {project.title}
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6 text-pretty">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-8">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[12px]">
                {projectTagIcons[tag] && (
                  <img
                    src={projectTagIcons[tag]}
                    alt=""
                    className="size-3 object-contain"
                  />
                )}
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-10">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" size="default">
                <Github className="size-4 mr-2" aria-hidden="true" />
                View Source
                <ArrowUpRight className="size-3.5 ml-1.5" aria-hidden="true" />
              </Button>
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="default">
                  Live Demo
                  <ArrowUpRight className="size-3.5 ml-1.5" aria-hidden="true" />
                </Button>
              </a>
            )}
          </div>

          <Separator className="mb-8" />

          <div className="space-y-4">
            {project.details.map((detail, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-xs text-muted-foreground/70 font-mono mt-0.5 shrink-0 w-5 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <Separator className="my-10" />

          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
