import { Outlet } from 'react-router-dom'
import CustomCursor from './CustomCursor'
import Footer from './Footer'
import Navbar from './Navbar'

const SiteLayout = () => {
  return (
    <>
      <CustomCursor />
      <div className="top-focus-fade" aria-hidden="true" />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default SiteLayout
