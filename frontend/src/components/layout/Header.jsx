import Navigation from "./Navigation"

export default function Header({ scrolled, isWhiteSection }) {
  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 transition-all duration-500">
      <div className="container mx-auto px-6 md:px-12 h-full flex justify-between items-center relative z-10 max-w-7xl">
        
        {/* Background Rectangle ("Poni") */}
        <div className="absolute inset-0 bg-black/50 rounded-xl mx-4 my-2 backdrop-blur-sm border border-white/5 transition-all shadow-sm"></div>

        {/* Content - Logo Image */}
        <div className="relative z-10 hover:scale-110 transition-transform cursor-pointer pl-6 flex items-center">
          {/* WRAPPER BARU: Background putih bulat */}
          <div className="bg-white p-1.3 rounded-full flex items-center justify-center shadow-md">
             <img 
              src="/mylogo-nobg.png" 
              alt="Azka Abdillah Logo" 
              // Ukuran disesuaikan agar pas di dalam lingkaran putih (h-8 -> h-7 w-7)
              className="h-7 w-7 object-contain"
            />
          </div>
        </div>
        
        <div className="relative z-10 pr-6">
          <Navigation isWhiteSection={isWhiteSection} />
        </div>
      </div>
    </header>
  )
}