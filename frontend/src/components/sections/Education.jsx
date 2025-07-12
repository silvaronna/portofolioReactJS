"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import EducationSelector from "../ui/EducationSelector"
import EducationDetail from "../ui/EducationDetail"
import { education } from "../../data"

export default function Education() {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <section id="education" className="section-container bg-dark">
      <div className="mb-16 animate-on-scroll">
        <SectionHeading title="Education" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2 animate-on-scroll delay-100">
          <EducationSelector education={education} activeTab={activeTab} onTabSelect={setActiveTab} />
        </div>

        <div className="lg:col-span-3 animate-on-scroll delay-200">
          <EducationDetail education={education} activeTab={activeTab} />
        </div>
      </div>
    </section>
  )
}
