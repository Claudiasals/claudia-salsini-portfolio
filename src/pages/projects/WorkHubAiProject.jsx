import { Link } from 'react-router-dom'
import { ProjectSuggestions } from '../../components/ProjectSuggestions'
import { ProjectCaseHeroActions } from '../../components/ProjectCaseHeroActions'
import { ProjectFeatureScreens } from '../../components/ProjectFeatureScreens'

const CATEGORY = 'Piattaforma gestionale AI-enabled'
const TITLE = 'WorkHub +AI'
const EXTERNAL_URL = 'https://github.com/Claudiasals/workhub'
const WORKHUB_CASE_URL = '/progetti/workhub'

const CONTRIBUTION_ITEMS = [
  {
    title: 'Modular AI layer on existing platform',
    text:
      'integration of dedicated endpoints and shared UI components, senza riscrivere i moduli operativi già in produzione nel team capstone project.',
  },
  {
    title: 'Dashboard operativa unificata (admin e user)',
    text:
      'KPI per ruolo, grafico vendite multi-serie (fatturato, ordini, nuovi clienti), calendario unico con toggle Turni / Eventi e documenti aziendali — stesso design system, viste filtrate per sede lato dipendente.',
  },
  {
    title: 'LLM architecture with heuristic fallbacks',
    text:
      'OpenAI-compatible client lato server, JSON-structured prompts e local heuristic logic quando la chiave API non è configurata — i fallback garantiscono che la demo portfolio resti funzionante senza LLM.',
  },
  {
    title: 'Design system AI riutilizzabile',
    text:
      'AiInsightPanel, badge «AI live», alert per severità, etichette priorità/categoria ticket e stati di loading condivisi tra ticketing, clienti, magazzino e dashboard.',
  },
  {
    title: 'Cross-module Decision Support System',
    text:
      'Centro operativo AI che incrocia magazzino, ordini, ticket, turni e clienti; operational suggestions con deep link alle sezioni del gestionale.',
  },
  {
    title: 'Targeted operational automation',
    text:
      'ticket classification alla creazione, admin reply assistant, insights sui ticket aperti, shift analysis (alert only), event communication generation, customer insights con promo ed email B2C.',
  },
]

const AI_INTEGRATIONS = [
  {
    area: 'Centro operativo AI',
    route: 'Dashboard admin',
    endpoint: 'POST /ai/business/overview',
    funzione:
      'Sintesi alert e insight su magazzino, ticket, vendite, turni e clienti. Severità, area e deep link al modulo corretto. LLM arricchisce il testo se configurato.',
  },
  {
    area: 'Analisi turni',
    route: 'Centro operativo AI (dashboard admin)',
    endpoint: 'POST /ai/shifts/analyze · POST /ai/business/overview',
    funzione:
      'Rileva fasce scoperte, sovraccarichi, conflitti ferie/permessi e squilibri — aggregati nel Centro operativo (2 alert visibili, resto su «Mostra altri»). Il calendario resta per consultazione e modifica turni.',
  },
  {
    area: 'Generatore comunicazioni',
    route: 'Calendario dashboard (admin, modalità Eventi)',
    endpoint: 'POST /ai/communications/generate',
    funzione:
      'Trasforma parole chiave in titolo, sintesi e testo completo per eventi/riunioni aziendali, pronto da salvare nel calendario.',
  },
  {
    area: 'Ticket classification',
    route: 'Creazione ticket (dipendente)',
    endpoint: 'POST /ai/tickets/classify',
    funzione:
      'Priorità, categoria, riassunto e suggerimento operativo salvati sul ticket alla creazione.',
  },
  {
    area: 'Insight ticket admin',
    route: 'Area ticket admin',
    endpoint: 'POST /ai/tickets/insights',
    funzione:
      'Alert su ticket vecchi, priorità alta, picchi per categoria e carico per dipendente; insight su tempi di risoluzione e trend.',
  },
  {
    area: 'Assistente risposta ticket',
    route: 'Dettaglio ticket admin',
    endpoint: 'POST /ai/tickets/reply',
    funzione:
      'Genera bozze di risposta professionali a partire da keyword dell’admin, pronte da copiare nel thread.',
  },
  {
    area: 'Insight clienti e promo',
    route: 'Scheda cliente / checkout ordini',
    endpoint: 'POST /ai/customers/insights',
    funzione:
      'Profilo commerciale, insight su categorie e frequenza, fino a 3 promo personalizzate sul catalogo non ancora acquistato.',
  },
  {
    area: 'Email promo B2C',
    route: 'Scheda cliente (admin)',
    endpoint: 'POST /ai/customers/promo-email',
    funzione:
      'Subject e body email promo in IT/EN basati sulla promo selezionata.',
  },
  {
    area: 'Suggerimenti magazzino',
    route: 'Modulo magazzino (admin)',
    endpoint: 'POST /ai/warehouse/suggestions',
    funzione:
      'Riordino urgente, stock sotto soglia, trasferimenti tra sedi e anomalie, ordinati per severità.',
  },
]

