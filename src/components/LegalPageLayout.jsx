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
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="legal-page page-under-navbar px-6 pb-20">
        <div className="legal-page__inner mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            {label}
          </p>

          <div className="project-case-header mt-4">
            <h1 className="min-w-0 text-3xl font-bold text-white md:text-4xl">{title}</h1>

            <Link to="/" className="project-detail-back project-case-header__back">
              ← Torna al portfolio
            </Link>
          </div>

          <p className="mt-6 text-lg leading-8 text-slate-300">{intro}</p>

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
