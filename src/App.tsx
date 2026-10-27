import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { MapPin, Github, Calendar, Mail } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ProjectCard } from './components/project-card'
import { profile, socials, projects, experience, skills, education, stats } from './data'

const companyLogos: Record<string, string> = {
  'jobsforce.ai': '/jobsforce-logo.webp',
  'kasukabe labs': '/kasukabe-labs-logo.jpg',
  'zenera labs': '/zenera-labs.png',
}

const sections = ['works', 'experience', 'education', 'skills'] as const

const personalProjects = projects.filter((p) => p.group === 'personal')
const startupProjects = projects.filter((p) => p.group === 'startup')

export default function App() {
  const navigate = useNavigate()
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

  return (
    <>
      <Helmet>
        <title>subhraneel goswami</title>
        <meta property="og:title" content="subhraneel goswami" />
        <meta property="og:description" content="building, writing, breaking. documenting 0 - ∞" />
        <meta property="og:image" content="https://subhraneel2005.github.io/opengraph.png" />
        <meta property="og:url" content="https://subhraneel2005.github.io/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://subhraneel2005.github.io/opengraph.png" />
      </Helmet>
      <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
        <nav className="flex items-center justify-between mb-12">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {profile.username}
          </Link>
          <div className="flex items-center gap-1">
            <Link to="/blogs">
              <Button variant="ghost" size="sm">
                blogs
              </Button>
            </Link>
            <Link to="/resume">
              <Button variant="ghost" size="sm">
                resume
              </Button>
            </Link>
          </div>
        </nav>

        <section className="mb-6">
          <Avatar size="lg" className="mb-5 size-20 ring-1 ring-foreground/10">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>sg</AvatarFallback>
          </Avatar>

          <h1 className="text-[40px] font-semibold tracking-tight mb-2 text-pretty leading-tight">
            {profile.name}
          </h1>
          <p className="text-sm text-muted-foreground mb-1">{profile.title}</p>
          <p className="text-sm text-muted-foreground/90 mb-6 leading-relaxed text-pretty max-w-prose">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group flex flex-col items-center gap-1.5"
              >
                <span className="flex size-10 items-center justify-center rounded-md bg-muted ring-1 ring-border shadow-sm transition-transform duration-150 ease-geist group-hover:scale-105">
                  <img
                    src={social.img}
                    alt=""
                    className="size-5 object-contain"
                  />
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6">
            <a
              href={`mailto:${profile.email}?subject=let%27s%20work%20together`}
              className={buttonVariants()}
            >
              <Mail className="size-4" />
              get in touch
            </a>
          </div>
        </section>

        <div className="sticky top-0 z-10 -mx-6 px-6 py-3 mb-10 bg-background/80 backdrop-blur border-b border-border">
          <nav className="flex items-center gap-0.5">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s.toLowerCase())}
                className={`text-xs font-medium px-2.5 py-1.5 rounded-sm transition-colors ${
                  activeSection === s.toLowerCase()
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {s}
              </button>
            ))}
          </nav>
        </div>

        <section
          id="works"
          className="mb-16 scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xs font-semibold tracking-widest text-muted-foreground">
              works
            </h2>
            <span className="flex-1 h-px bg-border" />
            <Link
              to="/works"
              className="shrink-0 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              view all works &rarr;
            </Link>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="size-1.5 rounded-full bg-blue-700" />
              <h3 className="text-sm font-semibold tracking-tight">
                personal works
              </h3>
              <span className="text-[13px] text-muted-foreground/70 tabular-nums">
                {personalProjects.length}
              </span>
              <span className="flex-1 h-px bg-border" />
            </div>
            <p className="text-[13px] text-muted-foreground mb-4 pl-3.5">
              projects i&rsquo;ve designed and built on my own time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {personalProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={(id) => navigate(`/works/${id}`)}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="size-1.5 rounded-full bg-green-700" />
              <h3 className="text-sm font-semibold tracking-tight">
                works with startups
              </h3>
              <span className="text-[13px] text-muted-foreground/70 tabular-nums">
                {startupProjects.length}
              </span>
              <span className="flex-1 h-px bg-border" />
            </div>
            <p className="text-[13px] text-muted-foreground mb-4 pl-3.5">
              shipped as an ai engineer for a bangalore-based startup - zenera labs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {startupProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={(id) => navigate(`/works/${id}`)}
                />
              ))}
            </div>
          </div>
        </section>

        <Separator className="mb-16" />

        <section
          id="experience"
          className="mb-16 scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xs font-semibold tracking-widest text-muted-foreground">
              experience
            </h2>
            <span className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-8">
            {experience.map((exp, i) => {
              const logo = companyLogos[exp.company]
              return (
                <div
                  key={i}
                  className="relative pl-5 border-l border-border hover:border-foreground/20 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-1.5">
                    <h3 className="text-sm font-semibold">{exp.role}</h3>
                    <span className="shrink-0 text-[14px] text-muted-foreground/60 font-mono tabular-nums">
                    <span className="flex justify-center items-center gap-1">
                    <Calendar className="mb-0.4" size={12}/> {exp.period}
                    </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
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
                    <span className="text-[14px] text-muted-foreground/90 flex items-center gap-1">
                      <MapPin className="size-3" aria-hidden="true" />
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed text-pretty mb-3">
                    {exp.description}
                  </p>
                  <ul className="space-y-1.5">
                    {exp.details.map((detail, j) => (
                      <li
                        key={j}
                        className="text-xs text-muted-foreground leading-relaxed text-pretty pl-3 relative"
                      >
                        <span className="absolute left-0 top-[6px] size-1 rounded-full bg-foreground/10" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        <Separator className="mb-16" />

        <section
          id="education"
          className="mb-16 scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xs font-semibold tracking-widest text-muted-foreground">
              education
            </h2>
            <span className="flex-1 h-px bg-border" />
          </div>
          {education.map((edu, i) => (
            <div
              key={i}
              className="relative pl-5 border-l border-border hover:border-foreground/20 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4 mb-1.5">
                <h3 className="text-sm font-semibold">{edu.degree}</h3>
                <span className="shrink-0 text-[14px] text-muted-foreground/60 font-mono tabular-nums">
                  {edu.period}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{edu.school}</p>
              <p className="text-[14px] text-muted-foreground/90 flex items-center gap-1">
                <MapPin className="size-3" aria-hidden="true" />
                {edu.location}
              </p>
            </div>
          ))}
        </section>

        <Separator className="mb-16" />

        <section
          id="skills"
          className="mb-16 scroll-mt-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xs font-semibold tracking-widest text-muted-foreground">
              skills
            </h2>
            <span className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-5">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-[14px] font-medium text-muted-foreground/60 tracking-wider mb-2.5">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="outline"
                      className="text-[15px] px-3 py-2 border border-dashed"
                    >
                      {skill.icon && (
                        <img
                          src={skill.icon}
                          alt=""
                          className="size-3.5 object-contain"
                        />
                      )}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-10" />

        <footer className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground/80">
            &copy; {new Date().getFullYear()} {profile.username}
          </p>
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex size-7 items-center justify-center rounded-md bg-muted ring-1 ring-border transition-transform duration-150 ease-geist hover:scale-105"
              >
                <img
                  src={social.img}
                  alt=""
                  className="size-4 object-contain"
                />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}
