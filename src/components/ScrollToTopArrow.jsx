import { useEffect, useState } from 'react'
import { isCoarsePointer, smoothScrollToY } from '../utils/scrollToSection'

const SHOW_AFTER_PX = 360

const ScrollToTopArrow = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
