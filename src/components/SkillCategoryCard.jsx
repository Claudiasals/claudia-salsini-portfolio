import { useEffect, useState } from 'react'
import TypingTerminalLabel from './TypingTerminalLabel'

const TYPING_MS = 70
const BOX_REVEAL_MS = 0
const TITLE_TYPING_START_MS = 420

export const SKILLS_ICONS_ANIMATION_MS = 420
export const SKILLS_ICONS_CATEGORY_GAP_MS = 100
export const SKILLS_ICONS_AFTER_TITLE_MS = 80

const SkillIcon = ({ skill }) => {
  if (skill.image) {
    return (
      <img
        src={skill.image}
        alt=""
        className="skills-skill-mini__icon-img"
        draggable={false}
      />
    )
  }

  return <i className={`${skill.icon} skills-skill-mini__icon`} aria-hidden="true" />
}

const SkillCategoryCard = ({ category, animationRun, iconsRevealDelayMs = 0 }) => {
  const [showCard, setShowCard] = useState(false)
  const [showSkills, setShowSkills] = useState(false)

  const titleLabel = category.title.toUpperCase()

  useEffect(() => {
    if (animationRun === 0) {
      setShowCard(false)
      setShowSkills(false)
      return undefined
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setShowCard(true)
      setShowSkills(true)
      return undefined
    }

    setShowCard(false)
    setShowSkills(false)

    const cardTimer = window.setTimeout(() => {
      setShowCard(true)
    }, BOX_REVEAL_MS)

    const skillsTimer = window.setTimeout(() => setShowSkills(true), iconsRevealDelayMs)

    return () => {
      window.clearTimeout(cardTimer)
      window.clearTimeout(skillsTimer)
    }
  }, [animationRun, iconsRevealDelayMs])

  const isCompactCard = category.skills.length < 9
  const isSparseGrid = category.skills.length <= 6

  return (
    <article
      className={`skills-group-card${isCompactCard ? ' skills-group-card--compact' : ''}${
        isSparseGrid ? ' skills-group-card--sparse' : ''
      }`}
    >
      <div
        className={`skills-group-card__shell${
          showCard ? ' skills-group-card__shell--visible' : ''
        }`}
      >
        <div className="skills-group-card__body">
          <header className="skills-group-card__header">
            <TypingTerminalLabel
              label={titleLabel}
              trigger={animationRun}
              startDelay={TITLE_TYPING_START_MS}
              variant="gradient"
              wrapperClassName="skills-group-card__title"
              as="h3"
            />

            <p
              className={`skills-group-card__desc${
                showCard ? ' skills-group-card__desc--visible' : ''
              }`}
            >
              {category.description}
            </p>
          </header>

          <ul
            className={`skills-group-card__grid${
              showSkills ? ' skills-group-card__grid--visible' : ''
            }`}
          >
            {category.skills.map((skill) => (
              <li key={skill.name} className="skills-skill-mini">
                <div className="skills-skill-mini__inner">
                  <SkillIcon skill={skill} />
                  <span className="skills-skill-mini__label">{skill.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default SkillCategoryCard
