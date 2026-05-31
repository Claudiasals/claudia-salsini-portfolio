import { Link } from 'react-router-dom'
import ProjectScreenshotCarousel from '../../components/ProjectScreenshotCarousel'

const CATEGORY = 'SaaS B2B per contratti online e firme digitali'
const TITLE = 'InklySign'
const EXTERNAL_URL = 'https://inklysign.it/login'

const SCREENSHOTS = [
  {
    src: '/images/projects/inklysign/landing-login.png',
    alt: 'Landing page e login InklySign con presentazione prodotto e form di accesso',
    caption: 'Landing e login',
  },
  {
    src: '/images/projects/inklysign/login-support-faq.png',
    alt: 'Modale assistenza InklySign con FAQ e contatti integrati nel flusso di accesso',
    caption: 'Assistenza e FAQ',
  },
  {
    src: '/images/projects/inklysign/dashboard.png',
    alt: 'Dashboard InklySign con metriche clienti, contratti firmati e storico recente',
    caption: 'Dashboard operativa',
  },
  {
    src: '/images/projects/inklysign/new-contract.png',
    alt: 'Form creazione nuovo contratto con rubrica clienti e campi anagrafici',
    caption: 'Nuovo contratto',
  },
  {
    src: '/images/projects/inklysign/contract-templates.png',
    alt: 'Editor template contratti con variabili dinamiche per intestazione e corpo documento',
    caption: 'Template e variabili',
  },
  {
    src: '/images/projects/inklysign/terms-privacy.png',
    alt: 'Configurazione termini e condizioni e privacy policy collegati al template',
    caption: 'Termini e privacy',
  },
  {
    src: '/images/projects/inklysign/signature-otp.png',
    alt: 'Modale firma digitale con pad firma, accettazione termini e verifica OTP via email',
    caption: 'Firma con OTP',
  },
  {
    src: '/images/projects/inklysign/email-notification.png',
    alt: 'Email automatica InklySign con PDF del contratto firmato in allegato',
    caption: 'Email con PDF firmato',
  },
  {
    src: '/images/projects/inklysign/admin-discount-codes.png',
    alt: 'Pannello super admin per gestione codici sconto e impostazioni piattaforma',
    caption: 'Area super admin',
  },
]

