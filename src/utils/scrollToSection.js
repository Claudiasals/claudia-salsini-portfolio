export const SCROLL_REVEAL_NAV_EVENT = 'portfolio:reveal-scroll'

const parseCssPx = (value, fallback) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const getSectionIdFromHref = (href) => {
  if (!href?.includes('#')) return ''
  return href.slice(href.indexOf('#') + 1)
}

export const getSectionScrollOffset = (element = null) => {
  if (element) {
    const marginTop = parseCssPx(getComputedStyle(element).scrollMarginTop, 0)
    if (marginTop > 0) return marginTop
  }

  const root = document.documentElement
  const rootStyles = getComputedStyle(root)
  const cssOffset = parseCssPx(
    rootStyles.getPropertyValue('--section-anchor-offset'),
    0,
  )

  if (cssOffset > 0) return cssOffset

  const scrollGap = parseCssPx(
    rootStyles.getPropertyValue('--navbar-scroll-gap'),
    80,
  )
  const navbar = document.querySelector('header')

  if (navbar) {
    return navbar.getBoundingClientRect().bottom + scrollGap
  }

  return (
    parseCssPx(rootStyles.getPropertyValue('--navbar-height'), 120) + scrollGap
  )
}

export const notifyScrollRevealNav = (element) => {
  if (!element) return

  window.dispatchEvent(
    new CustomEvent(SCROLL_REVEAL_NAV_EVENT, {
      detail: { target: element },
    }),
  )
}

const getElementDocumentTop = (element) =>
  element.getBoundingClientRect().top + window.scrollY

export const scrollToSectionById = (id, behavior = 'auto') => {
  const element = document.getElementById(id)
  if (!element) return false

  notifyScrollRevealNav(element)
  void element.offsetHeight

  const offset = getSectionScrollOffset(element)
  const top = Math.max(0, getElementDocumentTop(element) - offset)

  window.scrollTo({ top, left: 0, behavior })

  return true
}

export const scrollToSectionByIdAfterLayout = (id, behavior = 'auto') => {
  scrollToSectionById(id, behavior)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollToSectionById(id, behavior)
      window.setTimeout(() => scrollToSectionById(id, behavior), 50)
    })
  })
}

/**
 * Navigates to a homepage section from anywhere in the site.
 * Always scrolls, even when the hash is already active.
 */
export const navigateToHomeSection = (
  href,
  location,
  navigate,
  behavior = 'smooth',
) => {
  const id = getSectionIdFromHref(href)
  if (!id) return false

  const { pathname, hash } = location
  const targetHash = `#${id}`

  if (pathname !== '/') {
    navigate(`/${targetHash}`)
    return true
  }

  if (hash !== targetHash) {
    navigate({ pathname: '/', hash: id })
  }

  scrollToSectionByIdAfterLayout(id, behavior)
  return true
}
