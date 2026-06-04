import { ScrollRevealItem } from './ScrollReveal'

const educationItems = [
  'Diploma di specializzazione Web Developer',
  'Laurea in Scienze e Tecniche Psicologiche',
  'Diploma di Grafico Visivo',
]

const highlightCards = [
  {
    number: '01',
    title: 'Formazione trasversale',
    text: 'Uno sguardo utile su bisogni, comportamenti e percorsi delle persone, per un modo di progettare più consapevole e centrato sull\'utente.',
    education: true,
  },
  {
    number: '02',
    title: 'Sviluppo end-to-end',
    text: 'Dal design al deploy: esperienza su flussi completi a partire dal mockup con Figma alla creazione del frontend e lo sviluppo backend fino alla messa in produzione. Interfaccia, logica applicativa e dati, dall\'usabilità all\'uso concreto, non solo esercizi isolati.',
  },
  {
    number: '03',
    title: 'Approccio UX',
    text: 'Attenzione a interfacce chiare, accessibili e facili da usare per costruire siti e applicazioni più efficaci: progettare spazi digitali in cui orientarsi, scegliere e interagire deve risultare naturale.',
  },
]

/** Con hero: etichette + titolo + PNG; poi testo; poi card (margini crescenti = più scroll). */
const REVEAL_COPY = '0px 0px -18% 0px'
const REVEAL_CV = '0px 0px 12% 0px'
const REVEAL_HIGHLIGHTS = [
  '0px 0px -22% 0px',
  '0px 0px -26% 0px',
  '0px 0px -30% 0px',
  '0px 0px -34% 0px',
]

const About = () => {
  return (
    <section className="about-section section-page section-page--default">
      <div className="mx-auto max-w-6xl">
        <div className="about-grid">
          <div className="about-lead">
          <div className="about-intro">
            <ScrollRevealItem tier="head" revealWithHero>
              <p
                id="about"
                className="section-scroll-anchor text-sm font-semibold uppercase tracking-[0.3em] text-sky-400"
              >
                About Me
              </p>
            </ScrollRevealItem>

            <ScrollRevealItem tier="about-title" revealWithHero>
              <h2 className="about-intro__title section-heading mt-3 text-3xl font-bold text-white md:text-4xl">
                Dalla psicologia allo sviluppo web
              </h2>
            </ScrollRevealItem>

            <ScrollRevealItem tier="about-1" revealMargin={REVEAL_COPY}>
              <div className="about-copy section-lead mt-5 space-y-4">
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

          <ScrollRevealItem tier="about-2" className="about-visual" revealWithHero>
            <div className="about-visual__wrap">
              <div className="about-visual__img-shell">
                <div className="about-visual__media">
                  <span className="about-visual__lightbulb-wrap" aria-hidden="true">
                    <img
                      src="/images/about-lightbulb.png?v=2"
                      alt=""
                      className="about-visual__lightbulb"
                      decoding="async"
                      width={256}
                      height={256}
                    />
                  </span>
                  <img
                    src="/images/foto-ibrida-portfolio.png?v=24"
                    alt="Claudia Salsini - dalla psicologia allo sviluppo web"
                    className="about-visual__img"
                    loading="lazy"
                    decoding="async"
                    width={858}
                    height={1024}
                  />
                </div>
              </div>
            </div>
          </ScrollRevealItem>
          </div>

          <div className="about-highlights">
            {highlightCards.map((card, index) => (
              <ScrollRevealItem
                key={card.title}
                tier={`about-${index + 3}`}
                revealMargin={REVEAL_HIGHLIGHTS[index]}
              >
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
            <ScrollRevealItem tier="about-6" className="about-cv-area" revealMargin={REVEAL_CV}>
              <a
                href="/cv-claudia-salsini.pdf"
                download="CV-Claudia-Salsini.pdf"
                className="btn-primary about-cv-download"
              >
                <span className="btn-primary-inner">
                  <span className="btn-primary-text">Scarica CV</span>
                </span>
              </a>
            </ScrollRevealItem>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
