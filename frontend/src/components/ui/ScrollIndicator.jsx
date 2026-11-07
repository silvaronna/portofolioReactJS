"use client"

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-32 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-15">
      <div className="w-[28px] h-[46px] rounded-full border border-white/25 bg-[#121215]/70 backdrop-blur-sm flex justify-center p-2 shadow-sm">
        <div className="w-1.5 h-1.5 bg-[#C6F432] rounded-full animate-scroll-down" />
      </div>
    </div>
  )
}
