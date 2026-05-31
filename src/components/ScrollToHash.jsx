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
    scrollToSectionByIdAfterLayout(id, 'auto')

    return undefined
  }, [pathname, hash])

  return null
}

export default ScrollToHash
