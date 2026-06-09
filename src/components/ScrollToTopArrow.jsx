import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isCoarsePointer, smoothScrollToY } from '../utils/scrollToSection'

const FALLBACK_SHOW_AFTER_PX = 280

const resolveScrollAnchor = () =>
  document.getElementById('hero') ?? document.querySelector('.project-case-header')

const isPastScrollAnchor = () => {
  const anchor = resolveScrollAnchor()
  if (!anchor) return window.scrollY > FALLBACK_SHOW_AFTER_PX
  return anchor.getBoundingClientRect().bottom <= 0
}

const ScrollToTopArrow = () => {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(isPastScrollAnchor())
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [pathname])

  const scrollToTop = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    if (isCoarsePointer()) {
      smoothScrollToY(0, 680)
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Torna all'inizio della pagina"
      title="Torna su"
    >
      <svg
        className="scroll-to-top__icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 14l6-6 6 6"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default ScrollToTopArrow
