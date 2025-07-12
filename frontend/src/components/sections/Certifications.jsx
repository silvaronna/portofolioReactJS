"use client"

import { useState, useEffect } from "react"
import Icon from "../ui/Icon"
import { useSlider } from "../../hooks/useSlider"
import { certifications } from "../../data"

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null)
  const { sliderRef, scroll, handlers } = useSlider()

  // Initialize scroll position
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0
    }
  }, [sliderRef])

  const handleCertClick = (cert) => {
    setSelectedCert(cert.id === selectedCert ? null : cert.id)
  }

  const selectedCertData = certifications.find((cert) => cert.id === selectedCert)

  return (
    <section id="certifications" className="section-container bg-dark">
      <div className="mb-20 animate-on-scroll">
        <h2 className="section-heading text-amber-400 mb-10">Certifications</h2>
        <p className="text-gray-300 text-2xl max-w-3xl animate-on-scroll delay-100">
          Professional certifications that validate my expertise and knowledge in various IT domains.
        </p>
      </div>

      <div className="cert-slider-container animate-on-scroll delay-200">
        <button
          onClick={() => scroll("left")}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-[#252525]/80 hover:bg-amber-900/80 text-amber-400 p-4 rounded-full backdrop-blur-sm transition-all shadow-lg"
          aria-label="Scroll left"
        >
          <Icon name="ChevronLeft" size={28} />
        </button>

        <div
          ref={sliderRef}
          className="cert-slider"
          onMouseDown={handlers.handleMouseDown}
          onMouseUp={handlers.handleMouseUp}
          onMouseMove={handlers.handleMouseMove}
          onMouseLeave={handlers.handleMouseLeave}
          onTouchStart={handlers.handleTouchStart}
          onTouchMove={handlers.handleTouchMove}
          onTouchEnd={handlers.handleTouchEnd}
        >
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`cert-card snap-start ${selectedCert === cert.id ? "cert-card-active" : ""}`}
              onClick={() => handleCertClick(cert)}
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

      {selectedCertData && (
        <div className="cert-detail animate-[fadeIn_0.3s_ease-out]">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/3">
              <img
                src={selectedCertData.image || "/placeholder.svg"}
                alt={selectedCertData.title}
                className="w-full h-auto rounded-lg border border-gray-700"
              />
            </div>

            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-amber-400 mb-3">{selectedCertData.title}</h3>
              <div className="flex items-center mb-6">
                <Icon name="Award" className="text-amber-500 mr-2" size={24} />
                <span className="text-gray-300 text-xl">{selectedCertData.issuer}</span>
                <span className="mx-4 text-gray-600">•</span>
                <Icon name="Calendar" className="text-amber-500 mr-2" size={20} />
                <span className="text-gray-300 text-xl">{selectedCertData.issuedDate}</span>
              </div>

              <p className="text-gray-300 text-xl mb-8">{selectedCertData.description}</p>

              <h4 className="text-amber-500 font-medium mb-4 text-xl flex items-center">
                <Icon name="Tag" className="mr-2" size={20} />
                Skills
              </h4>

              <div className="flex flex-wrap gap-3 mb-8">
                {selectedCertData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-amber-900/20 text-amber-300 rounded-full text-lg border border-amber-700/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={selectedCertData.credentialLink}
                className="inline-flex items-center px-6 py-3 bg-amber-700/20 hover:bg-amber-700/40 text-amber-300 rounded-lg transition-colors text-lg"
              >
                <Icon name="ExternalLink" size={20} className="mr-2" />
                View Certificate
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
