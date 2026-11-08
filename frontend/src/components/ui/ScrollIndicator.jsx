"use client"

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-14 sm:bottom-12 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-15 pointer-events-none">
      <div className="w-[26px] h-[42px] rounded-full border border-white/25 bg-[#121215]/70 backdrop-blur-sm flex justify-center p-2 shadow-sm">
        <div className="w-1.5 h-1.5 bg-[#C6F432] rounded-full animate-scroll-down" />
      </div>
    </div>
  )
}
