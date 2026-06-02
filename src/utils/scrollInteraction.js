import { requestSectionReveal } from './sectionReveal'

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
    setScrolling(true)
    window.clearTimeout(scrollEndTimer)
    scrollEndTimer = window.setTimeout(() => setScrolling(false), 160)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('wheel', onScroll, { passive: true })
  window.addEventListener('touchmove', onScroll, { passive: true })
}
