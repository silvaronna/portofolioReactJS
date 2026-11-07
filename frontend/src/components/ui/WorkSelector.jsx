"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import Icon from "./Icon"

export default function WorkSelector({
  workExperience = [],
  activeWork,
  onWorkSelect,
}) {
  const [swappingId, setSwappingId] = useState(null)

  const total = workExperience.length
  const activeIndex = Math.max(
    0,
    workExperience.findIndex((w) => w.id === activeWork)
  )

  const triggerSwap = useCallback(
    (nextWorkId) => {
      if (nextWorkId === activeWork || total <= 1) return
      setSwappingId(activeWork)
      setTimeout(() => {
        onWorkSelect(nextWorkId)
        setSwappingId(null)
      }, 200)
    },
    [activeWork, onWorkSelect, total]
  )

  const handleSwapNext = useCallback(() => {
    if (total <= 1) return
    const nextIndex = (activeIndex + 1) % total
    triggerSwap(workExperience[nextIndex].id)
  }, [activeIndex, total, triggerSwap, workExperience])

  const orderedCards = workExperience.map((work, idx) => {
    const stackOrder = (idx - activeIndex + total) % total
    return { work, stackOrder }
  })

  return (
    <div className="flex flex-col items-center lg:items-start w-full select-none">
      {/* Top Status & Swap Hint Bar */}
      <div className="w-full max-w-[300px] sm:max-w-[315px] flex items-center justify-between mb-2.5 px-1">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432]" />
          <span>Role Stack ({activeIndex + 1}/{total})</span>
        </div>

        <button
          type="button"
          onClick={handleSwapNext}
          className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/75 hover:text-[#C6F432] bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-full transition-all duration-200 active:scale-95"
        >
          <Icon name="Layers" size={10} className="text-[#C6F432]" />
          <span>Swap Card</span>
        </button>
      </div>

      {/* 3D Card Swap Stage */}
      <div className="relative w-full max-w-[300px] sm:max-w-[315px] h-[210px] sm:h-[220px] flex items-center justify-center [perspective:1000px] my-1">
        <AnimatePresence initial={false}>
          {orderedCards.map(({ work, stackOrder }) => {
            const isFront = stackOrder === 0
            const isBeingSwappedOut = swappingId === work.id

            const xOffset = isBeingSwappedOut ? 34 : stackOrder * 12
            const yOffset = isBeingSwappedOut ? 70 : stackOrder * -14
            const scale = isBeingSwappedOut ? 0.88 : 1 - stackOrder * 0.055
            const rotateZ = isBeingSwappedOut ? 6 : stackOrder * 2.5
            const rotateX = isBeingSwappedOut ? -10 : stackOrder * 3
            const zIndex = isBeingSwappedOut ? 5 : 30 - stackOrder * 10
            const opacity = isBeingSwappedOut ? 0.2 : 1 - stackOrder * 0.25

            return (
              <motion.div
                key={work.id}
                layout
                initial={false}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  scale,
                  rotateZ,
                  rotateX,
                  zIndex,
                  opacity,
                }}
                whileHover={
                  isFront
                    ? { y: yOffset - 3, scale: 1.01 }
                    : { y: yOffset - 6, x: xOffset + 3 }
                }
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  mass: 0.85,
                }}
                onClick={() => {
                  if (isFront) handleSwapNext()
                  else triggerSwap(work.id)
                }}
                style={{ transformStyle: "preserve-3d" }}
                className={`absolute inset-x-0 mx-auto w-[92%] sm:w-[295px] h-[182px] sm:h-[188px] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between cursor-pointer transition-colors duration-300 ${
                  isFront
                    ? "bg-[#121215] border border-[#C6F432]/60 shadow-[0_18px_38px_-10px_rgba(0,0,0,0.95),0_0_16px_rgba(198,244,50,0.07)]"
                    : "bg-[#16161A] border border-white/10 hover:border-white/25 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* Top Card Header: Company Logo + Full Company Name + Status Pill */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0 flex-1">
                    <div
                      className={`w-9 h-9 rounded-lg p-1.5 flex items-center justify-center shrink-0 border ${
                        isFront
                          ? "bg-[#0B0B0C] border-white/20 shadow-inner"
                          : "bg-[#0B0B0C]/70 border-white/10"
                      }`}
                    >
                      <img
                        src={work.logo || "/placeholder.svg"}
                        alt={work.title}
                        className="w-full h-full object-contain rounded"
                      />
                    </div>

                    <div className="min-w-0 flex-1 text-left">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-white/45 block leading-none mb-1">
                        Organization
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-white leading-snug break-words">
                        {work.title}
                      </h3>
                    </div>
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 border ${
                      isFront
                        ? "bg-[#C6F432]/15 text-[#C6F432] border-[#C6F432]/40"
                        : "bg-white/5 text-white/45 border-white/10"
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${
                        isFront ? "bg-[#C6F432]" : "bg-white/35"
                      }`}
                    />
                    {isFront ? "Active" : "Queue"}
                  </span>
                </div>

                {/* Middle Role & Brief Summary */}
                <div className="my-auto py-1 text-left">
                  <div className="text-xs font-semibold text-[#C6F432] mb-0.5">
                    {work.categories}
                  </div>
                  <p className="text-white/60 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                    {work.description}
                  </p>
                </div>

                {/* Bottom Card Footer: Period & Swap Prompt */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <div className="flex items-center text-white/55 font-medium">
                    <Icon name="Calendar" size={11} className="mr-1 text-[#C6F432]" />
                    <span>{work.period}</span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-white/70 font-semibold group">
                    <span>{isFront ? "Swap" : "Select"}</span>
                    <Icon
                      name="ArrowUpRight"
                      size={11}
                      className="text-[#C6F432] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Full Company Name Switcher List Below Deck */}
      <div className="w-full max-w-[300px] sm:max-w-[315px] flex flex-col gap-1.5 mt-2">
        {workExperience.map((work) => {
          const isActive = work.id === activeWork
          return (
            <button
              key={work.id}
              type="button"
              onClick={() => triggerSwap(work.id)}
              className={`w-full py-2 px-3 rounded-xl text-left transition-all duration-200 flex items-center justify-between gap-2.5 border ${
                isActive
                  ? "bg-white/10 text-white border-[#C6F432]/60 shadow-sm"
                  : "bg-[#121215]/60 text-white/55 border-white/10 hover:text-white hover:border-white/25"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isActive ? "bg-[#C6F432]" : "bg-white/25"
                  }`}
                />
                <span className="text-xs font-semibold leading-tight">
                  {work.title}
                </span>
              </div>

              <span className="text-[10px] text-white/45 font-medium shrink-0">
                {work.categories}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
