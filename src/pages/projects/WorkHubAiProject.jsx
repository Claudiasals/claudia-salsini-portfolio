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
    title: 'Vendite: individuare i punti critici',
    text:
      'Analisi dei prodotti in calo e suggerimenti su promo, riordino o assortimento per sede e categoria.',
  },
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
      'Cursor · AI assistants',
      'LLM API',
    ],
  },
]

const FEATURES = [
  {
    title: 'Centro operativo',
    text:
      'Il centro operativo raccoglie in dashboard, a portata di mano, gli alert prioritari delle diverse aree e rimanda direttamente ai moduli di competenza per velocizzare il flusso di lavoro.',
    tags: 'Dashboard · Alert operativi · UX admin',
    screens: [
      {
        src: '/images/projects/workhub/ai-admin-overview-centro-operativo.png',
        alt: 'Overview admin WorkHub con Centro operativo AI e grafico andamento vendite',
        label: 'Centro operativo e vendite',
      },
      {
        src: '/images/projects/workhub/ai-admin-overview-calendario-documenti.png',
        alt: 'Overview admin WorkHub con sezione Documenti e Comunicazioni',
        label: 'Documenti e comunicazioni',
      },
      {
        src: '/images/projects/workhub/ai-admin-overview-turni.png',
        alt: 'Overview admin WorkHub con calendario turni ed eventi',
        label: 'Calendario con turni ed eventi',
      },
    ],
  },
  {
    title: 'Comunicazione e ticketing',
    text:
      'Classificare le richieste, individuare i ritardi e rispondere con messaggi ripetitivi richiede tempo all’admin. In cima all’area ticket compaiono suggerimenti operativi sul backlog dei ticket aperti, sulle priorità da gestire e sulle categorie con più richieste in sospeso. Alla creazione di un ticket l’AI ne imposta la priorità e la tipologia. Inoltre la risposta assistita genera una bozza professionale da poche parole chiave, pronta da inviare o copiare. Riduce i passaggi manuali necessari per classificare una richiesta e preparare una prima risposta.',
    tags: 'Ticketing · Suggerimenti operativi · Risposta assistita AI',
    screens: [
      {
        src: '/images/projects/workhub/ai-admin-ticket.png',
        alt: 'Area ticket WorkHub con suggerimenti operativi AI, filtri priorità e lista richieste',
        label: 'Comunicazione e ticketing',
      },
    ],
  },
  {
    title: 'Clienti',
    text:
      'Lo storico ordini da solo non si traduce in azioni commerciali concrete. Dalla scheda cliente l’AI legge categorie preferite, frequenza d’acquisto e spesa media, suggerisce fino a tre promo mirate da proporre al cliente e genera il testo dell’email promo da inviare.',
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
    title: 'Magazzino',
    text:
      'Esaurimenti e squilibri tra sedi emergono solo scorrendo l’inventario riga per riga. Il pannello AI evidenzia immediatamente i prodotti critici, evitando il controllo manuale dell’intero inventario, segnala le soglie basse e suggerisce riordini o trasferimenti tra punti vendita, ordinati per urgenza per intervenire subito dove necessario.',
    tags: 'Magazzino · Alert operativi',
    screens: [
      {
        src: '/images/projects/workhub/warehouse-ai-suggestions.png',
        alt: 'Magazzino WorkHub con KPI, pannello Suggerimenti AI e tabella inventario con alert stock',
        label: 'Suggerimenti magazzino',
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
      'API Express con servizi AI modulari: centro operativo incrociato, insight e classificazione ticket, risposte assistite, analisi clienti e promo, suggerimenti magazzino, turni e bozze per comunicazioni interne. Modelli linguistici lato server, affiancati da euristiche locali così la piattaforma resta utilizzabile anche in demo senza API key.',
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
            Dopo aver realizzato WorkHub come progetto finale di gruppo, ho progettato
            autonomamente un’estensione AI per esplorare come automazione e modelli linguistici
            potessero migliorare ticketing, magazzino, CRM e processi decisionali.
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
            Ogni integrazione affronta un’esigenza operativa concreta. Le schermate mostrano come
            pannelli e suggerimenti si integrano nei moduli già presenti in WorkHub.
          </p>
          <ProjectFeatureScreens features={FEATURES} />
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
              L’estensione si appoggia allo stack del capstone (React, Redux, Node.js, Express e
              MongoDB), con servizi AI dove aggiungevano valore percepibile in interfaccia.
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
            Oggi l’AI analizza turni e vendite, ma non crea turni in autonomia né propone interventi
            commerciali strutturati su tutti i prodotti in calo.
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
