import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
import TechRadar, {
  ICON_RADIAL_OFFSET,
  polarToPercent,
  SkillIcon,
  SPOKE_HUB_COLOR,
} from './TechRadar'

const DEFAULT_CATEGORY = 'frontend'

const processIcons = {
  idea: LuLightbulb,
  code: FiCode,
  test: FiCheckSquare,
  deploy: RxRocket,
  evolution: FiTrendingUp,
}

const SkillDetailCard = ({ skill, layout = 'horizontal' }) => (
  <article
    className={`skills-detail-card skills-detail-card--${layout}`}
    style={{ '--skill-color': skill.glow }}
    aria-live="polite"
  >
    {layout === 'vertical' ? (
      <>
        <p className="skills-detail-card__category terminal-gradient-label">
          {SKILL_CATEGORIES[skill.category] ?? skill.category}
        </p>
        <span className="skills-detail-card__icon" aria-hidden="true">
          <SkillIcon skill={skill} />
        </span>
        <h3 className="skills-detail-card__name">{skill.name}</h3>
        <p className="skills-detail-card__desc">{skill.description}</p>
      </>
    ) : (
      <>
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
      </>
    )}
  </article>
)

const BRIDGE_ENTRY_RATIO = 0.26

/** Offset extra sul bordo destro del radar, per skill basse */
const SKILL_BRIDGE_EXTRA_DOWN = {
  React: 0.055,
  PHP: 0.05,
  Postman: 0.045,
  Figma: 0.045,
}

const getBridgeVerticalOffset = (skill, iconY, stageTop, stageSpan, stagePad) => {
  const stageMidY = stageTop + stagePad + stageSpan * 0.5
  const isUpperIcon = iconY < stageMidY
  const named = SKILL_BRIDGE_EXTRA_DOWN[skill.name] ?? 0

  if (isUpperIcon) {
    return {
      offset: Math.max(0.11, named) * stageSpan,
      fromAbove: true,
    }
  }

  return {
    offset: Math.max(0.048, named) * stageSpan,
    fromAbove: false,
  }
}

const getSkillIconY = (skill, radarEl, stageRect, toClusterY) => {
  const iconEl = radarEl.querySelector('.tech-radar__node--active .tech-radar__node-icon')

  if (iconEl) {
    const iconRect = iconEl.getBoundingClientRect()
    return toClusterY(iconRect.top + iconRect.height / 2)
  }

  const point = polarToPercent(skill.radius + ICON_RADIAL_OFFSET, skill.angle)
  return toClusterY(stageRect.top + (point.y / 100) * stageRect.height)
}

const buildRadarDetailLayout = (skill, radarEl, slotEl, cardEl) => {
  if (!skill || !radarEl || !slotEl || !cardEl) return null

  const clusterEl = radarEl.closest('.skills-radar-cluster')
  const stage = radarEl.querySelector('.tech-radar__stage')
  if (!clusterEl || !stage) return null

  const clusterRect = clusterEl.getBoundingClientRect()
  const stageRect = stage.getBoundingClientRect()
  const slotRect = slotEl.getBoundingClientRect()
  const cardHeight = cardEl.offsetHeight

  if (clusterRect.width < 1 || clusterRect.height < 1 || cardHeight < 1) {
    return null
  }

  const toClusterX = (value) => value - clusterRect.left
  const toClusterY = (value) => value - clusterRect.top

  const stageTop = toClusterY(stageRect.top)
  const stageBottom = toClusterY(stageRect.bottom)
  const slotTop = toClusterY(slotRect.top)
  const slotHeight = slotRect.height
  const stagePad = 10
  const stageSpan = stageBottom - stageTop - stagePad * 2

  let iconY = getSkillIconY(skill, radarEl, stageRect, toClusterY)
  iconY = Math.min(stageBottom - stagePad, Math.max(stageTop + stagePad, iconY))

  const { offset: bridgeExtra, fromAbove } = getBridgeVerticalOffset(
    skill,
    iconY,
    stageTop,
    stageSpan,
    stagePad,
  )
  const bridgeStartY = fromAbove
    ? Math.max(stageTop + stagePad, iconY - bridgeExtra)
    : Math.min(stageBottom - stagePad, iconY + bridgeExtra)

  let detailTop = iconY - slotTop - cardHeight * BRIDGE_ENTRY_RATIO
  detailTop = Math.min(slotHeight - cardHeight - 4, Math.max(4, detailTop))

  const endX = toClusterX(slotRect.left)
  const endY = iconY
  const radarRight = toClusterX(stageRect.right)
  const gap = endX - radarRight

  if (gap < 12) return null

  const startX = radarRight
  const startY = bridgeStartY
  const elbowX = Math.min(
    endX - 8,
    Math.max(radarRight + 5, radarRight + Math.max(8, gap * 0.14)),
  )

  if (elbowX <= startX + 2) return null

  const d = `M ${startX} ${startY} H ${elbowX} V ${endY} H ${endX}`

  return {
    detailTop,
    bridge: {
      width: clusterRect.width,
      height: clusterRect.height,
      d,
      start: { x: startX, y: startY },
    },
  }
}

