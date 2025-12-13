"use client"

import { useState, useEffect } from "react"
import Icon from "./Icon"

export default function ActivityModal({ isOpen, onClose, activity }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [slideDirection, setSlideDirection] = useState("right")

  useEffect(() => {
    let scrollY = 0

    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsVisible(true), 10) 
      
      // Lock Scroll & Store Position
      scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.paddingRight = "15px"
    } else {
      setIsVisible(false)
      setTimeout(() => {
        setShouldRender(false)
        
        // Unlock Scroll & Restore Position
        const scrollYStyle = document.body.style.top
        
        // FIX: Matikan smooth scroll sebentar agar restore posisi instan
        document.documentElement.style.scrollBehavior = "auto"
        
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.paddingRight = ""
        
        window.scrollTo(0, parseInt(scrollYStyle || "0") * -1)

        // Kembalikan smooth scroll setelah restore selesai
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = ""
        }, 50)
        
      }, 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) setCurrentImageIndex(0)
  }, [isOpen])

  if (!shouldRender || !activity) return null

  // --- IMAGE CONTROLS ---
  const handleNext = (e) => {
    e?.stopPropagation()
    setSlideDirection("right")
    setCurrentImageIndex((prev) => (prev === activity.gallery.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = (e) => {
    e?.stopPropagation()
    setSlideDirection("left")
    setCurrentImageIndex((prev) => (prev === 0 ? activity.gallery.length - 1 : prev - 1))
  }

  const handleThumbnailClick = (index) => {
    if (currentImageIndex === index) return
    setSlideDirection(index > currentImageIndex ? "right" : "left")
    setCurrentImageIndex(index)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-6xl max-h-[90vh] bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row transform origin-center ${
          isVisible ? "animate-jelly-in" : "animate-jelly-out"
        }`}
      >
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-amber-600 text-white rounded-full transition-all border border-white/10 hover:rotate-90 duration-300"
        >
          <Icon name="X" size={20} />
        </button>

        {/* --- LEFT SIDE: GALLERY --- */}
        <div className="lg:w-[65%] bg-black flex flex-col relative group">
          <div className="relative flex-1 min-h-[300px] lg:min-h-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
            <img 
              key={currentImageIndex}
              src={activity.gallery[currentImageIndex] || "/placeholder.svg"} 
              alt={`Gallery ${currentImageIndex + 1}`}
              className={`w-full h-full object-contain ${
                slideDirection === "right" ? "animate-slide-right" : "animate-slide-left"
              }`}
            />
            
            {activity.gallery.length > 1 && (
              <>
                <button onClick={handlePrev} className="absolute left-4 p-3 bg-black/40 text-white rounded-full hover:bg-amber-600 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10">
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button onClick={handleNext} className="absolute right-4 p-3 bg-black/40 text-white rounded-full hover:bg-amber-600 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10">
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {activity.gallery.length > 1 && (
            <div className="h-24 bg-[#111] border-t border-white/10 p-4 flex gap-3 overflow-x-auto custom-scrollbar z-20">
              {activity.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleThumbnailClick(idx)}
                  className={`relative flex-shrink-0 h-full aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    idx === currentImageIndex 
                      ? "border-amber-500 opacity-100 scale-105" 
                      : "border-transparent opacity-50 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- RIGHT SIDE: DETAILS --- */}
        <div className="lg:w-[35%] flex flex-col h-full bg-[#1a1a1a] border-l border-white/5">
          <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{activity.title}</h3>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="bg-amber-900/20 text-amber-400 px-3 py-1 rounded-full border border-amber-900/30 flex items-center font-medium">
                  <Icon name="MapPin" size={14} className="mr-1.5" />
                  {activity.location}
                </span>
                <span className="text-gray-500 flex items-center bg-black/20 px-3 py-1 rounded-full border border-white/5">
                  <Icon name="Calendar" size={14} className="mr-1.5" />
                  {activity.date}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center">
                  <Icon name="FileText" size={14} className="mr-2" /> Project Description
                </h4>
                <div className="space-y-3">
                  {activity.description.map((desc, i) => (
                    <div key={i} className="flex items-start text-gray-300 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {desc}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center">
                   <Icon name="Cpu" size={14} className="mr-2" /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activity.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#252525] text-gray-300 hover:text-white rounded-full text-xs font-medium border border-white/5 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-white/5 bg-[#151515]">
            <a 
              href={activity.docLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full justify-center items-center px-6 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-amber-500/20 active:scale-95 group"
            >
              <Icon name="FileText" size={18} className="mr-2 group-hover:-translate-y-0.5 transition-transform" />
              View Full Documentation
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}