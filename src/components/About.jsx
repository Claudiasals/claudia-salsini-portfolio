import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'
import AboutCircuitOverlay from './AboutCircuitOverlay'

const educationItems = [
  'Diploma di specializzazione Web Developer',
  'Laurea in Scienze e Tecniche Psicologiche',
  'Diploma di Grafico Visivo',
]

const highlightCards = [
  {
    number: '01',
    title: 'Background psicologico',
    text: 'Formazione in Scienze e Tecniche Psicologiche ed esperienza nei settori psicologico, educativo e direct marketing: uno sguardo utile per leggere bisogni, comportamenti e percorsi delle persone.',
  },
  {
    number: '02',
    title: 'Approccio UX',
    text: 'Attenzione a interfacce chiare, accessibili e facili da usare: progettare spazi digitali in cui orientarsi, scegliere e interagire deve risultare naturale.',
  },
  {
    number: '03',
    title: 'Formazione trasversale',
    text: 'Web development, psicologia e grafica visiva: percorsi diversi che convergono in un modo di progettare più consapevole e centrato sulla persona.',
    education: true,
  },
]

const About = () => {
  return (
    <section className="about-section section-page section-page--default">
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="about-grid">
          <div className="about-intro">
            <ScrollRevealItem tier="head">
              <p
                id="about"
                className="section-scroll-anchor text-sm font-semibold uppercase tracking-[0.3em] text-sky-400"
              >
                About Me
              </p>
            </ScrollRevealItem>

            <ScrollRevealItem tier="about-title">
              <h2 className="about-intro__title mt-3 text-3xl font-bold text-white md:text-4xl">
                Dalla psicologia allo sviluppo web
              </h2>
            </ScrollRevealItem>

            <ScrollRevealItem tier="about-1">
              <div className="about-copy mt-5 space-y-4 text-base leading-7 text-slate-300 md:text-[1.0625rem] md:leading-8">
                <p>
                  Sono una Junior Full Stack Web Developer con una formazione in Scienze e
                  Tecniche Psicologiche e un percorso precedente nei settori psicologico,
                  educativo e direct marketing.
                </p>
                <p>
                  Questo background mi permette di avvicinarmi allo sviluppo web con uno
                  sguardo orientato alle persone: non solo codice, ma attenzione a come gli
                  utenti leggono, scelgono, si orientano e interagiscono con un&apos;interfaccia.
                </p>
                <p>
                  Mi interessa crescere in team dove poter contribuire alla realizzazione di
                  applicazioni web moderne, accessibili e intuitive, trasformando esigenze
                  concrete in esperienze digitali semplici e curate.
                </p>
              </div>
            </ScrollRevealItem>
          </div>

          <ScrollRevealItem tier="about-2" className="about-visual">
            <div className="about-visual__wrap">
              <div className="about-visual__glow" aria-hidden="true" />
              <div className="about-visual__img-shell">
                <div className="about-visual__media">
                  <img
                    src="/images/foto-ibrida.png"
                    alt="Claudia Salsini - dalla psicologia allo sviluppo web"
                    className="about-visual__img"
                    loading="lazy"
                    decoding="async"
                    width={552}
                    height={1788}
                  />
                  <div className="about-visual__circuit-mask" aria-hidden="true">
                    <AboutCircuitOverlay />
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealItem>

          <div className="about-highlights">
            {highlightCards.map((card, index) => (
              <ScrollRevealItem key={card.number} tier={`about-${index + 3}`}>
                <article className="about-highlight-card">
                  <div className="about-highlight-card__inner">
                    <span className="about-highlight-card__number">{card.number}</span>
                    <h3 className="about-highlight-card__title">{card.title}</h3>
                    <p className="about-highlight-card__text">{card.text}</p>

                    {card.education ? (
                      <ul className="about-education-compact">
                        {educationItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              </ScrollRevealItem>
            ))}

            <ScrollRevealItem tier="about-6">
              <div className="about-cv-area">
                <a
                  href="/cv-claudia-salsini.pdf"
                  download="CV-Claudia-Salsini.pdf"
                  className="btn-primary about-cv-download"
                >
                  <span className="btn-primary-inner">
                    <span className="btn-primary-text">Scarica CV</span>
                  </span>
                </a>
              </div>
            </ScrollRevealItem>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default About
