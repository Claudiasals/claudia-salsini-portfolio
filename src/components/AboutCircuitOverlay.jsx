const CIRCUIT_ZONE = {
  minX: 58,
  maxX: 430,
  minY: 540,
  maxY: 1760,
}

const TRANSITION_Y = 820

const GRID_X = [95, 125, 155, 185, 215, 245, 276, 304, 332, 360, 388]
const GRID_Y = [
  700, 760, 820, 830, 895, 960, 1025, 1090, 1155, 1220, 1285, 1350, 1415, 1480, 1545, 1610,
  1680,
]

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/** Fascia alta: scintille che salgono verso il busto reale. */
const UPPER_SPARK_Y = [660, 695, 730, 765, 800]

const buildUpperTransitionRoutes = () => {
  const routes = []
  const endY = 560

  UPPER_SPARK_Y.forEach((startY, rowIndex) => {
    GRID_X.forEach((x, colIndex) => {
      if ((rowIndex + colIndex) % 3 !== 0) return

      const span = startY - endY
      if (span < 40) return

      const duration = 2.4 + (rowIndex % 4) * 0.28
      const delay = (colIndex * 0.19 + rowIndex * 0.37) % 2.8

      if (colIndex % 2 === 0) {
        routes.push({
          d: `M ${x} ${startY} L ${x} ${endY}`,
          duration,
          delay,
          accent: rowIndex % 2 === 0,
        })
        return
      }

      const centerX = 276
      const x2 = clamp(x + (centerX - x) * 0.18, CIRCUIT_ZONE.minX, CIRCUIT_ZONE.maxX)
      routes.push({
        d: `M ${x} ${startY} L ${x2} ${endY + 25}`,
        duration: duration + 0.4,
        delay,
        accent: false,
      })
    })
  })

  return routes
}

/** Tracciati verso l’alto (y decresce) → sfumatura nella metà reale dell’avatar. */
const TRANSITION_ROUTES = [
  { d: 'M 185 815 L 185 575', duration: 2.6, delay: 0.15, accent: true },
  { d: 'M 275 835 L 275 590', duration: 2.3, delay: 0.45, accent: true },
  { d: 'M 365 820 L 365 580', duration: 2.5, delay: 0.75, accent: true },
  { d: 'M 220 865 L 220 600', duration: 2.8, delay: 1.0, accent: true },
  { d: 'M 310 785 L 310 565', duration: 2.4, delay: 1.3, accent: true },
  { d: 'M 140 795 L 140 555', duration: 2.2, delay: 0.6, accent: false },
  { d: 'M 400 805 L 400 570', duration: 2.7, delay: 1.6, accent: false },
  { d: 'M 255 760 L 290 545', duration: 3.0, delay: 1.9, accent: false },
  { d: 'M 330 755 L 295 550', duration: 2.9, delay: 2.1, accent: false },
  { d: 'M 276 700 L 276 555', duration: 2.5, delay: 0.35, accent: true },
  { d: 'M 215 680 L 250 540', duration: 2.7, delay: 1.15, accent: false },
  { d: 'M 340 690 L 305 535', duration: 2.6, delay: 0.85, accent: false },
  ...buildUpperTransitionRoutes(),
]

const TRANSITION_NODES = [
  [148, 708, true],
  [276, 748, true],
  [392, 728, true],
  [248, 812, true],
  [304, 848, true],
  [176, 772, false],
  [360, 796, false],
  [276, 688, false],
  [276, 620, true],
  [215, 590, false],
  [340, 600, true],
  [195, 640, false],
  [355, 655, false],
]

const FADE_TOP_Y = 530
const FADE_FULL_Y = TRANSITION_Y

const getCircuitFade = (y) => clamp((y - FADE_TOP_Y) / (FADE_FULL_Y - FADE_TOP_Y), 0, 1)

const isUpperAccent = (y, rowIndex, colIndex) =>
  y < TRANSITION_Y && (rowIndex * 2 + colIndex * 3) % 5 === 0

const shouldPlaceSpark = (y, rowIndex, colIndex) => {
  if (y >= TRANSITION_Y) return true
  if (isUpperAccent(y, rowIndex, colIndex)) return true

  const hash = rowIndex * 7 + colIndex * 5
  if (y < 740) return hash % 5 === 0
  if (y < TRANSITION_Y) return hash % 4 === 0
  return true
}

const getDigitalSparkMetrics = (y, accent = false) => {
  const fade = getCircuitFade(y)

  if (accent) {
    const boost = Math.max(fade, 0.5)

    return {
      sparkR: 2.9 + boost * 0.7,
      coreR: 1.5 + boost * 0.35,
      opacity: 0.62 + boost * 0.26,
      glow: boost < 0.65 ? 'medium' : 'full',
    }
  }

  return {
    sparkR: 1.35 + fade * 2.25,
    coreR: 0.65 + fade * 1.2,
    opacity: 0.22 + fade * 0.66,
    glow: fade < 0.45 ? 'soft' : 'full',
  }
}