const ROADMAP_ITEMS = [
  {
    title: 'Ottimizzare sales metrics in dashboard',
    text:
      'Previsto: KPI vendite più robusti, filtri per sede/categoria e allineamento con il Centro operativo; pannello dedicato agli alert su calo prodotto/sede.',
  },
  {
    title: 'AI dedicata su calo vendite per prodotto e sede',
    text:
      'Il Centro operativo segnala già cali di categoria e prodotti fermi via heuristics; manca un pannello vendite con alert mirati (es. −40% prodotto/sede, sedi sottoperformanti) e on-demand refresh come in magazzino e turni.',
  },
  {
    title: 'Affinare alert turni e copertura',
    text:
      'Tarare soglie di sovraccarico e integrare meglio ferie approvate nel calendario visivo, non solo negli alert testuali.',
  },
]

const OVERVIEW_CARDS = [
  {
    title: 'Sviluppo autonomo del layer AI',
    text:
      'WorkHub nasce come capstone di gruppo; WorkHub +AI è un’estensione che ho progettato e implementato da sola — layer AI, API `/ai`, fallback euristici e integrazione UI nei moduli esistenti, senza riscrivere il gestionale base.',
  },
  {
    title: 'Cosa cambia con l’AI',
    text:
      'Non sostituisce i flussi CRUD esistenti: li arricchisce con automatic classification, contextual insights, reorder suggestions, shift analysis e generated promo communications — con badge che distingue output LLM da local heuristics (fallback demo).',
  },
  {
    title: 'Dashboard rinnovata',
    text:
      'Admin: KPI, Centro operativo AI (alert turni inclusi), grafico vendite e calendario unificato turni/eventi. User: stessa struttura visiva con dati filtrati per sede, turni personali e senza pannelli riservati all’admin.',
  },
  {
    title: 'Tech stack AI',
    technologies: [
      'OpenAI-compatible API',
      'LLM JSON prompts',
      'Node.js · Express',
      'React · Redux',
      'Heuristic fallbacks',
      'AiInsightPanel',
    ],
  },
]

const FEATURES = [
  {
    title: 'Dashboard admin: overview, calendario e documenti',
    text:
      'La overview admin riunisce KPI, Centro operativo AI (alert cross-modulo con «Mostra altri»), grafico vendite multi-serie, calendario turni/eventi e sezione documenti aziendali — tutto nello stesso design system.',
    tags: 'BusinessOverviewPanel · DashboardCalendar · SalesTrendChart · CompanyDocuments',
    screens: [
      {
        src: '/images/projects/workhub/ai-admin-overview-calendario-documenti.png',
        alt: 'Overview admin WorkHub con calendario turni pomeridiani e sezione Documenti e Comunicazioni',
        label: 'Calendario e documenti',
      },
      {
        src: '/images/projects/workhub/ai-admin-overview-centro-operativo.png',
        alt: 'Overview admin WorkHub con Centro operativo AI, alert operativi e grafico andamento vendite',
        label: 'Centro operativo AI e vendite',
      },
      {
        src: '/images/projects/workhub/ai-admin-overview-turni.png',
        alt: 'Overview admin WorkHub con calendario Turni settimanali mattina e pomeriggio popolato',
        label: 'Turni settimanali',
      },
    ],
  },
  {
    title: 'Ticketing: insights e classificazione',
    text:
      'In area admin il pannello «AI Insights & Alerts» analizza i ticket aperti (aging, priorità AI, trend per categoria). Alla creazione, l’AI classifica priorità e categoria; nel dettaglio ticket l’assistente risposta genera bozze da keyword admin.',
    tags: 'TicketAiInsightsPanel · Classification · Reply assistant',
    screens: [
      {
        src: '/images/projects/workhub/ai-admin-ticket.png',
        alt: 'Area ticket admin WorkHub con pannello AI Insights & Alerts, filtri e lista ticket classificati',
        label: 'Ticketing admin',
      },
    ],
  },
  {
    title: 'Insight clienti e promo personalizzate',
    text:
      'Nella scheda cliente il pannello «AI Customer Insights» legge lo storico ordini e propone fino a tre smart promotions con sconto, motivazione e pulsante per generare email promo B2C — via LLM o heuristic template in demo.',
    tags: 'CustomerAiInsights · Promo email · POST /ai/customers/insights',
    screens: [
      {
        src: '/images/projects/workhub/ai-admin-customer.png',
        alt: 'Scheda cliente admin WorkHub con pannello AI Customer Insights, profilo e smart promotions',
        label: 'AI Customer Insights',
      },
    ],
  },
  {
    title: 'Suggerimenti AI magazzino',
    text:
      'Nel modulo magazzino il pannello «Suggerimenti AI magazzino» segnala esaurimenti, stock sotto soglia e trasferimenti consigliati tra sedi, ordinati per severità, con refresh manuale e badge AI o heuristic.',
    tags: 'Warehouse AI · AiAlertList · POST /ai/warehouse/suggestions',
    screens: [
      {
        src: '/images/projects/workhub/warehouse-ai-suggestions.png',
        alt: 'Magazzino WorkHub con pannello Suggerimenti AI e alert stock critico',
        label: 'Suggerimenti AI magazzino',
      },
    ],
  },
]

