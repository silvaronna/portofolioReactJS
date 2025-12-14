"use client"

export default function ScrollIndicator() {
  return (
    <div 
      // REVISI:
      // bottom-32 : Di Mobile naik (128px) supaya aman dari bezel bawah.
      // md:bottom-10 : Di Desktop tetap di bawah.
      // left-1/2 : Pengganti 'center' agar standar Tailwind (rata tengah horizontal).
      className="absolute bottom-32 md:bottom-10 center -translate-x-1/2 animate-bounce z-15"
    >
      <div className="w-[30px] h-[50px] rounded-full border-2 border-amber-500 flex justify-center p-2 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-scroll-down" />
      </div>
    </div>
  )
}