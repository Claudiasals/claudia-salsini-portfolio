import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  SECTION_REVEAL_EVENT,
  shouldRevealForRequest,
} from '../utils/sectionReveal'
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

  const markVisible = useCallback(() => {
    setIsVisible(true)
    if (heroIntroBroadcast) broadcastHeroIntroReveal()
  }, [heroIntroBroadcast])

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

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
        threshold: 0.08,
        rootMargin: '0px 0px -4% 0px',
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [markVisible])

  useEffect(() => {
    const element = ref.current
    if (!element || !hash) return undefined

    const hashId = hash.replace('#', '')
    const target = document.getElementById(hashId)
    if (target && element.contains(target)) {
      markVisible()
    }

    return undefined
  }, [hash, markVisible])

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const onSectionReveal = (event) => {
      if (shouldRevealForRequest(element, event.detail?.sectionId ?? null)) {
        markVisible()
      }
    }

    window.addEventListener(SECTION_REVEAL_EVENT, onSectionReveal)
    return () => window.removeEventListener(SECTION_REVEAL_EVENT, onSectionReveal)
  }, [markVisible])

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
  const { hash } = useLocation()

  const markSelfVisible = useCallback(() => {
    setSelfVisible(true)
  }, [])

  const markHeroCueVisible = useCallback(() => {
    setHeroCueVisible(true)
  }, [])

  useEffect(() => {
    if (!revealWithHero) return undefined

    const reveal = () => markHeroCueVisible()

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
  }, [revealWithHero, markHeroCueVisible])

  useEffect(() => {
    if (!hash || !revealWithHero) return undefined

    const hashId = hash.replace('#', '')
    const element = ref.current
    if (!element || hashId !== 'about') return undefined

    if (shouldRevealForRequest(element, 'about')) {
      markHeroCueVisible()
    }

    return undefined
  }, [hash, revealWithHero, markHeroCueVisible])

  useEffect(() => {
    if (!observesSelf) return undefined

    const element = ref.current
    if (!element) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markSelfVisible()
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markSelfVisible()
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
  }, [observesSelf, revealMargin, revealThreshold, markSelfVisible])

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const onSectionReveal = (event) => {
      const sectionId = event.detail?.sectionId ?? null

      if (shouldRevealForRequest(element, sectionId)) {
        markSelfVisible()
        if (revealWithHero) markHeroCueVisible()
      }
    }

    window.addEventListener(SECTION_REVEAL_EVENT, onSectionReveal)
    return () => window.removeEventListener(SECTION_REVEAL_EVENT, onSectionReveal)
  }, [revealWithHero, markSelfVisible, markHeroCueVisible])

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
