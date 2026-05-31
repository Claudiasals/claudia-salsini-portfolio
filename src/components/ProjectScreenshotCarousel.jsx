import { useCallback, useEffect, useRef, useState } from 'react'

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
        id={`screenshot-chevron-${direction}`}
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
      stroke={`url(#screenshot-chevron-${direction})`}
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ProjectScreenshotCarousel = ({ items }) => {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(items.length > 1)
  const [activeIndex, setActiveIndex] = useState(0)

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    setCanScrollLeft(track.scrollLeft > 4)
    setCanScrollRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)

    const slides = [...track.querySelectorAll('.project-screenshots-carousel__slide')]
    if (!slides.length) return

    const trackCenter = track.scrollLeft + track.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
      const distance = Math.abs(slideCenter - trackCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }, [])

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
  }, [items.length, updateScrollState])

  const scrollScreenshots = (direction) => {
    const track = trackRef.current
    if (!track) return

    const slide = track.querySelector('.project-screenshots-carousel__slide')
    const gap = 24
    const amount = slide ? slide.offsetWidth + gap : track.clientWidth * 0.92

    track.scrollBy({
      left: direction * amount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="project-screenshots-carousel">
      <div className="project-screenshots-carousel__toolbar">
        <p className="project-screenshots-carousel__counter" aria-live="polite">
          {activeIndex + 1} / {items.length}
        </p>
        <p className="project-screenshots-carousel__hint">Scorri per vedere tutte le schermate</p>
      </div>

      <div className="project-screenshots-carousel__controls">
        <button
          type="button"
          className="projects-carousel-nav project-screenshots-carousel__nav"
          onClick={() => scrollScreenshots(-1)}
          disabled={!canScrollLeft}
          aria-label="Schermata precedente"
        >
          <span className="projects-carousel-nav-inner">
            <ChevronIcon direction="left" />
          </span>
        </button>

        <div ref={trackRef} className="project-screenshots-carousel__track">
          {items.map((shot, index) => (
            <figure
              key={shot.src}
              className="project-screenshots-carousel__slide"
              aria-label={`Schermata ${index + 1} di ${items.length}: ${shot.caption}`}
            >
              <div className="project-screenshots-carousel__frame">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="project-screenshots-carousel__img"
                  loading={index <= 1 ? 'eager' : 'lazy'}
                />
              </div>
              <figcaption className="project-screenshots-carousel__caption">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          className="projects-carousel-nav project-screenshots-carousel__nav"
          onClick={() => scrollScreenshots(1)}
          disabled={!canScrollRight}
          aria-label="Schermata successiva"
        >
          <span className="projects-carousel-nav-inner">
            <ChevronIcon direction="right" />
          </span>
        </button>
      </div>
    </div>
  )
}

export default ProjectScreenshotCarousel
