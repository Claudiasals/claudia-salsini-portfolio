import { Link } from 'react-router-dom'
import { ProjectCaseHeroActions } from '../../components/ProjectCaseHeroActions'
import { ProjectDemoVideo } from '../../components/ProjectDemoVideo'
import { ProjectFeatureScreens } from '../../components/ProjectFeatureScreens'

const CATEGORY = 'Piattaforma gestionale interna'
const TITLE = 'WorkHub'
const EXTERNAL_URL = 'https://github.com/Claudiasals/workhub'
const DEMO_SECTION_ID = 'workhub-demo'

const CONTRIBUTION_ITEMS = [
  'progetto finale di gruppo del percorso Full Stack Web Developer, realizzato con la classe',
  'progettazione e sviluppo full stack condiviso: architettura, moduli e API REST',
  'frontend con React 19, Redux Toolkit e React Router: layout responsive, routing protetto e UI role-based (admin / user)',
  'backend Node.js ed Express 5 con MongoDB: autenticazione JWT, 2FA opzionale, validazione Joi e middleware di sicurezza',
  'moduli operativi: personale e turni, clienti, magazzino, ordini, ticketing e bacheca eventi aziendali',
  'integrazioni UI: calendario turni (react-big-calendar), grafici ticket (@mui/x-charts), export PDF (jspdf) ed Excel (xlsx)',
]

const OVERVIEW_CARDS = [
  {
    title: 'Il punto di partenza',
    text:
      'Per chiudere il percorso formativo serviva un gestionale interno credibile: unire personale, turni, clienti, magazzino, ordini e ticket in un flusso più chiaro, senza strumenti separati per ogni attività.',
  },
  {
    title: 'La soluzione sviluppata',
    text:
      'WorkHub riunisce in un’unica piattaforma dashboard, calendario, anagrafiche, magazzino, ordini e ticketing, con interfaccia e permessi diversi per admin e dipendenti.',
  },
  {
    title: 'Tech stack',
    technologies: [
      'JavaScript',
      'React',
      'Redux Toolkit',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB',
      'JWT',
    ],
  },
]

const FEATURES = [
  {
    title: 'Dashboard e calendario',
    text:
      'Overview con KPI, bacheca eventi e calendario turni/eventi: viste giorno, settimana e mese con filtri per reparto nella vista admin.',
    tags: 'React · Redux · react-big-calendar',
    screens: [
      {
        src: '/images/projects/workhub/overview-light.png',
        alt: 'Dashboard WorkHub con KPI, bacheca eventi e calendario turni settimanale',
        label: 'Overview e calendario',
      },
      {
        src: '/images/projects/workhub/admin-overview.png',
        alt: 'Vista admin WorkHub con Bacheca CRUD, KPI e calendario con filtri reparto',
        label: 'Overview admin',
      },
      {
        src: '/images/projects/workhub/admin-board-edit.png',
        alt: 'Modifica evento bacheca admin WorkHub tramite drawer laterale',
        label: 'Bacheca eventi (admin)',
      },
    ],
  },
  {
    title: 'Personale e profili',
    text:
      'Vista personale per i dipendenti (turni, ferie, permessi) e registro completo del personale con CRUD per gli admin.',
    tags: 'React Router · JWT · Ruoli',
    screens: [
      {
        src: '/images/projects/workhub/employee-profile.png',
        alt: 'Profilo dipendente WorkHub con anagrafica, turni settimanali, ferie e permessi',
        label: 'Profilo dipendente',
      },
      {
        src: '/images/projects/workhub/admin-personale.png',
        alt: 'Gestione personale admin WorkHub con registro dipendenti e azioni CRUD',
        label: 'Personale (admin)',
      },
    ],
  },
  {
    title: 'Clienti e magazzino',
    text:
      'Anagrafica clienti con storico ordini ed export Excel; gestione prodotti, giacenze, soglie di riordino ed export PDF.',
    tags: 'Express · MongoDB · jspdf · xlsx',
    screens: [
      {
        src: '/images/projects/workhub/customers.png',
        alt: 'Anagrafica clienti WorkHub con ricerca e tabella clienti',
        label: 'Anagrafica clienti',
      },
      {
        src: '/images/projects/workhub/customer-detail.png',
        alt: 'Dettaglio cliente WorkHub con affiliazione, punti fedeltà e storico ordini',
        label: 'Dettaglio cliente',
      },
      {
        src: '/images/projects/workhub/warehouse.png',
        alt: 'Dashboard magazzino WorkHub con SKU, giacenze, filtri e soglie di riordino',
        label: 'Magazzino',
      },
      {
        src: '/images/projects/workhub/product-detail.png',
        alt: 'Scheda prodotto WorkHub con dati anagrafici, immagine e export PDF',
        label: 'Scheda prodotto e PDF',
      },
    ],
  },
  {
    title: 'Ordini e ticketing',
    text:
      'Creazione ordini con breakdown per cliente; sistema ticket con apertura per gli utenti e analytics con grafici per gli admin.',
    tags: 'MUI Charts · Ticketing · API REST',
    screens: [
      {
        src: '/images/projects/workhub/orders.png',
        alt: 'Gestione ordini WorkHub con tabella prodotti, stati e corrieri',
        label: 'Gestione ordini',
      },
      {
        src: '/images/projects/workhub/orders-detail.png',
        alt: 'Dettaglio ordine WorkHub con breakdown per cliente e giacenza disponibile',
        label: 'Dettaglio ordine',
      },
      {
        src: '/images/projects/workhub/ticketing.png',
        alt: 'Sistema ticketing WorkHub con ticket aperti e chiusi',
        label: 'Ticketing interno',
      },
      {
        src: '/images/projects/workhub/admin-ticket.png',
        alt: 'Dashboard ticket admin WorkHub con grafico trend e filtri per periodo',
        label: 'Analytics ticket (admin)',
      },
    ],
  },
  {
    title: 'Sicurezza e accessi',
    text:
      'Autenticazione JWT, ruoli admin/user, 2FA opzionale (TOTP), recupero password e route protette lato frontend e backend.',
    tags: 'JWT · 2FA · Joi · Middleware',
    src: '/images/projects/workhub/settings.png',
    alt: 'Impostazioni WorkHub con password, 2FA, profilo, lingua e tema',
  },
  {
    title: 'UI/UX',
    text:
      'Tema chiaro e scuro, switch IT/EN, layout responsive con Tailwind CSS 4 e Phosphor Icons.',
    tags: 'Tailwind CSS · i18n · Tema chiaro/scuro',
  },
]

