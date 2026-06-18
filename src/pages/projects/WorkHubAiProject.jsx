import { Link } from 'react-router-dom'
import { ProjectSuggestions } from '../../components/ProjectSuggestions'
import { ProjectCaseHeroActions } from '../../components/ProjectCaseHeroActions'
import { ProjectDemoLink } from '../../components/ProjectDemoLink'
import { ProjectDemoVideo } from '../../components/ProjectDemoVideo'
import { ProjectFeatureScreens } from '../../components/ProjectFeatureScreens'
import { ProjectInlineScreenshotCarousel } from '../../components/ProjectInlineScreenshotCarousel'

const CATEGORY = 'Estensione prodotto · AI-assisted development'
const TITLE = 'WorkHub +AI'
const EXTERNAL_URL = 'https://github.com/Claudiasals/workhub'
const WORKHUB_CASE_URL = '/progetti/workhub'
const DEMO_SECTION_ID = 'workhub-ai-demo'

const CONTRIBUTION_ITEMS = [
  {
    title: 'Analisi e progettazione',
    text: 'individuazione dei bisogni operativi, definizione dei casi d’uso AI per modulo e progettazione dei flussi.',
  },
  {
    title: 'Prompt e logica AI',
    text: 'progettazione dei prompt, integrazione di servizi basati su modelli linguistici ed euristiche di fallback quando l’API non è configurata.',
  },
  {
    title: 'Interfaccia e UX',
    text: 'inserimento di pannelli, badge e alert nei moduli esistenti, con componenti e stile coerenti con il gestionale base.',
  },
  {
    title: 'Frontend e backend',
    text: 'sviluppo delle funzionalità con React, Redux, Node.js, Express e MongoDB.',
  },
  {
    title: 'AI-assisted development',
    text: 'uso di Cursor per accelerare prototipazione e sviluppo, con revisione, adattamento manuale del codice e test prima dell’integrazione.',
  },
]

const ROADMAP_ITEMS = [
  {
    title: 'Turni: bozza settimanale generata dall’AI',
    text:
      'proposta automatica del piano turni che incrocia ferie, permessi, malattie, festività, riposi obbligatori, cambi turno e vincoli orari già presenti in piattaforma, lasciando al responsabile solo la revisione e l’approvazione prima dell’inserimento.',
  },
  {
    title: 'Magazzino: movimenti di giacenza collegati agli ordini',
    text:
      'oggi la giacenza si aggiorna manualmente. Il passo successivo è collegare il ricevimento merce agli ordini, con carico automatico in magazzino, movimenti tracciati e revisione dell’operatore prima della pubblicazione.',
  },
]

const OVERVIEW_CARDS = [
  {
    title: 'Il punto di partenza',
    text:
      'Il gestionale centralizzava i processi aziendali, ma molte attività richiedevano ancora analisi manuali: gestione dei ticket, monitoraggio delle scorte e utilizzo dei dati clienti per supportare le vendite. L’obiettivo era trasformare i dati già presenti nella piattaforma in indicazioni operative immediate.',
  },
  {
    title: 'La soluzione sviluppata',
    text:
      'Ho sviluppato WorkHub +AI per colmare questi gap. Alert e suggerimenti in magazzino, classificazione e risposta assistita sui ticket, centro operativo per le priorità incrociate e, sui clienti, promo mirate con suggerimenti di upselling basati sugli acquisti reali. Più dati al posto giusto, meno lavoro manuale, vendite guidate da ciò che la piattaforma sa già.',
  },
  {
    title: 'Tech stack',
    technologies: [
      'React · Redux',
      'Node.js · Express',
      'MongoDB',
      'Cursor · AI-assisted coding',
      'LLM API',
    ],
  },
]

