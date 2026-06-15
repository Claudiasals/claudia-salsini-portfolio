import { Link } from 'react-router-dom'
import { ProjectSuggestions } from '../../components/ProjectSuggestions'
import { ProjectCaseHeroActions } from '../../components/ProjectCaseHeroActions'
import { ProjectFeatureScreens } from '../../components/ProjectFeatureScreens'

const CATEGORY = 'Estensione prodotto · AI-assisted development'
const TITLE = 'WorkHub +AI'
const EXTERNAL_URL = 'https://github.com/Claudiasals/workhub'
const WORKHUB_CASE_URL = '/progetti/workhub'

const CONTRIBUTION_ITEMS = [
  'Supporto decisionale per amministratori: nel Centro operativo della dashboard, alert su magazzino, ticket, turni e vendite, con link diretti al modulo giusto; l’andamento vendite in overview è l’unico elemento della dashboard con ricaduta sui clienti.',
  'Classificazione e gestione più rapida dei ticket: priorità e categoria suggerite alla creazione, alert su richieste in ritardo e bozze di risposta per l’admin.',
  'Insight operativi su clienti e magazzino: profilo commerciale, promo personalizzate e segnali su stock critico o trasferimenti consigliati tra sedi.',
  'Generazione assistita di comunicazioni interne: da poche parole chiave a testi pronti per eventi e riunioni aziendali.',
  'Suggerimenti contestuali nei flussi esistenti: pannelli informativi nel punto giusto del percorso, senza schermate parallele o passaggi in più.',
]

const USER_FEATURES = [
  {
    area: 'Centro operativo',
    per: 'Admin',
    dove: 'Dashboard',
    risultato:
      'Una vista unica su ciò che richiede attenzione oggi: stock, ticket, turni e vendite, con azioni rapide verso il modulo giusto.',
  },
  {
    area: 'Ticket',
    per: 'Admin e dipendente',
    dove: 'Modulo ticket',
    risultato:
      'Meno tempo su triage e risposte ripetitive: classificazione alla creazione, alert su priorità e aging, bozze di risposta modificabili dall’admin.',
  },
  {
    area: 'Clienti',
    per: 'Admin',
    dove: 'Scheda cliente',
    risultato:
      'Storico ordini tradotto in insight leggibili e fino a tre promo suggerite, con email promo generabile in un click.',
  },
  {
    area: 'Magazzino',
    per: 'Admin',
    dove: 'Modulo magazzino',
    risultato:
      'Alert su esaurimenti e soglie basse, con suggerimenti di riordino o trasferimento tra sedi ordinati per urgenza.',
  },
  {
    area: 'Comunicazioni evento',
    per: 'Admin',
    dove: 'Calendario eventi',
    risultato:
      'Comunicazioni interne per riunioni e appuntamenti aziendali partendo da keyword, pronte da revisionare e salvare.',
  },
  {
    area: 'Dashboard e calendario',
    per: 'Admin e dipendente',
    dove: 'Overview',
    risultato:
      'KPI, turni personali, eventi aziendali e documenti nello stesso design system — l’admin vede di più, il dipendente solo ciò che gli serve.',
  },
]

const ROADMAP_ITEMS = [
  {
    title: 'Vendite: individuare i punti critici',
    text:
      'Integrazione AI per ottimizzare le vendite: analisi dei prodotti in calo, segnalazione dei punti critici per sede o categoria e suggerimenti concreti su dove intervenire — promo, riordino o assortimento.',
  },
  {
    title: 'Turni: proposta generata dall’AI',
    text:
      'Integrazione AI per preparare una bozza di turni settimanali tenendo conto di ferie, festività, orari contrattuali e riposi. Il responsabile rivede la proposta e la approva prima che entri in vigore: nessuna creazione automatica senza conferma.',
  },
]

const OVERVIEW_CARDS = [
  {
    title: 'AI integrata nel gestionale',
    text:
      'Suggerimenti e alert compaiono nei moduli previsti per admin e dipendente — ticket, clienti, magazzino, dashboard — senza aprire sezioni separate o imparare nuove schermate.',
  },
  {
    title: 'Il mio ruolo nel progetto',
    text:
      'WorkHub è nato come capstone di gruppo. WorkHub +AI è l’estensione che ho progettato e sviluppato dopo il corso, dall’analisi delle esigenze all’integrazione in interfaccia.',
  },
  {
    title: 'Sviluppo con strumenti AI',
    text:
      'Ho usato Cursor, assistenti di coding e API su modelli linguistici per prototipare e implementare più rapidamente, validando e adattando il codice al prodotto finale.',
  },
  {
    title: 'Tecnologie',
    technologies: [
      'React · Redux',
      'Node.js · Express',
      'MongoDB',
      'Cursor · AI assistants',
      'LLM API',
    ],
  },
]

