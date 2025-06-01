import AboutSection from "../components/about-section.jsx"
import WorkSection from "../components/work-section.jsx"
import EducationSection from "../components/education-section.jsx"
import SkillsSection from "../components/skills-section.jsx"
import CertificationSection from "../components/certification-section.jsx"
import Footer from "../components/footer.jsx"
import SectionDivider from "../components/ui/SectionDivider.jsx"
import { useScrollAnimation } from "../hooks/useScrollAnimation.js"

export default function Portfolio() {
  // Animation on scroll
  useScrollAnimation()

  return (
    <main className="min-h-screen bg-dark">
      <AboutSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDivider />
      <WorkSection />
      <SectionDivider />
      <CertificationSection />
      <SectionDivider />
      <EducationSection />
      <Footer />
    </main>
  )
}