const AI_FEATURES = [
  {
    title: 'Centro operativo',
    layout: 'side',
    imageCropBottom: 30,
    text: (
      <>
        Il centro operativo AI raccoglie in dashboard alert e insight incrociati su magazzino,
        ticket, vendite, clienti e turni. Gli <strong>alert operativi</strong> segnalano stock
        critico per sede (prodotti sotto soglia di riordino) e ticket ad alta priorità aperti da
        oltre 7 giorni, con link diretti ai moduli di competenza. Gli{' '}
        <strong>insight strategici</strong> incrociano i dati dei moduli attivi e ne ricavano una
        sintesi leggibile dello stato operativo con link al modulo correlato per l’analisi
        approfondita:
      </>
    ),
    highlightsStyle: 'copy',
    highlights: [
      {
        title: 'Attività commerciale',
        text: 'quanto sta lavorando il reparto vendite/ordini',
      },
      {
        title: 'Backlog ticket',
        text: 'quante richieste di assistenza sono ancora aperte',
      },
      {
        title: 'Stock sotto controllo',
        text: 'quanti prodotti il magazzino sta seguendo perché vicini alla soglia di riordino',
      },
    ],
    tags: 'Dashboard · Alert operativi · UX admin',
    screens: [
      {
        src: '/images/projects/workhub/dashboard-admin-centro-operativo.png',
        alt: 'Centro operativo AI con alert su criticità di stoccaggio e ticket ad alta priorità, e insight strategici su attività commerciale, backlog ticket e monitoraggio scorte con link ai moduli',
        label: 'Centro operativo AI',
      },
    ],
  },
  {
    title: 'Insight vendite',
    layout: 'side',
    imageMatchCopyHeight: true,
    text: (
      <>
        Il pannello Insight vendite, che si trova subito di fianco al grafico sull’andamento delle
        vendite, interpreta i dati del grafico e ne restituisce una <strong>sintesi operativa</strong>
        : confronto di fatturato e ordini rispetto ai periodi precedenti, andamento dell’acquisizione
        di nuovi clienti e, quando le vendite di un prodotto accelerano mentre lo stock scende,
        suggerimento di riordino entro 7 giorni.
      </>
    ),
    tags: 'Vendite · AI · Decisioni operative',
    screens: [
      {
        src: '/images/projects/workhub/insight-vendite-ai.png',
        alt: 'Insight vendite con fatturato +21%, ordini +13%, nuovi clienti in crescita e alert stock critico su LACK Tavolino e POÄNG Poltrona con link Apri modulo',
        label: 'Insight vendite',
      },
    ],
  },
  {
    title: 'Ticketing',
    text: (
      <>
        In cima all’area ticket compaiono{' '}
        <strong>suggerimenti operativi sul backlog</strong> (ticket aperti da oltre 7 giorni, ticket ad
        alta priorità ancora aperti e aree in cui è presente un aumento di richieste). La pagina
        ticketing integra filtri per periodo, stato Aperti/Chiusi e priorità AI assegnata alla
        creazione del ticket per intervenire subito sulle richieste più critiche. L’obiettivo è la
        riduzione del tempo necessario per la gestione dei ticket grazie alla classificazione
        automatica delle richieste e alla generazione assistita delle risposte.
      </>
    ),
    tags: 'Ticketing · Suggerimenti operativi · Classificazione AI · Drawer',
    screens: [
      {
        src: '/images/projects/workhub/ticket-drawer-assegnazione-risposta.png',
        alt: 'Drawer ticket con assegnazione reparto suggerita, reparto responsabile Tecnico e risposta assistita con generazione messaggio professionale',
        label: 'Drawer ticket admin',
      },
      {
        src: '/images/projects/workhub/ai-admin-ticket.png',
        alt: 'Suggerimenti AI ticket su backlog e priorità, lista ticket con filtri Aperti/Chiusi, priorità AI e pulsante Gestisci',
        label: 'Suggerimenti e lista ticket',
      },
    ],
  },
  {
    title: 'Clienti',
    layout: 'side-split',
    text: (
      <>
        I <strong>suggerimenti commerciali</strong> incrociano lo storico acquisti e la segmentazione
        del portafoglio clienti per proporre interventi concreti, ad esempio: campagne di
        riattivazione sui clienti inattivi da oltre novanta giorni, comunicazioni dedicate al cluster
        Premium e azioni win-back.
        <br />
        <br />
        Gli <strong>insight commerciali</strong>, presenti nella scheda cliente, analizzano il profilo
        e lo storico acquisti per individuare opportunità di cross-selling, upselling e
        riattivazione; l’operatore sceglie la promo tra le proposte dell’AI e può inviarla via email
        o mostrarla in negozio direttamente al cliente.
      </>
    ),
    tags: 'CRM · Segmentazione · Analytics · Promo personalizzate',
    screens: [
      {
        src: '/images/projects/workhub/suggerimenti-commerciali.png',
        alt: 'Suggerimenti commerciali su campagna riattivazione clienti inattivi e protezione cluster Premium con azioni win-back',
        label: 'Suggerimenti commerciali',
      },
      {
        src: '/images/projects/workhub/ai-admin-customer.png',
        alt: 'Scheda cliente con insight commerciali AI, profilo ricorrente, Smart Promotions e promo consigliata 15% su POÄNG Poltrona con invio promo',
        label: 'Insight e promo',
      },
    ],
  },
  {
    title: 'Magazzino',
    layout: 'side',
    text: (
      <>
        I <strong>suggerimenti AI magazzino</strong> monitorano le giacenze per sede e indicano quando
        intervenire sul riordino. Per ogni punto vendita distinguono due casi: il prodotto esaurito, con
        riordino urgente consigliato (es. KALLAX a Milano San Giuliano), e il prodotto sotto soglia, da
        valutare per il riordino (es. LACK Tavolino sotto 3/5). I suggerimenti sono ordinati per
        urgenza, così l’admin interviene prima sulle criticità più gravi e previene blocchi in stock e
        spedizioni.
      </>
    ),
    tags: 'Magazzino · Alert operativi',
    screens: [
      {
        src: '/images/projects/workhub/warehouse-ai-suggestions.png',
        alt: 'Suggerimenti AI magazzino con KALLAX esaurito per sede, LACK Tavolino sotto soglia e riordino urgente consigliato',
        label: 'Suggerimenti magazzino',
      },
    ],
  },
]

