import { useNavigate } from 'react-router-dom'
import { scrollToSectionByIdAfterLayout } from '../utils/scrollToSection'

/**
 * Scroll affidabile alla sezione demo sulla pagina progetto
 * (funziona anche se l’hash è già attivo).
 */
export function ProjectDemoLink({ sectionId, className = 'btn-primary', children }) {
  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault()
    const behavior = 'smooth'

    if (window.location.hash.replace('#', '') !== sectionId) {
      navigate({ hash: sectionId }, { replace: true })
    }

    scrollToSectionByIdAfterLayout(sectionId, behavior)
  }

  return (
    <a href={`#${sectionId}`} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
