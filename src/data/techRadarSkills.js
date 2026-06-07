export const TECH_RADAR_RINGS = [
  {
    id: 'frontend',
    label: 'Frontend',
    radius: 24,
    skills: [
      {
        name: 'HTML',
        description:
          'Linguaggio di markup per strutturare contenuti semantici e accessibili sul web.',
        icon: 'devicon-html5-plain colored',
        glow: '#e44d26',
      },
      {
        name: 'CSS',
        description:
          'Styling, layout responsive e cura visiva delle interfacce.',
        icon: 'devicon-css3-plain colored',
        glow: '#38bdf8',
      },
      {
        name: 'JavaScript',
        description:
          'Linguaggio per logica client-side, DOM e interattività delle applicazioni.',
        icon: 'devicon-javascript-plain colored',
        glow: '#f7df1e',
      },
      {
        name: 'Tailwind CSS',
        description:
          'Framework utility-first per uno styling rapido e coerente.',
        icon: 'devicon-tailwindcss-original colored',
        glow: '#38bdf8',
      },
      {
        name: 'React',
        description:
          'Libreria JavaScript per costruire interfacce utente dinamiche e riutilizzabili.',
        icon: 'devicon-react-original colored',
        glow: '#61dafb',
      },
      {
        name: 'Redux',
        description:
          'Gestione dello stato globale in applicazioni React complesse.',
        icon: 'devicon-redux-original colored',
        glow: '#764abc',
      },
      {
        name: 'TypeScript',
        description:
          'JavaScript con tipi statici per maggiore robustezza e manutenibilità.',
        icon: 'devicon-typescript-plain colored',
        glow: '#3178c6',
      },
      {
        name: 'Vite',
        description:
          'Build tool moderno per sviluppo veloce e bundling dei progetti frontend.',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
        glow: '#646cff',
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Database',
    radius: 38,
    skills: [
      {
        name: 'Node.js',
        description:
          'Runtime JavaScript per API, logica server-side e servizi backend.',
        icon: 'devicon-nodejs-plain colored',
        glow: '#3c873a',
      },
      {
        name: 'Express',
        description:
          'Framework Node.js per API REST, routing e middleware.',
        image: '/icons/express.png',
        glow: '#cbd5e1',
      },
      {
        name: 'MongoDB',
        description:
          'Database NoSQL per dati flessibili in formato documento.',
        icon: 'devicon-mongodb-plain colored',
        glow: '#47a248',
      },
      {
        name: 'PHP',
        description:
          'Linguaggio backend per logiche web, CMS e integrazioni server.',
        icon: 'devicon-php-plain colored',
        glow: '#777bb4',
      },
      {
        name: 'Laravel',
        description:
          'Framework PHP strutturato con MVC, ORM e autenticazione.',
        icon: 'devicon-laravel-original colored',
        glow: '#ff2d20',
      },
      {
        name: 'MySQL',
        description:
          'Database relazionale per dati strutturati e query SQL.',
        icon: 'devicon-mysql-original colored',
        glow: '#00758f',
      },
    ],
  },
  {
    id: 'tools',
    label: 'Strumenti',
    radius: 52,
    skills: [
      {
        name: 'Git',
        description:
          'Versionamento del codice e gestione delle modifiche nel tempo.',
        icon: 'devicon-git-plain colored',
        glow: '#f05032',
      },
      {
        name: 'GitHub',
        description:
          'Repository, collaborazione e workflow di sviluppo in team.',
        image: 'https://cdn.simpleicons.org/github/FFFFFF',
        glow: '#a78bfa',
      },
      {
        name: 'VS Code',
        description:
          'Editor principale per scrittura, debug e organizzazione del codice.',
        icon: 'devicon-vscode-plain colored',
        glow: '#007acc',
      },
      {
        name: 'npm',
        description:
          'Gestione dipendenze e script nei progetti JavaScript.',
        icon: 'devicon-npm-original-wordmark colored',
        glow: '#cb3837',
      },
      {
        name: 'Postman',
        description:
          'Test e verifica di endpoint, payload e risposte API.',
        image: 'https://cdn.simpleicons.org/postman/FF6C37',
        glow: '#ff6c37',
      },
      {
        name: 'Figma',
        description:
          'Mockup, prototipi e handoff tra design e sviluppo.',
        image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
        glow: '#a259ff',
      },
      {
        name: 'WordPress',
        description:
          'CMS per siti gestionali, temi e personalizzazioni.',
        icon: 'devicon-wordpress-plain wordpress-blue',
        glow: '#21759b',
      },
      {
        name: 'Netlify',
        description:
          'Deploy continuo e hosting per applicazioni frontend.',
        icon: 'devicon-netlify-plain colored',
        glow: '#00c7b7',
      },
      {
        name: 'Render',
        description:
          'Pubblicazione di applicazioni e servizi backend in cloud.',
        image: 'https://cdn.simpleicons.org/render/FFFFFF',
        glow: '#94a3b8',
      },
    ],
  },
]

export const TECH_RADAR_NODES = TECH_RADAR_RINGS.flatMap((ring) =>
  ring.skills.map((skill, index, list) => ({
    ...skill,
    id: `${ring.id}-${skill.name.toLowerCase().replace(/\s+/g, '-')}`,
    category: ring.label,
    ringId: ring.id,
    radius: ring.radius,
    angle: (360 / list.length) * index - 90,
  })),
)
