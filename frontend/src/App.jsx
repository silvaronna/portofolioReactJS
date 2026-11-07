"use client"

import { useState, useEffect } from "react"
import Header from "./components/layout/Header"
import Hero from "./components/sections/Hero"
import Portfolio from "./pages/Portfolio"
import GravitySocials from "./components/ui/GravitySocials"
import { useLocalStorage } from "./hooks/useLocalStorage"
import "./App.css"

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [isWhiteSection, setIsWhiteSection] = useState(false)
  const [hasVisited, setHasVisited] = useLocalStorage("hasVisited", false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setIsWhiteSection(window.scrollY > window.innerHeight - 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!hasVisited) {
      setHasVisited(true)
      console.log("First visit detected and recorded!")
    }
  }, [hasVisited, setHasVisited])

  return (
    <div
      className="relative min-h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed bg-[#0B0B0C] text-white"
      style={{ backgroundImage: "url('/background.webp')" }}
    >
      {/* Midnight Black overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/85 via-[#0B0B0C]/85 to-[#0B0B0C] z-0"></div>

      <Header scrolled={scrolled} isWhiteSection={isWhiteSection} />
      <GravitySocials />

      <main className="flex-1 pt-28 relative z-20">
        <Hero />
        <Portfolio />
      </main>
    </div>
  )
}

export default App
