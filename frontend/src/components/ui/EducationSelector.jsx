"use client"

import Icon from "./Icon"

export default function EducationSelector({ education, activeTab, onTabSelect }) {
  return (
    <div className="space-y-3">
      {education.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabSelect(item.id)}
          // REFACTOR: padding lebih compact, rounded-xl konsisten
          className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 group ${
            activeTab === item.id
              ? "bg-gradient-to-r from-amber-900/40 to-transparent border-l-4 border-amber-500 pl-4"
              : "hover:bg-[#252525] border-l-4 border-transparent"
          }`}
        >
          <div className="flex items-center">
            <div
              // REFACTOR: Icon container size w-12 -> w-10
              className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${
                activeTab === item.id ? "bg-amber-900/30 text-amber-400" : "bg-[#2a2a2a] text-gray-500 group-hover:text-gray-300"
              }`}
            >
              <Icon name="GraduationCap" size={20} />
            </div>

            <div className="flex-1 min-w-0">
              {/* REFACTOR: text-xl -> text-base */}
              <h3 className={`text-base font-bold truncate ${activeTab === item.id ? "text-amber-400" : "text-gray-300 group-hover:text-white"}`}>
                {item.institution}
              </h3>
              <div className="flex items-center text-gray-500 text-xs mt-1">
                <Icon name="Calendar" size={12} className="mr-1.5" />
                <span>{item.period}</span>
              </div>
            </div>

            {activeTab === item.id && <Icon name="ChevronRight" size={18} className="ml-2 text-amber-500" />}
          </div>
        </button>
      ))}
    </div>
  )
}