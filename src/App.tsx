import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { MapPin } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { profile, socials, projects, experience, skills, education } from './data'

const companyLogos: Record<string, string> = {
  'Jobsforce.ai': '/jobsforce-logo.webp',
  'Kasukabe Labs (Web and App dev Agency)': '/kasukabe-labs-logo.jpg',
}

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return prefersReduced
}

const sections = ['Projects', 'Experience', 'Education', 'Skills'] as const

export default function App() {
  const reduced = useReducedMotion()
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveSection(e.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' },
    )
    for (const id of sections) {
      const el = document.getElementById(id.toLowerCase())
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const fadeUp = reduced
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }

  return (
    <>
      <Helmet>
        <title>Subhraneel Goswami</title>
        <meta property="og:title" content="Subhraneel Goswami" />
        <meta property="og:description" content="Building, Writing, Breaking. Documenting 0 - ∞" />
        <meta property="og:image" content="https://subhraneel2005.github.io/opengraph.png" />
        <meta property="og:url" content="https://subhraneel2005.github.io/#/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://subhraneel2005.github.io/opengraph.png" />
      </Helmet>
      <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
        <nav className="flex items-center justify-between mb-10">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {profile.username}
          </Link>
          <div className="flex items-center gap-1">
            <Link to="/blogs">
              <Button variant="secondary" size="sm">
                Blogs
              </Button>
            </Link>
            <Link to="/resume">
              <Button variant="secondary" size="sm">
                Resume
              </Button>
            </Link>
          </div>
        </nav>

        <motion.section
          className="mb-12"
          {...fadeUp}
          transition={{ duration: 0.4 }}
        >
          <Avatar
            size="lg"
            className="mb-5 size-14 ring-1 ring-foreground/10"
          >
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>SG</AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-semibold tracking-tight mb-1.5 text-pretty">
            {profile.name}
          </h1>
          <p className="text-sm text-muted-foreground mb-1">{profile.title}</p>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed text-pretty max-w-prose">
            {profile.bio}
          </p>

          <div className="flex items-center gap-1">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" aria-label={social.name}>
                  <social.icon className="size-4" aria-hidden="true" />
                </Button>
              </a>
            ))}
          </div>
        </motion.section>

        <div className="sticky top-0 z-10 -mx-5 px-5 py-3 mb-10 bg-background/80 backdrop-blur-md border-b border-border/50">
          <nav className="flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s.toLowerCase())}
                className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
                  activeSection === s.toLowerCase()
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground/80 hover:text-muted-foreground hover:bg-muted/50'
                }`}
              >
                {s}
              </button>
            ))}
          </nav>
        </div>

        <motion.section
          id="projects"
          className="mb-14 scroll-mt-20"
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="size-1 rounded-full bg-foreground/20" />
            <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="block group"
              >
                <Card className="h-full overflow-hidden transition-all duration-200 hover:bg-muted/30 hover:border-foreground/15 hover:shadow-sm active:scale-[0.99]">
                  {project.image && (
                    <div className="aspect-video bg-muted overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardHeader className="flex flex-row items-start justify-between gap-3 px-4 pt-4 pb-2">
                    <div className="min-w-0 space-y-1">
                      <CardTitle className="text-sm font-medium">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed text-pretty text-xs">
                        {project.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>

        <Separator className="mb-14" />

        <motion.section
          id="experience"
          className="mb-14 scroll-mt-20"
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="size-1 rounded-full bg-foreground/20" />
            <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Experience
            </h2>
          </div>
          <div className="space-y-6">
            {experience.map((exp, i) => {
              const logo = companyLogos[exp.company]
              return (
                <div
                  key={i}
                  className="relative pl-4 border-l border-border hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h3 className="text-sm font-medium">{exp.role}</h3>
                    <span className="shrink-0 text-[11px] text-muted-foreground/80 font-mono">
                      {exp.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {logo && (
                      <img
                        src={logo}
                        alt={`${exp.company} logo`}
                        width={16}
                        height={16}
                        className="size-4 rounded object-contain bg-muted"
                      />
                    )}
                    <p className="text-xs text-muted-foreground">{exp.company}</p>
                    <span className="text-[11px] text-muted-foreground/80 flex items-center gap-1">
                      <MapPin className="size-3" aria-hidden="true" />
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-pretty mb-2">
                    {exp.description}
                  </p>
                  <ul className="space-y-1.5">
                    {exp.details.map((detail, j) => (
                      <li
                        key={j}
                        className="text-xs text-muted-foreground/80 leading-relaxed text-pretty pl-3 relative"
                      >
                        <span className="absolute left-0 top-[6px] size-1 rounded-full bg-foreground/15" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </motion.section>

        <Separator className="mb-14" />

        <motion.section
          id="education"
          className="mb-14 scroll-mt-20"
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="size-1 rounded-full bg-foreground/20" />
            <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Education
            </h2>
          </div>
          {education.map((edu, i) => (
            <div
              key={i}
              className="relative pl-4 border-l border-border hover:border-foreground/20 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-sm font-medium">{edu.degree}</h3>
                <span className="shrink-0 text-[11px] text-muted-foreground/80 font-mono">
                  {edu.period}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{edu.school}</p>
              <p className="text-[11px] text-muted-foreground/80 flex items-center gap-1">
                <MapPin className="size-3" aria-hidden="true" />
                {edu.location}
              </p>
            </div>
          ))}
        </motion.section>

        <Separator className="mb-14" />

        <motion.section
          id="skills"
          className="mb-14 scroll-mt-20"
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="size-1 rounded-full bg-foreground/20" />
            <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              Skills
            </h2>
          </div>
          <div className="space-y-4">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-[11px] font-medium text-muted-foreground/80 uppercase tracking-wider mb-2">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-[10px] font-normal hover:bg-muted/50 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <Separator className="mb-10" />

        <motion.footer
          className="flex items-center justify-between"
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <p className="text-xs text-muted-foreground/80">
            &copy; {new Date().getFullYear()} {profile.username}
          </p>
          <div className="flex items-center gap-1">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon-xs" aria-label={social.name}>
                  <social.icon className="size-3" aria-hidden="true" />
                </Button>
              </a>
            ))}
          </div>
        </motion.footer>
      </div>
    </div>
    </>
  )
}
