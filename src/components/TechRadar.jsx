import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TECH_RADAR_NODES, TECH_RADAR_RINGS } from '../data/techRadarSkills'

const polarToPercent = (radius, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  }
}

const SkillIcon = ({ skill }) => {
  if (skill.image) {
    return (
      <img
        src={skill.image}
        alt=""
        className="tech-radar__node-icon-img"
        draggable={false}
      />
    )
  }

  return <i className={`${skill.icon} tech-radar__node-icon`} aria-hidden="true" />
}

const TechRadar = ({ active = false }) => {
  const [hoveredId, setHoveredId] = useState(null)
  const [focusedId, setFocusedId] = useState(null)
  const leaveTimerRef = useRef(null)

  const activeNode = useMemo(() => {
    const id = hoveredId ?? focusedId
    return TECH_RADAR_NODES.find((node) => node.id === id) ?? null
  }, [hoveredId, focusedId])

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
  }, [])

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
      setHoveredId(null)
    }, 140)
  }, [clearLeaveTimer])

  useEffect(() => () => clearLeaveTimer(), [clearLeaveTimer])

  return (
    <div className={`tech-radar${active ? ' tech-radar--active' : ''}`}>
      <div className="tech-radar__stage">
        <svg
          className="tech-radar__svg"
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <radialGradient id="tech-radar-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.1)" />
              <stop offset="45%" stopColor="rgba(147, 51, 234, 0.05)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
            </radialGradient>
            <filter id="tech-radar-soft-glow">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            className="tech-radar__glow-fill"
            cx="50"
            cy="50"
            r="49"
            fill="url(#tech-radar-glow)"
          />

          {TECH_RADAR_RINGS.map((ring) => (
            <circle
              key={ring.id}
              className="tech-radar__ring"
              cx="50"
              cy="50"
              r={ring.radius}
            />
          ))}

          {TECH_RADAR_NODES.map((node) => {
            const end = polarToPercent(node.radius, node.angle)
            const isHighlighted =
              hoveredId === node.id || focusedId === node.id

            return (
              <g key={`spoke-${node.id}`}>
                <line
                  className={`tech-radar__spoke${
                    isHighlighted ? ' tech-radar__spoke--active' : ''
                  }`}
                  x1="50"
                  y1="50"
                  x2={end.x}
                  y2={end.y}
                />
                {TECH_RADAR_RINGS.filter((ring) => ring.radius <= node.radius).map(
                  (ring) => {
                    const joint = polarToPercent(ring.radius, node.angle)
                    return (
                      <circle
                        key={`${node.id}-${ring.id}`}
                        className={`tech-radar__joint${
                          isHighlighted ? ' tech-radar__joint--active' : ''
                        }`}
                        cx={joint.x}
                        cy={joint.y}
                        r="0.42"
                      />
                    )
                  },
                )}
              </g>
            )
          })}
        </svg>

        <div className="tech-radar__center" aria-hidden="true">
          <div className="tech-radar__center-disc">
            <svg className="tech-radar__hex" viewBox="0 0 64 64" aria-hidden="true">
              <polygon
                points="32,6 54,18 54,46 32,58 10,46 10,18"
                className="tech-radar__hex-shape"
              />
              <polygon
                points="32,14 46,22 46,42 32,50 18,42 18,22"
                className="tech-radar__hex-inner"
              />
            </svg>
          </div>
          <p className="tech-radar__center-name">Claudia</p>
        </div>

        <ul className="tech-radar__nodes" role="list">
          {TECH_RADAR_NODES.map((node, index) => {
            const { x, y } = polarToPercent(node.radius, node.angle)
            const isHighlighted =
              hoveredId === node.id || focusedId === node.id

            return (
              <li
                key={node.id}
                className="tech-radar__node-wrap"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  '--tech-radar-delay': `${index * 40}ms`,
                  '--tech-radar-glow': node.glow,
                }}
              >
                <button
                  type="button"
                  className={`tech-radar__node${
                    isHighlighted ? ' tech-radar__node--active' : ''
                  }`}
                  onMouseEnter={() => handleNodeEnter(node.id)}
                  onMouseLeave={handleNodeLeave}
                  onFocus={() => setFocusedId(node.id)}
                  onBlur={() => setFocusedId(null)}
                  aria-label={`${node.name}, ${node.category}`}
                >
                  <span className="tech-radar__node-disc">
                    <SkillIcon skill={node} />
                  </span>
                  <span className="tech-radar__node-label">{node.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <aside
        className={`tech-radar__detail${activeNode ? ' tech-radar__detail--visible' : ''}`}
        style={activeNode ? { '--tech-radar-glow': activeNode.glow } : undefined}
        aria-live="polite"
        aria-hidden={!activeNode}
      >
        {activeNode ? (
          <>
            <h3 className="tech-radar__detail-title">{activeNode.name}</h3>
            <p className="tech-radar__detail-kicker">{activeNode.category}</p>
            <p className="tech-radar__detail-text">{activeNode.description}</p>
          </>
        ) : (
          <p className="tech-radar__detail-placeholder">
            Passa il cursore su una tecnologia per esplorare il mio ecosistema
            stack.
          </p>
        )}
      </aside>
    </div>
  )
}

export default TechRadar
