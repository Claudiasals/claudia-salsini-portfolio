import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { FiMaximize2, FiX } from 'react-icons/fi'
import { PinchZoomImage } from './PinchZoomImage'
import { getCarouselDotWaveDistance } from '../utils/carouselDotWave'

const LIGHTBOX_SWIPE_THRESHOLD_PX = 48

function pauseProjectDemoVideos() {
  document.querySelectorAll('.project-case-video__player').forEach((video) => {
    if (video instanceof HTMLVideoElement && !video.paused) {
      video.pause()
    }
  })
}

function getFeatureScreens(feature) {
  if (feature.screens?.length) return feature.screens
  if (feature.src) {
    return [{ src: feature.src, alt: feature.alt, label: feature.screenLabel }]
  }
  return []
}

function renderFeatureProse(feature) {
  const hasCopyHighlights =
    feature.highlightsStyle === 'copy' && feature.highlights?.length > 0

  if (hasCopyHighlights) {
    return (
      <div className="project-case-card__text">
        {feature.text ?? null}
        <ul className="project-case-feature-screens__highlights project-case-feature-screens__highlights--copy">
          {feature.highlights.map((item) => (
            <li key={item.title}>
              {item.title}: {item.text}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      {feature.text ? <p className="project-case-card__text">{feature.text}</p> : null}

      {feature.highlights?.length ? (
        <ul className="project-case-feature-screens__highlights space-y-3">
          {feature.highlights.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>: {item.text}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
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

function groupFeatureRows(features) {
  const groups = []
  let index = 0

  while (index < features.length) {
    const current = features[index]
    const next = features[index + 1]

    if (current.pairRow && next?.pairRow) {
      groups.push({ type: 'pair', items: [current, next] })
      index += 2
    } else {
      groups.push({ type: 'single', items: [current] })
      index += 1
    }
  }

  return groups
}

function FeatureScreenCard({ feature, asPairChild = false, galleryCursorRef, onOpenScreen }) {
  const copyRef = useRef(null)
  const [copyHeight, setCopyHeight] = useState(null)
  const screens = getFeatureScreens(feature)
  const multiScreens = screens.length > 1
  const sideLayout = feature.layout === 'side'
  const sideReverseLayout = feature.layout === 'side-reverse'
  const sideSplitLayout = feature.layout === 'side-split'
  const cropBottom = feature.imageCropBottom ?? 0
  const matchCopyHeight = feature.imageMatchCopyHeight === true

  const cardLayout = [
    asPairChild ? 'project-case-feature-screens__card--pair-child' : '',
    sideLayout ? 'project-case-feature-screens__card--side' : '',
    sideReverseLayout ? 'project-case-feature-screens__card--side-reverse' : '',
    sideSplitLayout ? 'project-case-feature-screens__card--side-split' : '',
    multiScreens && !sideSplitLayout ? 'project-case-feature-screens__card--multi' : '',
    matchCopyHeight ? 'project-case-feature-screens__card--image-fit-copy' : '',
  ]
    .filter(Boolean)
    .join(' ')

  useLayoutEffect(() => {
    if (!matchCopyHeight || !copyRef.current) {
      setCopyHeight(null)
      return undefined
    }

    const sync = () => {
      if (window.matchMedia('(width < 768px)').matches) {
        setCopyHeight(null)
        return
      }

      setCopyHeight(copyRef.current?.offsetHeight ?? null)
    }

    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(copyRef.current)
    window.addEventListener('resize', sync)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', sync)
    }
  }, [matchCopyHeight, feature.text, feature.tags, feature.title])

  const renderScreen = (screen, shotClassName = '') => {
    const slideIndex = galleryCursorRef.current
    galleryCursorRef.current += 1

    const frameStyle = {}
    if (cropBottom > 0) frameStyle['--image-crop-bottom'] = `${cropBottom}px`
    if (matchCopyHeight && copyHeight) {
      frameStyle.maxHeight = `${Math.max(0, copyHeight - cropBottom)}px`
    }

    const frameClassName = [
      'project-case-feature-screens__frame group relative overflow-hidden',
      cropBottom > 0 ? 'project-case-feature-screens__frame--crop-bottom' : '',
      matchCopyHeight && copyHeight ? 'project-case-feature-screens__frame--fit-copy' : '',
    ]
      .filter(Boolean)
      .join(' ')

    const imgClassName = [
      'project-case-feature-screens__img transition duration-300',
      cropBottom > 0 ? 'project-case-feature-screens__img--crop-bottom' : '',
      matchCopyHeight && copyHeight ? 'project-case-feature-screens__img--fit-copy' : '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        key={screen.src}
        className={`project-case-feature-screens__shot ${shotClassName}`.trim()}
      >
        <div className={frameClassName} style={Object.keys(frameStyle).length ? frameStyle : undefined}>
          <PinchZoomImage
            className="project-case-feature-screens__pinch"
            stageClassName="project-case-feature-screens__pinch-stage"
            onActivate={() => onOpenScreen(slideIndex)}
            ariaLabel={`Ingrandisci immagine: ${feature.title}${screen.label ? ` — ${screen.label}` : ''}`}
          >
            <img
              src={screen.src}
              alt={screen.alt}
              className={imgClassName}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </PinchZoomImage>
          <button
            type="button"
            className="project-case-feature-screens__expand-btn absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
            onClick={() => onOpenScreen(slideIndex)}
            aria-label="Ingrandisci immagine"
          >
            <FiMaximize2 size={18} aria-hidden />
          </button>
        </div>
        {screen.label ? (
          <span className="project-case-feature-screens__screen-label">{screen.label}</span>
        ) : null}
      </div>
    )
  }

  const cardBody = (
    <>
      <div className="project-case-feature-screens__copy" ref={copyRef}>
        <h3 className="project-case-feature-screens__title">{feature.title}</h3>
        {sideSplitLayout ? (
          <div className="project-case-feature-screens__copy-body">
            {renderFeatureProse(feature)}

            {feature.tags ? (
              <p className="project-case-feature-screens__tags">{feature.tags}</p>
            ) : null}

            {screens.length === 0 && feature.fallback ? (
              <p className="project-case-feature-screens__fallback">{feature.fallback}</p>
            ) : null}
          </div>
        ) : (
          <>
            {renderFeatureProse(feature)}

            {feature.tags ? (
              <p className="project-case-feature-screens__tags">{feature.tags}</p>
            ) : null}

            {screens.length === 0 && feature.fallback ? (
              <p className="project-case-feature-screens__fallback">{feature.fallback}</p>
            ) : null}
          </>
        )}
      </div>

      {sideSplitLayout && screens.length >= 2 ? (
        <>
          {renderScreen(screens[0], 'project-case-feature-screens__shot--side-split-inline')}
          {renderScreen(screens[1], 'project-case-feature-screens__shot--side-split-tall')}
        </>
      ) : screens.length > 0 ? (
        <div className="project-case-feature-screens__media">
          <div
            className={
              multiScreens
                ? 'project-case-feature-screens__shots'
                : 'project-case-feature-screens__shots project-case-feature-screens__shots--single'
            }
          >
            {screens.map((screen) => renderScreen(screen))}
          </div>
        </div>
      ) : null}
    </>
  )

  if (asPairChild) {
    return (
      <div key={feature.title} className={`project-case-feature-screens__card ${cardLayout}`.trim()}>
        {cardBody}
      </div>
    )
  }

  return (
    <li key={feature.title} className={`project-case-feature-screens__card ${cardLayout}`.trim()}>
      {cardBody}
    </li>
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
  const isZoomedRef = useRef(false)

  const handleZoomChange = useCallback((isZoomed) => {
    isZoomedRef.current = isZoomed
  }, [])

  const handleLightboxTouchStart = useCallback((event) => {
    if (event.touches.length !== 1 || isZoomedRef.current) return

    const touch = event.touches[0]
    if (!touch) return

    swipeStartRef.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const handleLightboxTouchEnd = useCallback(
    (event) => {
      const start = swipeStartRef.current
      swipeStartRef.current = null

      if (!start || !hasMultipleSlides || isZoomedRef.current) return

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

    pauseProjectDemoVideos()

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

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      isZoomedRef.current = false

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

  const featureGroups = useMemo(() => groupFeatureRows(features), [features])
  const galleryCursorRef = useRef(0)

  const openScreenAt = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  galleryCursorRef.current = 0

  return (
    <>
      <ul className="project-case-feature-screens">
        {featureGroups.map((group) => {
          if (group.type === 'pair') {
            return (
              <li
                key={group.items.map((feature) => feature.title).join('--')}
                className="project-case-feature-screens__pair-row"
              >
                {group.items.map((feature) => (
                  <FeatureScreenCard
                    key={feature.title}
                    feature={feature}
                    asPairChild
                    galleryCursorRef={galleryCursorRef}
                    onOpenScreen={openScreenAt}
                  />
                ))}
              </li>
            )
          }

          return (
            <FeatureScreenCard
              key={group.items[0].title}
              feature={group.items[0]}
              galleryCursorRef={galleryCursorRef}
              onOpenScreen={openScreenAt}
            />
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

          <div
            className="project-screenshot-lightbox__inner"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="project-screenshot-lightbox__section-title">{activeSlide.featureTitle}</p>

            <PinchZoomImage
              className="project-screenshot-lightbox__zoom"
              stageClassName="project-screenshot-lightbox__zoom-stage"
              resetKey={activeIndex}
              maxScale={5}
              onZoomChange={handleZoomChange}
            >
              <img
                src={activeSlide.src}
                alt={activeSlide.alt}
                className="project-screenshot-lightbox__img"
                draggable={false}
              />
            </PinchZoomImage>

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
