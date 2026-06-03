import { Link } from 'react-router-dom'
import { ProjectCaseHeroActions } from '../../components/ProjectCaseHeroActions'
import { ProjectDemoVideo } from '../../components/ProjectDemoVideo'
import { ProjectFeatureScreens } from '../../components/ProjectFeatureScreens'

const CATEGORY = 'SaaS B2B per contratti online e firme digitali'
const TITLE = 'InklySign'
const EXTERNAL_URL = 'https://inklysign.it/login'
const DEMO_SECTION_ID = 'inklysign-demo'

const CONTRIBUTION_ITEMS = [
  'progettazione UI in Figma, con brief condivisi col team tech Mirai Bay su modifiche e nuove funzionalità',
  'sviluppo frontend con Javascript, React, Vite e Tailwind CSS: schermate, flussi, dashboard, contratti, template e firma online',
  'sviluppo backend con PHP, Laravel e MySQL: logiche applicative, dati e API',
  'deploy e messa online dell’applicazione',
  'sviluppo di quanto concordato nei brief, con integrazioni e miglioramenti proposti in autonomia',
]

const OVERVIEW_CARDS = [
  {
    title: 'Tipo progetto',
    text: 'SaaS B2B / applicazione web full stack',
  },
  {
    title: 'Obiettivo',
    text: 'Semplificare il flusso contrattuale e la firma online',
  },
  {
    title: 'Ruolo',
    text: 'Sviluppo full stack: frontend, backend e deploy',
  },
]

const FEATURES = [
  {
    title: 'Dashboard gestionale',
    text: 'Panoramica su contratti, clienti, statistiche e attività recenti: una vista operativa per monitorare lo stato della piattaforma e intervenire rapidamente.',
    tags: 'React · Laravel · MySQL · Dashboard',
    src: '/images/projects/inklysign/dashboard.png',
    alt: 'Dashboard InklySign con metriche clienti, contratti firmati e storico recente',
  },
  {
    title: 'Creazione contratto',
    text: 'Flusso guidato per creare un contratto, selezionare cliente e template, compilare i dati e preparare il documento da inviare alla firma.',
    tags: 'React · Laravel · Form · Template',
    src: '/images/projects/inklysign/new-contract.png',
    alt: 'Form creazione nuovo contratto con rubrica clienti e campi anagrafici',
  },
  {
    title: 'Firma digitale con OTP',
    text: 'Firma da remoto tramite link sicuro, accettazione dei termini, firma manoscritta e verifica con codice OTP inviato via email.',
    tags: 'OTP · PDF · Firma digitale · Laravel',
    src: '/images/projects/inklysign/signature-otp.png',
    alt: 'Modale firma digitale con pad firma, accettazione termini e verifica OTP via email',
  },
  {
    title: 'Gestione template',
    text: 'Personalizzazione di intestazione, contenuti legali, privacy policy e termini associati ai documenti, con variabili riutilizzabili su più contratti.',
    tags: 'Laravel · PDF · Template · Privacy',
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
    text: 'Gestione interna della piattaforma: codici sconto, aziende, utenti e configurazioni globali per amministratori del sistema.',
    tags: 'Laravel · Ruoli · Multi-tenant · API',
    fallback:
      'Screenshot super-admin in preparazione (es. codici sconto). Anteprima del flusso nella demo video.',
  },
  {
    title: 'Accesso e assistenza',
    text: 'Pagina di accesso con area di supporto integrata: FAQ, contatti e assistenza disponibili già dal login.',
    tags: 'React · Auth · UX · Supporto',
    src: '/images/projects/inklysign/login-support-faq.png',
    alt: 'Modale assistenza InklySign con FAQ e contatti integrati nel flusso di accesso',
  },
]

