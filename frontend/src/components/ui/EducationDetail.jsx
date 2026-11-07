"use client"

import { motion, AnimatePresence } from "motion/react"
import Icon from "./Icon"

export default function EducationDetail({ education = [], activeTab }) {
  const activeEducationData = education.find((item) => item.id === activeTab)

  if (!activeEducationData) return null

  const isOngoing =
    activeEducationData.period?.includes("2028") ||
    activeEducationData.period?.toLowerCase().includes("present")

  const getTrackType = (degree = "") => {
    const lower = degree.toLowerCase()
    if (lower.includes("bachelor")) return "Undergraduate"
    if (lower.includes("program") || lower.includes("aws")) return "Intensive Track"
    return "Vocational"
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeEducationData.id}
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#121215]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.85)] overflow-hidden w-full max-w-xl mx-auto lg:mx-0"
      >
        {/* Top Subtle Dual-Tone Accent Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-white/25 via-[#C6F432] to-transparent" />

        {/* Header Section */}
        <div className="p-3.5 sm:p-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              {/* Academic Crest Icon Box */}
              <div className="w-10 h-10 rounded-xl bg-[#0B0B0C] border border-white/15 flex items-center justify-center shrink-0 text-[#C6F432] shadow-inner">
                <Icon name="GraduationCap" size={18} />
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {activeEducationData.institution}
                  </h3>

                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                      isOngoing
                        ? "bg-[#C6F432]/10 text-[#C6F432] border-[#C6F432]/30"
                        : "bg-white/5 text-white/65 border-white/15"
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${
                        isOngoing ? "bg-[#C6F432] animate-pulse" : "bg-white/40"
                      }`}
                    />
                    {isOngoing ? "In Progress" : "Graduated"}
                  </span>
                </div>

                {/* Degree & Major */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-[11px]">
                  <span className="font-semibold text-white/90">
                    {activeEducationData.degree}
                  </span>
                  {activeEducationData.field && (
                    <>
                      <span className="hidden sm:inline text-[#C6F432]">•</span>
                      <span className="text-white/60">
                        {activeEducationData.field}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Academic Metadata Strip (Distinct from Work Section) */}
          <div className="grid grid-cols-3 gap-2 mt-3.5">
            <div className="p-2 rounded-xl bg-[#0B0B0C]/80 border border-white/10 text-center sm:text-left">
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block">
                Period
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-0.5 text-[11px] font-semibold text-white/85">
                <Icon name="Calendar" size={10} className="text-[#C6F432] shrink-0" />
                <span className="truncate">{activeEducationData.period}</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-[#0B0B0C]/80 border border-white/10 text-center sm:text-left">
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block">
                Location
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-0.5 text-[11px] font-semibold text-white/85">
                <Icon name="MapPin" size={10} className="text-[#C6F432] shrink-0" />
                <span className="truncate">{activeEducationData.location}</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-[#0B0B0C]/80 border border-white/10 text-center sm:text-left">
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block">
                Track
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-0.5 text-[11px] font-semibold text-white/85">
                <Icon name="Award" size={10} className="text-[#C6F432] shrink-0" />
                <span className="truncate">
                  {getTrackType(activeEducationData.degree)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body Content: Overview + 2-Column Bento Curriculum Grid */}
        <div className="p-3.5 sm:p-4 space-y-4">
          {/* Academic Overview Box */}
          <div className="p-3 rounded-xl bg-[#0B0B0C]/70 border border-white/10 text-left">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
              <Icon name="BookOpen" size={11} className="text-[#C6F432]" />
              <span>Program Overview</span>
            </div>
            <p className="text-white/75 text-[11px] sm:text-xs leading-relaxed">
              {activeEducationData.fullDescription}
            </p>
          </div>

          {/* Core Curriculum Modules (2-Column Bento Grid) */}
          <div>
            <div className="flex items-center justify-between mb-2.5 px-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/70">
                <Icon name="Layers" size={12} className="text-[#C6F432]" />
                <span>Core Curriculum &amp; Modules</span>
              </div>
              <span className="text-[10px] font-mono font-semibold text-white/45 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                {activeEducationData.courses?.length || 0} Subjects
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeEducationData.courses?.map((course, i) => (
                <motion.div
                  key={course}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -2 }}
                  className="group flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#0B0B0C]/85 hover:bg-[#0B0B0C] border border-white/10 hover:border-[#C6F432]/40 transition-all duration-200 text-left"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432] shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-white/80 group-hover:text-white text-[11px] sm:text-xs font-medium leading-snug truncate">
                      {course}
                    </span>
                  </div>

                  <span className="text-[9px] font-mono text-white/30 group-hover:text-[#C6F432] shrink-0 transition-colors">
                    M{String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
