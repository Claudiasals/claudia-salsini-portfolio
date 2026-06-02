import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjectExternalLinkLabel } from '../data/projects'
import ProjectTypingTitle from './ProjectTypingTitle'
import TypingTerminalLabel from './TypingTerminalLabel'
import { ScrollRevealContext } from './ScrollReveal'

const ProjectCarouselCard = ({ project, trackRef, carouselSlide = 'real' }) => {
  const cardRef = useRef(null)
  const sectionVisible = useContext(ScrollRevealContext)
  const [typingEnabled, setTypingEnabled] = useState(false)
  const hasTypedRef = useRef(false)

  const externalLinkLabel = getProjectExternalLinkLabel(project.externalUrl)

  useEffect(() => {
    if (!sectionVisible || hasTypedRef.current) return undefined

    const card = cardRef.current
    const track = trackRef.current
    if (!card || !track) return undefined

    const startTyping = () => {
      if (hasTypedRef.current) return
      hasTypedRef.current = true
      setTypingEnabled(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startTyping()
          observer.disconnect()
        }
      },
      { root: track, threshold: 0.35 },
    )

    observer.observe(card)

    return () => observer.disconnect()
  }, [sectionVisible, trackRef])

  const isLoopDuplicate = carouselSlide === 'loop-duplicate'

  return (
    <article
      ref={cardRef}
      className="project-carousel-card skills-category-panel"
      data-carousel-slide={carouselSlide}
      aria-hidden={isLoopDuplicate ? true : undefined}
    >
      <div className="skills-category-inner skills-category-inner--project">
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
            <Link to={`/progetti/${project.slug}`} className="btn-primary">
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
}

export default ProjectCarouselCard