const FEATURES = [
  {
    title: 'Dashboard: meno dispersione, più orientamento',
    text:
      'L’admin apre la overview e trova subito KPI, Centro operativo con alert prioritizzati, andamento vendite, calendario turni/eventi e documenti — senza saltare tra moduli per capire la situazione.',
    tags: 'UX admin · Overview · Calendario',
    screens: [
      {
        src: '/images/projects/workhub/ai-admin-overview-calendario-documenti.png',
        alt: 'Overview admin WorkHub con sezione Documenti e Comunicazioni',
        label: 'Documenti e comunicazioni',
      },
      {
        src: '/images/projects/workhub/ai-admin-overview-centro-operativo.png',
        alt: 'Overview admin WorkHub con Centro operativo AI e grafico andamento vendite',
        label: 'Centro operativo e vendite',
      },
      {
        src: '/images/projects/workhub/ai-admin-overview-turni.png',
        alt: 'Overview admin WorkHub con calendario turni ed eventi',
        label: 'Calendario con turni ed eventi',
      },
    ],
  },
  {
    title: 'Ticket: triage e risposte più veloci',
    text:
      'Alla creazione il ticket riceve priorità e categoria suggerite; in area admin un pannello evidenzia richieste vecchie, picchi per categoria e carico operativo, con bozze di risposta partendo da poche parole chiave.',
    tags: 'Ticketing · Classificazione · Admin workflow',
    screens: [
      {
        src: '/images/projects/workhub/ai-admin-ticket.png',
        alt: 'Area ticket admin WorkHub con pannello AI Insights, filtri e lista ticket',
        label: 'Ticketing admin',
      },
    ],
  },
  {
    title: 'Clienti: da storico ordini a azioni commerciali',
    text:
      'Nella scheda cliente, insight su categorie preferite, frequenza e spesa media si traducono in promo personalizzate e testi email pronti da inviare — utili per chi vende, non solo per chi consulta dati.',
    tags: 'CRM · Promo · Customer insights',
    screens: [
      {
        src: '/images/projects/workhub/ai-admin-customer.png',
        alt: 'Scheda cliente admin WorkHub con pannello insight e smart promotions',
        label: 'Insight clienti',
      },
    ],
  },
  {
    title: 'Magazzino: criticità visibili subito',
    text:
      'Esaurimenti, soglie basse e anomalie tra sedi compaiono in un pannello dedicato, ordinato per urgenza, così l’admin sa dove intervenire senza scorrere l’intero inventario.',
    tags: 'Magazzino · Alert operativi',
    screens: [
      {
        src: '/images/projects/workhub/warehouse-ai-suggestions.png',
        alt: 'Magazzino WorkHub con pannello suggerimenti e alert stock',
        label: 'Suggerimenti magazzino',
      },
    ],
  },
]

