import { useLayoutEffect, useRef, useState } from 'react'
import { COMPACT_RADAR_MEDIA_QUERY } from '../constants/breakpoints'
import { SPOKE_LENGTH_ADJUST_PX_BY_NAME } from '../data/techRadarSkills.js'

export const SPOKE_ICON_GAP = 7.5
export const ICON_RADIAL_OFFSET = 3
export const COMPACT_RADAR_ICON_OUTWARD_PX = 10

/** Extra spostamento verso l'esterno in visualizzazione intermedia, per skill. */
const COMPACT_RADAR_SKILL_EXTRA_OUTWARD_PX = {
  TypeScript: 5,
}
export const SPOKE_HUB_COLOR = '#00d4ff'
export const SPOKE_MID_COLOR = '#38bdf8'
export { SPOKE_LENGTH_ADJUST_PX_BY_NAME }

const HUB_RADIUS = 12
export const RADAR_VIEWBOX_SPAN_PX = 552
/** Cerchi concentrici: niente raggio 10 (era dentro l’esagono centrale). */
const RING_COUNT = 6
const RING_FIRST_RADIUS = 16
const RING_FIRST_GAP = 6
/** Ogni gap cresce di 2 rispetto al precedente: 6 → 8 → 10 → 12 → 14 */
const RING_GAP_INCREMENT = 2
/** Boost crescente dal centro: +3px, +5px, +8px, poi 13, 21… */
const RING_GAP_BOOST_PX = [3, 5, 8, 13, 21]

const pxToViewBox = (px, stageWidthPx = RADAR_VIEWBOX_SPAN_PX) =>
  (px / stageWidthPx) * 100

export const polarToPercent = (radius, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  }
}

export const getSpokeLengthAdjustPx = (skill) =>
  skill.spokeLengthAdjustPx ??
  SPOKE_LENGTH_ADJUST_PX_BY_NAME[skill.name] ??
  0

const moveSpokeEndPx = (start, end, adjustPx, stageWidthPx) => {
  const dx = end.x - start.x
  const dy = end.y - start.y
  const spokeLengthVb = Math.hypot(dx, dy)
  if (spokeLengthVb === 0) return end

  const adjustVb = pxToViewBox(adjustPx, stageWidthPx)
  const nextLengthVb = spokeLengthVb + adjustVb
  if (nextLengthVb <= 0) return start

  const scale = nextLengthVb / spokeLengthVb
  return {
    x: start.x + dx * scale,
    y: start.y + dy * scale,
  }
}

export const getSpokeGeometry = (skill, stageWidthPx = RADAR_VIEWBOX_SPAN_PX) => {
  const start = polarToPercent(HUB_RADIUS, skill.angle)
  const scoreEnd = polarToPercent(skill.scoreRadius, skill.angle)
  const adjustPx = getSpokeLengthAdjustPx(skill)
  const score =
    adjustPx === 0 ? scoreEnd : moveSpokeEndPx(start, scoreEnd, adjustPx, stageWidthPx)

  return {
    start,
    score,
    mid: {
      x: (start.x + score.x) / 2,
      y: (start.y + score.y) / 2,
    },
    lengthAdjustPx: adjustPx,
  }
}

const getRingGapBoostViewBox = (gapIndex) => {
  const boostPx =
    RING_GAP_BOOST_PX[gapIndex] ?? RING_GAP_BOOST_PX[RING_GAP_BOOST_PX.length - 1]
  return pxToViewBox(boostPx)
}

const getRingGap = (gapIndex) =>
  RING_FIRST_GAP + RING_GAP_INCREMENT * gapIndex + getRingGapBoostViewBox(gapIndex)

/** Raggio 1° cerchio +2px, 2° +4px, 3° +6px… */
const getRingRadiusBoostPx = (index) => 2 * (index + 1)

const RING_RADII = Array.from({ length: RING_COUNT }, (_, index) => {
  let radius = RING_FIRST_RADIUS

  for (let gapIndex = 0; gapIndex < index; gapIndex += 1) {
    radius += getRingGap(gapIndex)
  }

  return radius + pxToViewBox(getRingRadiusBoostPx(index))
})

export const TECH_RADAR_OUTER_RING = RING_RADII[RING_RADII.length - 1]
const FIELD_RADIUS = 50

const buildClosedPolygonPath = (vertices) => {
  if (vertices.length < 3) return ''

  const [first, ...rest] = vertices
  return `M${first.x} ${first.y}${rest.map((point) => `L${point.x} ${point.y}`).join('')}Z`
}

const getNodeRadialOffsetPx = (skill, extraPx = 0) => {
  const offsetPx = (skill.nodeRadialOffsetPx ?? 0) + extraPx
  if (offsetPx === 0) return { x: 0, y: 0 }

  const rad = (skill.angle * Math.PI) / 180
  return {
    x: offsetPx * Math.cos(rad),
    y: offsetPx * Math.sin(rad),
  }
}

