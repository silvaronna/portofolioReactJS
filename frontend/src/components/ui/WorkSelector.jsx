"use client"

import Icon from "./Icon"

export default function WorkSelector({ workExperience, activeWork, onWorkSelect }) {
  return (
    <div className="space-y-3">
      {workExperience.map((work) => (
        <button
          key={work.id}
          onClick={() => onWorkSelect(work.id)}
          // REVISI: 
          // text-center md:text-left : Agar teks di tengah pada HP
          // items-center : Memastikan konten flex juga di tengah
          className={`w-full px-5 py-4 rounded-xl transition-all duration-300 group flex flex-col md:flex-row items-center md:items-start text-center md:text-left ${
            activeWork === work.id
              ? "bg-gradient-to-r from-amber-900/40 to-transparent border-t-4 md:border-t-0 md:border-l-4 border-amber-500 md:pl-4"
              : "hover:bg-[#252525] border-t-4 md:border-t-0 md:border-l-4 border-transparent"
          }`}
        >
          {/* Logo Container */}
          <div className="mb-3 md:mb-0 md:mr-4">
            <img
              src={work.logo || "/placeholder.svg"}
              alt={`${work.title} logo`}
              className={`w-12 h-12 md:w-10 md:h-10 rounded-lg object-contain p-1.5 transition-colors mx-auto ${
                activeWork === work.id ? "bg-amber-900/30" : "bg-[#2a2a2a] group-hover:bg-[#333]"
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={`text-base font-bold truncate ${activeWork === work.id ? "text-amber-400" : "text-gray-300 group-hover:text-white"}`}>
              {work.title}
            </h3>
            <p className="text-gray-500 text-xs mb-1 truncate">{work.categories}</p>
            
            <div className="flex items-center justify-center md:justify-start text-amber-600/80 text-xs">
              <Icon name="Calendar" size={14} className="mr-1.5" />
              <span>{work.period}</span>
            </div>
          </div>

          {/* Chevron hanya muncul di Desktop untuk hemat tempat di HP */}
          {activeWork === work.id && (
             <Icon name="ChevronRight" size={18} className="hidden md:block ml-2 text-amber-500" />
          )}
        </button>
      ))}
    </div>
  )
}