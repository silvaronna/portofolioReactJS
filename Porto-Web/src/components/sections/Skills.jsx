import SkillCard from "../ui/SkillCard"
import { skills } from "../../data"

export default function Skills() {
  return (
    <section id="skills" className="section-container bg-dark">
      <div className="text-center mb-24 animate-on-scroll">
        <h2 className="section-heading-center text-amber-400">My Skills</h2>
        <p className="text-2xl text-gray-300 max-w-4xl mx-auto mt-8 animate-on-scroll delay-100">
          Some of my Skills in aspects of soft skills as well as hard skills
        </p>
      </div>

      <div className="mb-24">
        <h3 className="text-4xl font-bold mb-12 text-amber-500 text-center animate-on-scroll delay-200">Hard Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {skills.hard.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} showTools />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-4xl font-bold mb-12 text-amber-500 text-center animate-on-scroll delay-300">Soft Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {skills.soft.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index + 4} />
          ))}
        </div>
      </div>
    </section>
  )
}
