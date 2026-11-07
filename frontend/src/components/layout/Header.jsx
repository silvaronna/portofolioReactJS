"use client"

import { useState, useEffect } from "react"
import Icon from "../ui/Icon"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Portfolio", href: "#activities" },
  { name: "Certifications", href: "#certifications" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = navLinks.map((link) => link.href.substring(1))
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 180) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleHeaderToggle = (e) => {
      setIsHeaderVisible(e.detail)
    }
    window.addEventListener("toggle-header", handleHeaderToggle)
    return () => window.removeEventListener("toggle-header", handleHeaderToggle)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] flex justify-center ${
        isScrolled ? "py-3" : "py-5"
      } ${
        isHeaderVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`flex justify-between items-center w-full max-w-5xl px-5 transition-all duration-500 ${
          isScrolled
            ? "bg-[#121215]/85 backdrop-blur-xl border border-white/10 rounded-full py-2 shadow-[0_12px_36px_rgba(0,0,0,0.75)] md:w-auto md:px-6 mx-4 md:mx-auto"
            : "bg-[#0B0B0C]/50 backdrop-blur-md border border-white/10 rounded-full py-2.5 mx-4 md:mx-auto md:w-auto md:px-7"
        }`}
      >
        {/* LOGO (Interactive Gravity Trigger) */}
        <button
          onClick={(e) => {
            e.preventDefault()
            const rect = e.currentTarget.getBoundingClientRect()
            window.dispatchEvent(
              new CustomEvent("spawn-socials", {
                detail: { x: rect.left + rect.width / 2, y: rect.bottom },
              })
            )
          }}
          className="flex items-center gap-2.5 group z-20 md:pr-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F432] rounded-full"
          title="Click me for a surprise!"
        >
          <div className="bg-white p-1.5 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_14px_rgba(198,244,50,0.45)] relative">
            <img
              src="/mylogo-nobg.png"
              alt="Azka Logo"
              className="w-5 h-5 pointer-events-none object-contain"
            />
          </div>
        </button>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1)
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-300 relative ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C6F432] shadow-[0_0_8px_#C6F432]" />
                )}
              </a>
            )
          })}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white hover:text-[#C6F432] p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none z-20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <Icon name="X" size={20} /> : <Icon name="Menu" size={20} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`md:hidden fixed inset-0 bg-[#0B0B0C]/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-6 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {navLinks.map((link, index) => {
          const isActive = activeSection === link.href.substring(1)
          return (
            <a
              key={link.name}
              href={link.href}
              className={`text-2xl font-semibold tracking-wide transform transition-all duration-300 hover:scale-105 px-6 py-2 rounded-full ${
                isActive
                  ? "text-[#C6F432]"
                  : "text-white/80 hover:text-white"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? `${index * 40}ms` : "0ms" }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          )
        })}
      </div>
    </header>
  )
}
