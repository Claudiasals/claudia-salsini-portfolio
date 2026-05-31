import Contact from './Contact'
import Skills from './Skills'
import { useGridSpotlight } from '../hooks/useGridSpotlight'

const SkillsContactZone = () => {
  const { patternRef, onMouseMove, onMouseLeave } = useGridSpotlight(
    '.contact-detail-list',
  )

  return (
    <div
      className="skills-contact-grid-zone"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div ref={patternRef} className="section-grid-pattern" aria-hidden="true" />
      <Skills />
      <Contact />
    </div>
  )
}

export default SkillsContactZone
