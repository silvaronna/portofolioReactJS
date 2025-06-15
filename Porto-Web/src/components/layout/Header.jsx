import Navigation from "./Navigation"

export default function Header({ scrolled, isWhiteSection }) {
  return (
    <header className="fixed top-0 left-0 w-full h-32 z-50 transition-all duration-500">
      <div className="container mx-auto px-12 h-full flex justify-between items-center relative z-10 max-w-[1800px]">
        {/* Background Rectangle */}
        <div className="absolute inset-0 bg-black/50 rounded-[15px] mx-7 my-9"></div>

        {/* Content */}
        <div className="relative z-10 text-white font-bold text-3xl tracking-wide hover:scale-105 transition-transform cursor-pointer">
          Azka Abdillah
        </div>
        <div className="relative z-10">
          <Navigation isWhiteSection={isWhiteSection} />
        </div>
      </div>
    </header>
  )
}
