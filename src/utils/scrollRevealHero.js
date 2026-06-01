/** Emesso quando la intro hero entra in viewport (prima onda del sito). */
export const HERO_INTRO_REVEAL_EVENT = 'portfolio:hero-intro-reveal'

let heroIntroRevealed = false

export const isHeroIntroRevealed = () => heroIntroRevealed

export const broadcastHeroIntroReveal = () => {
  if (heroIntroRevealed) return
  heroIntroRevealed = true
  window.dispatchEvent(new CustomEvent(HERO_INTRO_REVEAL_EVENT))
}
