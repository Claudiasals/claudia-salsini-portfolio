import { readFileSync, writeFileSync } from 'node:fs'
import { execSync, spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const md = readFileSync(path.join(rootDir, 'README.md'), 'utf8')
const body = marked.parse(md)

const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>README — Claudia Salsini Portfolio</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 2rem 1.5rem 4rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #c9d1d9;
      background: #0d1117;
    }
    .readme {
      max-width: 980px;
      margin: 0 auto;
    }
    h1, h2, h3 { color: #f0f6fc; border-bottom: 1px solid #21262d; padding-bottom: 0.3em; }
    h1 { font-size: 2em; border-bottom: 1px solid #30363d; }
    h2 { font-size: 1.5em; margin-top: 2rem; }
    a { color: #58a6ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    img { max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #30363d; }
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
    th, td { border: 1px solid #30363d; padding: 0.6rem 0.9rem; text-align: left; }
    th { background: #161b22; }
    tr:nth-child(even) { background: #161b22; }
    code {
      font-family: ui-monospace, "Cascadia Code", Consolas, monospace;
      background: #161b22;
      padding: 0.15em 0.4em;
      border-radius: 4px;
      font-size: 0.9em;
    }
    pre {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 1rem;
      overflow-x: auto;
    }
    pre code { background: none; padding: 0; }
    hr { border: none; border-top: 1px solid #21262d; margin: 2rem 0; }
    ul { padding-left: 1.5rem; }
    p { margin: 0.75rem 0; }
  </style>
</head>
<body>
  <article class="readme">${body}</article>
</body>
</html>`

const outPath = path.join(rootDir, 'readme-preview.html')
writeFileSync(outPath, html, 'utf8')

const port = 3456
const url = `http://localhost:${port}/readme-preview.html`

const server = spawn('npx', ['--yes', 'serve', rootDir, '-l', String(port)], {
  stdio: 'ignore',
  detached: true,
  shell: true,
})

server.unref()

setTimeout(() => {
  try {
    if (process.platform === 'win32') {
      execSync(`start "" "${url}"`, { stdio: 'ignore', shell: true })
    } else if (process.platform === 'darwin') {
      execSync(`open "${url}"`)
    } else {
      execSync(`xdg-open "${url}"`)
    }
    console.log(`Anteprima README: ${url}`)
  } catch {
    console.log(`Apri manualmente: ${url}`)
  }
}, 1500)
