import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function SectionWrapper({ children, className = '', delay = 0 }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    gsap.set(el, { opacity: 0, y: 40 })
    const trigger = ScrollTrigger.create({
      trigger: el, start: 'top 85%',
      onEnter: () => { gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' }) },
      once: true,
    })
    return () => { trigger.kill() }
  }, [reduced, delay])

  if (reduced) return <div className={className}>{children}</div>
  return <div ref={ref} className={className}>{children}</div>
}
