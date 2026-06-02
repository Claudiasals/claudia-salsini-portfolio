const parseCssPx = (value, fallback) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const easeOutCubic = (progress) => 1 - (1 - progress) ** 3

let activeScrollAnimation = null

export const isCoarsePointer = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: none), (pointer: coarse)').matches
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

const getElementDocumentTop = (element) =>
  element.getBoundingClientRect().top + window.scrollY

export const getSectionScrollTop = (id) => {
  const element = document.getElementById(id)
  if (!element) return null

  const offset = getSectionScrollOffset(element)
  return Math.max(0, getElementDocumentTop(element) - offset)
}

export const smoothScrollToY = (targetY, duration = 720) => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: targetY, left: 0, behavior: 'auto' })
    return
  }

  if (activeScrollAnimation) {
    cancelAnimationFrame(activeScrollAnimation)
    activeScrollAnimation = null
  }

  const startY = window.scrollY
  const distance = targetY - startY

  if (Math.abs(distance) < 2) {
    window.scrollTo({ top: targetY, left: 0, behavior: 'auto' })
    return
  }

  const startTime = performance.now()

  const step = (now) => {
    const elapsed = now - startTime
    const progress = Math.min(1, elapsed / duration)
    const nextY = startY + distance * easeOutCubic(progress)

    window.scrollTo({ top: nextY, left: 0, behavior: 'auto' })

    if (progress < 1) {
      activeScrollAnimation = requestAnimationFrame(step)
      return
    }

    activeScrollAnimation = null
    window.scrollTo({ top: targetY, left: 0, behavior: 'auto' })
  }

  activeScrollAnimation = requestAnimationFrame(step)
}

export const scrollToSectionById = (id, behavior = 'auto') => {
  const top = getSectionScrollTop(id)
  if (top == null) return false

  if (behavior === 'smooth' && isCoarsePointer()) {
    smoothScrollToY(top, 760)
    return true
  }

  window.scrollTo({ top, left: 0, behavior })
  return true
}

export const scrollToSectionByIdAfterLayout = (id, behavior = 'auto') => {
  const run = (scrollBehavior) => scrollToSectionById(id, scrollBehavior)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      run(behavior)

      const settleDelay =
        behavior === 'smooth' && isCoarsePointer() ? 820 : behavior === 'smooth' ? 420 : 50

      window.setTimeout(() => run('auto'), settleDelay)
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

  const startScroll = () => scrollToSectionByIdAfterLayout(id, behavior)
  const scrollDelay = isCoarsePointer() ? 160 : 0

  if (scrollDelay > 0) {
    window.setTimeout(startScroll, scrollDelay)
  } else {
    startScroll()
  }

  return true
}
