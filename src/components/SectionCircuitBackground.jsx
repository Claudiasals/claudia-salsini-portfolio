import useHeroCircuitSpotlight from '../hooks/useHeroCircuitSpotlight'

const SectionCircuitBackground = () => {
  const { patternRef } = useHeroCircuitSpotlight()

  return (
    <div className="section-circuits-bg hero-bg" aria-hidden="true">
      <div className="hero-bg__circuit" />
      <div
        ref={patternRef}
        className="hero-bg__circuit-spotlight hero-bg__circuit-spotlight--auto"
        aria-hidden="true"
      />
      <div className="hero-bg__glow" />
      <div className="hero-bg__scrim" />
    </div>
  )
}

export default SectionCircuitBackground
