import { requestSectionReveal } from './sectionReveal'

/** Soglia scroll prima di mostrare la sfumatura in alto (hero leggibile a pagina fermata). */
const TOP_FADE_SCROLL_THRESHOLD_PX = 48

/** Pausa effetti pesanti mentre l’utente scrolla (libera il main thread). */
let scrolling = false
let scrollEndTimer = 0
let hooked = false
const idleListeners = new Set()

export const isScrolling = () => scrolling

export const onScrollIdle = (listener) => {
  idleListeners.add(listener)
  return () => idleListeners.delete(listener)
}

const updateTopFocusFade = () => {
  document.documentElement.classList.toggle(
    'is-scrolled-from-top',
    window.scrollY > TOP_FADE_SCROLL_THRESHOLD_PX,
  )
}

const setScrolling = (active) => {
  if (scrolling === active) return
  scrolling = active
  document.documentElement.classList.toggle('is-scrolling', active)
  if (!active) {
    for (const listener of idleListeners) listener()
    requestSectionReveal()
  }
}

export const initScrollInteraction = () => {
  if (hooked || typeof window === 'undefined') return
  hooked = true

  const onScroll = () => {
    updateTopFocusFade()
    setScrolling(true)
    window.clearTimeout(scrollEndTimer)
    scrollEndTimer = window.setTimeout(() => setScrolling(false), 160)
  }

  updateTopFocusFade()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('wheel', onScroll, { passive: true })
  window.addEventListener('touchmove', onScroll, { passive: true })
}
