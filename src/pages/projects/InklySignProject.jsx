import { Link } from 'react-router-dom'
import { ProjectSuggestions } from '../../components/ProjectSuggestions'
import { ProjectCaseHeroActions } from '../../components/ProjectCaseHeroActions'
import { ProjectDemoLink } from '../../components/ProjectDemoLink'
import { ProjectDemoVideo } from '../../components/ProjectDemoVideo'
import { ProjectFeatureScreens } from '../../components/ProjectFeatureScreens'

const CATEGORY = 'SaaS B2B per contratti online e firme digitali'
const TITLE = 'InklySign'
const EXTERNAL_URL = 'https://inklysign.it/login'
const DEMO_SECTION_ID = 'inklysign-demo'

const CONTRIBUTION_ITEMS = [
  'progettazione UI in Figma, con brief condivisi col team tech Mirai Bay su modifiche e nuove funzionalità',
  'sviluppo frontend con Javascript, React, Vite e Tailwind CSS: schermate, flussi, dashboard, contratti, template e firma online',
  'sviluppo backend con PHP, Laravel e MySQL: application logic, dati e API',
  'deploy e messa online dell’applicazione',
  'sviluppo di quanto concordato nei brief, con integrations e miglioramenti proposti in autonomia',
]

const OVERVIEW_CARDS = [
  {
    title: 'Il punto di partenza',
    text:
      'Il processo di gestione contratti richiedeva un flusso più centralizzato, capace di ridurre i passaggi manuali e rendere più chiaro lo stato di ogni documento, dall’invio alla firma.',
  },
  {
    title: 'La soluzione sviluppata',
    text:
      'InklySign riunisce in un’unica piattaforma anagrafica clienti, template contrattuali, invio documenti, firma OTP in presenza o da remoto e monitoraggio dell’avanzamento tramite dashboard.',
  },
  {
    title: 'Tech stack',
    technologies: [
      'JavaScript',
      'React',
      'Vite',
      'Tailwind CSS',
      'PHP',
      'Laravel',
      'MySQL',
    ],
  },
]

const FEATURES = [
  {
    title: 'Admin dashboard',
    text:
      'Dopo il login la dashboard riassume i dati operativi e lo storico dei clienti: andamento delle firme, attività recenti e stato delle pratiche in un’unica vista. La sidebar laterale permette di spostarsi tra contratti, clienti, template e impostazioni senza uscire dall’applicazione.',
    tags: 'KPI contratti · Storico attività',
    src: '/images/projects/inklysign/dashboard.png',
    alt: 'Dashboard InklySign con menu laterale, grafico contratti firmati e attività recenti',
  },
  {
    title: 'Creazione contratto',
    text:
      'La piattaforma permette di avviare l’invio di un contratto in due modi: selezionando un template già configurato, da completare con i dati del cliente, oppure caricando un PDF esterno già pronto. In questo modo InklySign gestisce sia contratti creati direttamente in piattaforma sia documenti personalizzati da inviare in firma.',
    tags: 'Template · PDF custom · Dati cliente',
    src: '/images/projects/inklysign/new-contract.png',
    alt: 'Creazione contratto con menu template contratto, dati cliente e opzione carica contratto custom in PDF',
  },
  {
    title: 'Firma digitale con OTP',
    text:
      'La firma può avvenire in presenza, tramite pad e conferma OTP via email, oppure da remoto, tramite link ricevuto dal cliente. In entrambi i casi il sistema guida l’utente nella lettura, verifica e firma del contratto, notificando poi l’azienda a operazione conclusa.',
    tags: 'Firma in presenza · Firma remota · Verifica OTP',
    src: '/images/projects/inklysign/signature-otp.png',
    alt: 'Firma digitale InklySign con pad firma, accettazione termini e verifica OTP via email',
  },
  {
    title: 'Gestione template',
    text: 'Personalizzazione di intestazione, contenuti legali, privacy policy e termini associati ai documenti, con variabili riutilizzabili su più contratti.',
    tags: 'Variabili dinamiche · Termini · Privacy policy',
    screens: [
      {
        src: '/images/projects/inklysign/contract-templates.png',
        alt: 'Editor template contratti con variabili dinamiche per intestazione e corpo documento',
        label: 'Intestazione e variabili',
      },
      {
        src: '/images/projects/inklysign/terms-privacy.png',
        alt: 'Configurazione termini e condizioni e privacy policy collegati al template',
        label: 'Contenuti legali e privacy',
      },
    ],
  },
  {
    title: 'Area super-admin',
    text:
      'Pannello riservato al Super Admin, separato dall’esperienza delle singole aziende: da qui si governano impostazioni globali, notifiche, anagrafica aziende e regole comuni a tutta la piattaforma. Nelle Impostazioni puoi gestire le FAQ mostrate nel chatbox della pagina di login (creazione, modifica, eliminazione e scelta di quali domande fissare in evidenza nel widget). Nella stessa area configuri i codici sconto: nome interno, codice promozionale, percentuale, intervallo di validità e stato attivo, con azioni rapide per modifica, invio e disattivazione.',
    tags: 'Gestione FAQ e codici sconto',
    screens: [
      {
        src: '/images/projects/inklysign/super-admin-faq.png',
        alt: 'Area Super Admin InklySign: gestione FAQ del chatbox login con domande visibili nel widget',
        label: 'FAQ chatbox login',
      },
      {
        src: '/images/projects/inklysign/super-admin-discount-codes.png',
        alt: 'Area Super Admin InklySign: elenco codici sconto e modale creazione nuovo codice',
        label: 'Codici sconto',
      },
    ],
  },
]

