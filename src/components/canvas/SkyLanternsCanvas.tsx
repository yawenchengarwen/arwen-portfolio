import { useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Lantern {
  x: number; startX: number; y: number; size: number
  riseSpeed: number; swingAmplitude: number; swingSpeed: number
  phase: number; opacity: number; flameIntensity: number
}

interface SkyLanternsCanvasProps { count?: number; className?: string }

export default function SkyLanternsCanvas({ count = 12, className = '' }: SkyLanternsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animationId: number, time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    const lanterns: Lantern[] = []
    const createLantern = (): Lantern => ({
      x: Math.random() * canvas.offsetWidth, startX: 0,
      y: canvas.offsetHeight + 50 + Math.random() * 150,
      size: 15 + Math.random() * 15, riseSpeed: 0.3 + Math.random() * 0.5,
      swingAmplitude: 15 + Math.random() * 25, swingSpeed: 0.005 + Math.random() * 0.007,
      phase: Math.random() * Math.PI * 2, opacity: 0.3 + Math.random() * 0.5,
      flameIntensity: 0.6 + Math.random() * 0.4,
    })
    for (let i = 0; i < count; i++) {
      const l = createLantern(); l.startX = l.x; l.y = Math.random() * canvas.offsetHeight; lanterns.push(l)
    }

    const drawLantern = (lantern: Lantern) => {
      const { x, y, size, opacity, flameIntensity } = lantern
      const lanternWidth = size * 0.6, lanternHeight = size * 0.8, cornerRadius = size * 0.25
      const glowRadius = size * 2.5
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius)
      glowGradient.addColorStop(0, `rgba(233,196,106,${opacity*0.4})`)
      glowGradient.addColorStop(0.5, `rgba(244,162,97,${opacity*0.15})`)
      glowGradient.addColorStop(1, `rgba(244,162,97,0)`)
      ctx.fillStyle = glowGradient; ctx.fillRect(x - glowRadius, y - glowRadius, glowRadius * 2, glowRadius * 2)
      ctx.fillStyle = `rgba(244,162,97,${opacity*0.9})`
      const lx = x - lanternWidth/2, ly = y - lanternHeight/2
      ctx.beginPath()
      ctx.moveTo(lx + cornerRadius, ly)
      ctx.lineTo(lx + lanternWidth - cornerRadius, ly)
      ctx.arcTo(lx + lanternWidth, ly, lx + lanternWidth, ly + cornerRadius, cornerRadius)
      ctx.lineTo(lx + lanternWidth, ly + lanternHeight - cornerRadius)
      ctx.arcTo(lx + lanternWidth, ly + lanternHeight, lx + lanternWidth - cornerRadius, ly + lanternHeight, cornerRadius)
      ctx.lineTo(lx + cornerRadius, ly + lanternHeight)
      ctx.arcTo(lx, ly + lanternHeight, lx, ly + lanternHeight - cornerRadius, cornerRadius)
      ctx.lineTo(lx, ly + cornerRadius)
      ctx.arcTo(lx, ly, lx + cornerRadius, ly, cornerRadius)
      ctx.closePath(); ctx.fill()
      ctx.strokeStyle = `rgba(233,196,106,${opacity})`; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(x - lanternWidth*0.35, y - lanternHeight*0.45); ctx.lineTo(x + lanternWidth*0.35, y - lanternHeight*0.45); ctx.stroke()
      const flameHeight = size * 0.3, flameWidth = size * 0.15, flameY = y + lanternHeight/2 + flameHeight/2
      const flameGradient = ctx.createRadialGradient(x, flameY, 0, x, flameY, flameHeight)
      flameGradient.addColorStop(0, `rgba(254,243,199,${opacity*flameIntensity})`)
      flameGradient.addColorStop(0.5, `rgba(233,196,106,${opacity*flameIntensity*0.8})`)
      flameGradient.addColorStop(1, `rgba(244,162,97,0)`)
      ctx.fillStyle = flameGradient; ctx.beginPath(); ctx.ellipse(x, flameY, flameWidth, flameHeight, 0, 0, Math.PI*2); ctx.fill()
    }

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      for (const lantern of lanterns) {
        lantern.y -= lantern.riseSpeed
        const swingOffset = Math.sin(time * lantern.swingSpeed + lantern.phase) * lantern.swingAmplitude
        lantern.x = lantern.startX + swingOffset
        if (lantern.y < -100) { lantern.y = h + 50; lantern.startX = Math.random() * w; lantern.opacity = 0.3 + Math.random() * 0.5 }
        drawLantern(lantern)
      }
      time++; animationId = requestAnimationFrame(draw)
    }
    draw(); window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize) }
  }, [reduced, count])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} style={{ zIndex: 2 }} />
}
