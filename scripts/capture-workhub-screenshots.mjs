import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const workhubServer = path.resolve(rootDir, '..', 'Workhub', 'server')
const outputDir = path.join(rootDir, 'public', 'images', 'projects', 'workhub')
const baseUrl = process.env.WORKHUB_BASE_URL ?? 'http://localhost:5173'

async function login(page, username, password) {
  await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' })
  await page.locator('input[type="text"]').first().fill(username)
  await page.locator('input[type="password"]').fill(password)
  await page.locator('button[type="submit"]').click()
  await page.waitForURL(/\/twofa/, { timeout: 15000 })
  await page.locator('input:not([type="password"])').first().fill('12345')
  await page.locator('button[type="submit"]').click()
  await page.waitForURL(/\/board/, { timeout: 15000 })
  await page.waitForTimeout(3000)
}

async function waitCalendarEvents(page, min = 3) {
  await page.locator('.company-events-calendar__body .rbc-event').first().waitFor({
    state: 'visible',
    timeout: 20000,
  })
  const count = await page.locator('.company-events-calendar__body .rbc-event').count()
  if (count < min) {
    throw new Error(`Expected at least ${min} calendar events, found ${count}`)
  }
  await page.waitForTimeout(600)
}

async function captureLocator(page, name, selector, padding = 16, maxHeight = 900) {
  const el = page.locator(selector).first()
  await el.waitFor({ state: 'visible', timeout: 20000 })
  await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  const box = await el.boundingBox()
  if (!box) throw new Error(`No bounding box for ${name}`)
  await page.screenshot({
    path: path.join(outputDir, name),
    clip: {
      x: Math.max(0, box.x - padding),
      y: Math.max(0, box.y - padding),
      width: Math.min(1440, box.width + padding * 2),
      height: Math.min(maxHeight, box.height + padding * 2),
    },
  })
}

async function expandCalendarForCapture(page) {
  await page.evaluate(() => {
    const height = '620px'
    const body = document.querySelector('.company-events-calendar__body')
    const cal = document.querySelector('.company-events-calendar__body .rbc-calendar')
    const timeView = document.querySelector('.company-events-calendar__body .rbc-time-view')
    if (body) {
      body.style.height = height
      body.style.maxHeight = 'none'
    }
    if (cal) cal.style.height = height
    if (timeView) timeView.style.height = height
  })
  await page.waitForTimeout(400)
}

async function prepareCalendar(page) {
  await page.goto(`${baseUrl}/board`, { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    const scrollHost = document.querySelector('[data-page-scroll]')
    if (scrollHost) scrollHost.scrollTop = scrollHost.scrollHeight
  })
  await page.waitForTimeout(800)
  await page.locator('.calendar-view-btn').filter({ hasText: /settimana|week/i }).click()
  await page.waitForTimeout(500)
}

try {
  execSync('npm run seed:calendar', { cwd: workhubServer, stdio: 'inherit' })
} catch (err) {
  console.warn('Calendar seed skipped or failed:', err.message)
}

await mkdir(outputDir, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})

const adminPage = await context.newPage()
await login(adminPage, 'admin', 'admin123')

await prepareCalendar(adminPage)
await adminPage.locator('.calendar-mode-btn--shifts').click()
await waitCalendarEvents(adminPage, 5)
await expandCalendarForCapture(adminPage)
await captureLocator(
  adminPage,
  'dashboard-admin-calendario-turni-ai.png',
  '.company-events-calendar',
  20
)

await adminPage.locator('.calendar-mode-btn--events').click()
await adminPage.waitForTimeout(800)
await waitCalendarEvents(adminPage, 3)
await adminPage.locator('.calendar-view-btn').filter({ hasText: /mese|month/i }).click()
await adminPage.waitForTimeout(600)
await captureLocator(
  adminPage,
  'dashboard-admin-calendario-eventi.png',
  '.company-events-calendar',
  16,
  720
)

await adminPage.evaluate(() => {
  const scrollHost = document.querySelector('[data-page-scroll]')
  if (scrollHost) scrollHost.scrollTop = 0
})
await adminPage.waitForTimeout(500)
await captureLocator(
  adminPage,
  'dashboard-admin-centro-operativo.png',
  '.business-overview-panel, [class*="business-overview"]',
  24
)

await adminPage.goto(`${baseUrl}/warehouse`, { waitUntil: 'networkidle' })
await adminPage.waitForTimeout(2000)
await captureLocator(
  adminPage,
  'warehouse-ai-suggestions.png',
  'section:has(h3:has-text("Suggerimenti"))',
  24
).catch(async () => {
  await captureLocator(adminPage, 'warehouse-ai-suggestions.png', '.app-surface', 24)
})

await adminPage.goto(`${baseUrl}/ticket`, { waitUntil: 'domcontentloaded' })
await adminPage.waitForTimeout(3500)
await captureLocator(adminPage, 'ticket-ai-insights.png', '.ticket-ai-insights-wrap', 16)
await adminPage.screenshot({
  path: path.join(outputDir, 'admin-ticket-analytics.png'),
  clip: { x: 0, y: 0, width: 1440, height: 900 },
})

await adminPage.goto(`${baseUrl}/customers`, { waitUntil: 'networkidle' })
await adminPage.waitForTimeout(2000)
await adminPage.locator('table tbody tr').first().click()
await adminPage.waitForURL(/\/customer\//)
await adminPage.waitForTimeout(3500)
await captureLocator(adminPage, 'customer-ai-insights.png', '.customer-ai-card', 20)

await context.clearCookies()
await adminPage.evaluate(() => {
  sessionStorage.clear()
  localStorage.clear()
})

const userPage = await context.newPage()
await login(userPage, 'user', 'user123')
await prepareCalendar(userPage)
await userPage.locator('.calendar-mode-btn--shifts').click()
await waitCalendarEvents(userPage, 1)
await expandCalendarForCapture(userPage)
await captureLocator(userPage, 'dashboard-user-calendario.png', '.company-events-calendar', 16, 720)

await userPage.evaluate(() => {
  const scrollHost = document.querySelector('[data-page-scroll]')
  if (scrollHost) scrollHost.scrollTop = 0
})
await userPage.waitForTimeout(400)
await userPage.screenshot({
  path: path.join(outputDir, 'dashboard-user-board.png'),
  clip: { x: 0, y: 0, width: 1440, height: 900 },
})

await userPage.goto(`${baseUrl}/ticket`, { waitUntil: 'domcontentloaded' })
await userPage.waitForTimeout(2500)
await userPage.screenshot({
  path: path.join(outputDir, 'ticketing-user-apri-ticket.png'),
  clip: { x: 0, y: 0, width: 1440, height: 900 },
})

await browser.close()
console.log(`Saved WorkHub screenshots to ${outputDir}`)
