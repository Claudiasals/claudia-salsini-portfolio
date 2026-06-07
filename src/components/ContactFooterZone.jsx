import useHeroCircuitSpotlight from '../hooks/useHeroCircuitSpotlight'
import Contact from './Contact'
import Footer from './Footer'

const ContactFooterZone = () => {
  const { patternRef } = useHeroCircuitSpotlight()

  return (
    <div className="contact-footer-grid-zone">
      <div className="contact-footer-circuits hero-bg" aria-hidden="true">
        <div className="hero-bg__circuit" />
        <div
          ref={patternRef}
          className="hero-bg__circuit-spotlight hero-bg__circuit-spotlight--auto"
          aria-hidden="true"
        />
        <div className="hero-bg__glow" />
        <div className="hero-bg__scrim" />
      </div>

      <Contact />
      <Footer />
    </div>
  )
}

export default ContactFooterZone
