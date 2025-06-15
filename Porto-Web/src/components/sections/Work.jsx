"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import WorkSelector from "../ui/WorkSelector"
import WorkDetail from "../ui/WorkDetail"
import { workExperience } from "../../data"

export default function Work() {
  const [activeWork, setActiveWork] = useState(1)

  return (
    <section id="work" className="section-container bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div className="animate-on-scroll">
          <SectionHeading title="Recent Work" />
          <p className="text-gray-300 mt-10 text-2xl animate-on-scroll delay-100">
            Explore my professional experience and projects I've worked on
          </p>

          <WorkSelector workExperience={workExperience} activeWork={activeWork} onWorkSelect={setActiveWork} />
        </div>

        <div className="md:col-span-2">
          <WorkDetail workExperience={workExperience} activeWork={activeWork} />
        </div>
      </div>
    </section>
  )
}
