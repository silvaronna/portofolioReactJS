"use client"

import { useState } from "react"
import Icon from "./ui/Icon"
import SectionHeading from "./ui/SectionHeading"
import { education } from "../data"

export default function EducationSection() {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <section id="education" className="section-container bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div className="animate-on-scroll">
          <SectionHeading title="Education" />

          <div className="mt-16 space-y-6">
            {education.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-amber-900/30 to-transparent border-l-4 border-amber-500 pl-5"
                    : "hover:bg-[#252525]/30"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      activeTab === item.id ? "bg-amber-900/30 text-amber-400" : "bg-[#252525] text-gray-400"
                    }`}
                  >
                    <Icon name="GraduationCap" size={24} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${activeTab === item.id ? "text-amber-400" : "text-gray-300"}`}>
                      {item.institution}
                    </h3>
                    <p className="text-gray-400">{item.period}</p>
                  </div>
                  {activeTab === item.id && <Icon name="ChevronRight" size={24} className="ml-auto text-amber-500" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          {education.map((item) => (
            <div
              key={item.id}
              className={`transition-all duration-500 ${
                activeTab === item.id
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 absolute -z-10 transform translate-y-8"
              }`}
            >
              {activeTab === item.id && (
                <div className="bg-[#252525] rounded-2xl p-10 shadow-xl border border-amber-900/20 animate-fadeIn">
                  <div className="mb-8 pb-8 border-b border-amber-900/20">
                    <h3 className="text-4xl font-bold mb-3 text-amber-400">{item.institution}</h3>
                    <h4 className="text-2xl mb-6 text-gray-300">
                      {item.degree} • <span className="text-amber-500">{item.field}</span>
                    </h4>

                    <div className="flex flex-wrap gap-8 mb-6">
                      <div className="flex items-center text-gray-400 text-lg">
                        <Icon name="Calendar" size={20} className="mr-3 text-amber-600/70" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-lg">
                        <Icon name="MapPin" size={20} className="mr-3 text-amber-600/70" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-xl">{item.description}</p>
                  </div>

                  <div>
                    <p className="text-gray-300 text-lg mb-8">{item.fullDescription}</p>

                    <h5 className="text-amber-500 font-medium mb-6 text-xl">Key Courses</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.courses.map((course, i) => (
                        <div
                          key={i}
                          className="flex items-center bg-amber-900/10 rounded-lg p-4 hover:bg-amber-900/20 transition-colors"
                        >
                          <span className="w-3 h-3 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                          <span className="text-gray-300 text-lg">{course}</span>
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
