export const projects = [
  {
    slug: 'workhub-ai',
    category: 'Estensione prodotto · AI-assisted development',
    title: 'WorkHub +AI',
    description:
      'Evoluzione di WorkHub, gestionale interno per il personale del capstone di gruppo, da gestionale operativo a piattaforma smart con strumenti AI per ottimizzare il flusso di lavoro.',
    image: '/images/projects/workhub-ai.png',
    imageAlt: 'WorkHub +AI: overview admin con Centro operativo e andamento vendite',
    tech: ['React', 'Node.js', 'Cursor', 'Express', 'MongoDB', 'Product UX'],
    externalUrl: 'https://github.com/Claudiasals/workhub',
  },
  {
    slug: 'inklysign',
    category: 'SaaS B2B per contratti online e firme digitali',
    title: 'InklySign',
    description:
      'Piattaforma sviluppata durante lo stage presso Mirai Bay per digitalizzare il workflow contrattuale: creazione contratti, firma OTP, gestione utenti e processo documentale centralizzato.',
    image: '/images/projects/inklysign.png',
    imageAlt: 'Anteprima dashboard InklySign',
    tech: ['React', 'Vite', 'Tailwind CSS', 'PHP', 'Laravel', 'MySQL'],
    externalUrl: 'https://inklysign.it/login',
  },
  {
    slug: 'workhub',
    category: 'Piattaforma gestionale interna',
    title: 'WorkHub',
    description:
      'Progetto finale di gruppo del corso Full Stack Web Developer: gestionale interno per personale, turni, clienti, magazzino, ordini e ticketing.',
    image: '/images/projects/workhub.png',
    imageAlt: 'Anteprima dashboard WorkHub',
    tech: ['React', 'Redux', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    externalUrl: 'https://github.com/Claudiasals/workhub',
  },
  {
    slug: 'francesca-gandelli',
    category: 'Portfolio fotografico con pannello admin',
    title: 'Francesca Gandelli',
    description:
      'Progetto personale: portfolio fotografico con stile su misura per la cliente e pannello admin per gestire categorie, foto, testi e recupero password con verifica OTP via email.',
    image: '/images/projects/francesca-gandelli.png',
    imageAlt: 'Anteprima del portfolio Francesca Gandelli con pannello admin e griglia categorie',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas', 'Cloudinary'],
    externalUrl: 'https://francescagandelli.netlify.app/',
  },
]

/** Prossimi N progetti nell’ordine del carousel (con wrap circolare). */
export const getNextProjects = (currentSlug, count = 2) => {
  if (projects.length <= 1) return []

  const currentIndex = projects.findIndex((project) => project.slug === currentSlug)
  if (currentIndex === -1) return []

  const take = Math.min(count, projects.length - 1)

  return Array.from({ length: take }, (_, offset) => {
    const index = (currentIndex + offset + 1) % projects.length
    return projects[index]
  })
}

export const getProjectExternalLinkLabel = (externalUrl) => {
  if (!externalUrl) return null
  if (/github\.com/i.test(externalUrl)) return 'Repository GitHub'
  return 'Visita il sito'
}
