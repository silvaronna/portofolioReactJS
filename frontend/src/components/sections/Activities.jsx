"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import ActivityModal from "../ui/ActivityModal"
import Icon from "../ui/Icon"
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
    <section id="activities" className="bg-dark py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8 animate-on-scroll text-center md:text-left">
          <SectionHeading title="Portfolio" />
          <p className="text-gray-400 mt-2 text-[13px] md:text-sm max-w-xl mx-auto md:mx-0 animate-on-scroll delay-100">
            Selected detailed implementations and projects I've executed in real-world environments.
          </p>
        </div>

        {/* REFACTOR: Use tighter gap and allow up to 4 columns if screen is wide enough */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
          {portfolioActivities.map((activity, index) => (
            <div 
              key={activity.id}
              className="animate-on-scroll w-full max-w-[17rem] h-full"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                onClick={() => handleCardClick(activity)}
                className={`group relative card-dark overflow-hidden cursor-pointer flex flex-col h-full rounded-xl ${
                  pressedId === activity.id 
                    ? "scale-95 opacity-80" 
                    : "hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
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
                  <div className="absolute bottom-2 right-2 z-20 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center border border-white/10">
                     <Icon name="Image" size={8} className="text-amber-400 mr-1" />
                     <span className="text-[9px] text-white font-medium">{activity.gallery.length}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow relative z-20 bg-transparent">
                  <h3 className="text-[13px] font-bold text-white mb-1.5 line-clamp-2 group-hover:text-amber-400 transition-colors leading-snug">
                    {activity.title}
                  </h3>
                  
                  <div className="flex items-center text-[10px] text-gray-400 mb-3">
                     <Icon name="MapPin" size={10} className="mr-1 text-amber-600/80" />
                     <span className="truncate">{activity.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3 mt-auto">
                    {activity.techStack.slice(0, 3).map((tech, i) => (
                       <span key={i} className="text-[8px] uppercase font-bold tracking-wider text-gray-300 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                         {tech}
                       </span>
                    ))}
                    {activity.techStack.length > 3 && (
                       <span className="text-[8px] text-gray-500 px-1 py-0.5 font-medium">+{activity.techStack.length - 3}</span>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-white/5 flex items-center justify-between">
                     <span className="text-[9px] text-gray-500 font-medium">{activity.date}</span>
                     <div className="flex items-center text-amber-500 font-bold text-[10px] group-hover:translate-x-1 transition-transform">
                        Details <Icon name="ArrowRight" size={10} className="ml-1" />
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
      </div>
    </section>
  )
}
