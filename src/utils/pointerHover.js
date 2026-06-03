/** Su PC con touch, Chrome spesso segnala hover:none: con il mouse attiviamo gli effetti hover via classe su <html>. */
export function initPointerHover() {
  const root = document.documentElement

  const enable = () => {
    root.classList.add('use-hover-effects')
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    enable()
  }

  window.addEventListener(
    'pointerdown',
    (event) => {
      if (event.pointerType === 'mouse') enable()
    },
    { passive: true },
  )
}
