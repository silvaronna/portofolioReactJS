"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import ActivityModal from "../ui/ActivityModal"
import Icon from "../ui/Icon"
// FIX: Import nama variabel baru 'portfolioActivities' (bukan portfolioPortofolio)
import { portfolioActivities } from "../../data"

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [pressedId, setPressedId] = useState(null)

  const handleCardClick = (activity) => {
    setPressedId(activity.id)
    setTimeout(() => {
      setPressedId(null)
      setSelectedActivity(activity)
    }, 150) 
  }

  return (
    <section id="activities" className="section-container bg-dark">
      <div className="mb-12 animate-on-scroll">
        <SectionHeading title="Portfolio" />
        <p className="text-gray-400 mt-4 text-lg max-w-2xl animate-on-scroll delay-100">
          Selected detailed implementations and projects I've executed in real-world environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* FIX: Map dari 'portfolioActivities' */}
        {portfolioActivities.map((activity, index) => (
          <div 
            key={activity.id}
            className="animate-on-scroll h-full"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div
              onClick={() => handleCardClick(activity)}
              className={`group relative bg-[#252525] rounded-2xl overflow-hidden cursor-pointer border border-gray-800 hover:border-amber-500/50 transition-all duration-200 flex flex-col h-full ${
                pressedId === activity.id 
                  ? "scale-95 opacity-80" 
                  : "hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-1 hover:scale-[1.02]"
              }`}
            >
              {/* Cover Image */}
              <div className="aspect-video overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={activity.coverImage}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center">
                   <Icon name="Image" size={12} className="text-amber-400 mr-1.5" />
                   <span className="text-xs text-white font-medium">{activity.gallery.length}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow relative z-20 bg-[#252525]">
                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {activity.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-400 mb-4">
                   <Icon name="MapPin" size={14} className="mr-1.5 text-amber-600" />
                   {activity.location}
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {activity.techStack.slice(0, 3).map((tech, i) => (
                     <span key={i} className="text-[10px] uppercase font-bold tracking-wider text-gray-400 bg-black/30 px-2 py-1 rounded-md border border-white/5">
                       {tech}
                     </span>
                  ))}
                  {activity.techStack.length > 3 && (
                     <span className="text-[10px] text-gray-500 px-1 py-1">+ {activity.techStack.length - 3}</span>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                   <span className="text-xs text-gray-500">{activity.date}</span>
                   <div className="flex items-center text-amber-500 font-bold text-sm group-hover:translate-x-1 transition-transform">
                      Details <Icon name="ArrowRight" size={16} className="ml-1" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ActivityModal 
        isOpen={!!selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
        activity={selectedActivity} 
      />
    </section>
  )
}