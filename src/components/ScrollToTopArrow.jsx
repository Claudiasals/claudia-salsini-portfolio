import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isCoarsePointer, smoothScrollToY } from '../utils/scrollToSection'

/** Comparsa solo dopo scroll profondo (pagine progetto lunghe). */
const SHOW_AFTER_SCROLL_PX = 950
const BASE_BOTTOM_PX = 36
const FOOTER_CLEARANCE_PX = 20

const isScrollDeepEnough = () => window.scrollY > SHOW_AFTER_SCROLL_PX

const syncScrollToTopBottom = () => {
  const footer = document.querySelector('.site-footer')
  let bottom = BASE_BOTTOM_PX

  if (footer) {
    const footerTop = footer.getBoundingClientRect().top
    const viewportHeight = window.innerHeight

    if (footerTop < viewportHeight) {
      bottom = Math.max(bottom, viewportHeight - footerTop + FOOTER_CLEARANCE_PX)
    }
  }

  document.documentElement.style.setProperty('--scroll-to-top-bottom', `${bottom}px`)
}

const ScrollToTopArrow = () => {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const update = () => {
      setVisible(isScrollDeepEnough())
      syncScrollToTopBottom()
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      document.documentElement.style.removeProperty('--scroll-to-top-bottom')
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
