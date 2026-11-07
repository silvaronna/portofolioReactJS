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

      window.dispatchEvent(new CustomEvent("toggle-header", { detail: false }))

      scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.paddingRight = "15px"
    } else {
      setIsVisible(false)

      window.dispatchEvent(new CustomEvent("toggle-header", { detail: true }))

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
  }, [isOpen, activity])

  if (!shouldRender || !activity) return null

  // Fallback aman jika gallery kosong
  const galleryList =
    Array.isArray(activity.gallery) && activity.gallery.length > 0
      ? activity.gallery
      : activity.coverImage
      ? [{ src: activity.coverImage, caption: activity.title }]
      : []

  const safeIndex = currentImageIndex < galleryList.length ? currentImageIndex : 0
  const currentImage = galleryList[safeIndex] || null
  const imageSrc = !currentImage
    ? "/placeholder.svg"
    : typeof currentImage === "string"
    ? currentImage
    : currentImage.src || "/placeholder.svg"
  const imageCaption = !currentImage
    ? ""
    : typeof currentImage === "string"
    ? ""
    : currentImage.caption || ""

  const handleNext = (e) => {
    e?.stopPropagation()
    if (galleryList.length <= 1) return
    setSlideDirection("right")
    setCurrentImageIndex((prev) => (prev >= galleryList.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = (e) => {
    e?.stopPropagation()
    if (galleryList.length <= 1) return
    setSlideDirection("left")
    setCurrentImageIndex((prev) => (prev <= 0 ? galleryList.length - 1 : prev - 1))
  }

  const handleThumbnailClick = (index) => {
    if (safeIndex === index) return
    setSlideDirection(index > safeIndex ? "right" : "left")
    setCurrentImageIndex(index)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Main Modal Container */}
      <div
        className={`relative w-full max-w-4xl h-[85vh] lg:h-[min(36rem,82vh)] bg-[#121215] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col lg:flex-row transform origin-center ${
          isVisible ? "animate-jelly-in" : "animate-jelly-out"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-1.5 bg-black/60 hover:bg-[#C6F432] text-white hover:text-[#0B0B0C] rounded-full transition-all border border-white/15 hover:rotate-90 duration-300"
          aria-label="Close modal"
        >
          <Icon name="X" size={14} />
        </button>

        {/* --- LEFT SIDE: GALLERY (55%) --- */}
        <div className="lg:w-[55%] bg-[#0B0B0C] flex flex-col relative group h-[40vh] lg:h-full border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="relative flex-1 min-h-0 bg-[#080809] flex items-center justify-center overflow-hidden p-3">
            {galleryList.length > 0 ? (
              <img
                key={safeIndex}
                src={imageSrc}
                alt={`${activity.title} - Gallery ${safeIndex + 1}`}
                className={`w-full h-full object-contain ${
                  slideDirection === "right" ? "animate-slide-right" : "animate-slide-left"
                }`}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-white/40 text-xs gap-2">
                <Icon name="Image" size={28} />
                <span>No preview image available</span>
              </div>
            )}

            {galleryList.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 p-2 bg-black/70 text-white rounded-full hover:bg-[#C6F432] hover:text-[#0B0B0C] transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/15"
                >
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 p-2 bg-black/70 text-white rounded-full hover:bg-[#C6F432] hover:text-[#0B0B0C] transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/15"
                >
                  <Icon name="ChevronRight" size={16} />
                </button>
              </>
            )}
          </div>

          <div className="bg-[#121215] px-4 py-2.5 border-t border-white/10 flex flex-col justify-center min-h-[44px]">
            <div className="flex items-center text-[#C6F432] text-[9px] font-bold uppercase tracking-wider mb-0.5">
              <Icon name="Image" size={10} className="mr-1" />
              Image {galleryList.length > 0 ? safeIndex + 1 : 0} / {galleryList.length}
            </div>
            <p className="text-white/80 text-[10px] leading-relaxed">
              {imageCaption || "Project visual snapshot."}
            </p>
          </div>

          {galleryList.length > 1 && (
            <div className="h-12 bg-[#080809] border-t border-white/10 p-1.5 flex gap-2 overflow-x-auto custom-scrollbar z-20 flex-shrink-0 justify-center items-center">
              {galleryList.map((img, idx) => {
                const thumbSrc = typeof img === "string" ? img : img?.src
                return (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(idx)}
                    className={`relative flex-shrink-0 h-full aspect-video rounded overflow-hidden border-2 transition-all duration-300 ${
                      idx === safeIndex
                        ? "border-[#C6F432] opacity-100 scale-105 shadow-md"
                        : "border-transparent opacity-40 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img src={thumbSrc} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* --- RIGHT SIDE: DETAILS (45%) --- */}
        <div className="lg:w-[45%] flex flex-col h-full bg-[#121215] min-h-0">
          <div className="p-4 lg:p-5 overflow-y-auto custom-scrollbar flex-1">
            <div className="mb-4 pr-6">
              <h3 className="text-base lg:text-lg font-bold text-white mb-2 leading-tight">
                {activity.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <div className="flex items-center text-white font-medium bg-white/5 px-2.5 py-0.5 rounded-full border border-white/15 w-fit text-[10px]">
                  <Icon name="MapPin" size={10} className="mr-1 text-[#C6F432]" />
                  {activity.location}
                </div>
                <div className="flex items-center text-white/65 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 w-fit text-[10px]">
                  <Icon name="Calendar" size={10} className="mr-1" />
                  {activity.date}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-white text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center border-b border-white/10 pb-1">
                  <Icon name="FileText" size={10} className="mr-1.5 text-[#C6F432]" /> Project Description
                </h4>
                <div className="space-y-2">
                  {(activity.description || []).map((desc, i) => (
                    <div
                      key={i}
                      className="flex items-start text-white/75 text-[11px] leading-relaxed group hover:text-white transition-colors"
                    >
                      <span className="w-1.5 h-1.5 bg-[#C6F432] rounded-full mt-1.5 mr-2 flex-shrink-0" />
                      {desc}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center border-b border-white/10 pb-1">
                  <Icon name="Cpu" size={10} className="mr-1.5 text-[#C6F432]" /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(activity.techStack || []).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-[#0B0B0C] text-white/85 rounded-full text-[9px] font-medium border border-white/10 shadow-sm cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {activity.docLink && (
            <div className="p-3 border-t border-white/10 bg-[#0B0B0C] flex-shrink-0 z-10">
              <a
                href={activity.docLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full justify-center items-center px-4 py-2 bg-[#C6F432] text-[#0B0B0C] hover:bg-[#b5e222] rounded-lg font-bold text-[11px] transition-all shadow-md active:scale-95 group"
              >
                <Icon name="FileText" size={12} className="mr-2 group-hover:-translate-y-0.5 transition-transform" />
                View Full Documentation
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
