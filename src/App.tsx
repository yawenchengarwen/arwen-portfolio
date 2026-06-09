import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/Navbar'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import PortfolioSection from '@/sections/PortfolioSection'
import ExperienceSection from '@/sections/ExperienceSection'
import ContactSection from '@/sections/ContactSection'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <div className="relative min-h-screen bg-night-sky overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <div className="h-32 bg-gradient-to-b from-transparent to-night-sky relative z-[5] -mt-32 pointer-events-none" />
        <AboutSection />
        <PortfolioSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
