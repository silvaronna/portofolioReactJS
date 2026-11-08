"use client"

import { useRef, useEffect, useState, useMemo, useId } from "react"

const textItems = [
  "SITE RELIABILITY ENGINEER",
  "TECH ENTHUSIAST",
  "SYSTEM ARCHITECT",
]

/**
 * React Bits Curved Loop Running Text
 * Reference: https://reactbits.dev/text-animations/curved-loop
 * Features:
 * - Curved SVG <textPath> along a quadratic Bézier arc
 * - 70% opacity with Midnight Black / Pure White (#FFFFFF) / Lime Green (#C6F432) accent palette
 * - Slow continuous auto-loop + interactive drag/swipe scrolling on both mobile & desktop
 */
export default function RunningText({
  speed = 0.85,
  curveAmount = 95,
  direction = "left",
  interactive = true,
}) {
  const measureRef = useRef(null)
  const textPathRef = useRef(null)
  const [spacing, setSpacing] = useState(0)
  const [ isDragging, setIsDragging ] = useState(false)

  const uid = useId()
  const pathId = `curved-loop-path-${uid.replace(/:/g, "")}`
  const pathD = `M-120,45 Q720,${45 + curveAmount} 1560,45`

  const dragRef = useRef(false)
  const lastXRef = useRef(0)
  const dirRef = useRef(direction)
  const velRef = useRef(0)
  const offsetRef = useRef(0)

  // Single cycle string used for exact width measurement
  const singleCycleString = useMemo(() => {
    return textItems.map((item) => `${item}   ✦   `).join("")
  }, [])

  // Measure the exact pixel width of one full cycle of textItems
  useEffect(() => {
    const updateSpacing = () => {
      if (measureRef.current) {
        const len = measureRef.current.getComputedTextLength()
        if (len > 0) {
          setSpacing(len)
        }
      }
    }
    updateSpacing()
    window.addEventListener("resize", updateSpacing)
    return () => window.removeEventListener("resize", updateSpacing)
  }, [singleCycleString])

  // Initialize offset once spacing is measured
  useEffect(() => {
    if (!spacing || !textPathRef.current) return
    const initial = -spacing
    offsetRef.current = initial
    textPathRef.current.setAttribute("startOffset", `${initial}px`)
  }, [spacing])

  // Continuous slow loop animation via requestAnimationFrame
  useEffect(() => {
    if (!spacing) return
    let frameId = 0

    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed
        let nextOffset = offsetRef.current + delta

        if (nextOffset <= -spacing * 2) nextOffset += spacing
        if (nextOffset > -spacing * 0.25) nextOffset -= spacing

        offsetRef.current = nextOffset
        textPathRef.current.setAttribute("startOffset", `${nextOffset}px`)
      }
      frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [spacing, speed])

  // Pointer & touch handlers for interactive scrolling on mobile and desktop
  const handlePointerDown = (e) => {
    if (!interactive) return
    dragRef.current = true
    setIsDragging(true)
    lastXRef.current = e.clientX
    velRef.current = 0
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!interactive || !dragRef.current || !textPathRef.current || !spacing) return
    const dx = e.clientX - lastXRef.current
    lastXRef.current = e.clientX
    velRef.current = dx

    let nextOffset = offsetRef.current + dx
    if (nextOffset <= -spacing * 2) nextOffset += spacing
    if (nextOffset > 0) nextOffset -= spacing

    offsetRef.current = nextOffset
    textPathRef.current.setAttribute("startOffset", `${nextOffset}px`)
  }

  const handlePointerEnd = (e) => {
    if (!interactive || !dragRef.current) return
    dragRef.current = false
    setIsDragging(false)
    if (Math.abs(velRef.current) > 0.5) {
      dirRef.current = velRef.current > 0 ? "right" : "left"
    }
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  // Horizontal wheel/trackpad scroll support on desktop
  const handleWheel = (e) => {
    if (!interactive || !textPathRef.current || !spacing) return
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      let nextOffset = offsetRef.current - e.deltaX * 0.6
      if (nextOffset <= -spacing * 2) nextOffset += spacing
      if (nextOffset > 0) nextOffset -= spacing
      offsetRef.current = nextOffset
      textPathRef.current.setAttribute("startOffset", `${nextOffset}px`)
      dirRef.current = e.deltaX > 0 ? "left" : "right"
    }
  }

  const repeatCount = spacing ? Math.max(4, Math.ceil(2400 / spacing) + 3) : 4

  return (
    <div
      className={`absolute bottom-28 sm:bottom-24 md:bottom-20 left-0 w-full z-20 opacity-50 select-none overflow-hidden touch-pan-y ${
        interactive ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "pointer-events-none"
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      onWheel={handleWheel}
    >
      <svg
        className="w-full overflow-visible block aspect-[1440/150] min-h-[72px] sm:min-h-[95px] md:min-h-[120px] text-[3.2rem] sm:text-[2.75rem] md:text-[2.5rem] font-extrabold uppercase tracking-[0.08em] leading-none"
        viewBox="0 0 1440 150"
      >
        {/* Hidden text element used to measure exact single-cycle length */}
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{
            visibility: "hidden",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {singleCycleString}
        </text>

        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>

        {spacing > 0 && (
          <text xmlSpace="preserve" className="fill-white">
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${-spacing}px`}
              xmlSpace="preserve"
            >
              {Array.from({ length: repeatCount }).map((_, cycleIdx) =>
                textItems.map((item, itemIdx) => (
                  <tspan key={`${cycleIdx}-${itemIdx}`}>
                    <tspan fill="#FFFFFF">{item}</tspan>
                    <tspan fill="#C6F432">{"   ✦   "}</tspan>
                  </tspan>
                ))
              )}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  )
}
