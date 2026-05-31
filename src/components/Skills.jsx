import { useEffect, useRef, useState } from 'react'
import ScrollReveal, { ScrollRevealItem } from './ScrollReveal'
import SkillCategoryCard, {
  SKILLS_ICONS_AFTER_TITLE_MS,
  SKILLS_ICONS_ANIMATION_MS,
  SKILLS_ICONS_CATEGORY_GAP_MS,
} from './SkillCategoryCard'
import { skillCategories } from '../data/skillCategories'

const SKILLS_LINK_SELECTOR = 'a[href="#skills"], a[href="/#skills"]'
const TITLE_TYPING_START_MS = 420
const TYPING_MS = 70

const getCategoryIconsRevealDelay = (categoryIndex) => {
  const firstTitleLength = skillCategories[0].title.toUpperCase().length
  const firstIconsAt =
    TITLE_TYPING_START_MS +
    firstTitleLength * TYPING_MS +
    SKILLS_ICONS_AFTER_TITLE_MS

  if (categoryIndex === 0) return firstIconsAt

  return (
    firstIconsAt +
    categoryIndex * (SKILLS_ICONS_ANIMATION_MS + SKILLS_ICONS_CATEGORY_GAP_MS)
  )
}

const Skills = () => {
  const layoutRef = useRef(null)
  const [animationRun, setAnimationRun] = useState(0)

  useEffect(() => {
    const layout = layoutRef.current
    if (!layout) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setAnimationRun((run) => (run === 0 ? 1 : run))
      },
      { threshold: 0.2 },
    )

    observer.observe(layout)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleSkillsLinkClick = (event) => {
      if (!event.target.closest(SKILLS_LINK_SELECTOR)) return

      setAnimationRun((run) => run + 1)
    }

    document.addEventListener('click', handleSkillsLinkClick)

    return () => document.removeEventListener('click', handleSkillsLinkClick)
  }, [])

  return (
    <section className="skills-section section-page section-page--default">
      <ScrollReveal className="relative z-10 mx-auto max-w-6xl">
        <ScrollRevealItem tier="head">
          <div className="skills-section__head">
            <p
              id="skills"
              className="section-scroll-anchor text-sm font-semibold uppercase tracking-[0.3em] text-sky-400"
            >
              Skills
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Competenze tecniche
            </h2>

            <p className="skills-lead mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Uno stack costruito tra formazione, stage curricolare e sviluppo di applicazioni
              web.
            </p>
          </div>
        </ScrollRevealItem>

        <ScrollRevealItem tier="content">
          <div ref={layoutRef} className="skills-layout section-after-title">
            {skillCategories.map((category, index) => (
              <SkillCategoryCard
                key={category.title}
                category={category}
                animationRun={animationRun}
                iconsRevealDelayMs={getCategoryIconsRevealDelay(index)}
              />
            ))}
          </div>
        </ScrollRevealItem>
      </ScrollReveal>
    </section>
  )
}

export default Skills
