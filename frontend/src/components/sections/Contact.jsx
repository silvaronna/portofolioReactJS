"use client"

import { useState, useRef } from "react"
import Icon from "../ui/Icon"
import ContactModal from "../ui/ContactModal"
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
        className="bg-[#0B0B0C] border-t border-white/10 text-white py-14 md:py-20 px-6 md:px-12 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Top Section: Call to Action */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 text-center md:text-left bg-[#121215] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_14px_40px_-10px_rgba(0,0,0,0.8)]">
            <div className="animate-on-scroll">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
                Have something to Build<span className="text-[#C6F432]">?</span>
              </h2>

              <div className="flex items-center justify-center md:justify-start animate-on-scroll delay-100">
                <div className="w-8 h-8 rounded-full bg-white mr-3 overflow-hidden shadow-sm border border-white/20 shrink-0">
                  <img
                    src="/mylogo.png"
                    alt="Azka Abdillah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm md:text-base font-medium text-white/65">
                  let&apos;s build it together.
                </p>
              </div>
            </div>

            <button
              ref={contactButtonRef}
              onClick={handleOpenModal}
              className="px-6 py-3 rounded-full bg-[#C6F432] hover:bg-[#b5e222] text-[#0B0B0C] font-bold text-sm transition-all duration-300 flex items-center shadow-[0_8px_25px_-6px_rgba(198,244,50,0.35)] animate-on-scroll delay-200 hover:scale-105 active:scale-95 mx-auto md:mx-0"
            >
              <Icon name="Mail" className="mr-2" size={16} />
              Reach me out
            </button>
          </div>

          {/* Bottom Section: Social Links */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/45 text-xs">
              © {new Date().getFullYear()} Azka Abdillah. All rights reserved.
            </p>

            <div className="flex space-x-3 animate-on-scroll delay-300">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/65 hover:text-[#0B0B0C] hover:bg-[#C6F432] border border-white/10 hover:border-[#C6F432] transition-all duration-300 p-2.5 bg-[#121215] rounded-full shadow-sm hover:-translate-y-0.5"
                >
                  <Icon name={social.icon} size={17} />
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
