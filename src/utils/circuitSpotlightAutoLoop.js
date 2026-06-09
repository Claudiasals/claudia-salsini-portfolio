import {
  getCachedCircuitLayout,
  getCircuitLayoutSignature,
  invalidateCircuitLayoutCache,
  isCircuitLayoutReady,
  lockCircuitLayoutViewport,
  svgCircuitToLayerPx,
  unlockCircuitLayoutViewport,
} from './heroCircuitGeometry'
import {
  HERO_CIRCUIT_TRACE_PAIRS,
  getCircuitTraceLength,
  initHeroCircuitTraces,
  sampleCircuitTraceAtDistance,
} from './heroCircuitTraces'
import { isPerfLite } from './perfProfile'
import { initScrollInteraction, isScrolling, onScrollIdle } from './scrollInteraction'

const AUTO_CLASS = 'hero-bg__circuit-spotlight--auto'
const IDLE_CLASS = 'hero-bg__circuit-spotlight--idle'
const LITE_CLASS = 'hero-bg__circuit-spotlight--lite'
const VISIBILITY_ROOT_MARGIN = '100px 0px'
const TRACE_SWEEP_SEC = 4
/** Bordo traccia: fade minimo per evitare buchi lunghi senza luce. */
const PAIR_EDGE_FADE = 0.02
/** Luminosità minima: le due luci restano sempre percepibili. */
const MIN_SPOT_VISIBILITY = 0.82
const SMOOTH_MS = 48
const LAYOUT_STABLE_FRAMES = 1
const LAYOUT_SETTLE_MS = 0
/** Fade-in all’avvio disattivato: visibilità immediata al caricamento. */
const FADE_IN_MS = 0
/** Anticipo orologio al boot così la luce è già in movimento al primo frame. */
const BOOT_CLOCK_PREROLL_MS = 2200
const TRAIL_BACK_1_SVG = 20
const TRAIL_BACK_2_SVG = 42
const TRAIL_BACK_3_SVG = 64

const patterns = new Set()
const smoothByPattern = new WeakMap()
/** @type {Map<Element, IntersectionObserver>} */
const visibilityObservers = new Map()
const patternVisible = new WeakMap()
let pageVisibilityHooked = false
let scrollHooked = false
let rafId = null
/** Tempo in cui il loop è fermo (scroll / tab nascosta): evita salti alla ripresa. */
let clockPauseMs = 0
let clockPauseStartedAt = null
let animStartMs = null
let lastSmoothMs = null

const pairSweepVisibility = (progress) => {
  let visibility = 1
  if (progress < PAIR_EDGE_FADE) visibility = progress / PAIR_EDGE_FADE
  if (progress > 1 - PAIR_EDGE_FADE) visibility = (1 - progress) / PAIR_EDGE_FADE
  return Math.max(MIN_SPOT_VISIBILITY, visibility)
}

const getPairFrame = (elapsedSec) => {
  const pairCount = HERO_CIRCUIT_TRACE_PAIRS.length
  const cycleDuration = pairCount * TRACE_SWEEP_SEC
  const cycleT = cycleDuration > 0 ? elapsedSec % cycleDuration : 0
  const pairIndex = Math.floor(cycleT / TRACE_SWEEP_SEC) % pairCount
  const progress = (cycleT % TRACE_SWEEP_SEC) / TRACE_SWEEP_SEC

  return { pairIndex, progress }
}

const lerpPx = (from, to, alpha) => from + (to - from) * alpha

const lerpPoint = (from, to, alpha) => ({
  x: lerpPx(from.x, to.x, alpha),
  y: lerpPx(from.y, to.y, alpha),
})

const lerpChannel = (from, to, alpha) => ({
  lead: lerpPoint(from.lead, to.lead, alpha),
  back1: lerpPoint(from.back1, to.back1, alpha),
  back2: lerpPoint(from.back2, to.back2, alpha),
  back3: lerpPoint(from.back3, to.back3, alpha),
})
let booting = false
let cancelBoot = null
let resizeDebounceId = null
/** Boot già completato o in corso (evita doppio avvio Hero + Skills). */
let animationArmed = false

const emptyChannel = () => ({
  lead: { x: 0, y: 0 },
  back1: { x: 0, y: 0 },
  back2: { x: 0, y: 0 },
  back3: { x: 0, y: 0 },
})

