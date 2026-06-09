import { Link } from 'react-router-dom'
import { ProjectSuggestions } from '../../components/ProjectSuggestions'
import { ProjectCaseHeroActions } from '../../components/ProjectCaseHeroActions'
import { ProjectDemoLink } from '../../components/ProjectDemoLink'
import { ProjectDemoVideo } from '../../components/ProjectDemoVideo'
import { ProjectFeatureScreens } from '../../components/ProjectFeatureScreens'

const CATEGORY = 'Piattaforma gestionale interna'
const TITLE = 'WorkHub'
const EXTERNAL_URL = 'https://github.com/Claudiasals/workhub'
const DEMO_SECTION_ID = 'workhub-demo'

const CONTRIBUTION_ITEMS = [
  {
    title: 'Lavoro in team su un gestionale completo',
    text: 'sviluppo coordinato di frontend, backend e database.',
  },
  {
    title: 'Interfaccia React modulare e responsive',
    text: 'navigazione protetta e schermate diverse in base al ruolo dell’utente.',
  },
  {
    title: 'Backend con Node.js, Express e MongoDB',
    text: 'autenticazione JWT, 2FA opzionale, validazione Joi e middleware di sicurezza.',
  },
  {
    title: 'Funzionalità operative per la gestione aziendale',
    text: 'personale, turni, clienti, magazzino, ordini, ticket e comunicazioni interne.',
  },
  {
    title: 'Integrazioni UI',
    text: 'calendario dei turni, grafici sui ticket, esportazione in PDF ed Excel.',
  },
]

