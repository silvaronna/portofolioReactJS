"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import CertificationSlider from "../ui/CertificationSlider"
import CertificationDetail from "../ui/CertificationDetail"
import { certifications } from "../../data"

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null)

  const handleCertClick = (cert) => {
    setSelectedCert((prev) => (prev?.id === cert.id ? null : cert))
  }

  return (
    <section id="certifications" className="section-container bg-dark py-12 md:py-16">
      <div className="mb-6 animate-on-scroll text-center md:text-left">
        <SectionHeading title="Certifications" />
        <p className="text-white/65 mt-3 text-xs sm:text-sm md:text-base max-w-2xl mx-auto md:mx-0 animate-on-scroll delay-100">
          Professional certifications that validate my expertise and knowledge in various IT and cybersecurity domains.
        </p>
      </div>

      <div className="animate-on-scroll delay-200">
        <CertificationSlider
          certifications={certifications}
          selectedCert={selectedCert?.id}
          onCertClick={handleCertClick}
        />
      </div>

      <CertificationDetail
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  )
}
