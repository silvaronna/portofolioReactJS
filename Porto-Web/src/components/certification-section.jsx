"use client"

import { useState, useRef, useEffect } from "react"
import { Award, Calendar, ChevronLeft, ChevronRight, ExternalLink, Tag } from "lucide-react"

export default function CertificationSection() {
  const [selectedCert, setSelectedCert] = useState(null)
  const sliderRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [autoScrollPaused, setAutoScrollPaused] = useState(false)

  // Certification data - easy to manage and replace
  const certifications = [
    {
      id: 1,
      title: "Certified in CyberSecurity",
      issuer: "ISC2",
      issuedDate: "May 2025",
      image: "/isc2.jpeg",
      skills: ["Risk Management", "Access Control", "Security Principles", "Network & Security"],
      description:
        "Establishes the core knowledge required of any cybersecurity role and provides a springboard to intermediate-level cybersecurity jobs, covering essential principles for network security and risk management.",
      credentialLink: "https://drive.google.com/file/d/1O7XAwKO-IMyiNq1qyEao33X_FwPrGLug/view?usp=drive_link",
    },
    {
      id: 2,
      title: "Fundamental of Red Hat Enterprise Linux Server",
      issuer: "Coursera - RedHat",
      issuedDate: "June 2024",
      image: "/redhat.jpg",
      skills: ["RedHat System Administration", "Process Management and Monitoring", "System Permission", "User   and Group"],
      description:
        "Provides foundational knowledge of Red Hat Enterprise Linux system administration, including user and group management, file system permissions, process control, and essential command-line operations for server environments.",
      credentialLink: "https://www.coursera.org/account/accomplishments/verify/JS8PLJ9R9G6X",
    },
    {
      id: 3,
      title: "IT Support Technical Skills Helpdesk",
      issuer: "Udemy",
      issuedDate: "March 2023",
      image: "/udemy.jpg",
      skills: ["Office 365", "Ticketing System", "Active Directory", "File & Printer Sharing"],
      description:
        "Covers essential IT support skills including user account management, troubleshooting hardware/software issues, working with ticketing systems, and supporting productivity tools such as Office 365 in a helpdesk environment.",
      credentialLink: "https://www.udemy.com/certificate/UC-988d5836-144b-4fab-8fbe-d933fe5d70ac/",
    },
    {
      id: 4,
      title: "Fundamental of Network Engineering",
      issuer: "Course-Net",
      issuedDate: "February 2023",
      image: "/coursenet.png",
      skills: ["Cisco", "Network Design", "TCP/IP", "Routing"],
      description:
        "Covers the foundational knowledge of computer networks including OSI layers, IP addressing, subnetting, routing, switching, and basic Cisco configurations. Prepares learners to understand and design small to medium-sized network topologies.",
      credentialLink: "https://course-net.com/certificate-verifier/1330E0B76-1330DE465-3036A9C/",
    },
    {
      id: 5,
      title: "Basic Mikrotik",
      issuer: "ID Networkers",
      issuedDate: "May 2024",
      image: "/idnid.png",
      skills: ["VLAN", "TCP/IP", "Subnetting", "Firewall", "Routing"],
      description:
        "Validates the skills and knowledge to implement, monitor, and maintain Microsoft Azure solutions, including major services related to compute, storage, network, and security.",
      credentialLink: "https://drive.google.com/file/d/1FPgDPUVeFSVCzy9KpkUOwv12zIX4ydk1/view?usp=drive_link",
    },
  ]

  // Initialize scroll position to start with the first set of certifications
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0; // Start at the beginning
    }
  }, [])

  // Manual scroll with buttons
  const scroll = (direction) => {
    if (sliderRef.current) {
      const { current } = sliderRef
      const scrollAmount = direction === "left" ? -450 : 450
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Mouse drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
    setAutoScrollPaused(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
    }
  }

  // Touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
    setAutoScrollPaused(true)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].clientX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleCertClick = (cert) => {
    setSelectedCert(cert.id === selectedCert ? null : cert.id)
    setAutoScrollPaused(true)
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

      <div className="cert-slider-container">
        <button
          onClick={() => scroll("left")}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-[#252525]/80 hover:bg-amber-900/80 text-amber-400 p-4 rounded-full backdrop-blur-sm transition-all shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft size={28} />
        </button>

        <div
          ref={sliderRef}
          className="cert-slider"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`cert-card snap-start ${selectedCert === cert.id ? "cert-card-active" : ""}`}
              onClick={() => handleCertClick(cert)}
            >
              <div className="h-full w-full overflow-hidden relative group">
                <img
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-white font-bold text-2xl mb-1">{cert.title}</h3>
                  <p className="text-amber-300 text-lg">{cert.issuer}</p>
                  <div className="flex items-center mt-3 text-gray-300 text-base">
                    <Calendar size={18} className="mr-2" />
                    <span>{cert.issuedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-[#252525]/80 hover:bg-amber-900/80 text-amber-400 p-4 rounded-full backdrop-blur-sm transition-all shadow-lg"
          aria-label="Scroll right"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {selectedCertData && (
        <div className="cert-detail animate-[fadeIn_0.3s_ease-out]">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/3">
              <img
                src={selectedCertData.image || "/placeholder.svg"}
                alt={selectedCertData.title}
                className="w-full h-auto rounded-lg border border-gray-700"
              />
            </div>

            <div className="md:w-2/3">
              <h3 className="text-3xl font-bold text-amber-400 mb-3">{selectedCertData.title}</h3>
              <div className="flex items-center mb-6">
                <Award className="text-amber-500 mr-2" size={24} />
                <span className="text-gray-300 text-xl">{selectedCertData.issuer}</span>
                <span className="mx-4 text-gray-600">•</span>
                <Calendar className="text-amber-500 mr-2" size={20} />
                <span className="text-gray-300 text-xl">{selectedCertData.issuedDate}</span>
              </div>

              <p className="text-gray-300 text-xl mb-8">{selectedCertData.description}</p>

              <h4 className="text-amber-500 font-medium mb-4 text-xl flex items-center">
                <Tag className="mr-2" size={20} />
                Skills
              </h4>

              <div className="flex flex-wrap gap-3 mb-8">
                {selectedCertData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-amber-900/20 text-amber-300 rounded-full text-lg border border-amber-700/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={selectedCertData.credentialLink}
                className="inline-flex items-center px-6 py-3 bg-amber-700/20 hover:bg-amber-700/40 text-amber-300 rounded-lg transition-colors text-lg"
              >
                <ExternalLink size={20} className="mr-2" />
                View Certificate
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}