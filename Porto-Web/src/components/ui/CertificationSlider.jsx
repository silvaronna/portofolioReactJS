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
    <div className="cert-slider-container">
      <button
        onClick={() => scroll("left")}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-[#252525]/80 hover:bg-amber-900/80 text-amber-400 p-4 rounded-full backdrop-blur-sm transition-all shadow-lg"
        aria-label="Scroll left"
      >
        <Icon name="ChevronLeft" size={28} />
      </button>

      <div ref={sliderRef} className="cert-slider" {...handlers}>
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className={`cert-card snap-start cursor-pointer ${selectedCert === cert.id ? "cert-card-active" : ""}`}
            onClick={() => {
              console.log("Clicked cert:", cert.id) // Debug log
              onCertClick(cert)
            }}
          >
            <div className="h-full w-full overflow-hidden relative group">
              <img
                src={cert.image || "/placeholder.svg"}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-white font-bold text-2xl mb-1">{cert.title}</h3>
                <p className="text-amber-300 text-lg">{cert.issuer}</p>
                <div className="flex items-center mt-3 text-gray-300 text-base">
                  <Icon name="Calendar" size={18} className="mr-2" />
                  <span>{cert.issuedDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-[#252525]/80 hover:bg-amber-900/80 text-amber-400 p-4 rounded-full backdrop-blur-sm transition-all shadow-lg"
        aria-label="Scroll right"
      >
        <Icon name="ChevronRight" size={28} />
      </button>
    </div>
  )
}
