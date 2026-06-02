import { useEffect, useRef } from 'react'
import {
  notifyCircuitViewportResize,
  registerCircuitAutoPattern,
} from '../utils/circuitSpotlightAutoLoop'
import { svgCircuitToLayerPx } from '../utils/heroCircuitGeometry'

const hideSecondarySpot = (pattern) => {
  pattern.style.setProperty('--spot-b-x', '-999px')
  pattern.style.setProperty('--spot-b-y', '-999px')
}

/** @param {{ boost?: boolean }} options */
export const applySpotlightBlob = (pattern, x, y, options = {}) => {
  const { boost = false } = options
  const blobScale = boost ? 1.28 : 1
  const angle = x * 0.012 + y * 0.009
  const along = (dist, phase = 0) => ({
    x: x + Math.cos(angle + phase) * dist,
    y: y + Math.sin(angle * 1.1 + phase) * dist * 0.85,
  })

  pattern.style.setProperty('--spot-x', `${x}px`)
  pattern.style.setProperty('--spot-y', `${y}px`)
  pattern.style.setProperty('--spot-active', '1')

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

/** Registra l’animazione automatica sui circuiti (Hero, Skills/Contact, …). */
const useHeroCircuitSpotlight = () => {
  const patternRef = useRef(null)

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

  return { patternRef }
}

export default useHeroCircuitSpotlight
