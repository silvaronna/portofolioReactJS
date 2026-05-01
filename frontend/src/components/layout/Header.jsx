"use client"

import { useState, useEffect } from "react"
import Icon from "../ui/Icon" 

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Simple scroll spy logic
      const sections = navLinks.map(link => link.href.substring(1))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleHeaderToggle = (e) => {
      setIsHeaderVisible(e.detail)
    }
    window.addEventListener("toggle-header", handleHeaderToggle)
    return () => window.removeEventListener("toggle-header", handleHeaderToggle)
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] flex justify-center ${
        isScrolled ? "py-3" : "py-6"
      } ${
        isHeaderVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div 
        className={`flex justify-between items-center w-full max-w-5xl px-6 transition-all duration-500 ${
          isScrolled 
            ? "bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-full py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:w-auto md:px-8 mx-4 md:mx-auto" 
            : "bg-transparent py-2"
        }`}
      >
        {/* LOGO */}
        <a href="#" className="flex items-center gap-2 group z-20 md:pr-8">
           <div className="bg-white p-[clamp(0.2rem,0.5vw,0.25rem)] rounded-full transition-transform duration-500 group-hover:rotate-12 shadow-sm">
              <img src="/mylogo-nobg.png" alt="Logo" className="w-[clamp(1.2rem,2vw,1.5rem)] h-[clamp(1.2rem,2vw,1.5rem)]" />
           </div>
        </a>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-[clamp(1rem,2vw,1.5rem)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1)
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-[clamp(0.7rem,1vw,0.8rem)] font-medium transition-all duration-300 relative py-1 ${
                  isActive ? "text-amber-400" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-amber-500 rounded-full opacity-80 animate-fadeIn"></span>
                )}
              </a>
            )
          })}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden text-white p-2 focus:outline-none z-20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <Icon name="X" size={20} /> : <Icon name="Menu" size={20} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <div 
        className={`md:hidden absolute top-0 left-0 w-full h-screen bg-[#0a0a0a]/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {navLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.href}
            className="text-2xl font-semibold text-gray-300 hover:text-amber-400 tracking-wide transform transition-transform hover:scale-105"
            style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  )
}