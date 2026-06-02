import HeroBackground from './HeroBackground'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'

const Hero = () => {
  return (
    <section
      id="hero"
      className="hero-section page-under-navbar relative overflow-hidden px-6 pb-[calc(4rem+5px)] text-white md:pb-[calc(5rem+5px)]"
    >
      <HeroBackground />

      <ScrollReveal
        heroIntroBroadcast
        className="relative z-10 mx-auto max-w-6xl flex flex-col items-center text-center"
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
              Junior Full Stack
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-sky-400 to-purple-600 bg-clip-text text-transparent">
              Web Developer
            </span>
          </h1>
        </ScrollRevealItem>

        <ScrollRevealItem tier="hero-4">
          <p className="hero-lead mx-auto mt-8 max-w-3xl text-slate-300">
            Creo applicazioni web moderne, responsive e orientate all&apos;esperienza utente,
            con attenzione a interfacce chiare, flussi semplici e soluzioni digitali pensate
            per esigenze reali.
          </p>
        </ScrollRevealItem>
      </ScrollReveal>
    </section>
  )
}

export default Hero
