import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import SkillsContactZone from '../components/SkillsContactZone'

const Home = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <About />
      <Projects />
      <SkillsContactZone />
    </main>
  )
}

export default Home
