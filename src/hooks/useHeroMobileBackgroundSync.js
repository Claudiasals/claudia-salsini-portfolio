import { useEffect } from 'react'
import { notifyCircuitViewportResize } from '../utils/circuitSpotlightAutoLoop'

const MOBILE_MEDIA = '(width < 768px)'

/** Mobile: hero-bg fixed al viewport top, scrolla insieme all’hero via translateY. */
const useHeroMobileBackgroundSync = (bgRef) => {
  useEffect(() => {
    const bg = bgRef.current
    const hero = document.getElementById('hero')
    if (!bg || !hero) return undefined

    const mq = window.matchMedia(MOBILE_MEDIA)
    let rafId = 0

    const apply = () => {
      if (!mq.matches) {
        bg.classList.remove('hero-bg--mobile-viewport')
        bg.style.removeProperty('--hero-bg-sync-y')
        bg.style.removeProperty('--hero-bg-sync-height')
        return
      }

      const rect = hero.getBoundingClientRect()
      bg.classList.add('hero-bg--mobile-viewport')
      bg.style.setProperty('--hero-bg-sync-y', `${rect.top}px`)
      bg.style.setProperty('--hero-bg-sync-height', `${rect.height}px`)
    }

    const sync = () => {
      window.cancelAnimationFrame(rafId)
      rafId = window.requestAnimationFrame(() => {
        apply()
        notifyCircuitViewportResize()
      })
    }

    sync()

    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    mq.addEventListener('change', sync)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      mq.removeEventListener('change', sync)
      bg.classList.remove('hero-bg--mobile-viewport')
      bg.style.removeProperty('--hero-bg-sync-y')
      bg.style.removeProperty('--hero-bg-sync-height')
    }
  }, [bgRef])
}

export default useHeroMobileBackgroundSync
