import { TECH_RADAR_CATEGORIES, SPOKE_LENGTH_ADJUST_PX_BY_NAME } from './techRadarSkills'

const makeSkillId = (categoryId, name) =>
  `${categoryId}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

export const SKILL_CATEGORY_TABS = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Strumenti' },
]

export const getRadarSkillsByCategory = (categoryId) => {
  const category = TECH_RADAR_CATEGORIES.find((item) => item.id === categoryId)
  if (!category) return []

  const scale = 39 / (category.polygonRadius ?? 30)

  return category.skills.map((skill) => ({
    ...skill,
    id: makeSkillId(categoryId, skill.name),
    category: categoryId,
    radius: skill.radius * scale,
    scoreRadius: skill.scoreRadius * scale,
    spokeLengthAdjustPx:
      skill.spokeLengthAdjustPx ?? SPOKE_LENGTH_ADJUST_PX_BY_NAME[skill.name] ?? 0,
  }))
}

export const DAILY_STACK = [
  {
    name: 'VS Code',
    category: 'tools',
    icon: 'devicon-vscode-plain colored',
    glow: '#007acc',
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    icon: 'devicon-javascript-plain colored',
    glow: '#f7df1e',
  },
  {
    name: 'CSS',
    category: 'frontend',
    icon: 'devicon-css3-plain colored',
    glow: '#1572b6',
  },
  {
    name: 'React',
    category: 'frontend',
    icon: 'devicon-react-original colored',
    glow: '#61dafb',
  },
  {
    name: 'Redux Toolkit',
    category: 'frontend',
    radarName: 'Redux',
    icon: 'devicon-redux-original colored',
    glow: '#764abc',
  },
  {
    name: 'Tailwind',
    category: 'frontend',
    radarName: 'Tailwind CSS',
    icon: 'devicon-tailwindcss-original colored',
    glow: '#38bdf8',
  },
  {
    name: 'Vite',
    category: 'frontend',
    image:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
    glow: '#646cff',
  },
  {
    name: 'Node.js',
    category: 'backend',
    icon: 'devicon-nodejs-plain colored',
    glow: '#3c873a',
  },
  {
    name: 'Express',
    category: 'backend',
    image: '/icons/express.png',
    glow: '#cbd5e1',
  },
  {
    name: 'MongoDB',
    category: 'backend',
    icon: 'devicon-mongodb-plain colored',
    glow: '#47a248',
  },
  {
    name: 'Netlify',
    category: 'tools',
    icon: 'devicon-netlify-plain colored',
    glow: '#00c7b7',
  },
  {
    name: 'Render',
    category: 'tools',
    image: 'https://cdn.simpleicons.org/render/FFFFFF',
    glow: '#94a3b8',
  },
  {
    name: 'Figma',
    category: 'tools',
    image:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    glow: '#a259ff',
  },
]

const resolveStackTools = (names) =>
  names.map((name) => DAILY_STACK.find((tool) => tool.name === name)).filter(Boolean)

const getProcessStepStack = (step) => {
  if (step.stackGroups) {
    return step.stackGroups.flatMap((group) => resolveStackTools(group.tools))
  }

  return resolveStackTools(step.stack ?? [])
}

export const getProcessStepStackGroups = (step) => {
  if (step.stackGroups) {
    return step.stackGroups
      .map((group) => ({
        id: group.id,
        label: group.label,
        tools: resolveStackTools(group.tools),
      }))
      .filter((group) => group.tools.length > 0)
  }

  const tools = getProcessStepStack(step)
  if (tools.length === 0) return []

  return [{ id: 'default', tools }]
}

export const PROCESS_STEPS = [
  {
    number: '01',
    label: 'Idea',
    text: 'Analisi dei requisiti, definizione dei flussi utente, wireframe, mockup, studio dell’interfaccia e pianificazione della soluzione.',
    tone: '#a855f7',
    icon: 'idea',
    stack: ['Figma'],
  },
  {
    number: '02',
    label: 'Sviluppo',
    text: 'Scrittura di codice pulito, modulare e scalabile.',
    tone: '#3b82f6',
    icon: 'code',
    stackGroups: [
      {
        id: 'frontend',
        label: 'Frontend',
        tools: [
          'VS Code',
          'JavaScript',
          'CSS',
          'React',
          'Redux Toolkit',
          'Tailwind',
          'Vite',
        ],
      },
      {
        id: 'backend',
        label: 'Backend',
        tools: ['Node.js', 'Express', 'MongoDB'],
      },
    ],
  },
  {
    number: '03',
    label: 'Test',
    text: 'Verifica del comportamento, debugging e controllo delle funzionalità prima del rilascio.',
    tone: '#22d3ee',
    icon: 'test',
    stack: [],
  },
  {
    number: '04',
    label: 'Deploy',
    text: 'Pubblicazione online.',
    tone: '#fb923c',
    icon: 'deploy',
    stack: ['Netlify', 'Render'],
  },
  {
    number: '05',
    label: 'Evoluzione',
    text: 'Monitoraggio, raccolta del feedback degli utenti e iterazione continua sul prodotto, per individuare opportunità di miglioramento e ottimizzare costantemente l\'esperienza offerta.',
    tone: '#a855f7',
    icon: 'evolution',
    stack: [],
  },
]
