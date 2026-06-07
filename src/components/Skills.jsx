import { useCallback, useEffect, useRef, useState } from 'react'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'
import TechRadar from './TechRadar'
import { SECTION_REVEAL_EVENT, elementIntersectsViewport } from '../utils/sectionReveal'

const Skills = () => {
  const radarRef = useRef(null)
  const wasInViewRef = useRef(false)
  const introDoneRef = useRef(false)
  const [radarActive, setRadarActive] = useState(false)

  const activateIntro = useCallback(() => {
    if (introDoneRef.current) return

    wasInViewRef.current = true
    introDoneRef.current = true
    setRadarActive(true)
  }, [])

  useEffect(() => {
    const radar = radarRef.current
    if (!radar) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!wasInViewRef.current) {
            activateIntro()
          }
          return
        }

        if (!introDoneRef.current) {
          wasInViewRef.current = false
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(radar)

    return () => observer.disconnect()
  }, [activateIntro])

  useEffect(() => {
    const radar = radarRef.current
    const skillsAnchor = document.getElementById('skills')
    if (!radar && !skillsAnchor) return undefined

    const onSectionReveal = (event) => {
      if (introDoneRef.current) return

      const sectionId = event.detail?.sectionId ?? null
      if (sectionId && sectionId !== 'skills') return

      const shouldActivate =
        sectionId === 'skills' ||
        (radar && elementIntersectsViewport(radar, { bottomInset: 48 })) ||
        (skillsAnchor && elementIntersectsViewport(skillsAnchor, { bottomInset: 48 }))

      if (shouldActivate) activateIntro()
    }

    window.addEventListener(SECTION_REVEAL_EVENT, onSectionReveal)
    return () => window.removeEventListener(SECTION_REVEAL_EVENT, onSectionReveal)
  }, [activateIntro])

  return (
    <section className="skills-section section-page section-page--default">
      <ScrollReveal className="relative z-10 mx-auto max-w-6xl">
        <ScrollRevealItem tier="head">
          <div className="skills-section__head">
            <p
              id="skills"
              className="section-scroll-anchor text-sm font-semibold uppercase tracking-[0.3em] text-sky-400"
            >
              Skills
            </p>

            <h2 className="section-heading mt-4 text-3xl font-bold text-white md:text-4xl">
              Competenze tecniche
            </h2>

            <p className="skills-lead section-lead mt-5 max-w-2xl">
              Il mio ecosistema tecnologico, visualizzato come un radar: linguaggi,
              framework e strumenti con cui progetto e sviluppo applicazioni web.
            </p>
          </div>
        </ScrollRevealItem>

        <ScrollRevealItem tier="content">
          <div ref={radarRef} className="tech-radar-layout section-after-title">
            <TechRadar active={radarActive} />
          </div>
        </ScrollRevealItem>
      </ScrollReveal>
    </section>
  )
}

export default Skills
