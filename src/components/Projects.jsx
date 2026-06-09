import { useEffect, useMemo, useRef, useState } from 'react'
import { projects } from '../data/projects'
import ProjectCarouselCard from './ProjectCarouselCard'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'
import { getCarouselDotWaveDistance } from '../utils/carouselDotWave'
import {
  getActiveProjectIndex,
  initProjectCarouselLoop,
  scrollProjectCarouselToProjectIndex,
} from '../utils/projectCarousel'

const LOOP_SET_COUNT = 3

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
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    const syncActiveProject = () => {
      const nextIndex = getActiveProjectIndex(track)
      setActiveProjectIndex((current) => (current === nextIndex ? current : nextIndex))
    }

    const cleanup = initProjectCarouselLoop(track)

    syncActiveProject()
    track.addEventListener('scroll', syncActiveProject, { passive: true })
    track.addEventListener('scrollend', syncActiveProject, { passive: true })

    return () => {
      track.removeEventListener('scroll', syncActiveProject)
      track.removeEventListener('scrollend', syncActiveProject)
      cleanup?.()
    }
  }, [slidesKey])

  const goToProject = (projectIndex) => {
    const track = trackRef.current
    if (!track) return
    scrollProjectCarouselToProjectIndex(track, projectIndex)
  }

  return (
    <section className="projects-section section-page section-page--default">
      <ScrollReveal className="relative z-10 mx-auto max-w-6xl">
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
          <p className="section-lead section-after-title max-w-3xl hidden sm:block">
            Una selezione di progetti full stack sviluppati tra stage, formazione e iniziative
            personali: applicazioni web complete, interfacce curate e soluzioni nate per
            trasformare esigenze concrete in strumenti digitali funzionali.
          </p>
        </ScrollRevealItem>

        <div className="projects-carousel mt-10">
          <div className="projects-carousel-stage">
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
          </div>

          {loopEnabled ? (
            <div className="projects-carousel-dots" role="tablist" aria-label="Progetti">
              {projects.map((project, index) => {
                const waveDistance = getCarouselDotWaveDistance(index, activeProjectIndex)
                const isActive = activeProjectIndex === index

                return (
                  <span key={project.slug} className="projects-carousel-dot-cell">
                    <button
                      type="button"
                      role="tab"
                      className={`projects-carousel-dot${
                        isActive ? ' projects-carousel-dot--active' : ''
                      }`}
                      data-wave-distance={waveDistance}
                      aria-selected={isActive}
                      aria-label={`Vai a ${project.title}`}
                      onClick={() => goToProject(index)}
                    />
                  </span>
                )
              })}
            </div>
          ) : null}
        </div>
      </ScrollReveal>
    </section>
  )
}

export default Projects
