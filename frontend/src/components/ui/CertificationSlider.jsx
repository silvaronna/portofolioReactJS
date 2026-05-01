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
      {/* Tombol Navigasi Kiri: Hidden di Mobile (md:block) */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-amber-600 text-white p-2.5 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-lg border border-white/5"
        aria-label="Scroll left"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>

      {/* Container Slider */}
      <div ref={sliderRef} className="cert-slider flex gap-4 overflow-x-auto pb-6 pt-2 px-2 snap-x scroll-smooth hide-scrollbar" {...handlers}>
        {certifications.map((cert) => (
          <div
            key={cert.id}
            // Lebar kartu diskalakan lebih kecil
            className={`flex-shrink-0 w-52 md:w-60 h-36 md:h-40 rounded-xl overflow-hidden relative cursor-pointer transition-all duration-300 snap-center border ${
              selectedCert === cert.id 
                ? "ring-2 ring-amber-500 border-transparent shadow-lg scale-[1.02]" 
                : "border-white/5 hover:border-white/10 hover:shadow-md"
            }`}
            onClick={() => onCertClick(cert)}
          >
            <img
              src={cert.image || "/placeholder.svg"}
              alt={cert.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end text-left">
              <h3 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2">{cert.title}</h3>
              <div className="flex justify-between items-end">
                <p className="text-amber-400 text-[10px] font-medium">{cert.issuer}</p>
                <div className="flex items-center text-gray-400 text-[9px] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <Icon name="Calendar" size={10} className="mr-1" />
                  <span>{cert.issuedDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Navigasi Kanan: Hidden di Mobile (md:block) */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-amber-600 text-white p-2.5 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-lg border border-white/5"
        aria-label="Scroll right"
      >
        <Icon name="ChevronRight" size={20} />
      </button>
    </div>
  )
}