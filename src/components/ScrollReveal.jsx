import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SCROLL_REVEAL_NAV_EVENT } from '../utils/scrollToSection'

export const ScrollRevealContext = createContext(false)

const ScrollReveal = ({ children, className = '' }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const { hash } = useLocation()

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const revealIfTargetInside = (target) => {
      if (target && element.contains(target)) {
        setIsVisible(true)
      }
    }

    const handleNavReveal = (event) => {
      revealIfTargetInside(event.detail?.target)
    }

    window.addEventListener(SCROLL_REVEAL_NAV_EVENT, handleNavReveal)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return () => window.removeEventListener(SCROLL_REVEAL_NAV_EVENT, handleNavReveal)
    }

    const hashId = hash.replace('#', '')
    if (hashId) {
      revealIfTargetInside(document.getElementById(hashId))
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px',
      },
    )

    observer.observe(element)

    return () => {
      window.removeEventListener(SCROLL_REVEAL_NAV_EVENT, handleNavReveal)
      observer.disconnect()
    }
  }, [hash])

  return (
    <ScrollRevealContext.Provider value={isVisible}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ScrollRevealContext.Provider>
  )
}

const ScrollRevealItem = ({ children, tier = 'content', className = '' }) => {
  const isVisible = useContext(ScrollRevealContext)

  return (
    <div
      className={`scroll-reveal-item scroll-reveal-item--${tier} ${
        isVisible ? 'scroll-reveal-item--visible' : ''
      } ${className}`.trim()}
    >
      {children}
    </div>
  )
}

export { ScrollRevealItem }
export default ScrollReveal
