"use client"

import { useState, useEffect, useRef, useCallback } from "react"

/**
 * React Bits Tech Text Component
 * Reference: https://reactbits.dev/text-animations/tech-text
 * Blueprint / engineering-inspired headline with:
 * - Structural font metric guide lines (cap-height, x-height, baseline)
 * - Intro animation: metric lines rule across + dashed vector outlines draw in
 * - Interactive pointer proximity: letters transition into animated dashed vector outlines with bounding ticks
 * - Click ripple wave propagation across glyphs
 */
export default function TechText({
  text = "Hello, I'm Azka.",
  accentCharIndex = -1, // defaults to last character '.'
  className = "",
  showGuides = true,
}) {
  const containerRef = useRef(null)
  const charRefs = useRef([])
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [mouseRel, setMouseRel] = useState({ x: 0, y: 0, active: false })
  const [introDone, setIntroDone] = useState(false)
  const [ripple, setRipple] = useState(null)

  const chars = Array.from(text)
  const effectiveAccentIdx =
    accentCharIndex >= 0 ? accentCharIndex : chars.length - 1

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroDone(true)
    }, 1100)
    return () => clearTimeout(timer)
  }, [])

  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    setMouseRel({
      x: Math.round(clientX - rect.left),
      y: Math.round(clientY - rect.top),
      active: true,
    })

    // Find closest character to pointer
    let closestIdx = null
    let minDist = Infinity
    charRefs.current.forEach((el, idx) => {
      if (!el || chars[idx] === " ") return
      const cRect = el.getBoundingClientRect()
      const cx = cRect.left + cRect.width / 2
      const cy = cRect.top + cRect.height / 2
      const dist = Math.hypot(clientX - cx, clientY - cy)
      if (dist < minDist && dist < 95) {
        minDist = dist
        closestIdx = idx
      }
    })
    setHoveredIndex(closestIdx)
  }, [chars])

  const handlePointerLeave = useCallback(() => {
    setHoveredIndex(null)
    setMouseRel((prev) => ({ ...prev, active: false }))
  }, [])

  const handleClick = useCallback(
    (idx) => {
      const origin = idx ?? hoveredIndex ?? Math.floor(chars.length / 2)
      setRipple({ origin, id: Date.now() })
      setTimeout(() => {
        setRipple(null)
      }, 900)
    },
    [hoveredIndex, chars.length]
  )

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
      onClick={() => handleClick(hoveredIndex)}
      className={`relative inline-block select-none cursor-crosshair px-4 py-2 ${className}`}
    >
      {/* Structural Font Metric Guide Lines (Cap-Height, X-Height, Baseline) */}
      {showGuides && (
        <div
          className="pointer-events-none absolute inset-x-0 inset-y-1 z-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Cap-Height Line */}
          <div
            className={`absolute left-0 right-0 top-[16%] border-t border-dashed transition-all duration-700 origin-left ${
              mouseRel.active
                ? "border-[#C6F432]/35 scale-x-100"
                : "border-white/15 scale-x-100"
            }`}
            style={{
              animation: "techLineRule 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />
          <span className="absolute left-0 top-[16%] -translate-y-full text-[8px] font-mono tracking-widest text-white/30 uppercase">
            CAP
          </span>

          {/* X-Height Line */}
          <div
            className={`absolute left-0 right-0 top-[44%] border-t border-dashed transition-all duration-700 origin-left ${
              mouseRel.active ? "border-white/25" : "border-white/10"
            }`}
            style={{
              animation:
                "techLineRule 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />
          <span className="absolute right-0 top-[44%] -translate-y-full text-[8px] font-mono tracking-widest text-[#C6F432]/45 uppercase">
            X-H
          </span>

          {/* Baseline */}
          <div
            className={`absolute left-0 right-0 bottom-[18%] border-t transition-all duration-700 origin-left ${
              mouseRel.active ? "border-[#C6F432]/40" : "border-white/15"
            }`}
            style={{
              animation: "techLineRule 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />
          <span className="absolute left-0 bottom-[18%] translate-y-full text-[8px] font-mono tracking-widest text-white/30 uppercase">
            BASE
          </span>

          {/* Corner Blueprint Crosshairs */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C6F432]/60" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C6F432]/60" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C6F432]/60" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C6F432]/60" />

          {/* Live Metric Readout Pill on Hover */}
          <div
            className={`absolute right-1 bottom-0 translate-y-full pt-0.5 text-[8px] font-mono tracking-wider transition-opacity duration-200 ${
              mouseRel.active ? "opacity-80 text-[#C6F432]" : "opacity-35 text-white/40"
            }`}
          >
            {mouseRel.active && hoveredIndex !== null
              ? `GLYPH[${String(hoveredIndex).padStart(2, "0")}] // X:${mouseRel.x}px`
              : "SPEC // 700-BOLD"}
          </div>
        </div>
      )}

      {/* Character-by-Character Blueprint Vector & Solid Layer */}
      <h1
        aria-label={text}
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight inline-flex flex-wrap items-baseline justify-center"
      >
        {chars.map((char, idx) => {
          if (char === " ") {
            return (
              <span
                key={idx}
                className="inline-block w-[0.28em]"
                aria-hidden="true"
              >
                &nbsp;
              </span>
            )
          }

          const isAccent = idx === effectiveAccentIdx
          const distFromHover =
            hoveredIndex !== null ? Math.abs(idx - hoveredIndex) : Infinity
          const isDirectHover = distFromHover === 0
          const isNeighborHover = distFromHover === 1

          // Ripple wave delay if clicked
          const isRippling = ripple !== null
          const rippleDelayMs = isRippling
            ? Math.abs(idx - ripple.origin) * 45
            : 0

          // Determine whether this character should show blueprint dashed-outline mode
          const showBlueprintOutline =
            !introDone || isDirectHover || isNeighborHover || isRippling

          return (
            <span
              key={idx}
              ref={(el) => {
                charRefs.current[idx] = el
              }}
              style={{
                animationDelay: `${idx * 45}ms`,
                transitionDelay: isRippling ? `${rippleDelayMs}ms` : "0ms",
              }}
              className="relative inline-block px-[0.5px] transition-transform duration-200"
            >
              {/* Per-Glyph Bounding Box Frame when Hovered */}
              {isDirectHover && (
                <span
                  className="pointer-events-none absolute -inset-x-0.5 inset-y-1 border border-dashed border-[#C6F432]/65 bg-[#C6F432]/[0.04] rounded-[2px]"
                  aria-hidden="true"
                >
                  <span className="absolute -top-1 -left-1 w-1 h-1 bg-[#C6F432]" />
                  <span className="absolute -top-1 -right-1 w-1 h-1 bg-[#C6F432]" />
                  <span className="absolute -bottom-1 -left-1 w-1 h-1 bg-[#C6F432]" />
                  <span className="absolute -bottom-1 -right-1 w-1 h-1 bg-[#C6F432]" />
                </span>
              )}

              {/* Solid / Gradient Base Glyph */}
              <span
                className={`relative z-10 inline-block transition-all duration-200 ${
                  isAccent
                    ? "text-[#C6F432]"
                    : isDirectHover
                    ? "text-transparent"
                    : isNeighborHover
                    ? "text-white/35"
                    : "text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/65"
                }`}
                style={{
                  opacity: introDone ? 1 : 0,
                  transform: isDirectHover
                    ? "translateY(-2px)"
                    : isRippling
                    ? "translateY(-3px)"
                    : "translateY(0)",
                }}
              >
                {char}
              </span>

              {/* SVG Dashed Blueprint Vector Outline Overlay */}
              <svg
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 w-full h-full overflow-visible transition-opacity duration-200 ${
                  showBlueprintOutline ? "opacity-100" : "opacity-0"
                }`}
              >
                <text
                  x="50%"
                  y="80%"
                  textAnchor="middle"
                  className="font-bold fill-transparent"
                  style={{
                    fontSize: "1em",
                    stroke: isAccent || isDirectHover ? "#C6F432" : "#FFFFFF",
                    strokeWidth: isDirectHover ? "1.6px" : "1.15px",
                    strokeDasharray: isDirectHover ? "3 2" : "4 2.5",
                    animation: "techDashMarch 1.2s linear infinite",
                    filter: isDirectHover
                      ? "drop-shadow(0 0 8px rgba(198,244,50,0.45))"
                      : "none",
                  }}
                >
                  {char}
                </text>
              </svg>
            </span>
          )
        })}
      </h1>

      <style>{`
        @keyframes techDashMarch {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -12;
          }
        }
        @keyframes techLineRule {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
