import SectionWrapper from '@/components/SectionWrapper'
import SkyLanternsCanvas from '@/components/canvas/SkyLanternsCanvas'
import { Mail, MessageCircle, Handshake } from 'lucide-react'

const contacts = [
  { icon: Mail, label: '邮箱', value: 'arwencheng@163.com' },
  { icon: MessageCircle, label: '微信', value: 'ZYW900420980717' },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-24 md:py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none">
        <SkyLanternsCanvas count={5} className="opacity-60" />
      </div>
      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-[800px] mx-auto text-center">
          <SectionWrapper>
            <span className="text-xs font-body-en tracking-[0.15em] text-lantern-orange uppercase">Contact</span>
            <h2 className="font-display-cn text-3xl md:text-4xl text-pure-white font-bold mt-3">联系我</h2>
            <p className="text-pale-silver text-base mt-3">期待与您合作，共同创造精彩内容</p>
          </SectionWrapper>
          <SectionWrapper delay={0.15} className="mt-10 md:mt-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
              {contacts.map((contact, i) => {
                const Icon = contact.icon
                return (
                  <div key={i} className="flex items-center gap-3 text-mist-white hover:text-lantern-orange transition-colors duration-300">
                    <Icon size={22} className="text-lantern-orange" />
                    <div className="text-left">
                      <p className="text-xs text-pale-silver">{contact.label}</p>
                      <p className="text-sm">{contact.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </SectionWrapper>
          <SectionWrapper delay={0.3} className="mt-10">
            <p className="text-pale-silver text-sm mb-4">扫码关注作品集</p>
            <div className="w-[140px] h-[140px] mx-auto rounded-xl overflow-hidden">
              <img src="/images/qrcode.png" alt="作品集二维码" className="w-full h-full object-contain" />
            </div>
          </SectionWrapper>
          <SectionWrapper delay={0.4} className="mt-10">
            <button onClick={() => alert('感谢您的关注！请通过邮箱或微信与我联系。')}
              className="inline-flex items-center gap-2 bg-lantern-orange text-night-sky font-medium px-10 py-3.5 rounded-full text-base transition-all duration-300 hover:bg-warm-amber hover:scale-105 hover:shadow-button">
              <Handshake size={20} />合作咨询
            </button>
          </SectionWrapper>
        </div>
      </div>
      <footer className="relative z-10 mt-20 md:mt-24 border-t border-midnight/60 mx-6 md:mx-12 lg:px-20">
        <div className="max-w-[1200px] mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dim-grey text-sm">&copy; 2024 郑雅文 Arwen. All rights reserved.</p>
          <p className="text-dim-grey text-sm">Designed with <span className="text-coral-red">&hearts;</span> & AI</p>
        </div>
      </footer>
    </section>
  )
}
