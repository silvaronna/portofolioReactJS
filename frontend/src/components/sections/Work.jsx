"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import WorkSelector from "../ui/WorkSelector"
import WorkDetail from "../ui/WorkDetail"
import { workExperience } from "../../data"

export default function Work() {
  const [activeWork, setActiveWork] = useState(1)

  return (
    // REVISI: Standard Padding py-24
    <section id="work" className="bg-dark py-24">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        {/* REVISI: mb-12 -> mb-16 agar konsisten */}
        <div className="mb-16 animate-on-scroll">
          <SectionHeading title="Recent Work" />
          <p className="text-center md:text-left text-gray-400 mt-4 text-lg animate-on-scroll delay-100 max-w-2xl">
            Explore my professional experience and projects I've worked on.
          </p>
        </div>

        {/* Content Grid */}
        {/* REVISI: gap-6 -> gap-10 agar lebih lega */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          
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