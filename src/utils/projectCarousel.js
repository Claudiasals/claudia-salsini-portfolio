import { isSmartphoneViewport } from '../constants/breakpoints'
import { isScrolling as isPageScrolling } from './scrollInteraction'

const HORIZONTAL_SCROLL_THRESHOLD = 3
const SCROLL_SETTLE_MS = 140
const LOOP_SET_COUNT = 3

const loopState = new WeakMap()

function getLoopState(track) {
  if (!loopState.has(track)) {
    loopState.set(track, {
      suppressReposition: false,
      lastScrollLeft: track.scrollLeft,
      hadHorizontalScroll: false,
      slideIndexAtScrollStart: null,
      scrollSettleTimer: null,
    })
  }
  return loopState.get(track)
}

export function isMobileProjectCarousel() {
  return isSmartphoneViewport()
}

export function getProjectCarouselCards(track) {
  return [...track.querySelectorAll('.project-carousel-card')]
}

export function getProjectCarouselInlineAlign() {
  return isMobileProjectCarousel() ? 'center' : 'start'
}

export function getCarouselSetSize(track) {
  const fromData = Number.parseInt(track.dataset.carouselSetSize ?? '', 10)
  if (Number.isFinite(fromData) && fromData > 0) return fromData

  const cards = getProjectCarouselCards(track)
  if (cards.length <= 1) return cards.length
  return Math.floor(cards.length / LOOP_SET_COUNT)
}

export function carouselHasInfiniteLoop(track) {
  return track.dataset.carouselLoop === 'true'
}

/** Indice della prima card del blocco centrale (1, 2, 3). */
export function getMiddleSetStartIndex(track) {
  return getCarouselSetSize(track)
}

function getTrackScrollPadding(track) {
  const style = getComputedStyle(track)
  const padStart =
    parseFloat(style.scrollPaddingInlineStart) ||
    parseFloat(style.scrollPaddingLeft) ||
    0
  return padStart
}

/** Posizione scroll affidabile (layout flex + padding del track). */
export function getSlideTargetScrollLeft(track, card) {
  const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth)
  const trackRect = track.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  let left = cardRect.left - trackRect.left + track.scrollLeft

  if (getProjectCarouselInlineAlign() === 'center') {
    left -= (track.clientWidth - card.offsetWidth) / 2
  } else {
    left -= getTrackScrollPadding(track)
  }

  return Math.max(0, Math.min(left, maxScroll))
}

export function getActiveProjectCarouselSlideIndex(
  track,
  cards = getProjectCarouselCards(track),
) {
  if (!cards.length) return 0

  const anchor = track.scrollLeft + track.clientWidth / 2
  let bestIndex = 0
  let bestDistance = Number.POSITIVE_INFINITY

  cards.forEach((card, index) => {
    const cardAnchor = card.offsetLeft + card.offsetWidth / 2
    const distance = Math.abs(anchor - cardAnchor)
    const isDuplicate = card.dataset.carouselSlide === 'loop-duplicate'
    const bestIsDuplicate =
      cards[bestIndex]?.dataset.carouselSlide === 'loop-duplicate'

    if (distance < bestDistance - 0.5) {
      bestDistance = distance
      bestIndex = index
      return
    }

    if (Math.abs(distance - bestDistance) <= 0.5 && !isDuplicate && bestIsDuplicate) {
      bestDistance = distance
      bestIndex = index
    }
  })

  return bestIndex
}

/** Se sei nel primo o terzo blocco, salta alla stessa card nel blocco centrale. */
export function normalizeLoopSlideIndex(track, slideIndex) {
  const setSize = getCarouselSetSize(track)
  if (!carouselHasInfiniteLoop(track) || setSize <= 0) return slideIndex

  if (slideIndex < setSize) return slideIndex + setSize
  if (slideIndex >= setSize * 2) return slideIndex - setSize
  return slideIndex
}

function silentJumpToSlide(track, slideIndex) {
  const cards = getProjectCarouselCards(track)
  const card = cards[slideIndex]
  if (!card) return

  const state = getLoopState(track)
  const left = getSlideTargetScrollLeft(track, card)

  state.suppressReposition = true
  state.hadHorizontalScroll = false
  state.slideIndexAtScrollStart = null

  const snap = track.style.scrollSnapType
  const behavior = track.style.scrollBehavior

  track.style.scrollSnapType = 'none'
  track.style.scrollBehavior = 'auto'
  track.scrollLeft = left
  void track.offsetHeight
  track.style.scrollSnapType = snap
  track.style.scrollBehavior = behavior

  state.lastScrollLeft = track.scrollLeft

  requestAnimationFrame(() => {
    state.suppressReposition = false
  })
}

