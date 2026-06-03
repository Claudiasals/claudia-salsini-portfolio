import { useEffect, useMemo, useRef } from 'react'
import { projects } from '../data/projects'
import ProjectCarouselCard from './ProjectCarouselCard'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'
import {
  initProjectCarouselLoop,
  scrollProjectCarouselBy,
} from '../utils/projectCarousel'

const LOOP_SET_COUNT = 3

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

/** Tre sequenze 1-2-3: scorrimento lineare, loop senza card “clone” singole. */
const buildCarouselSlides = (items) => {
  if (items.length <= 1) {
    return items.map((project) => ({
      key: project.slug,
      project,
      carouselSlide: 'real',
    }))
  }

  return Array.from({ length: LOOP_SET_COUNT }, (_, setIndex) =>
    items.map((project) => ({
      key: `${project.slug}-loop-${setIndex}`,
      project,
      carouselSlide: setIndex === 1 ? 'real' : 'loop-duplicate',
    })),
  ).flat()
}

const Projects = () => {
  const trackRef = useRef(null)
  const slides = useMemo(() => buildCarouselSlides(projects), [])
  const slidesKey = slides.map((slide) => slide.key).join('|')
  const loopEnabled = projects.length > 1

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    return initProjectCarouselLoop(track)
  }, [slidesKey])

  const scrollProjects = (direction) => {
    const track = trackRef.current
    if (!track) return
    scrollProjectCarouselBy(track, direction)
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

          <h2 className="section-heading mt-4 text-3xl font-bold text-white md:text-4xl">
            Progetti principali
          </h2>
        </ScrollRevealItem>

        <ScrollRevealItem tier="body">
          <p className="section-lead section-after-title max-w-3xl">
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
            aria-label="Progetto precedente"
          >
            <span className="projects-carousel-nav-inner">
              <ChevronIcon direction="left" />
            </span>
          </button>

          <div
            ref={trackRef}
            className="projects-carousel-track"
            data-carousel-loop={loopEnabled ? 'true' : undefined}
            data-carousel-set-size={projects.length}
          >
            {slides.map(({ key, project, carouselSlide }) => (
              <ProjectCarouselCard
                key={key}
                project={project}
                trackRef={trackRef}
                carouselSlide={carouselSlide}
              />
            ))}
          </div>

          <button
            type="button"
            className="projects-carousel-nav"
            onClick={() => scrollProjects(1)}
            aria-label="Progetto successivo"
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
