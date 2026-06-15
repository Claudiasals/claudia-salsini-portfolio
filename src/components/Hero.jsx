import { useLocation, useNavigate } from 'react-router-dom'
import { navigateToHomeSection } from '../utils/scrollToSection'
import HeroBackground from './HeroBackground'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'

const Hero = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleProjectsClick = (event) => {
    event.preventDefault()
    navigateToHomeSection('/#projects', location, navigate, 'smooth')
  }

  const handleContactClick = (event) => {
    event.preventDefault()
    navigateToHomeSection('/#contact', location, navigate, 'smooth')
  }

  return (
    <section
      id="hero"
      className="hero-section page-under-navbar relative overflow-x-clip overflow-y-visible md:overflow-hidden px-6 pb-[calc(4rem+5px)] text-white md:pb-[calc(5rem+5px)]"
    >
      <HeroBackground />

      <ScrollReveal
        heroIntroBroadcast
        className="hero-content relative z-10 mx-auto max-w-6xl flex flex-col items-center text-center"
      >
        <ScrollRevealItem tier="hero-1">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Portfolio di
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem tier="hero-2">
          <p className="hero-name mt-6 font-bold tracking-tight text-white">
            Claudia Salsini
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem tier="hero-3">
          <h1 className="hero-title mt-8 mb-0 md:mb-10 md:mt-10">
            <span className="bg-gradient-to-r from-purple-600 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
              Junior Full Stack Developer
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-sky-400 to-purple-600 bg-clip-text text-transparent">
              orientata all&apos;esperienza utente
            </span>
          </h1>
        </ScrollRevealItem>

        <ScrollRevealItem tier="hero-4">
          <div className="hero-lead section-lead mx-auto mt-4 max-w-3xl space-y-4">
            <p>
              Progetto e sviluppo applicazioni web moderne utilizzando tecnologie frontend e
              backend, con particolare attenzione a usabilità, semplicità e bisogni reali delle
              persone.
            </p>
            <p>
              Utilizzo strumenti di AI-assisted development per trasformare rapidamente idee e
              requisiti in soluzioni concrete, mantenendo cura per i dettagli e per
              l&apos;esperienza utente.
            </p>
            <p className="opacity-90">
              Aperta a nuove opportunità professionali e collaborazioni su progetti web.
            </p>
          </div>
        </ScrollRevealItem>

        <ScrollRevealItem tier="hero-5">
          <div className="hero-actions mt-8 md:mt-10">
            <a
              href="/#projects"
              className="btn-primary hero-cta"
              onClick={handleProjectsClick}
            >
              <span className="btn-primary-inner">
                <span className="btn-primary-text">Guarda i miei progetti</span>
              </span>
            </a>
            <a
              href="/#contact"
              className="btn-secondary hero-cta"
              onClick={handleContactClick}
            >
              <span className="btn-secondary-inner">Contattami</span>
            </a>
          </div>
        </ScrollRevealItem>
      </ScrollReveal>
    </section>
  )
}

export default Hero
