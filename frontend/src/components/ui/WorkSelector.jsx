"use client"

import Icon from "./Icon"

export default function WorkSelector({ workExperience, activeWork, onWorkSelect }) {
  return (
    // REFACTOR: space-y-6 -> space-y-3. Lebih padat.
    <div className="space-y-3">
      {workExperience.map((work) => (
        <button
          key={work.id}
          onClick={() => onWorkSelect(work.id)}
          // REFACTOR: Padding dikurangi px-6 py-7 -> px-5 py-4
          className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 group ${
            activeWork === work.id
              ? "bg-gradient-to-r from-amber-900/40 to-transparent border-l-4 border-amber-500 pl-4"
              : "hover:bg-[#252525] border-l-4 border-transparent"
          }`}
        >
          <div className="flex items-center">
            <div className="mr-4">
              <img
                src={work.logo || "/placeholder.svg"}
                alt={`${work.title} logo`}
                // REFACTOR: Logo size w-12 -> w-10
                className={`w-10 h-10 rounded-lg object-contain p-1.5 transition-colors ${
                  activeWork === work.id ? "bg-amber-900/30" : "bg-[#2a2a2a] group-hover:bg-[#333]"
                }`}
              />
            </div>

            <div className="flex-1 min-w-0"> {/* min-w-0 mencegah text truncate error */}
              {/* REFACTOR: text-xl -> text-base */}
              <h3 className={`text-base font-bold truncate ${activeWork === work.id ? "text-amber-400" : "text-gray-300 group-hover:text-white"}`}>
                {work.title}
              </h3>
              {/* REFACTOR: text-sm -> text-xs */}
              <p className="text-gray-500 text-xs mb-1 truncate">{work.categories}</p>
              
              <div className="flex items-center text-amber-600/80 text-xs">
                <Icon name="Calendar" size={14} className="mr-1.5" />
                <span>{work.period}</span>
              </div>
            </div>

            {activeWork === work.id && <Icon name="ChevronRight" size={18} className="ml-2 text-amber-500" />}
          </div>
        </button>
      ))}
    </div>
  )
}