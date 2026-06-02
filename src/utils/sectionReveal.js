/** Richiesta di mostrare contenuti reveal (nav hash, scroll programmatico, scroll idle). */
export const SECTION_REVEAL_EVENT = 'portfolio:section-reveal'

export const requestSectionReveal = (sectionId = null) => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(SECTION_REVEAL_EVENT, { detail: { sectionId } }),
  )
}

export const isInSection = (element, sectionId) => {
  if (!element || !sectionId) return false
  const anchor = document.getElementById(sectionId)
  if (!anchor) return false
  const section = anchor.closest('section')
  if (section) return section.contains(element)
  return anchor.contains(element) || element.contains(anchor)
}

/** True se almeno una parte dell’elemento è nel viewport (margini permissivi). */
export const elementIntersectsViewport = (
  element,
  { topInset = 0, bottomInset = 0, minVisiblePx = 40, minRatio = 0.06 } = {},
) => {
  if (!element) return false

  const rect = element.getBoundingClientRect()
  const viewTop = topInset
  const viewBottom = window.innerHeight - bottomInset
  const visible = Math.min(rect.bottom, viewBottom) - Math.max(rect.top, viewTop)

  if (visible < minVisiblePx) return false

  const height = Math.max(rect.height, 1)
  return visible / height >= minRatio || visible >= minVisiblePx
}

export const shouldRevealForRequest = (element, sectionId) => {
  if (!element) return false
  if (sectionId) return isInSection(element, sectionId)
  return elementIntersectsViewport(element)
}
