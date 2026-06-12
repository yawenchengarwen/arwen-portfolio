import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8)
      const sections = ['about', 'portfolio', 'experience', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMobileOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-500 ${isScrolled ? 'backdrop-glass border-b border-white/5' : 'bg-transparent'}`}>
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="font-display-en text-xl tracking-[0.15em] text-lantern-orange font-bold">Arwen</a>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-end gap-3 pr-4 border-r border-white/10">
            <a href="https://xhslink.com/m/8bApzrc9CFU" target="_blank" rel="noopener noreferrer" className="group/logo" title="小红书" aria-label="小红书">
              <img src="/images/xiaohongshu-logo.svg" alt="小红书" className="h-[56px] w-auto [filter:brightness(0)_saturate(100%)_invert(88%)_sepia(2%)_saturate(69%)_hue-rotate(17deg)_brightness(101%)_contrast(92%)] group-hover/logo:[filter:brightness(0)_saturate(100%)_invert(18%)_sepia(98%)_saturate(4500%)_hue-rotate(342deg)_brightness(100%)_contrast(112%)] transition-opacity duration-300" />
            </a>
            <a href="https://b23.tv/ZGTC7Df" target="_blank" rel="noopener noreferrer" className="group/logo" title="Bilibili" aria-label="Bilibili">
              <img src="/images/bilibili-logo.svg" alt="bilibili" className="h-[56px] w-auto [filter:brightness(0)_saturate(100%)_invert(88%)_sepia(2%)_saturate(69%)_hue-rotate(17deg)_brightness(101%)_contrast(92%)] group-hover/logo:[filter:brightness(0)_saturate(100%)_invert(59%)_sepia(78%)_saturate(2180%)_hue-rotate(168deg)_brightness(94%)_contrast(101%)] transition-opacity duration-300" />
            </a>
          </div>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
              className={`relative text-sm font-body-en tracking-wider transition-colors duration-300 group ${activeSection === link.href.replace('#', '') ? 'text-lantern-orange' : 'text-mist-white hover:text-lantern-orange'}`}>
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-lantern-orange transition-all duration-300 ${activeSection === link.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </a>
          ))}
        </div>
        <div className="flex md:hidden items-center gap-3">
          <a href="https://xhslink.com/m/8bApzrc9CFU" target="_blank" rel="noopener noreferrer" className="group/logo" title="小红书" aria-label="小红书">
            <img src="/images/xiaohongshu-logo.svg" alt="小红书" className="h-[56px] w-auto [filter:brightness(0)_saturate(100%)_invert(88%)_sepia(2%)_saturate(69%)_hue-rotate(17deg)_brightness(101%)_contrast(92%)] group-hover/logo:[filter:brightness(0)_saturate(100%)_invert(18%)_sepia(98%)_saturate(4500%)_hue-rotate(342deg)_brightness(100%)_contrast(112%)] transition-opacity duration-300" />
          </a>
          <a href="https://b23.tv/ZGTC7Df" target="_blank" rel="noopener noreferrer" className="group/logo" title="Bilibili" aria-label="Bilibili">
            <img src="/images/bilibili-logo.svg" alt="bilibili" className="h-[56px] w-auto [filter:brightness(0)_saturate(100%)_invert(88%)_sepia(2%)_saturate(69%)_hue-rotate(17deg)_brightness(101%)_contrast(92%)] group-hover/logo:[filter:brightness(0)_saturate(100%)_invert(59%)_sepia(78%)_saturate(2180%)_hue-rotate(168deg)_brightness(94%)_contrast(101%)] transition-opacity duration-300" />
          </a>
          <button className="text-mist-white p-2" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Toggle menu">
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMobileOpen && (
        <div className="absolute top-[72px] left-0 right-0 backdrop-glass border-b border-white/5 md:hidden">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href) }} className="text-mist-white hover:text-lantern-orange transition-colors py-2">{link.label}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
