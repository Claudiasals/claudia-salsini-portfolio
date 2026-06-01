import { useCallback, useEffect, useRef } from 'react'
import {
  notifyCircuitViewportResize,
  registerCircuitAutoPattern,
} from '../utils/circuitSpotlightAutoLoop'
import { svgCircuitToLayerPx } from '../utils/heroCircuitGeometry'

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

const useHeroCircuitSpotlight = () => {
  const patternRef = useRef(null)
  const pointerRef = useRef(null)
  const moveRafRef = useRef(null)

  useEffect(() => {
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
  }, [])

  const onMouseMove = useCallback((event) => {
    const pointer = pointerRef.current
    if (!pointer) return

    const clientX = event.clientX
    const clientY = event.clientY

    if (moveRafRef.current !== null) return

    moveRafRef.current = window.requestAnimationFrame(() => {
      moveRafRef.current = null

      const activePointer = pointerRef.current
      if (!activePointer) return

      const rect = activePointer.getBoundingClientRect()
      applySpotlightBlob(activePointer, clientX - rect.left, clientY - rect.top)
    })
  }, [])

  const onMouseLeave = useCallback(() => {
    if (moveRafRef.current !== null) {
      window.cancelAnimationFrame(moveRafRef.current)
      moveRafRef.current = null
    }

    const pointer = pointerRef.current
    if (pointer) hidePointerSpot(pointer)
  }, [])

  return { patternRef, pointerRef, onMouseMove, onMouseLeave }
}

export default useHeroCircuitSpotlight
