import { useCallback, useEffect, useRef, useState } from 'react'
import { getCarouselDotWaveDistance } from '../utils/carouselDotWave'

const SWIPE_THRESHOLD_PX = 48

export function ProjectInlineScreenshotCarousel({ slides, ariaLabel = 'Screenshot ottimizzazioni' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const swipeStartRef = useRef(null)
  const dotsRef = useRef(null)
  const carouselRef = useRef(null)

  const slideCount = slides.length
  const activeSlide = slides[activeIndex]
  const hasMultipleSlides = slideCount > 1

  const goToSlide = useCallback(
    (index) => {
      if (index < 0 || index >= slideCount) return
      setActiveIndex(index)
    },
    [slideCount],
  )

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => (current <= 0 ? current : current - 1))
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current >= slideCount - 1 ? current : current + 1))
  }, [slideCount])

  const focusCarousel = useCallback(() => {
    carouselRef.current?.focus()
  }, [])

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image()
      img.src = slide.src
    })
  }, [slides])

  const handleKeyDown = useCallback(
    (event) => {
      if (!hasMultipleSlides) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrevious()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      }
    },
    [hasMultipleSlides, goNext, goPrevious],
  )

  useEffect(() => {
    const dots = dotsRef.current
    if (!dots) return

    const activeCell = dots
      .querySelector('.projects-carousel-dot--active')
      ?.closest('.projects-carousel-dot-cell')
    if (!activeCell) return

    const targetLeft =
      activeCell.offsetLeft - (dots.clientWidth - activeCell.offsetWidth) / 2
    dots.scrollTo({ left: Math.max(0, targetLeft), behavior: 'auto' })
  }, [activeIndex])

  const handleTouchStart = useCallback((event) => {
    if (event.touches.length !== 1) return
    const touch = event.touches[0]
    if (!touch) return
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const handleTouchEnd = useCallback(
    (event) => {
      const start = swipeStartRef.current
      swipeStartRef.current = null
      if (!start || !hasMultipleSlides) return

      const touch = event.changedTouches[0]
      if (!touch) return

      const deltaX = touch.clientX - start.x
      const deltaY = touch.clientY - start.y

      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return
      if (Math.abs(deltaY) > Math.abs(deltaX) * 0.85) return

      focusCarousel()

      if (deltaX < 0) {
        goNext()
      } else {
        goPrevious()
      }
    },
    [focusCarousel, hasMultipleSlides, goNext, goPrevious],
  )

  const clearSwipe = useCallback(() => {
    swipeStartRef.current = null
  }, [])

  if (!activeSlide) return null

  return (
    <div
      ref={carouselRef}
      className="project-case-optimization-carousel"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={hasMultipleSlides ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div
        className="project-case-optimization-carousel__stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={clearSwipe}
      >
        <button
          type="button"
          className="project-case-optimization-carousel__frame"
          onClick={focusCarousel}
          aria-label={`${activeSlide.label ?? activeSlide.alt}. Usa le frecce della tastiera per scorrere gli screenshot.`}
        >
          <div className="project-case-optimization-carousel__viewport" aria-live="polite">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex

              return (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={isActive ? slide.alt : ''}
                  aria-hidden={!isActive}
                  className={`project-case-optimization-carousel__img${
                    isActive ? ' project-case-optimization-carousel__img--active' : ''
                  }`}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              )
            })}
          </div>
        </button>

        {hasMultipleSlides ? (
          <div
            ref={dotsRef}
            className="project-case-optimization-carousel__dots projects-carousel-dots"
            role="tablist"
            aria-label={ariaLabel}
          >
            {slides.map((item, index) => {
              const waveDistance = getCarouselDotWaveDistance(index, activeIndex)

              return (
                <span key={item.src} className="projects-carousel-dot-cell">
                  <button
                    type="button"
                    role="tab"
                    className={`projects-carousel-dot${
                      activeIndex === index ? ' projects-carousel-dot--active' : ''
                    }`}
                    data-wave-distance={waveDistance}
                    aria-selected={activeIndex === index}
                    aria-label={item.label ?? item.alt}
                    onClick={() => goToSlide(index)}
                  />
                </span>
              )
            })}
          </div>
        ) : null}

        {activeSlide.label ? (
          <p className="project-case-optimization-carousel__caption">{activeSlide.label}</p>
        ) : null}
      </div>
    </div>
  )
}
