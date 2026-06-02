import { useEffect } from 'react'
import { isPerfLite } from '../utils/perfProfile'

const ARROW_PATH =
  'M4 2.5V18.5L8.2 14.3L10.8 20.8L13.2 19.6L10.6 13.1H16.2L4 2.5Z'

/** Alone solo fuori dal bordo (feComposite out), interno della freccia vuoto. */
const CURSOR_SVG = `
  <svg class="custom-cursor__arrow" width="30" height="36" viewBox="0 0 22 28" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="custom-cursor-outer-glow" x="-80%" y="-80%" width="260%" height="260%" color-interpolation-filters="sRGB">
        <feMorphology operator="dilate" radius="0.65" in="SourceAlpha" result="dilate" />
        <feGaussianBlur in="dilate" stdDeviation="2.4" result="blur" />
        <feComposite in="blur" in2="SourceGraphic" operator="out" result="outer" />
        <feFlood flood-color="#00f0ff" flood-opacity="1" result="glowColor" />
        <feComposite in="glowColor" in2="outer" operator="in" result="coloredGlow" />
        <feGaussianBlur in="coloredGlow" stdDeviation="2.8" result="softGlow" />
        <feMerge>
          <feMergeNode in="softGlow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#custom-cursor-outer-glow)">
      <path
        class="custom-cursor__shape"
        d="${ARROW_PATH}"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </g>
  </svg>
`

const CustomCursor = () => {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches || isPerfLite()) {
      return undefined
    }

    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    cursor.setAttribute('aria-hidden', 'true')
    cursor.innerHTML = CURSOR_SVG
    document.body.appendChild(cursor)

    document.documentElement.classList.add('custom-cursor-active')

    let isVisible = false

    const hideCursor = () => {
      isVisible = false
      cursor.style.visibility = 'hidden'
    }

    const handlePointerMove = (event) => {
      if (!isVisible) {
        isVisible = true
        cursor.style.visibility = 'visible'
      }
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
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

    return () => {
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
