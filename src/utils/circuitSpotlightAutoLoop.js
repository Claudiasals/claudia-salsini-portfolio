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
const TRACE_SWEEP_SEC = 11
const PAIR_COOLDOWN_SEC = 0.12
const LAYOUT_STABLE_FRAMES = 12
const LAYOUT_SETTLE_MS = 600
/** Attesa dopo layout stabile prima di far partire l’orologio (evita sweep “in corsa” al refresh). */
const CLOCK_START_FRAMES = 3
/** Fade-in luminosità all’avvio: l’orologio resta a progress 0 finché non è visibile. */
const FADE_IN_MS = 520
const TRAIL_BACK_1_SVG = 16
const TRAIL_BACK_2_SVG = 32
const TRAIL_BACK_3_SVG = 48

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
let lastFrameMs = null
let booting = false
let cancelBoot = null
let resizeDebounceId = null
/** Orologio non ancora partito: primi frame solo snap + fade, senza avanzare sul filo. */
let clockPending = false
let clockStartFramesLeft = 0
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
      pairIndex: -1,
      spotActive: 0,
      progressA: 0,
      progressB: 0,
      a: emptyChannel(),
      b: emptyChannel(),
    }
    smoothByPattern.set(pattern, state)
  }
  return state
}

/** Allinea subito maschera e stato al frame corrente (niente inseguimento da 0,0). */
const snapPatternToFrame = (pattern, frame) => {
  if (!isCircuitLayoutReady(pattern)) return

  getCachedCircuitLayout(pattern)

  const [traceA, traceB] = HERO_CIRCUIT_TRACE_PAIRS[frame.pairIndex]
  const progress = frame.inCooldown ? 1 : frame.progress
  const targetA = targetChannel(pattern, traceA, progress)
  const targetB = targetChannel(pattern, traceB, progress)

  smoothByPattern.set(pattern, {
    pairIndex: frame.pairIndex,
    spotActive: frame.inCooldown ? 0 : 0,
    progressA: progress,
    progressB: progress,
    a: targetA,
    b: targetB,
  })

  pattern.classList.add(AUTO_CLASS)
  pattern.style.setProperty('--spot-active', '0')
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

const renderPatternFrame = (pattern, frame, now) => {
  if (!isCircuitLayoutReady(pattern)) {
    hidePattern(pattern)
    return
  }

  const lite = isPerfLite()
  pattern.classList.toggle(LITE_CLASS, lite)
  getCachedCircuitLayout(pattern)

  const state = getSmoothState(pattern)
  const [traceA, traceB] = HERO_CIRCUIT_TRACE_PAIRS[frame.pairIndex]
  const progress = frame.inCooldown ? 1 : frame.progress

  if (frame.pairIndex !== state.pairIndex) {
    state.pairIndex = frame.pairIndex
  }

  state.progressA = progress
  state.progressB = progress
  state.a = targetChannel(pattern, traceA, progress)
  state.b = targetChannel(pattern, traceB, progress)
  state.spotActive = fadeInFactor(now)

  pattern.classList.add(AUTO_CLASS)
  pattern.style.setProperty('--spot-active', String(Math.max(0, Math.min(1, state.spotActive))))
  applyChannelPositions(pattern, 'a', state.a, lite)
  applyChannelPositions(pattern, 'b', state.b, lite)
}

const fadeInFactor = (now) => {
  if (animStartMs === null) return 0
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
  const motionElapsed = Math.max(0, now - animStartMs - FADE_IN_MS - clockOffsetMs(now)) / 1000
  const elapsed = motionElapsed
  const pairDuration = TRACE_SWEEP_SEC + PAIR_COOLDOWN_SEC
  const pairCount = HERO_CIRCUIT_TRACE_PAIRS.length
  const cycleIndex = Math.floor(elapsed / pairDuration)
  const within = elapsed - cycleIndex * pairDuration
  const pairIndex = cycleIndex % pairCount

  if (within >= TRACE_SWEEP_SEC) {
    return { pairIndex, progress: 1, inCooldown: true }
  }

  return {
    pairIndex,
    progress: within / TRACE_SWEEP_SEC,
    inCooldown: false,
  }
}

const tick = (now) => {
  rafId = null

  if (patterns.size === 0) {
    lastFrameMs = null
    return
  }

  if (clockPending) {
    if (clockStartFramesLeft > 0) {
      clockStartFramesLeft -= 1
      const holdFrame = { pairIndex: 0, progress: 0, inCooldown: false }
      for (const pattern of patterns) {
        snapPatternToFrame(pattern, holdFrame)
      }
      rafId = window.requestAnimationFrame(tick)
      return
    }

    clockPending = false
    animStartMs = now
    lastFrameMs = null
    const startFrame = frameFromClock(now)
    for (const pattern of patterns) {
      snapPatternToFrame(pattern, startFrame)
    }
  }

  if (animStartMs === null) {
    lastFrameMs = null
    return
  }

  lastFrameMs = now
  const frame = frameFromClock(now)

  for (const pattern of patterns) {
    if (!isPatternVisible(pattern)) continue
    renderPatternFrame(pattern, frame, now)
  }

  if (shouldRunLoop()) {
    rafId = window.requestAnimationFrame(tick)
  } else {
    rafId = null
    lastFrameMs = null
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
  if (clockPending) return true
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

const armClockStart = () => {
  clockPending = true
  clockStartFramesLeft = CLOCK_START_FRAMES
  animStartMs = null
  lastFrameMs = null
}

const stopLoop = () => {
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId)
    rafId = null
  }
  lastFrameMs = null
  beginClockPause()
}

const hideAllPatterns = () => {
  for (const pattern of patterns) {
    hidePattern(pattern)
    smoothByPattern.delete(pattern)
  }
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

  const start = async () => {
    if (document.fonts?.ready) {
      try {
        await document.fonts.ready
      } catch {
        /* ignore */
      }
    }

    if (cancelled) return

    window.setTimeout(() => {
      if (cancelled) return
      raf = window.requestAnimationFrame(step)
    }, LAYOUT_SETTLE_MS)
  }

  void start()

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
  hideAllPatterns()

  cancelBoot = waitForStableLayout(first, () => {
    booting = false
    cancelBoot = null
    animationArmed = true

    lockCircuitLayoutViewport()

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        armClockStart()
        startLoop()
      })
    })
  })
}

export const registerCircuitAutoPattern = (element) => {
  if (!element) return () => {}

  initHeroCircuitTraces()
  ensurePageVisibilityHook()
  ensureScrollHook()
  patterns.add(element)
  element.classList.add(AUTO_CLASS)
  hidePattern(element)
  attachPatternVisibilityObserver(element)

  if (clockPending) {
    const holdFrame = { pairIndex: 0, progress: 0, inCooldown: false }
    snapPatternToFrame(element, holdFrame)
  } else if (animStartMs !== null) {
    snapPatternToFrame(element, frameFromClock(performance.now()))
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
      clockPending = false
      clockStartFramesLeft = 0
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
