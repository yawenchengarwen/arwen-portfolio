import { useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Star {
  x: number; y: number; baseSize: number; brightness: number
  twinkleSpeed: number; phase: number; hue: number; isColorful: boolean
}

interface ShootingStar {
  x: number; y: number; vx: number; vy: number
  life: number; maxLife: number; trail: { x: number; y: number }[]
  active: boolean; hue: number
}

const STAR_HUES = [0, 30, 50, 200, 280, 320]

export default function StarfieldCanvas() {
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

    const stars: Star[] = []
    for (let i = 0; i < 250; i++) {
      const isColorful = Math.random() < 0.35
      stars.push({
        x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight,
        baseSize: 0.5 + Math.random() * 2.5, brightness: 0.2 + Math.random() * 0.8,
        twinkleSpeed: 0.008 + Math.random() * 0.025, phase: Math.random() * Math.PI * 2,
        hue: STAR_HUES[Math.floor(Math.random() * STAR_HUES.length)], isColorful,
      })
    }

    const shootingStar: ShootingStar = { x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, trail: [], active: false, hue: 0 }
    const spawnShootingStar = () => {
      shootingStar.x = canvas.offsetWidth * (0.5 + Math.random() * 0.5)
      shootingStar.y = Math.random() * canvas.offsetHeight * 0.3
      shootingStar.vx = -(8 + Math.random() * 7); shootingStar.vy = 3 + Math.random() * 3
      shootingStar.life = 0; shootingStar.maxLife = 30 + Math.floor(Math.random() * 20)
      shootingStar.trail = []; shootingStar.active = true
      shootingStar.hue = STAR_HUES[Math.floor(Math.random() * STAR_HUES.length)]
    }

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.phase)
        const alpha = star.brightness * twinkle, size = star.baseSize * (0.8 + 0.2 * twinkle)
        if (star.baseSize > 1.5) {
          const glowRadius = size * (star.isColorful ? 4 : 3)
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius)
          if (star.isColorful) {
            glow.addColorStop(0, `hsla(${star.hue},80%,75%,${alpha*0.35})`)
            glow.addColorStop(0.5, `hsla(${star.hue},60%,60%,${alpha*0.12})`)
          } else {
            glow.addColorStop(0, `rgba(255,255,255,${alpha*0.25})`)
            glow.addColorStop(0.5, `rgba(255,255,255,${alpha*0.08})`)
          }
          glow.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = glow
          ctx.fillRect(star.x - glowRadius, star.y - glowRadius, glowRadius * 2, glowRadius * 2)
        }
        ctx.beginPath(); ctx.arc(star.x, star.y, size, 0, Math.PI * 2)
        ctx.fillStyle = star.isColorful ? `hsla(${star.hue},85%,80%,${alpha})` : `rgba(255,255,255,${alpha})`
        ctx.fill()
      }
      if (shootingStar.active) {
        shootingStar.x += shootingStar.vx; shootingStar.y += shootingStar.vy; shootingStar.life++
        shootingStar.trail.push({ x: shootingStar.x, y: shootingStar.y })
        if (shootingStar.trail.length > 10) shootingStar.trail.shift()
        if (shootingStar.life >= shootingStar.maxLife) shootingStar.active = false
        const lifeRatio = 1 - shootingStar.life / shootingStar.maxLife
        for (let i = 0; i < shootingStar.trail.length - 1; i++) {
          const t = i / shootingStar.trail.length, a = lifeRatio * (0.7 * t)
          ctx.beginPath(); ctx.moveTo(shootingStar.trail[i].x, shootingStar.trail[i].y)
          ctx.lineTo(shootingStar.trail[i+1].x, shootingStar.trail[i+1].y)
          ctx.strokeStyle = `hsla(${shootingStar.hue},90%,75%,${a})`; ctx.lineWidth = 3 * t; ctx.stroke()
        }
        ctx.beginPath(); ctx.arc(shootingStar.x, shootingStar.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${shootingStar.hue},100%,90%,${lifeRatio})`; ctx.fill()
      } else if (Math.random() < 0.004) { spawnShootingStar() }
      time++; animationId = requestAnimationFrame(draw)
    }
    draw(); window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize) }
  }, [reduced])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
}
