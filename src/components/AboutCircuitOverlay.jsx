const LOWER_ZONE = {
  minX: 58,
  maxX: 430,
  minY: 800,
  maxY: 1760,
}

const GRID_X = [95, 125, 155, 185, 215, 245, 276, 304, 332, 360, 388]
const GRID_Y = [830, 895, 960, 1025, 1090, 1155, 1220, 1285, 1350, 1415, 1480, 1545, 1610, 1680]

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const buildLowerSparkRoutes = () => {
  const routes = []

  GRID_Y.forEach((y, rowIndex) => {
    GRID_X.forEach((x, colIndex) => {
      const pattern = (rowIndex + colIndex) % 4
      const span = 34 + ((rowIndex * 3 + colIndex * 2) % 5) * 11
      const duration = 2.1 + ((rowIndex + colIndex) % 6) * 0.32
      const delay = ((rowIndex * 0.31 + colIndex * 0.23) % 3.4) + pattern * 0.08

      if (pattern === 0) {
        const x2 = clamp(x + span, LOWER_ZONE.minX, LOWER_ZONE.maxX)
        if (x2 - x >= 28) routes.push({ d: `M ${x} ${y} L ${x2} ${y}`, duration, delay })
        return
      }

      if (pattern === 1) {
        const y2 = clamp(y + span, LOWER_ZONE.minY, LOWER_ZONE.maxY)
        if (y2 - y >= 28) routes.push({ d: `M ${x} ${y} L ${x} ${y2}`, duration, delay })
        return
      }

      if (pattern === 2) {
        const x2 = clamp(x - span, LOWER_ZONE.minX, LOWER_ZONE.maxX)
        if (x - x2 >= 28) routes.push({ d: `M ${x} ${y} L ${x2} ${y}`, duration, delay })
        return
      }

      const y2 = clamp(y + span * 0.72, LOWER_ZONE.minY, LOWER_ZONE.maxY)
      const x2 = clamp(
        colIndex >= GRID_X.length / 2 ? x - span * 0.75 : x + span * 0.75,
        LOWER_ZONE.minX,
        LOWER_ZONE.maxX,
      )

      if (y2 - y >= 24 && Math.abs(x2 - x) >= 24) {
        routes.push({ d: `M ${x} ${y} L ${x} ${y2} L ${x2} ${y2}`, duration: duration + 0.6, delay })
      }
    })
  })

  return routes
}

const buildLowerSparkNodes = () => {
  const nodes = []

  GRID_Y.forEach((y, rowIndex) => {
    GRID_X.forEach((x, colIndex) => {
      if ((rowIndex + colIndex) % 2 === 0) {
        nodes.push([x, y])
      }
    })
  })

  return nodes
}

const CIRCUIT_ROUTES = buildLowerSparkRoutes()
const CIRCUIT_NODES = buildLowerSparkNodes()

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
          <rect x="52" y="778" width="384" height="994" />
        </clipPath>
      </defs>

      <g className="about-circuit__layer" clipPath="url(#about-circuit-bounds)">
        {CIRCUIT_ROUTES.map((route, index) => (
          <g key={`route-${index}`}>
            <path d={route.d} className="about-circuit__guide" pathLength={100} />

            <circle r="3.6" className="about-circuit__spark">
              <animateMotion
                dur={`${route.duration}s`}
                begin={`${route.delay}s`}
                repeatCount="indefinite"
                path={route.d}
                calcMode="linear"
                rotate="auto"
              />
            </circle>

            <circle r="1.85" className="about-circuit__spark-core">
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
        ))}

        {CIRCUIT_NODES.map(([cx, cy], index) => (
          <circle
            key={`node-${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="2.4"
            className="about-circuit__node"
            style={{ animationDelay: `${(index % 11) * 0.32}s` }}
          />
        ))}
      </g>
    </svg>
  )
}

export default AboutCircuitOverlay
