"use client"

import Icon from "./Icon"

export default function EducationSelector({ education, activeTab, onTabSelect }) {
  return (
    <div className="space-y-[clamp(0.4rem,1vw,0.6rem)]">
      {education.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabSelect(item.id)}
          // REFACTOR: text-center md:text-left untuk responsive alignment
          className={`w-full p-[clamp(0.5rem,1.5vw,0.75rem)] rounded-xl transition-all duration-300 group flex flex-col md:flex-row items-center md:items-start text-center md:text-left border-t-[3px] md:border-t-0 md:border-l-[3px] ${
            activeTab === item.id
              ? "bg-gradient-to-r from-amber-900/20 to-transparent border-amber-500 md:pl-[clamp(0.75rem,2vw,1rem)]"
              : "hover:bg-[#222222] border-transparent"
          }`}
        >
            <div
              // REFACTOR: Icon di tengah pada Mobile (mx-auto), Kiri di Desktop (mr-4)
              className={`w-[clamp(1.75rem,4vw,2.25rem)] h-[clamp(1.75rem,4vw,2.25rem)] rounded-full flex items-center justify-center transition-colors mb-[clamp(0.3rem,1vw,0.5rem)] md:mb-0 md:mr-[clamp(0.5rem,1.5vw,0.75rem)] mx-auto ${
                activeTab === item.id ? "bg-amber-900/20 text-amber-400" : "bg-black/20 text-gray-500"
              }`}
            >
              <Icon name="GraduationCap" size={14} className="scale-90 md:scale-100" />
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className={`font-bold truncate text-[clamp(0.75rem,1.5vw,0.85rem)] ${activeTab === item.id ? "text-amber-400" : "text-gray-300 group-hover:text-white"}`}>
                {item.institution}
              </h3>
              {/* REFACTOR: Metadata di tengah (justify-center) pada Mobile */}
              <div className="flex items-center justify-center md:justify-start text-gray-500 text-[clamp(0.6rem,1.2vw,0.7rem)] mt-[0.125rem]">
                <Icon name="Calendar" size={10} className="mr-1" />
                <span>{item.period}</span>
              </div>
            </div>

            {/* Icon Panah hanya di Desktop */}
            {activeTab === item.id && (
               <div className="hidden md:flex items-center ml-2 h-full">
                  <Icon name="ChevronRight" size={14} className="text-amber-500/80" />
               </div>
            )}
        </button>
      ))}
    </div>
  )
}