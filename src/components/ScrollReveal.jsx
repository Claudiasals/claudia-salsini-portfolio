import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  broadcastHeroIntroReveal,
  HERO_INTRO_REVEAL_EVENT,
  isHeroIntroRevealed,
} from '../utils/scrollRevealHero'

export const ScrollRevealContext = createContext(false)

const ScrollReveal = ({ children, className = '', heroIntroBroadcast = false }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const { hash } = useLocation()
  const initialHashRef = useRef(hash)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const markVisible = () => {
      setIsVisible(true)
      if (heroIntroBroadcast) broadcastHeroIntroReveal()
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markVisible()
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisible()
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px',
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [heroIntroBroadcast])

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const hashId = initialHashRef.current.replace('#', '')
    if (!hashId) return undefined

    const target = document.getElementById(hashId)
    if (target && element.contains(target)) {
      setIsVisible(true)
      if (heroIntroBroadcast) broadcastHeroIntroReveal()
    }

    return undefined
  }, [heroIntroBroadcast])

  return (
    <ScrollRevealContext.Provider value={isVisible}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ScrollRevealContext.Provider>
  )
}

const ScrollRevealItem = ({
  children,
  tier = 'content',
  className = '',
  /** Se impostato, il reveal è legato allo scroll del singolo blocco (non al genitore). */
  revealMargin,
  revealThreshold = 0.12,
  /** Stesso momento della intro hero (etichetta + titolo About come invito a scorrere). */
  revealWithHero = false,
}) => {
  const parentVisible = useContext(ScrollRevealContext)
  const ref = useRef(null)
  const [selfVisible, setSelfVisible] = useState(false)
  const [heroCueVisible, setHeroCueVisible] = useState(() => isHeroIntroRevealed())
  const observesSelf = revealMargin != null

  useEffect(() => {
    if (!revealWithHero) return undefined

    const reveal = () => setHeroCueVisible(true)

    if (isHeroIntroRevealed()) {
      reveal()
      return undefined
    }

    window.addEventListener(HERO_INTRO_REVEAL_EVENT, reveal)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal()
    }

    return () => {
      window.removeEventListener(HERO_INTRO_REVEAL_EVENT, reveal)
    }
  }, [revealWithHero])

  useEffect(() => {
    if (!observesSelf) return undefined

    const element = ref.current
    if (!element) return undefined

    const reveal = () => setSelfVisible(true)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal()
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      },
      {
        threshold: revealThreshold,
        rootMargin: revealMargin,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [observesSelf, revealMargin, revealThreshold])

  const isVisible = revealWithHero
    ? heroCueVisible
    : observesSelf
      ? selfVisible
      : parentVisible

  return (
    <div
      ref={ref}
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
