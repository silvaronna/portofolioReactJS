"use client"

import { useState } from "react"
import Icon from "./ui/Icon"
import SectionHeading from "./ui/SectionHeading"
import { workExperience } from "../data"

export default function WorkSection() {
  const [activeWork, setActiveWork] = useState(1)

  return (
    <section id="work" className="section-container bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div className="animate-on-scroll">
          <SectionHeading title="Recent Work" />
          <p className="text-gray-300 mt-10 text-2xl animate-on-scroll delay-100">
            Explore my professional experience and projects I've worked on
          </p>

          <div className="mt-16 space-y-6">
            {workExperience.map((work) => (
              <button
                key={work.id}
                onClick={() => setActiveWork(work.id)}
                className={`w-full text-left px-6 py-7 text-lg rounded-2xl transition-all duration-300 ${
                  activeWork === work.id
                    ? "bg-gradient-to-r from-amber-900/30 to-transparent border-l-4 border-amber-500 pl-5"
                    : "hover:bg-[#252525]/30"
                }`}
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <img
                      src={work.logo || "/placeholder.svg"}
                      alt={`${work.title} logo`}
                      className={`w-12 h-12 rounded-md object-contain p-2 ${
                        activeWork === work.id ? "bg-amber-900/30" : "bg-[#252525]"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${activeWork === work.id ? "text-amber-400" : "text-gray-300"}`}>
                      {work.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-1">{work.categories}</p>
                    <div className="flex items-center text-amber-500/80 text-sm">
                      <Icon name="Calendar" size={16} className="mr-2" />
                      <span>{work.period}</span>
                    </div>
                  </div>
                  {activeWork === work.id && <Icon name="ChevronRight" size={24} className="ml-auto text-amber-500" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          {workExperience.map((work) => (
            <div
              key={work.id}
              className={`transition-all duration-500 ${
                activeWork === work.id
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 absolute -z-10 transform translate-y-8"
              }`}
            >
              {activeWork === work.id && (
                <div className="bg-[#252525] rounded-2xl p-10 shadow-xl border border-amber-900/20 animate-fadeIn">
                  <div className="mb-8 pb-8 border-b border-amber-900/20">
                    <h3 className="text-4xl font-bold mb-3 text-amber-400">{work.title}</h3>
                    <h4 className="text-2xl mb-6 text-gray-300">
                      <span className="text-amber-500">{work.categories}</span>
                    </h4>

                    <div className="flex items-center text-gray-400 text-lg mb-6">
                      <Icon name="Calendar" size={20} className="mr-3 text-amber-600/70" />
                      <span>{work.period}</span>
                    </div>

                    <p className="text-gray-300 text-xl">{work.fullDescription}</p>
                  </div>

                  <div className="mb-10">
                    <h5 className="text-amber-500 font-medium mb-6 text-xl">Responsibilities</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {work.jobDesc.map((responsibility, i) => (
                        <div
                          key={i}
                          className="flex items-start bg-amber-900/10 rounded-lg p-4 hover:bg-amber-900/20 transition-colors"
                        >
                          <span className="w-3 h-3 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-gray-300 text-lg">{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-amber-500 font-medium mb-6 text-xl">Project Screenshot</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {work.screenshots.map((screenshot, i) => (
                        <div
                          key={i}
                          className="rounded-lg overflow-hidden border border-gray-700 hover:border-amber-600/50 transition-all shadow-lg hover:shadow-xl"
                        >
                          <img
                            src={screenshot || "/placeholder.svg"}
                            alt={`${work.title} screenshot ${i + 1}`}
                            className="w-full h-auto"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
