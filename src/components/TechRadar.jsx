import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TECH_RADAR_CATEGORIES, TECH_RADAR_NODES } from '../data/techRadarSkills'

const SPOKE_ICON_GAP = 1.6
const HUB_RADIUS = 8.2
const GRID_RING_RADII = [10, 17, 24]
const FIELD_RADIUS = 32

const polarToPercent = (radius, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  }
}

const nodesInCategory = (categoryId) =>
  TECH_RADAR_NODES.filter((node) => node.categoryId === categoryId)

const firstNodeInCategory = (categoryId) =>
  nodesInCategory(categoryId)[0]?.id ?? TECH_RADAR_NODES[0].id

const SkillIcon = ({ skill, className = '' }) => {
  if (skill.image) {
    return (
      <img
        src={skill.image}
        alt=""
        className={`tech-radar__node-icon-img ${className}`.trim()}
        draggable={false}
      />
    )
  }

  return <i className={`${skill.icon} tech-radar__node-icon ${className}`.trim()} aria-hidden="true" />
}

const JointDot = ({ x, y, size = 'ring', isHighlighted = false }) => (
  <g
    className={`tech-radar__joint-group tech-radar__joint-group--${size}${
      isHighlighted ? ' tech-radar__joint-group--highlighted' : ''
    }`}
    transform={`translate(${x} ${y})`}
  >
    <circle
      className="tech-radar__joint-halo"
      r={size === 'terminal' ? 0.52 : size === 'hub' ? 0.75 : 0.62}
    />
    <circle
      className="tech-radar__joint-core"
      r={size === 'terminal' ? 0.18 : size === 'hub' ? 0.28 : 0.22}
    />
  </g>
)

const spokeDots = (node) => {
  const spokeEndRadius = node.radius - SPOKE_ICON_GAP
  const midRadius = (HUB_RADIUS + spokeEndRadius) / 2
  const midRing = GRID_RING_RADII.filter((radius) => radius > HUB_RADIUS + 0.5).reduce(
    (best, radius) =>
      Math.abs(radius - midRadius) < Math.abs(best - midRadius) ? radius : best,
    GRID_RING_RADII[GRID_RING_RADII.length - 1],
  )

  return {
    hub: polarToPercent(HUB_RADIUS, node.angle),
    mid: polarToPercent(midRing, node.angle),
    terminal: polarToPercent(spokeEndRadius, node.angle),
  }
}