const getTransitionSparkMetrics = (accent = false, endY = TRANSITION_Y) => {
  const fade = 1 - getCircuitFade(endY)
  /** Più in alto nella foto reale → scintille più piccole e leggere. */
  const sizeScale = 0.42 + fade * 0.58

  if (accent) {
    return {
      sparkR: (1.85 + fade * 0.55) * sizeScale,
      coreR: (0.85 + fade * 0.3) * sizeScale,
      opacity: 0.32 + fade * 0.48,
      glow: fade < 0.5 ? 'soft' : fade < 0.75 ? 'medium' : 'full',
    }
  }

  return {
    sparkR: (1.15 + fade * 0.65) * sizeScale,
    coreR: (0.5 + fade * 0.32) * sizeScale,
    opacity: 0.14 + fade * 0.4,
    glow: fade < 0.42 ? 'soft' : 'medium',
  }
}

const getDigitalNodeMetrics = (y, accent = false) => {
  const fade = getCircuitFade(y)

  if (accent) {
    const boost = Math.max(fade, 0.5)

    return {
      r: 2.15 + boost * 0.55,
      glow: boost < 0.65 ? 'medium' : 'full',
    }
  }

  return {
    r: 1.05 + fade * 1.35,
    glow: fade < 0.45 ? 'soft' : 'full',
  }
}

const getTransitionNodeMetrics = (accent = false, y = TRANSITION_Y) => {
  const fade = 1 - getCircuitFade(y)
  const scale = 0.45 + fade * 0.55

  return {
    r: (accent ? 2.2 : 1.35) * scale,
    glow: fade < 0.5 ? 'soft' : accent ? 'full' : 'medium',
  }
}

const parseRouteEndY = (pathD) => {
  const match = pathD.match(/[\d.]+\s+([\d.]+)\s*$/u)
  return match ? Number(match[1]) : TRANSITION_Y
}

const buildDigitalSparkRoutes = () => {
  const routes = []
  const centerX = (GRID_X[0] + GRID_X[GRID_X.length - 1]) / 2

  GRID_Y.forEach((y, rowIndex) => {
    if (y < TRANSITION_Y) return

    const nearRealHalf = y < TRANSITION_Y + 220

    GRID_X.forEach((x, colIndex) => {
      if (!shouldPlaceSpark(y, rowIndex, colIndex)) return

      const pattern = nearRealHalf ? (rowIndex + colIndex) % 3 : (rowIndex + colIndex) % 4
      const span = 34 + ((rowIndex * 3 + colIndex * 2) % 5) * 11
      const duration = 2.1 + ((rowIndex + colIndex) % 6) * 0.32
      const delay = ((rowIndex * 0.31 + colIndex * 0.23) % 3.4) + pattern * 0.08

      if (pattern === 0) {
        const y2 = clamp(y - span, CIRCUIT_ZONE.minY, CIRCUIT_ZONE.maxY)
        if (y - y2 >= 28) routes.push({ d: `M ${x} ${y} L ${x} ${y2}`, duration, delay, y, accent: false })
        return
      }

      if (pattern === 1) {
        const y2 = clamp(y - span * 0.72, CIRCUIT_ZONE.minY, CIRCUIT_ZONE.maxY)
        const x2 = clamp(x + (centerX - x) * 0.22, CIRCUIT_ZONE.minX, CIRCUIT_ZONE.maxX)
        if (y - y2 >= 24 && Math.abs(x2 - x) >= 18) {
          routes.push({ d: `M ${x} ${y} L ${x2} ${y2}`, duration: duration + 0.35, delay, y, accent: false })
        }
        return
      }

      if (pattern === 2) {
        const y2 = clamp(y - span * 0.9, CIRCUIT_ZONE.minY, CIRCUIT_ZONE.maxY)
        if (y - y2 >= 28) routes.push({ d: `M ${x} ${y} L ${x} ${y2}`, duration, delay, y, accent: false })
        return
      }

      if (nearRealHalf) {
        const y2 = clamp(y - span * 0.55, CIRCUIT_ZONE.minY, TRANSITION_Y)
        const x2 = clamp(x + (centerX - x) * 0.15, CIRCUIT_ZONE.minX, CIRCUIT_ZONE.maxX)
        if (y - y2 >= 20) routes.push({ d: `M ${x} ${y} L ${x2} ${y2}`, duration, delay, y, accent: false })
        return
      }

      const y2 = clamp(y - span * 0.5, CIRCUIT_ZONE.minY, CIRCUIT_ZONE.maxY)
      const x2 = clamp(x + span * 0.35, CIRCUIT_ZONE.minX, CIRCUIT_ZONE.maxX)
      if (y - y2 >= 22) routes.push({ d: `M ${x} ${y} L ${x2} ${y2}`, duration: duration + 0.2, delay, y, accent: false })
    })
  })

  return routes
}

