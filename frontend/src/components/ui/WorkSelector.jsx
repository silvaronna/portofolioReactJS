"use client"

import Icon from "./Icon"

export default function WorkSelector({ workExperience, activeWork, onWorkSelect }) {
  return (
    <div className="space-y-2">
      {workExperience.map((work) => (
        <button
          key={work.id}
          onClick={() => onWorkSelect(work.id)}
          // REVISI: 
          // text-center md:text-left : Agar teks di tengah pada HP
          // items-center : Memastikan konten flex juga di tengah
          className={`w-full px-4 py-3 rounded-xl transition-all duration-300 group flex flex-col md:flex-row items-center md:items-start text-center md:text-left ${
            activeWork === work.id
              ? "bg-gradient-to-r from-amber-900/40 to-transparent border-t-4 md:border-t-0 md:border-l-4 border-amber-500 md:pl-3"
              : "hover:bg-[#252525] border-t-4 md:border-t-0 md:border-l-4 border-transparent"
          }`}
        >
          {/* Logo Container */}
          <div className="mb-2 md:mb-0 md:mr-3">
            <img
              src={work.logo || "/placeholder.svg"}
              alt={`${work.title} logo`}
              className={`w-10 h-10 md:w-8 md:h-8 rounded-lg object-contain p-1 transition-colors mx-auto ${
                activeWork === work.id ? "bg-amber-900/30" : "bg-[#2a2a2a] group-hover:bg-[#333]"
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-bold truncate ${activeWork === work.id ? "text-amber-400" : "text-gray-300 group-hover:text-white"}`}>
              {work.title}
            </h3>
            <p className="text-gray-500 text-[11px] mb-0.5 truncate">{work.categories}</p>
            
            <div className="flex items-center justify-center md:justify-start text-amber-600/80 text-[11px]">
              <Icon name="Calendar" size={12} className="mr-1" />
              <span>{work.period}</span>
            </div>
          </div>

          {/* Chevron hanya muncul di Desktop untuk hemat tempat di HP */}
          {activeWork === work.id && (
             <Icon name="ChevronRight" size={16} className="hidden md:block ml-2 text-amber-500" />
          )}
        </button>
      ))}
    </div>
  )
}