/** ViewBox di public/images/hero-circuit-motif.svg */
export const HERO_CIRCUIT_VIEWBOX = { width: 960, height: 540 }

/** Valori di min(182%, 132vw) in index.css */
const BG_WIDTH_RATIO = 1.82
const BG_MAX_VW = 1.32

/** Bloccato all’avvio animazione: evita salti quando innerWidth oscilla al refresh. */
let lockedViewportWidth = null

export const lockCircuitLayoutViewport = () => {
  lockedViewportWidth = window.innerWidth
}

export const unlockCircuitLayoutViewport = () => {
  lockedViewportWidth = null
}

const layoutViewportWidth = () => lockedViewportWidth ?? window.innerWidth

const parsePx = (value) => {
  const n = Number.parseFloat(value)
  return Number.isFinite(n) ? n : null
}

export const getHeroCircuitBackgroundLayoutFromElement = (el) => {
  const layerWidth = el.clientWidth
  const layerHeight = el.clientHeight

  if (layerWidth <= 0 || layerHeight <= 0) {
    return { left: 0, top: 0, width: 0, height: 0 }
  }

  const style = getComputedStyle(el)
  const sizeParts = style.backgroundSize.split(',').map((s) => s.trim())

  let width = layerWidth
  let height = layerWidth * (HERO_CIRCUIT_VIEWBOX.height / HERO_CIRCUIT_VIEWBOX.width)

  if (sizeParts[0] && sizeParts[0] !== 'auto') {
    if (sizeParts[0].includes('min(')) {
      const vw = typeof window !== 'undefined' ? layoutViewportWidth() : 1200
      width = Math.min(layerWidth * BG_WIDTH_RATIO, vw * BG_MAX_VW)
    } else if (sizeParts[0].endsWith('%')) {
      const pct = parsePx(sizeParts[0])
      if (pct !== null) width = (layerWidth * pct) / 100
    } else if (sizeParts[0].endsWith('px')) {
      const px = parsePx(sizeParts[0])
      if (px !== null) width = px
    }
  }

  if (sizeParts[1] && sizeParts[1] !== 'auto') {
    if (sizeParts[1].endsWith('%')) {
      const pct = parsePx(sizeParts[1])
      if (pct !== null) height = (layerHeight * pct) / 100
    } else if (sizeParts[1].endsWith('px')) {
      const px = parsePx(sizeParts[1])
      if (px !== null) height = px
    }
  } else {
    height = width * (HERO_CIRCUIT_VIEWBOX.height / HERO_CIRCUIT_VIEWBOX.width)
  }

  const positionTokens = style.backgroundPosition
    .split(',')[0]
    .trim()
    .split(/\s+/)
  const posX = positionTokens[0] ?? 'center'
  const posY = positionTokens[1] ?? positionTokens[0] ?? 'center'

  const resolveAxis = (value, layerSize, imageSize) => {
    if (value === 'center' || value === 'centre') {
      return (layerSize - imageSize) / 2
    }
    if (value === 'top' || value === 'left') {
      return 0
    }
    if (value === 'bottom' || value === 'right') {
      return layerSize - imageSize
    }
    if (value.endsWith('%')) {
      const pct = parsePx(value)
      if (pct !== null) return ((layerSize - imageSize) * pct) / 100
    }
    if (value.endsWith('px')) {
      const px = parsePx(value)
      if (px !== null) return px
    }
    return (layerSize - imageSize) / 2
  }

  const left = resolveAxis(posX, layerWidth, width)
  const top = resolveAxis(posY, layerHeight, height)

  return { left, top, width, height }
}

const layoutCache = new WeakMap()

export const getCachedCircuitLayout = (el) => {
  const width = el.clientWidth
  const height = el.clientHeight
  const cached = layoutCache.get(el)

  if (cached && cached.layerWidth === width && cached.layerHeight === height) {
    return cached.layout
  }

  const layout = getHeroCircuitBackgroundLayoutFromElement(el)
  layoutCache.set(el, { layerWidth: width, layerHeight: height, layout })
  return layout
}

export const invalidateCircuitLayoutCache = (el) => {
  layoutCache.delete(el)
}

/** Firma del posizionamento reale del motivo SVG (non solo clientWidth). */
export const getCircuitLayoutSignature = (el) => {
  const layout = getHeroCircuitBackgroundLayoutFromElement(el)
  return [
    el.clientWidth,
    el.clientHeight,
    Math.round(layout.left),
    Math.round(layout.top),
    Math.round(layout.width),
    Math.round(layout.height),
    lockedViewportWidth ?? 0,
  ].join('|')
}

export const isCircuitLayoutReady = (el) => {
  if (!el || el.clientWidth <= 0 || el.clientHeight <= 0) return false

  const layout = getHeroCircuitBackgroundLayoutFromElement(el)
  return layout.width > 64 && layout.height > 36
}

export const svgCircuitToLayerPx = (svgX, svgY, layerEl) => {
  const { left, top, width, height } = getCachedCircuitLayout(layerEl)

  return {
    x: left + (svgX / HERO_CIRCUIT_VIEWBOX.width) * width,
    y: top + (svgY / HERO_CIRCUIT_VIEWBOX.height) * height,
  }
}
