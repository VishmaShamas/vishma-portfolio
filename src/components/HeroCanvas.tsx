import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; opacity: number
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let animId = 0
    let W = 0, H = 0
    let particles: Particle[] = []

    // Laser state
    let laserY = -200
    let laserActive = false
    let laserSpeed = 0
    let laserTimer = 0

    const GREEN = '34,197,94'

    function resize() {
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W
      canvas.height = H
      init()
    }

    function init() {
      const count = Math.floor((W * H) / 14000)
      particles = Array.from({ length: Math.min(count, 90) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.5 + 0.2,
      }))
    }

    function drawConnections() {
      const maxDist = 140
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${GREEN},${alpha})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function drawParticles() {
      const mx = mouse.current.x
      const my = mouse.current.y
      particles.forEach(p => {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const glow = dist < 120 ? (1 - dist / 120) * 0.7 : 0
        const alpha = Math.min(p.opacity + glow, 0.9)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + glow * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${GREEN},${alpha})`
        if (glow > 0.1) {
          ctx.shadowBlur = 8
          ctx.shadowColor = `rgba(${GREEN},0.6)`
        } else {
          ctx.shadowBlur = 0
        }
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    function drawMouseGlow() {
      const mx = mouse.current.x
      const my = mouse.current.y
      if (mx < 0 || my < 0 || mx > W || my > H) return
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 180)
      grad.addColorStop(0, `rgba(${GREEN},0.07)`)
      grad.addColorStop(1, `rgba(${GREEN},0)`)
      ctx.beginPath()
      ctx.arc(mx, my, 180, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    }

    function drawLaser() {
      if (!laserActive) return
      const progress = laserY / (H + 200)
      const alpha = progress < 0.15 ? progress / 0.15
        : progress > 0.85 ? (1 - progress) / 0.15
        : 1
      // Glow band
      const bandH = 100
      const grad = ctx.createLinearGradient(0, laserY - bandH, 0, laserY + bandH)
      grad.addColorStop(0, 'rgba(34,197,94,0)')
      grad.addColorStop(0.45, `rgba(34,197,94,${0.04 * alpha})`)
      grad.addColorStop(0.5, `rgba(34,197,94,${0.22 * alpha})`)
      grad.addColorStop(0.55, `rgba(34,197,94,${0.04 * alpha})`)
      grad.addColorStop(1, 'rgba(34,197,94,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, laserY - bandH, W, bandH * 2)
      // Core line
      ctx.beginPath()
      ctx.moveTo(0, laserY)
      ctx.lineTo(W, laserY)
      ctx.strokeStyle = `rgba(180,255,210,${0.7 * alpha})`
      ctx.lineWidth = 1
      ctx.shadowBlur = 16
      ctx.shadowColor = `rgba(34,197,94,0.9)`
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    function tick(_ts: number) {
      ctx.clearRect(0, 0, W, H)

      // Update particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      })

      // Laser timing
      if (!laserActive) {
        laserTimer += 16
        if (laserTimer > 7000) {
          laserActive = true
          laserTimer = 0
          laserY = -120
          laserSpeed = (H + 240) / 80 // sweep in ~80 frames
        }
      } else {
        laserY += laserSpeed
        if (laserY > H + 120) laserActive = false
      }

      drawMouseGlow()
      drawConnections()
      drawParticles()
      drawLaser()
      animId = requestAnimationFrame(tick)
    }

    resize()
    animId = requestAnimationFrame(tick)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  )
}
