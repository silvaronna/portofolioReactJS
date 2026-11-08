"use client"

import { useEffect, useRef } from "react"

/**
 * React Bits Electric Border (Smooth Canvas Perimeter Implementation)
 * Reference: https://reactbits.dev/c/animations/electric-border
 * - Uses a lightweight 2D Canvas around the card perimeter with smooth octaves of noise
 * - Idle state: Calm, gentle, slow-flowing electric current along the border (readable & smooth)
 * - Hover state: Smoothly interpolates to a faster, brighter electric surge
 * - Automatically pauses via IntersectionObserver when scrolled out of view for 0% offscreen CPU/GPU cost
 */
export default function ElectricBorder({
  children,
  color = "#C6F432",
  borderRadius = 16,
  className = "",
  style = {},
  active = false,
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const activeRef = useRef(active)
  const isVisibleRef = useRef(false)
  const phaseRef = useRef(Math.random() * 100)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId = 0
    let lastTime = performance.now()

    // Smoothly interpolated parameters between idle (calm) and hover (energized)
    let currentAmp = 1.35
    let currentSpeed = 0.75
    let currentAlpha = 0.42

    const pad = 10

    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(rect.width + pad * 2)
      const h = Math.round(rect.height + pad * 2)

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
      }
    }

    updateSize()
    const ro = new ResizeObserver(updateSize)
    ro.observe(container)

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    io.observe(container)

    // Smooth pseudo-Perlin 1D wave along perimeter distance s and time t
    const sampleElectricNoise = (s, t) => {
      return (
        Math.sin(s * 0.045 - t * 2.1) * 0.5 +
        Math.sin(s * 0.11 + t * 3.4) * 0.3 +
        Math.cos(s * 0.23 - t * 5.2) * 0.2
      )
    }

    // Get point and outward normal along a rounded rectangle perimeter
    const getRoundedRectPoint = (dist, w, h, r) => {
      const straightW = Math.max(0, w - 2 * r)
      const straightH = Math.max(0, h - 2 * r)
      const cornerLen = 0.5 * Math.PI * r
      const totalP = 2 * (straightW + straightH) + 4 * cornerLen
      let d = ((dist % totalP) + totalP) % totalP

      // 1. Top edge
      if (d < straightW) {
        return { x: r + d, y: 0, nx: 0, ny: -1 }
      }
      d -= straightW

      // 2. Top-right corner
      if (d < cornerLen) {
        const angle = -Math.PI / 2 + d / r
        const cx = w - r
        const cy = r
        return {
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          nx: Math.cos(angle),
          ny: Math.sin(angle),
        }
      }
      d -= cornerLen

      // 3. Right edge
      if (d < straightH) {
        return { x: w, y: r + d, nx: 1, ny: 0 }
      }
      d -= straightH

      // 4. Bottom-right corner
      if (d < cornerLen) {
        const angle = d / r
        const cx = w - r
        const cy = h - r
        return {
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          nx: Math.cos(angle),
          ny: Math.sin(angle),
        }
      }
      d -= cornerLen

      // 5. Bottom edge
      if (d < straightW) {
        return { x: w - r - d, y: h, nx: 0, ny: 1 }
      }
      d -= straightW

      // 6. Bottom-left corner
      if (d < cornerLen) {
        const angle = Math.PI / 2 + d / r
        const cx = r
        const cy = h - r
        return {
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          nx: Math.cos(angle),
          ny: Math.sin(angle),
        }
      }
      d -= cornerLen

      // 7. Left edge
      if (d < straightH) {
        return { x: 0, y: h - r - d, nx: -1, ny: 0 }
      }
      d -= straightH

      // 8. Top-left corner
      const angle = Math.PI + d / r
      const cx = r
      const cy = r
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        nx: Math.cos(angle),
        ny: Math.sin(angle),
      }
    }

    const render = (now) => {
      animationFrameId = requestAnimationFrame(render)
      if (!isVisibleRef.current) {
        lastTime = now
        return
      }

      const dt = Math.min(0.05, (now - lastTime) / 1000)
      lastTime = now

      const isHovered = activeRef.current
      const targetAmp = isHovered ? 2.8 : 1.25
      const targetSpeed = isHovered ? 2.1 : 0.65
      const targetAlpha = isHovered ? 0.92 : 0.42

      currentAmp += (targetAmp - currentAmp) * 0.08
      currentSpeed += (targetSpeed - currentSpeed) * 0.08
      currentAlpha += (targetAlpha - currentAlpha) * 0.08

      phaseRef.current += dt * currentSpeed
      const t = phaseRef.current

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const fullW = canvas.width / dpr
      const fullH = canvas.height / dpr
      const boxW = fullW - pad * 2
      const boxH = fullH - pad * 2
      if (boxW <= 0 || boxH <= 0) return

      const r = Math.min(borderRadius, boxW / 2, boxH / 2)
      const totalPerimeter =
        2 * (Math.max(0, boxW - 2 * r) + Math.max(0, boxH - 2 * r)) +
        2 * Math.PI * r

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, fullW, fullH)
      ctx.translate(pad, pad)

      const steps = 140
      const stepDist = totalPerimeter / steps

      // Draw primary electric filament
      ctx.beginPath()
      for (let i = 0; i <= steps; i++) {
        const dist = i * stepDist
        const pt = getRoundedRectPoint(dist, boxW, boxH, r)
        const n = sampleElectricNoise(dist, t) * currentAmp
        const x = pt.x + pt.nx * n
        const y = pt.y + pt.ny * n
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()

      ctx.strokeStyle = color
      ctx.lineWidth = isHovered ? 1.4 : 1.05
      ctx.globalAlpha = currentAlpha
      ctx.shadowColor = color
      ctx.shadowBlur = isHovered ? 8 : 3
      ctx.stroke()

      // Draw secondary subtle counter-wave filament for organic React Bits look
      ctx.beginPath()
      for (let i = 0; i <= steps; i++) {
        const dist = i * stepDist
        const pt = getRoundedRectPoint(dist, boxW, boxH, r)
        const n = sampleElectricNoise(dist + 90, -t * 0.85) * (currentAmp * 0.65)
        const x = pt.x + pt.nx * n
        const y = pt.y + pt.ny * n
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()

      ctx.strokeStyle = isHovered ? "#FFFFFF" : color
      ctx.lineWidth = 0.75
      ctx.globalAlpha = currentAlpha * 0.45
      ctx.shadowBlur = 0
      ctx.stroke()

      ctx.restore()
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      ro.disconnect()
      io.disconnect()
    }
  }, [color, borderRadius])

  return (
    <div
      ref={containerRef}
      className={`relative isolate rounded-2xl ${className}`}
      style={style}
    >
      {/* Subtle Base Border for Structural Crispness */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl z-20 border transition-colors duration-300"
        style={{
          borderColor: active
            ? "rgba(198, 244, 50, 0.35)"
            : "rgba(255, 255, 255, 0.08)",
        }}
      />

      {/* Smooth Canvas Electric Perimeter Overlay */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute -left-[10px] -top-[10px] z-20"
        aria-hidden="true"
      />

      {/* Card Inner Content */}
      <div className="relative z-10 h-full w-full rounded-2xl">{children}</div>
    </div>
  )
}