/** Offset lungo il raggio (positivo = verso l'esterno, lontano dal pallino terminale). */
const getRadialOffsetPx = (angleDeg, amountPx) => {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: amountPx * Math.cos(rad),
    y: amountPx * Math.sin(rad),
  }
}

const ACTIVE_EXPAND_BASE = { normal: 7, dense: 5 }

const SKILL_ACTIVE_TUNING = {
  'Node.js': { expand: 6 },
  Postman: { expand: 8 },
  Figma: { expand: 8 },
}

const getActiveNodeOffsets = (skill, isDense) => {
  const mode = isDense ? 'dense' : 'normal'
  const tuning = SKILL_ACTIVE_TUNING[skill.name] ?? {}
  const expandPx = ACTIVE_EXPAND_BASE[mode] + (tuning.expand ?? 0)

  return {
    expand: getRadialOffsetPx(skill.angle, expandPx),
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

const SPOKE_JOINT_HUB_HALO_R = 1.28
const SPOKE_JOINT_HUB_GLOW_R = 0.62
const SPOKE_JOINT_HUB_CORE_R = 0.2
const SPOKE_JOINT_MID_HALO_R = 0.98
const SPOKE_JOINT_GLOW_R = 0.58
const SPOKE_JOINT_CORE_R = 0.18
const SPOKE_JOINT_TERMINAL_HALO_R = 2.35
const SPOKE_JOINT_TERMINAL_GLOW_R = 1.45
const SPOKE_JOINT_TERMINAL_CORE_R = 0.52

const JOINT_DOT_CONFIG = {
  hub: {
    haloR: SPOKE_JOINT_HUB_HALO_R,
    glowR: SPOKE_JOINT_HUB_GLOW_R,
    coreR: SPOKE_JOINT_HUB_CORE_R,
    fill: SPOKE_HUB_COLOR,
    haloClass: 'tech-radar__spoke-joint-halo tech-radar__spoke-joint-halo--hub',
    glowClass: 'skills-radar-bridge__joint-glow tech-radar__spoke-joint-glow--hub',
    coreClass: 'skills-radar-bridge__joint-core tech-radar__spoke-joint-core--hub',
  },
  mid: {
    haloR: SPOKE_JOINT_MID_HALO_R,
    glowR: SPOKE_JOINT_GLOW_R,
    coreR: SPOKE_JOINT_CORE_R,
    fill: SPOKE_MID_COLOR,
    haloClass: 'tech-radar__spoke-joint-halo tech-radar__spoke-joint-halo--mid',
    glowClass: 'skills-radar-bridge__joint-glow tech-radar__spoke-joint-glow--mid',
    coreClass: 'skills-radar-bridge__joint-core tech-radar__spoke-joint-core--mid',
  },
  terminal: {
    haloR: SPOKE_JOINT_TERMINAL_HALO_R,
    glowR: SPOKE_JOINT_TERMINAL_GLOW_R,
    coreR: SPOKE_JOINT_TERMINAL_CORE_R,
    fill: SPOKE_HUB_COLOR,
    haloClass: 'tech-radar__spoke-joint-halo tech-radar__spoke-joint-halo--terminal',
    glowClass: 'skills-radar-bridge__joint-glow tech-radar__spoke-joint-glow--terminal',
    coreClass: 'skills-radar-bridge__joint-core tech-radar__spoke-joint-core--terminal',
  },
}

const JointDot = ({ x, y, size = 'mid', compact = false }) => {
  const config = JOINT_DOT_CONFIG[size] ?? JOINT_DOT_CONFIG.mid
  const fill = config.fill ?? SPOKE_HUB_COLOR
  const scale = size === 'terminal' && compact ? 0.62 : 1

  return (
    <g
      className={size === 'terminal' ? 'tech-radar__spoke-joint--terminal' : undefined}
      transform={`translate(${x} ${y})${scale !== 1 ? ` scale(${scale})` : ''}`}
    >
      <circle className={config.haloClass} r={config.haloR} fill={fill} />
      <circle className={config.glowClass} r={config.glowR} fill={fill} />
      <circle className={config.coreClass} r={config.coreR} fill={fill} />
    </g>
  )
}

const CENTER_FRAGMENT_LEFT = 'M 18.5 3.5 L 6.5 15 L 18.5 26.5'
const CENTER_FRAGMENT_SLASH = 'M 25.8 26.5 L 31.8 3.5'
const CENTER_FRAGMENT_RIGHT = 'M 39.5 3.5 L 51.5 15 L 39.5 26.5'

const TechRadar = ({
  active = false,
  skills,
  activeSkillId,
  onSkillChange,
}) => {
  const stageRef = useRef(null)
  const [stageWidthPx, setStageWidthPx] = useState(RADAR_VIEWBOX_SPAN_PX)
  const [compactIconOutwardPx, setCompactIconOutwardPx] = useState(0)
  const activeId = activeSkillId ?? skills[0]?.id
  const isDense = skills.length >= 8
  const hubPath = buildClosedPolygonPath(
    skills.map((skill) => polarToPercent(HUB_RADIUS, skill.angle)),
  )

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    const syncStageWidth = () => {
      const width = stage.getBoundingClientRect().width
      if (width > 0) setStageWidthPx(width)
    }

    syncStageWidth()
    const observer = new ResizeObserver(syncStageWidth)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const media = window.matchMedia(COMPACT_RADAR_MEDIA_QUERY)
    const syncOutwardOffset = () => {
      setCompactIconOutwardPx(media.matches ? COMPACT_RADAR_ICON_OUTWARD_PX : 0)
    }

    syncOutwardOffset()
    media.addEventListener('change', syncOutwardOffset)
    return () => media.removeEventListener('change', syncOutwardOffset)
  }, [])

  return (
    <div
      className={`tech-radar${active ? ' tech-radar--active' : ''}${
        isDense ? ' tech-radar--dense' : ''
      }`}
    >
      <div
        ref={stageRef}
        className="tech-radar__stage"
        aria-label="Radar delle competenze tecniche"
      >
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
            <linearGradient id="skill-radar-ring-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </linearGradient>
          </defs>

          <circle className="tech-radar__field" cx="50" cy="50" r={FIELD_RADIUS} fill="none" />

          {RING_RADII.map((radius, index) => {
            if (index === 2) return null

            let accentClass = ''
            if (index === 0) accentClass = ' tech-radar__ring--card-border'
            if (index === 1) accentClass = ' tech-radar__ring--card-border tech-radar__ring--card-border-mid'
            if (index === 3) accentClass = ' tech-radar__ring--faint'
            if (index === 4) accentClass = ' tech-radar__ring--faint tech-radar__ring--faint-mid'
            if (index === 5) accentClass = ' tech-radar__ring--faint tech-radar__ring--faint-soft'

            return (
              <circle
                key={radius}
                className={`tech-radar__ring${accentClass}`}
                cx="50"
                cy="50"
                r={radius}
              />
            )
          })}

          <path className="tech-radar__hub-polygon-glow" d={hubPath} />
          <path className="tech-radar__hub-polygon" d={hubPath} />
        </svg>

        <div className="tech-radar__center" aria-hidden="true">
          <svg
            className="tech-radar__center-glyph"
            viewBox="0 0 58 30"
            focusable="false"
          >
            <defs>
              <linearGradient
                id="tech-radar-center-glyph-accent"
                gradientUnits="userSpaceOnUse"
                x1="4"
                y1="2"
                x2="54"
                y2="28"
              >
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#6ee7b7" />
              </linearGradient>
            </defs>
            <path className="tech-radar__center-glyph-stroke" d={CENTER_FRAGMENT_LEFT} />
            <path className="tech-radar__center-glyph-stroke" d={CENTER_FRAGMENT_SLASH} />
            <path className="tech-radar__center-glyph-stroke" d={CENTER_FRAGMENT_RIGHT} />
          </svg>
        </div>

        <ul className="tech-radar__nodes" role="list">
          {skills.map((skill, index) => {
            const point = polarToPercent(skill.radius + ICON_RADIAL_OFFSET, skill.angle)
            const compactSkillExtraPx = compactIconOutwardPx
              ? (COMPACT_RADAR_SKILL_EXTRA_OUTWARD_PX[skill.name] ?? 0)
              : 0
            const radialOffset = getNodeRadialOffsetPx(
              skill,
              compactIconOutwardPx + compactSkillExtraPx,
            )
            const activeOffsets = getActiveNodeOffsets(skill, isDense)
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
                  '--node-radial-offset-x': `${radialOffset.x}px`,
                  '--node-radial-offset-y': `${radialOffset.y}px`,
                  '--node-expand-x': `${activeOffsets.expand.x}px`,
                  '--node-expand-y': `${activeOffsets.expand.y}px`,
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
            const { start, score, mid } = getSpokeGeometry(skill, stageWidthPx)
            const isActive = activeId === skill.id
            const spokePath = `M ${start.x} ${start.y} L ${score.x} ${score.y}`

            return (
              <g
                key={skill.id}
                className={`tech-radar__spoke-group${
                  isActive ? ' tech-radar__spoke-group--active' : ''
                }`}
              >
                <path className="skills-radar-bridge__glow tech-radar__spoke-glow" d={spokePath} />
                <path className="skills-radar-bridge__line tech-radar__spoke-line" d={spokePath} />
                <JointDot x={start.x} y={start.y} size="hub" />
                <JointDot x={mid.x} y={mid.y} />
                <JointDot x={score.x} y={score.y} size="terminal" />
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default TechRadar
