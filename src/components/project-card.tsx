import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { projectTagIcons, type Project } from '../data'

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (id: string) => void
}) {
  return (
    <button
      onClick={() => onOpen(project.id)}
      className="group block text-left w-full"
    >
      <div className="h-full overflow-hidden rounded-sm bg-card ring-1 ring-foreground/5 transition-all duration-150 ease-geist hover:ring-foreground/15 active:scale-[0.99]">
        {project.image && (
          <div className="aspect-video bg-muted overflow-hidden relative">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-150 ease-geist group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="px-4 py-3">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="text-sm font-medium text-pretty">{project.title}</h3>
            <ArrowUpRight
              className="size-3.5 shrink-0 text-muted-foreground/40 mt-0.5 transition-colors group-hover:text-foreground/60"
              aria-hidden="true"
            />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed text-pretty mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
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
        </div>
      </div>
    </button>
  )
}
