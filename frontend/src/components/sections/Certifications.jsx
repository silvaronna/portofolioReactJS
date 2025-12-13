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
      <div className="mb-12 animate-on-scroll">
        {/* Judul ini sekarang akan otomatis berwarna Emas */}
        <SectionHeading title="Certifications" />
        <p className="text-gray-400 mt-4 text-lg max-w-2xl animate-on-scroll delay-100">
          Professional certifications that validate my expertise and knowledge in various IT domains.
        </p>
      </div>

      <div className="animate-on-scroll delay-200 mb-12">
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