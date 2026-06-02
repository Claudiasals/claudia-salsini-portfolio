import { SMARTPHONE_MEDIA_QUERY } from '../constants/breakpoints'

/** Profilo performance: solo smartphone o reduced motion (non su laptop touch / 4 core). */
let perfLite = false
let initialized = false

export const isPerfLite = () => perfLite

export const initPerfProfile = () => {
  if (initialized || typeof window === 'undefined') return perfLite
  initialized = true

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const smartphone = window.matchMedia(SMARTPHONE_MEDIA_QUERY).matches

  perfLite = reducedMotion || smartphone

  if (perfLite) {
    document.documentElement.classList.add('perf-lite')
  }

  return perfLite
}
