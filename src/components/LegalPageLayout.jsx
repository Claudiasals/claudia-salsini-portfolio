import { Link } from 'react-router-dom'

export const LegalSection = ({ title, body, list }) => (
  <section>
    <h2 className="legal-page__section-title terminal-gradient-label">{title}</h2>

    {body ? <p className="legal-page__section-body">{body}</p> : null}

    {list ? (
      <ul className="legal-page__list">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : null}
  </section>
)

const LegalPageLayout = ({
  label,
  title,
  intro,
  updated = 'maggio 2026',
  children,
}) => {
  return (
    <main className="min-h-screen bg-site text-white">
      <div className="legal-page page-under-navbar px-6 pb-20">
        <div className="legal-page__inner mx-auto max-w-3xl">
          <header className="legal-page__header">
            <div className="legal-page__header-top">
              <Link to="/" className="legal-page__back project-detail-back">
                ← Torna al portfolio
              </Link>

              <p className="legal-page__label text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
                {label}
              </p>
            </div>

            <h1 className="legal-page__title mt-4 text-3xl font-bold text-white md:text-4xl">
              {title}
            </h1>
          </header>

          <p className="legal-page__intro mt-6 text-lg leading-8 text-slate-300">{intro}</p>

          <div className="legal-page__sections mt-10 space-y-8">{children}</div>

          <section className="mt-8">
            <h2 className="legal-page__section-title terminal-gradient-label">
              Contatti
            </h2>

            <p className="legal-page__section-body">
              Per richieste relative a questa informativa puoi scrivere a{' '}
              <a href="mailto:salsiniclaudia@gmail.com" className="legal-page__email">
                salsiniclaudia@gmail.com
              </a>
              .
            </p>
          </section>

          <p className="legal-page__updated mt-10 text-sm text-slate-400">
            Ultimo aggiornamento: {updated}
          </p>
        </div>
      </div>
    </main>
  )
}

export default LegalPageLayout
