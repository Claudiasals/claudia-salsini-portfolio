import { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjectExternalLinkLabel } from '../data/projects'
import ProjectTypingTitle from './ProjectTypingTitle'
import TypingTerminalLabel from './TypingTerminalLabel'
import { ScrollRevealContext } from './ScrollReveal'

const ProjectCarouselCard = forwardRef(function ProjectCarouselCard(
  { project, carouselSlot = 'center', isCenter = false, onSelect },
  ref,
) {
  const sectionVisible = useContext(ScrollRevealContext)
  const [typingEnabled, setTypingEnabled] = useState(false)
  const hasTypedRef = useRef(false)

  const externalLinkLabel = getProjectExternalLinkLabel(project.externalUrl)
  const isSide = carouselSlot === 'left' || carouselSlot === 'right'

  useEffect(() => {
    if (!isCenter || !sectionVisible || hasTypedRef.current) return

    hasTypedRef.current = true
    setTypingEnabled(true)
  }, [isCenter, sectionVisible])

  const handleSideSelect = () => {
    if (!isSide || typeof onSelect !== 'function') return
    onSelect()
  }

  return (
    <article
      ref={ref}
      className={`project-carousel-card skills-category-panel project-carousel-card--${carouselSlot}`}
      data-carousel-slot={carouselSlot}
      aria-hidden={!isCenter}
      inert={!isCenter ? true : undefined}
      onClick={isSide ? handleSideSelect : undefined}
      onKeyDown={
        isSide
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleSideSelect()
              }
            }
          : undefined
      }
      tabIndex={isSide ? 0 : undefined}
      role={isSide ? 'button' : undefined}
      aria-label={isSide ? `Mostra ${project.title}` : undefined}
    >
      <div className="skills-category-inner skills-category-inner--project">
        {isCenter ? (
          <Link
            to={`/progetti/${project.slug}`}
            className="project-carousel-card__hit-area"
            aria-label={`Apri ${project.title}`}
            tabIndex={0}
          />
        ) : null}

        <div className="project-carousel-card__body">
          <p className="project-carousel-card__category project-card-category">
            <TypingTerminalLabel
              label={project.category}
              trigger={typingEnabled}
              variant="gradient"
            />
          </p>

          <div className="project-carousel-card__media">
            <div className="project-card-image-wrap">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="project-card-image"
                loading="lazy"
              />
            </div>
          </div>

          <div className="project-carousel-card__title-block">
            <ProjectTypingTitle title={project.title} enabled={typingEnabled} />
          </div>

          <p className="project-carousel-card__description text-slate-300">
            {project.description}
          </p>

          <div className="project-card-actions project-carousel-card__actions">
            <Link to={`/progetti/${project.slug}`} className="btn-primary project-carousel-card__cta">
              <span className="btn-primary-inner">
                <span className="btn-primary-text">Vai al progetto</span>
              </span>
            </Link>

            {externalLinkLabel && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <span className="btn-secondary-inner">{externalLinkLabel}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
})

export default ProjectCarouselCard
