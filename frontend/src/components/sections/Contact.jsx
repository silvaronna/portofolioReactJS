"use client"

import { useState, useRef } from "react"
import { useTooltip } from "../../hooks/useTooltip"
import Icon from "../ui/Icon"
import ContactModal from "../ui/ContactModal"
import { socialLinks, techStack } from "../../data"

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [buttonRect, setButtonRect] = useState(null)
  const contactButtonRef = useRef(null)

  const { showTooltip, hideTooltip, Tooltip } = useTooltip()

  const handleOpenModal = () => {
    if (contactButtonRef.current) {
      setButtonRect(contactButtonRef.current.getBoundingClientRect())
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {/* REFACTOR: py-40 -> py-20. Padding dikurangi setengahnya. */}
      <footer id="contact" className="bg-gradient-to-r from-[#0a1525] to-[#3a2000] text-white py-20 md:py-24 px-6 md:px-12">
        {/* REFACTOR: Max width konsisten max-w-7xl */}
        <div className="max-w-7xl mx-auto">
          
          {/* Bagian Atas: Call to Action */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-10">
            <div className="mb-8 md:mb-0 animate-on-scroll">
              {/* Heading: text-6xl -> text-4xl/5xl */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Have something to Build?</h2>
              
              <div className="flex items-center animate-on-scroll delay-100">
                {/* Logo wrapper: w-20 -> w-14 */}
                <div className="w-14 h-14 rounded-full bg-gradient-gold mr-4 overflow-hidden shadow-lg border-2 border-amber-500/30">
                  <img src="/mylogo.png" alt="Azka Abdillah" className="w-full h-full object-cover" />
                </div>
                {/* Subtext: text-4xl -> text-2xl */}
                <p className="text-2xl md:text-3xl font-medium text-gray-200">let's build it together.</p>
              </div>
            </div>

            {/* Button: Padding & Font size dikurangi agar proporsional */}
            <button
              ref={contactButtonRef}
              onClick={handleOpenModal}
              className="px-8 py-4 rounded-full bg-white text-amber-950 font-semibold text-lg hover:bg-amber-50 transition-all duration-300 flex items-center shadow-lg animate-on-scroll delay-200 hover:scale-105 hover:shadow-amber-500/20"
            >
              <Icon name="Mail" className="mr-3" size={20} />
              Reach me out
            </button>
          </div>

          {/* Bagian Bawah: Credits & Stack */}
          <div className="border-t border-amber-900/30 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              
              {/* Tech Stack Section */}
              <div className="animate-on-scroll w-full md:w-auto">
                <p className="text-amber-400/80 text-sm mb-4 italic text-center md:text-left">
                  Designed & Developed by <span className="font-bold text-amber-300">Azka</span> using:
                </p>
                
                <div
                  className="flex flex-wrap items-center justify-center md:justify-start gap-6 px-6 py-4 rounded-2xl transition-all duration-300 border border-white/5"
                  style={{ background: "rgba(30, 30, 30, 0.4)" }}
                >
                  {techStack.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="inline-block animate-on-scroll group cursor-pointer relative"
                      style={{ animationDelay: `${index * 50}ms` }} // Delay dipercepat
                      onMouseEnter={(e) => showTooltip(tech, e.currentTarget)}
                      onMouseLeave={hideTooltip}
                    >
                      {/* Logo size: h-10 -> h-7 */}
                      <img
                        src={tech.logo || "/placeholder.svg"}
                        alt={tech.name}
                        className="h-7 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6 animate-on-scroll delay-300">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-amber-400 transition-colors p-3 hover:bg-white/5 rounded-full"
                  >
                    <Icon name={social.icon} size={24} /> {/* Icon size 28 -> 24 */}
                    <span className="sr-only">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <Tooltip />
      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} buttonRect={buttonRect} />
    </>
  )
}