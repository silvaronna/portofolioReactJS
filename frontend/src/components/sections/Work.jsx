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
      {/* REFACTOR: mb-16 -> mb-10 agar tidak terlalu jauh */}
      <div className="mb-10 animate-on-scroll">
        <SectionHeading title="Recent Work" />
        {/* REFACTOR: text-2xl -> text-lg, mt-10 -> mt-4. Lebih rapat ke judul. */}
        <p className="text-gray-400 mt-4 text-lg animate-on-scroll delay-100 max-w-2xl">
          Explore my professional experience and projects I've worked on.
        </p>
      </div>

      {/* REFACTOR: gap-16 -> gap-8 agar panel kiri dan kanan lebih menyatu */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
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