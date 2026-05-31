import { Link } from 'react-router-dom'

const CATEGORY = 'Piattaforma gestionale interna'
const TITLE = 'WorkHub'
const EXTERNAL_URL = 'https://github.com/Claudiasals/workhub.git'

const WorkHubProject = () => (
  <main className="min-h-screen bg-slate-950 text-white">
    <div className="page-under-navbar px-6 pb-20">
      <article className="mx-auto max-w-4xl">
    <Link to="/#projects" className="project-detail-back">
      ← Torna ai progetti
    </Link>

    <p className="project-detail-category terminal-gradient-label mt-8">{CATEGORY}</p>

    <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl">{TITLE}</h1>

    <div className="project-detail-image-wrap mt-10">
      <img
        src="/images/projects/workhub.png"
        alt="Anteprima dashboard WorkHub"
        className="project-detail-image"
        loading="lazy"
      />
    </div>

    <div className="mt-10 space-y-5 text-lg leading-8 text-slate-300">
      <p>
        WorkHub è un gestionale interno per centralizzare attività operative: clienti, personale,
        magazzino, ordini e ticketing.
      </p>
      <p>
        Progetto full stack con React e Redux sul frontend, Node.js ed Express sul backend e
        MongoDB per la persistenza dei dati.
      </p>
    </div>

    <div className="mt-10">
      <h2 className="text-xl font-bold text-white">Stack tecnologico</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {['React', 'Redux', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'].map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    <div className="project-detail-actions mt-12">
      <a href={EXTERNAL_URL} target="_blank" rel="noreferrer" className="btn-primary">
        <span className="btn-primary-inner">
          <span className="btn-primary-text">Repository GitHub</span>
        </span>
      </a>
    </div>
      </article>
    </div>
  </main>
)

export default WorkHubProject
