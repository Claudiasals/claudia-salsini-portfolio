import { Link } from 'react-router-dom'
import ProjectScreenshotCarousel from '../../components/ProjectScreenshotCarousel'
import { useVideoVolumeBoost } from '../../hooks/useVideoVolumeBoost'

const CATEGORY = 'SaaS B2B per contratti online e firme digitali'
const TITLE = 'InklySign'
const EXTERNAL_URL = 'https://inklysign.it/login'
const DEMO_SECTION_ID = 'inklysign-demo'

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
]

const CONTRIBUTION_ITEMS = [
  'progettazione UI in Figma, con brief condivisi col team tech Mirai Bay su modifiche e nuove funzionalità',
  'sviluppo frontend: schermate, flussi, dashboard, contratti, template e firma online',
  'sviluppo backend con Laravel e MySQL: logiche applicative, dati e API',
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
    title: 'Dashboard operativa',
    text: 'Metriche su clienti e contratti, storico recente e stato dei documenti in un’unica vista per il team.',
  },
  {
    title: 'Creazione contratti',
    text: 'Form guidato con rubrica clienti e campi anagrafici per preparare e inviare nuovi contratti.',
  },
  {
    title: 'Template dinamici',
    text: 'Editor con variabili per intestazione e corpo documento, termini e privacy collegati al modello.',
  },
  {
    title: 'Firma con OTP',
    text: 'Percorso firma con pad, accettazione termini e verifica OTP via email, con PDF firmato in allegato.',
  },
]

const STACK = ['React', 'Vite', 'Tailwind CSS', 'PHP', 'Laravel', 'MySQL']

const InklySignProject = () => {
  const demoVideoRef = useVideoVolumeBoost(1.35)

  return (
  <main className="min-h-screen bg-slate-950 text-white">
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
          <p className="project-case-intro__desc mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Applicazione web per creare, inviare, firmare e monitorare contratti online, con
            dashboard operativa, template dinamici, gestione clienti e firma con OTP.
          </p>
        </header>

        <section className="project-case-hero skills-category-panel">
          <div
            className="project-case-hero__bg"
            style={{ backgroundImage: "url('/images/projects/inklysign/dashboard.png')" }}
            aria-hidden="true"
          />
          <div className="project-case-hero__overlay" aria-hidden="true" />
          <div className="project-case-hero__content">
            <p className="terminal-gradient-label">Case study</p>
            <p className="project-case-hero__desc project-case-hero__desc--compact">
              Case study dello stage in Mirai Bay: piattaforma che ho sviluppato su frontend,
              backend e deploy, con UI in Figma. Scope e priorità definiti con il team tech Mirai Bay.
            </p>
            <div className="project-case-hero__actions">
              <a href={`#${DEMO_SECTION_ID}`} className="btn-primary">
                <span className="btn-primary-inner">
                  <span className="btn-primary-text">Guarda la demo</span>
                </span>
              </a>
              <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-secondary">
                <span className="btn-secondary-inner">Visita InklySign →</span>
              </a>
            </div>
          </div>
        </section>

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
          <p className="terminal-gradient-label">Il mio ruolo</p>
          <h2 id="inklysign-contribution" className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Come ho realizzato InklySign
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Durante lo stage presso Mirai Bay ho portato a termine InklySign in autonomia operativa:
            UI in Figma, frontend con React, Vite e Tailwind CSS, backend con Laravel e MySQL e
            deploy dell’applicazione. Con il team tech Mirai Bay abbiamo lavorato per brief:
            insieme individuavamo modifiche, aggiornamenti e funzionalità da introdurre; poi ne
            curavo l’implementazione, includendo anche sviluppi aggiuntivi portati avanti in autonomia.
          </p>
          <ul className="project-case-checklist mt-8 space-y-4">
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
            <p className="terminal-gradient-label">Demo progetto</p>
            <h2 id="inklysign-demo-heading" className="mt-4 text-2xl font-bold text-white md:text-3xl">
              Una panoramica del flusso InklySign
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              La piattaforma completa è accessibile solo dopo login. Per questo ho inserito una
              breve demo video che mostra le principali schermate e il flusso di utilizzo del
              prodotto.
            </p>
          </div>

          <div className="project-case-video__frame project-case-video__frame--crop mt-8">
            <video
              ref={demoVideoRef}
              className="project-case-video__player"
              src="/videos/inklysign-demo.mp4"
              poster="/images/projects/inklysign/inklysign-video-poster.png"
              controls
              preload="metadata"
              playsInline
            >
              Il tuo browser non supporta il tag video.
            </video>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="inklysign-features">
          <p className="terminal-gradient-label">Funzionalità principali</p>
          <h2 id="inklysign-features" className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Cosa fa la piattaforma
          </h2>
          <ul className="project-case-features mt-8">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="project-case-card project-case-card--feature">
                <h3 className="project-case-card__title">{feature.title}</h3>
                <p className="project-case-card__text">{feature.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="project-case-stack mt-16" aria-labelledby="inklysign-stack">
          <p className="terminal-gradient-label">Stack tecnologico</p>
          <h2 id="inklysign-stack" className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Tecnologie utilizzate
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <span key={tech} className="project-case-tag project-case-tag--tech">
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Stack utilizzato su un percorso full stack reale: interfaccia, persistenza dati,
            logiche server e rilascio dell’applicazione in ambiente di produzione.
          </p>
        </section>

        <section className="project-case-gallery mt-16" aria-labelledby="inklysign-gallery">
          <p className="terminal-gradient-label">Screenshot</p>
          <h2 id="inklysign-gallery" className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Approfondimento visivo
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Alcune schermate reali dell’applicazione: accesso, dashboard, creazione contratti,
            template, firma con OTP e consegna del PDF firmato.
          </p>

          <div className="project-case-gallery__viewport mt-10">
            <ProjectScreenshotCarousel items={SCREENSHOTS} />
          </div>
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
