"use client"

import { useState } from "react"
import Icon from "../ui/Icon"
import ContactModal from "../ui/ContactModal"
import { socialLinks } from "../../data"

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <footer id="contact" className="bg-gradient-to-r from-[#0a1525] to-[#3a2000] text-white py-40 px-12">
        <div className="max-w-[1800px] mx-auto">
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
              onClick={handleOpenModal}
              className="px-12 py-6 rounded-full bg-white text-amber-900 font-medium text-2xl hover:bg-amber-100 transition-all duration-300 flex items-center shadow-lg animate-on-scroll delay-200 hover:scale-105 hover:shadow-xl"
            >
              <Icon name="Mail" className="mr-4" size={28} />
              Reach me out
            </button>
          </div>

          <div className="border-t border-amber-900/50 pt-16 flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-300 mb-10 md:mb-0 text-xl animate-on-scroll delay-300">
              Built with spirit by Azka Abdillah
            </p>

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
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