const buildDigitalSparkNodes = () => {
  const nodes = []

  GRID_Y.forEach((y, rowIndex) => {
    if (y < TRANSITION_Y) return

    GRID_X.forEach((x, colIndex) => {
      if ((rowIndex + colIndex) % 2 !== 0) return
      nodes.push([x, y, false])
    })
  })

  return nodes
}

const DIGITAL_ROUTES = buildDigitalSparkRoutes()
const DIGITAL_NODES = buildDigitalSparkNodes()

const SparkRoute = ({ route, metrics, routeKey }) => (
  <g key={routeKey}>
    <path d={route.d} className="about-circuit__guide" pathLength={100} />

    <circle
      r={metrics.sparkR}
      className={`about-circuit__spark about-circuit__spark--${metrics.glow}`}
      style={{ opacity: metrics.opacity }}
    >
      <animateMotion
        dur={`${route.duration}s`}
        begin={`${route.delay}s`}
        repeatCount="indefinite"
        path={route.d}
        calcMode="linear"
        rotate="auto"
      />
    </circle>

    <circle
      r={metrics.coreR}
      className={`about-circuit__spark-core about-circuit__spark-core--${metrics.glow}`}
      style={{ opacity: Math.min(1, metrics.opacity + 0.18) }}
    >
      <animateMotion
        dur={`${route.duration}s`}
        begin={`${route.delay}s`}
        repeatCount="indefinite"
        path={route.d}
        calcMode="linear"
        rotate="auto"
      />
    </circle>
  </g>
)

const SparkNode = ({ cx, cy, metrics, index, nodeKey }) => (
  <circle
    key={nodeKey}
    cx={cx}
    cy={cy}
    r={metrics.r}
    className={`about-circuit__node about-circuit__node--${metrics.glow}`}
    style={{ animationDelay: `${(index % 11) * 0.32}s` }}
  />
)

/** Coordinate overlay (552×1788) → foto attuale foto-ibrida-portfolio.png (1774×3548). */
const ABOUT_PHOTO_W = 1774
const ABOUT_PHOTO_H = 3548
const ABOUT_OVERLAY_W = 552
const ABOUT_OVERLAY_H = 1788

const AboutCircuitOverlay = () => {
  return (
    <svg
      className="about-visual__circuit-overlay"
      viewBox={`0 0 ${ABOUT_PHOTO_W} ${ABOUT_PHOTO_H}`}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <g
        transform={`scale(${ABOUT_PHOTO_W / ABOUT_OVERLAY_W} ${ABOUT_PHOTO_H / ABOUT_OVERLAY_H})`}
      >
        <defs>
          <clipPath id="about-circuit-bounds">
            <rect x="52" y="530" width="384" height="1242" />
          </clipPath>
        </defs>

      <g className="about-circuit__layer about-circuit__layer--transition" clipPath="url(#about-circuit-bounds)">
        {TRANSITION_ROUTES.map((route, index) => (
          <SparkRoute
            key={`transition-route-${index}`}
            routeKey={`transition-route-${index}`}
            route={route}
            metrics={getTransitionSparkMetrics(route.accent, parseRouteEndY(route.d))}
          />
        ))}

        {TRANSITION_NODES.map(([cx, cy, accent], index) => (
          <SparkNode
            key={`transition-node-${cx}-${cy}`}
            nodeKey={`transition-node-${cx}-${cy}`}
            cx={cx}
            cy={cy}
            metrics={getTransitionNodeMetrics(accent, cy)}
            index={index}
          />
        ))}
      </g>

      <g className="about-circuit__layer about-circuit__layer--digital" clipPath="url(#about-circuit-bounds)">
        {DIGITAL_ROUTES.map((route, index) => (
          <SparkRoute
            key={`digital-route-${index}`}
            routeKey={`digital-route-${index}`}
            route={route}
            metrics={getDigitalSparkMetrics(route.y, route.accent)}
          />
        ))}

        {DIGITAL_NODES.map(([cx, cy, accent], index) => (
          <SparkNode
            key={`digital-node-${cx}-${cy}`}
            nodeKey={`digital-node-${cx}-${cy}`}
            cx={cx}
            cy={cy}
            metrics={getDigitalNodeMetrics(cy, accent)}
            index={index}
          />
        ))}
      </g>
      </g>
    </svg>
  )
}

export default AboutCircuitOverlay
