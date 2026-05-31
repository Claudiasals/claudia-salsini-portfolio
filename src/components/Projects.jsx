import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import ProjectCarouselCard from './ProjectCarouselCard'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'

const ChevronIcon = ({ direction }) => (
  <svg
    className="projects-carousel-nav__icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id={`projects-chevron-${direction}`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#9333ea" />
        <stop offset="50%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#6ee7b7" />
      </linearGradient>
    </defs>
    <path
      d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
      stroke={`url(#projects-chevron-${direction})`}
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Projects = () => {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const track = trackRef.current
    if (!track) return

    setCanScrollLeft(track.scrollLeft > 4)
    setCanScrollRight(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
    )
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    updateScrollState()

    track.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scrollProjects = (direction) => {
    const track = trackRef.current
    if (!track) return

    const card = track.querySelector('.project-carousel-card')
    const gap = 24
    const amount = card ? card.offsetWidth + gap : track.clientWidth * 0.9

    track.scrollBy({
      left: direction * amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="projects-section section-page section-page--default">
      <ScrollReveal className="mx-auto max-w-6xl">
        <ScrollRevealItem tier="head">
          <p
            id="projects"
            className="section-scroll-anchor text-sm font-semibold uppercase tracking-[0.3em] text-sky-400"
          >
            Projects
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Progetti principali
          </h2>
        </ScrollRevealItem>

        <ScrollRevealItem tier="body">
          <p className="section-after-title max-w-3xl text-lg leading-8 text-slate-300">
            Una selezione di progetti sviluppati durante il percorso da Full Stack
            Developer, tra applicazioni gestionali, piattaforme full stack e siti
            con pannello di amministrazione.
          </p>
        </ScrollRevealItem>

        <div className="projects-carousel mt-10">
          <button
            type="button"
            className="projects-carousel-nav"
            onClick={() => scrollProjects(-1)}
            disabled={!canScrollLeft}
            aria-label="Scorri progetti a sinistra"
          >
            <span className="projects-carousel-nav-inner">
              <ChevronIcon direction="left" />
            </span>
          </button>

          <div ref={trackRef} className="projects-carousel-track">
            {projects.map((project) => (
              <ProjectCarouselCard
                key={project.slug}
                project={project}
                trackRef={trackRef}
              />
            ))}
          </div>

          <button
            type="button"
            className="projects-carousel-nav"
            onClick={() => scrollProjects(1)}
            disabled={!canScrollRight}
            aria-label="Scorri progetti a destra"
          >
            <span className="projects-carousel-nav-inner">
              <ChevronIcon direction="right" />
            </span>
          </button>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default Projects
