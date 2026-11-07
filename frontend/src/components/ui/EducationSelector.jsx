"use client"

import Icon from "./Icon"

export default function EducationSelector({ education, activeTab, onTabSelect }) {
  return (
    <div className="space-y-3">
      {education.map((item) => {
        const isActive = activeTab === item.id
        return (
          <button
            key={item.id}
            onClick={() => onTabSelect(item.id)}
            className={`w-full p-3.5 rounded-xl transition-all duration-300 group flex flex-col md:flex-row items-center md:items-start text-center md:text-left border-t-[3px] md:border-t-0 md:border-l-[3px] ${
              isActive
                ? "bg-[#121215] border-[#C6F432] shadow-[0_8px_25px_-6px_rgba(0,0,0,0.8)] md:pl-4"
                : "bg-[#121215]/40 hover:bg-[#121215] border-transparent hover:border-white/20"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors mb-2 md:mb-0 md:mr-3.5 mx-auto shrink-0 border ${
                isActive
                  ? "bg-[#C6F432] text-[#0B0B0C] border-[#C6F432]"
                  : "bg-[#0B0B0C] text-white/70 border-white/10 group-hover:border-white/25"
              }`}
            >
              <Icon name="GraduationCap" size={16} />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3
                className={`font-bold truncate text-xs sm:text-sm transition-colors ${
                  isActive ? "text-white" : "text-white/65 group-hover:text-white"
                }`}
              >
                {item.institution}
              </h3>
              <div className="flex items-center justify-center md:justify-start text-white/55 text-[11px] mt-0.5">
                <Icon name="Calendar" size={11} className="mr-1 text-[#C6F432]" />
                <span>{item.period}</span>
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
