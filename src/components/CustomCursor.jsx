import { useEffect } from 'react'
import { SMARTPHONE_MEDIA_QUERY } from '../constants/breakpoints'

const ARROW_PATH =
  'M4 2.5V18.5L8.2 14.3L10.8 20.8L13.2 19.6L10.6 13.1H16.2L4 2.5Z'

const CURSOR_SVG = `
  <svg class="custom-cursor__arrow" width="30" height="36" viewBox="0 0 22 28" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <path
      class="custom-cursor__glow"
      d="${ARROW_PATH}"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      class="custom-cursor__shape"
      d="${ARROW_PATH}"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
`

const supportsPointerRawUpdate = 'onpointerrawupdate' in window

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
    let renderedX = -100
    let renderedY = -100

    const renderCursor = () => {
      rafId = 0
      if (renderedX === pendingX && renderedY === pendingY) return

      renderedX = pendingX
      renderedY = pendingY
      cursor.style.transform = `translate3d(${renderedX}px, ${renderedY}px, 0)`
    }

    const scheduleRender = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(renderCursor)
    }

    const applyPointerPosition = (x, y) => {
      pendingX = x
      pendingY = y
      if (!isVisible) {
        isVisible = true
        cursor.style.visibility = 'visible'
      }
      scheduleRender()
    }

    const readPointerPosition = (event) => {
      if (typeof event.getCoalescedEvents === 'function') {
        const coalesced = event.getCoalescedEvents()
        if (coalesced.length > 0) {
          const last = coalesced[coalesced.length - 1]
          applyPointerPosition(last.clientX, last.clientY)
          return
        }
      }

      applyPointerPosition(event.clientX, event.clientY)
    }

    const hideCursor = () => {
      isVisible = false
      cursor.style.visibility = 'hidden'
    }

    const handlePointerMove = (event) => {
      readPointerPosition(event)
    }

    const handlePointerRawUpdate = (event) => {
      if (event.pointerType !== 'mouse') return
      applyPointerPosition(event.clientX, event.clientY)
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
    if (supportsPointerRawUpdate) {
      document.addEventListener('pointerrawupdate', handlePointerRawUpdate, { passive: true })
    }
    document.addEventListener('pointerout', handlePointerLeave, { passive: true })
    window.addEventListener('blur', handleWindowBlur)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      cursor.remove()
      document.documentElement.classList.remove('custom-cursor-active')
      document.removeEventListener('pointermove', handlePointerMove)
      if (supportsPointerRawUpdate) {
        document.removeEventListener('pointerrawupdate', handlePointerRawUpdate)
      }
      document.removeEventListener('pointerout', handlePointerLeave)
      window.removeEventListener('blur', handleWindowBlur)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null
}

export default CustomCursor
