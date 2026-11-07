"use client"

import { lazy, Suspense, useRef } from "react"
import About from "../components/sections/About"
import Skills from "../components/sections/Skills"
import Work from "../components/sections/Work"
import Contact from "../components/sections/Contact"
import Activities from "../components/sections/Activities"
import SectionDivider from "../components/ui/SectionDivider"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

const LazyCertifications = lazy(() => import("../components/sections/Certifications"))
const LazyEducation = lazy(() => import("../components/sections/Education"))

export default function Portfolio() {
  const mainContentRef = useRef(null)
  useScrollAnimation(mainContentRef)

  return (
    <main className="min-h-screen bg-dark" ref={mainContentRef}>
      <About />
      <SectionDivider />
      <Suspense
        fallback={
          <div className="section-container text-center text-white/50 text-xl min-h-[500px] flex items-center justify-center">
            Loading Certifications...
          </div>
        }
      >
        <LazyCertifications />
      </Suspense>
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Work />
      <SectionDivider />
      <Activities />
      <SectionDivider />
      <Suspense
        fallback={
          <div className="section-container text-center text-white/50 text-xl min-h-[500px] flex items-center justify-center">
            Loading Education...
          </div>
        }
      >
        <LazyEducation />
      </Suspense>
      <Contact />
    </main>
  )
}
