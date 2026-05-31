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

/** Distanza tra campioni lungo la curva (più basso = angoli più morbidi). */
const SAMPLE_STEP = 8

const catmullRom = (p0, p1, p2, p3, t) => {
  const t2 = t * t
  const t3 = t2 * t

  const x =
    0.5 *
    (2 * p1[0] +
      (-p0[0] + p2[0]) * t +
      (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
      (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3)

  const y =
    0.5 *
    (2 * p1[1] +
      (-p0[1] + p2[1]) * t +
      (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
      (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)

  return [x, y]
}

/** Curva Catmull-Rom campionata: evita che la luce “tagli” gli angoli. */
const buildSmoothPath = (controlPoints) => {
  const n = controlPoints.length
  if (n < 2) return [...controlPoints]

  const samples = []

  for (let i = 0; i < n - 1; i += 1) {
    const p0 = controlPoints[Math.max(0, i - 1)]
    const p1 = controlPoints[i]
    const p2 = controlPoints[i + 1]
    const p3 = controlPoints[Math.min(n - 1, i + 2)]
    const chord = dist(p1, p2)
    const steps = Math.max(3, Math.ceil(chord / SAMPLE_STEP))

    for (let s = 0; s < steps; s += 1) {
      if (i > 0 && s === 0) continue

      const point = catmullRom(p0, p1, p2, p3, s / steps)
      const prev = samples[samples.length - 1]

      if (!prev || dist(prev, point) > 0.35) {
        samples.push(point)
      }
    }
  }

  const end = controlPoints[n - 1]
  const last = samples[samples.length - 1]
  if (!last || dist(last, end) > 0.35) {
    samples.push(end)
  }

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

  const positionAt = (t) => {
    if (total <= 0 || points.length === 0) {
      return { x: 0, y: 0 }
    }

    if (t <= 0) return { x: points[0][0], y: points[0][1] }
    if (t >= 1) {
      const end = points[points.length - 1]
      return { x: end[0], y: end[1] }
    }

    const target = t * total
    let walked = 0

    for (let i = 0; i < segmentLengths.length; i += 1) {
      const segLen = segmentLengths[i]
      if (walked + segLen >= target) {
        const local = (target - walked) / segLen
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
    const pos = positionAt(clamped)
    const delta = Math.min(0.012, 2 / Math.max(total, 1))
    const ahead = positionAt(Math.min(1, clamped + delta))
    const behind = positionAt(Math.max(0, clamped - delta))

    let heading = Math.atan2(ahead.y - behind.y, ahead.x - behind.x)

    if (!Number.isFinite(heading)) {
      const next = positionAt(Math.min(1, clamped + 0.02))
      heading = Math.atan2(next.y - pos.y, next.x - pos.x)
    }

    return { x: pos.x, y: pos.y, heading }
  }

  return { points, total, sample }
}

const traceSamplers = HERO_CIRCUIT_TRACES.map((controlPoints) => {
  const smoothPoints = buildSmoothPath(controlPoints)
  return buildArcLengthSampler(smoothPoints)
})

export const sampleCircuitTrace = (traceIndex, t) => traceSamplers[traceIndex].sample(t)

export const getCircuitTraceLength = (traceIndex) => traceSamplers[traceIndex].total
