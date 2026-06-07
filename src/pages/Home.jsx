import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import ContactFooterZone from '../components/ContactFooterZone'

const Home = () => {
  return (
    <main className="min-h-screen bg-site text-white">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <ContactFooterZone />
    </main>
  )
}

export default Home
