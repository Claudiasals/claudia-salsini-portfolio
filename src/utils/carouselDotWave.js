/** Distanza dal pallino attivo (max 4) per l’effetto onda in paginazione. */
export const getCarouselDotWaveDistance = (index, activeIndex) =>
  Math.min(Math.abs(index - activeIndex), 4)
