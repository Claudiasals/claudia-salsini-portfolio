/**
 * Tracciati principali di hero-circuit-motif.svg (path stroke, senza rametti d’angolo).
 * Campionamento via getPointAtLength = stesso percorso del filo visibile (angoli a chamfer, non fillet).
 */
export const HERO_CIRCUIT_PATH_D = [
  'M40 120 H280 L320 160 H520 L560 120 H880',
  'M80 260 H240 L300 320 H460 L520 260 H760 L820 300 H920',
  'M120 400 H360 L400 360 H640 L680 420 H900',
  'M0 0 H200 V200 L260 260 V380',
  'M480 0 V180 L540 240 V420',
  'M720 0 V220 L660 280 V460',
  'M0 0 H220 L260 40 H520 L560 0 H960',
]

/** Vertici equivalenti (fallback senza DOM). */
export const HERO_CIRCUIT_TRACES = [
  [
    [40, 120],
    [280, 120],
    [320, 160],
    [520, 160],
    [560, 120],
    [880, 120],
  ],
  [
    [80, 260],
    [240, 260],
    [300, 320],
    [460, 320],
    [520, 260],
    [760, 260],
    [820, 300],
    [920, 300],
  ],
  [
    [120, 400],
    [360, 400],
    [400, 360],
    [640, 360],
    [680, 420],
    [900, 420],
  ],
  [
    [0, 0],
    [200, 0],
    [200, 200],
    [260, 260],
    [260, 380],
  ],
  [
    [480, 0],
    [480, 180],
    [540, 240],
    [540, 420],
  ],
  [
    [720, 0],
    [720, 220],
    [660, 280],
    [660, 460],
  ],
  [
    [0, 0],
    [220, 0],
    [260, 40],
    [520, 40],
    [560, 0],
    [960, 0],
  ],
]

/** Coppie incrociate orizzontale/verticale: due luci su zone distanti del circuito. */
export const HERO_CIRCUIT_TRACE_PAIRS = [
  [0, 3],
  [1, 4],
  [2, 5],
  [6, 4],
]

const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1])

const sampleSegment = (samples, p1, p2, maxStep) => {
  const chord = dist(p1, p2)
  const steps = Math.max(2, Math.ceil(chord / maxStep))

  for (let s = 1; s <= steps; s += 1) {
    const t = s / steps
    samples.push([p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t])
  }
}

/** Polilinea esatta: passa per ogni vertice, nessun arrotondamento agli angoli. */
const buildExactPolyline = (vertices, maxStep = 1.5) => {
  if (vertices.length < 2) return [...vertices]

  const samples = [vertices[0]]
  for (let i = 0; i < vertices.length - 1; i += 1) {
    sampleSegment(samples, vertices[i], vertices[i + 1], maxStep)
  }
  return samples
}

const buildArcLengthSampler = (positionAtDistance, total) => {
  const sample = (t) => {
    const clamped = Math.max(0, Math.min(1, t))
    const pos = positionAtDistance(clamped * total)
    return { x: pos.x, y: pos.y, heading: 0 }
  }

  return { total, sample, positionAtDistance }
}

const buildPolylineSampler = (vertices) => {
  const points = buildExactPolyline(vertices)
  const segmentLengths = []
  let total = 0

  for (let i = 0; i < points.length - 1; i += 1) {
    const length = dist(points[i], points[i + 1])
    segmentLengths.push(length)
    total += length
  }

  const positionAtDistance = (distance) => {
    if (total <= 0 || points.length === 0) return { x: 0, y: 0 }
    if (distance <= 0) return { x: points[0][0], y: points[0][1] }

    if (distance >= total) {
      const end = points[points.length - 1]
      return { x: end[0], y: end[1] }
    }

    let walked = 0
    for (let i = 0; i < segmentLengths.length; i += 1) {
      const segLen = segmentLengths[i]
      if (walked + segLen >= distance) {
        const local = (distance - walked) / segLen
        const [x0, y0] = points[i]
        const [x1, y1] = points[i + 1]
        return {
          x: x0 + (x1 - x0) * local,
          y: y0 + (y1 - y0) * local,
        }
      }
      walked += segLen
    }

    const end = points[points.length - 1]
    return { x: end[0], y: end[1] }
  }

  return buildArcLengthSampler(positionAtDistance, total)
}

const buildNativePathSampler = (pathEl) => {
  const total = pathEl.getTotalLength()
  const positionAtDistance = (distance) => {
    const p = pathEl.getPointAtLength(Math.max(0, Math.min(total, distance)))
    return { x: p.x, y: p.y }
  }
  return buildArcLengthSampler(positionAtDistance, total)
}

let traceSamplers = null

export const initHeroCircuitTraces = () => {
  if (traceSamplers) return traceSamplers

  if (typeof document !== 'undefined') {
    traceSamplers = HERO_CIRCUIT_PATH_D.map((d) => {
      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      pathEl.setAttribute('d', d)
      return buildNativePathSampler(pathEl)
    })
    return traceSamplers
  }

  traceSamplers = HERO_CIRCUIT_TRACES.map((vertices) => buildPolylineSampler(vertices))
  return traceSamplers
}

const getSampler = (traceIndex) => initHeroCircuitTraces()[traceIndex]

export const getCircuitTraceLength = (traceIndex) => getSampler(traceIndex).total

export const sampleCircuitTraceAtDistance = (traceIndex, distance) => {
  const sampler = getSampler(traceIndex)
  return sampler.positionAtDistance(
    Math.max(0, Math.min(sampler.total, distance)),
  )
}
