"use client"

import { useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import CertificationSlider from "../ui/CertificationSlider"
import CertificationDetail from "../ui/CertificationDetail"
import { certifications } from "../../data"

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null)

  const handleCertClick = (cert) => {
    setSelectedCert(selectedCert?.id === cert.id ? null : cert)
  }

  return (
    <section id="certifications" className="section-container bg-dark">
      <div className="mb-8 animate-on-scroll">
        <SectionHeading title="Certifications" />
        <p className="text-center md:text-left text-gray-400 mt-3 text-sm md:text-base max-w-2xl animate-on-scroll delay-100">
          Professional certifications that validate my expertise and knowledge in various IT domains.
        </p>
      </div>

      <div className="animate-on-scroll delay-200 mb-8">
        <CertificationSlider 
          certifications={certifications} 
          selectedCert={selectedCert?.id} 
          onCertClick={handleCertClick} 
        />
      </div>

      {selectedCert && (
        <div className="animate-on-scroll delay-100 scroll-mt-24" id="cert-detail">
          <CertificationDetail certification={selectedCert} />
        </div>
      )}
    </section>
  )
}