const useRadarDetailLayout = (skill, radarRef, slotRef, cardRef) => {
  const [layout, setLayout] = useState(null)

  const updateLayout = useCallback(() => {
    const next = buildRadarDetailLayout(
      skill,
      radarRef.current,
      slotRef.current,
      cardRef.current,
    )
    setLayout(next)
  }, [skill, radarRef, slotRef, cardRef])

  useLayoutEffect(() => {
    updateLayout()
  }, [updateLayout])

  useEffect(() => {
    const clusterEl = radarRef.current?.closest('.skills-radar-cluster')
    if (!clusterEl) return undefined

    const observer = new ResizeObserver(updateLayout)
    observer.observe(clusterEl)

    if (slotRef.current) observer.observe(slotRef.current)
    if (cardRef.current) observer.observe(cardRef.current)

    window.addEventListener('resize', updateLayout)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateLayout)
    }
  }, [updateLayout, radarRef, slotRef, cardRef, skill])

  return layout
}

const RadarDetailBridge = ({ geometry }) => {
  if (!geometry) return null

  return (
    <div className="skills-radar-bridge-overlay" aria-hidden="true">
      <svg
        className="skills-radar-bridge"
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <path className="skills-radar-bridge__glow" d={geometry.d} />
        <path className="skills-radar-bridge__line" d={geometry.d} />
        <g
          className="tech-radar__joint tech-radar__joint--terminal tech-radar__joint--active"
          style={{ '--joint-color': SPOKE_HUB_COLOR }}
        >
          <circle
            className="skills-radar-bridge__joint-glow"
            cx={geometry.start.x}
            cy={geometry.start.y}
            r="3.25"
            fill={SPOKE_HUB_COLOR}
          />
          <circle
            className="skills-radar-bridge__joint-core"
            cx={geometry.start.x}
            cy={geometry.start.y}
            r="1.1"
            fill={SPOKE_HUB_COLOR}
          />
        </g>
      </svg>
    </div>
  )
}

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
  const radarDetailSlotRef = useRef(null)
  const radarCardRef = useRef(null)
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

  const radarDetailLayout = useRadarDetailLayout(
    activeSkill,
    radarRef,
    radarDetailSlotRef,
    radarCardRef,
  )

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

          <ScrollRevealItem tier="content" className="skills-radar-cluster">
            <div className="skills-radar-cluster__radar" ref={radarRef}>
              <TechRadar
                key={activeCategory}
                active={radarActive}
                skills={categorySkills}
                activeSkillId={activeSkill?.id}
                onSkillChange={setActiveSkillId}
              />
            </div>

            <div className="skills-radar-cluster__detail-slot" ref={radarDetailSlotRef}>
              <div
                className="skills-radar-cluster__detail"
                ref={radarCardRef}
                style={
                  radarDetailLayout?.detailTop != null
                    ? { top: `${radarDetailLayout.detailTop}px` }
                    : undefined
                }
              >
                {activeSkill ? (
                  <SkillDetailCard key={activeSkill.id} skill={activeSkill} layout="vertical" />
                ) : null}
              </div>
            </div>

            <RadarDetailBridge geometry={radarDetailLayout?.bridge} />
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
