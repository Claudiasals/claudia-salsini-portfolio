const INTERACTIVE_SELECTOR =
  'a, button, .nav-btn, .btn-primary, .btn-secondary, .contact-detail-link, .contact-form-input-wrap, .projects-carousel-nav, .project-detail-back, .legal-page__email, .site-footer__link'

const TOUCH_FEEDBACK_CLASS = 'touch-feedback'
/** Durata minima visibile della sfumatura dopo un tap breve (ms). */
const MIN_GLOW_VISIBLE_MS = 420

const resolveInteractiveTarget = (node) => {
  if (!(node instanceof Element)) return null
  if (node.matches(INTERACTIVE_SELECTOR)) return node
  return node.closest(INTERACTIVE_SELECTOR)
}

const shouldHandleTarget = (element) => {
  if (!(element instanceof HTMLElement)) return false
  if (element.matches('.contact-form-input-wrap')) return true
  if (element.matches('input, textarea, select, [contenteditable="true"]')) return false
  if (element.closest('.contact-form-input, .contact-form-textarea')) {
    return false
  }
  return true
}

/** Su touch: glow percepibile su tap brevi, senza rettangolo di focus persistente. */
export const initTouchFocus = () => {
  if (typeof window === 'undefined') return
  if (!window.matchMedia('(width < 640px)').matches) return

  let active = null

  const endFeedback = (element) => {
    element.classList.remove(TOUCH_FEEDBACK_CLASS)
    element.blur()
  }

  const clearActive = () => {
    if (!active) return
    window.clearTimeout(active.timer)
    endFeedback(active.element)
    active = null
  }

  const scheduleRelease = () => {
    if (!active) return

    window.clearTimeout(active.timer)
    const elapsed = performance.now() - active.startedAt
    const delay = Math.max(0, MIN_GLOW_VISIBLE_MS - elapsed)

    active.timer = window.setTimeout(() => {
      if (!active) return
      endFeedback(active.element)
      active = null
    }, delay)
  }

  const onTouchStart = (event) => {
    const target = resolveInteractiveTarget(event.target)
    if (!target || !shouldHandleTarget(target)) return

    if (active?.element !== target) {
      clearActive()
    } else {
      window.clearTimeout(active.timer)
    }

    target.classList.add(TOUCH_FEEDBACK_CLASS)
    active = {
      element: target,
      startedAt: performance.now(),
      timer: 0,
    }
  }

  const onTouchEnd = (event) => {
    const target = resolveInteractiveTarget(event.target) ?? active?.element
    if (!target || !shouldHandleTarget(target)) return
    if (!active || active.element !== target) return

    scheduleRelease()
  }

  document.addEventListener('touchstart', onTouchStart, { passive: true })
  document.addEventListener('touchend', onTouchEnd, { passive: true })
  document.addEventListener('touchcancel', onTouchEnd, { passive: true })
}
