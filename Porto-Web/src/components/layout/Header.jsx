import Navigation from "./Navigation"

export default function Header({ scrolled, isWhiteSection }) {
  return (
    <header
      className={`fixed top-0 left-0 w-full h-32 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a1525]/90 backdrop-blur-sm shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-12 h-full flex justify-between items-center relative z-10 max-w-[1800px]">
        <div className="text-white font-bold text-3xl tracking-wide hover:scale-105 transition-transform cursor-pointer">
          Azka Abdillah
        </div>
        <Navigation isWhiteSection={isWhiteSection} />
      </div>
    </header>
  )
}
