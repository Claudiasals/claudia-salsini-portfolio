import { useCallback, useEffect, useRef } from 'react'
import { invalidateCircuitLayoutCache, svgCircuitToLayerPx } from '../utils/heroCircuitGeometry'
import {
  HERO_CIRCUIT_TRACE_PAIRS,
  sampleCircuitTrace,
} from '../utils/heroCircuitTraces'

const AUTO_CLASS = 'hero-bg__circuit-spotlight--auto'
/** Secondi per attraversare un’intera linea (0 → 1), fluido e lento. */
const TRACE_SWEEP_SEC = 11
const PAIR_COOLDOWN_SEC = 0.55

const hideSecondarySpot = (pattern) => {
  pattern.style.setProperty('--spot-b-x', '-999px')
  pattern.style.setProperty('--spot-b-y', '-999px')
}

/** @param {{ boost?: boolean; heading?: number }} options */
export const applySpotlightBlob = (pattern, x, y, options = {}) => {
  const { boost = false, heading = null } = options
  const blobScale = boost ? 1.28 : 1
  const angle = heading ?? x * 0.012 + y * 0.009
  const along = (dist, phase = 0) => ({
    x: x + Math.cos(angle + phase) * dist,
    y: y + Math.sin(angle * 1.1 + phase) * dist * 0.85,
  })

  const tailA = along(72 * blobScale)
  const tailB = along(128 * blobScale, 0.35)
  const tailC = along(56 * blobScale, -0.4)

  pattern.style.setProperty('--spot-x', `${x}px`)
  pattern.style.setProperty('--spot-y', `${y}px`)
  pattern.style.setProperty('--blob-1-x', `${tailA.x}px`)
  pattern.style.setProperty('--blob-1-y', `${tailA.y}px`)
  pattern.style.setProperty('--blob-2-x', `${tailB.x}px`)
  pattern.style.setProperty('--blob-2-y', `${tailB.y}px`)
  pattern.style.setProperty('--blob-3-x', `${tailC.x}px`)
  pattern.style.setProperty('--blob-3-y', `${tailC.y}px`)
  pattern.style.setProperty('--spot-active', '1')
  hideSecondarySpot(pattern)
}

/** Campioni ravvicinati lungo il filo → maschere che si fondono senza buchi. */
const applyUniformTrail = (pattern, x, y, heading, channel = 'a') => {
  const c = Math.cos(heading)
  const s = Math.sin(heading)
  const isB = channel === 'b'

  const set = (name, px, py) => {
    pattern.style.setProperty(`--${name}-x`, `${px}px`)
    pattern.style.setProperty(`--${name}-y`, `${py}px`)
  }

  if (isB) {
    set('spot-b', x, y)
    set('blob-b-1', x + c * 36, y + s * 36)
    set('blob-b-2', x + c * 72, y + s * 72)
    set('blob-b-3', -999, -999)
    return
  }

  set('spot', x, y)
  set('blob-1', x + c * 36, y + s * 36)
  set('blob-2', x + c * 72, y + s * 72)
  set('blob-3', -999, -999)
}

const applyPrimaryTrail = (pattern, x, y, heading) => {
  applyUniformTrail(pattern, x, y, heading, 'a')
}

const applySecondaryTrail = (pattern, x, y, heading) => {
  applyUniformTrail(pattern, x, y, heading, 'b')
}

/** Due luci che scorrono su due tracciati (modalità automatica). */
export const applyDualTraceSpotlight = (pattern, traceA, traceB) => {
  applyPrimaryTrail(pattern, traceA.x, traceA.y, traceA.heading)
  applySecondaryTrail(pattern, traceB.x, traceB.y, traceB.heading)
  pattern.style.setProperty('--spot-active', '1')
}

const svgSampleToLayer = (pattern, traceIndex, t) => {
  const { x, y, heading } = sampleCircuitTrace(traceIndex, t)
  const layer = svgCircuitToLayerPx(x, y, pattern)
  return { ...layer, heading }
}

