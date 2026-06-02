import { Outlet } from 'react-router-dom'
import CustomCursor from './CustomCursor'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollToTopArrow from './ScrollToTopArrow'

const SiteLayout = () => {
  return (
    <>
      <CustomCursor />
      <div className="top-focus-fade" aria-hidden="true" />
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTopArrow />
    </>
  )
}

export default SiteLayout
