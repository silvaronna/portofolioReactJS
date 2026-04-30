import SkillCard from "../ui/SkillCard"
import { skills } from "../../data"

export default function Skills() {
  return (
    <section id="skills" className="bg-dark py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="section-heading-center text-amber-400 text-2xl md:text-3xl font-bold mb-3">My Skills</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Some of my Skills in aspects of soft skills as well as hard skills
          </p>
        </div>

        {/* Hard Skills */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-8 text-amber-500 text-center animate-on-scroll delay-200">
            Hard Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {skills.hard.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index} showTools />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-amber-500 text-center animate-on-scroll delay-300">
            Soft Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {skills.soft.map((skill, index) => (
              <SkillCard key={skill.title} skill={skill} index={index + 4} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
