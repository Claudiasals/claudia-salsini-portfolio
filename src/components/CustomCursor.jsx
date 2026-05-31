import { useEffect } from 'react'

const CLICKABLE_SELECTOR =
  'a, button, input, select, textarea, summary, label, [role="button"], [role="link"], [href], .nav-btn, .btn-primary, .btn-secondary, .contact-detail-icon, .contact-form-input-wrap, .projects-carousel-nav'

const ARROW_PATH =
  'M4 2.5V18.5L8.2 14.3L10.8 20.8L13.2 19.6L10.6 13.1H16.2L4 2.5Z'

const CURSOR_SVG = `
  <svg class="custom-cursor__arrow" width="30" height="36" viewBox="0 0 22 28" fill="none" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="custom-cursor-glow-mask" maskUnits="userSpaceOnUse" x="-10" y="-10" width="42" height="48">
        <rect x="-10" y="-10" width="42" height="48" fill="white" />
        <path d="${ARROW_PATH}" fill="black" />
      </mask>
      <filter id="custom-cursor-outer-glow" x="-200%" y="-200%" width="500%" height="500%" filterUnits="objectBoundingBox">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6.2" result="blur" />
        <feComposite in="blur" in2="SourceGraphic" operator="out" result="outerGlow" />
        <feGaussianBlur in="outerGlow" stdDeviation="2.2" result="softOuter" />
        <feMerge>
          <feMergeNode in="softOuter" />
        </feMerge>
      </filter>
    </defs>
    <g mask="url(#custom-cursor-glow-mask)">
      <path
        class="custom-cursor__glow"
        d="${ARROW_PATH}"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        filter="url(#custom-cursor-outer-glow)"
      ></path>
    </g>
    <path
      class="custom-cursor__shape"
      d="${ARROW_PATH}"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
`

const isClickableElement = (element) => {
  if (!element || element.closest('.custom-cursor')) {
    return false
  }

  return Boolean(element.closest(CLICKABLE_SELECTOR))
}

const CustomCursor = () => {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      return undefined
    }

    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor custom-cursor--default'
    cursor.setAttribute('aria-hidden', 'true')
    cursor.innerHTML = CURSOR_SVG
    document.body.appendChild(cursor)

    document.documentElement.classList.add('custom-cursor-active')

    let lastClickable = false
    let isVisible = false

    const setClickable = (isClickable) => {
      if (isClickable === lastClickable) return

      lastClickable = isClickable
      cursor.classList.toggle('custom-cursor--clickable', isClickable)
      cursor.classList.toggle('custom-cursor--default', !isClickable)
    }

    const hideCursor = () => {
      isVisible = false
      cursor.style.visibility = 'hidden'
    }

    const handlePointerMove = (event) => {
      isVisible = true
      cursor.style.visibility = 'visible'
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      setClickable(isClickableElement(event.target))
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