const InklySignProject = () => (
  <main className="min-h-screen bg-slate-950 text-white">
    <div className="page-under-navbar px-6 pb-20">
      <article className="project-case mx-auto max-w-6xl">
    <div className="project-case-header">
      <p className="project-case-header__label text-sm font-semibold uppercase tracking-[0.3em]">
        <span className="text-sky-400">{TITLE}</span>
        <span className="text-white"> | {CATEGORY}</span>
      </p>

      <Link to="/#projects" className="project-detail-back project-case-header__back">
        ← Torna ai progetti
      </Link>
    </div>

    <section className="project-case-hero skills-category-panel">
      <div
        className="project-case-hero__bg"
        style={{ backgroundImage: "url('/images/projects/inklysign/landing-login.png')" }}
        aria-hidden="true"
      />
      <div className="project-case-hero__overlay" aria-hidden="true" />
      <div className="project-case-hero__content">
        <p className="terminal-gradient-label">{CATEGORY}</p>
        <h1 className="project-case-hero__title">
          InklySign: contratti e firme online in un unico flusso operativo
        </h1>
        <p className="project-case-hero__desc">
          Un progetto costruito per aziende che vogliono velocizzare il ciclo contrattuale,
          ridurre errori manuali e avere controllo completo su invio, firma e stato documenti.
        </p>
        <div className="project-case-hero__actions">
          <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
            <span className="btn-primary-inner">
              <span className="btn-primary-text">Visita InklySign →</span>
            </span>
          </a>
        </div>
      </div>
    </section>

    <section className="project-case-overview mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-10">
      <div>
        <p className="project-detail-category terminal-gradient-label">{CATEGORY}</p>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{TITLE}</h2>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          InklySign è un prodotto SaaS pensato per digitalizzare il flusso contrattuale
          aziendale: creazione documento, invio, firma in presenza o da remoto e tracciamento
          dello stato in un’unica interfaccia operativa.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {['SaaS B2B', 'Firma Digitale', 'Contratti Online', 'Processi Commerciali'].map(
            (tag) => (
              <span key={tag} className="project-case-tag">
                {tag}
              </span>
            ),
          )}
        </div>

        <div className="project-case-highlight mt-8">
          <p className="project-case-highlight__label">Risultato business</p>
          <p className="project-case-highlight__text">
            Riduzione del tempo di gestione contratti e maggiore controllo sul ciclo firma.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="project-case-card">
            <h3 className="project-case-card__title">La sfida</h3>
            <p className="project-case-card__text">
              Prima dell’introduzione della piattaforma, la gestione dei contratti restava
              frammentata tra file locali, email e approvazioni manuali, con rischio di errori,
              versioni duplicate e poca visibilità sullo stato dei documenti.
            </p>
          </div>
          <div className="project-case-card">
            <h3 className="project-case-card__title">La soluzione</h3>
            <p className="project-case-card__text">
              Ho contribuito allo sviluppo di una piattaforma focalizzata sulla semplificazione
              del percorso contrattuale: modelli personalizzabili, invio guidato, raccolta firma
              online e dashboard per monitorare l’avanzamento.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-bold text-white">Stack tecnologico</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {['React', 'Vite', 'Tailwind CSS', 'PHP', 'Laravel', 'MySQL'].map((tech) => (
              <span key={tech} className="project-case-tag project-case-tag--tech">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Product Design', 'B2B UX', 'Workflow Contrattuale', 'Technical SEO'].map(
              (tag) => (
                <span key={tag} className="project-case-tag project-case-tag--design">
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="project-detail-image-wrap mt-10 lg:mt-16">
        <img
          src="/images/projects/inklysign/dashboard.png"
          alt="Anteprima dashboard InklySign"
          className="project-detail-image"
          loading="lazy"
        />
      </div>
    </section>

    <section className="project-case-split mt-16 lg:grid lg:grid-cols-2 lg:gap-10">
      <div>
        <p className="terminal-gradient-label">Problema risolto</p>
        <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
          Dal caos documentale a un processo firma chiaro, misurabile e veloce
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          In molte realtà commerciali il contratto passa ancora tra allegati email, versioni
          duplicate e firme non tracciate. Con InklySign il ciclo diventa lineare: preparazione,
          invio, firma e monitoraggio in una sola piattaforma.
        </p>
        <ul className="project-case-checklist mt-8 space-y-4">
          <li>Creazione rapida di contratti personalizzati per clienti e fornitori</li>
          <li>Firma online in presenza o da remoto con flusso semplice e tracciabile</li>
          <li>Archivio centralizzato per stato documenti, revisioni e storico operativo</li>
          <li>
            Riduzione dei passaggi manuali tra email, PDF, stampa e approvazioni separate
          </li>
        </ul>
      </div>

      <div className="project-case-visual mt-10 lg:mt-0">
        <div
          className="project-case-visual__img"
          style={{ backgroundImage: "url('/images/projects/inklysign/new-contract.png')" }}
          role="img"
          aria-label="Form creazione contratto InklySign"
        />
      </div>
    </section>

    <section className="mt-16">
      <ul className="project-case-features">
        <li className="project-case-card project-case-card--feature">
          <h3 className="project-case-card__title">Contratti strutturati</h3>
          <p className="project-case-card__text">
            Template riutilizzabili e campi dinamici per ridurre errori ripetitivi nella fase di
            preparazione.
          </p>
        </li>
        <li className="project-case-card project-case-card--feature">
          <h3 className="project-case-card__title">Firma digitale operativa</h3>
          <p className="project-case-card__text">
            Percorso firma progettato per utenti business: rapido, comprensibile e pronto anche da
            mobile.
          </p>
        </li>
        <li className="project-case-card project-case-card--feature">
          <h3 className="project-case-card__title">Gestione clienti unificata</h3>
          <p className="project-case-card__text">
            Ogni contratto resta collegato al cliente corretto, con stato sempre aggiornato e
            consultabile.
          </p>
        </li>
        <li className="project-case-card project-case-card--feature">
          <h3 className="project-case-card__title">Controllo e compliance</h3>
          <p className="project-case-card__text">
            Processo documentale ordinato, auditabile e allineato alle esigenze di governance
            aziendale.
          </p>
        </li>
      </ul>
    </section>

    <section className="project-case-gallery mt-16">
      <p className="terminal-gradient-label">Interfaccia prodotto</p>
      <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
        Dal login alla firma: il flusso completo in piattaforma
      </h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
        Schermate reali dell’applicazione: landing e accesso, dashboard operativa, creazione
        contratti, template configurabili, firma con OTP e consegna automatica del PDF firmato.
      </p>

      <div className="project-case-gallery__viewport mt-10">
        <ProjectScreenshotCarousel items={SCREENSHOTS} />
      </div>
    </section>

    <section className="project-case-banner mt-16">
      <div
        className="project-case-banner__bg"
        style={{ backgroundImage: "url('/images/projects/inklysign/dashboard.png')" }}
        aria-hidden="true"
      />
      <div className="project-case-banner__overlay" aria-hidden="true" />
      <div className="project-case-banner__content">
        <p className="terminal-gradient-label">Controllo operativo</p>
        <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
          Visibilità reale sul ciclo contrattuale
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
          Commerciale, amministrazione e direzione possono leggere lo stesso stato documento in
          tempo reale, senza rincorrere aggiornamenti manuali.
        </p>
      </div>
    </section>

    <section className="project-case-split mt-16 lg:grid lg:grid-cols-2 lg:gap-10">
      <div>
        <p className="terminal-gradient-label">Metodo progetto</p>
        <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
          Come abbiamo costruito InklySign
        </h2>
        <ol className="project-case-steps mt-8 space-y-4">
          <li className="project-case-step">
            <span className="project-case-step__num">1</span>
            <div>
              <h3 className="project-case-step__title">Impostazione modelli contratto</h3>
              <p className="project-case-step__text">
                Si definisce una base documento standard per le casistiche ricorrenti, evitando di
                riscrivere tutto ogni volta.
              </p>
            </div>
          </li>
          <li className="project-case-step">
            <span className="project-case-step__num">2</span>
            <div>
              <h3 className="project-case-step__title">Invio e raccolta firma</h3>
              <p className="project-case-step__text">
                Il contratto viene inviato al destinatario con percorso guidato alla firma, anche a
                distanza.
              </p>
            </div>
          </li>
          <li className="project-case-step">
            <span className="project-case-step__num">3</span>
            <div>
              <h3 className="project-case-step__title">Monitoraggio stato in dashboard</h3>
              <p className="project-case-step__text">
                Backoffice e commerciale vedono in tempo reale quali documenti sono in bozza,
                inviati o completati.
              </p>
            </div>
          </li>
          <li className="project-case-step">
            <span className="project-case-step__num">4</span>
            <div>
              <h3 className="project-case-step__title">Storico e follow-up commerciale</h3>
              <p className="project-case-step__text">
                Dati e storico rimangono centralizzati per semplificare rinnovi, integrazioni e
                analisi operative.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="project-case-visual mt-10 lg:mt-0">
        <div
          className="project-case-visual__img project-case-visual__img--tall"
          style={{ backgroundImage: "url('/images/projects/inklysign/signature-otp.png')" }}
          role="img"
          aria-label="Modale firma digitale con verifica OTP"
        />
      </div>
    </section>

    <section className="project-case-impact mt-16">
      <div
        className="project-case-impact__bg"
        style={{ backgroundImage: "url('/images/projects/inklysign/email-notification.png')" }}
        aria-hidden="true"
      />
      <div className="project-case-impact__overlay" aria-hidden="true" />
      <div className="project-case-impact__content">
        <p className="terminal-gradient-label">Impatto business</p>
        <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
          Meno attese, meno errori, più contratti chiusi
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
          InklySign nasce per trasformare un punto critico aziendale in un vantaggio competitivo:
          velocità esecutiva e controllo sul processo di firma.
        </p>
        <ul className="project-case-pills mt-8">
          <li>Tempi ridotti</li>
          <li>Flusso ordinato</li>
          <li>Governance chiara</li>
        </ul>
      </div>
    </section>

    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white md:text-3xl">FAQ su InklySign</h2>
      <ul className="project-case-faq mt-8 space-y-4">
        <li className="project-case-card">
          <h3 className="project-case-card__title">InklySign è adatto solo a grandi aziende?</h3>
          <p className="project-case-card__text mt-3">
            No. È utile sia per team strutturati sia per PMI che vogliono eliminare passaggi
            manuali nella gestione contratti.
          </p>
        </li>
        <li className="project-case-card">
          <h3 className="project-case-card__title">Posso firmare documenti anche da remoto?</h3>
          <p className="project-case-card__text mt-3">
            Sì. Il flusso è stato pensato proprio per gestire firme online in modo ordinato, anche
            con utenti non tecnici.
          </p>
        </li>
        <li className="project-case-card">
          <h3 className="project-case-card__title">
            Qual è il vantaggio principale per un reparto commerciale?
          </h3>
          <p className="project-case-card__text mt-3">
            Ridurre i tempi tra bozza e chiusura: meno attese, meno documenti dispersi e maggiore
            visibilità sullo stato delle trattative.
          </p>
        </li>
        <li className="project-case-card">
          <h3 className="project-case-card__title">Il progetto include anche ottimizzazione SEO?</h3>
          <p className="project-case-card__text mt-3">
            Sì. La presentazione prodotto è stata impostata con struttura semantica, contenuti chiari
            e markup utile all’indicizzazione.
          </p>
        </li>
      </ul>
    </section>

    <div className="project-detail-actions mt-14">
      <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
        <span className="btn-primary-inner">
          <span className="btn-primary-text">Visita il sito</span>
        </span>
      </a>
      <Link to="/#contact" className="btn-secondary">
        <span className="btn-secondary-inner">Contattami →</span>
      </Link>
    </div>
      </article>
    </div>
  </main>
)

export default InklySignProject
