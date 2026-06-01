import { useCallback, useEffect, useRef } from 'react'
import {
  notifyCircuitViewportResize,
  registerCircuitAutoPattern,
} from '../utils/circuitSpotlightAutoLoop'
import { svgCircuitToLayerPx } from '../utils/heroCircuitGeometry'
import { isPerfLite } from '../utils/perfProfile'

const hideSecondarySpot = (pattern) => {
  pattern.style.setProperty('--spot-b-x', '-999px')
  pattern.style.setProperty('--spot-b-y', '-999px')
}

const hidePointerSpot = (pointer) => {
  pointer.style.setProperty('--spot-x', '-999px')
  pointer.style.setProperty('--spot-y', '-999px')
  pointer.style.setProperty('--blob-1-x', '-999px')
  pointer.style.setProperty('--blob-1-y', '-999px')
  pointer.style.setProperty('--blob-2-x', '-999px')
  pointer.style.setProperty('--blob-2-y', '-999px')
  pointer.style.setProperty('--blob-3-x', '-999px')
  pointer.style.setProperty('--blob-3-y', '-999px')
  pointer.style.setProperty('--spot-active', '0')
  hideSecondarySpot(pointer)
}

/** @param {{ boost?: boolean; heading?: number }} options */
export const applySpotlightBlob = (pattern, x, y, options = {}) => {
  const lite = isPerfLite()
  const { boost = false, heading = null } = options
  const blobScale = boost ? 1.28 : 1
  const angle = heading ?? x * 0.012 + y * 0.009
  const along = (dist, phase = 0) => ({
    x: x + Math.cos(angle + phase) * dist,
    y: y + Math.sin(angle * 1.1 + phase) * dist * 0.85,
  })

  pattern.style.setProperty('--spot-x', `${x}px`)
  pattern.style.setProperty('--spot-y', `${y}px`)
  pattern.style.setProperty('--spot-active', '1')

  if (lite) {
    hideSecondarySpot(pattern)
    pattern.style.setProperty('--blob-1-x', '-999px')
    pattern.style.setProperty('--blob-1-y', '-999px')
    pattern.style.setProperty('--blob-2-x', '-999px')
    pattern.style.setProperty('--blob-2-y', '-999px')
    pattern.style.setProperty('--blob-3-x', '-999px')
    pattern.style.setProperty('--blob-3-y', '-999px')
    return
  }

  const tailA = along(72 * blobScale)
  const tailB = along(128 * blobScale, 0.35)
  const tailC = along(56 * blobScale, -0.4)

  pattern.style.setProperty('--blob-1-x', `${tailA.x}px`)
  pattern.style.setProperty('--blob-1-y', `${tailA.y}px`)
  pattern.style.setProperty('--blob-2-x', `${tailB.x}px`)
  pattern.style.setProperty('--blob-2-y', `${tailB.y}px`)
  pattern.style.setProperty('--blob-3-x', `${tailC.x}px`)
  pattern.style.setProperty('--blob-3-y', `${tailC.y}px`)
  hideSecondarySpot(pattern)
}

/**
 * @param {{ enableAuto?: boolean; enablePointer?: boolean }} [options]
 * Hero: auto + pointer. Altre zone: solo sfondo statico (niente secondo loop/maschere).
 */
const useHeroCircuitSpotlight = ({ enableAuto = true, enablePointer = true } = {}) => {
  const patternRef = useRef(null)
  const pointerRef = useRef(null)

  useEffect(() => {
    if (!enableAuto) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let bootRaf = 0
    let unregister = null

    const setup = () => {
      const pattern = patternRef.current
      if (!pattern) {
        bootRaf = window.requestAnimationFrame(setup)
        return
      }

      if (reducedMotion) {
        const { x, y } = svgCircuitToLayerPx(520, 260, pattern)
        applySpotlightBlob(pattern, x, y, { boost: true })
        return
      }

      unregister = registerCircuitAutoPattern(pattern)
    }

    setup()

    const onResize = () => {
      notifyCircuitViewportResize()
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(bootRaf)
      window.removeEventListener('resize', onResize)
      unregister?.()
    }
  }, [enableAuto])

  const onMouseMove = useCallback(
    (event) => {
      if (!enablePointer) return

      const pointer = pointerRef.current
      if (!pointer) return

      const rect = pointer.getBoundingClientRect()
      applySpotlightBlob(pointer, event.clientX - rect.left, event.clientY - rect.top)
    },
    [enablePointer],
  )

  const onMouseLeave = useCallback(() => {
    if (!enablePointer) return

    const pointer = pointerRef.current
    if (pointer) hidePointerSpot(pointer)
  }, [enablePointer])

  return { patternRef, pointerRef, onMouseMove, onMouseLeave }
}

export default useHeroCircuitSpotlight
