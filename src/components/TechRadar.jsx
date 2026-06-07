const HUB_RADIUS = 12
const SPOKE_ICON_GAP = 7.5
const ICON_RADIAL_OFFSET = 3
const RING_RADII = [10, 16, 22, 28, 34, 40, 46]
const FIELD_RADIUS = 50

const polarToPercent = (radius, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  }
}

export const SkillIcon = ({ skill, className = '' }) => {
  if (skill.image) {
    return (
      <img
        src={skill.image}
        alt=""
        className={`skill-glyph__img ${className}`.trim()}
        draggable={false}
      />
    )
  }

  return <i className={`${skill.icon} skill-glyph__icon ${className}`.trim()} aria-hidden="true" />
}

const JointDot = ({ x, y, size = 'mid', isActive = false, glow = '#38bdf8' }) => (
  <g
    className={`tech-radar__joint tech-radar__joint--${size}${
      isActive ? ' tech-radar__joint--active' : ''
    }`}
    transform={`translate(${x} ${y})`}
    style={{ '--skill-color': glow }}
  >
    <circle className="tech-radar__joint-glow" r={size === 'terminal' ? 0.9 : 0.64} />
    <circle className="tech-radar__joint-core" r={size === 'terminal' ? 0.36 : 0.24} />
  </g>
)

const TechRadar = ({
  active = false,
  skills,
  activeSkillId,
  onSkillChange,
}) => {
  const activeId = activeSkillId ?? skills[0]?.id
  const isDense = skills.length >= 8
  const polygonPoints = skills
    .map((skill) => {
      const point = polarToPercent(skill.scoreRadius, skill.angle)
      return `${point.x},${point.y}`
    })
    .join(' ')

  return (
    <div
      className={`tech-radar${active ? ' tech-radar--active' : ''}${
        isDense ? ' tech-radar--dense' : ''
      }`}
    >
      <div className="tech-radar__stage" aria-label="Radar delle competenze tecniche">
        <svg
          className="tech-radar__svg tech-radar__svg--base"
          viewBox="0 0 100 100"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <radialGradient id="skill-radar-field" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(124, 58, 237, 0.2)" />
              <stop offset="36%" stopColor="rgba(14, 165, 233, 0.1)" />
              <stop offset="70%" stopColor="rgba(59, 130, 246, 0.04)" />
              <stop offset="100%" stopColor="rgba(2, 6, 23, 0)" />
            </radialGradient>
            <linearGradient id="skill-radar-polygon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.82)" />
              <stop offset="48%" stopColor="rgba(99, 102, 241, 0.62)" />
              <stop offset="100%" stopColor="rgba(34, 211, 238, 0.58)" />
            </linearGradient>
            <linearGradient id="skill-radar-hub" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.95)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.72)" />
            </linearGradient>
          </defs>

          <circle className="tech-radar__field" cx="50" cy="50" r={FIELD_RADIUS} fill="none" />

          {RING_RADII.map((radius) => (
            <circle key={radius} className="tech-radar__ring" cx="50" cy="50" r={radius} />
          ))}

          <circle className="tech-radar__ring tech-radar__ring--outer" cx="50" cy="50" r="48.2" />

          <polygon className="tech-radar__mesh-line" points={polygonPoints} />

          <path
            className="tech-radar__hub-hex"
            d="M50 38.6 L59.8 44.3 L59.8 55.7 L50 61.4 L40.2 55.7 L40.2 44.3 Z"
          />
        </svg>

        <div className="tech-radar__center" aria-hidden="true">
          <span className="tech-radar__center-code">&lt;/&gt;</span>
        </div>

        <ul className="tech-radar__nodes" role="list">
          {skills.map((skill, index) => {
            const point = polarToPercent(skill.radius + ICON_RADIAL_OFFSET, skill.angle)
            const isActive = activeId === skill.id

            return (
              <li
                key={skill.id}
                className="tech-radar__node-wrap"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  '--skill-color': skill.glow,
                  '--tech-radar-delay': `${index * 46}ms`,
                }}
              >
                <button
                  type="button"
                  className={`tech-radar__node${isActive ? ' tech-radar__node--active' : ''}`}
                  onClick={() => onSkillChange?.(skill.id)}
                  onMouseEnter={() => onSkillChange?.(skill.id)}
                  aria-pressed={isActive}
                  aria-label={skill.name}
                >
                  <span className="tech-radar__node-icon">
                    <SkillIcon skill={skill} />
                  </span>
                  <span className="tech-radar__node-label">{skill.name}</span>
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
          {skills.map((skill) => {
            const start = polarToPercent(HUB_RADIUS, skill.angle)
            const mid = polarToPercent((HUB_RADIUS + skill.scoreRadius) / 2, skill.angle)
            const score = polarToPercent(skill.scoreRadius, skill.angle)
            const end = polarToPercent(skill.radius - SPOKE_ICON_GAP, skill.angle)
            const isActive = activeId === skill.id

            return (
              <g key={skill.id} style={{ '--skill-color': skill.glow }}>
                <line
                  className={`tech-radar__spoke${isActive ? ' tech-radar__spoke--active' : ''}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                />
                <JointDot x={start.x} y={start.y} glow={skill.glow} isActive={isActive} />
                <JointDot x={mid.x} y={mid.y} glow={skill.glow} isActive={isActive} />
                <JointDot x={score.x} y={score.y} glow={skill.glow} isActive={isActive} />
                <JointDot
                  x={end.x}
                  y={end.y}
                  size="terminal"
                  glow={skill.glow}
                  isActive={isActive}
                />
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default TechRadar
