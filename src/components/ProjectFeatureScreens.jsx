import { useCallback, useEffect, useState } from 'react'
import { FiMaximize2, FiX } from 'react-icons/fi'

function getFeatureScreens(feature) {
  if (feature.screens?.length) return feature.screens
  if (feature.src) {
    return [{ src: feature.src, alt: feature.alt, label: feature.screenLabel }]
  }
  return []
}

/**
 * Card per funzionalità: titolo, testo, tag tecnici, screenshot (anche multipli). Click → lightbox.
 */
export function ProjectFeatureScreens({ features }) {
  const [active, setActive] = useState(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [active, close])

  const openLightbox = (feature, screen) => {
    setActive({
      title: feature.title,
      src: screen.src,
      alt: screen.alt,
      screenLabel: screen.label,
    })
  }

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
                      const openScreen = () => openLightbox(feature, screen)

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

      {active?.src ? (
        <div
          className="project-screenshot-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
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
            <img
              src={active.src}
              alt={active.alt}
              className="project-screenshot-lightbox__img"
            />
            <p className="project-screenshot-lightbox__caption">
              {active.title}
              {active.screenLabel ? ` — ${active.screenLabel}` : ''}
            </p>
          </div>
        </div>
      ) : null}
    </>
  )
}