function repositionToMiddleSetIfNeeded(track) {
  const state = getLoopState(track)
  if (state.suppressReposition || !carouselHasInfiniteLoop(track)) return
  if (isPageScrolling()) return

  const index = getActiveProjectCarouselSlideIndex(track)
  const target = normalizeLoopSlideIndex(track, index)

  if (target !== index) {
    silentJumpToSlide(track, target)
  }
}

function clearScrollSettleTimer(state) {
  if (state.scrollSettleTimer) {
    clearTimeout(state.scrollSettleTimer)
    state.scrollSettleTimer = null
  }
}

function scheduleScrollSettled(track, state) {
  clearScrollSettleTimer(state)
  state.scrollSettleTimer = window.setTimeout(() => {
    state.scrollSettleTimer = null
    onScrollSettled(track, state)
  }, SCROLL_SETTLE_MS)
}

function onScrollSettled(track, state) {
  if (state.suppressReposition) return
  if (!state.hadHorizontalScroll) return

  repositionToMiddleSetIfNeeded(track)

  state.hadHorizontalScroll = false
  state.slideIndexAtScrollStart = null
}

export function scrollProjectCarouselToSlideIndex(track, slideIndex, behavior = 'smooth') {
  const cards = getProjectCarouselCards(track)
  if (!cards.length) return

  const index = Math.max(0, Math.min(slideIndex, cards.length - 1))

  if (behavior === 'instant') {
    silentJumpToSlide(track, index)
    return
  }

  const left = getSlideTargetScrollLeft(track, cards[index])
  track.scrollTo({ left, behavior })
}

/** Scorre di una card: avanti/indietro nella sequenza ripetuta 1 → 2 → 3 → 1 → 2 → 3 … */
export function scrollProjectCarouselBy(track, direction, behavior = 'smooth') {
  const cards = getProjectCarouselCards(track)
  if (!cards.length || direction === 0) return

  const state = getLoopState(track)
  const current = getActiveProjectCarouselSlideIndex(track, cards)
  const next = current + direction

  if (next < 0 || next >= cards.length) return

  state.hadHorizontalScroll = true
  state.slideIndexAtScrollStart = current

  scrollProjectCarouselToSlideIndex(track, next, behavior)
}

export function initProjectCarouselLoop(track) {
  const state = getLoopState(track)
  track.removeAttribute('data-carousel-ready')

  const alignToMiddleSet = () => {
    if (!carouselHasInfiniteLoop(track)) {
      silentJumpToSlide(track, 0)
    } else {
      silentJumpToSlide(track, getMiddleSetStartIndex(track))
    }
    track.dataset.carouselReady = 'true'
  }

  const scheduleAlign = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(alignToMiddleSet)
    })
  }

  scheduleAlign()

  let hasAlignedToLayout = false

  const layoutObserver = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry || entry.contentRect.width < 1 || hasAlignedToLayout) return
    hasAlignedToLayout = true
    alignToMiddleSet()
  })

  layoutObserver.observe(track)

  const onScrollEnd = () => {
    onScrollSettled(track, state)
  }

  const onTrackScroll = () => {
    if (state.suppressReposition) return

    const delta = track.scrollLeft - state.lastScrollLeft
    if (Math.abs(delta) >= HORIZONTAL_SCROLL_THRESHOLD) {
      if (!state.hadHorizontalScroll) {
        state.slideIndexAtScrollStart = getActiveProjectCarouselSlideIndex(track)
      }
      state.hadHorizontalScroll = true
    }
    state.lastScrollLeft = track.scrollLeft
    scheduleScrollSettled(track, state)
  }

  track.addEventListener('scroll', onTrackScroll, { passive: true })
  track.addEventListener('scrollend', onScrollEnd)

  const onResize = () => {
    if (state.suppressReposition) return
    clearScrollSettleTimer(state)

    const index = normalizeLoopSlideIndex(
      track,
      getActiveProjectCarouselSlideIndex(track),
    )
    silentJumpToSlide(track, index)
  }

  window.addEventListener('resize', onResize)

  return () => {
    clearScrollSettleTimer(state)
    layoutObserver.disconnect()
    track.removeEventListener('scroll', onTrackScroll)
    track.removeEventListener('scrollend', onScrollEnd)
    window.removeEventListener('resize', onResize)
    track.removeAttribute('data-carousel-ready')
    loopState.delete(track)
  }
}
