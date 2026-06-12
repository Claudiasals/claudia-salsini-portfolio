/** Offset più corto sull’anello circolare (es. da ultimo a primo → ±1). */
export function getRelativeProjectOffset(index, currentIndex, total) {
  if (total <= 1) return 0

  let diff = index - currentIndex
  const half = total / 2

  if (diff > half) diff -= total
  if (diff < -half) diff += total

  return diff
}

/** Slot visivo in base all’offset (su mobile resta solo la card centrale). */
export function getProjectCarouselSlot(offset) {
  if (offset === 0) return 'center'
  if (offset === -1) return 'left'
  if (offset === 1) return 'right'
  return 'hidden'
}

export function getNextProjectIndex(currentIndex, total) {
  if (total <= 0) return 0
  return (currentIndex + 1) % total
}

export function getPrevProjectIndex(currentIndex, total) {
  if (total <= 0) return 0
  return (currentIndex - 1 + total) % total
}
