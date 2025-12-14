"use client"

import Icon from "./Icon"

export default function EducationSelector({ education, activeTab, onTabSelect }) {
  return (
    <div className="space-y-3">
      {education.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabSelect(item.id)}
          // REFACTOR: text-center md:text-left untuk responsive alignment
          className={`w-full px-5 py-4 rounded-xl transition-all duration-300 group flex flex-col md:flex-row items-center md:items-start text-center md:text-left ${
            activeTab === item.id
              ? "bg-gradient-to-r from-amber-900/40 to-transparent border-t-4 md:border-t-0 md:border-l-4 border-amber-500 md:pl-4"
              : "hover:bg-[#252525] border-t-4 md:border-t-0 md:border-l-4 border-transparent"
          }`}
        >
            <div
              // REFACTOR: Icon di tengah pada Mobile (mx-auto), Kiri di Desktop (mr-4)
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors mb-3 md:mb-0 md:mr-4 mx-auto ${
                activeTab === item.id ? "bg-amber-900/30 text-amber-400" : "bg-[#2a2a2a] text-gray-500 group-hover:text-gray-300"
              }`}
            >
              <Icon name="GraduationCap" size={20} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className={`text-base font-bold truncate ${activeTab === item.id ? "text-amber-400" : "text-gray-300 group-hover:text-white"}`}>
                {item.institution}
              </h3>
              {/* REFACTOR: Metadata di tengah (justify-center) pada Mobile */}
              <div className="flex items-center justify-center md:justify-start text-gray-500 text-xs mt-1">
                <Icon name="Calendar" size={12} className="mr-1.5" />
                <span>{item.period}</span>
              </div>
            </div>

            {/* Icon Panah hanya di Desktop */}
            {activeTab === item.id && <Icon name="ChevronRight" size={18} className="hidden md:block ml-2 text-amber-500" />}
        </button>
      ))}
    </div>
  )
}