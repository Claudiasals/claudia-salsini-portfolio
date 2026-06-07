/** Sotto questa larghezza: carousel progetti con snap centrale e pulsantiera sotto. */
export const SMARTPHONE_MEDIA_QUERY = '(width < 640px)'

export const isSmartphoneViewport = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia(SMARTPHONE_MEDIA_QUERY).matches
}
