import SkillCard from "../ui/SkillCard"
import { skills } from "../../data"

export default function Skills() {
  return (
    // REVISI: Standard Padding py-24
    <section id="skills" className="bg-dark py-24">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        {/* REVISI: mb-24 -> mb-16 agar konsisten */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="section-heading-center text-amber-400 text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Some of my Skills in aspects of soft skills as well as hard skills
          </p>
        </div>

        {/* Hard Skills */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-10 text-amber-500 text-center animate-on-scroll delay-200">
            Hard Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 justify-items-center">
            {skills.hard.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index} showTools />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-bold mb-10 text-amber-500 text-center animate-on-scroll delay-300">
            Soft Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 justify-items-center">
            {skills.soft.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index + 4} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}