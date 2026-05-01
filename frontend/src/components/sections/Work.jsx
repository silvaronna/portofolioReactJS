"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import WorkSelector from "../ui/WorkSelector"
import WorkDetail from "../ui/WorkDetail"
import { workExperience } from "../../data"

export default function Work() {
  const [activeWork, setActiveWork] = useState(1)

  return (
    <section id="work" className="bg-dark py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-10 animate-on-scroll text-center md:text-left">
          <SectionHeading title="Recent Work" />
          <p className="text-gray-400 mt-2 text-xs md:text-sm animate-on-scroll delay-100 max-w-xl mx-auto md:mx-0">
            Explore my professional experience and projects I've worked on.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          
          {/* Selector Column */}
          <div className="lg:col-span-2 animate-on-scroll delay-200 sticky top-24">
            <WorkSelector 
              workExperience={workExperience} 
              activeWork={activeWork} 
              onWorkSelect={setActiveWork} 
            />
          </div>

          {/* Detail Column */}
          <div className="lg:col-span-3 animate-on-scroll delay-300">
            <WorkDetail 
              workExperience={workExperience} 
              activeWork={activeWork} 
            />
          </div>

        </div>
      </div>
    </section>
  )
}
