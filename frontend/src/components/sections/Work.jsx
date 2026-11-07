"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import WorkSelector from "../ui/WorkSelector"
import WorkDetail from "../ui/WorkDetail"
import { workExperience } from "../../data"

export default function Work() {
  const [activeWork, setActiveWork] = useState(1)

  return (
    <section id="work" className="bg-dark py-12 md:py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header Section */}
        <div className="mb-8 animate-on-scroll text-center md:text-left">
          <SectionHeading title="Recent Work" />
          <p className="text-white/60 mt-3 text-xs md:text-sm animate-on-scroll delay-100 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Explore my professional experience and infrastructure systems I&apos;ve engineered.
          </p>
        </div>

        {/* Content Grid: Compact 5-column layout matching Education section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Card Swap Selector Column */}
          <div className="lg:col-span-2 animate-on-scroll delay-200 lg:sticky lg:top-24 flex justify-center lg:justify-start">
            <WorkSelector
              workExperience={workExperience}
              activeWork={activeWork}
              onWorkSelect={setActiveWork}
            />
          </div>

          {/* Untitled UI Inspired Detail Column */}
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