const STACK_HIGHLIGHTS = [
  {
    title: 'Backend AI service layer',
    text:
      'Router `/ai` con controller dedicati, `llmClient` OpenAI-compatible e servizi per ticket, clienti, magazzino, turni e business overview — ognuno con LLM path + heuristic fallback.',
    tags: 'Node.js · Express · fetch · JSON schema prompts',
  },
  {
    title: 'Frontend AI components',
    text:
      'Libreria condivisa `AiInsightPanel`, badge live, liste alert ordinabili per severità e componenti specializzati per ticket, clienti e dashboard — integrati nei moduli esistenti senza duplicare layout.',
    tags: 'React · Redux · Tailwind CSS · Phosphor Icons',
  },
  {
    title: 'Resilience & demo mode',
    text:
      'Se `AI_API_KEY` manca, il gestionale usa local heuristics per la demo (`ticketAiClassification`, `customerAiAnalyzer`, `businessOverviewAnalyzer`), mantenendo UX e badge «heuristic».',
    tags: 'Graceful degradation · Demo tickets · i18n IT/EN',
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
            WorkHub +AI: layer AI sviluppato in autonomia sul capstone di gruppo
          </h1>
          <p className="project-case-intro__desc">
            Dopo il capstone project di gruppo ho sviluppato autonomamente WorkHub +AI,
            progettando e implementando il layer di intelligenza artificiale, le API dedicate,
            il sistema di fallback euristico e l’integrazione nei moduli esistenti — ticketing,
            clienti, magazzino, dashboard e generazione comunicazioni interne.
          </p>
          <p className="project-case-intro__desc mt-4">
            Il gestionale base (personale, turni, ordini, CRUD condivisi) resta il lavoro del team
            ed è documentato nella{' '}
            <Link to={WORKHUB_CASE_URL} className="text-sky-400 underline-offset-2 hover:underline">
              case study WorkHub
            </Link>
            . Questa pagina riguarda solo la parte AI che ho costruito io: architettura modulare
            LLM + heuristics, componenti UI condivisi e Decision Support System per gli admin.
          </p>
          <p className="project-case-intro__desc mt-4 opacity-90">
            <strong>Nota:</strong> il lavoro è in evoluzione. Sono previste ottimizzazioni su sales
            metrics e un modulo AI dedicato alle criticità per prodotto e sede (vedi sezione
            «Prossimi passi»).
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
        </ProjectCaseHeroActions>

        <section className="project-case-overview-cards" aria-label="Contesto, evoluzione e stack AI">
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

        <section aria-labelledby="workhub-ai-evolution">
          <p className="project-case-section-label">Evoluzione del prodotto</p>
          <h2
            id="workhub-ai-evolution"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Come ho portato WorkHub ad essere AI-enabled
          </h2>
          <p className="project-case-body">
            Dopo il rilascio del gestionale di gruppo ho analizzato dove l’admin perdeva tempo —
            triage manuale dei ticket, risposte ripetitive, KPI sparsi tra moduli e promo generiche
            — e dove l’interfaccia esponeva informazioni senza tradurle in azione concreta.
            L’obiettivo non era aggiungere badge «AI» a caso: volevo che ogni area della dashboard,
            ogni metrica e ogni insight fosse funzionale, ancorata ai dati già presenti in MongoDB.
            Ho progettato un AI layer che si aggancia alle REST API esistenti con dedicated endpoints
            e componenti UI coerenti col design system WorkHub — per accelerare il lavoro dell’admin,
            alleggerire i flussi operativi del dipendente e, sul piano commerciale, orientare scelte
            più mirate su clienti, magazzino e vendite.
          </p>
          <ul className="project-case-checklist space-y-4">
            {CONTRIBUTION_ITEMS.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>: {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="workhub-ai-architecture">
          <p className="project-case-section-label">Architecture</p>
          <h2
            id="workhub-ai-architecture"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            LLM + heuristics: always operational
          </h2>
          <p className="project-case-body">
            Ogni feature AI segue lo stesso contratto: il server tenta una JSON-structured LLM call;
            se la chiave API non è configurata o la risposta non è valida, entra in gioco
            heuristic logic calibrata sui dati WorkHub — pensata soprattutto per la demo del portfolio,
            così chi visita o clona il repo vede pannelli AI operativi anche senza API key. Sul frontend ogni output espone la
            provenienza tramite badge — così demo, sviluppo locale e produzione con modello reale
            condividono la stessa interfaccia senza sorprese per l’utente.
          </p>
        </section>

        <section aria-labelledby="workhub-ai-features">
          <p className="project-case-section-label">AI integrations</p>
          <h2
            id="workhub-ai-features"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Dove l’AI entra nel gestionale
          </h2>
          <p className="project-case-body">
            Ogni blocco mostra una schermata reale in cui il pannello o l’assistente AI è visibile
            in piattaforma — non widget senza integrazione AI (es. il grafico vendite resta analytics
            standard; le ottimizzazioni AI su sales metrics sono nei «Prossimi passi»).
          </p>
          <ProjectFeatureScreens features={FEATURES} />
        </section>

        <section aria-labelledby="workhub-ai-integrations-list">
          <p className="project-case-section-label">Integration map</p>
          <h2
            id="workhub-ai-integrations-list"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Tutte le integrazioni AI nel dettaglio
          </h2>
          <p className="project-case-body">
            Ogni feature espone badge «AI live» o «heuristic» sul frontend. Nessuna modifica
            automatica a turni, stock o ticket: solo classifications, alert, draft replies e suggestions.
          </p>
          <ul className="project-case-checklist space-y-4 mt-6">
            {AI_INTEGRATIONS.map((item) => (
              <li key={item.area}>
                <strong>{item.area}</strong>
                <span className="block text-sm opacity-80 mt-1">
                  {item.route} · <code className="text-sky-300">{item.endpoint}</code>
                </span>
                <span className="block mt-1">{item.funzione}</span>
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
            Modifiche ancora da apportare
          </h2>
          <p className="project-case-body">
            La base AI-enabled è operativa, ma restano margini di miglioramento sui sales data e
            sulla predictive analysis per sedi e prodotti in calo.
          </p>
          <ul className="project-case-checklist space-y-4">
            {ROADMAP_ITEMS.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>: {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="project-case-stack" aria-labelledby="workhub-ai-stack">
          <p className="project-case-section-label">Stack tecnologico</p>
          <h2
            id="workhub-ai-stack"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Stack dell’evoluzione AI
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
              L’evoluzione AI si appoggia allo stack full stack già descritto nella case study
              WorkHub — React, Redux, Vite, Tailwind, Node.js, Express e MongoDB — esteso con un
              client LLM compatibile OpenAI, JSON-oriented prompt engineering e server-side services
              per ogni dominio applicativo.
            </p>
            <p>
              Sul frontend i pannelli AI riutilizzano superfici e token visivi del gestionale;
              sul backend le route `/ai` sono protette da JWT authentication e, dove necessario,
              da admin permissions — ad esempio per la generazione email promo verso i clienti.
            </p>
          </div>
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
        </ProjectCaseHeroActions>

        <ProjectSuggestions currentSlug="workhub-ai" />
      </article>
    </div>
  </main>
)

export default WorkHubAiProject