const layerOnTraceDistance = (pattern, traceIndex, distance) => {
  const { x, y } = sampleCircuitTraceAtDistance(traceIndex, distance)
  return svgCircuitToLayerPx(x, y, pattern)
}

const setPx = (pattern, name, value) => {
  pattern.style.setProperty(name, `${value}px`)
}

const targetChannel = (pattern, traceIndex, progress) => {
  const length = getCircuitTraceLength(traceIndex)
  const leadDist = Math.max(0, Math.min(length, progress * length))

  return {
    lead: layerOnTraceDistance(pattern, traceIndex, leadDist),
    back1: layerOnTraceDistance(pattern, traceIndex, leadDist - TRAIL_BACK_1_SVG),
    back2: layerOnTraceDistance(pattern, traceIndex, leadDist - TRAIL_BACK_2_SVG),
    back3: layerOnTraceDistance(pattern, traceIndex, leadDist - TRAIL_BACK_3_SVG),
  }
}

const getSmoothState = (pattern) => {
  let state = smoothByPattern.get(pattern)
  if (!state) {
    state = {
      primaryPairIndex: -1,
      secondaryPairIndex: -1,
      spotActive: MIN_SPOT_VISIBILITY,
      a: emptyChannel(),
      b: emptyChannel(),
    }
    smoothByPattern.set(pattern, state)
  }
  return state
}

const activePairFrame = (frame) => {
  const primaryVis = pairSweepVisibility(frame.primary.progress)
  const secondaryVis = pairSweepVisibility(frame.secondary.progress)
  return secondaryVis > primaryVis + 0.03 ? frame.secondary : frame.primary
}

const channelTargetsForFrame = (pattern, frame) => {
  const active = activePairFrame(frame)
  const [traceA, traceB] = HERO_CIRCUIT_TRACE_PAIRS[active.pairIndex]

  return {
    active,
    targetA: targetChannel(pattern, traceA, active.progress),
    targetB: targetChannel(pattern, traceB, active.progress),
  }
}

/** Allinea subito maschera e stato al frame corrente (niente inseguimento da 0,0). */
const snapPatternToFrame = (pattern, frame, now = performance.now()) => {
  if (!isCircuitLayoutReady(pattern)) return

  getCachedCircuitLayout(pattern)

  const { active, targetA, targetB } = channelTargetsForFrame(pattern, frame)
  const primaryVis = pairSweepVisibility(frame.primary.progress)
  const secondaryVis = pairSweepVisibility(frame.secondary.progress)
  const spotActive = fadeInFactor(now) * Math.max(MIN_SPOT_VISIBILITY, primaryVis, secondaryVis)

  smoothByPattern.set(pattern, {
    primaryPairIndex: active.pairIndex,
    secondaryPairIndex: active.pairIndex,
    spotActive,
    a: targetA,
    b: targetB,
  })

  pattern.classList.add(AUTO_CLASS)
  pattern.style.setProperty('--spot-active', String(spotActive))
  applyChannelPositions(pattern, 'a', targetA)
  applyChannelPositions(pattern, 'b', targetB)
}

const applyChannelPositions = (pattern, channel, points, lite = false) => {
  const set = (name, x, y) => {
    setPx(pattern, `--${name}-x`, x)
    setPx(pattern, `--${name}-y`, y)
  }

  if (lite) {
    if (channel === 'b') {
      set('spot-b', points.lead.x, points.lead.y)
    } else {
      set('spot', points.lead.x, points.lead.y)
    }
    return
  }

  if (channel === 'b') {
    set('spot-b', points.lead.x, points.lead.y)
    set('blob-b-1', points.back1.x, points.back1.y)
    set('blob-b-2', points.back2.x, points.back2.y)
    set('blob-b-3', points.back3.x, points.back3.y)
    return
  }

  set('spot', points.lead.x, points.lead.y)
  set('blob-1', points.back1.x, points.back1.y)
  set('blob-2', points.back2.x, points.back2.y)
  set('blob-3', points.back3.x, points.back3.y)
}

const hidePattern = (pattern) => {
  pattern.style.setProperty('--spot-active', '0')
  pattern.style.setProperty('--spot-b-x', '-999px')
  pattern.style.setProperty('--spot-b-y', '-999px')
}

