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
    title: 'Dashboard gestionale',
    text:
      'Dopo il login si apre l’applicazione completa: nella schermata compare il menu laterale (dashboard, contratti, clienti, template, impostazioni) e, al centro, il riepilogo operativo. Il grafico mostra l’andamento dei contratti firmati nel tempo: serve a leggere subito se il volume di firme cresce, cala o resta stabile, a individuare picchi o cali e a capire se conviene intervenire (follow-up commerciali, verifica invii, effetto di promozioni o periodi più intensi). Accanto, l’elenco delle attività recenti riassume gli ultimi movimenti (contratti creati, inviati, firmati) senza aprire ogni sezione. Da questa vista si passa con un click alle altre aree del gestionale, restando nello stesso ambiente di lavoro.',
    tags: 'React · Laravel · MySQL · Dashboard',
    src: '/images/projects/inklysign/dashboard.png',
    alt: 'Dashboard InklySign con menu laterale, grafico contratti firmati e attività recenti',
  },
  {
    title: 'Creazione contratto',
    text:
      'Da qui avvii un nuovo invio in due modi. Con il template già creato in piattaforma: dal menu a tendina «Template contratto» scegli uno dei modelli che hai definito (intestazione, testo, termini); il sistema applica quel modello e ti chiede solo i dati del cliente da associare, senza riscrivere il contratto da zero. In alternativa, con «Carica contratto custom» carichi un PDF già pronto (ad esempio un accordo redatto altrove) e lo mandi in firma così com’è. In sintesi: puoi far firmare sia i contratti costruiti su InklySign, riutilizzando i template dal menu a tendina, sia documenti esterni già in PDF.',
    tags: 'React · Laravel · Form · Template · PDF',
    src: '/images/projects/inklysign/new-contract.png',
    alt: 'Creazione contratto con menu template contratto, dati cliente e opzione carica contratto custom in PDF',
  },
  {
    title: 'Firma digitale con OTP',
    text:
      'La firma funziona in due modalità. In presenza: il cliente firma a mano sul pad, accetta i termini e, per una verifica aggiuntiva, conferma l’operazione con il codice OTP ricevuto via email. Da remoto: il cliente riceve il link e le istruzioni per e-mail, accede con il proprio codice fiscale, legge il contratto e gli allegati se presenti, allega il documento d’identità, firma il contratto, inserisce l’OTP di verifica ricevuto per e-mail, infine conferma e il contratto viene mandato firmato all’azienda, che riceve una notifica sia per e-mail sia in piattaforma nella sezione notifiche. In entrambi i casi l’OTP collega la firma all’indirizzo email del firmatario.',
    tags: 'OTP · PDF · Firma digitale · Laravel',
    src: '/images/projects/inklysign/signature-otp.png',
    alt: 'Firma digitale InklySign con pad firma, accettazione termini e verifica OTP via email',
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
    text:
      'Pannello riservato al Super Admin, separato dall’esperienza delle singole aziende: da qui si governano impostazioni globali, notifiche, anagrafica aziende e regole comuni a tutta la piattaforma. Nelle Impostazioni puoi gestire le FAQ mostrate nel chatbox della pagina di login (creazione, modifica, eliminazione e scelta di quali domande fissare in evidenza nel widget). Nella stessa area configuri i codici sconto: nome interno, codice promozionale, percentuale, intervallo di validità e stato attivo, con azioni rapide per modifica, invio e disattivazione.',
    tags: 'Laravel · Ruoli · Multi-tenant · API',
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
    title: 'Dati e produzione',
    text: 'MySQL e l’architettura full stack hanno consentito di gestire dati persistenti, relazioni tra entità e rilascio reale dell’applicazione.',
    tags: 'MySQL',
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
            <a href={`#${DEMO_SECTION_ID}`} className="btn-primary">
              <span className="btn-primary-inner">
                <span className="btn-primary-text">Guarda la demo</span>
              </span>
            </a>
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
            className="project-case-video"
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
                Per questo progetto ho utilizzato uno stack full stack basato su React, Vite,
                Tailwind CSS, PHP, Laravel e MySQL, scelto per costruire una piattaforma web
                strutturata, scalabile e adatta alla gestione di dati, documenti e flussi applicativi
                complessi.
              </p>
              <p>
                React, Vite e Tailwind CSS hanno permesso di sviluppare un&apos;interfaccia modulare,
                con componenti riutilizzabili per dashboard, form, tabelle, flussi guidati e aree
                riservate. Vite ha reso più rapido il processo di sviluppo e build.
              </p>
              <p>
                PHP e Laravel hanno fornito una struttura solida per gestire autenticazione, ruoli,
                API, logiche server, validazioni, upload dei documenti, generazione dei PDF e flussi
                legati alla firma.
              </p>
              <p>
                MySQL ha supportato la persistenza dei dati, consentendo di organizzare in modo
                relazionale aziende, utenti, clienti, contratti, template, abbonamenti e storico
                delle azioni.
              </p>
              <p>
                Questo stack mi ha permesso di lavorare su un percorso completo: dalla progettazione
                dell&apos;interfaccia alla gestione del database, dalle logiche applicative lato server
                fino al rilascio dell&apos;applicazione in ambiente di produzione.
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
                <span className="btn-primary-text">Visita InklySign →</span>
              </span>
            </a>
          </ProjectCaseHeroActions>
        </article>
      </div>
    </main>
  )
}

export default InklySignProject
