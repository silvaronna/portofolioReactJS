import SkillCard from "../ui/SkillCard"
import { skills } from "../../data"

export default function Skills() {
  return (
    <section id="skills" className="bg-dark py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-10 animate-on-scroll">
          <h2 className="section-heading-center text-white text-xl md:text-2xl font-bold mb-3">
            My Skills
          </h2>
          <p className="text-white/60 text-xs md:text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            Some of my capabilities across technical infrastructure engineering and professional soft skills.
          </p>
        </div>

        {/* Hard Skills */}
        <div className="mb-12">
          <h3 className="text-[11px] uppercase tracking-widest font-bold mb-6 text-white/65 text-center animate-on-scroll delay-200">
            Hard Skills
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center">
            {skills.hard.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index} showTools />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-[11px] uppercase tracking-widest font-bold mb-6 text-white/65 text-center animate-on-scroll delay-300">
            Soft Skills
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center">
            {skills.soft.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index + 4} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
