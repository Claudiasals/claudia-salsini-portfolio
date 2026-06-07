import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { navigateToHomeSection, smoothScrollToY, isCoarsePointer, getSectionIdFromHref } from '../utils/scrollToSection'
import { useHomeActiveSection, HOME_NAV_SECTION_IDS } from '../utils/useHomeActiveSection'

const MOBILE_NAV_MEDIA = '(width < 768px)'
const MENU_CLOSE_ON_SCROLL_PX = 8

const navLinks = [
  { label: 'About Me', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contacts', href: '/#contact' },
]

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [clickedSection, setClickedSection] = useState(null)
  const [navScrolling, setNavScrolling] = useState(false)
  const activeSection = useHomeActiveSection()

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!clickedSection) return

    const clickedIdx = HOME_NAV_SECTION_IDS.indexOf(clickedSection)
    const activeIdx = HOME_NAV_SECTION_IDS.indexOf(activeSection)

    if (clickedSection === activeSection) {
      setClickedSection(null)
      setNavScrolling(false)
      return
    }

    if (activeIdx === -1 || clickedIdx === -1) return

    if (activeIdx > clickedIdx) {
      setClickedSection(null)
      setNavScrolling(false)
      return
    }

    if (activeIdx < clickedIdx && !navScrolling) {
      setClickedSection(null)
    }
  }, [activeSection, clickedSection, navScrolling])

  useEffect(() => {
    if (!clickedSection) return undefined

    const cancelNavOverride = () => {
      setNavScrolling(false)
      setClickedSection(null)
    }

    window.addEventListener('wheel', cancelNavOverride, { passive: true })
    window.addEventListener('touchmove', cancelNavOverride, { passive: true })

    return () => {
      window.removeEventListener('wheel', cancelNavOverride)
      window.removeEventListener('touchmove', cancelNavOverride)
    }
  }, [clickedSection])

  useEffect(() => {
    setClickedSection(null)
    setNavScrolling(false)
  }, [location.pathname])

  useEffect(() => {
    closeMenu()
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined
    if (!window.matchMedia(MOBILE_NAV_MEDIA).matches) return undefined

    const scrollYAtOpen = window.scrollY
    let touchStartY = null

    const closeOnScrollIntent = () => {
      closeMenu()
    }

    const onScroll = () => {
      if (Math.abs(window.scrollY - scrollYAtOpen) >= MENU_CLOSE_ON_SCROLL_PX) {
        closeOnScrollIntent()
      }
    }

    const onTouchStart = (event) => {
      if (event.touches.length !== 1) return
      touchStartY = event.touches[0].clientY
    }

    const onTouchMove = (event) => {
      if (touchStartY == null || event.touches.length !== 1) return
      if (Math.abs(event.touches[0].clientY - touchStartY) >= MENU_CLOSE_ON_SCROLL_PX) {
        closeOnScrollIntent()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [menuOpen])

  const handleHomeClick = (event) => {
    if (location.pathname !== '/') return

    event.preventDefault()
    closeMenu()
    setClickedSection(null)
    setNavScrolling(false)

    const scrollHome = () => {
      if (isCoarsePointer()) {
        smoothScrollToY(0, 680)
        return
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    if (isCoarsePointer()) {
      window.setTimeout(scrollHome, 160)
    } else {
      scrollHome()
    }

    if (location.hash) {
      navigate({ pathname: '/', hash: '' })
    }
  }

  const handleSectionClick = (event, href) => {
    event.preventDefault()
    closeMenu()
    setClickedSection(getSectionIdFromHref(href))
    setNavScrolling(true)
    navigateToHomeSection(href, location, navigate, 'smooth')
  }

  const homeItem = (
    <li>
      <Link
        to="/"
        aria-label="Torna alla Home"
        className="nav-btn"
        onClick={handleHomeClick}
      >
        <span className="nav-btn-inner h-11 w-11">
          <RiHomeFill className="text-xl" aria-hidden="true" />
        </span>
      </Link>
    </li>
  )

  const sectionItems = navLinks.map((link) => {
    const sectionId = getSectionIdFromHref(link.href)
    const highlightedSection = clickedSection ?? activeSection
    const isCurrent = location.pathname === '/' && highlightedSection === sectionId

    return (
      <li key={link.href}>
        <a
          href={link.href}
          className="nav-btn"
          aria-current={isCurrent ? 'location' : undefined}
          onClick={(event) => handleSectionClick(event, link.href)}
        >
          <span
            className={`nav-btn-inner nav-btn-inner--section px-5 text-xs font-semibold uppercase leading-none tracking-[0.2em] md:text-sm${
              isCurrent ? ' nav-btn-inner--current' : ''
            }`}
          >
            {link.label}
          </span>
        </a>
      </li>
    )
  })

  return (
    <header className="site-header fixed left-0 top-0 z-50 flex w-full items-center px-4 py-2.5 md:min-h-[120px] md:py-3">
      <nav className="site-nav w-full">
        <ul className="site-nav__desktop">
          {homeItem}
          {sectionItems}
        </ul>

        <div className="site-nav__mobile">
          <button
            type="button"
            className="nav-hamburger"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-hamburger__inner">
              <span
                className={`nav-hamburger__lines ${menuOpen ? 'nav-hamburger__lines--open' : ''}`}
                aria-hidden="true"
              >
                <span className="nav-hamburger__line" />
                <span className="nav-hamburger__line" />
                <span className="nav-hamburger__line" />
              </span>
            </span>
          </button>

          <ul
            id="nav-mobile-menu"
            className={`nav-mobile-menu ${menuOpen ? 'nav-mobile-menu--open' : ''}`}
            aria-hidden={!menuOpen}
          >
            {sectionItems}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
