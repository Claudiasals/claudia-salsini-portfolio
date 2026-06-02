import useHeroCircuitSpotlight from '../hooks/useHeroCircuitSpotlight'

const HeroBackground = ({ withSpotlight = true }) => {
  const { patternRef } = useHeroCircuitSpotlight()

  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg__circuit" />
      {withSpotlight ? (
        <div
          ref={patternRef}
          className="hero-bg__circuit-spotlight hero-bg__circuit-spotlight--auto"
          aria-hidden="true"
        />
      ) : null}
      <div className="hero-bg__glow" />
      <div className="hero-bg__scrim" />
    </div>
  )
}

export default HeroBackground
