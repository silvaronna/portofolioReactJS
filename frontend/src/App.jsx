"use client"

import { useState, useEffect } from "react"
import Header from "./components/layout/Header"
import Hero from "./components/sections/Hero"
import Portfolio from "./pages/Portfolio"
import { useLocalStorage } from "./hooks/useLocalStorage" // Import useLocalStorage
import "./App.css"

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [isWhiteSection, setIsWhiteSection] = useState(false)
  const [hasVisited, setHasVisited] = useLocalStorage("hasVisited", false) // Example usage of useLocalStorage

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setIsWhiteSection(window.scrollY > window.innerHeight - 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Set hasVisited to true after initial render
  useEffect(() => {
    if (!hasVisited) {
      setHasVisited(true)
      console.log("First visit detected and recorded!")
    }
  }, [hasVisited, setHasVisited])

  return (
    <div
      className="relative min-h-screen w-full flex flex-col bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/background.webp')" }}
    >
      <div className="absolute inset-0 bg-[#0a1525] bg-opacity-70 z-0"></div>

      <Header scrolled={scrolled} isWhiteSection={isWhiteSection} />

      <main className="flex-1 pt-32 relative z-20">
        <Hero />
        <Portfolio />
      </main>
    </div>
  )
}

export default App
