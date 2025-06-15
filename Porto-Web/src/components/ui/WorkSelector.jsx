"use client"

import Icon from "./Icon"

export default function WorkSelector({ workExperience, activeWork, onWorkSelect }) {
  return (
    <div className="space-y-6">
      {workExperience.map((work) => (
        <button
          key={work.id}
          onClick={() => onWorkSelect(work.id)}
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
  )
}