const STACK_HIGHLIGHTS = [
  {
    title: 'Frontend modulare',
    text: 'React, Vite e Tailwind CSS hanno permesso di costruire un’interfaccia responsive, ordinata e facilmente estendibile.',
    tags: 'JavaScript · React · Vite · Tailwind CSS',
  },
  {
    title: 'Backend strutturato',
    text: 'Laravel ha reso più solida la gestione di ruoli, API, validazioni, documenti, notifiche e flussi di firma.',
    tags: 'PHP · Laravel',
  },
  {
    title: 'Dati e persistenza',
    text:
      'MySQL per organizzare in modo relazionale aziende, utenti, clienti, contratti, template, abbonamenti e storico delle azioni.',
    tags: 'MySQL',
  },
  {
    title: 'Deploy',
    text:
      'Messa online dell’applicazione su server gestito tramite Plesk: configurazione dominio, ambiente PHP/Laravel e database in produzione.',
    tags: 'VPS · Plesk',
  },
]

const InklySignProject = () => {
  return (
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
              InklySign: applicazione full stack per la gestione dei contratti digitali
            </h1>
            <p className="project-case-intro__desc">
              Piattaforma SaaS B2B sviluppata durante lo stage in Mirai Bay per semplificare e
              digitalizzare il ciclo contrattuale aziendale, dalla creazione del documento alla firma
              con OTP.
            </p>
            <p className="project-case-intro__desc mt-4">
              L’applicazione permette di gestire clienti, template dinamici, invii per la firma e
              avanzamento dei contratti da un’unica interfaccia operativa, riducendo i passaggi
              manuali e rendendo più controllabile l’intero processo.
            </p>
          </header>

          <ProjectCaseHeroActions>
            <ProjectDemoLink sectionId={DEMO_SECTION_ID} className="btn-primary">
              <span className="btn-primary-inner">
                <span className="btn-primary-text">Guarda la demo</span>
              </span>
            </ProjectDemoLink>
            <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
              <span className="btn-primary-inner btn-primary-inner--spectrum">
                <span className="btn-primary-text">Visita InklySign →</span>
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

          <section aria-labelledby="inklysign-contribution">
            <p className="project-case-section-label">Il mio ruolo</p>
            <h2
              id="inklysign-contribution"
              className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
            >
              Come ho realizzato InklySign
            </h2>
            <p className="project-case-body">
              Durante lo stage presso Mirai Bay ho sviluppato l&apos;applicativo InklySign
              occupandomi di tutte le fasi del progetto:
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
            aria-labelledby="inklysign-demo-heading"
          >
            <div className="project-case-video__intro">
              <p className="project-case-section-label">Demo progetto</p>
              <h2
                id="inklysign-demo-heading"
                className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
              >
                Una panoramica del flusso InklySign
              </h2>
              <p className="project-case-body">
                La piattaforma completa è accessibile solo dopo login. Per questo ho inserito una
                breve demo video che mostra le principali schermate e il flusso di utilizzo del
                prodotto.
              </p>
            </div>

            <ProjectDemoVideo
              src="/videos/inklysign-demo.mp4"
              poster="/images/projects/inklysign/inklysign-video-poster.png"
            />
          </section>

          <section aria-labelledby="inklysign-features">
            <p className="project-case-section-label">Funzionalità principali</p>
            <h2
              id="inklysign-features"
              className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
            >
              Cosa fa la piattaforma
            </h2>
            <p className="project-case-body">
              InklySign riunisce in un solo strumento ciò che serve per lavorare con i contratti:
              anagrafica clienti, elenco contratti e stato di ogni pratica, sempre consultabili dalla
              piattaforma. Puoi creare e personalizzare tutti i template di cui hai bisogno
              (intestazione, corpo del documento, termini e privacy) e ritrovarli pronti quando
              arriva un nuovo invio in firma: li scegli dal menu, senza ricostruire il documento da
              zero. Per firmare, usi un template della piattaforma o un PDF già esistente; il cliente
              può firmare in presenza o da remoto, con verifica OTP. Le schermate seguenti raccontano
              questi passaggi così come li ho progettati e sviluppati.
            </p>
            <ProjectFeatureScreens features={FEATURES} />
          </section>

          <section className="project-case-stack" aria-labelledby="inklysign-stack">
            <p className="project-case-section-label">Stack tecnologico</p>
            <h2
              id="inklysign-stack"
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
                Per questo progetto ho utilizzato uno stack full stack con React, Vite, Tailwind CSS,
                PHP, Laravel e MySQL, scelto per sviluppare una piattaforma web strutturata e scalabile.
              </p>
              <p>
                React, Vite e Tailwind CSS sono stati usati per costruire un&apos;interfaccia modulare e
                riutilizzabile, mentre Laravel ha gestito autenticazione, ruoli, API, upload dei
                documenti, generazione dei PDF e flussi di firma. MySQL ha permesso di organizzare i
                dati relativi ad aziende, utenti, clienti, contratti, template e abbonamenti.
              </p>
              <p>
                Questo stack mi ha permesso di seguire l&apos;intero sviluppo del progetto,
                dall&apos;interfaccia al database, fino al rilascio in produzione su server gestito con
                Plesk.
              </p>
            </div>
          </section>

          <ProjectCaseHeroActions className="project-detail-actions">
            <ProjectDemoLink sectionId={DEMO_SECTION_ID} className="btn-primary">
              <span className="btn-primary-inner">
                <span className="btn-primary-text">Guarda la demo</span>
              </span>
            </ProjectDemoLink>
            <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
              <span className="btn-primary-inner btn-primary-inner--spectrum">
                <span className="btn-primary-text">Visita InklySign →</span>
              </span>
            </a>
          </ProjectCaseHeroActions>

          <ProjectSuggestions currentSlug="inklysign" />
        </article>
      </div>
    </main>
  )
}

export default InklySignProject
