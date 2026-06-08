import { TECH_RADAR_CATEGORIES } from './techRadarSkills'

const makeSkillId = (categoryId, name) =>
  `${categoryId}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

export const SKILL_CATEGORY_TABS = [
  { id: 'frontend', label: 'Front-end' },
  { id: 'backend', label: 'Back-end' },
  { id: 'tools', label: 'Strumenti' },
]

export const SKILL_CATEGORIES = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Strumenti',
}

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
  }))
}

export const getDailyStackSkillDetail = (item) => {
  if (!item?.category) return null

  const radarName = item.radarName ?? item.name
  const skill = getRadarSkillsByCategory(item.category).find(
    (entry) => entry.name === radarName,
  )

  if (skill) {
    return {
      ...skill,
      name: item.name,
      icon: item.icon ?? skill.icon,
      image: item.image ?? skill.image,
      glow: item.glow ?? skill.glow,
    }
  }

  if (item.description) {
    return {
      id: `stack-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: item.name,
      category: item.category,
      description: item.description,
      icon: item.icon,
      image: item.image,
      glow: item.glow,
    }
  }

  return null
}

export const DAILY_STACK = [
  {
    name: 'VS Code',
    category: 'tools',
    icon: 'devicon-vscode-plain colored',
    glow: '#007acc',
  },
  {
    name: 'Git',
    category: 'tools',
    icon: 'devicon-git-plain colored',
    glow: '#f05032',
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
    name: 'React Router',
    category: 'frontend',
    description:
      'Routing e navigazione tra pagine, incluse route protette per aree riservate.',
    icon: 'devicon-reactrouter-plain colored',
    glow: '#ca4245',
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
]

export const PROCESS_STEPS = [
  {
    number: '01',
    label: 'Idea',
    text: 'Analisi dei requisiti e pianificazione della soluzione.',
    tone: '#a855f7',
    icon: 'idea',
  },
  {
    number: '02',
    label: 'Sviluppo',
    text: 'Scrittura di codice pulito, modulare e scalabile.',
    tone: '#3b82f6',
    icon: 'code',
  },
  {
    number: '03',
    label: 'Test',
    text: 'Test e debugging per garantire qualita e stabilita.',
    tone: '#22d3ee',
    icon: 'test',
  },
  {
    number: '04',
    label: 'Deploy',
    text: 'Pubblicazione online con performance e sicurezza.',
    tone: '#fb923c',
    icon: 'deploy',
  },
  {
    number: '05',
    label: 'Evoluzione',
    text: 'Monitoraggio, feedback e iterazione.',
    tone: '#a855f7',
    icon: 'evolution',
  },
]
