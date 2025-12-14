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
      <div className="mb-12 animate-on-scroll">
        {/* Judul ini sekarang akan otomatis berwarna Emas */}
        <SectionHeading title="Recent Work" />
        <p className="text-center md:text-left text-gray-400 mt-4 text-lg animate-on-scroll delay-100 max-w-2xl">
          Explore my professional experience and projects I've worked on.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-2 animate-on-scroll delay-200 sticky top-24">
          <WorkSelector workExperience={workExperience} activeWork={activeWork} onWorkSelect={setActiveWork} />
        </div>

        <div className="lg:col-span-3 animate-on-scroll delay-300">
          <WorkDetail workExperience={workExperience} activeWork={activeWork} />
        </div>
      </div>
    </section>
  )
}