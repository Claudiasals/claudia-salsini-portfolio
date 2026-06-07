import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getSectionScrollOffset } from './scrollToSection'

export const HOME_NAV_SECTION_IDS = ['about', 'projects', 'skills', 'contact']

export const detectActiveSection = () => {
  const line = getSectionScrollOffset() + 1

  for (let index = 0; index < HOME_NAV_SECTION_IDS.length; index += 1) {
    const id = HOME_NAV_SECTION_IDS[index]
    const element = document.getElementById(id)
    if (!element) continue

    const top = element.getBoundingClientRect().top
    const nextId = HOME_NAV_SECTION_IDS[index + 1]
    const nextElement = nextId ? document.getElementById(nextId) : null
    const nextTop = nextElement
      ? nextElement.getBoundingClientRect().top
      : Number.POSITIVE_INFINITY

    if (top <= line && line < nextTop) {
      return id
    }
  }

  const first = document.getElementById(HOME_NAV_SECTION_IDS[0])
  if (first && first.getBoundingClientRect().top > line) {
    return ''
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

    const updateActiveSection = () => {
      const next = detectActiveSection()
      setActiveSection((current) => (current === next ? current : next))
    }

    updateActiveSection()

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [pathname])

  return activeSection
}
