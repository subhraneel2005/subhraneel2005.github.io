import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { projects, profile } from '../data'
import { ProjectCard } from '../components/project-card'
import { Button, buttonVariants } from '@/components/ui/button'

const personalProjects = projects.filter((p) => p.group === 'personal')
const startupProjects = projects.filter((p) => p.group === 'startup')

const hireHref = `mailto:${profile.email}?subject=Let%27s%20work%20together`

export default function Works() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Works — Subhraneel Goswami</title>
        <meta
          name="description"
          content="Selected projects and case studies by Subhraneel Goswami — AI and backend engineering work shipped solo and with startups."
        />
        <link rel="canonical" href="https://subhraneel2005.github.io/works" />
        <meta property="og:title" content="Works — Subhraneel Goswami" />
        <meta
          property="og:description"
          content="Selected projects and case studies by Subhraneel Goswami — AI and backend engineering work shipped solo and with startups."
        />
        <meta
          property="og:image"
          content="https://subhraneel2005.github.io/works-opengraph.png"
        />
        <meta property="og:image:width" content="1600" />
        <meta property="og:image:height" content="900" />
        <meta
          property="og:image:alt"
          content="Subhraneel Goswami's works ranked on a tier list — the goat."
        />
        <meta property="og:url" content="https://subhraneel2005.github.io/works" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Subhraneel Goswami" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Works — Subhraneel Goswami" />
        <meta
          name="twitter:description"
          content="Selected projects and case studies by Subhraneel Goswami — AI and backend engineering work shipped solo and with startups."
        />
        <meta
          name="twitter:image"
          content="https://subhraneel2005.github.io/works-opengraph.png"
        />
        <meta
          name="twitter:image:alt"
          content="Subhraneel Goswami's works ranked on a tier list — the goat."
        />
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

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <h1 className="text-[40px] font-semibold tracking-tight mb-2 text-pretty leading-tight">
                Works
              </h1>
              <p className="text-sm text-muted-foreground text-pretty">
                Selected projects and the case studies behind them.
              </p>
            </div>
            <a href={hireHref} className={`${buttonVariants()} shrink-0`}>
              <Mail className="size-4" />
              Hire this guy
            </a>
          </div>

          <section className="mb-14">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="size-1.5 rounded-full bg-blue-700" />
              <h2 className="text-sm font-semibold tracking-tight">
                Personal Works
              </h2>
              <span className="text-[13px] text-muted-foreground/70 tabular-nums">
                {personalProjects.length}
              </span>
              <span className="flex-1 h-px bg-border" />
            </div>
            <p className="text-[13px] text-muted-foreground mb-4 pl-3.5">
              Projects I&rsquo;ve designed and built on my own time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {personalProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <ProjectCard
                    project={project}
                    onOpen={(id) => navigate(`/works/${id}`)}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="size-1.5 rounded-full bg-green-700" />
              <h2 className="text-sm font-semibold tracking-tight">
                Works with Startups
              </h2>
              <span className="text-[13px] text-muted-foreground/70 tabular-nums">
                {startupProjects.length}
              </span>
              <span className="flex-1 h-px bg-border" />
            </div>
            <p className="text-[13px] text-muted-foreground mb-4 pl-3.5">
              Shipped as an AI engineer for a Bangalore-based startup — Zenera Labs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {startupProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <ProjectCard
                    project={project}
                    onOpen={(id) => navigate(`/works/${id}`)}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
