import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Ripristina lo scroll in cima al cambio pagina.
 * Su home con hash lascia gestire ScrollToHash.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (pathname === '/' && hash) return

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
