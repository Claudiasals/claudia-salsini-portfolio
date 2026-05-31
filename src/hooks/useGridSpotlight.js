import { useCallback, useRef } from 'react'

const updateSpotlightBlob = (pattern, x, y) => {
  const t = x * 0.012 + y * 0.009

  pattern.style.setProperty('--spot-x', `${x}px`)
  pattern.style.setProperty('--spot-y', `${y}px`)
  pattern.style.setProperty('--blob-1-x', `${x + Math.cos(t) * 72}px`)
  pattern.style.setProperty('--blob-1-y', `${y + Math.sin(t * 1.35) * 58}px`)
  pattern.style.setProperty('--blob-2-x', `${x + Math.cos(t * 1.85 + 2.1) * 62}px`)
  pattern.style.setProperty('--blob-2-y', `${y + Math.sin(t * 0.95 + 1.4) * 76}px`)
  pattern.style.setProperty('--blob-3-x', `${x + Math.cos(t * 2.35 + 4.2) * 48}px`)
  pattern.style.setProperty('--blob-3-y', `${y + Math.sin(t * 1.55 + 3.3) * 54}px`)
  pattern.style.setProperty('--spot-active', '1')
}

export const useGridSpotlight = (pauseSelector = null) => {
  const patternRef = useRef(null)
  const rafRef = useRef(null)
  const pendingRef = useRef(null)

  const onMouseMove = useCallback((event) => {
    const pattern = patternRef.current
    if (!pattern) return

    pendingRef.current = {
      paused: Boolean(pauseSelector && event.target.closest(pauseSelector)),
      x: event.clientX,
      y: event.clientY,
    }

    if (rafRef.current !== null) return

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null

      const pending = pendingRef.current
      const activePattern = patternRef.current
      if (!pending || !activePattern) return

      if (pending.paused) {
        activePattern.style.setProperty('--spot-active', '0')
        return
      }

      const rect = activePattern.getBoundingClientRect()
      updateSpotlightBlob(
        activePattern,
        pending.x - rect.left,
        pending.y - rect.top,
      )
    })
  }, [pauseSelector])

  const onMouseLeave = useCallback(() => {
    pendingRef.current = null

    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    patternRef.current?.style.setProperty('--spot-active', '0')
  }, [])

  return { patternRef, onMouseMove, onMouseLeave }
}