const APPROACH_HIGHLIGHTS = [
  {
    title: 'Analisi prima del codice',
    text:
      'Ho individuato i punti in cui admin e dipendente avrebbero disperso più tempo — ticket, KPI sparsi, promo generiche, comunicazioni ripetitive — e ho tradotto ogni criticità in un miglioramento nell’interfaccia.',
    tags: 'Product thinking · User needs',
  },
  {
    title: 'Strumenti AI al servizio del prodotto',
    text:
      'Cursor e assistenti di coding per esplorare soluzioni e iterare velocemente; API su modelli linguistici dove serviva testo o classificazione; logica locale dove bastava per mantenere l’esperienza fluida anche in demo.',
    tags: 'Cursor · AI-assisted coding · LLM API',
  },
  {
    title: 'Interfaccia coerente',
    text:
      'Pannelli, badge e stati di caricamento condivisi tra moduli, stesso design system del gestionale base: nessun «modulo AI» separato da imparare.',
    tags: 'Design system · UX · React',
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
            WorkHub +AI
          </h1>
          <p className="project-case-intro__desc">
            Dopo WorkHub, il capstone project di gruppo, ho sviluppato WorkHub +AI, un’estensione
            della piattaforma per rendere più rapide e intuitive le operazioni tipiche di admin e
            dipendente, e per orientare meglio le vendite grazie a insight sui clienti e
            all’analisi dei dati in dashboard.
          </p>
          <p className="project-case-intro__desc mt-4">
            Ho integrato strumenti AI-assisted development e modelli linguistici nell’interfaccia
            esistente: classificazione ticket, alert su magazzino, insight sui clienti, promo
            suggerite e un Centro operativo che aiuta l’admin a individuare prima le priorità — senza
            stravolgere la struttura di navigazione esistente.
          </p>
          <p className="project-case-intro__desc mt-4 opacity-90">
            Il gestionale base resta documentato nella{' '}
            <Link to={WORKHUB_CASE_URL} className="text-sky-400 underline-offset-2 hover:underline">
              case study WorkHub
            </Link>
            {' '}
            (progetto di gruppo). Questa pagina riguarda solo l’evoluzione AI.
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

        <section className="project-case-overview-cards" aria-label="Contesto prodotto e approccio">
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
          <p className="project-case-section-label">Il mio contributo</p>
          <h2
            id="workhub-ai-contribution"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Cosa ho integrato
          </h2>
          <p className="project-case-body mb-2">
            Ho inserito integrazioni AI nei moduli del gestionale base — ticket, clienti, magazzino,
            dashboard — con pannelli e suggerimenti contestuali, senza stravolgere il flusso della
            piattaforma. In particolare:
          </p>
          <ul className="project-case-checklist space-y-4">
            {CONTRIBUTION_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="workhub-ai-features">
          <p className="project-case-section-label">Funzionalità in piattaforma</p>
          <h2
            id="workhub-ai-features"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Cosa cambia nell’interfaccia
          </h2>
          <p className="project-case-body">
            Schermate reali dell’applicazione: ogni sezione mostra come pannelli e suggerimenti AI
            si integrano nei moduli previsti per admin e dipendente, senza stravolgere la
            navigazione esistente.
          </p>
          <ProjectFeatureScreens features={FEATURES} />
        </section>

        <section aria-labelledby="workhub-ai-user-map">
          <p className="project-case-section-label">Mappa funzionale</p>
          <h2
            id="workhub-ai-user-map"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Dove si integra il valore dell'AI
          </h2>
          <p className="project-case-body">
            Nessuna modifica automatica a turni, stock o ticket senza conferma: l’AI classifica,
            suggerisce e genera bozze — le decisioni restano a chi conferma l’azione in piattaforma.
          </p>
          <ul className="project-case-checklist space-y-4 mt-6">
            {USER_FEATURES.map((item) => (
              <li key={item.area}>
                <strong>{item.area}</strong>
                <span className="block text-sm opacity-80 mt-1">
                  {item.per} · {item.dove}
                </span>
                <span className="block mt-1">{item.risultato}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="workhub-ai-learned">
          <p className="project-case-section-label">Cosa ho imparato</p>
          <h2
            id="workhub-ai-learned"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Prodotto, utenti e AI-assisted development
          </h2>
          <p className="project-case-body">
            Questo progetto rappresenta una delle mie prime esperienze di integrazione avanzata
            dell’AI all’interno di un prodotto web esistente. Mi ha permesso di sviluppare
            competenze nella progettazione di funzionalità orientate all’utente, nell’utilizzo di
            strumenti di AI-assisted coding, nella validazione del codice generato e nella
            trasformazione di esigenze di business in soluzioni utilizzabili dagli utenti finali.
          </p>
          <p className="project-case-body mt-4">
            L’aspetto che mi appassiona maggiormente è individuare problemi reali e utilizzare la
            tecnologia, inclusa l’intelligenza artificiale, per creare esperienze più semplici,
            veloci e intuitive.
          </p>
        </section>

        <section aria-labelledby="workhub-ai-approach">
          <p className="project-case-section-label">Come ho lavorato</p>
          <h2
            id="workhub-ai-approach"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Problem solving, UX e strumenti
          </h2>

          <ul className="project-case-stack-highlights">
            {APPROACH_HIGHLIGHTS.map((card) => (
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
              L’evoluzione si appoggia allo stack full stack già usato nel capstone — React,
              Redux, Node.js, Express e MongoDB — con integrazioni AI dove aggiungevano valore
              percepibile in interfaccia, non complessità tecnica in più.
            </p>
          </div>
        </section>

        <section aria-labelledby="workhub-ai-roadmap">
          <p className="project-case-section-label">Prossimi passi</p>
          <h2
            id="workhub-ai-roadmap"
            className="project-case-section-title text-2xl font-bold text-white md:text-3xl"
          >
            Margini di miglioramento
          </h2>
          <p className="project-case-body">
            Oggi l’AI analizza turni e vendite, ma non crea turni in autonomia né propone
            interventi commerciali strutturati su tutti i prodotti in calo. Le prossime integrazioni
            che vorrei sviluppare:
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
        </ProjectCaseHeroActions>

        <ProjectSuggestions currentSlug="workhub-ai" />
      </article>
    </div>
  </main>
)

export default WorkHubAiProject
