"use client"

import { motion } from "motion/react"
import Icon from "./Icon"

export default function EducationSelector({
  education = [],
  activeTab,
  onTabSelect,
}) {
  const total = education.length
  const activeIndex = Math.max(
    0,
    education.findIndex((item) => item.id === activeTab)
  )

  const handleStep = (direction) => {
    if (total <= 1) return
    const nextIndex = (activeIndex + direction + total) % total
    onTabSelect(education[nextIndex].id)
  }

  return (
    <div className="w-full max-w-[330px] mx-auto lg:mx-0 select-none">
      {/* Top Track Status & Step Controls */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
          <span>
            Academic Path ({String(activeIndex + 1).padStart(2, "0")}/
            {String(total).padStart(2, "0")})
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleStep(-1)}
            aria-label="Previous education"
            className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#C6F432] transition-colors active:scale-95"
          >
            <Icon name="ChevronUp" size={12} />
          </button>
          <button
            type="button"
            onClick={() => handleStep(1)}
            aria-label="Next education"
            className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#C6F432] transition-colors active:scale-95"
          >
            <Icon name="ChevronDown" size={12} />
          </button>
        </div>
      </div>

      {/* Vertical Connected Stepper Timeline */}
      <div className="relative pl-5 space-y-2.5">
        {/* Continuous Vertical Timeline Line */}
        <div className="absolute left-[7px] top-4 bottom-4 w-[1.5px] bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

        {education.map((item, idx) => {
          const isActive = activeTab === item.id
          const isOngoing =
            item.period?.includes("2028") ||
            item.period?.toLowerCase().includes("present")

          return (
            <div key={item.id} className="relative">
              {/* Timeline Node Marker */}
              <div className="absolute -left-5 top-5 flex items-center justify-center w-4 h-4">
                <span
                  className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "bg-[#C6F432] border-[#C6F432] scale-110 shadow-[0_0_10px_rgba(198,244,50,0.65)]"
                      : "bg-[#0B0B0C] border-white/30"
                  }`}
                />
                {isActive && (
                  <motion.span
                    layoutId="eduTimelineRing"
                    className="absolute inset-0 rounded-full border border-[#C6F432]/50"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </div>

              {/* Interactive Milestone Card */}
              <motion.button
                type="button"
                onClick={() => onTabSelect(item.id)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.99 }}
                className={`relative w-full text-left p-3.5 rounded-xl border transition-all duration-300 overflow-hidden group ${
                  isActive
                    ? "bg-[#121215] border-[#C6F432]/60 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.9),0_0_14px_rgba(198,244,50,0.06)]"
                    : "bg-[#121215]/50 hover:bg-[#121215]/90 border-white/10 hover:border-white/25"
                }`}
              >
                {/* Active Left Accent Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="eduActiveBar"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C6F432]"
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  />
                )}

                {/* Top Row: Icon, Institution & Degree on Left + Period Pill on Right */}
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors mt-0.5 ${
                        isActive
                          ? "bg-[#C6F432] text-[#0B0B0C] border-[#C6F432]"
                          : "bg-[#0B0B0C] text-white/65 border-white/10 group-hover:border-white/25 group-hover:text-white"
                      }`}
                    >
                      <Icon name="GraduationCap" size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-xs sm:text-sm font-bold leading-snug transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-white/75 group-hover:text-white"
                        }`}
                      >
                        {item.institution}
                      </h3>
                      <p className="text-[11px] font-medium text-white/55 truncate mt-0.5">
                        {item.degree}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium shrink-0 border mt-0.5 ${
                      isActive
                        ? "bg-white/10 text-white border-white/20"
                        : "bg-[#0B0B0C]/60 text-white/50 border-white/10"
                    }`}
                  >
                    <Icon
                      name="Calendar"
                      size={9}
                      className={isActive ? "text-[#C6F432]" : "text-white/40"}
                    />
                    {item.period}
                  </span>
                </div>

                {/* Bottom Footer: Field & Ongoing Status */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-white/45 truncate max-w-[180px]">
                    {item.field}
                  </span>
                  <span
                    className={`font-semibold flex items-center gap-1 shrink-0 ${
                      isActive
                        ? "text-[#C6F432]"
                        : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    <span>{isOngoing ? "Current" : "Completed"}</span>
                    <Icon name="ArrowUpRight" size={10} />
                  </span>
                </div>
              </motion.button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
