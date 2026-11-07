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
          <p className="text-white/60 mt-3 text-xs sm:text-sm max-w-xl mx-auto md:mx-0 animate-on-scroll delay-100">
            Selected detailed implementations and projects I&apos;ve executed in real-world environments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">
          {portfolioActivities.map((activity, index) => (
            <div
              key={activity.id}
              className="animate-on-scroll w-full max-w-[17.5rem] h-full"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div
                onClick={() => handleCardClick(activity)}
                className={`group relative card-dark overflow-hidden cursor-pointer flex flex-col h-full rounded-2xl ${
                  pressedId === activity.id
                    ? "scale-95 opacity-80"
                    : "hover:-translate-y-1.5 transition-all duration-300"
                }`}
              >
                {/* Cover Image */}
                <div className="aspect-video overflow-hidden relative bg-[#0B0B0C]">
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={activity.coverImage}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-2 right-2 z-20 bg-[#0B0B0C]/85 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center border border-white/15">
                    <Icon name="Image" size={10} className="text-[#C6F432] mr-1" />
                    <span className="text-[10px] text-white font-semibold">
                      {activity.gallery?.length || 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow relative z-20">
                  <h3 className="text-[13px] font-bold text-white mb-1.5 line-clamp-2 leading-snug">
                    {activity.title}
                  </h3>

                  <div className="flex items-center text-[11px] text-white/55 mb-3">
                    <Icon name="MapPin" size={11} className="mr-1 text-[#C6F432] shrink-0" />
                    <span className="truncate">{activity.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3 mt-auto">
                    {activity.techStack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9px] uppercase font-bold tracking-wider text-white/85 bg-[#0B0B0C] px-2 py-0.5 rounded-md border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {activity.techStack.length > 3 && (
                      <span className="text-[9px] text-white/50 px-1.5 py-0.5 font-semibold">
                        +{activity.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-white/50 font-medium">{activity.date}</span>
                    <div className="flex items-center text-white group-hover:text-[#C6F432] font-bold text-[11px] group-hover:translate-x-1 transition-all">
                      Details <Icon name="ArrowRight" size={11} className="ml-1" />
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
