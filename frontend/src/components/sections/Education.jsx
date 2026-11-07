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
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header Section */}
        <div className="mb-8 animate-on-scroll text-center md:text-left">
          <SectionHeading title="Education" />
          <p className="text-white/60 mt-3 text-xs md:text-sm max-w-xl mx-auto md:mx-0 animate-on-scroll delay-100 leading-relaxed">
            My academic journey, cloud engineering programs, and technical qualifications.
          </p>
        </div>

        {/* Content Grid: Compact 5-column layout matching Recent Work proportion */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Left Column: Connected Academic Timeline Stepper */}
          <div className="lg:col-span-2 animate-on-scroll delay-100 lg:sticky lg:top-24">
            <EducationSelector
              education={education}
              activeTab={activeTab}
              onTabSelect={setActiveTab}
            />
          </div>

          {/* Right Column: Academic Dossier & Curriculum Bento Grid */}
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
