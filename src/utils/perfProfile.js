/** Profilo performance: meno animazioni/maschere su device lenti o touch. */
let perfLite = false
let initialized = false

export const isPerfLite = () => perfLite

export const initPerfProfile = () => {
  if (initialized || typeof window === 'undefined') return perfLite
  initialized = true

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches
  const lowMemory = navigator.deviceMemory != null && navigator.deviceMemory <= 4
  const lowCores = navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4
  const narrow = window.matchMedia('(max-width: 900px)').matches

  perfLite = reducedMotion || coarsePointer || lowMemory || lowCores || narrow

  if (perfLite) {
    document.documentElement.classList.add('perf-lite')
  }

  return perfLite
}
