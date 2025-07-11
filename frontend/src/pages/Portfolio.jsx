"use client"

import { lazy, Suspense, useRef } from "react" // Import useRef
import About from "../components/sections/About"
import Skills from "../components/sections/Skills"
import Work from "../components/sections/Work"
import Contact from "../components/sections/Contact"
import SectionDivider from "../components/ui/SectionDivider"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

const LazyCertifications = lazy(() => import("../components/sections/Certifications"))
const LazyEducation = lazy(() => import("../components/sections/Education"))

export default function Portfolio() {
  const mainContentRef = useRef(null) // Create a ref for the main content area
  useScrollAnimation(mainContentRef) // Pass the ref to the hook

  return (
    <main className="min-h-screen bg-dark" ref={mainContentRef}>
      {" "}
      {/* Assign the ref */}
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Work />
      <SectionDivider />
      {/* Wrap lazy-loaded components with Suspense */}
      <Suspense
        fallback={
          <div className="section-container text-center text-gray-400 text-xl min-h-[500px] flex items-center justify-center">
            Loading Certifications...
          </div>
        }
      >
        <LazyCertifications />
      </Suspense>
      <SectionDivider />
      <Suspense
        fallback={
          <div className="section-container text-center text-gray-400 text-xl min-h-[500px] flex items-center justify-center">
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