const OVERVIEW_CARDS = [
  {
    title: 'Il punto di partenza',
    text:
      'Un’azienda con più reparti operativi ha bisogno di una vista unica su personale, magazzino, ordini e ticket: senza un gestionale integrato, ogni attività resta isolata e le informazioni si disallineano.',
  },
  {
    title: 'La soluzione sviluppata',
    text:
      'WorkHub riunisce in un’unica piattaforma dashboard, calendario, anagrafiche, magazzino, ordini e ticketing. L’interfaccia è stata progettata per l’usabilità: navigazione chiara, flussi operativi lineari e viste role-based per admin e dipendenti.',
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
      'La overview riunisce indicatori riepilogativi, bacheca eventi e calendario turni con viste giorno, settimana e mese. Il dipendente consulta la dashboard in sola lettura; l’amministratore accede alla stessa area con funzioni aggiuntive, come la modifica degli eventi in bacheca.',
    tags: 'Overview · react-big-calendar · Role-based · Joi',
    screens: [
      {
        src: '/images/projects/workhub/warehouse.png',
        alt: 'Overview dipendente WorkHub con indicatori riepilogativi, bacheca eventi, prodotti in esaurimento e calendario turni',
        label: 'Overview dipendente',
      },
      {
        src: '/images/projects/workhub/admin-board-edit.png',
        alt: 'Overview amministratore WorkHub con modifica evento sulla bacheca aziendale',
        label: 'Overview amministratore',
      },
    ],
  },
  {
    title: 'Gestione magazzino',
    text:
      'Gestione inventario con elenco prodotti, filtri e soglie di riordino; caricamento giacenza tramite drawer, verifica disponibilità in altre sedi, scheda prodotto con export PDF e conferma dell’operazione aggiornata.',
    tags: 'Pipeline magazzino · jspdf',
    screens: [
      {
        src: '/images/projects/workhub/product-detail.png',
        alt: 'Magazzino WorkHub con elenco prodotti, filtri, giacenze, promo e soglie di riordino',
        label: 'Elenco prodotti',
      },
      {
        src: '/images/projects/workhub/overview-light.png',
        alt: 'Magazzino WorkHub con drawer Aggiungi Giacenza: prodotto cercato, quantità da aggiungere e conferma incremento stock',
        label: 'Aggiungi giacenza',
      },
      {
        src: '/images/projects/workhub/ticketing.png',
        alt: 'Magazzino WorkHub con modale di conferma Operazione completata dopo l’aggiornamento giacenza',
        label: 'Conferma giacenza',
      },
      {
        src: '/images/projects/workhub/customers.png',
        alt: 'Magazzino WorkHub con drawer Disponibilità in altre Sedi per verificare lo stock di un prodotto in un altro punto vendita',
        label: 'Disponibilità altre sedi',
      },
      {
        src: '/images/projects/workhub/admin-overview.png',
        alt: 'Scheda prodotto WorkHub aperta dal magazzino con dati anagrafici, immagine, note allegati ed export PDF',
        label: 'Scheda prodotto',
      },
    ],
  },
  {
    title: 'Gestione ordini',
    text:
      'Elenco ordini con ricerca e ordinamento; espandendo una riga si vedono dettaglio prodotto, breakdown per cliente, totali e giacenza disponibile. Dal pulsante «Nuovo Ordine» si apre un drawer per selezionare punto vendita, prodotto, quantità totale e clienti associati.',
    tags: 'Pipeline ordini · Joi',
    screens: [
      {
        src: '/images/projects/workhub/settings.png',
        alt: 'Modulo Ordini WorkHub con tabella ordini in lavorazione, corriere, totale e pulsante Nuovo Ordine',
        label: 'Elenco ordini',
      },
      {
        src: '/images/projects/workhub/order-detail-expanded.png',
        alt: 'Dettaglio ordine WorkHub espanso con prodotto, clienti associati, quantità, totali e giacenza disponibile',
        label: 'Dettaglio ordine',
      },
      {
        src: '/images/projects/workhub/order-new-drawer.png',
        alt: 'Modulo Ordini WorkHub con drawer Nuovo Ordine per punto vendita, prodotto, quantità e clienti',
        label: 'Nuovo ordine',
      },
    ],
  },
  {
    title: 'Gestione ticketing',
    text:
      'Sistema di richieste interne: l’utente consulta i ticket aperti e chiusi e ne apre di nuovi; l’amministratore visualizza andamento e lista completa con grafici, filtri per intervallo date, utente e stato.',
    tags: 'Pipeline ticketing · MUI Charts',
    screens: [
      {
        src: '/images/projects/workhub/admin-personale.png',
        alt: 'Modulo Ticket WorkHub con elenco ticket aperti e chiusi e pulsante Apri ticket',
        label: 'I miei ticket',
      },
      {
        src: '/images/projects/workhub/orders-detail.png',
        alt: 'Modulo Ticket WorkHub con drawer Apri ticket per inserire titolo e descrizione della richiesta',
        label: 'Apri ticket',
      },
      {
        src: '/images/projects/workhub/admin-ticket-analytics.png',
        alt: 'Vista admin Ticket WorkHub con grafico andamento ticket, lista completa e filtri per data, utente e stato',
        label: 'Ticketing admin',
      },
      {
        src: '/images/projects/workhub/admin-ticket-date-filter.png',
        alt: 'Modulo Ticket admin WorkHub con modale per selezionare l’intervallo date del filtro',
        label: 'Filtro ticket',
      },
    ],
  },
  {
    title: 'Sicurezza e accessi',
    text:
      'Login con autenticazione a due fattori opzionale e area impostazioni per password, abilitazione 2FA, anagrafica utente, lingua e tema predefinito.',
    tags: 'Login · Settings · JWT · 2FA · Joi',
    screens: [
      {
        src: '/images/projects/workhub/employee-profile.png',
        alt: 'Schermata di login WorkHub con campo opzionale per codice 2FA',
        label: 'Login con 2FA',
      },
      {
        src: '/images/projects/workhub/admin-ticket.png',
        alt: 'Impostazioni WorkHub con modifica password, 2FA, anagrafica utente, lingua e tema chiaro/scuro',
        label: 'Impostazioni account',
      },
    ],
  },
  {
    title: 'UI/UX',
    text:
      'Switch IT/EN e dark/light mode attivabile dall’header: il tema scuro adatta tutti gli elementi dell’interfaccia mantenendo leggibilità e coerenza visiva su tutta la piattaforma.',
    tags: 'i18n · Dark/Light Mode',
    screens: [
      {
        src: '/images/projects/workhub/overview-dark-mode.png',
        alt: 'Overview WorkHub in dark mode con indicatori riepilogativi, bacheca, prodotti in esaurimento e calendario turni',
        label: 'Dark mode',
      },
    ],
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
            Progetto di gruppo svolto per concludere il percorso Full Stack Web Developer:
            un gestionale che centralizza personale, turni, clienti, magazzino, ordini e ticket,
            con interfaccia role-based per admin e dipendenti.
          </p>
          <p className="project-case-intro__desc mt-4">
            Capstone di corso in team: abbiamo progettato e sviluppato la piattaforma end-to-end con
            React sul frontend, API Express e MongoDB, autenticazione, ruoli e moduli operativi per
            simulare un gestionale aziendale reale.
          </p>
        </header>

        <ProjectCaseHeroActions>
          <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner btn-primary-inner--spectrum">
              <span className="btn-primary-text">Repository GitHub →</span>
            </span>
          </a>
          <ProjectDemoLink sectionId={DEMO_SECTION_ID} className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Guarda la demo</span>
            </span>
          </ProjectDemoLink>
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
            WorkHub rappresenta il progetto conclusivo del percorso Full Stack Web Developer e
            sintetizza le competenze maturate nello sviluppo full stack. Architettura, convenzioni e
            stile dell&apos;interfaccia sono stati definiti insieme all&apos;avvio del progetto; il
            lavoro è stato poi ripartito per moduli del gestionale (personale, clienti, magazzino,
            ordini, ticket, dashboard), con ogni componente del gruppo responsabile del proprio ambito
            end-to-end — componenti React, logica frontend, endpoint Express, modelli e query
            MongoDB — integrando tutto nelle API REST condivise.
          </p>
          <ul className="project-case-checklist space-y-4">
            {CONTRIBUTION_ITEMS.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>: {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section
          id={DEMO_SECTION_ID}
          className="project-case-video section-scroll-anchor"
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
            WorkHub supporta le principali attività operative dell&apos;azienda attraverso un unico
            gestionale. La piattaforma include una dashboard con indicatori riepilogativi su
            magazzino, ordini, personale e prodotti da riordinare, e calendario integrato per
            visualizzare turni ed eventi aziendali. Sono presenti moduli dedicati alla gestione dei
            clienti, del magazzino, degli ordini e dei ticket, con strumenti di analisi riservati
            agli amministratori. Ogni sezione
            di questa pagina presenta uno specifico modulo attraverso schermate reali
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
              Per questo progetto abbiamo utilizzato uno stack full stack con React, Vite, Tailwind
              CSS, Redux Toolkit, Node.js, Express e MongoDB, scelto per sviluppare un gestionale
              interno modulare e strutturato.
            </p>
            <p>
              React, Vite e Tailwind CSS sono stati usati per costruire interfacce riutilizzabili per
              dashboard, tabelle, form e aree riservate con viste differenziate per admin e
              dipendenti. Redux Toolkit e React Router hanno gestito stato globale, routing protetto e
              collegamento tra i moduli.
            </p>
            <p>
              Node.js ed Express hanno permesso di sviluppare API REST, autenticazione JWT, ruoli,
              validazioni, middleware di sicurezza e logiche legate a ordini, inventario, ticket ed
              eventi aziendali. MongoDB ha supportato la gestione flessibile dei dati relativi a
              utenti, turni, clienti, prodotti, ordini e ticket.
            </p>
            <p>
              Questo stack ci ha permesso di lavorare in team su un percorso completo,
              dall&apos;interfaccia alle logiche server, fino all&apos;integrazione end-to-end dei moduli.
            </p>
          </div>
        </section>

        <ProjectCaseHeroActions className="project-detail-actions">
          <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner btn-primary-inner--spectrum">
              <span className="btn-primary-text">Repository GitHub →</span>
            </span>
          </a>
          <ProjectDemoLink sectionId={DEMO_SECTION_ID} className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Guarda la demo</span>
            </span>
          </ProjectDemoLink>
        </ProjectCaseHeroActions>

        <ProjectSuggestions currentSlug="workhub" />
      </article>
    </div>
  </main>
)

export default WorkHubProject
