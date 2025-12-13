"use client"

import { useEffect } from "react"
import Icon from "./Icon"
import { useSlider } from "../../hooks/useSlider"

export default function CertificationSlider({ certifications, selectedCert, onCertClick }) {
  const { sliderRef, scroll, handlers } = useSlider()

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0
    }
  }, [sliderRef])

  return (
    <div className="cert-slider-container relative group">
      {/* Tombol Navigasi Kiri - Muncul saat hover */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-amber-600 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-xl border border-white/10"
        aria-label="Scroll left"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>

      {/* Container Slider */}
      <div ref={sliderRef} className="cert-slider flex gap-5 overflow-x-auto pb-8 pt-4 px-2 snap-x scroll-smooth hide-scrollbar" {...handlers}>
        {certifications.map((cert) => (
          <div
            key={cert.id}
            // REFACTOR: Lebar kartu dikunci agar rapi (w-72 / w-80)
            className={`flex-shrink-0 w-72 md:w-80 h-48 md:h-56 rounded-xl overflow-hidden relative cursor-pointer transition-all duration-300 snap-center border ${
              selectedCert === cert.id 
                ? "ring-2 ring-amber-500 border-transparent shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-[1.02]" 
                : "border-gray-800 hover:border-amber-500/50 hover:shadow-lg"
            }`}
            onClick={() => onCertClick(cert)}
          >
            {/* Image */}
            <img
              src={cert.image || "/placeholder.svg"}
              alt={cert.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            
            {/* Overlay Gradient & Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 flex flex-col justify-end">
              {/* REFACTOR: Font size dikecilkan */}
              <h3 className="text-white font-bold text-lg leading-tight mb-1 line-clamp-2">{cert.title}</h3>
              <div className="flex justify-between items-end">
                <p className="text-amber-400 text-xs font-medium">{cert.issuer}</p>
                <div className="flex items-center text-gray-400 text-xs bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                  <Icon name="Calendar" size={12} className="mr-1.5" />
                  <span>{cert.issuedDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Navigasi Kanan */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-amber-600 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-xl border border-white/10"
        aria-label="Scroll right"
      >
        <Icon name="ChevronRight" size={24} />
      </button>
    </div>
  )
}