const STACK_HIGHLIGHTS = [
  {
    title: 'Frontend modulare',
    text:
      'React 19, Redux Toolkit e React Router hanno strutturato un’interfaccia role-based, con routing protetto e componenti riutilizzabili per ogni modulo.',
    tags: 'JavaScript · React · Redux Toolkit · Vite · Tailwind CSS',
  },
  {
    title: 'Backend e API',
    text:
      'Node.js ed Express 5 con validazione Joi, autenticazione JWT e API REST per alimentare dashboard, CRUD e flussi operativi.',
    tags: 'Node.js · Express · JWT · Joi',
  },
  {
    title: 'Dati e persistenza',
    text:
      'MongoDB per anagrafiche, ordini, ticket e configurazioni, con middleware di sicurezza e separazione netta tra client e server.',
    tags: 'MongoDB · API REST · Sicurezza',
  },
]

const WorkHubProject = () => (
  <main className="min-h-screen bg-site text-white">
    <div className="page-under-navbar px-6 pb-20">
      <article className="project-case mx-auto max-w-6xl">
        <header className="project-case-header">
          <Link to="/#projects" className="project-detail-back project-case-header__back">
            ← Torna ai progetti
          </Link>

          <p className="project-case-header__label text-sm font-semibold uppercase tracking-[0.3em]">
            <span className="text-sky-400">{TITLE}</span>
            <span className="text-white"> | {CATEGORY}</span>
          </p>

          <h1 className="project-case-intro__title mt-8 w-full text-3xl font-bold text-white md:text-4xl">
            WorkHub: piattaforma gestionale per operazioni aziendali interne
          </h1>
          <p className="project-case-intro__desc">
            Progetto di gruppo con la classe per concludere il percorso Full Stack Web Developer:
            un gestionale che centralizza personale, turni, clienti, magazzino, ordini e ticket,
            con interfaccia role-based per admin e dipendenti.
          </p>
          <p className="project-case-intro__desc mt-4">
            Capstone di corso in team: abbiamo progettato e sviluppato la piattaforma end-to-end —
            frontend React, API Express, MongoDB — con autenticazione, ruoli e moduli operativi per
            simulare un gestionale aziendale reale.
          </p>
        </header>

        <ProjectCaseHeroActions>
          <a href={`#${DEMO_SECTION_ID}`} className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Guarda la demo</span>
            </span>
          </a>
          <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner btn-primary-inner--spectrum">
              <span className="btn-primary-text">Repository GitHub →</span>
            </span>
          </a>
        </ProjectCaseHeroActions>

        <section className="project-case-overview-cards" aria-label="Punto di partenza, soluzione e stack">
          <ul className="project-case-overview-cards__grid">
            {OVERVIEW_CARDS.map((card) => (
              <li key={card.title} className="project-case-card project-case-card--compact">
                <h3 className="project-case-card__title">{card.title}</h3>
                {card.text ? <p className="project-case-card__text">{card.text}</p> : null}
                {card.technologies ? (
                  <ul className="project-case-tech-list">
                    {card.technologies.map((tech) => (
                      <li key={tech} className="project-case-tech-list__item">
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="workhub-contribution">
          <p className="project-case-section-label">Il progetto di gruppo</p>
          <h2
            id="workhub-contribution"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Come abbiamo realizzato WorkHub
          </h2>
          <p className="project-case-body">
            WorkHub è il progetto con cui la classe ha chiuso il corso Full Stack Web Developer:
            in team abbiamo progettato l&apos;architettura, definito le API REST e costruito
            un&apos;interfaccia modulare in cui la stessa shell cambia contenuto e permessi in base
            al ruolo JWT (admin o user).
          </p>
          <ul className="project-case-checklist space-y-4">
            {CONTRIBUTION_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          id={DEMO_SECTION_ID}
          className="project-case-video"
          aria-labelledby="workhub-demo-heading"
        >
          <div className="project-case-video__intro">
            <p className="project-case-section-label">Demo progetto</p>
            <h2
              id="workhub-demo-heading"
              className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
            >
              Walkthrough della piattaforma
            </h2>
            <p className="project-case-body">
              L&apos;applicazione richiede login con credenziali di test. Ho registrato una demo
              video che mostra i moduli principali, i flussi admin/user e le funzionalità chiave del
              gestionale.
            </p>
          </div>

          <ProjectDemoVideo
            src="/videos/workhub-demo.mp4"
            poster="/images/projects/workhub/workhub-video-poster.png"
          />
        </section>

        <section aria-labelledby="workhub-features">
          <p className="project-case-section-label">Funzionalità principali</p>
          <h2
            id="workhub-features"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Cosa fa la piattaforma
          </h2>
          <p className="project-case-body">
            WorkHub copre l&apos;operatività interna dell&apos;azienda: dalla dashboard con KPI e
            calendario alle anagrafiche clienti, dal magazzino agli ordini fino al ticketing con
            analytics per gli admin. Ogni blocco riassume un modulo con le schermate reali
            dell&apos;applicazione.
          </p>
          <ProjectFeatureScreens features={FEATURES} />
        </section>

        <section className="project-case-stack" aria-labelledby="workhub-stack">
          <p className="project-case-section-label">Stack tecnologico</p>
          <h2
            id="workhub-stack"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Stack tecnologico
          </h2>

          <ul className="project-case-stack-highlights">
            {STACK_HIGHLIGHTS.map((card) => (
              <li key={card.title} className="project-case-card project-case-card--compact">
                <h3 className="project-case-card__title">{card.title}</h3>
                <p className="project-case-card__text">{card.text}</p>
                {card.tags ? (
                  <p className="project-case-feature-screens__tags">{card.tags}</p>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="project-case-stack-narrative">
            <p>
              Stack moderno con separazione netta tra client React (Redux, routing protetto, Context
              per tema e i18n) e API Express su MongoDB, con validazione input e middleware di
              sicurezza.
            </p>
            <p>
              React 19 e Vite sul frontend, con Tailwind CSS 4 per un layout responsive; Redux
              Toolkit e React Router 7 per stato globale e navigazione protetta in base al ruolo.
            </p>
            <p>
              Node.js ed Express 5 sul backend, con MongoDB per la persistenza e Joi per validare
              payload e richieste API in modo coerente.
            </p>
          </div>
        </section>

        <ProjectCaseHeroActions className="project-detail-actions">
          <a href={`#${DEMO_SECTION_ID}`} className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Guarda la demo</span>
            </span>
          </a>
          <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner btn-primary-inner--spectrum">
              <span className="btn-primary-text">Repository GitHub →</span>
            </span>
          </a>
        </ProjectCaseHeroActions>
      </article>
    </div>
  </main>
)

export default WorkHubProject