const renderPatternFrame = (pattern, frame, now, smoothAlpha) => {
  if (!isCircuitLayoutReady(pattern)) {
    hidePattern(pattern)
    return
  }

  const lite = isPerfLite()
  pattern.classList.toggle(LITE_CLASS, lite)
  getCachedCircuitLayout(pattern)

  const state = getSmoothState(pattern)
  const { active, targetA, targetB } = channelTargetsForFrame(pattern, frame)
  const primaryVis = pairSweepVisibility(frame.primary.progress)
  const secondaryVis = pairSweepVisibility(frame.secondary.progress)

  if (active.pairIndex !== state.primaryPairIndex) {
    state.primaryPairIndex = active.pairIndex
    state.secondaryPairIndex = active.pairIndex
    state.a = targetA
    state.b = targetB
  } else {
    state.a = lerpChannel(state.a, targetA, smoothAlpha)
    state.b = lerpChannel(state.b, targetB, smoothAlpha)
  }

  state.spotActive =
    fadeInFactor(now) * Math.max(MIN_SPOT_VISIBILITY, primaryVis, secondaryVis)

  pattern.classList.add(AUTO_CLASS)
  pattern.style.setProperty('--spot-active', String(Math.max(0, Math.min(1, state.spotActive))))
  applyChannelPositions(pattern, 'a', state.a, lite)
  applyChannelPositions(pattern, 'b', state.b, lite)
}

const fadeInFactor = (now) => {
  if (animStartMs === null) return 0
  if (FADE_IN_MS <= 0) return 1
  return Math.min(1, Math.max(0, (now - animStartMs) / FADE_IN_MS))
}

const clockOffsetMs = (now) => {
  let paused = clockPauseMs
  if (clockPauseStartedAt !== null) {
    paused += Math.max(0, now - clockPauseStartedAt)
  }
  return paused
}

const beginClockPause = () => {
  if (clockPauseStartedAt === null) {
    clockPauseStartedAt = performance.now()
  }
}

const endClockPause = () => {
  if (clockPauseStartedAt !== null) {
    clockPauseMs += Math.max(0, performance.now() - clockPauseStartedAt)
    clockPauseStartedAt = null
  }
}

const frameFromClock = (now) => {
  const motionElapsed = Math.max(0, now - animStartMs - clockOffsetMs(now)) / 1000

  return {
    primary: getPairFrame(motionElapsed),
    secondary: getPairFrame(motionElapsed + TRACE_SWEEP_SEC),
  }
}

const tick = (now) => {
  rafId = null

  if (patterns.size === 0) return

  if (animStartMs === null) return

  const deltaMs = lastSmoothMs === null ? 16 : Math.min(40, now - lastSmoothMs)
  lastSmoothMs = now
  const smoothAlpha = 1 - Math.exp(-deltaMs / SMOOTH_MS)

  const frame = frameFromClock(now)

  for (const pattern of patterns) {
    if (!isPatternVisible(pattern)) continue
    renderPatternFrame(pattern, frame, now, smoothAlpha)
  }

  if (shouldRunLoop()) {
    rafId = window.requestAnimationFrame(tick)
  } else {
    rafId = null
  }
}

const isPatternVisible = (pattern) => patternVisible.get(pattern) !== false

const hasVisiblePattern = () => {
  for (const pattern of patterns) {
    if (isPatternVisible(pattern)) return true
  }
  return false
}

const setPatternVisible = (pattern, visible) => {
  const wasVisible = isPatternVisible(pattern)
  patternVisible.set(pattern, visible)
  pattern.classList.toggle(IDLE_CLASS, !visible)

  if (visible && !wasVisible) {
    syncLoopRunning()
  } else if (!visible && wasVisible) {
    syncLoopRunning()
  }
}

const isElementInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  const margin = 100
  return rect.bottom > -margin && rect.top < window.innerHeight + margin
}

const attachPatternVisibilityObserver = (element) => {
  setPatternVisible(element, isElementInViewport(element))

  const observer = new IntersectionObserver(
    ([entry]) => {
      setPatternVisible(element, entry.isIntersecting)
    },
    { rootMargin: VISIBILITY_ROOT_MARGIN, threshold: 0 },
  )

  observer.observe(element)
  visibilityObservers.set(element, observer)
}

const detachPatternVisibilityObserver = (element) => {
  visibilityObservers.get(element)?.disconnect()
  visibilityObservers.delete(element)
  patternVisible.delete(element)
}

