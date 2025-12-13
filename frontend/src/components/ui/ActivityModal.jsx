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
      
      scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.paddingRight = "15px"
    } else {
      setIsVisible(false)
      setTimeout(() => {
        setShouldRender(false)
        const scrollYStyle = document.body.style.top
        document.documentElement.style.scrollBehavior = "auto"
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.paddingRight = ""
        window.scrollTo(0, parseInt(scrollYStyle || "0") * -1)
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

  const currentImage = activity.gallery[currentImageIndex]
  const imageSrc = typeof currentImage === 'string' ? currentImage : currentImage.src
  const imageCaption = typeof currentImage === 'string' ? "" : currentImage.caption

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
      
      {/* REFACTOR: Backdrop Opacity
        Diubah jadi bg-black/60 (sebelumnya 90) agar background website di belakangnya terlihat (transparan)
      */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* REFACTOR: Size updated to max-w-[85vw] h-[82vh] */}
      <div 
        className={`relative w-full max-w-[85vw] h-[82vh] bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row transform origin-center ${
          isVisible ? "animate-jelly-in" : "animate-jelly-out"
        }`}
      >
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-amber-600 text-white rounded-full transition-all border border-white/10 hover:rotate-90 duration-300"
        >
          <Icon name="X" size={20} />
        </button>

        {/* --- LEFT SIDE: GALLERY (60%) --- */}
        <div className="lg:w-[60%] bg-black flex flex-col relative group h-[45vh] lg:h-full border-r border-white/5">
          
          <div className="relative flex-1 min-h-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden p-4">
            <img 
              key={currentImageIndex}
              src={imageSrc || "/placeholder.svg"} 
              alt={`Gallery ${currentImageIndex + 1}`}
              className={`w-full h-full object-contain ${
                slideDirection === "right" ? "animate-slide-right" : "animate-slide-left"
              }`}
            />
            
            {activity.gallery.length > 1 && (
              <>
                <button onClick={handlePrev} className="absolute left-6 p-3 bg-black/50 text-white rounded-full hover:bg-amber-600 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10">
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button onClick={handleNext} className="absolute right-6 p-3 bg-black/50 text-white rounded-full hover:bg-amber-600 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10">
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}
          </div>

          <div className="bg-[#111] px-6 py-3 border-t border-white/10 flex flex-col justify-center min-h-[70px]">
             <div className="flex items-center text-amber-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                <Icon name="Image" size={10} className="mr-1.5" />
                Image {currentImageIndex + 1} / {activity.gallery.length}
             </div>
             <p className="text-gray-300 text-xs leading-relaxed">
                {imageCaption || "No description available for this image."}
             </p>
          </div>

          {activity.gallery.length > 1 && (
            <div className="h-20 bg-[#0a0a0a] border-t border-white/5 p-3 flex gap-3 overflow-x-auto custom-scrollbar z-20 flex-shrink-0 justify-center items-center">
              {activity.gallery.map((img, idx) => {
                const thumbSrc = typeof img === 'string' ? img : img.src
                return (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(idx)}
                    className={`relative flex-shrink-0 h-14 aspect-video rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      idx === currentImageIndex 
                        ? "border-amber-500 opacity-100 scale-105 shadow-md shadow-amber-900/20" 
                        : "border-transparent opacity-40 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img src={thumbSrc} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* --- RIGHT SIDE: DETAILS (40%) --- */}
        <div className="lg:w-[40%] flex flex-col h-full bg-[#1a1a1a] min-h-0">
          
          <div className="p-6 lg:p-8 overflow-y-auto custom-scrollbar flex-1">
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">{activity.title}</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center text-amber-400 font-medium bg-amber-900/10 px-3 py-1.5 rounded-lg border border-amber-900/20 w-fit text-xs">
                  <Icon name="MapPin" size={12} className="mr-1.5" />
                  {activity.location}
                </div>
                <div className="flex items-center text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 w-fit text-xs">
                  <Icon name="Calendar" size={12} className="mr-1.5" />
                  {activity.date}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 flex items-center border-b border-white/10 pb-2">
                  <Icon name="FileText" size={14} className="mr-2 text-amber-500" /> Project Description
                </h4>
                <div className="space-y-3">
                  {activity.description.map((desc, i) => (
                    <div key={i} className="flex items-start text-gray-300 text-sm leading-relaxed group hover:text-white transition-colors">
                      <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform" />
                      {desc}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 flex items-center border-b border-white/10 pb-2">
                   <Icon name="Cpu" size={14} className="mr-2 text-amber-500" /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activity.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#252525] text-gray-300 hover:text-white rounded-full text-xs font-medium border border-white/5 transition-all hover:border-amber-500/30 hover:bg-amber-900/10 shadow-sm cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {activity.docLink && (
            <div className="p-5 border-t border-white/5 bg-[#151515] flex-shrink-0 z-10">
              <a 
                href={activity.docLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full justify-center items-center px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-white/10 active:scale-95 group"
              >
                <Icon name="FileText" size={16} className="mr-2 group-hover:-translate-y-0.5 transition-transform" />
                View Full Documentation
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}