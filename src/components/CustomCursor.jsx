import { useEffect } from 'react'
import { SMARTPHONE_MEDIA_QUERY } from '../constants/breakpoints'

const ARROW_PATH =
  'M4 2.5V18.5L8.2 14.3L10.8 20.8L13.2 19.6L10.6 13.1H16.2L4 2.5Z'

const CURSOR_SVG = `
  <svg class="custom-cursor__arrow" width="30" height="36" viewBox="0 0 22 28" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <path
      class="custom-cursor__shape"
      d="${ARROW_PATH}"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
`

const CustomCursor = () => {
  useEffect(() => {
    const disableCursor =
      window.matchMedia(SMARTPHONE_MEDIA_QUERY).matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (disableCursor) {
      return undefined
    }

    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    cursor.setAttribute('aria-hidden', 'true')
    cursor.innerHTML = CURSOR_SVG
    document.body.appendChild(cursor)

    document.documentElement.classList.add('custom-cursor-active')

    let isVisible = false
    let rafId = 0
    let pendingX = -100
    let pendingY = -100
    let isRunning = true

    const hideCursor = () => {
      isVisible = false
      cursor.style.visibility = 'hidden'
    }

    const paintCursor = () => {
      if (!isRunning) return
      if (isVisible) {
        cursor.style.transform = `translate3d(${pendingX}px, ${pendingY}px, 0)`
      }
      rafId = window.requestAnimationFrame(paintCursor)
    }

    const handlePointerMove = (event) => {
      pendingX = event.clientX
      pendingY = event.clientY
      if (!isVisible) {
        isVisible = true
        cursor.style.visibility = 'visible'
      }
    }

    const handlePointerLeave = (event) => {
      if (event.relatedTarget !== null) return
      hideCursor()
    }

    const handleWindowBlur = () => {
      hideCursor()
    }

    const handleVisibilityChange = () => {
      if (document.hidden) hideCursor()
    }

    document.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerout', handlePointerLeave, { passive: true })
    window.addEventListener('blur', handleWindowBlur)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    rafId = window.requestAnimationFrame(paintCursor)

    return () => {
      isRunning = false
      if (rafId) window.cancelAnimationFrame(rafId)
      cursor.remove()
      document.documentElement.classList.remove('custom-cursor-active')
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerout', handlePointerLeave)
      window.removeEventListener('blur', handleWindowBlur)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null
}

export default CustomCursor
