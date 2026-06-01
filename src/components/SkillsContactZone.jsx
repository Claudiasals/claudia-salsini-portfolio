import { useEffect, useRef } from 'react'
import useHeroCircuitSpotlight from '../hooks/useHeroCircuitSpotlight'
import Contact from './Contact'
import Skills from './Skills'

const SkillsContactZone = () => {
  const zoneRef = useRef(null)
  const { patternRef, pointerRef, onMouseMove, onMouseLeave } = useHeroCircuitSpotlight()

  useEffect(() => {
    const zone = zoneRef.current
    const skills = zone?.querySelector('.skills-section')
    if (!zone || !skills) return undefined

    const updateFade = () => {
      const zoneRect = zone.getBoundingClientRect()
      const skillsRect = skills.getBoundingClientRect()
      const halfY = skillsRect.top - zoneRect.top + skillsRect.height / 2
      const fadeSpan = Math.min(200, Math.max(120, skillsRect.height * 0.38))

      zone.style.setProperty('--circuits-fade-from', `${Math.max(0, halfY - fadeSpan * 0.4)}px`)
      zone.style.setProperty('--circuits-fade-mid', `${halfY}px`)
      zone.style.setProperty('--circuits-fade-to', `${halfY + fadeSpan}px`)
    }

    updateFade()

    const observer = new ResizeObserver(updateFade)
    observer.observe(zone)
    observer.observe(skills)
    window.addEventListener('resize', updateFade)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateFade)
    }
  }, [])

  return (
    <div
      ref={zoneRef}
      className="skills-contact-grid-zone"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="skills-contact-circuits hero-bg" aria-hidden="true">
        <div className="hero-bg__circuit" />
        <div
          ref={patternRef}
          className="hero-bg__circuit-spotlight hero-bg__circuit-spotlight--auto"
          aria-hidden="true"
        />
        <div
          ref={pointerRef}
          className="hero-bg__circuit-spotlight hero-bg__circuit-spotlight--pointer"
          aria-hidden="true"
        />
        <div className="hero-bg__glow" />
        <div className="hero-bg__scrim" />
      </div>

      <Skills />
      <Contact />
    </div>
  )
}

export default SkillsContactZone
