import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { navigateToHomeSection } from '../utils/scrollToSection'

const navLinks = [
  { label: 'About Me', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contacts', href: '/#contact' },
]

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleHomeClick = (event) => {
    if (location.pathname !== '/') return

    event.preventDefault()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

    if (location.hash) {
      navigate({ pathname: '/', hash: '' })
    }
  }

  const handleSectionClick = (event, href) => {
    event.preventDefault()
    navigateToHomeSection(href, location, navigate, 'smooth')
  }

  return (
    <header className="fixed left-0 top-0 z-50 flex min-h-[120px] w-full items-center justify-center px-4 py-3">
      <nav className="flex w-full items-center justify-center">
        <div className="flex max-w-full flex-wrap items-center justify-center gap-3 overflow-visible px-2 py-3">
          <Link
            to="/"
            aria-label="Torna alla Home"
            className="nav-btn"
            onClick={handleHomeClick}
          >
            <span className="nav-btn-inner h-11 w-11">
              <FaHome className="text-base" />
            </span>
          </Link>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-btn"
              onClick={(event) => handleSectionClick(event, link.href)}
            >
              <span className="nav-btn-inner px-5 text-xs font-semibold uppercase leading-none tracking-[0.2em] md:text-sm">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
