import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getSectionScrollOffset } from './scrollToSection'

export const HOME_NAV_SECTION_IDS = ['about', 'projects', 'skills', 'contact']

export const getSectionRoot = (id) => {
  const anchor = document.getElementById(id)
  if (!anchor) return null
  return anchor.closest('section') ?? anchor
}

const getObserverRootMargin = () => {
  const offset = getSectionScrollOffset()
  const viewportHeight = window.innerHeight || 1
  const topMarginPx = Math.min(offset + 8, viewportHeight * 0.4)
  const bottomMarginPx = viewportHeight * 0.42
  return `-${topMarginPx}px 0px -${bottomMarginPx}px 0px`
}

/** Fallback quando nessuna sezione interseca la zona attiva. */
export const detectActiveSection = () => {
  const marker = window.scrollY + getSectionScrollOffset() + window.innerHeight * 0.22
  let active = ''

  for (const id of HOME_NAV_SECTION_IDS) {
    const root = getSectionRoot(id)
    if (!root) continue

    const top = root.getBoundingClientRect().top + window.scrollY
    if (top <= marker) {
      active = id
    }
  }

  if (active) return active

  const first = getSectionRoot(HOME_NAV_SECTION_IDS[0])
  if (first) {
    const firstTop = first.getBoundingClientRect().top + window.scrollY
    if (firstTop > marker) return ''
  }

  return HOME_NAV_SECTION_IDS[HOME_NAV_SECTION_IDS.length - 1] ?? ''
}

export const useHomeActiveSection = () => {
  const { pathname } = useLocation()
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('')
      return undefined
    }

    const ratios = new Map()
    let rafId = 0
    let observer = null

    const pickActiveSection = () => {
      let bestId = ''
      let bestRatio = 0

      for (const id of HOME_NAV_SECTION_IDS) {
        const ratio = ratios.get(id) ?? 0
        if (ratio > bestRatio) {
          bestRatio = ratio
          bestId = id
        }
      }

      const next = bestRatio > 0 ? bestId : detectActiveSection()
      setActiveSection((current) => (current === next ? current : next))
    }

    const schedulePick = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        pickActiveSection()
      })
    }

    const mountObserver = () => {
      observer?.disconnect()
      ratios.clear()

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.dataset.navSectionId
            if (!id) return
            ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
          })
          schedulePick()
        },
        {
          root: null,
          rootMargin: getObserverRootMargin(),
          threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.35, 0.5, 0.65, 0.8, 1],
        },
      )

      HOME_NAV_SECTION_IDS.forEach((id) => {
        const root = getSectionRoot(id)
        if (!root) return
        root.dataset.navSectionId = id
        observer.observe(root)
      })

      schedulePick()
    }

    mountObserver()

    window.addEventListener('scroll', schedulePick, { passive: true })
    window.addEventListener('resize', mountObserver, { passive: true })

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      observer?.disconnect()
      window.removeEventListener('scroll', schedulePick)
      window.removeEventListener('resize', mountObserver)
    }
  }, [pathname])

  return activeSection
}
