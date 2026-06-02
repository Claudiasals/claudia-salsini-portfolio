import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSectionByIdAfterLayout } from '../utils/scrollToSection'

const ScrollToHash = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname !== '/') return undefined

    if (!hash) {
      return undefined
    }

    const id = hash.replace('#', '')
    const behavior = window.matchMedia('(hover: none), (pointer: coarse)').matches
      ? 'smooth'
      : 'auto'
    scrollToSectionByIdAfterLayout(id, behavior)

    return undefined
  }, [pathname, hash])

  return null
}

export default ScrollToHash
