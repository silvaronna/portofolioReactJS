import About from "../components/sections/About"
import Skills from "../components/sections/Skills"
import Work from "../components/sections/Work"
import Certifications from "../components/sections/Certifications"
import Education from "../components/sections/Education"
import Contact from "../components/sections/Contact"
import SectionDivider from "../components/ui/SectionDivider"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export default function Portfolio() {
  useScrollAnimation()

  return (
    <main className="min-h-screen bg-dark">
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Work />
      <SectionDivider />
      <Certifications />
      <SectionDivider />
      <Education />
      <Contact />
    </main>
  )
}
