import { Outlet, useLocation } from 'react-router-dom'
import CookieConsent from './CookieConsent'
import CustomCursor from './CustomCursor'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTopArrow from './ScrollToTopArrow'

const SiteLayout = () => {
  const isHome = useLocation().pathname === '/'

  return (
    <>
      <CustomCursor />
      <div className="top-focus-fade" aria-hidden="true" />
      <Navbar />
      <Outlet />
      {!isHome ? <Footer /> : null}
      <CookieConsent />
      <ScrollToTopArrow />
    </>
  )
}

export default SiteLayout
