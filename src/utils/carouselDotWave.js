/** Distanza dal pallino attivo (max 4) per l’effetto onda in paginazione. */
export const getCarouselDotWaveDistance = (index, activeIndex, total = null) => {
  let distance = Math.abs(index - activeIndex)

  if (total != null && total > 1) {
    distance = Math.min(distance, total - distance)
  }

  return Math.min(distance, 4)
}
