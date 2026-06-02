import { Link } from 'react-router-dom'
import ProjectScreenshotCarousel from '../../components/ProjectScreenshotCarousel'
import { useVideoVolumeBoost } from '../../hooks/useVideoVolumeBoost'

const CATEGORY = 'Piattaforma gestionale interna'
const TITLE = 'WorkHub'
const EXTERNAL_URL = 'https://github.com/Claudiasals/workhub'
const DEMO_SECTION_ID = 'workhub-demo'

const SCREENSHOTS = [
  {
    src: '/images/projects/workhub/overview-light.png',
    alt: 'Dashboard WorkHub con KPI, bacheca eventi e calendario turni settimanale',
    caption: 'Overview e calendario',
  },
  {
    src: '/images/projects/workhub/employee-profile.png',
    alt: 'Profilo dipendente WorkHub con anagrafica, turni settimanali, ferie e permessi',
    caption: 'Profilo dipendente',
  },
  {
    src: '/images/projects/workhub/customers.png',
    alt: 'Anagrafica clienti WorkHub con ricerca e tabella clienti',
    caption: 'Anagrafica clienti',
  },
  {
    src: '/images/projects/workhub/customer-detail.png',
    alt: 'Dettaglio cliente WorkHub con affiliazione, punti fedeltà e storico ordini',
    caption: 'Dettaglio cliente',
  },
  {
    src: '/images/projects/workhub/warehouse.png',
    alt: 'Dashboard magazzino WorkHub con SKU, giacenze, filtri e soglie di riordino',
    caption: 'Magazzino',
  },
  {
    src: '/images/projects/workhub/product-detail.png',
    alt: 'Scheda prodotto WorkHub con dati anagrafici, immagine e export PDF',
    caption: 'Scheda prodotto e PDF',
  },
  {
    src: '/images/projects/workhub/orders.png',
    alt: 'Gestione ordini WorkHub con tabella prodotti, stati e corrieri',
    caption: 'Gestione ordini',
  },
  {
    src: '/images/projects/workhub/orders-detail.png',
    alt: 'Dettaglio ordine WorkHub con breakdown per cliente e giacenza disponibile',
    caption: 'Dettaglio ordine',
  },
  {
    src: '/images/projects/workhub/ticketing.png',
    alt: 'Sistema ticketing WorkHub con ticket aperti e chiusi',
    caption: 'Ticketing interno',
  },
  {
    src: '/images/projects/workhub/settings.png',
    alt: 'Impostazioni WorkHub con password, 2FA, profilo, lingua e tema',
    caption: 'Impostazioni utente',
  },
  {
    src: '/images/projects/workhub/admin-overview.png',
    alt: 'Vista admin WorkHub con Bacheca CRUD, KPI e calendario con filtri reparto',
    caption: 'Overview admin',
  },
  {
    src: '/images/projects/workhub/admin-personale.png',
    alt: 'Gestione personale admin WorkHub con registro dipendenti e azioni CRUD',
    caption: 'Personale (admin)',
  },
  {
    src: '/images/projects/workhub/admin-ticket.png',
    alt: 'Dashboard ticket admin WorkHub con grafico trend e filtri per periodo',
    caption: 'Analytics ticket (admin)',
  },
  {
    src: '/images/projects/workhub/admin-board-edit.png',
    alt: 'Modifica evento bacheca admin WorkHub tramite drawer laterale',
    caption: 'Bacheca eventi (admin)',
  },
]

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
    title: 'Tipo progetto',
    text: 'Progetto finale di gruppo — corso Full Stack Web Developer',
  },
  {
    title: 'Obiettivo',
    text: 'Concludere il percorso con un gestionale interno completo e funzionante',
  },
  {
    title: 'Ruolo',
    text: 'Sviluppo in team con la classe (frontend, backend, database)',
  },
]

const FEATURES = [
  {
    title: 'Dashboard e calendario',
    text: 'Overview con KPI, bacheca eventi e calendario turni/eventi: viste giorno, settimana e mese con filtri per reparto (admin).',
  },
  {
    title: 'Personale e profili',
    text: 'Vista personale per i dipendenti (turni, ferie, permessi) e registro completo del personale con CRUD per gli admin.',
  },
  {
    title: 'Clienti e magazzino',
    text: 'Anagrafica clienti con storico ordini ed export Excel; gestione prodotti, giacenze, soglie di riordino ed export PDF.',
  },
  {
    title: 'Ordini e ticketing',
    text: 'Creazione ordini con breakdown per cliente; sistema ticket con apertura per gli utenti e analytics con grafici per gli admin.',
  },
  {
    title: 'Sicurezza e accessi',
    text: 'Autenticazione JWT, ruoli admin/user, 2FA opzionale (TOTP), recupero password e route protette lato frontend e backend.',
  },
  {
    title: 'UI/UX',
    text: 'Tema chiaro e scuro, switch IT/EN, layout responsive con Tailwind CSS 4 e Phosphor Icons.',
  },
]

const STACK = [
  'React 19',
  'Vite 7',
  'Redux Toolkit',
  'React Router 7',
  'Tailwind CSS 4',
  'Node.js',
  'Express 5',
  'MongoDB',
  'JWT',
  'Joi',
]

