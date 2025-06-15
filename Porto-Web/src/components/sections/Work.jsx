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
      <div className="mb-16 animate-on-scroll">
        <SectionHeading title="Recent Work" />
        <p className="text-gray-300 mt-10 text-2xl animate-on-scroll delay-100">
          Explore my professional experience and projects I've worked on
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2 animate-on-scroll delay-200">
          <WorkSelector workExperience={workExperience} activeWork={activeWork} onWorkSelect={setActiveWork} />
        </div>

        <div className="lg:col-span-3 animate-on-scroll delay-300">
          <WorkDetail workExperience={workExperience} activeWork={activeWork} />
        </div>
      </div>
    </section>
  )
}
