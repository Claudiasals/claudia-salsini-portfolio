import { Link } from 'react-router-dom'
import ProjectScreenshotCarousel from '../../components/ProjectScreenshotCarousel'

const CATEGORY = 'Portfolio fotografico con pannello admin'
const TITLE = 'Francesca Gandelli'
const SITE_URL = 'https://francescagandelli.netlify.app/'
const GITHUB_URL = 'https://github.com/Claudiasals/francescagandelli'

const SCREENSHOTS = [
  {
    src: '/images/projects/francesca-gandelli/public-home.png',
    alt: 'Homepage pubblica del portfolio Francesca Gandelli con copertina e categorie fotografiche',
    caption: 'Sito pubblico',
  },
  {
    src: '/images/projects/francesca-gandelli/admin-home.png',
    alt: 'Pannello admin homepage con gestione copertina e categorie fotografiche',
    caption: 'Admin — homepage',
  },
  {
    src: '/images/projects/francesca-gandelli/admin-gallery.png',
    alt: 'Pannello admin galleria con upload, riordino e didascalie delle foto',
    caption: 'Admin — galleria',
  },
  {
    src: '/images/projects/francesca-gandelli/admin-settings.png',
    alt: 'Impostazioni admin con email, Instagram, password e pagine legali',
    caption: 'Admin — impostazioni',
  },
]

const CONTRIBUTION_ITEMS = [
  'progettazione e sviluppo full stack del portfolio: sito pubblico, area admin e API REST',
  'frontend React/Vite con React Router e Tailwind CSS: homepage, gallerie dinamiche, pagine Chi sono e Contatti',
  'backend Node.js ed Express con MongoDB Atlas: modelli dati, autenticazione JWT e upload immagini',
  'integrazione Cloudinary per storage foto, Multer per upload e Nodemailer per il form contatti',
  'pannello admin per copertina, categorie, gallerie, testi, contatti, impostazioni e pagine legali',
  'deploy frontend su Netlify e backend su Render, con configurazione variabili d’ambiente',
]

const OVERVIEW_CARDS = [
  {
    title: 'Tipo progetto',
    text: 'Progetto personale — portfolio fotografico con pannello admin',
  },
  {
    title: 'Obiettivo',
    text: 'Mostrare il lavoro della fotografa e permetterle di aggiornare contenuti in autonomia',
  },
  {
    title: 'Ruolo',
    text: 'Sviluppo individuale end-to-end (frontend, backend, deploy)',
  },
]

const FEATURES = [
  {
    title: 'Sito pubblico',
    text: 'Home con copertina e categorie fotografiche, gallerie dinamiche per ogni categoria, pagine Chi sono e Contatti con form messaggi.',
  },
  {
    title: 'Area admin',
    text: 'Login protetto da JWT per modificare copertina, categorie, foto, didascalie, testi delle pagine e impostazioni di contatto.',
  },
  {
    title: 'Gestione immagini',
    text: 'Upload, eliminazione, riordino e sostituzione foto in galleria; immagini archiviate su Cloudinary.',
  },
  {
    title: 'Contenuti e legali',
    text: 'Privacy Policy, Cookie Policy e Termini di Servizio modificabili dal pannello; gestione email e Instagram.',
  },
  {
    title: 'Deploy e servizi',
    text: 'Frontend su Netlify, API su Render, database MongoDB Atlas e invio email tramite SMTP.',
  },
]

const STACK = [
  'React',
  'Vite',
  'React Router',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'MongoDB Atlas',
  'JWT',
  'Cloudinary',
  'Nodemailer',
]

const FrancescaGandelliProject = () => (
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
            Portfolio fotografico con gestione contenuti da pannello admin
          </h1>
          <p className="project-case-intro__desc mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Progetto personale sviluppato in autonomia, fuori dal percorso formativo: sito full
            stack per Francesca Gandelli con area pubblica e pannello admin per gallerie, testi e
            pagine legali.
          </p>
        </header>

        <section className="project-case-hero skills-category-panel">
          <div
            className="project-case-hero__bg"
            style={{
              backgroundImage: "url('/images/projects/francesca-gandelli/public-home.png')",
            }}
            aria-hidden="true"
          />
          <div className="project-case-hero__overlay" aria-hidden="true" />
          <div className="project-case-hero__content">
            <p className="terminal-gradient-label">Case study</p>
            <p className="project-case-hero__desc project-case-hero__desc--compact">
              Progetto individuale realizzato da sola, a parte dal corso: ho curato sito pubblico
              e pannello admin con API su Render, frontend su Netlify e media su Cloudinary, così
              la fotografa può aggiornare il portfolio in autonomia.
            </p>
            <div className="project-case-hero__actions">
              <a href={SITE_URL} target="_blank" rel="noreferrer" className="btn-primary">
                <span className="btn-primary-inner">
                  <span className="btn-primary-text">Visita il sito</span>
                </span>
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn-secondary">
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

        <section
          className="project-case-contribution mt-16"
          aria-labelledby="francesca-contribution"
        >
          <p className="terminal-gradient-label">Il mio ruolo</p>
          <h2 id="francesca-contribution" className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Come ho realizzato il portfolio
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Ho sviluppato il portfolio da sola, in parallelo alla formazione: architettura
            client/server con React e API Express, MongoDB Atlas per i contenuti e Cloudinary per
            le immagini, con autenticazione admin e deploy su Netlify e Render.
          </p>
          <ul className="project-case-checklist mt-8 space-y-4">
            {CONTRIBUTION_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="francesca-features">
          <p className="terminal-gradient-label">Funzionalità principali</p>
          <h2 id="francesca-features" className="mt-4 text-2xl font-bold text-white md:text-3xl">
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

        <section className="project-case-stack mt-16" aria-labelledby="francesca-stack">
          <p className="terminal-gradient-label">Stack tecnologico</p>
          <h2 id="francesca-stack" className="mt-4 text-2xl font-bold text-white md:text-3xl">
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
            Stack pensato per un sito vetrina performante e un admin affidabile: React e Vite sul
            client, Express e Mongoose sul server, con servizi gestiti per hosting, database,
            media e email.
          </p>
        </section>

        <section className="project-case-gallery mt-16" aria-labelledby="francesca-gallery">
          <p className="terminal-gradient-label">Screenshot</p>
          <h2 id="francesca-gallery" className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Approfondimento visivo
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Schermate del sito pubblico e del pannello admin: homepage, gestione gallerie e
            impostazioni.
          </p>

          <div className="project-case-gallery__viewport mt-10">
            <ProjectScreenshotCarousel items={SCREENSHOTS} />
          </div>
        </section>

        <div className="project-detail-actions mt-14 flex flex-wrap gap-4">
          <a href={SITE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Visita il sito</span>
            </span>
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn-secondary">
            <span className="btn-secondary-inner">Repository GitHub →</span>
          </a>
        </div>
      </article>
    </div>
  </main>
)

export default FrancescaGandelliProject
