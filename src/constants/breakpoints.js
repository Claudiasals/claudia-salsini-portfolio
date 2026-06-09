/** Sotto questa larghezza: carousel progetti con snap centrale e pulsantiera sotto. */
export const SMARTPHONE_MEDIA_QUERY = '(width < 640px)'

/** Sotto questa larghezza: radar non-desktop (raggi corti, layout tablet/mobile). */
export const COMPACT_RADAR_MAX_WIDTH_PX = 1024

export const NON_DESKTOP_RADAR_MEDIA_QUERY = `(width < ${COMPACT_RADAR_MAX_WIDTH_PX}px)`

/** Tablet: micro-aggiustamenti icone radar (non cambia il layout card/ponti). */
export const COMPACT_RADAR_MEDIA_QUERY = `(640px <= width < ${COMPACT_RADAR_MAX_WIDTH_PX}px)`

export const isSmartphoneViewport = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia(SMARTPHONE_MEDIA_QUERY).matches
}
