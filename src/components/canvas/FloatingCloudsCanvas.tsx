import { useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Cloud { x: number; y: number; width: number; height: number; speed: number; opacity: number }

export default function FloatingCloudsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animationId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    const clouds: Cloud[] = []
    for (let i = 0; i < 5; i++) {
      clouds.push({
        x: Math.random() * canvas.offsetWidth, y: canvas.offsetHeight * (0.7 + Math.random() * 0.2),
        width: 200 + Math.random() * 300, height: 60 + Math.random() * 60,
        speed: 0.1 + Math.random() * 0.2, opacity: 0.3 + Math.random() * 0.4,
      })
    }

    const drawCloud = (cloud: Cloud) => {
      const { x, y, width: w, height: h, opacity } = cloud
      ctx.fillStyle = `rgba(26,39,68,${opacity})`; ctx.strokeStyle = `rgba(244,162,97,${opacity*0.15})`; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(x, y)
      ctx.bezierCurveTo(x+w*0.1, y-h*0.8, x+w*0.3, y-h*0.9, x+w*0.4, y-h*0.3)
      ctx.bezierCurveTo(x+w*0.45, y-h*0.8, x+w*0.6, y-h*0.9, x+w*0.65, y-h*0.2)
      ctx.bezierCurveTo(x+w*0.7, y-h*0.7, x+w*0.85, y-h*0.8, x+w, y)
      ctx.bezierCurveTo(x+w*0.9, y+h*0.3, x+w*0.7, y+h*0.2, x+w*0.5, y+h*0.1)
      ctx.bezierCurveTo(x+w*0.3, y+h*0.25, x+w*0.1, y+h*0.2, x, y)
      ctx.closePath(); ctx.fill(); ctx.stroke()
    }

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      for (const cloud of clouds) {
        cloud.x -= cloud.speed
        if (cloud.x + cloud.width < -50) { cloud.x = w + 50; cloud.y = h * (0.7 + Math.random() * 0.2) }
        drawCloud(cloud)
      }
      animationId = requestAnimationFrame(draw)
    }
    draw(); window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize) }
  }, [reduced])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />
}
