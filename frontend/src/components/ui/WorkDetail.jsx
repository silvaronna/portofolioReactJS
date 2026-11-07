"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Icon from "./Icon"

export default function WorkDetail({ workExperience = [], activeWork }) {
  const [activeTab, setActiveTab] = useState("responsibilities")
  const [selectedSnapshot, setSelectedSnapshot] = useState(null)

  const activeWorkData = workExperience.find((work) => work.id === activeWork)

  useEffect(() => {
    setActiveTab("responsibilities")
  }, [activeWork])

  if (!activeWorkData) return null

  const hasScreenshots =
    Array.isArray(activeWorkData.screenshots) &&
    activeWorkData.screenshots.length > 0

  const isCurrentRole = activeWorkData.period?.toLowerCase().includes("present")

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeWorkData.id}
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#121215]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.85)] overflow-hidden w-full max-w-xl mx-auto lg:mx-0"
        >
          {/* Untitled UI Top Accent Bar */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#C6F432] via-white/15 to-transparent" />

          {/* Compact Card Header */}
          <div className="p-3.5 sm:p-4 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B0B0C] border border-white/15 p-1.5 flex items-center justify-center shrink-0 shadow-inner">
                  <img
                    src={activeWorkData.logo || "/placeholder.svg"}
                    alt={activeWorkData.title}
                    className="w-full h-full object-contain rounded"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {activeWorkData.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                        isCurrentRole
                          ? "bg-[#C6F432]/10 text-[#C6F432] border-[#C6F432]/30"
                          : "bg-white/5 text-white/65 border-white/15"
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${
                          isCurrentRole ? "bg-[#C6F432] animate-pulse" : "bg-white/40"
                        }`}
                      />
                      {isCurrentRole ? "Active Role" : "Completed"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-1 text-[11px] text-white/60">
                    <span className="font-semibold text-white/85 flex items-center gap-1">
                      <Icon name="Briefcase" size={11} className="text-[#C6F432]" />
                      {activeWorkData.categories}
                    </span>
                    <span className="hidden sm:inline text-white/25">•</span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={11} className="text-white/45" />
                      {activeWorkData.period}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Executive Summary Callout Box */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.25 }}
              className="mt-3.5 p-3 rounded-xl bg-[#0B0B0C]/90 border border-white/10 relative overflow-hidden text-left"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C6F432]" />
              <div className="flex items-start gap-2.5 pl-1.5">
                <Icon
                  name="Terminal"
                  size={13}
                  className="text-[#C6F432] mt-0.5 shrink-0"
                />
                <p className="text-white/75 text-[11px] sm:text-xs leading-relaxed">
                  {activeWorkData.fullDescription}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Untitled UI Segmented Tabs Bar */}
          <div className="px-4 sm:px-5 pt-2.5 border-b border-white/10 flex items-center justify-center sm:justify-start bg-[#0B0B0C]/40">
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setActiveTab("responsibilities")}
                className={`pb-2.5 text-[11px] font-semibold transition-colors relative flex items-center gap-1.5 ${
                  activeTab === "responsibilities"
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <Icon
                  name="ListChecks"
                  size={12}
                  className={
                    activeTab === "responsibilities" ? "text-[#C6F432]" : "text-white/40"
                  }
                />
                <span>Key Responsibilities</span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-white/10 text-white/80">
                  {activeWorkData.jobDesc?.length || 0}
                </span>
                {activeTab === "responsibilities" && (
                  <motion.div
                    layoutId="workDetailTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6F432]"
                  />
                )}
              </button>

              {hasScreenshots && (
                <button
                  type="button"
                  onClick={() => setActiveTab("snapshots")}
                  className={`pb-2.5 text-[11px] font-semibold transition-colors relative flex items-center gap-1.5 ${
                    activeTab === "snapshots"
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <Icon
                    name="Image"
                    size={12}
                    className={
                      activeTab === "snapshots" ? "text-[#C6F432]" : "text-white/40"
                    }
                  />
                  <span>Project Snapshots</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-white/10 text-white/80">
                    {activeWorkData.screenshots.length}
                  </span>
                  {activeTab === "snapshots" && (
                    <motion.div
                      layoutId="workDetailTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6F432]"
                    />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Compact Tab Content Body */}
          <div className="p-3.5 sm:p-4 max-h-[17.5rem] overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === "responsibilities" ? (
                <motion.div
                  key="responsibilities"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="relative space-y-2"
                >
                  {activeWorkData.jobDesc.map((responsibility, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      whileHover={{ x: 3 }}
                      className="group flex items-start gap-2.5 p-2.5 rounded-xl bg-[#0B0B0C]/80 hover:bg-[#0B0B0C] border border-white/10 hover:border-white/25 transition-all duration-200 text-left"
                    >
                      {/* Compact Numbered Badge */}
                      <div className="w-5 h-5 rounded-md bg-white/5 group-hover:bg-[#C6F432] border border-white/10 group-hover:border-[#C6F432] flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200">
                        <span className="text-[9px] font-bold text-white/65 group-hover:text-[#0B0B0C] transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 group-hover:text-white text-[11px] sm:text-xs leading-relaxed transition-colors">
                          {responsibility}
                        </p>
                      </div>

                      <Icon
                        name="Check"
                        size={12}
                        className="text-[#C6F432] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="snapshots"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {activeWorkData.screenshots.map((screenshot, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.07, duration: 0.25 }}
                      onClick={() => setSelectedSnapshot(screenshot)}
                      className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-[#C6F432]/60 bg-[#0B0B0C] cursor-pointer shadow-sm"
                    >
                      <img
                        src={screenshot || "/placeholder.svg"}
                        alt={`${activeWorkData.title} snapshot ${i + 1}`}
                        className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-2.5">
                        <span className="text-[10px] font-semibold text-white">
                          Snapshot #{i + 1}
                        </span>
                        <span className="w-6 h-6 rounded-full bg-[#C6F432] text-[#0B0B0C] flex items-center justify-center">
                          <Icon name="Maximize2" size={11} />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Modal if a Snapshot is Clicked */}
      <AnimatePresence>
        {selectedSnapshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSnapshot(null)}
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#121215] border border-white/15 rounded-2xl overflow-hidden p-2 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedSnapshot(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/70 hover:bg-[#C6F432] text-white hover:text-[#0B0B0C] flex items-center justify-center border border-white/15 transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
              <img
                src={selectedSnapshot}
                alt="Snapshot preview"
                className="w-full max-h-[78vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
