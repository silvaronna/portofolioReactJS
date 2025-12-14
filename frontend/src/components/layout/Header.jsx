"use client"

import { useState, useEffect } from "react"
// Perhatikan path import Icon ini, sesuaikan dengan posisi file Header.jsx
// Karena Header ada di components/layout, maka naik satu level (..) ke components, lalu ke ui
import Icon from "../ui/Icon" 

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Work", href: "#work" },
    { name: "Portofolio", href: "#activities" },
    { name: "Certifications", href: "#certifications" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <a href="#" className="flex items-center gap-2 group">
           <div className="bg-white p-1.5 rounded-full transition-transform group-hover:rotate-12">
              <img src="/mylogo-nobg.png" alt="Logo" className="w-6 h-6" />
           </div>
        </a>

        {/* DESKTOP MENU (Hidden di Mobile) */}
        <div className="hidden md:flex items-center gap-8 bg-black/30 px-8 py-3 rounded-full border border-white/10 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* MOBILE MENU BUTTON (Hamburger - Hidden di Desktop) */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <Icon name="X" size={24} /> : <Icon name="Menu" size={24} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN (Muncul saat tombol dipencet) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-fadeIn">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-300 hover:text-amber-400 py-2 border-b border-white/5 text-center"
                onClick={() => setIsMobileMenuOpen(false)} // Tutup menu saat diklik
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}