const STACK_HIGHLIGHTS = [
  {
    title: 'Frontend modulare',
    text: 'React, Vite e Tailwind CSS hanno permesso di costruire un’interfaccia responsive, ordinata e facilmente estendibile.',
  },
  {
    title: 'Backend strutturato',
    text: 'Laravel ha reso più solida la gestione di ruoli, API, validazioni, documenti, notifiche e flussi di firma.',
  },
  {
    title: 'Dati e produzione',
    text: 'MySQL e l’architettura full stack hanno consentito di gestire dati persistenti, relazioni tra entità e rilascio reale dell’applicazione.',
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
              InklySign: piattaforma SaaS per contratti e firme digitali
            </h1>
            <p className="project-case-intro__desc">
              Case study dello stage in Mirai Bay: applicazione web per creare, inviare, firmare e
              monitorare contratti online, con dashboard operativa, template dinamici, gestione clienti
              e firma con OTP. Sviluppata su frontend, backend e deploy, con UI in Figma. Scope e
              priorità definiti con il team tech Mirai Bay.
            </p>
          </header>

          <ProjectCaseHeroActions>
            <a href={`#${DEMO_SECTION_ID}`} className="btn-primary">
              <span className="btn-primary-inner">
                <span className="btn-primary-text">Guarda la demo</span>
              </span>
            </a>
            <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-secondary">
              <span className="btn-secondary-inner">Visita InklySign →</span>
            </a>
          </ProjectCaseHeroActions>

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

          <section className="project-case-contribution mt-16" aria-labelledby="inklysign-contribution">
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
            className="project-case-video mt-16"
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

          <section className="mt-16" aria-labelledby="inklysign-features">
            <p className="project-case-section-label">Funzionalità principali</p>
            <h2
              id="inklysign-features"
              className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
            >
              Cosa fa la piattaforma
            </h2>
            <p className="project-case-body">
              Ogni funzionalità è descritta con il contesto applicativo e la schermata reale
              dell&apos;app: interfaccia, logica e flussi che ho implementato. Clicca
              l&apos;immagine per ingrandirla.
            </p>
            <ProjectFeatureScreens features={FEATURES} />
          </section>

          <section className="project-case-stack mt-16" aria-labelledby="inklysign-stack">
            <p className="project-case-section-label">Stack tecnologico</p>
            <h2
              id="inklysign-stack"
              className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
            >
              Stack tecnologico
            </h2>

            <div className="project-case-stack-narrative">
              <p>
                Per questo progetto ho utilizzato uno stack full stack basato su React, Vite,
                Tailwind CSS, PHP, Laravel e MySQL, scelto per costruire una piattaforma web
                strutturata, scalabile e adatta alla gestione di dati sensibili come clienti,
                contratti, firme e documenti.
              </p>
              <p>
                React mi ha permesso di sviluppare un&apos;interfaccia dinamica e modulare, con
                componenti riutilizzabili per dashboard, form, tabelle, flussi guidati e aree
                riservate. Vite ha reso più rapido il processo di sviluppo e build, migliorando la
                velocità di lavoro durante la realizzazione del frontend.
              </p>
              <p>
                Per lo stile ho scelto Tailwind CSS, utile per mantenere coerenza visiva tra le
                diverse schermate della piattaforma e costruire layout responsive senza appesantire
                il progetto con fogli di stile complessi.
              </p>
              <p>
                Sul backend, PHP e Laravel hanno fornito una struttura solida per gestire
                autenticazione, ruoli, API, logiche server, validazioni, upload dei documenti,
                generazione dei PDF e flussi legati alla firma. MySQL è stato utilizzato per la
                persistenza dei dati, consentendo di organizzare in modo relazionale aziende,
                utenti, clienti, contratti, template, abbonamenti e storico delle azioni.
              </p>
              <p>
                Questo stack mi ha permesso di lavorare su un percorso completo: dalla
                progettazione dell&apos;interfaccia alla gestione del database, dalle logiche
                applicative lato server fino al rilascio dell&apos;applicazione in ambiente di
                produzione.
              </p>
            </div>

            <ul className="project-case-stack-highlights">
              {STACK_HIGHLIGHTS.map((card) => (
                <li key={card.title} className="project-case-card project-case-card--compact">
                  <h3 className="project-case-card__title">{card.title}</h3>
                  <p className="project-case-card__text">{card.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="project-detail-actions mt-14">
            <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
              <span className="btn-primary-inner">
                <span className="btn-primary-text">Visita InklySign</span>
              </span>
            </a>
          </div>
        </article>
      </div>
    </main>
  )
}

export default InklySignProject
