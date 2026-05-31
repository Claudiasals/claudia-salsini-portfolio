import { Link } from 'react-router-dom'

const CATEGORY = 'Portfolio fotografico con pannello admin'
const TITLE = 'Francesca Gandelli'
const EXTERNAL_URL = 'https://francescagandelli.netlify.app/'

const FrancescaGandelliProject = () => (
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
        src="/images/projects/francesca-gandelli.png"
        alt="Anteprima del portfolio fotografico Francesca Gandelli con pannello admin"
        className="project-detail-image"
        loading="lazy"
      />
    </div>

    <div className="mt-10 space-y-5 text-lg leading-8 text-slate-300">
      <p>
        Portfolio fotografico con area pubblica curata e pannello admin per gestire categorie,
        immagini, copertine, gallery e contenuti della homepage.
      </p>
      <p>
        Stack full stack con React e Tailwind CSS sul frontend, Node.js ed Express con MongoDB
        Atlas sul backend.
      </p>
    </div>

    <div className="mt-10">
      <h2 className="text-xl font-bold text-white">Stack tecnologico</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas'].map((tech) => (
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
          <span className="btn-primary-text">Visita il sito</span>
        </span>
      </a>
    </div>
      </article>
    </div>
  </main>
)

export default FrancescaGandelliProject
