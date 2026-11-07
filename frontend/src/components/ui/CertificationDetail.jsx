"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Icon from "./Icon"

export default function CertificationDetail({ certification, onClose }) {
  useEffect(() => {
    if (!certification) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [certification, onClose])

  return (
    <AnimatePresence>
      {certification && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Credential Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative w-full max-w-2xl bg-[#121215] rounded-2xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden z-10"
          >
            {/* Subtle Top Accent Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C6F432] to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close credential preview"
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-[#C6F432] text-white hover:text-[#0B0B0C] border border-white/10 flex items-center justify-center transition-all duration-300 hover:rotate-90"
            >
              <Icon name="X" size={15} />
            </button>

            <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Left Column: Badge Image Showcase */}
              <div className="w-40 sm:w-48 md:w-1/3 shrink-0 flex flex-col items-center">
                <div className="w-full aspect-square rounded-2xl bg-[#0B0B0C] border border-white/10 p-4 flex items-center justify-center shadow-inner relative group">
                  <img
                    src={certification.image || "/placeholder.svg"}
                    alt={certification.title}
                    className="w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Verify Credential CTA */}
                {certification.credentialLink && (
                  <a
                    href={certification.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C6F432] hover:bg-[#b5e222] text-[#0B0B0C] font-bold text-xs transition-all duration-300 shadow-sm active:scale-95"
                  >
                    <Icon name="ExternalLink" size={13} />
                    <span>Verify Credential</span>
                  </a>
                )}
              </div>

              {/* Right Column: Credential Details */}
              <div className="md:w-2/3 flex flex-col text-center md:text-left">
                {/* Issuer & Date Metadata */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-white border border-white/15 text-xs font-semibold">
                    <Icon name="Award" size={12} className="text-[#C6F432]" />
                    {certification.issuer}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B0B0C] text-white/70 border border-white/10 text-xs font-medium">
                    <Icon name="Calendar" size={12} className="text-white/50" />
                    Issued: {certification.issuedDate}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug mb-3 pr-4 tracking-tight">
                  {certification.title}
                </h3>

                {/* Description */}
                <p className="text-white/75 text-xs leading-relaxed mb-5 md:pl-3.5 md:border-l-2 border-[#C6F432]">
                  {certification.description}
                </p>

                {/* Validated Skills */}
                <div>
                  <h4 className="text-white/50 font-bold mb-2.5 text-[11px] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                    <Icon name="CheckCircle2" size={12} className="text-[#C6F432]" />
                    <span>Skills Validated</span>
                  </h4>

                  <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                    {(certification.skills || []).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-[#0B0B0C] text-white/85 hover:text-white hover:border-white/30 rounded-lg text-[11px] border border-white/10 transition-colors cursor-default font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
