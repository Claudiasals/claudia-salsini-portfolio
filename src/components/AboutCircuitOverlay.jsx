const CIRCUIT_ZONE = {
  minX: 58,
  maxX: 430,
  minY: 640,
  maxY: 1760,
}

const TRANSITION_Y = 820

const GRID_X = [95, 125, 155, 185, 215, 245, 276, 304, 332, 360, 388]
const GRID_Y = [
  700, 760, 820, 830, 895, 960, 1025, 1090, 1155, 1220, 1285, 1350, 1415, 1480, 1545, 1610,
  1680,
]

const TRANSITION_ROUTES = [
  { d: 'M 118 708 L 208 708', duration: 2.4, delay: 0.2, accent: true },
  { d: 'M 348 722 L 418 722', duration: 2.1, delay: 0.9, accent: true },
  { d: 'M 228 792 L 322 792', duration: 2.6, delay: 0.5, accent: true },
  { d: 'M 198 852 L 352 852', duration: 2.8, delay: 1.1, accent: true },
  { d: 'M 142 748 L 142 808', duration: 2.3, delay: 1.5, accent: true },
  { d: 'M 392 768 L 392 828', duration: 2.5, delay: 0.7, accent: true },
  { d: 'M 168 678 L 238 678', duration: 3.1, delay: 1.8, accent: false },
  { d: 'M 300 668 L 370 668', duration: 2.9, delay: 2.2, accent: false },
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
]

const FADE_TOP_Y = 620
const FADE_FULL_Y = TRANSITION_Y

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

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

const getTransitionSparkMetrics = (accent = false) => {
  if (accent) {
    return {
      sparkR: 4,
      coreR: 2,
      opacity: 0.96,
      glow: 'full',
    }
  }

  return {
    sparkR: 2.6,
    coreR: 1.25,
    opacity: 0.62,
    glow: 'medium',
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

const getTransitionNodeMetrics = (accent = false) => ({
  r: accent ? 3.2 : 2,
  glow: accent ? 'full' : 'medium',
})

const buildDigitalSparkRoutes = () => {
  const routes = []

  GRID_Y.forEach((y, rowIndex) => {
    if (y < TRANSITION_Y) return

    GRID_X.forEach((x, colIndex) => {
      if (!shouldPlaceSpark(y, rowIndex, colIndex)) return

      const pattern = (rowIndex + colIndex) % 4
      const span = 34 + ((rowIndex * 3 + colIndex * 2) % 5) * 11
      const duration = 2.1 + ((rowIndex + colIndex) % 6) * 0.32
      const delay = ((rowIndex * 0.31 + colIndex * 0.23) % 3.4) + pattern * 0.08

      if (pattern === 0) {
        const x2 = clamp(x + span, CIRCUIT_ZONE.minX, CIRCUIT_ZONE.maxX)
        if (x2 - x >= 28) routes.push({ d: `M ${x} ${y} L ${x2} ${y}`, duration, delay, y, accent: false })
        return
      }

      if (pattern === 1) {
        const y2 = clamp(y + span, CIRCUIT_ZONE.minY, CIRCUIT_ZONE.maxY)
        if (y2 - y >= 28) routes.push({ d: `M ${x} ${y} L ${x} ${y2}`, duration, delay, y, accent: false })
        return
      }

      if (pattern === 2) {
        const x2 = clamp(x - span, CIRCUIT_ZONE.minX, CIRCUIT_ZONE.maxX)
        if (x - x2 >= 28) routes.push({ d: `M ${x} ${y} L ${x2} ${y}`, duration, delay, y, accent: false })
        return
      }

      const y2 = clamp(y + span * 0.72, CIRCUIT_ZONE.minY, CIRCUIT_ZONE.maxY)
      const x2 = clamp(
        colIndex >= GRID_X.length / 2 ? x - span * 0.75 : x + span * 0.75,
        CIRCUIT_ZONE.minX,
        CIRCUIT_ZONE.maxX,
      )

      if (y2 - y >= 24 && Math.abs(x2 - x) >= 24) {
        routes.push({ d: `M ${x} ${y} L ${x} ${y2} L ${x2} ${y2}`, duration: duration + 0.6, delay, y, accent: false })
      }
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

const AboutCircuitOverlay = () => {
  return (
    <svg
      className="about-visual__circuit-overlay"
      viewBox="0 0 552 1788"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="about-circuit-bounds">
          <rect x="52" y="620" width="384" height="1152" />
        </clipPath>
      </defs>

      <g className="about-circuit__layer about-circuit__layer--transition" clipPath="url(#about-circuit-bounds)">
        {TRANSITION_ROUTES.map((route, index) => (
          <SparkRoute
            key={`transition-route-${index}`}
            routeKey={`transition-route-${index}`}
            route={route}
            metrics={getTransitionSparkMetrics(route.accent)}
          />
        ))}

        {TRANSITION_NODES.map(([cx, cy, accent], index) => (
          <SparkNode
            key={`transition-node-${cx}-${cy}`}
            nodeKey={`transition-node-${cx}-${cy}`}
            cx={cx}
            cy={cy}
            metrics={getTransitionNodeMetrics(accent)}
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
    </svg>
  )
}

export default AboutCircuitOverlay
