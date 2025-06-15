"use client"

import { useState } from "react"
import CertificationSlider from "../ui/CertificationSlider"
import CertificationDetail from "../ui/CertificationDetail"
import { certifications } from "../../data"

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null)

  const handleCertClick = (cert) => {
    setSelectedCert(cert.id === selectedCert ? null : cert.id)
  }

  const selectedCertData = certifications.find((cert) => cert.id === selectedCert)

  return (
    <section id="certifications" className="section-container bg-dark">
      <div className="mb-20">
        <h2 className="section-heading text-amber-400 mb-10">Certifications</h2>
        <p className="text-gray-300 text-2xl max-w-3xl">
          Professional certifications that validate my expertise and knowledge in various IT domains.
        </p>
      </div>

      <CertificationSlider certifications={certifications} selectedCert={selectedCert} onCertClick={handleCertClick} />

      {selectedCertData && <CertificationDetail certification={selectedCertData} />}
    </section>
  )
}
