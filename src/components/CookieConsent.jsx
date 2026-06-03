import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'portfolio-cookie-consent'

const CookieConsent = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('cookie-consent-visible', visible)
    return () => {
      document.documentElement.classList.remove('cookie-consent-visible')
    }
  }, [visible])

  const saveChoice = (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* storage non disponibile */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-label="Preferenze cookie"
      aria-live="polite"
    >
      <div className="cookie-consent__inner mx-auto max-w-6xl px-4 py-3">
        <p className="cookie-consent__text">
          Utilizziamo i cookie per migliorare la tua esperienza.{' '}
          <Link to="/cookie" className="cookie-consent__link">
            Leggi Policy
          </Link>
          .
        </p>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--reject"
            onClick={() => saveChoice('rejected')}
          >
            Rifiuta
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--accept"
            onClick={() => saveChoice('accepted')}
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
