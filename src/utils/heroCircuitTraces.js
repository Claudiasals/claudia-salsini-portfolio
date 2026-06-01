/**
 * Le 6 linee principali del motivo (prima dei rametti d’angolo).
 * Ogni traccia è una polilinea in coordinate SVG (viewBox 960×540).
 */
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
    [200, 80],
    [200, 200],
    [260, 260],
    [260, 380],
  ],
  [
    [480, 60],
    [480, 180],
    [540, 240],
    [540, 420],
  ],
  [
    [720, 100],
    [720, 220],
    [660, 280],
    [660, 460],
  ],
]

/** Coppie di indici: due linee illuminate insieme. */
export const HERO_CIRCUIT_TRACE_PAIRS = [
  [0, 1],
  [2, 3],
  [4, 5],
]

const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1])

const normalize = (x, y) => {
  const len = Math.hypot(x, y)
  if (len < 1e-6) return [0, 0]
  return [x / len, y / len]
}

const SAMPLE_STEP = 3
/** Raggio fillet agli angoli (unità SVG, come nel motivo). */
const CORNER_FILLET_R = 16

const pushIfFar = (samples, point, minDist = 0.15) => {
  const prev = samples[samples.length - 1]
  if (!prev || dist(prev, point) > minDist) {
    samples.push(point)
  }
}

const sampleSegment = (samples, p1, p2) => {
  const chord = dist(p1, p2)
  const steps = Math.max(2, Math.ceil(chord / SAMPLE_STEP))

  for (let s = 1; s <= steps; s += 1) {
    const t = s / steps
    pushIfFar(samples, [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t])
  }
}

/**
 * Polilinea come nel SVG (segmenti retti) + piccolo arco agli angoli.
 * Evita il “gonfiore” Catmull-Rom che fa scattare la scia dopo gli angoli.
 */
const buildFilletPolyline = (vertices, filletR = CORNER_FILLET_R) => {
  const n = vertices.length
  if (n < 2) return [...vertices]

  const samples = []
  pushIfFar(samples, vertices[0])

  for (let i = 1; i < n - 1; i += 1) {
    const prev = vertices[i - 1]
    const corner = vertices[i]
    const next = vertices[i + 1]

    const inLen = dist(prev, corner)
    const outLen = dist(corner, next)
    if (inLen < 1e-4 || outLen < 1e-4) continue

    const [inX, inY] = normalize(corner[0] - prev[0], corner[1] - prev[1])
    const [outX, outY] = normalize(next[0] - corner[0], next[1] - corner[1])

    const dot = Math.max(-1, Math.min(1, inX * outX + inY * outY))
    const turn = Math.acos(dot)

    if (turn < 0.08) {
      sampleSegment(samples, samples[samples.length - 1], corner)
      continue
    }

    const trim = Math.min(
      filletR / Math.tan(turn / 2),
      inLen * 0.45,
      outLen * 0.45,
    )

    const pIn = [corner[0] - inX * trim, corner[1] - inY * trim]
    const pOut = [corner[0] + outX * trim, corner[1] + outY * trim]

    sampleSegment(samples, samples[samples.length - 1], pIn)

    const arcSteps = Math.max(4, Math.ceil((turn * filletR) / SAMPLE_STEP))
    for (let s = 1; s < arcSteps; s += 1) {
      const t = s / arcSteps
      const bx = pIn[0] * (1 - t) + corner[0] * t
      const by = pIn[1] * (1 - t) + corner[1] * t
      const qx = corner[0] * (1 - t) + pOut[0] * t
      const qy = corner[1] * (1 - t) + pOut[1] * t
      pushIfFar(samples, [
        bx * (1 - t) + qx * t,
        by * (1 - t) + qy * t,
      ])
    }

    pushIfFar(samples, pOut)
  }

  sampleSegment(samples, samples[samples.length - 1], vertices[n - 1])

  return samples
}

const buildArcLengthSampler = (points) => {
  const segmentLengths = []
  let total = 0

  for (let i = 0; i < points.length - 1; i += 1) {
    const length = dist(points[i], points[i + 1])
    segmentLengths.push(length)
    total += length
  }

  const positionAt = (distance) => {
    if (total <= 0 || points.length === 0) {
      return { x: 0, y: 0 }
    }

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

  const sample = (t) => {
    const clamped = Math.max(0, Math.min(1, t))
    const pos = positionAt(clamped * total)
    const delta = Math.max(8, Math.min(28, total * 0.02))
    const ahead = positionAt(Math.min(total, clamped * total + delta))
    const behind = positionAt(Math.max(0, clamped * total - delta))

    let heading = Math.atan2(ahead.y - behind.y, ahead.x - behind.x)

    if (!Number.isFinite(heading)) {
      const next = positionAt(Math.min(total, clamped * total + total * 0.02))
      heading = Math.atan2(next.y - pos.y, next.x - pos.x)
    }

    return { x: pos.x, y: pos.y, heading }
  }

  return { points, total, sample, positionAtDistance: positionAt }
}

const traceSamplers = HERO_CIRCUIT_TRACES.map((controlPoints) => {
  const pathPoints = buildFilletPolyline(controlPoints)
  return buildArcLengthSampler(pathPoints)
})

export const sampleCircuitTrace = (traceIndex, t) => traceSamplers[traceIndex].sample(t)

export const getCircuitTraceLength = (traceIndex) => traceSamplers[traceIndex].total

/** Distanza lungo il filo in unità SVG (per scia coerente con la geometria). */
export const sampleCircuitTraceAtDistance = (traceIndex, distance) => {
  const sampler = traceSamplers[traceIndex]
  const pos = sampler.positionAtDistance(Math.max(0, Math.min(sampler.total, distance)))
  return { x: pos.x, y: pos.y, heading: 0 }
}
