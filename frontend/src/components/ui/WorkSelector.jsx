"use client"

import Icon from "./Icon"

export default function WorkSelector({ workExperience, activeWork, onWorkSelect }) {
  return (
    <div className="space-y-3">
      {workExperience.map((work) => {
        const isActive = activeWork === work.id
        return (
          <button
            key={work.id}
            onClick={() => onWorkSelect(work.id)}
            className={`w-full p-3.5 rounded-xl transition-all duration-300 group flex flex-col md:flex-row items-center md:items-start text-center md:text-left border-t-[3px] md:border-t-0 md:border-l-[3px] ${
              isActive
                ? "bg-[#121215] border-[#C6F432] shadow-[0_8px_25px_-6px_rgba(0,0,0,0.8)] md:pl-4"
                : "bg-[#121215]/40 hover:bg-[#121215] border-transparent hover:border-white/20"
            }`}
          >
            {/* Logo Container */}
            <div className="mb-2 md:mb-0 md:mr-3.5 shrink-0">
              <img
                src={work.logo || "/placeholder.svg"}
                alt={`${work.title} logo`}
                className={`w-10 h-10 md:w-9 md:h-9 rounded-lg object-contain p-1 transition-colors mx-auto border ${
                  isActive
                    ? "bg-[#0B0B0C] border-white/20"
                    : "bg-[#0B0B0C]/60 border-white/10 group-hover:border-white/20"
                }`}
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3
                className={`font-bold truncate text-xs sm:text-sm transition-colors ${
                  isActive ? "text-white" : "text-white/65 group-hover:text-white"
                }`}
              >
                {work.title}
              </h3>
              <p className="text-white/50 mb-1 truncate text-[11px]">{work.categories}</p>

              <div className="flex items-center justify-center md:justify-start text-white/60 text-[11px] font-medium">
                <Icon name="Calendar" size={11} className="mr-1 text-[#C6F432]" />
                <span>{work.period}</span>
              </div>
            </div>

            {isActive && (
              <div className="hidden md:flex items-center ml-2 self-center">
                <Icon name="ChevronRight" size={15} className="text-[#C6F432]" />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
