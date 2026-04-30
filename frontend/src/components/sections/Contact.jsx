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
      <footer id="contact" className="bg-gradient-to-r from-[#0a1525] to-[#3a2000] text-white py-20 md:py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Bagian Atas: Call to Action */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 text-center md:text-left">
            <div className="mb-6 md:mb-0 animate-on-scroll">
              <h2 className="text-xl md:text-3xl font-bold text-amber-400 mb-4 tracking-tight">Have something to Build?</h2>
              
              <div className="flex items-center animate-on-scroll delay-100">
                <div className="w-10 h-10 rounded-full bg-gradient-gold mr-3 overflow-hidden shadow-lg border border-amber-500/30">
                  <img src="/mylogo.png" alt="Azka Abdillah" className="w-full h-full object-cover" />
                </div>
                <p className="text-lg md:text-xl font-medium text-gray-200">let's build it together.</p>
              </div>
            </div>

            <button
              ref={contactButtonRef}
              onClick={handleOpenModal}
              className="px-6 py-3 rounded-full bg-white text-amber-950 font-semibold text-base hover:bg-amber-50 transition-all duration-300 flex items-center shadow-lg animate-on-scroll delay-200 hover:scale-105 hover:shadow-amber-500/20"
            >
              <Icon name="Mail" className="mr-2" size={18} />
              Reach me out
            </button>
          </div>

          {/* Bagian Bawah: Credits & Stack */}
          <div className="border-t border-amber-900/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Tech Stack Section */}
              <div className="animate-on-scroll w-full md:w-auto">
                <p className="text-amber-400/80 text-xs mb-3 italic text-center md:text-left">
                  Designed & Developed by <span className="font-bold text-amber-300">Azka</span> using:
                </p>
                
                <div
                  className="flex flex-wrap items-center justify-center md:justify-start gap-4 px-5 py-3 rounded-2xl transition-all duration-300 border border-white/5"
                  style={{ background: "rgba(30, 30, 30, 0.4)" }}
                >
                  {techStack.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="inline-block animate-on-scroll group cursor-pointer relative"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onMouseEnter={(e) => showTooltip(tech, e.currentTarget)}
                      onMouseLeave={hideTooltip}
                    >
                      <img
                        src={tech.logo || "/placeholder.svg"}
                        alt={tech.name}
                        className="h-5 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 animate-on-scroll delay-300">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-amber-400 transition-colors p-2.5 hover:bg-white/5 rounded-full"
                  >
                    <Icon name={social.icon} size={20} />
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
