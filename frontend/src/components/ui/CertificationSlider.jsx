"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "motion/react"
import Icon from "./Icon"

export default function CertificationSlider({
  certifications = [],
  selectedCert,
  onCertClick,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const total = certifications.length

  useEffect(() => {
    if (selectedCert) {
      const idx = certifications.findIndex((c) => c.id === selectedCert)
      if (idx !== -1) setActiveIndex(idx)
    }
  }, [selectedCert, certifications])

  const handleNext = useCallback(() => {
    if (total === 0) return
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  const handlePrev = useCallback(() => {
    if (total === 0) return
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [handleNext, handlePrev])

  const getCircularOffset = (index) => {
    let diff = index - activeIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  }

  const handlePointerDown = (e) => {
    setIsDragging(true)
    dragStartX.current = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    const endX = e.clientX ?? (e.changedTouches && e.changedTouches[0]?.clientX) ?? dragStartX.current
    const delta = endX - dragStartX.current
    if (Math.abs(delta) > 45) {
      if (delta < 0) handleNext()
      else handlePrev()
    }
  }

  const handleCardSelect = (cert, index) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    } else {
      onCertClick?.(cert)
    }
  }

  if (total === 0) return null

  const activeCert = certifications[activeIndex]

  return (
    <div className="relative w-full select-none py-4">
      {/* Circular Arc Stage */}
      <div
        className="relative w-full h-[310px] sm:h-[340px] flex items-center justify-center overflow-hidden [perspective:1200px] cursor-grab active:cursor-grabbing"
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      >
        {certifications.map((cert, index) => {
          const offset = getCircularOffset(index)
          const absOffset = Math.abs(offset)
          const isCenter = offset === 0

          const translateX = offset * 215
          const translateY = Math.pow(absOffset, 1.55) * 22
          const scale = isCenter ? 1 : Math.max(0.72, 1 - absOffset * 0.14)
          const rotateZ = offset * 7
          const rotateY = offset * -16
          const zIndex = 30 - absOffset * 5
          const opacity = absOffset > 2 ? 0 : isCenter ? 1 : Math.max(0.35, 0.8 - (absOffset - 1) * 0.3)

          return (
            <motion.div
              key={cert.id}
              initial={false}
              animate={{
                x: translateX,
                y: translateY,
                scale,
                rotateZ,
                rotateY,
                opacity,
                zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 26,
                mass: 0.9,
              }}
              onClick={() => handleCardSelect(cert, index)}
              style={{ transformStyle: "preserve-3d" }}
              className={`absolute w-[220px] sm:w-[250px] h-[265px] sm:h-[285px] rounded-2xl p-4 flex flex-col justify-between transition-colors duration-300 ${
                isCenter
                  ? "bg-[#16161A] border border-[#C6F432]/60 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_20px_rgba(198,244,50,0.12)] cursor-pointer"
                  : "bg-[#121215]/90 border border-white/10 hover:border-white/25 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.75)] cursor-pointer"
              }`}
            >
              {/* Top Issuer Pill & Date */}
              <div className="flex items-center justify-between gap-2 z-10">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide truncate ${
                    isCenter
                      ? "bg-white/10 text-white border border-white/20"
                      : "bg-white/5 text-white/65 border border-white/10"
                  }`}
                >
                  <Icon name="Award" size={10} className="text-[#C6F432] shrink-0" />
                  <span className="truncate">{cert.issuer}</span>
                </span>
                <span className="text-[10px] text-white/50 font-medium shrink-0">
                  {cert.issuedDate}
                </span>
              </div>

              {/* Center Certification Badge Medallion */}
              <div className="relative my-auto flex items-center justify-center py-2">
                <div
                  className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-2.5 flex items-center justify-center transition-all duration-300 ${
                    isCenter
                      ? "bg-[#0B0B0C] border border-white/15 shadow-inner"
                      : "bg-[#0B0B0C]/70 border border-white/10"
                  }`}
                >
                  <img
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    draggable={false}
                    className="w-full h-full object-contain rounded-xl select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Bottom Title & Interactive Action Hint */}
              <div className="text-center z-10">
                <h3
                  className={`font-bold text-xs sm:text-sm leading-snug line-clamp-2 mb-2 transition-colors ${
                    isCenter ? "text-white" : "text-white/65"
                  }`}
                >
                  {cert.title}
                </h3>

                <div
                  className={`inline-flex items-center justify-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full transition-all duration-300 ${
                    isCenter
                      ? "bg-[#C6F432] text-[#0B0B0C] hover:bg-[#b5e222]"
                      : "bg-white/5 text-white/50"
                  }`}
                >
                  <span>{isCenter ? "Inspect Credential" : "Click to Focus"}</span>
                  <Icon name={isCenter ? "ExternalLink" : "ArrowRight"} size={10} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Circular Carousel Controls & Thumbnail Badge Dock */}
      <div className="mt-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous certification"
            className="w-9 h-9 rounded-full bg-[#121215] hover:bg-[#C6F432] text-white hover:text-[#0B0B0C] border border-white/15 hover:border-[#C6F432] flex items-center justify-center transition-all duration-300 shadow-md active:scale-95"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>

          {/* Circular Thumbnail Badge Strip */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121215]/90 border border-white/10 backdrop-blur-md shadow-inner">
            {certifications.map((cert, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => {
                    if (isActive) onCertClick?.(cert)
                    else setActiveIndex(idx)
                  }}
                  title={cert.title}
                  className={`relative rounded-full overflow-hidden transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? "w-9 h-9 ring-2 ring-[#C6F432] bg-[#0B0B0C] scale-110"
                      : "w-7 h-7 opacity-45 hover:opacity-90 bg-[#0B0B0C]/60 hover:scale-105"
                  }`}
                >
                  <img
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.issuer}
                    className="w-full h-full object-cover"
                  />
                </button>
              )
            })}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next certification"
            className="w-9 h-9 rounded-full bg-[#121215] hover:bg-[#C6F432] text-white hover:text-[#0B0B0C] border border-white/15 hover:border-[#C6F432] flex items-center justify-center transition-all duration-300 shadow-md active:scale-95"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>

        {/* Active Credential Quick Caption */}
        {activeCert && (
          <div className="flex items-center gap-2 text-xs text-white/65">
            <span>
              Selected: <strong className="text-white">{activeCert.title}</strong>
            </span>
            <button
              type="button"
              onClick={() => onCertClick?.(activeCert)}
              className="text-[#C6F432] hover:underline font-semibold underline-offset-4 transition-colors"
            >
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
