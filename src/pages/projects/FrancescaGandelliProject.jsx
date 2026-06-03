import { Link } from 'react-router-dom'
import { ProjectCaseHeroActions } from '../../components/ProjectCaseHeroActions'
import { ProjectFeatureScreens } from '../../components/ProjectFeatureScreens'

const CATEGORY = 'Portfolio fotografico con pannello admin'
const TITLE = 'Francesca Gandelli'
const SITE_URL = 'https://francescagandelli.netlify.app/'
const GITHUB_URL = 'https://github.com/Claudiasals/francescagandelli'

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
    title: 'Il punto di partenza',
    text:
      'La fotografa aveva bisogno di un portfolio online curato e di uno strumento per aggiornare gallerie, testi e pagine legali senza dipendere da interventi tecnici esterni.',
  },
  {
    title: 'La soluzione sviluppata',
    text:
      'Un sito pubblico con gallerie e pagine informative, affiancato da un pannello admin protetto per gestire contenuti, immagini su Cloudinary e impostazioni di contatto.',
  },
  {
    title: 'Tech stack',
    technologies: [
      'JavaScript',
      'React',
      'Vite',
      'React Router',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB Atlas',
      'Cloudinary',
      'JWT',
    ],
  },
]

const FEATURES = [
  {
    title: 'Sito pubblico',
    text:
      'Home con copertina e categorie fotografiche, gallerie dinamiche per ogni categoria, pagine Chi sono e Contatti con form messaggi.',
    tags: 'React · Vite · Tailwind CSS',
    src: '/images/projects/francesca-gandelli/public-home.png',
    alt: 'Homepage pubblica del portfolio Francesca Gandelli con copertina e categorie fotografiche',
  },
  {
    title: 'Area admin',
    text:
      'Login protetto da JWT per modificare copertina, categorie, foto, didascalie, testi delle pagine e impostazioni di contatto.',
    tags: 'JWT · React Router · Admin',
    src: '/images/projects/francesca-gandelli/admin-home.png',
    alt: 'Pannello admin homepage con gestione copertina e categorie fotografiche',
  },
  {
    title: 'Gestione immagini',
    text:
      'Upload, eliminazione, riordino e sostituzione foto in galleria; immagini archiviate e servite tramite Cloudinary.',
    tags: 'Cloudinary · Multer · Gallerie',
    src: '/images/projects/francesca-gandelli/admin-gallery.png',
    alt: 'Pannello admin galleria con upload, riordino e didascalie delle foto',
  },
  {
    title: 'Contenuti e legali',
    text:
      'Privacy Policy, Cookie Policy e Termini di Servizio modificabili dal pannello; gestione email e Instagram.',
    tags: 'MongoDB · Express · Contenuti',
    src: '/images/projects/francesca-gandelli/admin-settings.png',
    alt: 'Impostazioni admin con email, Instagram, password e pagine legali',
  },
  {
    title: 'Deploy e servizi',
    text:
      'Frontend su Netlify, API su Render, database MongoDB Atlas e invio email tramite SMTP con Nodemailer.',
    tags: 'Netlify · Render · Nodemailer',
  },
]

const STACK_HIGHLIGHTS = [
  {
    title: 'Frontend e UX',
    text:
      'React e Vite per un sito vetrina veloce, con React Router, Tailwind CSS e layout responsive per homepage, gallerie e pagine informative.',
    tags: 'JavaScript · React · Vite · React Router · Tailwind CSS',
  },
  {
    title: 'Backend e dati',
    text:
      'API Express con MongoDB Atlas per contenuti, autenticazione admin e modelli dati organizzati per categorie, gallerie e testi.',
    tags: 'Node.js · Express · MongoDB Atlas · JWT',
  },
  {
    title: 'Media e produzione',
    text:
      'Cloudinary per le immagini, Nodemailer per il form contatti e deploy su Netlify e Render con variabili d’ambiente.',
    tags: 'Cloudinary · Nodemailer · Netlify · Render',
  },
]

const FrancescaGandelliProject = () => (
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
            Portfolio fotografico con gestione contenuti da pannello admin
          </h1>
          <p className="project-case-intro__desc">
            Progetto personale sviluppato in autonomia, fuori dal percorso formativo: sito full stack
            per Francesca Gandelli con area pubblica e pannello admin per gallerie, testi e pagine
            legali.
          </p>
          <p className="project-case-intro__desc mt-4">
            Progetto individuale realizzato da sola: ho curato sito pubblico e pannello admin con API
            su Render, frontend su Netlify e media su Cloudinary, così la fotografa può aggiornare il
            portfolio in autonomia.
          </p>
        </header>

        <ProjectCaseHeroActions>
          <a href={SITE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner btn-primary-inner--spectrum">
              <span className="btn-primary-text">Visita il sito →</span>
            </span>
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn-secondary">
            <span className="btn-secondary-inner">Repository GitHub →</span>
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

        <section aria-labelledby="francesca-contribution">
          <p className="project-case-section-label">Il mio ruolo</p>
          <h2
            id="francesca-contribution"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Come ho realizzato il portfolio
          </h2>
          <p className="project-case-body">
            Ho sviluppato il portfolio da sola, in parallelo alla formazione: architettura
            client/server con React e API Express, MongoDB Atlas per i contenuti e Cloudinary per
            le immagini, con autenticazione admin e deploy su Netlify e Render.
          </p>
          <ul className="project-case-checklist space-y-4">
            {CONTRIBUTION_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="francesca-features">
          <p className="project-case-section-label">Funzionalità principali</p>
          <h2
            id="francesca-features"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Cosa fa la piattaforma
          </h2>
          <p className="project-case-body">
            Il progetto combina un sito pubblico per mostrare il lavoro della fotografa e un
            pannello admin per gestire contenuti e media. Le schermate seguenti illustrano le aree
            principali del sito e del back-office.
          </p>
          <ProjectFeatureScreens features={FEATURES} />
        </section>

        <section className="project-case-stack" aria-labelledby="francesca-stack">
          <p className="project-case-section-label">Stack tecnologico</p>
          <h2
            id="francesca-stack"
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
              Stack pensato per un sito vetrina performante e un admin affidabile: React e Vite sul
              client, Express e Mongoose sul server, con servizi gestiti per hosting, database, media
              e email.
            </p>
            <p>
              Il frontend gestisce homepage, gallerie dinamiche e pagine informative; il backend
              espone API REST per contenuti, upload e autenticazione dell’area riservata.
            </p>
            <p>
              Cloudinary archivia le immagini, mentre Netlify e Render ospitano rispettivamente sito
              e API in produzione.
            </p>
          </div>
        </section>

        <ProjectCaseHeroActions className="project-detail-actions">
          <a href={SITE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner btn-primary-inner--spectrum">
              <span className="btn-primary-text">Visita il sito →</span>
            </span>
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn-secondary">
            <span className="btn-secondary-inner">Repository GitHub →</span>
          </a>
        </ProjectCaseHeroActions>
      </article>
    </div>
  </main>
)

export default FrancescaGandelliProject
