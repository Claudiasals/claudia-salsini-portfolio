import { Link } from 'react-router-dom'
import { ProjectSuggestions } from '../../components/ProjectSuggestions'
import { ProjectCaseHeroActions } from '../../components/ProjectCaseHeroActions'
import { ProjectDemoLink } from '../../components/ProjectDemoLink'
import { ProjectDemoVideo } from '../../components/ProjectDemoVideo'
import { ProjectFeatureScreens } from '../../components/ProjectFeatureScreens'

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
    text: 'progettazione dei prompt, servizi su modelli linguistici ed euristiche di fallback quando l’API non è configurata.',
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
    text: 'uso di Cursor per accelerare prototipazione e sviluppo, con revisione e adattamento manuale del codice prima dell’integrazione.',
  },
]

const ROADMAP_ITEMS = [
  {
    title: 'Turni: proposta generata dall’AI',
    text:
      'Bozza settimanale che considera ferie, festività e riposi, con approvazione del responsabile prima dell’inserimento.',
  },
]

const OVERVIEW_CARDS = [
  {
    title: 'Il punto di partenza',
    text:
      'WorkHub è una piattaforma gestionale che centralizza i flussi di lavoro. Servivano però dati più centralizzati su magazzino e stock, maggiore velocità nella gestione dei ticket e un uso più efficace dei dati commerciali: ottimizzare le vendite era fondamentale, ma ordini e storico clienti non venivano sfruttati abbastanza per orientare le scelte in negozio.',
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
    pairRow: true,
    text:
      'Il centro operativo AI raccoglie in dashboard alert e insight incrociati su magazzino, ticket, vendite, clienti e turni. Gli alert operativi segnalano stock critico per sede e ticket ad alta priorità aperti da oltre 7 giorni, con link diretti ai moduli di competenza; gli insight strategici sintetizzano lo stato complessivo della piattaforma.',
    tags: 'Dashboard · Alert operativi · UX admin',
    screens: [
      {
        src: '/images/projects/workhub/dashboard-admin-centro-operativo.png',
        alt: 'Centro operativo AI con alert stock critico in magazzino, ticket ad alta priorità aperti da oltre 7 giorni e insight strategici sulle vendite con link ai moduli',
        label: 'Centro operativo AI',
      },
    ],
  },
  {
    title: 'Insight vendite',
    pairRow: true,
    text:
      'Pannello dedicato alle vendite che traduce i dati in insight azionabili: trend di fatturato e ordini, crescita dei nuovi clienti, stock critico su prodotti in accelerazione (con suggerimento di riordino entro 7 giorni) e link «Apri modulo» verso magazzino o altre aree. A differenza del grafico andamento vendite, che visualizza i dati, qui l’AI interpreta l’andamento e propone interventi concreti.',
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
    layout: 'side',
    text:
      'In cima all’area ticket compaiono suggerimenti operativi sul backlog (ticket aperti da oltre 7 giorni, alta priorità ancora aperti, categorie in crescita). La lista integra filtri per periodo, stato Aperti/Chiusi e priorità AI assegnata alla creazione del ticket, con etichette di urgenza e reparto per intervenire subito sulle richieste più critiche.',
    tags: 'Ticketing · Suggerimenti operativi · Classificazione AI',
    screens: [
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
    text:
      'Sulla pagina elenco, i suggerimenti commerciali analizzano lo storico acquisti e la segmentazione del portafoglio (es. campagne di riattivazione per clienti inattivi da 90+ giorni o comunicazioni dedicate al cluster Premium). Nella scheda singolo cliente, l’AI restituisce profilo ricorrente, insight su categoria preferita e frequenza acquisti, più Smart Promotions con promo personalizzate, selezione tra più proposte e invio email o testo da mostrare in negozio.',
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
    text:
      'Il pannello Suggerimenti AI magazzino evidenzia esaurimenti e soglie basse per sede (es. KALLAX esaurito a Napoli Afragola o Milano San Giuliano, LACK Tavolino sotto soglia), con distinzione tra riordino urgente e valutazione riordino, ordinati per urgenza così l’admin interviene subito dove serve.',
    tags: 'Magazzino · Alert operativi',
    screens: [
      {
        src: '/images/projects/workhub/warehouse-ai-suggestions.png',
        alt: 'Suggerimenti AI magazzino con KALLAX esaurito per sede, LACK Tavolino sotto soglia e riordino urgente consigliato',
        label: 'Suggerimenti magazzino',
      },
    ],
  },
  {
    title: 'Ordini',
    layout: 'side',
    text:
      'In cima alla pagina ordini, il pannello Suggerimenti Riordino collega ordini attivi e stock: segnala prodotti esauriti o sotto soglia per sede, propone riordini urgenti e ricorda di verificare lo stock sui prodotti più ordinati nel periodo, così chi gestisce le spedizioni interviene prima che le consegne si blocchino.',
    tags: 'Ordini · Magazzino · Alert operativi',
    screens: [
      {
        src: '/images/projects/workhub/ordini-suggerimenti-riordino.png',
        alt: 'Suggerimenti Riordino con esaurimenti KALLAX, stock sotto soglia per sede IKEA e verifica ordini attivi nel periodo',
        label: 'Suggerimenti riordino',
      },
    ],
  },
]

const OTHER_INTEGRATIONS = [
  {
    title: 'Andamento vendite',
    layout: 'side',
    text:
      'Il grafico mostra l’andamento degli ultimi mesi attraverso tre indicatori: fatturato, numero di ordini e nuovi clienti acquisiti, con filtri temporali a 3, 6 e 12 mesi. È stato inserito nell’overview admin per offrire una lettura più immediata dei dati commerciali e affiancare il pannello Insight vendite, rafforzando il collegamento tra dashboard, CRM e andamento degli ordini.',
    tags: 'Dashboard · Vendite · Analytics',
    screens: [
      {
        src: '/images/projects/workhub/dashboard-admin-vendite.png',
        alt: 'Grafico andamento vendite con fatturato, ordini e nuovi clienti, filtro 6 mesi e andamento gen–giu 2026 nella dashboard admin',
        label: 'Grafico andamento vendite',
      },
    ],
  },
  {
    title: 'Overview admin',
    text:
      'Ho riorganizzato l’overview admin per rendere più chiaro l’accesso alle informazioni principali: in alto Centro operativo AI e Documenti e comunicazioni, al centro calendario con turni ed eventi, in basso andamento vendite e Insight vendite.',
    tags: 'Dashboard · UX · Information architecture',
  },
  {
    title: 'Calendario turni ed eventi',
    layout: 'side',
    text:
      'Calendario integrato nell’overview con viste settimana, mese e giorno, toggle tra turni ed eventi aziendali, navigazione per periodo e griglia oraria con fasce colorate (mattina, pomeriggio, sera). Per l’admin è disponibile la modifica rapida delle assegnazioni; per il dipendente il filtro «I miei turni».',
    tags: 'Dashboard · Calendario · Turni',
    screens: [
      {
        src: '/images/projects/workhub/ai-admin-overview-turni.png',
        alt: 'Calendario turni settimanali con vista settimana giu 15–21, toggle Turni ed eventi, fasce orarie colorate e assegnazioni dipendenti',
        label: 'Turni settimanali',
      },
    ],
  },
  {
    title: 'Documenti e comunicazioni',
    layout: 'side',
    text:
      'Sezione dedicata a policy, circolari e comunicazioni interne: ricerca, lettura in drawer e gestione contenuti per l’admin, con badge di priorità (Standard, Importante) e azioni Leggi, modifica ed elimina. Accessibile a tutto il personale direttamente dalla dashboard.',
    tags: 'Dashboard · Comunicazioni interne',
    screens: [
      {
        src: '/images/projects/workhub/documenti-comunicazioni.png',
        alt: 'Documenti e comunicazioni con catalogo, procedura inventario, policy resi e manuale cassa, badge Standard e Importante, ricerca e pulsante Nuovo',
        label: 'Documenti e comunicazioni',
      },
    ],
  },
  {
    title: 'Conversione e fidelizzazione',
    layout: 'side',
    text:
      'Nella pagina Clienti ho aggiunto un riquadro di customer insights sul portafoglio: tasso di ritorno, confronto trimestrale sui nuovi clienti acquisiti e conteggio dei contatti inattivi da oltre 90 giorni, per individuare segmenti a rischio churn prima di passare ai suggerimenti commerciali AI.',
    tags: 'CRM · Analytics · Fidelizzazione',
    screens: [
      {
        src: '/images/projects/workhub/conversione-fidelizzazione.png',
        alt: 'Conversione e fidelizzazione con tasso di ritorno clienti 64%, calo nuovi clienti rispetto al trimestre precedente e 6 clienti inattivi da oltre 90 giorni',
        label: 'Customer insights',
      },
    ],
  },
  {
    title: 'Lista ticket',
    layout: 'side-reverse',
    text:
      'Ho riorganizzato la lista ticket admin con filtri per periodo, stato Aperti/Chiusi e priorità (Tutte, Urgente, Media, Bassa, Non classificato). Ogni riga mostra titolo, descrizione, etichette di urgenza e reparto, richiedente e data, con accesso rapido al drawer tramite «Gestisci».',
    tags: 'Ticketing · Filtri · UX lista',
    screens: [
      {
        src: '/images/projects/workhub/ticket-lista-filtri.png',
        alt: 'Lista ticket con filtro date, tab Aperti e Chiusi, filtri priorità, etichette URGENTE e reparto TECNICO e pulsante Gestisci',
        label: 'Lista ticket con filtri',
      },
    ],
  },
  {
    title: 'Drawer ticket admin',
    layout: 'side',
    text:
      'Ho riorganizzato il drawer di gestione ticket in sezioni verticali più leggibili: richiedente e descrizione in alto, pannello assegnazione reparto con suggerimento operativo e selezione manuale, area risposta assistita con generazione del messaggio da parole chiave e azioni salva o invia.',
    tags: 'Ticketing · UX · Drawer',
    screens: [
      {
        src: '/images/projects/workhub/ticket-drawer-assegnazione-risposta.png',
        alt: 'Drawer ticket con assegnazione reparto suggerita, reparto responsabile Tecnico e risposta assistita con generazione messaggio professionale',
        label: 'Drawer ticket admin',
      },
    ],
  },
  {
    title: 'Notifiche',
    layout: 'side',
    text:
      'Ho introdotto una campanella nella topbar per raccogliere gli aggiornamenti operativi più rilevanti in base al ruolo. I dipendenti visualizzano notifiche su ticket, ferie, permessi e turni; tutti gli utenti ricevono aggiornamenti su documenti, comunicazioni interne ed eventi in calendario. Ogni voce può essere segnata come letta senza interrompere il lavoro in corso.',
    tags: 'UX · Comunicazioni · Operatività',
    screens: [
      {
        src: '/images/projects/workhub/notifiche.png',
        alt: 'Pannello notifiche con badge 5 aggiornamenti, voci su nuovi eventi in calendario e azione Letta per ogni notifica',
        label: 'Centro notifiche',
      },
    ],
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
          <p className="project-case-intro__desc">
            Dopo aver realizzato WorkHub come progetto finale di gruppo, ho progettato autonomamente
            un’estensione AI che combina automazioni basate su regole e funzionalità supportate da
            modelli linguistici, applicate a ticketing, magazzino, CRM e processi decisionali per
            renderli più efficienti.
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

        <section aria-labelledby="workhub-ai-contribution">
          <p className="project-case-section-label">Il mio ruolo</p>
          <h2
            id="workhub-ai-contribution"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Come ho realizzato WorkHub +AI
          </h2>
          <p className="project-case-body">
            Ho sviluppato WorkHub +AI partendo dal progetto di fine corso WorkHub, analizzando i punti
            critici del gestionale originale e progettando integrazioni AI pensate per ottimizzare flussi
            di lavoro, vendite e usabilità della piattaforma:
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
          <p className="project-case-section-label">Ottimizzazioni della piattaforma</p>
          <h2
            id="workhub-ai-other"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            UX, dashboard e flussi operativi
          </h2>
          <p className="project-case-body">
            Oltre alle integrazioni AI, ho lavorato anche sull’evoluzione dell’overview admin e dei moduli
            ticket e clienti: grafici commerciali, calendario turni, comunicazioni interne, customer
            insights sul portafoglio, filtri sulla lista ticket, drawer di gestione e notifiche in-app.
            L’obiettivo era rendere la piattaforma più leggibile e coerente con i nuovi flussi introdotti
            da WorkHub +AI, distinguendo le ottimizzazioni di usabilità dalle funzionalità basate su
            modelli linguistici.
          </p>
          <ProjectFeatureScreens features={OTHER_INTEGRATIONS} />
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

          <div className="project-case-stack-narrative">
            <p>
              L’estensione si appoggia allo stack del capstone, con servizi AI integrati solo dove
              aggiungono valore operativo percepibile: ticket, clienti, magazzino, dashboard e
              comunicazioni interne.
            </p>
          </div>
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
            Per le vendite, Insight vendite è già integrato in dashboard. Il passo successivo riguarda
            i turni: oggi l’AI li analizza, ma non propone ancora una bozza settimanale da approvare.
          </p>
          <ul className="project-case-checklist space-y-4">
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