const PLATFORM_OPTIMIZATION_HIGHLIGHTS = [
  {
    title: 'Overview riorganizzata',
    text:
      'dashboard con priorità visive più chiare: documenti e comunicazioni in evidenza, calendario al centro, andamento vendite in basso; stesso design system del gestionale base ma con moduli più facili da raggiungere per una vista più centralizzata.',
  },
  {
    title: 'Documenti e comunicazioni',
    text: 'accesso diretto a policy, circolari e comunicazioni interne.',
  },
  {
    title: 'Calendario turni ed eventi',
    text:
      'calendario ottimizzato e unificato: la bacheca eventi è confluita nel calendario, con toggle Turni / Eventi, così riunioni e comunicazioni si leggono in vista settimana o mese invece che in un elenco separato.',
  },
  {
    title: 'Andamento vendite',
    text:
      'nuovo grafico multi-serie (fatturato, numero ordini, nuovi clienti), analytics standard sui dati commerciali.',
  },
  {
    title: 'Notifiche in-app',
    text:
      'campanella in topbar per tutti i ruoli: aggiornamenti su ticket, documenti, calendario e comunicazioni.',
  },
  {
    title: 'Lista ticket e customer insights',
    text:
      'lista ticket admin con filtri per periodo, stato Aperti/Chiusi e priorità, etichette di urgenza e reparto; in pagina Clienti, riquadro analytics su tasso di ritorno, nuovi clienti e contatti inattivi.',
  },
]

const PLATFORM_OPTIMIZATION_SLIDES = [
  {
    src: '/images/projects/workhub/documenti-comunicazioni.png',
    alt: 'Documenti e comunicazioni con catalogo, procedura inventario, policy resi e manuale cassa, badge Standard e Importante, ricerca e pulsante Nuovo',
    label: 'Documenti e comunicazioni',
  },
  {
    src: '/images/projects/workhub/ai-admin-overview-turni.png',
    alt: 'Calendario turni settimanali con vista settimana giu 15–21, toggle Turni ed eventi, fasce orarie colorate e assegnazioni dipendenti',
    label: 'Calendario turni ed eventi',
  },
  {
    src: '/images/projects/workhub/dashboard-admin-vendite.png',
    alt: 'Grafico andamento vendite con fatturato, ordini e nuovi clienti, filtro 6 mesi e andamento gen–giu 2026 nella dashboard admin',
    label: 'Andamento vendite',
  },
  {
    src: '/images/projects/workhub/dashboard-user-board.png',
    alt: 'Overview dipendente WorkHub con KPI filtrati per sede, grafico vendite in sola lettura e calendario turni integrato',
    label: 'Dashboard dipendente',
  },
  {
    src: '/images/projects/workhub/dashboard-user-calendario.png',
    alt: 'Calendario turni settimanale WorkHub lato dipendente con turni personali visibili e filtro I miei turni',
    label: 'Calendario dipendente',
  },
  {
    src: '/images/projects/workhub/notifiche.png',
    alt: 'Pannello notifiche con badge 5 aggiornamenti, voci su nuovi eventi in calendario e azione Letta per ogni notifica',
    label: 'Notifiche in-app',
  },
  {
    src: '/images/projects/workhub/ticket-lista-filtri.png',
    alt: 'Lista ticket con filtro date, tab Aperti e Chiusi, filtri priorità, etichette URGENTE e reparto TECNICO e pulsante Gestisci',
    label: 'Lista ticket con filtri',
  },
  {
    src: '/images/projects/workhub/conversione-fidelizzazione.png',
    alt: 'Conversione e fidelizzazione con tasso di ritorno clienti 64%, calo nuovi clienti rispetto al trimestre precedente e 6 clienti inattivi da oltre 90 giorni',
    label: 'Customer insights portafoglio',
  },
]

