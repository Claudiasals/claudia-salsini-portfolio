import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  FiCheckSquare,
  FiCode,
  FiTrendingUp,
} from 'react-icons/fi'
import { LuLightbulb } from 'react-icons/lu'
import { RxRocket } from 'react-icons/rx'
import {
  DAILY_STACK,
  getDailyStackSkillDetail,
  getRadarSkillsByCategory,
  PROCESS_STEPS,
  SKILL_CATEGORIES,
  SKILL_CATEGORY_TABS,
} from '../data/skillsShowcase'
import { SECTION_REVEAL_EVENT, elementIntersectsViewport } from '../utils/sectionReveal'
import '../skills.css'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'
import TechRadar, { SkillIcon } from './TechRadar'

const DEFAULT_CATEGORY = 'frontend'

const processIcons = {
  idea: LuLightbulb,
  code: FiCode,
  test: FiCheckSquare,
  deploy: RxRocket,
  evolution: FiTrendingUp,
}

const SkillDetailCard = ({ skill }) => (
  <article
    className="skills-detail-card"
    style={{ '--skill-color': skill.glow }}
    aria-live="polite"
  >
    <p className="skills-detail-card__category terminal-gradient-label">
      {SKILL_CATEGORIES[skill.category] ?? skill.category}
    </p>

    <div className="skills-detail-card__body">
      <span className="skills-detail-card__icon" aria-hidden="true">
        <SkillIcon skill={skill} />
      </span>

      <div className="skills-detail-card__copy">
        <h3 className="skills-detail-card__name">{skill.name}</h3>
        <p className="skills-detail-card__desc">{skill.description}</p>
      </div>
    </div>
  </article>
)

const ProcessArrow = ({ from, to, index, curveUp }) => {
  const gradId = `skills-process-arrow-grad-${index}`
  const markerId = `skills-process-arrowhead-${index}`
  const path = curveUp ? 'M 2 14 Q 24 4, 46 14' : 'M 2 14 Q 24 24, 46 14'

  return (
    <svg
      className="skills-process-arrow"
      viewBox="0 0 48 28"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="2"
          y1="14"
          x2="46"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <marker
          id={markerId}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={to} />
        </marker>
      </defs>
      <path
        className="skills-process-arrow__path"
        d={path}
        stroke={`url(#${gradId})`}
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  )
}

const Skills = () => {
  const radarRef = useRef(null)
  const wasInViewRef = useRef(false)
  const introDoneRef = useRef(false)
  const [radarActive, setRadarActive] = useState(false)
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY)
  const [activeSkillId, setActiveSkillId] = useState(
    () => getRadarSkillsByCategory(DEFAULT_CATEGORY)[0]?.id ?? null,
  )
  const [activeStackName, setActiveStackName] = useState(null)

  const categorySkills = useMemo(
    () => getRadarSkillsByCategory(activeCategory),
    [activeCategory],
  )

  const activeSkill = useMemo(() => {
    const selected =
      categorySkills.find((skill) => skill.id === activeSkillId) ?? categorySkills[0]
    return selected ?? null
  }, [activeSkillId, categorySkills])

  const activeStackSkill = useMemo(() => {
    const item = DAILY_STACK.find((tool) => tool.name === activeStackName)
    return item ? getDailyStackSkillDetail(item) : null
  }, [activeStackName])

  const selectCategory = useCallback((categoryId) => {
    const skills = getRadarSkillsByCategory(categoryId)
    setActiveCategory(categoryId)
    setActiveSkillId(skills[0]?.id ?? null)
  }, [])

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
        <div className="skills-showcase">
          <ScrollRevealItem tier="head" className="skills-intro">
            <p
              id="skills"
              className="section-scroll-anchor text-sm font-semibold uppercase tracking-[0.3em] text-sky-400"
            >
              Skills
            </p>

            <h2 className="skills-title section-heading mt-3 text-3xl font-bold text-white md:text-4xl">
              Il mio arsenale tecnologico
            </h2>

            <p className="skills-copy section-lead mt-5">
              Tecnologie, strumenti e competenze che utilizzo per trasformare idee
              in prodotti digitali.
            </p>

            <div
              className="skills-category-tabs skills-intro__tabs"
              role="tablist"
              aria-label="Categorie competenze"
            >
              {SKILL_CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  className="nav-btn skills-category-tab"
                  aria-selected={activeCategory === tab.id}
                  aria-pressed={activeCategory === tab.id}
                  onClick={() => selectCategory(tab.id)}
                >
                  <span
                    className={`nav-btn-inner nav-btn-inner--section skills-category-tab__inner${
                      activeCategory === tab.id ? ' nav-btn-inner--current' : ''
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem tier="content" className="skills-radar-wrap">
            <div ref={radarRef}>
              <TechRadar
                key={activeCategory}
                active={radarActive}
                skills={categorySkills}
                activeSkillId={activeSkill?.id}
                onSkillChange={setActiveSkillId}
              />
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem tier="body" className="skills-side">
            {activeSkill ? (
              <SkillDetailCard key={activeSkill.id} skill={activeSkill} />
            ) : null}
          </ScrollRevealItem>

          <ScrollRevealItem tier="content" className="skills-process">
            <div className="skills-panel-heading skills-panel-heading--process">
              <span className="skills-panel-heading__dot" aria-hidden="true" />
              <h3>Dal codice al prodotto</h3>
            </div>

            <div className="skills-process-track">
              <div className="skills-process-list" role="list">
                {PROCESS_STEPS.map((step, index) => {
                  const Icon = processIcons[step.icon]
                  const nextStep = PROCESS_STEPS[index + 1]

                  return (
                    <Fragment key={step.number}>
                      <article
                        role="listitem"
                        className="skills-process-card about-highlight-card"
                        style={{ '--skill-color': step.tone }}
                      >
                        <div className="about-highlight-card__inner skills-process-card__inner">
                          <div className="skills-process-card__content">
                            <span className="skills-process-card__icon" aria-hidden="true">
                              <Icon />
                            </span>
                            <strong>{step.label}</strong>
                            <p>{step.text}</p>
                          </div>
                        </div>
                      </article>

                      {nextStep ? (
                        <div className="skills-process-arrow-slot" aria-hidden="true">
                          <ProcessArrow
                            from={step.tone}
                            to={nextStep.tone}
                            index={index}
                            curveUp={index % 2 === 0}
                          />
                        </div>
                      ) : null}
                    </Fragment>
                  )
                })}
              </div>
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem tier="content" className="skills-stack">
            <div className="skills-panel-heading skills-panel-heading--process">
              <span className="skills-panel-heading__dot" aria-hidden="true" />
              <h3>Il mio stack quotidiano</h3>
            </div>

            {activeStackSkill ? (
              <div className="skills-stack-detail">
                <SkillDetailCard key={activeStackSkill.id} skill={activeStackSkill} />
              </div>
            ) : null}

            <div className="skills-stack-panel">
              {DAILY_STACK.map((tool) => (
                <button
                  key={tool.name}
                  type="button"
                  className={`skills-stack-item${
                    activeStackName === tool.name ? ' skills-stack-item--active' : ''
                  }`}
                  style={{ '--skill-color': tool.glow }}
                  aria-pressed={activeStackName === tool.name}
                  aria-label={tool.name}
                  onClick={() =>
                    setActiveStackName((current) =>
                      current === tool.name ? null : tool.name,
                    )
                  }
                >
                  <span className="skills-stack-item__icon" aria-hidden="true">
                    <SkillIcon skill={tool} />
                  </span>
                </button>
              ))}
            </div>
          </ScrollRevealItem>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default Skills
