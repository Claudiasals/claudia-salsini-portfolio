import { Link } from 'react-router-dom'
import { ProjectSuggestions } from '../../components/ProjectSuggestions'
import { ProjectCaseHeroActions } from '../../components/ProjectCaseHeroActions'
import { ProjectDemoLink } from '../../components/ProjectDemoLink'
import { ProjectDemoVideo } from '../../components/ProjectDemoVideo'
import { ProjectFeatureScreens } from '../../components/ProjectFeatureScreens'

const CATEGORY = 'Portfolio fotografico con pannello admin'
const TITLE = 'Francesca Gandelli'
const DEMO_SECTION_ID = 'francesca-gandelli-demo'
const SITE_URL = 'https://francescagandelli.netlify.app/'
const GITHUB_URL = 'https://github.com/Claudiasals/francescagandelli'

const CONTRIBUTION_ITEMS = [
  'adeguamento dell’interfaccia alle richieste della cliente: tipografia, palette colori e impostazione del layout',
  'progettazione e sviluppo full stack del portfolio: sito pubblico, area admin e API REST',
  'frontend React/Vite con React Router e Tailwind CSS: homepage, gallerie dinamiche, pagine Chi sono e Contatti',
  'backend Node.js ed Express con MongoDB Atlas: modelli dati, autenticazione JWT e upload immagini',
  'pannello admin per inserire categorie e foto, modificare testi, contatti e pagine legali in autonomia',
  'recupero password con verifica OTP via email: richiesta codice, conferma e impostazione nuova password',
  'Cloudinary integration per storage foto, Multer per upload e Nodemailer per form contatti e OTP',
  'deploy frontend su Netlify e backend su Render, con configurazione variabili d’ambiente',
]

const OVERVIEW_CARDS = [
  {
    title: 'Il punto di partenza',
    text:
      'La cliente cercava un portfolio online con un’identità visiva precisa — font, colori e impostazione del sito — e la possibilità di aggiornare gallerie e testi senza supporto tecnico.',
  },
  {
    title: 'La soluzione sviluppata',
    text:
      'Ho seguito le richieste estetiche della cliente per sito pubblico e pannello admin, poi ho aggiunto il backend completo per gestire in autonomia categorie, foto, contenuti e impostazioni.',
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
    title: 'Accesso area riservata',
    text:
      'Login con username e password per entrare nel pannello admin; dal link «Password dimenticata» si avvia il flusso di recupero credenziali.',
    tags: 'Login admin',
    src: '/images/projects/francesca-gandelli/admin-login.png',
    alt: 'Pagina di login admin con username, password e link Password dimenticata',
  },
  {
    title: 'Recupero password con OTP',
    text:
      'Flusso guidato in tre step: inserimento dell’email collegata all’account; verifica del codice OTP, ricevuto per e-mail; scelta di una nuova password.',
    tags: 'Verifica OTP',
    screens: [
      {
        src: '/images/projects/francesca-gandelli/admin-password-recovery.png',
        alt: 'Modale recupero password con campo indirizzo email',
        label: 'Richiesta email',
      },
      {
        src: '/images/projects/francesca-gandelli/admin-otp-verify.png',
        alt: 'Modale verifica codice OTP inviato per email',
        label: 'Verifica OTP',
      },
      {
        src: '/images/projects/francesca-gandelli/admin-new-password.png',
        alt: 'Modale nuova password con conferma',
        label: 'Nuova password',
      },
    ],
  },
  {
    title: 'Gestione categorie',
    text:
      'Dalla sezione Photography la cliente può creare nuove categorie, riordinarle ed eliminarle con i pulsanti dedicati, senza interventi tecnici.',
    tags: 'CRUD · Reorder',
    src: '/images/projects/francesca-gandelli/admin-photography.png',
    alt: 'Pannello admin Photography con pulsanti aggiungi categoria, riordina ed elimina categoria',
  },
  {
    title: 'Error Prevention',
    text:
      'Prima di cancellare categorie o foto compare un modale di conferma, per evitare eliminazioni accidentali e rendere le operazioni più sicure.',
    src: '/images/projects/francesca-gandelli/admin-categories.png',
    alt: 'Modale di conferma eliminazione categoria nel pannello admin',
  },
  {
    title: 'Gestione foto in galleria',
    text:
      'All’interno di ogni galleria sono presenti pulsanti per aggiungere foto, riordinarle ed eliminarle. Multer gestisce l’upload dal pannello admin; Cloudinary archivia e serve le immagini con ottimizzazione automatica e CDN. Servizio scelto per non appesantire il backend e rendere le gallerie più veloci da caricare.',
    tags: 'Multer · Cloudinary · Reorder',
    src: '/images/projects/francesca-gandelli/admin-gallery.png',
    alt: 'Pannello admin galleria con pulsanti aggiungi foto, riordina ed elimina foto',
  },
  {
    title: 'Testi modificabili',
    text:
      'In tutte le sezioni del sito con contenuto testuale modificabile compare l’indicazione «clicca sul testo per modificarlo»: la cliente può personalizzare i contenuti direttamente dall’admin.',
    tags: 'Inline Editing',
    src: '/images/projects/francesca-gandelli/admin-contacts.png',
    alt: 'Pagina Contatti admin con invito a cliccare sul testo per modificarlo e form messaggi',
  },
]

