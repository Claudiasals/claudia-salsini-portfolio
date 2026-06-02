/** Sotto questa larghezza: carousel compatto, frecce in card, no anteprima, torna su. */
export const SMARTPHONE_MEDIA_QUERY = '(width < 640px)'

export const isSmartphoneViewport = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia(SMARTPHONE_MEDIA_QUERY).matches
}
