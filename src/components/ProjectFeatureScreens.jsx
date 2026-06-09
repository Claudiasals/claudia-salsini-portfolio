import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from 'react-icons/fi'
import { getCarouselDotWaveDistance } from '../utils/carouselDotWave'

const LIGHTBOX_SWIPE_THRESHOLD_PX = 48

function getFeatureScreens(feature) {
  if (feature.screens?.length) return feature.screens
  if (feature.src) {
    return [{ src: feature.src, alt: feature.alt, label: feature.screenLabel }]
  }
  return []
}

function buildScreenshotGallery(features) {
  return features.flatMap((feature) =>
    getFeatureScreens(feature).map((screen) => ({
      featureTitle: feature.title,
      src: screen.src,
      alt: screen.alt,
      screenLabel: screen.label ?? null,
    })),
  )
}

/**
 * Card per funzionalità: titolo, testo, tag tecnici, screenshot (anche multipli). Click → lightbox.
 */
export function ProjectFeatureScreens({ features }) {
  const gallery = useMemo(() => buildScreenshotGallery(features), [features])
  const [activeIndex, setActiveIndex] = useState(null)

  const activeSlide = activeIndex == null ? null : gallery[activeIndex]
  const hasMultipleSlides = gallery.length > 1
  const isLightboxOpen = activeIndex != null

  const close = useCallback(() => setActiveIndex(null), [])

  const goToSlide = useCallback(
    (index) => {
      if (index < 0 || index >= gallery.length) return
      setActiveIndex(index)
    },
    [gallery.length],
  )

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current == null || current <= 0) return current
      return current - 1
    })
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current == null || current >= gallery.length - 1) return current
      return current + 1
    })
  }, [gallery.length])

  const lightboxRef = useRef(null)
  const swipeStartRef = useRef(null)

  const handleLightboxTouchStart = useCallback((event) => {
    const touch = event.touches[0]
    if (!touch) return

    swipeStartRef.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const handleLightboxTouchEnd = useCallback(
    (event) => {
      const start = swipeStartRef.current
      swipeStartRef.current = null

      if (!start || !hasMultipleSlides) return

      const touch = event.changedTouches[0]
      if (!touch) return

      const deltaX = touch.clientX - start.x
      const deltaY = touch.clientY - start.y

      if (Math.abs(deltaX) < LIGHTBOX_SWIPE_THRESHOLD_PX) return
      if (Math.abs(deltaY) > Math.abs(deltaX) * 0.85) return

      if (deltaX < 0) {
        goNext()
      } else {
        goPrevious()
      }
    },
    [hasMultipleSlides, goNext, goPrevious],
  )

  const clearLightboxSwipe = useCallback(() => {
    swipeStartRef.current = null
  }, [])

  useEffect(() => {
    if (!isLightboxOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        close()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrevious()
      }
    }

    const scrollY = window.scrollY
    const { body, documentElement } = document
    const bodyStyle = body.style
    const htmlStyle = documentElement.style
    const previousBody = {
      position: bodyStyle.position,
      top: bodyStyle.top,
      left: bodyStyle.left,
      right: bodyStyle.right,
      width: bodyStyle.width,
      overflow: bodyStyle.overflow,
    }
    const previousHtmlOverflow = htmlStyle.overflow

    bodyStyle.position = 'fixed'
    bodyStyle.top = `-${scrollY}px`
    bodyStyle.left = '0'
    bodyStyle.right = '0'
    bodyStyle.width = '100%'
    bodyStyle.overflow = 'hidden'
    htmlStyle.overflow = 'hidden'
    body.classList.add('project-screenshot-lightbox-open')

    const lightbox = lightboxRef.current
    const onTouchMove = (event) => {
      event.preventDefault()
    }

    lightbox?.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      lightbox?.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)

      body.classList.remove('project-screenshot-lightbox-open')
      bodyStyle.position = previousBody.position
      bodyStyle.top = previousBody.top
      bodyStyle.left = previousBody.left
      bodyStyle.right = previousBody.right
      bodyStyle.width = previousBody.width
      bodyStyle.overflow = previousBody.overflow
      htmlStyle.overflow = previousHtmlOverflow
      window.scrollTo(0, scrollY)
    }
  }, [isLightboxOpen, close, goNext, goPrevious])

  let galleryCursor = 0

  return (
    <>
      <ul className="project-case-feature-screens">
        {features.map((feature) => {
          const screens = getFeatureScreens(feature)

          const multiScreens = screens.length > 1
          const cardLayout =
            screens.length === 1
              ? 'project-case-feature-screens__card--side'
              : multiScreens
                ? 'project-case-feature-screens__card--stacked'
                : ''

          return (
            <li
              key={feature.title}
              className={`project-case-feature-screens__card ${cardLayout}`.trim()}
            >
              <div className="project-case-feature-screens__copy">
                <h3 className="project-case-feature-screens__title">{feature.title}</h3>
                <p className="project-case-card__text">{feature.text}</p>

                {feature.tags ? (
                  <p className="project-case-feature-screens__tags">{feature.tags}</p>
                ) : null}

                {screens.length === 0 && feature.fallback ? (
                  <p className="project-case-feature-screens__fallback">{feature.fallback}</p>
                ) : null}
              </div>

              {screens.length > 0 ? (
                <div className="project-case-feature-screens__media">
                  <div
                    className={
                      multiScreens
                        ? 'project-case-feature-screens__shots'
                        : 'project-case-feature-screens__shots project-case-feature-screens__shots--single'
                    }
                  >
                    {screens.map((screen) => {
                      const slideIndex = galleryCursor
                      galleryCursor += 1
                      const openScreen = () => setActiveIndex(slideIndex)

                      return (
                        <div key={screen.src} className="project-case-feature-screens__shot">
                          <div className="project-case-feature-screens__frame group relative overflow-hidden">
                            <button
                              type="button"
                              className="project-case-feature-screens__frame-hit"
                              onClick={openScreen}
                              aria-label={`Ingrandisci immagine: ${feature.title}${screen.label ? ` — ${screen.label}` : ''}`}
                            >
                              <img
                                src={screen.src}
                                alt={screen.alt}
                                className="project-case-feature-screens__img w-full cursor-zoom-in transition duration-300 group-hover:scale-[1.02]"
                                loading="lazy"
                                decoding="async"
                              />
                            </button>
                            <button
                              type="button"
                              className="project-case-feature-screens__expand-btn absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
                              onClick={openScreen}
                              aria-label="Ingrandisci immagine"
                            >
                              <FiMaximize2 size={18} aria-hidden />
                            </button>
                          </div>
                          {screen.label ? (
                            <span className="project-case-feature-screens__screen-label">
                              {screen.label}
                            </span>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>

      {activeSlide ? (
        <div
          ref={lightboxRef}
          className="project-screenshot-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeSlide.featureTitle}
          onClick={close}
          onTouchStart={handleLightboxTouchStart}
          onTouchEnd={handleLightboxTouchEnd}
          onTouchCancel={clearLightboxSwipe}
        >
          <button
            type="button"
            className="nav-btn project-screenshot-lightbox__close"
            onClick={close}
            aria-label="Chiudi anteprima"
          >
            <span className="nav-btn-inner project-screenshot-lightbox__close-inner">
              <FiX className="project-screenshot-lightbox__close-icon" aria-hidden />
            </span>
          </button>

          {hasMultipleSlides ? (
            <button
              type="button"
              className="nav-btn project-screenshot-lightbox__nav project-screenshot-lightbox__nav--prev"
              onClick={(event) => {
                event.stopPropagation()
                goPrevious()
              }}
              disabled={activeIndex <= 0}
              aria-label="Screenshot precedente"
            >
              <span className="nav-btn-inner project-screenshot-lightbox__nav-inner">
                <FiChevronLeft className="project-screenshot-lightbox__nav-icon" aria-hidden />
              </span>
            </button>
          ) : null}

          {hasMultipleSlides ? (
            <button
              type="button"
              className="nav-btn project-screenshot-lightbox__nav project-screenshot-lightbox__nav--next"
              onClick={(event) => {
                event.stopPropagation()
                goNext()
              }}
              disabled={activeIndex >= gallery.length - 1}
              aria-label="Screenshot successivo"
            >
              <span className="nav-btn-inner project-screenshot-lightbox__nav-inner">
                <FiChevronRight className="project-screenshot-lightbox__nav-icon" aria-hidden />
              </span>
            </button>
          ) : null}

          <div
            className="project-screenshot-lightbox__inner"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="project-screenshot-lightbox__section-title">{activeSlide.featureTitle}</p>

            <img
              src={activeSlide.src}
              alt={activeSlide.alt}
              className="project-screenshot-lightbox__img"
            />

            {activeSlide.screenLabel ? (
              <p className="project-screenshot-lightbox__caption">{activeSlide.screenLabel}</p>
            ) : null}

            {hasMultipleSlides ? (
              <div
                className="project-screenshot-lightbox__dots projects-carousel-dots"
                role="tablist"
                aria-label="Screenshot del progetto"
              >
                {gallery.map((slide, index) => {
                  const waveDistance = getCarouselDotWaveDistance(index, activeIndex)

                  return (
                    <span key={`${slide.src}-${index}`} className="projects-carousel-dot-cell">
                      <button
                        type="button"
                        role="tab"
                        className={`projects-carousel-dot${
                          activeIndex === index ? ' projects-carousel-dot--active' : ''
                        }`}
                        data-wave-distance={waveDistance}
                        aria-selected={activeIndex === index}
                        aria-label={`${slide.featureTitle}${slide.screenLabel ? ` — ${slide.screenLabel}` : ''}`}
                        onClick={() => goToSlide(index)}
                      />
                    </span>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
