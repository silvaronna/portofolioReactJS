"use client"

import { useState } from "react"
import Icon from "./ui/Icon"
import SectionHeading from "./ui/SectionHeading"
import { workExperience } from "../data"

export default function WorkSection() {
  const [expandedId, setExpandedId] = useState(null)

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="work" className="section-container bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div className="animate-on-scroll">
          <SectionHeading title="Recent Work" />
          <p className="text-gray-300 mt-10 text-2xl animate-on-scroll delay-100">
            Explore my professional experience and projects I've worked on.
          </p>
        </div>
        <div className="md:col-span-2">
          {workExperience.map((project, index) => (
            <div key={project.id} className="animate-on-scroll mb-8" style={{ transitionDelay: `${index * 150}ms` }}>
              <div
                className="border-t border-amber-900/30 py-10 group hover:bg-[#252525] transition-colors rounded-xl px-8 cursor-pointer"
                onClick={() => handleToggle(project.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex">
                    <div className="mr-6 mt-1">
                      <img
                        src={project.logo || "/placeholder.svg"}
                        alt={`${project.title} logo`}
                        className="w-14 h-14 rounded-md object-contain bg-gray-800 p-2"
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-amber-400 transition-colors text-gray-200">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-xl mb-3">{project.categories}</p>
                      <div className="flex items-center text-amber-500/80 text-lg">
                        <Icon name="Calendar" size={20} className="mr-2" />
                        <span>{project.period}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="p-3 rounded-full bg-amber-900/20 text-amber-400 hover:bg-amber-900/40 transition-colors"
                    aria-label={expandedId === project.id ? "Collapse details" : "Expand details"}
                  >
                    {expandedId === project.id ? (
                      <Icon name="ChevronUp" size={24} />
                    ) : (
                      <Icon name="ChevronDown" size={24} />
                    )}
                  </button>
                </div>

                {expandedId === project.id && (
                  <div className="work-detail mt-8 animate-[fadeIn_0.3s_ease-out]">
                    <p className="text-gray-300 text-xl mb-8">{project.fullDescription}</p>

                    <h4 className="text-amber-500 font-medium mb-5 text-xl">Responsibilities:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                      {project.jobDesc.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-300 text-lg">
                          <span className="w-3 h-3 bg-amber-500 rounded-full mr-3 mt-2"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-amber-500 font-medium mb-5 text-xl">Photos:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.screenshots.map((screenshot, i) => (
                        <div
                          key={i}
                          className="rounded-lg overflow-hidden border border-gray-700 hover:border-amber-600/50 transition-all shadow-lg hover:shadow-xl"
                        >
                          <img
                            src={screenshot || "/placeholder.svg"}
                            alt={`${project.title} screenshot ${i + 1}`}
                            className="w-full h-auto"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
