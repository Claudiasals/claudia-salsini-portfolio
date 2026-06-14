# Claudia Salsini — Portfolio

**Junior Full Stack Web Developer**

**Sito online:** [claudiasalsini.dev](https://claudiasalsini.dev/)

---

## Panoramica

Portfolio personale one-page con case study dedicati, competenze tecniche, form di contatto e pagine legali. Presenta progetti full stack, percorso professionale e approccio orientato a UX e codice manutenibile.

**In sintesi:** routing SPA · scroll verso sezioni · carousel progetti · tech radar competenze · form contatto · case study per ogni progetto · pagine Privacy, Cookie e Termini.

<p align="center">
  <img src="./docs/screenshots/home-hero.png" alt="Homepage — Hero" width="720" />
</p>

<p align="center">
  <img src="./docs/screenshots/home-skills.png" alt="Sezione Skills" width="360" />
  &nbsp;&nbsp;
  <img src="./docs/screenshots/project-inklysign.png" alt="Case study InklySign" width="360" />
</p>

---

## Sito online

[https://claudiasalsini.dev/](https://claudiasalsini.dev/)

---

## Stack tecnologico

| Area | Tecnologie |
|------|------------|
| **Frontend** | React 19, React Router, Vite 8, Tailwind CSS 4 |
| **UI / UX** | CSS custom, Inter, JetBrains Mono, React Icons, Devicon |
| **Backend (progetti correlati)** | Node.js, Express, PHP, Laravel |
| **Database** | MySQL, MongoDB Atlas |
| **Tooling** | ESLint, npm |
| **Deploy** | Netlify (SPA redirect via `_redirects`) |

---

## Progetti in evidenza

| Progetto | Descrizione | Link |
|----------|-------------|------|
| **InklySign** | SaaS B2B per contratti online e firme digitali | [inklysign.it](https://inklysign.it/login) |
| **WorkHub** | Gestionale interno full stack | [GitHub](https://github.com/Claudiasals/workhub.git) |
| **Francesca Gandelli** | Portfolio fotografico con pannello admin | [Demo](https://francescagandelli.netlify.app/) |

<p align="center">
  <img src="./public/images/projects/inklysign.png" alt="InklySign" width="280" />
  <img src="./public/images/projects/workhub.png" alt="WorkHub" width="280" />
  <img src="./public/images/projects/francesca-gandelli.png" alt="Francesca Gandelli" width="280" />
</p>

---

## Avvio in locale

**Requisiti:** Node.js 18+ consigliato, npm

```bash
git clone https://github.com/Claudiasals/claudia-salsini-portfolio.git
cd claudia-salsini-portfolio
npm install
npm run dev
```

Apri l’URL indicato in terminale (di default `http://localhost:5173`).

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Server di sviluppo con HMR |
| `npm run build` | Build di produzione in `dist/` |
| `npm run preview` | Anteprima locale della build |
| `npm run lint` | Controllo ESLint |

---

## Build e deploy

```bash
npm run build
```

L’output viene generato nella cartella `dist/`.  
Il file `public/_redirects` gestisce il routing SPA su Netlify (`/* → /index.html`).

---

## Contatti

**Claudia Salsini** — Junior Full Stack Web Developer

- Email: [salsiniclaudia@gmail.com](mailto:salsiniclaudia@gmail.com)
- GitHub: [@Claudiasals](https://github.com/Claudiasals)
- LinkedIn: [claudia-salsini](https://www.linkedin.com/in/claudia-salsini)
- WhatsApp: [+39 392 033 9229](https://wa.me/393920339229)

---

<p align="center">
  Realizzato con React, Vite e Tailwind CSS.
</p>
