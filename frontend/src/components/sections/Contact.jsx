"use client"

import { useState, useRef } from "react"
import Icon from "../ui/Icon"
import ContactModal from "../ui/ContactModal"
import Cubes from "../ui/Cubes"
import { socialLinks } from "../../data"

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [buttonRect, setButtonRect] = useState(null)
  const contactButtonRef = useRef(null)

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
      <footer
        id="contact"
        className="bg-[#0B0B0C] border-t border-white/10 text-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden"
      >
        {/* Full-Section Interactive React Bits Cubes Background */}
        <Cubes
          cols={12}
          rows={4}
          maxAngle={26}
          radius={3}
          faceColor="#0E0E11"
          borderStyle="1px solid rgba(255, 255, 255, 0.06)"
          rippleColor="rgba(198, 244, 50, 0.2)"
          autoAnimate={true}
          rippleOnClick={true}
        />

        {/* Soft Radial Vignette Overlay to Ensure Crisp Readability */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#0B0B0C]/65 via-[#0B0B0C]/45 to-[#0B0B0C]/80"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Top Section: Open Call to Action (Without enclosing box) */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center md:text-left">
            <div className="animate-on-scroll">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2.5 tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Have something to Build<span className="text-[#C6F432]">?</span>
              </h2>

              <div className="flex items-center justify-center md:justify-start animate-on-scroll delay-100">
                <div className="w-8 h-8 rounded-full bg-white mr-3 overflow-hidden shadow-md border border-white/25 shrink-0">
                  <img
                    src="/mylogo.png"
                    alt="Azka Abdillah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs md:text-sm font-medium text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  let&apos;s build it together.
                </p>
              </div>
            </div>

            <button
              ref={contactButtonRef}
              onClick={handleOpenModal}
              className="px-5 py-2.5 rounded-full bg-[#C6F432] hover:bg-[#b5e222] text-[#0B0B0C] font-bold text-xs sm:text-sm transition-all duration-300 flex items-center shadow-[0_8px_25px_-6px_rgba(198,244,50,0.4)] animate-on-scroll delay-200 hover:scale-105 active:scale-95 mx-auto md:mx-0"
            >
              <Icon name="Mail" className="mr-2" size={15} />
              Reach me out
            </button>
          </div>

          {/* Bottom Section: Copyright & Social Links */}
          <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-xs font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
              © {new Date().getFullYear()} Azka. All rights reserved.
            </p>

            <div className="flex space-x-3 animate-on-scroll delay-300">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/75 hover:text-[#0B0B0C] hover:bg-[#C6F432] border border-white/15 hover:border-[#C6F432] transition-all duration-300 p-2.5 bg-[#121215]/90 backdrop-blur-sm rounded-full shadow-md hover:-translate-y-0.5"
                >
                  <Icon name={social.icon} size={16} />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        buttonRect={buttonRect}
      />
    </>
  )
}
