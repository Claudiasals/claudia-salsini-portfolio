/** Sotto questa larghezza: carousel progetti con snap centrale e pulsantiera sotto. */
export const SMARTPHONE_MEDIA_QUERY = '(width < 640px)'

/** Tablet: intro sx, radar centro, card fissa dx con un solo collegamento. */
export const COMPACT_RADAR_MEDIA_QUERY = '(640px <= width < 1280px)'

export const isSmartphoneViewport = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia(SMARTPHONE_MEDIA_QUERY).matches
}

export const isCompactRadarViewport = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia(COMPACT_RADAR_MEDIA_QUERY).matches
}