const STACK_HIGHLIGHTS = [
  {
    title: 'Frontend e UX',
    text:
      'Pannelli, badge e stati di caricamento condivisi tra moduli React, integrati nel design system del gestionale base senza un «modulo AI» separato.',
    tags: 'React · Redux · Design system',
  },
  {
    title: 'Backend e servizi AI',
    text:
      'API Express con servizi AI modulari: centro operativo incrociato, insight e classificazione ticket, risposte assistite, analisi clienti e promo, suggerimenti magazzino, turni e bozze per comunicazioni interne. Integrazione con modelli linguistici gestita lato backend, affiancata da euristiche locali così la piattaforma resta utilizzabile anche in demo senza API key.',
    tags: 'Node.js · Express · LLM API · Euristiche',
  },
  {
    title: 'AI-assisted development',
    text:
      'Cursor come IDE con AI integrata per accelerare prototipazione e sviluppo: esplorazione di approcci, bozze di componenti e servizi, correzione di errori e rifinitura dell’interfaccia. Uso consapevole da junior: l’AI propone e velocizza, ma analisi, scelte tecniche, test e revisione del codice restano in capo allo sviluppatore.',
    tags: 'Cursor · AI-assisted coding',
  },
]

const WorkHubAiProject = () => (
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
            WorkHub +AI: estensione intelligente del gestionale
          </h1>
          <p className="project-case-intro__desc mt-4">
            Evoluzione AI del gestionale WorkHub, progettata per trasformare dati operativi in
            suggerimenti concreti per ticketing, vendite, CRM e gestione del magazzino.
          </p>
          <p className="project-case-intro__desc mt-4">
            Dopo aver realizzato WorkHub come progetto finale di gruppo, ho progettato autonomamente
            un’estensione AI che combina automazioni basate su regole e funzionalità supportate da
            modelli linguistici, applicate a ticketing, magazzino, CRM e processi decisionali per
            renderli più efficienti.
          </p>
          <p className="project-case-intro__desc mt-4">
            L’estensione si appoggia allo stack del capstone, con servizi AI integrati solo dove
            aggiungono valore operativo percepibile: ticket, clienti, magazzino, dashboard e
            comunicazioni interne.
          </p>
          <p className="project-case-intro__desc mt-4 opacity-90">
            Il gestionale base è documentato nella{' '}
            <Link to={WORKHUB_CASE_URL} className="text-sky-400 underline-offset-2 hover:underline">
              case study WorkHub
            </Link>
            . Questa pagina riguarda solo l’evoluzione AI.
          </p>
        </header>

        <ProjectCaseHeroActions>
          <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner btn-primary-inner--spectrum">
              <span className="btn-primary-text">Repository GitHub →</span>
            </span>
          </a>
          <Link to={WORKHUB_CASE_URL} className="btn-secondary">
            <span className="btn-secondary-inner">Case study WorkHub base</span>
          </Link>
          <ProjectDemoLink sectionId={DEMO_SECTION_ID} className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Demo gestionale +AI</span>
            </span>
          </ProjectDemoLink>
        </ProjectCaseHeroActions>

        <section
          className="project-case-overview-cards project-case-overview-cards--tech-single-col"
          aria-label="Punto di partenza, soluzione e stack"
        >
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

        <section aria-labelledby="workhub-ai-contribution">
          <p className="project-case-section-label">Il mio ruolo</p>
          <h2
            id="workhub-ai-contribution"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Come ho realizzato WorkHub +AI
          </h2>
          <p className="project-case-body">
            Ho sviluppato WorkHub +AI partendo dal progetto di fine corso WorkHub, analizzando le aree
            del gestionale con maggiore potenziale di miglioramento e progettando integrazioni AI pensate
            per rendere più rapidi i flussi di lavoro, supportare le vendite e migliorare l’usabilità della
            piattaforma.
          </p>
          <ul className="project-case-checklist project-case-checklist--feature-copy">
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
          aria-labelledby="workhub-ai-demo-heading"
        >
          <div className="project-case-video__intro">
            <p className="project-case-section-label">Demo progetto</p>
            <h2
              id="workhub-ai-demo-heading"
              className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
            >
              Walkthrough della piattaforma AI-enabled
            </h2>
            <p className="project-case-body">
              Registrazione schermo del gestionale con le integrazioni AI: Centro operativo,
              ticket, clienti, magazzino e flussi admin/dipendente.
            </p>
          </div>

          <ProjectDemoVideo
            src="/videos/workhub-ai-demo.mp4"
            poster="/images/projects/workhub/workhub-ai-video-poster.png"
          />
        </section>

        <section aria-labelledby="workhub-ai-features">
          <p className="project-case-section-label">Funzionalità principali</p>
          <h2
            id="workhub-ai-features"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Integrazioni AI
          </h2>
          <p className="project-case-body">
            Ogni integrazione affronta un’esigenza operativa concreta e trasforma i dati del gestionale
            in indicazioni operative. Le schermate mostrano come pannelli e suggerimenti si integrano
            nei moduli già presenti in WorkHub.
          </p>
          <ProjectFeatureScreens features={AI_FEATURES} />
        </section>

        <section aria-labelledby="workhub-ai-other">
          <p className="project-case-section-label">Altre ottimizzazioni della piattaforma</p>
          <h2
            id="workhub-ai-other"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            UX, dashboard e flussi operativi
          </h2>
          <p className="project-case-body">
            Modifiche apportate per ottimizzare usabilità, leggibilità e accessibilità delle
            informazioni in piattaforma:
          </p>
          <ul className="project-case-checklist project-case-checklist--feature-copy">
            {PLATFORM_OPTIMIZATION_HIGHLIGHTS.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>: {item.text}
              </li>
            ))}
          </ul>
          <ProjectInlineScreenshotCarousel
            slides={PLATFORM_OPTIMIZATION_SLIDES}
            ariaLabel="Screenshot ottimizzazioni piattaforma"
          />
        </section>

        <section className="project-case-stack" aria-labelledby="workhub-ai-stack">
          <p className="project-case-section-label">Stack tecnologico</p>
          <h2
            id="workhub-ai-stack"
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
        </section>

        <section aria-labelledby="workhub-ai-roadmap">
          <p className="project-case-section-label">Prossimi passi</p>
          <h2
            id="workhub-ai-roadmap"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Integrazioni previste
          </h2>
          <p className="project-case-body">
            I prossimi sviluppi riguardano soprattutto turni e magazzino:
          </p>
          <ul className="project-case-feature-screens__highlights space-y-3">
            {ROADMAP_ITEMS.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>: {item.text}
              </li>
            ))}
          </ul>
        </section>

        <ProjectCaseHeroActions className="project-detail-actions">
          <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner btn-primary-inner--spectrum">
              <span className="btn-primary-text">Repository GitHub →</span>
            </span>
          </a>
          <Link to={WORKHUB_CASE_URL} className="btn-secondary">
            <span className="btn-secondary-inner">Torna a WorkHub base →</span>
          </Link>
          <ProjectDemoLink sectionId={DEMO_SECTION_ID} className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Demo gestionale +AI</span>
            </span>
          </ProjectDemoLink>
        </ProjectCaseHeroActions>

        <ProjectSuggestions currentSlug="workhub-ai" />
      </article>
    </div>
  </main>
)

export default WorkHubAiProject
