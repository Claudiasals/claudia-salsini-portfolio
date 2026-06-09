import { Link } from 'react-router-dom'
import { getNextProjects } from '../data/projects'

/** Suggerimenti in fondo alla pagina progetto: i due progetti successivi nel carousel. */
export function ProjectSuggestions({ currentSlug, className = '' }) {
  const suggestions = getNextProjects(currentSlug, 2)

  if (suggestions.length === 0) return null

  const rootClass = ['project-case-suggestions', className].filter(Boolean).join(' ')

  return (
    <section className={rootClass} aria-labelledby="project-suggestions-heading">
      <p className="project-case-section-label">Altri progetti</p>
      <h2
        id="project-suggestions-heading"
        className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
      >
        Continua a esplorare
      </h2>

      <ul className="project-case-suggestions__grid">
        {suggestions.map((project) => (
          <li key={project.slug}>
            <Link
              to={`/progetti/${project.slug}`}
              className="project-case-suggestions__card skills-category-panel"
            >
              <div className="skills-category-inner project-case-suggestions__inner">
                <div className="project-case-suggestions__media">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="project-case-suggestions__image"
                    loading="lazy"
                  />
                </div>
                <div className="project-case-suggestions__body">
                  <p className="project-case-suggestions__category">{project.category}</p>
                  <h3 className="project-case-suggestions__title">{project.title}</h3>
                  <p className="project-case-suggestions__desc">{project.description}</p>
                  <span className="btn-secondary project-case-suggestions__cta">
                    <span className="btn-secondary-inner">Vai al progetto →</span>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <nav className="project-case-suggestions__all" aria-label="Torna all'elenco progetti">
        <Link to="/#projects" className="project-detail-back">
          ← Tutti i progetti
        </Link>
      </nav>
    </section>
  )
}
