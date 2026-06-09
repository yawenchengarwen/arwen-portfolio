import { useRef, useEffect } from 'react'
import { ChevronDown, Download, FolderOpen } from 'lucide-react'
import StarfieldCanvas from '@/components/canvas/StarfieldCanvas'
import SkyLanternsCanvas from '@/components/canvas/SkyLanternsCanvas'
import FloatingCloudsCanvas from '@/components/canvas/FloatingCloudsCanvas'

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    el.style.opacity = '1'
    el.style.transform = 'translateY(0)'
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <StarfieldCanvas />
      <FloatingCloudsCanvas />
      <SkyLanternsCanvas count={12} />
      <div className="absolute inset-0 bg-gradient-to-b from-night-sky/30 via-transparent to-night-sky/60 z-[3] pointer-events-none" />
      <div ref={contentRef} className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center transition-all duration-1000 ease-out" style={{ opacity: 0, transform: 'translateY(30px)' }}>
        <div className="mb-8 relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-lantern-orange/40 shadow-lantern-lg">
            <img src="/images/avatar-new.jpg" alt="郑雅文 Arwen" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -inset-2 rounded-full border border-lantern-orange/20 animate-pulse" />
        </div>
        <span className="text-xs md:text-sm font-body-en tracking-[0.15em] text-lantern-orange uppercase mb-4">Creator & AIGC Director</span>
        <h1 className="font-display-cn text-4xl md:text-5xl lg:text-[56px] text-pure-white font-bold tracking-[0.08em] leading-tight">郑雅文</h1>
        <h2 className="font-display-en text-2xl md:text-3xl lg:text-[40px] text-mist-white font-normal tracking-[0.2em] mt-2">Arwen</h2>
        <p className="text-base md:text-lg text-pale-silver mt-4 max-w-lg font-body-cn tracking-wide">AI 内容创作｜视频创作｜新媒体运营</p>
        <div className="flex items-center gap-4 md:gap-5 mt-10">
          <button onClick={() => scrollTo('portfolio')} className="flex items-center gap-2 bg-lantern-orange text-night-sky font-medium px-6 md:px-9 py-3 md:py-3.5 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-warm-amber hover:scale-[1.02] hover:shadow-button">
            <FolderOpen size={18} />查看作品集
          </button>
          <button onClick={() => alert('简历下载功能即将上线')} className="flex items-center gap-2 bg-transparent border border-lantern-orange text-lantern-orange font-medium px-6 md:px-9 py-3 md:py-3.5 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-lantern-orange hover:text-night-sky">
            <Download size={18} />下载简历
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-pale-silver text-xs tracking-wider">向下滚动</span>
          <ChevronDown size={20} className="text-lantern-orange" />
        </div>
      </div>
    </section>
  )
}