const ensurePageVisibilityHook = () => {
  if (pageVisibilityHooked) return
  pageVisibilityHooked = true

  document.addEventListener('visibilitychange', () => {
    syncLoopRunning()
  })
}

const ensureScrollHook = () => {
  if (scrollHooked) return
  scrollHooked = true
  initScrollInteraction()
  onScrollIdle(() => syncLoopRunning())
}

const shouldRunLoop = () => {
  if (patterns.size === 0) return false
  if (document.hidden) return false
  if (isScrolling()) return false
  if (animStartMs === null) return false
  return hasVisiblePattern()
}

const syncLoopRunning = () => {
  if (shouldRunLoop()) {
    startLoop()
  } else {
    stopLoop()
  }
}

const startLoop = () => {
  endClockPause()
  if (rafId !== null) return
  rafId = window.requestAnimationFrame(tick)
}

const stopLoop = () => {
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId)
    rafId = null
  }
  lastSmoothMs = null
  beginClockPause()
}

const waitForStableLayout = (element, onReady) => {
  let cancelled = false
  let raf = 0
  let lastSig = ''
  let stableFrames = 0

  const step = () => {
    if (cancelled) return

    if (!isCircuitLayoutReady(element)) {
      stableFrames = 0
      lastSig = ''
      raf = window.requestAnimationFrame(step)
      return
    }

    const sig = getCircuitLayoutSignature(element)

    if (sig === lastSig) {
      stableFrames += 1
      if (stableFrames >= LAYOUT_STABLE_FRAMES) {
        onReady()
        return
      }
    } else {
      stableFrames = 0
      lastSig = sig
    }

    raf = window.requestAnimationFrame(step)
  }

  const start = () => {
    if (LAYOUT_SETTLE_MS > 0) {
      window.setTimeout(() => {
        if (cancelled) return
        raf = window.requestAnimationFrame(step)
      }, LAYOUT_SETTLE_MS)
      return
    }

    raf = window.requestAnimationFrame(step)
  }

  start()

  return () => {
    cancelled = true
    window.cancelAnimationFrame(raf)
  }
}

const tryBoot = () => {
  if (booting || animationArmed || patterns.size === 0) return

  const first = patterns.values().next().value
  if (!first) return

  booting = true

  cancelBoot = waitForStableLayout(first, () => {
    booting = false
    cancelBoot = null
    animationArmed = true

    lockCircuitLayoutViewport()
    animStartMs = performance.now() - BOOT_CLOCK_PREROLL_MS
    lastSmoothMs = null

    const frame = frameFromClock(performance.now())
    for (const pattern of patterns) {
      if (!isPatternVisible(pattern)) continue
      snapPatternToFrame(pattern, frame, performance.now())
    }

    startLoop()
  })
}

export const registerCircuitAutoPattern = (element) => {
  if (!element) return () => {}

  initHeroCircuitTraces()
  ensurePageVisibilityHook()
  ensureScrollHook()
  patterns.add(element)
  element.classList.add(AUTO_CLASS)
  attachPatternVisibilityObserver(element)

  if (animStartMs !== null) {
    snapPatternToFrame(element, frameFromClock(performance.now()), performance.now())
  }

  tryBoot()

  return () => {
    patterns.delete(element)
    smoothByPattern.delete(element)
    detachPatternVisibilityObserver(element)
    element.classList.remove(AUTO_CLASS, IDLE_CLASS)
    hidePattern(element)

    if (patterns.size === 0) {
      stopLoop()
      booting = false
      cancelBoot?.()
      cancelBoot = null
      animStartMs = null
      animationArmed = false
      clockPauseMs = 0
      clockPauseStartedAt = null
      unlockCircuitLayoutViewport()
    } else {
      syncLoopRunning()
    }
  }
}

export const notifyCircuitViewportResize = () => {
  unlockCircuitLayoutViewport()

  if (resizeDebounceId !== null) {
    window.clearTimeout(resizeDebounceId)
  }

  resizeDebounceId = window.setTimeout(() => {
    resizeDebounceId = null
    for (const pattern of patterns) {
      invalidateCircuitLayoutCache(pattern)
      smoothByPattern.delete(pattern)
    }
    if (patterns.size > 0 && animStartMs !== null) {
      lockCircuitLayoutViewport()
    }
  }, 180)
}