const WorkHubProject = () => {
  const demoVideoRef = useVideoVolumeBoost(1.35)

  return (
  <main className="min-h-screen bg-slate-950 text-white">
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
          <p className="project-case-intro__desc mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Progetto di gruppo con la classe per concludere il percorso Full Stack Web Developer:
            un gestionale che centralizza personale, turni, clienti, magazzino, ordini e ticket,
            con interfaccia role-based per admin e dipendenti.
          </p>
        </header>

        <section className="project-case-hero skills-category-panel">
          <div
            className="project-case-hero__bg"
            style={{ backgroundImage: "url('/images/projects/workhub/overview-light.png')" }}
            aria-hidden="true"
          />
          <div className="project-case-hero__overlay" aria-hidden="true" />
          <div className="project-case-hero__content">
            <p className="terminal-gradient-label">Case study</p>
            <p className="project-case-hero__desc project-case-hero__desc--compact">
              Capstone di corso in team: abbiamo progettato e sviluppato la piattaforma end-to-end
              — frontend React, API Express, MongoDB — con autenticazione, ruoli e moduli
              operativi per simulare un gestionale aziendale reale.
            </p>
            <div className="project-case-hero__actions">
              <a href={`#${DEMO_SECTION_ID}`} className="btn-primary">
                <span className="btn-primary-inner">
                  <span className="btn-primary-text">Guarda la demo</span>
                </span>
              </a>
              <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                <span className="btn-secondary-inner">Repository GitHub →</span>
              </a>
            </div>
          </div>
        </section>

        <section className="project-case-overview-cards mt-14" aria-label="Panoramica progetto">
          <ul className="project-case-overview-cards__grid">
            {OVERVIEW_CARDS.map((card) => (
              <li key={card.title} className="project-case-card project-case-card--compact">
                <h3 className="project-case-card__title">{card.title}</h3>
                <p className="project-case-card__text">{card.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="project-case-contribution mt-16" aria-labelledby="workhub-contribution">
          <p className="terminal-gradient-label">Contesto</p>
          <h2 id="workhub-contribution" className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Il progetto di gruppo
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            WorkHub è il progetto con cui la classe ha chiuso il corso Full Stack Web Developer:
            in team abbiamo progettato l&apos;architettura, definito le API REST e costruito
            un&apos;interfaccia modulare in cui la stessa shell cambia contenuto e permessi in base
            al ruolo JWT (admin o user).
          </p>
          <ul className="project-case-checklist mt-8 space-y-4">
            {CONTRIBUTION_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          id={DEMO_SECTION_ID}
          className="project-case-video mt-16"
          aria-labelledby="workhub-demo-heading"
        >
          <div className="project-case-video__intro">
            <p className="terminal-gradient-label">Demo progetto</p>
            <h2 id="workhub-demo-heading" className="mt-4 text-2xl font-bold text-white md:text-3xl">
              Walkthrough della piattaforma
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              L&apos;applicazione richiede login con credenziali di test. Ho registrato una demo
              video che mostra i moduli principali, i flussi admin/user e le funzionalità chiave
              del gestionale.
            </p>
          </div>

          <div className="project-case-video__frame project-case-video__frame--crop mt-8">
            <video
              ref={demoVideoRef}
              className="project-case-video__player"
              src="/videos/workhub-demo.mp4"
              poster="/images/projects/workhub/workhub-video-poster.png"
              controls
              preload="metadata"
              playsInline
            >
              Il tuo browser non supporta il tag video.
            </video>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="workhub-features">
          <p className="terminal-gradient-label">Funzionalità principali</p>
          <h2 id="workhub-features" className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Cosa fa la piattaforma
          </h2>
          <ul className="project-case-features mt-8">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="project-case-card project-case-card--feature">
                <h3 className="project-case-card__title">{feature.title}</h3>
                <p className="project-case-card__text">{feature.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="project-case-stack mt-16" aria-labelledby="workhub-stack">
          <p className="terminal-gradient-label">Stack tecnologico</p>
          <h2 id="workhub-stack" className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Tecnologie utilizzate
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <span key={tech} className="project-case-tag project-case-tag--tech">
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Stack moderno con separazione netta tra client React (Redux, routing protetto, Context
            per tema e i18n) e API Express su MongoDB, con validazione input e middleware di
            sicurezza.
          </p>
        </section>

        <section className="project-case-gallery mt-16" aria-labelledby="workhub-gallery">
          <p className="terminal-gradient-label">Screenshot</p>
          <h2 id="workhub-gallery" className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Approfondimento visivo
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Schermate reali dell&apos;applicazione: dashboard, profili, clienti, magazzino,
            ordini, ticket, impostazioni e viste riservate agli admin.
          </p>

          <div className="project-case-gallery__viewport mt-10">
            <ProjectScreenshotCarousel items={SCREENSHOTS} />
          </div>
        </section>

        <div className="project-detail-actions mt-14">
          <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Repository GitHub</span>
            </span>
          </a>
        </div>
      </article>
    </div>
  </main>
  )
}

export default WorkHubProject
