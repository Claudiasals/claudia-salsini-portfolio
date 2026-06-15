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
    title: 'Sviluppo e prototipazione',
    text: 'Realizzazione di applicazioni web full stack, dalla progettazione dell\'interfaccia allo sviluppo frontend e backend, utilizzando anche strumenti di AI-assisted development per accelerare ricerca, prototipazione e implementazione.',
  },
  {
    number: '03',
    title: 'Approccio UX',
    text: 'Attenzione a interfacce chiare, accessibili e facili da usare per costruire siti e applicazioni più efficaci: progettare spazi digitali in cui orientarsi, scegliere e interagire deve risultare naturale.',
  },
]

/** Con hero: etichette + titolo + PNG; poi testo; poi card (margini crescenti = più scroll). */
const REVEAL_COPY = '0px 0px -18% 0px'
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
                  Sono una Junior Full Stack Developer con una formazione in Scienze e Tecniche
                  Psicologiche e un percorso professionale nei settori educativo, psicologico e
                  commerciale.
                </p>
                <p>
                  Questa esperienza mi ha insegnato a osservare il modo in cui le persone
                  prendono decisioni, cercano informazioni e interagiscono con gli strumenti che
                  utilizzano ogni giorno.
                </p>
                <p>
                  Oggi applico questo approccio allo sviluppo web, progettando interfacce e
                  funzionalità che non si limitano a funzionare dal punto di vista tecnico, ma che
                  risultino anche chiare, intuitive e utili per chi le utilizza.
                </p>
                <p>
                  Mi interessa crescere in contesti dove tecnologia, esperienza utente e
                  innovazione possano incontrarsi, contribuendo allo sviluppo di prodotti digitali
                  moderni e orientati a esigenze concrete.
                </p>
              </div>
            </ScrollRevealItem>
          </div>

          <ScrollRevealItem tier="about-2" className="about-visual" revealWithHero>
            <div className="about-visual__wrap">
              <div className="about-visual__img-shell">
                <div className="about-visual__media">
                  <svg className="about-visual__filter-defs" aria-hidden="true" focusable="false">
                    <defs>
                      <filter id="about-portrait-blue-boost" colorInterpolationFilters="sRGB">
                        <feColorMatrix
                          type="matrix"
                          values="1 0 0 0 0  0 1 0 0 0  0 0 1.14 0 0  0 0 0 1 0"
                        />
                      </filter>
                    </defs>
                  </svg>
                  <img
                    src="/images/about-portrait.png?v=6"
                    alt="Claudia Salsini - dalla psicologia allo sviluppo web"
                    className="about-visual__img"
                    loading="lazy"
                    decoding="async"
                    width={684}
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
