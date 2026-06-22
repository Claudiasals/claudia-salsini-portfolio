import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const templatePath = path.join(__dirname, 'og-image-template.html')
const outputPath = path.join(rootDir, 'public', 'images', 'og-claudia-salsini-portfolio.jpg')

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
})

await page.goto(`file://${templatePath}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

await page.screenshot({
  path: outputPath,
  type: 'jpeg',
  quality: 92,
  clip: { x: 0, y: 0, width: 1200, height: 630 },
})

await browser.close()
console.log(`Saved OG image to ${outputPath}`)