const STACK_HIGHLIGHTS = [
  {
    title: 'Frontend e UX',
    text:
      'React e Vite per un sito vetrina veloce, con tipografia, colori e layout allineati al brief della cliente e interfaccia responsive per gallerie e pagine informative.',
    tags: 'JavaScript · React · Vite · React Router · Tailwind CSS',
  },
  {
    title: 'Backend e dati',
    text:
      'API Express con MongoDB Atlas per contenuti, autenticazione admin, recupero password con OTP via email e modelli dati per categorie, gallerie e testi.',
    tags: 'Node.js · Express · MongoDB Atlas · JWT',
  },
  {
    title: 'Media e produzione',
    text:
      'Multer per l’upload delle foto dal pannello admin, Cloudinary per archiviazione e delivery delle immagini, Nodemailer per form contatti e invio OTP di recupero password, deploy su Netlify e Render.',
    tags: 'Multer · Cloudinary · Nodemailer · Netlify · Render',
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
            Progetto personale sviluppato in autonomia per Francesca Gandelli: ho seguito le
            richieste della cliente per le specifiche di design — font, colori e impostazione generale —
            e ho costruito il portfolio full stack con area pubblica e pannello admin.
          </p>
          <p className="project-case-intro__desc mt-4">
            Oltre al front-end curato sul brief estetico, ho aggiunto tutta la parte backend perché
            la cliente potesse gestire in autonomia l’inserimento di categorie e foto, le modifiche
            ai testi e le impostazioni del sito, senza dipendere da interventi tecnici.
          </p>
        </header>

        <ProjectCaseHeroActions>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn-secondary">
            <span className="btn-secondary-inner">Repository GitHub →</span>
          </a>
          <ProjectDemoLink sectionId={DEMO_SECTION_ID} className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Guarda la demo</span>
            </span>
          </ProjectDemoLink>
          <a href={SITE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner btn-primary-inner--spectrum">
              <span className="btn-primary-text">Visita il sito →</span>
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

        <section aria-labelledby="francesca-contribution">
          <p className="project-case-section-label">Il mio ruolo</p>
          <h2
            id="francesca-contribution"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Come ho realizzato il portfolio
          </h2>
          <p className="project-case-body">
            Ho sviluppato il portfolio in parallelo alla formazione: prima ho allineato
            l’interfaccia alle richieste estetiche della cliente, poi ho progettato la system architecture
            client/server con React, API Express, MongoDB Atlas e Cloudinary, con autenticazione
            admin e deploy su Netlify e Render.
          </p>
          <ul className="project-case-checklist space-y-4">
            {CONTRIBUTION_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          id={DEMO_SECTION_ID}
          className="project-case-video section-scroll-anchor"
          aria-labelledby="francesca-demo-heading"
        >
          <div className="project-case-video__intro">
            <p className="project-case-section-label">Demo progetto</p>
            <h2
              id="francesca-demo-heading"
              className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
            >
              Una panoramica del pannello admin
            </h2>
            <p className="project-case-body">
              Demo video del pannello admin e dei flussi principali per gestire gallerie, contenuti
              e impostazioni. Ho registrato questa parte perché l’area riservata non è accessibile
              dal link pubblico: da lì si vede solo il portfolio, com’è per chi visita il sito.
            </p>
          </div>

          <ProjectDemoVideo
            src="/videos/francescagandelli-demo.mp4"
            poster="/images/projects/francesca-gandelli/admin-photography.png"
          />
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
            Le schermate seguenti illustrano le funzionalità del pannello admin: login con recupero
            password via OTP, gestione categorie e foto, modali di conferma per le eliminazioni e
            modifica inline dei testi su tutte le pagine del sito.
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
              Lo stack è stato scelto per costruire un portfolio performante sul lato pubblico e un
              pannello admin solido sul lato gestionale. Il risultato è un portfolio fotografico che
              combina una presenza online curata con strumenti di gestione semplici e autonomi. Non si
              tratta solo di un sito vetrina, ma di una piattaforma completa con area pubblica e
              pannello di amministrazione, pensata per permettere alla cliente di gestire il portfolio
              nel tempo senza dipendere da interventi tecnici per aggiornare contenuti, gallerie e
              immagini.
            </p>
          </div>
        </section>

        <ProjectCaseHeroActions className="project-detail-actions">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn-secondary">
            <span className="btn-secondary-inner">Repository GitHub →</span>
          </a>
          <ProjectDemoLink sectionId={DEMO_SECTION_ID} className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Guarda la demo</span>
            </span>
          </ProjectDemoLink>
          <a href={SITE_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner btn-primary-inner--spectrum">
              <span className="btn-primary-text">Visita il sito →</span>
            </span>
          </a>
        </ProjectCaseHeroActions>

        <ProjectSuggestions currentSlug="francesca-gandelli" />
      </article>
    </div>
  </main>
)

export default FrancescaGandelliProject
