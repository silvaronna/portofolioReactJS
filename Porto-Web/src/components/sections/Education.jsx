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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div className="animate-on-scroll">
          <SectionHeading title="Education" />

          <EducationSelector education={education} activeTab={activeTab} onTabSelect={setActiveTab} />
        </div>

        <div className="md:col-span-2">
          <EducationDetail education={education} activeTab={activeTab} />
        </div>
      </div>
    </section>
  )
}
