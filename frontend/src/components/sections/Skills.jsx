import SkillCard from "../ui/SkillCard"
import { skills } from "../../data"

export default function Skills() {
  return (
    <section id="skills" className="bg-dark py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-10 animate-on-scroll">
          <h2 className="section-heading-center text-amber-400 text-xl md:text-2xl font-bold mb-2">My Skills</h2>
          <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto">
            Some of my Skills in aspects of soft skills as well as hard skills
          </p>
        </div>

        {/* Hard Skills */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-6 text-amber-500/80 text-center animate-on-scroll delay-200">
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
          <h3 className="text-lg font-semibold mb-6 text-amber-500/80 text-center animate-on-scroll delay-300">
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
