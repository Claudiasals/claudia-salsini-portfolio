export const projects = [
  {
    slug: 'inklysign',
    category: 'SaaS B2B per contratti online e firme digitali',
    title: 'InklySign',
    description:
      'Piattaforma full stack, sviluppata durante lo stage presso Mirai Bay, per digitalizzare il workflow contrattuale: creazione contratti, firma in presenza o da remoto con OTP, gestione utenti e processo documentale centralizzato per aziende.',
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
      'Gestionale full stack per la centralizzazione di attività operative aziendali, con gestione di clienti, personale, magazzino, ordini e sistema di ticketing interno.',
    image: '/images/projects/workhub.png',
    imageAlt: 'Anteprima dashboard WorkHub',
    tech: ['React', 'Redux', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    externalUrl: 'https://github.com/Claudiasals/workhub.git',
  },
  {
    slug: 'francesca-gandelli',
    category: 'Portfolio fotografico con pannello admin',
    title: 'Francesca Gandelli',
    description:
      'Sito portfolio per fotografa con area pubblica e pannello admin per la gestione di categorie, immagini, copertine, gallery e contenuti della homepage.',
    image: '/images/projects/francesca-gandelli.png',
    imageAlt: 'Anteprima del portfolio fotografico Francesca Gandelli con pannello admin',
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas'],
    externalUrl: 'https://francescagandelli.netlify.app/',
  },
]

export const getProjectExternalLinkLabel = (externalUrl) => {
  if (!externalUrl) return null
  if (/github\.com/i.test(externalUrl)) return 'Repository GitHub'
  return 'Visita il sito'
}
