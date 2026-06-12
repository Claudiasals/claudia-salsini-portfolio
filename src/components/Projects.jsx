import { useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import ProjectCarouselCard from './ProjectCarouselCard'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'
import {
  getNextProjectIndex,
  getPrevProjectIndex,
  getProjectCarouselSlot,
  getRelativeProjectOffset,
} from '../utils/projectsCarousel3d'

const SWIPE_THRESHOLD_PX = 48
const CAROUSEL_MOTION_MS = 880

function CarouselChevron({ direction }) {
  const path = direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'

  return (
    <svg
      className="projects-carousel-3d__nav-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const stageRef = useRef(null)
  const centerCardRef = useRef(null)
  const swipeStartRef = useRef(null)
  const motionTimerRef = useRef(null)

  const projectCount = projects.length
  const loopEnabled = projectCount > 1

  const goToProject = useCallback(
    (index) => {
      if (projectCount <= 0) return
      const normalized = ((index % projectCount) + projectCount) % projectCount
      setCurrentIndex(normalized)
    },
    [projectCount],
  )

  const nextProject = useCallback(() => {
    setCurrentIndex((current) => getNextProjectIndex(current, projectCount))
  }, [projectCount])

  const prevProject = useCallback(() => {
    setCurrentIndex((current) => getPrevProjectIndex(current, projectCount))
  }, [projectCount])

  useEffect(() => {
    if (!loopEnabled) return undefined

    const onKeyDown = (event) => {
      const anchor = document.getElementById('projects')
      if (!anchor) return

      const rect = anchor.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08
      if (!inView) return

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        nextProject()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        prevProject()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [loopEnabled, nextProject, prevProject])

  useEffect(() => {
    setIsAnimating(true)

    if (motionTimerRef.current != null) {
      window.clearTimeout(motionTimerRef.current)
    }

    motionTimerRef.current = window.setTimeout(() => {
      setIsAnimating(false)
      motionTimerRef.current = null
    }, CAROUSEL_MOTION_MS)

    return () => {
      if (motionTimerRef.current != null) {
        window.clearTimeout(motionTimerRef.current)
        motionTimerRef.current = null
      }
    }
  }, [currentIndex])

  useEffect(() => {
    const stage = stageRef.current
    const centerCard = centerCardRef.current
    if (!stage || !centerCard) return undefined

    const syncStageHeight = () => {
      stage.style.height = `${centerCard.offsetHeight}px`
    }

    syncStageHeight()

    const observer = new ResizeObserver(syncStageHeight)
    observer.observe(centerCard)

    return () => observer.disconnect()
  }, [currentIndex])

  const handleTouchStart = useCallback((event) => {
    const touch = event.touches[0]
    if (!touch) return
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const handleTouchEnd = useCallback(
    (event) => {
      const start = swipeStartRef.current
      swipeStartRef.current = null

      if (!start || !loopEnabled) return

      const touch = event.changedTouches[0]
      if (!touch) return

      const deltaX = touch.clientX - start.x
      const deltaY = touch.clientY - start.y

      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return
      if (Math.abs(deltaY) > Math.abs(deltaX) * 0.85) return

      if (deltaX < 0) {
        nextProject()
      } else {
        prevProject()
      }
    },
    [loopEnabled, nextProject, prevProject],
  )

  const clearSwipe = useCallback(() => {
    swipeStartRef.current = null
  }, [])

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

        <div
          className={`projects-carousel-3d mt-10${isAnimating ? ' is-animating' : ''}`}
          aria-roledescription="carousel"
          aria-label="Progetti principali"
        >
          <div className="projects-carousel-3d__viewport">
            {loopEnabled ? (
              <button
                type="button"
                className="projects-carousel-3d__nav"
                onClick={prevProject}
                aria-label="Progetto precedente"
              >
                <CarouselChevron direction="left" />
              </button>
            ) : null}

            <div
              ref={stageRef}
              className="projects-carousel-3d__stage"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={clearSwipe}
            >
              <div className="projects-carousel-3d__track">
                {projects.map((project, index) => {
                  const offset = getRelativeProjectOffset(index, currentIndex, projectCount)
                  const slot = getProjectCarouselSlot(offset)
                  const isCenter = offset === 0

                  return (
                    <ProjectCarouselCard
                      key={project.slug}
                      ref={isCenter ? centerCardRef : undefined}
                      project={project}
                      carouselSlot={slot}
                      isCenter={isCenter}
                      onSelect={() => goToProject(index)}
                    />
                  )
                })}
              </div>
            </div>

            {loopEnabled ? (
              <button
                type="button"
                className="projects-carousel-3d__nav"
                onClick={nextProject}
                aria-label="Progetto successivo"
              >
                <CarouselChevron direction="right" />
              </button>
            ) : null}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default Projects