const useHeroCircuitSpotlight = () => {
  const patternRef = useRef(null)
  const manualRef = useRef(false)
  const autoRef = useRef({
    pairIndex: 0,
    progress: 0,
    cooldown: 0,
    rafId: null,
    lastTime: 0,
  })
  const moveRafRef = useRef(null)

  const setAutoMode = useCallback((active) => {
    const pattern = patternRef.current
    if (!pattern) return
    pattern.classList.toggle(AUTO_CLASS, active)
  }, [])

  const applySvgPoint = useCallback((svgX, svgY, options = {}) => {
    const pattern = patternRef.current
    if (!pattern) return

    const { x, y } = svgCircuitToLayerPx(svgX, svgY, pattern)
    applySpotlightBlob(pattern, x, y, options)
  }, [])

  const tickAuto = useCallback(
    (time) => {
      const state = autoRef.current
      state.rafId = null

      if (manualRef.current) return

      const pattern = patternRef.current
      if (!pattern) {
        state.rafId = window.requestAnimationFrame(tickAuto)
        return
      }

      if (!state.lastTime) state.lastTime = time
      const delta = Math.min((time - state.lastTime) / 1000, 0.05)
      state.lastTime = time

      if (state.cooldown > 0) {
        state.cooldown = Math.max(0, state.cooldown - delta)
        pattern.style.setProperty('--spot-active', '0')
        hideSecondarySpot(pattern)
        state.rafId = window.requestAnimationFrame(tickAuto)
        return
      }

      const pair = HERO_CIRCUIT_TRACE_PAIRS[state.pairIndex]
      const [traceA, traceB] = pair

      state.progress += delta / TRACE_SWEEP_SEC

      if (state.progress >= 1) {
        const endA = svgSampleToLayer(pattern, traceA, 1)
        const endB = svgSampleToLayer(pattern, traceB, 1)
        applyDualTraceSpotlight(pattern, endA, endB)
        state.progress = 0
        state.pairIndex = (state.pairIndex + 1) % HERO_CIRCUIT_TRACE_PAIRS.length
        state.cooldown = PAIR_COOLDOWN_SEC
        state.rafId = window.requestAnimationFrame(tickAuto)
        return
      }

      const t = state.progress
      const layerA = svgSampleToLayer(pattern, traceA, t)
      const layerB = svgSampleToLayer(pattern, traceB, t)
      applyDualTraceSpotlight(pattern, layerA, layerB)

      state.rafId = window.requestAnimationFrame(tickAuto)
    },
    [],
  )

  const startAuto = useCallback(() => {
    if (autoRef.current.rafId !== null) return
    setAutoMode(true)
    autoRef.current.lastTime = 0
    autoRef.current.progress = 0
    autoRef.current.cooldown = 0
    autoRef.current.rafId = window.requestAnimationFrame(tickAuto)
  }, [setAutoMode, tickAuto])

  const stopAuto = useCallback(() => {
    setAutoMode(false)
    if (autoRef.current.rafId !== null) {
      window.cancelAnimationFrame(autoRef.current.rafId)
      autoRef.current.rafId = null
    }
  }, [setAutoMode])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let bootRaf = 0

    const boot = () => {
      const pattern = patternRef.current
      if (!pattern) {
        bootRaf = window.requestAnimationFrame(boot)
        return
      }

      invalidateCircuitLayoutCache(pattern)

      if (reducedMotion) {
        applySvgPoint(520, 260, { boost: true })
        return
      }

      startAuto()
    }

    bootRaf = window.requestAnimationFrame(boot)

    const onResize = () => {
      if (patternRef.current) {
        invalidateCircuitLayoutCache(patternRef.current)
      }
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(bootRaf)
      window.removeEventListener('resize', onResize)
      stopAuto()
    }
  }, [applySvgPoint, startAuto, stopAuto])

  const onMouseMove = useCallback(
    (event) => {
      const pattern = patternRef.current
      if (!pattern) return

      manualRef.current = true
      stopAuto()

      const clientX = event.clientX
      const clientY = event.clientY

      if (moveRafRef.current !== null) return

      moveRafRef.current = window.requestAnimationFrame(() => {
        moveRafRef.current = null

        const activePattern = patternRef.current
        if (!activePattern || !manualRef.current) return

        const rect = activePattern.getBoundingClientRect()
        applySpotlightBlob(activePattern, clientX - rect.left, clientY - rect.top)
      })
    },
    [stopAuto],
  )

  const onMouseLeave = useCallback(() => {
    manualRef.current = false

    if (moveRafRef.current !== null) {
      window.cancelAnimationFrame(moveRafRef.current)
      moveRafRef.current = null
    }

    startAuto()
  }, [startAuto])

  return { patternRef, onMouseMove, onMouseLeave }
}

export default useHeroCircuitSpotlight
