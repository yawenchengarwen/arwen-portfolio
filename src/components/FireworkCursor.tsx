import { useEffect, useRef } from 'react'

const BURST_COLORS = [
  '#FFF275', '#FFE8A3', '#FF7A00', '#FF4B91',
  '#FF4D4D', '#A85CF0', '#14279B', '#00D2C4',
  '#99FFCD', '#A3E4D7', '#D4AC0D',
]

const SPARK_COLORS = [
  '#FFF275', '#FFE8A3', '#F4A261', '#E9C46A',
]

interface Particle {
  x: number; y: number; vx: number; vy: number
  color: string; size: number; life: number; maxLife: number
  glow: boolean
}

export default function FireworkCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const lastSparkRef = useRef({ x: -9999, y: -9999 })
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    document.addEventListener('mouseleave', onMouseLeave)

    const spawnSpark = (x: number, y: number) => {
      const count = 1 + Math.floor(Math.random() * 2)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.8 + Math.random() * 2
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
          size: 1 + Math.random() * 1.5,
          life: 0,
          maxLife: 15 + Math.floor(Math.random() * 15),
          glow: false,
        })
      }
    }

    const spawnBurst = (x: number, y: number) => {
      const count = 20 + Math.floor(Math.random() * 15)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4
        const speed = 2 + Math.random() * 6
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
          size: 1.5 + Math.random() * 3,
          life: 0,
          maxLife: 30 + Math.floor(Math.random() * 35),
          glow: true,
        })
      }
      // inner bright core particles
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 1 + Math.random() * 2.5
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: i < 3 ? '#FFFFFF' : '#FFF275',
          size: 2 + Math.random() * 2.5,
          life: 0,
          maxLife: 12 + Math.floor(Math.random() * 10),
          glow: true,
        })
      }
    }

    const onClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY)
    }
    window.addEventListener('click', onClick)

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // spawn trailing sparks when moving
      if (mx > 0 && my > 0) {
        const dx = mx - lastSparkRef.current.x
        const dy = my - lastSparkRef.current.y
        const dist = Math.hypot(dx, dy)
        if (dist > 12) {
          lastSparkRef.current = { x: mx, y: my }
          spawnSpark(mx, my)
        }
      }

      // update & draw particles
      const fading: Particle[] = []
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.975
        p.vy *= 0.975
        p.vy += 0.04 // gravity
        p.life++
        const progress = p.life / p.maxLife

        // ease-out alpha curve for smooth fade
        const alpha = progress < 0.3
          ? 1
          : 1 - Math.pow((progress - 0.3) / 0.7, 1.5)

        if (alpha <= 0.02) return false

        // keep dying particles for one extra frame to draw at near-zero alpha
        if (alpha <= 0.05) {
          fading.push(p)
        }

        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha))
        const size = p.size * (1 - progress * 0.5)
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        if (p.glow) {
          ctx.shadowColor = p.color
          ctx.shadowBlur = size * 2.5
        }
        ctx.fill()
        ctx.restore()
        return true
      })

      // draw cursor core - small warm dot with subtle glow
      if (mx > 0 && my > 0) {
        // outer soft glow
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 8)
        glow.addColorStop(0, 'rgba(255, 232, 163, 0.6)')
        glow.addColorStop(0.3, 'rgba(255, 242, 117, 0.3)')
        glow.addColorStop(0.6, 'rgba(255, 232, 163, 0.05)')
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(mx, my, 8, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // core dot
        const core = ctx.createRadialGradient(mx, my, 0, mx, my, 3)
        core.addColorStop(0, '#FFFFFF')
        core.addColorStop(0.5, '#FFE8A3')
        core.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(mx, my, 3, 0, Math.PI * 2)
        ctx.fillStyle = core
        ctx.fill()
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ cursor: 'none' }}
    />
  )
}
