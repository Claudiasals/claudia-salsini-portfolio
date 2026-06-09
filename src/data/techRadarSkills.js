const makeId = (categoryId, name) =>
  `${categoryId}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

const distributeAngles = (count) =>
  Array.from({ length: count }, (_, index) => (360 / count) * index - 90)

const REGULAR_POLYGON_RADIUS = 30

/** Negativo = raggio più corto. Positivo = raggio più lungo. Valore in px sul radar. */
export const SPOKE_LENGTH_ADJUST_PX_BY_NAME = {
  Render: -3,
  Figma: -3,
  Postman: -3,
  GitHub: -3,
  Laravel: -3,
  Express: -3,
  MySQL: -3,
  TypeScript: -3,
  React: -3,
  'Tailwind CSS': 2,
  Vite: 2,
  Netlify: 2,
}

/** Vertici equidistanti sullo stesso raggio → poligono regolare (esagono, ottagono, …). */
const withRegularPolygon = (skills, radius = REGULAR_POLYGON_RADIUS) =>
  distributeAngles(skills.length).map((angle, index) => ({
    ...skills[index],
    radius,
    angle,
    scoreRadius: radius * 0.82,
    spokeLengthAdjustPx: SPOKE_LENGTH_ADJUST_PX_BY_NAME[skills[index].name] ?? 0,
  }))

export const TECH_RADAR_CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    polygonRadius: REGULAR_POLYGON_RADIUS,
    accent: '#38bdf8',
    skills: withRegularPolygon(
      [
        {
          name: 'HTML',
          description:
            'Markup semantico per strutturare contenuti.',
          icon: 'devicon-html5-plain colored',
          glow: '#e44d26',
        },
        {
          name: 'CSS',
          description: 'Styling, layout responsive e cura visiva delle interfacce.',
          icon: 'devicon-css3-plain colored',
          glow: '#38bdf8',
        },
        {
          name: 'JavaScript',
          description:
            'Linguaggio usato per logica, interazioni dinamiche e funzionalità lato client.',
          icon: 'devicon-javascript-plain colored',
          glow: '#f7df1e',
        },
        {
          name: 'Tailwind CSS',
          description:
            'Framework utility-first per styling rapido, responsive e coerente.',
          icon: 'devicon-tailwindcss-original colored',
          glow: '#38bdf8',
        },
        {
          name: 'React',
          description:
            'Libreria JavaScript per costruire interfacce component-based e riutilizzabili.',
          icon: 'devicon-react-original colored',
          glow: '#61dafb',
        },
        {
          name: 'Redux',
          description: 'Gestione dello stato applicativo in progetti React.',
          icon: 'devicon-redux-original colored',
          glow: '#764abc',
        },
        {
          name: 'Vite',
          description:
            'Ambiente di sviluppo moderno e veloce per applicazioni frontend.',
          image:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
          glow: '#646cff',
        },
        {
          name: 'TypeScript',
          description:
            'JavaScript tipizzato per scrivere codice più robusto, leggibile e manutenibile.',
          icon: 'devicon-typescript-plain colored',
          glow: '#3178c6',
          nodeRadialOffsetPx: 5,
        },
      ],
    ),
  },
  {
    id: 'backend',
    label: 'Backend',
    polygonRadius: REGULAR_POLYGON_RADIUS,
    accent: '#a78bfa',
    skills: withRegularPolygon(
      [
        {
          name: 'Node.js',
          description:
            'Runtime JavaScript per lo sviluppo di API, logiche server-side e servizi backend.',
          icon: 'devicon-nodejs-plain colored',
          glow: '#3c873a',
        },
        {
          name: 'Express',
          description: 'Framework Node.js per API REST, routing e middleware.',
          image: '/icons/express.png',
          glow: '#cbd5e1',
        },
        {
          name: 'MongoDB',
          description:
            'Database NoSQL per gestire dati flessibili in formato documento.',
          icon: 'devicon-mongodb-plain colored',
          glow: '#47a248',
        },
        {
          name: 'PHP',
          description:
            'Linguaggio backend utilizzato per logiche web e integrazioni server.',
          icon: 'devicon-php-plain colored',
          glow: '#777bb4',
        },
        {
          name: 'Laravel',
          description:
            'Framework PHP strutturato per applicazioni backend, routing, MVC e gestione dati.',
          icon: 'devicon-laravel-original colored',
          glow: '#ff2d20',
        },
        {
          name: 'MySQL',
          description: 'Database relazionale per dati strutturati e query SQL.',
          icon: 'devicon-mysql-original colored',
          glow: '#00758f',
        },
      ],
    ),
  },
  {
    id: 'tools',
    label: 'Strumenti',
    polygonRadius: REGULAR_POLYGON_RADIUS,
    accent: '#6ee7b7',
    skills: withRegularPolygon(
      [
        {
          name: 'Git',
          description: 'Versionamento del codice.',
          icon: 'devicon-git-plain colored',
          glow: '#f05032',
        },
        {
          name: 'GitHub',
          description:
            'Repository, collaborazione, controllo versioni e pubblicazione del codice.',
          image: 'https://cdn.simpleicons.org/github/FFFFFF',
          glow: '#a78bfa',
        },
        {
          name: 'VS Code',
          description:
            'Editor principale per scrittura, debug e organizzazione dei progetti.',
          icon: 'devicon-vscode-plain colored',
          glow: '#007acc',
        },
        {
          name: 'npm',
          description:
            'Gestione di pacchetti, dipendenze e script nei progetti JavaScript.',
          icon: 'devicon-npm-original-wordmark colored',
          glow: '#cb3837',
        },
        {
          name: 'Postman',
          description: 'Test e verifica di endpoint, payload e risposte API.',
          image: 'https://cdn.simpleicons.org/postman/FF6C37',
          glow: '#ff6c37',
        },
        {
          name: 'Figma',
          description: 'Mockup, riferimenti visuali e progettazione dell’interfaccia.',
          image:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
          glow: '#a259ff',
        },
        {
          name: 'WordPress',
          description: 'CMS per gestione contenuti, siti web e personalizzazioni.',
          icon: 'devicon-wordpress-plain wordpress-blue',
          glow: '#21759b',
        },
        {
          name: 'Netlify',
          description: 'Deploy e pubblicazione di progetti frontend.',
          icon: 'devicon-netlify-plain colored',
          glow: '#00c7b7',
        },
        {
          name: 'Render',
          description: 'Pubblicazione di backend e servizi web in cloud.',
          image: 'https://cdn.simpleicons.org/render/FFFFFF',
          glow: '#94a3b8',
        },
      ],
    ),
  },
]

export const TECH_RADAR_NODES = TECH_RADAR_CATEGORIES.flatMap((category) =>
  category.skills.map((skill) => ({
    ...skill,
    id: makeId(category.id, skill.name),
    categoryId: category.id,
    category: category.label,
    categoryAccent: category.accent,
  })),
)

/** @deprecated Usa TECH_RADAR_CATEGORIES */
export const TECH_RADAR_RINGS = TECH_RADAR_CATEGORIES.map((category) => ({
  id: category.id,
  radius: category.polygonRadius,
}))
