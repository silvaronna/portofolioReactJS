import Navigation from "./Navigation"

export default function Header({ scrolled, isWhiteSection }) {
  return (
    // REFACTOR: Height h-32 -> h-20 (80px) agar tidak memakan layar
    <header className="fixed top-0 left-0 w-full h-20 z-50 transition-all duration-500">
      {/* REFACTOR: Container max-w-7xl agar konsisten */}
      <div className="container mx-auto px-6 md:px-12 h-full flex justify-between items-center relative z-10 max-w-7xl">
        
        {/* Background Rectangle - Adjusted margins for smaller height */}
        <div className="absolute inset-0 bg-black/50 rounded-xl mx-4 my-2 backdrop-blur-sm border border-white/5 transition-all"></div>

        {/* Content */}
        {/* REFACTOR: Font size text-3xl -> text-2xl */}
        <div className="relative z-10 text-white font-bold text-2xl tracking-wide hover:scale-105 transition-transform cursor-pointer pl-4">
          Azka Abdillah
        </div>
        
        <div className="relative z-10 pr-4">
          <Navigation isWhiteSection={isWhiteSection} />
        </div>
      </div>
    </header>
  )
}