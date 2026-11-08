"use client"

import { useCallback, useEffect, useRef } from "react"

/**
 * React Bits Cubes Background Animation Component
 * Reference: https://reactbits.dev/c/animations/cubes
 * - Full-section interactive 3D CSS cube grid that tilts smoothly toward the cursor
 * - Subtle idle auto-drift & click ripple wave in Lime Green (#C6F432)
 * - Direct DOM transform updates (zero React re-renders on pointermove) for 60fps performance
 * - Styled with low-contrast Midnight Black faces & subtle borders to preserve foreground readability
 */
export default function Cubes({
  cols = 12,
  rows = 4,
  maxAngle = 28,
  radius = 3,
  faceColor = "#0E0E11",
  borderStyle = "1px solid rgba(255, 255, 255, 0.06)",
  rippleColor = "rgba(198, 244, 50, 0.22)",
  autoAnimate = true,
  rippleOnClick = true,
  className = "",
}) {
  const sceneRef = useRef(null)
  const rafRef = useRef(null)
  const idleTimerRef = useRef(null)
  const userActiveRef = useRef(false)
  const simPosRef = useRef({ x: 0, y: 0 })
  const simTargetRef = useRef({ x: 0, y: 0 })
  const simRAFRef = useRef(null)
  const isVisibleRef = useRef(false)

  const tiltAt = useCallback(
    (rowCenter, colCenter) => {
      if (!sceneRef.current) return
      const cubes = sceneRef.current.querySelectorAll(".rb-cube")
      cubes.forEach((cube) => {
        const r = +cube.dataset.row
        const c = +cube.dataset.col
        const dist = Math.hypot(r - rowCenter, c - colCenter)

        if (dist <= radius) {
          const pct = 1 - dist / radius
          const angle = pct * maxAngle
          const rotX = -angle * (r - rowCenter === 0 ? 0.6 : Math.sign(r - rowCenter))
          const rotY = angle * (c - colCenter === 0 ? 0.6 : Math.sign(c - colCenter))
          cube.style.transform = `rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`
          cube.dataset.active = dist < radius * 0.55 ? "true" : "false"
        } else {
          cube.style.transform = "rotateX(0deg) rotateY(0deg)"
          cube.dataset.active = "false"
        }
      })
    },
    [radius, maxAngle]
  )

  const resetAll = useCallback(() => {
    if (!sceneRef.current) return
    sceneRef.current.querySelectorAll(".rb-cube").forEach((cube) => {
      cube.style.transform = "rotateX(0deg) rotateY(0deg)"
      cube.dataset.active = "false"
    })
  }, [])

  const onPointerMove = useCallback(
    (e) => {
      if (!sceneRef.current) return
      userActiveRef.current = true
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)

      const rect = sceneRef.current.getBoundingClientRect()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return
      }

      const cellW = rect.width / cols
      const cellH = rect.height / rows
      const colCenter = (clientX - rect.left) / cellW
      const rowCenter = (clientY - rect.top) / cellH

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        tiltAt(rowCenter, colCenter)
      })

      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false
      }, 2200)
    },
    [cols, rows, tiltAt]
  )

  const onClick = useCallback(
    (e) => {
      if (!rippleOnClick || !sceneRef.current) return
      const rect = sceneRef.current.getBoundingClientRect()
      const clientX = e.clientX ?? (e.changedTouches && e.changedTouches[0]?.clientX)
      const clientY = e.clientY ?? (e.changedTouches && e.changedTouches[0]?.clientY)
      if (clientX === undefined || clientY === undefined) return

      const cellW = rect.width / cols
      const cellH = rect.height / rows
      const colHit = Math.floor((clientX - rect.left) / cellW)
      const rowHit = Math.floor((clientY - rect.top) / cellH)

      const cubes = sceneRef.current.querySelectorAll(".rb-cube")
      const rings = {}
      cubes.forEach((cube) => {
        const r = +cube.dataset.row
        const c = +cube.dataset.col
        const dist = Math.round(Math.hypot(r - rowHit, c - colHit))
        if (dist <= 5) {
          if (!rings[dist]) rings[dist] = []
          rings[dist].push(cube)
        }
      })

      Object.keys(rings).forEach((ringKey) => {
        const ringIdx = +ringKey
        setTimeout(() => {
          rings[ringIdx].forEach((cube) => {
            cube.querySelectorAll(".rb-cube-face").forEach((face) => {
              face.style.backgroundColor = rippleColor
              face.style.borderColor = "rgba(198, 244, 50, 0.45)"
            })
          })
          setTimeout(() => {
            rings[ringIdx].forEach((cube) => {
              cube.querySelectorAll(".rb-cube-face").forEach((face) => {
                face.style.backgroundColor = faceColor
                face.style.borderColor = ""
              })
            })
          }, 320)
        }, ringIdx * 65)
      })
    },
    [rippleOnClick, cols, rows, faceColor, rippleColor]
  )

  // Pause when footer is off-screen & run gentle idle auto-drift when visible
  useEffect(() => {
    const el = sceneRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    io.observe(el)

    if (!autoAnimate) return () => io.disconnect()

    simPosRef.current = {
      x: Math.random() * cols,
      y: Math.random() * rows,
    }
    simTargetRef.current = {
      x: Math.random() * cols,
      y: Math.random() * rows,
    }

    const speed = 0.012
    const loop = () => {
      if (isVisibleRef.current && !userActiveRef.current) {
        const pos = simPosRef.current
        const tgt = simTargetRef.current
        pos.x += (tgt.x - pos.x) * speed
        pos.y += (tgt.y - pos.y) * speed
        tiltAt(pos.y, pos.x)

        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.25) {
          simTargetRef.current = {
            x: Math.random() * cols,
            y: Math.random() * rows,
          }
        }
      }
      simRAFRef.current = requestAnimationFrame(loop)
    }
    simRAFRef.current = requestAnimationFrame(loop)

    return () => {
      io.disconnect()
      if (simRAFRef.current) cancelAnimationFrame(simRAFRef.current)
    }
  }, [autoAnimate, cols, rows, tiltAt])

  useEffect(() => {
    const el = sceneRef.current
    if (!el) return
    const footer = el.closest("footer") || el

    footer.addEventListener("pointermove", onPointerMove, { passive: true })
    footer.addEventListener("pointerleave", resetAll)
    footer.addEventListener("click", onClick)

    return () => {
      footer.removeEventListener("pointermove", onPointerMove)
      footer.removeEventListener("pointerleave", resetAll)
      footer.removeEventListener("click", onClick)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [onPointerMove, resetAll, onClick])

  const rowIndexes = Array.from({ length: rows })
  const colIndexes = Array.from({ length: cols })

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div
        ref={sceneRef}
        className="w-full h-full grid gap-2 p-2 [perspective:900px]"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {rowIndexes.map((_, r) =>
          colIndexes.map((__, c) => (
            <div
              key={`${r}-${c}`}
              data-row={r}
              data-col={c}
              data-active="false"
              className="rb-cube relative w-full h-full [transform-style:preserve-3d] transition-transform duration-300 ease-out will-change-transform"
            >
              {/* Front Face */}
              <div
                className="rb-cube-face absolute inset-0 rounded-md transition-colors duration-300"
                style={{
                  backgroundColor: faceColor,
                  border: borderStyle,
                  transform: "translateZ(18px)",
                }}
              />
              {/* Top Face */}
              <div
                className="rb-cube-face absolute inset-0 rounded-md transition-colors duration-300"
                style={{
                  backgroundColor: faceColor,
                  border: borderStyle,
                  transform: "rotateX(90deg) translateZ(18px)",
                }}
              />
              {/* Bottom Face */}
              <div
                className="rb-cube-face absolute inset-0 rounded-md transition-colors duration-300"
                style={{
                  backgroundColor: faceColor,
                  border: borderStyle,
                  transform: "rotateX(-90deg) translateZ(18px)",
                }}
              />
              {/* Left Face */}
              <div
                className="rb-cube-face absolute inset-0 rounded-md transition-colors duration-300"
                style={{
                  backgroundColor: faceColor,
                  border: borderStyle,
                  transform: "rotateY(-90deg) translateZ(18px)",
                }}
              />
              {/* Right Face */}
              <div
                className="rb-cube-face absolute inset-0 rounded-md transition-colors duration-300"
                style={{
                  backgroundColor: faceColor,
                  border: borderStyle,
                  transform: "rotateY(90deg) translateZ(18px)",
                }}
              />
            </div>
          ))
        )}
      </div>

      {/* Subtle highlight border on active tilted cubes */}
      <style>{`
        .rb-cube[data-active="true"] > .rb-cube-face {
          border-color: rgba(198, 244, 50, 0.24) !important;
        }
      `}</style>
    </div>
  )
}
