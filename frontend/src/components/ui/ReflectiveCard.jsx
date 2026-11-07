"use client"

import { useRef, useState, useCallback } from "react"
import Icon from "./Icon"

/**
 * Compact Reflective Profile Card inspired by React Bits Reflective Card
 * Features 3D pointer tilt, dynamic metallic/specular sheen reflection,
 * portrait photo placeholder, and Midnight Black / Pure White / Lime Green grading.
 */
export default function ReflectiveCard({
  name = "Azka Abdillah",
  role = "System Engineer",
  badgeId = "SRE // IDN-01",
  email = "azka.abdillah@outlook.co.id",
  status = "Available",
  avatarSrc = "/mee.jpeg",
  avatarPosition = "50% 78%",
}) {
  const cardRef = useRef(null)
  const [transformStyle, setTransformStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 80,
    glareOpacity: 0,
  })

  const handlePointerMove = useCallback((e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    const relX = (clientX - rect.left) / rect.width
    const relY = (clientY - rect.top) / rect.height

    const clampedX = Math.max(0, Math.min(1, relX))
    const clampedY = Math.max(0, Math.min(1, relY))

    const rotateY = (clampedX - 0.5) * 18
    const rotateX = (0.5 - clampedY) * 18

    setTransformStyle({
      rotateX,
      rotateY,
      glareX: clampedX * 100,
      glareY: clampedY * 100,
      glareOpacity: 1,
    })
  }, [])

  const handlePointerLeave = useCallback(() => {
    setTransformStyle((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      glareOpacity: 0,
    }))
  }, [])

  return (
    <div className="w-full max-w-[205px] sm:max-w-[215px] mx-auto md:mx-0 select-none [perspective:900px]">
      <div
        ref={cardRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerLeave}
        style={{
          transform: `rotateX(${transformStyle.rotateX}deg) rotateY(${transformStyle.rotateY}deg)`,
          transition:
            transformStyle.glareOpacity === 1
              ? "transform 120ms cubic-bezier(0.03, 0.98, 0.52, 0.99)"
              : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/30 via-white/10 to-[#C6F432]/30 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)] cursor-pointer overflow-hidden"
      >
        {/* Dynamic Border Specular Reflection */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: transformStyle.glareOpacity,
            background: `radial-gradient(160px circle at ${transformStyle.glareX}% ${transformStyle.glareY}%, rgba(255,255,255,0.55), rgba(198,244,50,0.25) 40%, transparent 75%)`,
          }}
        />

        {/* Inner Card Surface */}
        <div className="relative rounded-[15px] bg-[#101013] p-3 overflow-hidden flex flex-col justify-between">
          {/* Brushed Metallic Base Texture & Security Micro-Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px), linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)`,
              backgroundSize: "10px 10px, 100% 100%",
            }}
          />

          {/* Interactive Chrome / Reflective Sheen Layer */}
          <div
            className="pointer-events-none absolute inset-0 z-20 mix-blend-screen transition-opacity duration-300"
            style={{
              opacity: transformStyle.glareOpacity * 0.85,
              background: `
                radial-gradient(180px circle at ${transformStyle.glareX}% ${transformStyle.glareY}%, rgba(255, 255, 255, 0.22), rgba(198, 244, 50, 0.08) 45%, transparent 75%),
                linear-gradient(${115 + (transformStyle.glareX - 50) * 0.5}deg, transparent 20%, rgba(255, 255, 255, 0.09) 46%, rgba(198, 244, 50, 0.12) 50%, rgba(255, 255, 255, 0.08) 54%, transparent 80%)
              `,
            }}
          />

          {/* Ambient Diagonal Metallic Shimmer (Visible even when idle) */}
          <div
            className="pointer-events-none absolute -inset-full z-10 opacity-30 group-hover:opacity-0 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(125deg, transparent 38%, rgba(255,255,255,0.08) 48%, rgba(198,244,50,0.06) 51%, transparent 62%)",
            }}
          />

          {/* Top Lanyard Slot & Pass Header */}
          <div className="relative z-10">
            {/* Metallic Badge Slot Cutout */}
            <div className="mx-auto w-8 h-1.5 rounded-full bg-[#0B0B0C] border border-white/15 mb-2 shadow-inner" />

            <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-white/10">
              <span className="text-[8px] font-mono font-semibold uppercase tracking-widest text-white/50">
                {badgeId}
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#C6F432]/10 border border-[#C6F432]/30 text-[8px] font-semibold text-[#C6F432]">
                <span className="w-1 h-1 rounded-full bg-[#C6F432] animate-pulse" />
                {status}
              </span>
            </div>
          </div>

          {/* Portrait Photo Container (3:4 Portrait Aspect Ratio) */}
          <div className="relative z-10 my-2.5">
            <div className="relative w-full aspect-[3/4] max-h-[500px] mx-auto rounded-xl p-[1px] bg-gradient-to-tr from-white/25 via-white/10 to-[#C6F432]/40 shadow-[0_8px_22px_rgba(0,0,0,0.75)] overflow-hidden">
              <div className="w-full h-full rounded-[11px] bg-[#0B0B0C] overflow-hidden relative flex flex-col items-center justify-center">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={name}
                    style={{ objectPosition: avatarPosition }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Portrait Silhouette Placeholder */
                  <div className="w-full h-full flex flex-col items-center justify-end bg-gradient-to-b from-[#16161A] via-[#121215] to-[#0B0B0C] relative overflow-hidden pt-4">
                    {/* Subtle Radial Backlight */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/[0.04] blur-xl pointer-events-none" />

                    {/* Portrait Silhouette SVG */}
                    <svg
                      viewBox="0 0 120 150"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-28 h-32 text-white/15 group-hover:text-white/25 transition-colors duration-300"
                    >
                      <circle cx="60" cy="46" r="22" fill="currentColor" />
                      <path
                        d="M18 142C18 111.072 36.804 88 60 88C83.196 88 102 111.072 102 142"
                        fill="currentColor"
                      />
                    </svg>

                    {/* Portrait Placeholder Label Pill */}
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[8px] font-mono text-white/45 uppercase tracking-wider">
                      3:4 Portrait
                    </div>
                  </div>
                )}

                {/* Bottom Gradient Name & Role Overlay on Portrait */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/85 to-transparent pt-6 pb-2 px-2.5 text-center">
                  <h3 className="text-xs font-bold text-white tracking-tight leading-tight">
                    {name}
                  </h3>
                  <p className="text-[10px] font-medium text-[#C6F432] mt-0.5">
                    {role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Metallic Spec Bar with Email */}
          <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-center text-[9px] text-white/60">
            <div className="flex items-center gap-1.5 font-medium min-w-0">
              <Icon name="Mail" size={10} className="text-[#C6F432] shrink-0" />
              <span className="truncate">{email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