const TechRadar = ({ active = false }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('frontend')
  const [hoveredId, setHoveredId] = useState('frontend-react')
  const [focusedId, setFocusedId] = useState(null)
  const leaveTimerRef = useRef(null)

  const activeCategory = useMemo(
    () =>
      TECH_RADAR_CATEGORIES.find((category) => category.id === selectedCategoryId) ??
      TECH_RADAR_CATEGORIES[0],
    [selectedCategoryId],
  )

  const visibleNodes = useMemo(
    () => nodesInCategory(selectedCategoryId),
    [selectedCategoryId],
  )

  const activeNode = useMemo(() => {
    const id = focusedId ?? hoveredId ?? visibleNodes[0]?.id
    return visibleNodes.find((node) => node.id === id) ?? visibleNodes[0]
  }, [hoveredId, focusedId, visibleNodes])

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
  }, [])

  const selectCategory = useCallback(
    (categoryId) => {
      clearLeaveTimer()
      setSelectedCategoryId(categoryId)
      setHoveredId(firstNodeInCategory(categoryId))
      setFocusedId(null)
    },
    [clearLeaveTimer],
  )

  const handleNodeEnter = useCallback(
    (id) => {
      clearLeaveTimer()
      setHoveredId(id)
    },
    [clearLeaveTimer],
  )

  const handleNodeLeave = useCallback(() => {
    clearLeaveTimer()
    leaveTimerRef.current = window.setTimeout(() => {
      setHoveredId(firstNodeInCategory(selectedCategoryId))
    }, 160)
  }, [clearLeaveTimer, selectedCategoryId])

  useEffect(() => () => clearLeaveTimer(), [clearLeaveTimer])

  return (
    <div className={`tech-radar${active ? ' tech-radar--active' : ''}`}>
      <div
        className="tech-radar__tabs"
        role="tablist"
        aria-label="Filtra competenze per categoria"
      >
        {TECH_RADAR_CATEGORIES.map((category) => {
          const isSelected = category.id === selectedCategoryId
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`nav-btn tech-radar__tab${isSelected ? ' tech-radar__tab--active' : ''}`}
              onClick={() => selectCategory(category.id)}
            >
              <span className="nav-btn-inner px-5 text-xs font-semibold uppercase leading-none tracking-[0.2em] md:text-sm">
                {category.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="tech-radar__content">
        <div className="tech-radar__stage" aria-label="Radar delle competenze tecniche">
          <div key={selectedCategoryId} className="tech-radar__view">
            <svg
              className="tech-radar__svg tech-radar__svg--base"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <radialGradient id="tech-radar-field-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(56, 189, 248, 0.08)" />
                  <stop offset="100%" stopColor="rgba(2, 6, 23, 0)" />
                </radialGradient>
                <linearGradient id="tech-radar-accent-border" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(147, 51, 234, 0.55)" />
                  <stop offset="50%" stopColor="rgba(56, 189, 248, 0.48)" />
                  <stop offset="100%" stopColor="rgba(110, 231, 183, 0.42)" />
                </linearGradient>
              </defs>

              <circle
                className="tech-radar__field"
                cx="50"
                cy="50"
                r={FIELD_RADIUS}
                fill="url(#tech-radar-field-glow)"
              />

              {GRID_RING_RADII.map((radius) => (
                <circle
                  key={`grid-${radius}`}
                  className="tech-radar__ring"
                  cx="50"
                  cy="50"
                  r={radius}
                />
              ))}

              <circle className="tech-radar__hub-outer" cx="50" cy="50" r={HUB_RADIUS} />
            </svg>

            <div className="tech-radar__center" aria-hidden="true">
              <strong className="tech-radar__center-label section-heading">
                {activeCategory.label.toUpperCase()}
              </strong>
            </div>

            <ul className="tech-radar__nodes" role="list">
              {visibleNodes.map((node, index) => {
                const { x, y } = polarToPercent(node.radius, node.angle)
                const isHighlighted = activeNode?.id === node.id

                return (
                  <li
                    key={node.id}
                    className="tech-radar__node-wrap"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      '--tech-radar-delay': `${index * 32}ms`,
                      '--tech-radar-glow': node.glow,
                    }}
                  >
                    <button
                      type="button"
                      className={`tech-radar__node${isHighlighted ? ' tech-radar__node--active' : ''}`}
                      onMouseEnter={() => handleNodeEnter(node.id)}
                      onMouseLeave={handleNodeLeave}
                      onFocus={() => {
                        setFocusedId(node.id)
                        setHoveredId(node.id)
                      }}
                      onBlur={() => setFocusedId(null)}
                      aria-label={`${node.name}, ${node.category}`}
                    >
                      <span className="tech-radar__node-icon-wrap">
                        <SkillIcon skill={node} />
                      </span>
                      <span className="tech-radar__node-label">{node.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <svg
              className="tech-radar__svg tech-radar__svg--overlay"
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              {visibleNodes.map((node) => {
                const dots = spokeDots(node)
                const isHighlighted = activeNode?.id === node.id

                return (
                  <line
                    key={`spoke-${node.id}`}
                    className={`tech-radar__spoke${isHighlighted ? ' tech-radar__spoke--active' : ''}`}
                    x1={dots.hub.x}
                    y1={dots.hub.y}
                    x2={dots.terminal.x}
                    y2={dots.terminal.y}
                  />
                )
              })}

              <g className="tech-radar__joints">
                {visibleNodes.map((node) => {
                  const dots = spokeDots(node)
                  const isHighlighted = activeNode?.id === node.id

                  return (
                    <g key={`joints-${node.id}`}>
                      <JointDot
                        x={dots.hub.x}
                        y={dots.hub.y}
                        size="hub"
                        isHighlighted={isHighlighted}
                      />
                      <JointDot x={dots.mid.x} y={dots.mid.y} isHighlighted={isHighlighted} />
                      <JointDot
                        x={dots.terminal.x}
                        y={dots.terminal.y}
                        size="terminal"
                        isHighlighted={isHighlighted}
                      />
                    </g>
                  )
                })}
              </g>
            </svg>
          </div>
        </div>

        <aside
          className="tech-radar__detail tech-radar__detail--visible"
          style={{ '--tech-radar-glow': activeNode.glow }}
          aria-live="polite"
        >
          <p className="tech-radar__detail-kicker">{activeNode.category}</p>
          <div className="tech-radar__detail-title-row">
            <SkillIcon skill={activeNode} className="tech-radar__detail-icon" />
            <h3 className="tech-radar__detail-title">{activeNode.name}</h3>
          </div>
          <p className="tech-radar__detail-text">{activeNode.description}</p>

          <div className="tech-radar__detail-level" aria-hidden="true">
            <span>Livello:</span>
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </aside>
      </div>
    </div>
  )
}

export default TechRadar
