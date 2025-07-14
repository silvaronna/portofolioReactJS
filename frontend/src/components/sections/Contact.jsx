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

  // Gunakan hook tooltip kita!
  const { showTooltip, hideTooltip, Tooltip } = useTooltip();

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
      <footer id="contact" className="bg-gradient-to-r from-[#0a1525] to-[#3a2000] text-white py-40 px-12">
        <div className="max-w-[1800px] mx-auto">
          {/* Bagian Atas */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-32 gap-16">
            <div className="mb-8 md:mb-0 animate-on-scroll">
              <h2 className="text-6xl font-bold mb-8">Have something to Build?</h2>
              <div className="flex items-center animate-on-scroll delay-100">
                <div className="w-20 h-20 rounded-full bg-gradient-gold mr-6 overflow-hidden">
                  <img src="/mylogo.png" alt="Azka Abdillah" className="w-full h-full object-cover" />
                </div>
                <p className="text-4xl font-medium">let's build it together.</p>
              </div>
            </div>
            <button
              ref={contactButtonRef}
              onClick={handleOpenModal}
              className="px-12 py-6 rounded-full bg-white text-amber-900 font-medium text-2xl hover:bg-amber-100 transition-all duration-300 flex items-center shadow-lg animate-on-scroll delay-200 hover:scale-105 hover:shadow-xl"
            >
              <Icon name="Mail" className="mr-4" size={28} />
              Reach me out
            </button>
          </div>

          {/* Bagian Bawah */}
          <div className="border-t border-amber-900/50 pt-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="animate-on-scroll">
                <p className="text-amber-300 text-lg mb-6 italic">
                  This Website created and deployed by <span className="font-bold">Azka</span> with:
                </p>
                <div
                  className="flex items-center justify-center gap-8 px-8 py-6 rounded-3xl transition-all duration-300 mt-4"
                  style={{ background: "linear-gradient(135deg, #362217 0%, #1D1B1A 100%)" }}
                >
                  {techStack.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="inline-block animate-on-scroll group cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onMouseEnter={(e) => showTooltip(tech, e.currentTarget)}
                      onMouseLeave={hideTooltip}
                    >
                      <img
                        src={tech.logo || "/placeholder.svg"}
                        alt={tech.name}
                        className="h-10 w-auto object-contain filter brightness-90 hover:brightness-110 transition-all duration-300 ease-out group-hover:scale-125 transform-gpu"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-10 animate-on-scroll delay-400">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-white transition-colors p-4 hover:bg-amber-800/30 rounded-full"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <Icon name={social.icon} size={28} />
                    <span className="sr-only">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Render komponen Tooltip dari hook di sini */}
      <Tooltip />

      {/* Modal Kontak */}
      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} buttonRect={buttonRect} />
    </>
  )
}