"use client"

import Icon from "./Icon"

export default function WorkSelector({ workExperience, activeWork, onWorkSelect }) {
  return (
    <div className="space-y-[clamp(0.4rem,1vw,0.6rem)]">
      {workExperience.map((work) => (
        <button
          key={work.id}
          onClick={() => onWorkSelect(work.id)}
          className={`w-full p-[clamp(0.5rem,1.5vw,0.75rem)] rounded-xl transition-all duration-300 group flex flex-col md:flex-row items-center md:items-start text-center md:text-left border-t-[3px] md:border-t-0 md:border-l-[3px] ${
            activeWork === work.id
              ? "bg-gradient-to-r from-amber-900/20 to-transparent border-amber-500 md:pl-[clamp(0.75rem,2vw,1rem)]"
              : "hover:bg-[#222222] border-transparent"
          }`}
        >
          {/* Logo Container */}
          <div className="mb-[clamp(0.3rem,1vw,0.5rem)] md:mb-0 md:mr-[clamp(0.5rem,1.5vw,0.75rem)]">
            <img
              src={work.logo || "/placeholder.svg"}
              alt={`${work.title} logo`}
              className={`w-[clamp(2rem,4vw,2.5rem)] h-[clamp(2rem,4vw,2.5rem)] md:w-[clamp(1.5rem,3vw,2rem)] md:h-[clamp(1.5rem,3vw,2rem)] rounded-lg object-contain p-[clamp(0.1rem,0.5vw,0.25rem)] transition-colors mx-auto ${
                activeWork === work.id ? "bg-amber-900/20" : "bg-black/20 group-hover:bg-[#333]"
              }`}
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className={`font-bold truncate text-[clamp(0.75rem,1.5vw,0.875rem)] ${activeWork === work.id ? "text-amber-400" : "text-gray-300 group-hover:text-white"}`}>
              {work.title}
            </h3>
            <p className="text-gray-500 mb-[0.125rem] truncate text-[clamp(0.6rem,1.2vw,0.7rem)]">{work.categories}</p>
            
            <div className="flex items-center justify-center md:justify-start text-amber-600/80 text-[clamp(0.6rem,1.2vw,0.7rem)]">
              <Icon name="Calendar" size={12} className="mr-1 scale-90 md:scale-100" />
              <span>{work.period}</span>
            </div>
          </div>

          {/* Chevron hanya muncul di Desktop untuk hemat tempat di HP */}
          {activeWork === work.id && (
             <div className="hidden md:flex items-center ml-2 h-full">
               <Icon name="ChevronRight" size={14} className="text-amber-500/80" />
             </div>
          )}
        </button>
      ))}
    </div>
  )
}