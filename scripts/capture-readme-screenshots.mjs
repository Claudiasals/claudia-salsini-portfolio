import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputDir = path.join(rootDir, 'docs', 'screenshots')
const baseUrl = process.env.SCREENSHOT_BASE_URL ?? 'http://localhost:5176'

const shots = [
  { name: 'home-hero.png', path: '/', fullPage: false, height: 900 },
  { name: 'home-about.png', path: '/#about', fullPage: false, height: 900 },
  { name: 'home-projects.png', path: '/#projects', fullPage: false, height: 900 },
  { name: 'home-skills.png', path: '/#skills', fullPage: false, height: 900 },
  { name: 'home-contact.png', path: '/#contact', fullPage: false, height: 900 },
  { name: 'project-inklysign.png', path: '/progetti/inklysign', fullPage: false, height: 900 },
]

await mkdir(outputDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})

for (const shot of shots) {
  await page.goto(`${baseUrl}${shot.path}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  if (shot.fullPage) {
    await page.screenshot({
      path: path.join(outputDir, shot.name),
      fullPage: true,
    })
    continue
  }

  await page.screenshot({
    path: path.join(outputDir, shot.name),
    clip: { x: 0, y: 0, width: 1440, height: shot.height },
  })
}

await browser.close()
console.log(`Saved ${shots.length} screenshots to docs/screenshots/`)
