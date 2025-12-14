"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import EducationSelector from "../ui/EducationSelector"
import EducationDetail from "../ui/EducationDetail"
import { education } from "../../data"

export default function Education() {
  const [activeTab, setActiveTab] = useState(1)

  return (
    // REVISI: Standard Padding py-24
    <section id="education" className="bg-dark py-24">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        {/* REVISI: mb-12 -> mb-16 */}
        <div className="mb-16 animate-on-scroll">
          <SectionHeading title="Education" />
          {/* REVISI: Tambahkan text-center md:text-left agar rapi di HP */}
          <p className="text-center md:text-left text-gray-400 mt-4 text-lg max-w-2xl animate-on-scroll delay-100">
            My academic journey, qualifications, and educational background.
          </p>
        </div>

        {/* Content Grid */}
        {/* REVISI: gap-8 -> gap-10 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          
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