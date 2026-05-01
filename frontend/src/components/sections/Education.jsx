"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import EducationSelector from "../ui/EducationSelector"
import EducationDetail from "../ui/EducationDetail"
import { education } from "../../data"

export default function Education() {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <section id="education" className="bg-dark py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-10 animate-on-scroll text-center md:text-left">
          <SectionHeading title="Education" />
          <p className="text-gray-400 mt-2 text-xs md:text-sm max-w-xl mx-auto md:mx-0 animate-on-scroll delay-100">
            My academic journey, qualifications, and educational background.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          
          {/* Selector Column */}
          <div className="lg:col-span-2 animate-on-scroll delay-100 sticky top-20">
            <EducationSelector 
              education={education} 
              activeTab={activeTab} 
              onTabSelect={setActiveTab} 
            />
          </div>

          {/* Detail Column */}
          <div className="lg:col-span-3 animate-on-scroll delay-200">
            <EducationDetail 
              education={education} 
              activeTab={activeTab} 
            />
          </div>

        </div>
      </div>
    </section>
  )
}
