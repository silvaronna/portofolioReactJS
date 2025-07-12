"use client"

import Icon from "./Icon"

export default function EducationSelector({ education, activeTab, onTabSelect }) {
  return (
    <div className="space-y-6">
      {education.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabSelect(item.id)}
          className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
            activeTab === item.id
              ? "bg-gradient-to-r from-amber-900/30 to-transparent border-l-4 border-amber-500 pl-5"
              : "hover:bg-[#252525]/30"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                activeTab === item.id ? "bg-amber-900/30 text-amber-400" : "bg-[#252525] text-gray-400"
              }`}
            >
              <Icon name="GraduationCap" size={24} />
            </div>

            <div className="flex-1">
              <h3 className={`text-xl font-bold ${activeTab === item.id ? "text-amber-400" : "text-gray-300"}`}>
                {item.institution}
              </h3>
              <p className="text-gray-400">{item.period}</p>
            </div>

            {activeTab === item.id && <Icon name="ChevronRight" size={24} className="ml-auto text-amber-500" />}
          </div>
        </button>
      ))}
    </div>
  )
}
