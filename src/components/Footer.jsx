import { Link } from 'react-router-dom'

const legalLinks = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/cookie', label: 'Cookie Policy' },
  { to: '/termini', label: 'Termini e condizioni' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner mx-auto max-w-6xl px-4 py-6">
        <p className="site-footer__brand">ClaudiaSalsini.dev</p>

        <span className="site-footer__sep" aria-hidden="true">
          ·
        </span>

        <p className="site-footer__copy">
          © {year} Claudia Salsini. Tutti i diritti riservati.
        </p>

        <nav className="site-footer__nav" aria-label="Link legali">
          <ul className="site-footer__links">
            {legalLinks.map((link) => (
              <li key={link.to}>
                <span className="site-footer__sep" aria-hidden="true">
                  ·
                </span>
                <Link to={link.to} className="site-footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
