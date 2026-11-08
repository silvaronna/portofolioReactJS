import { useState } from "react"
import Icon from "./Icon"
import ElectricBorder from "./ElectricBorder"

export default function SkillCard({ skill, index, showTools = false }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="animate-on-scroll w-full max-w-[16.5rem] h-full mx-auto"
      style={{ transitionDelay: `${100 + index * 50}ms` }}
    >
      <ElectricBorder
        color="#C6F432"
        thickness={1.25}
        active={isHovered}
        className="h-full w-full transition-transform duration-300 hover:-translate-y-1"
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative flex flex-col items-center bg-[#121215] rounded-2xl p-[clamp(1.1rem,2vw,1.5rem)] text-center w-full h-full overflow-hidden shadow-[0_10px_28px_-8px_rgba(0,0,0,0.8)]"
        >
          {/* Icon Container */}
          <div className="relative z-10 w-[clamp(2.5rem,4vw,2.9rem)] h-[clamp(2.5rem,4vw,2.9rem)] rounded-xl bg-white/5 flex items-center justify-center mb-3.5 text-white/85 group-hover:text-[#0B0B0C] group-hover:bg-[#C6F432] border border-white/10 group-hover:border-[#C6F432] shadow-sm transition-all duration-300">
            <Icon name={skill.icon} size={18} />
          </div>

          {/* Title */}
          <h3 className="relative z-10 text-xs sm:text-sm font-bold mb-1.5 text-white text-center tracking-tight leading-snug transition-colors">
            {skill.title}
          </h3>

          {/* Description */}
          <p className="relative z-10 text-white/65 text-[11px] sm:text-xs mb-4 leading-relaxed flex-grow text-center">
            {skill.description}
          </p>

          {/* Tools Pills */}
          {showTools && skill.tools && (
            <div className="relative z-10 mt-auto pt-3 border-t border-white/10 flex flex-wrap gap-1.5 justify-center w-full">
              {skill.tools.map((tool, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium bg-[#0B0B0C] text-white/80 group-hover:text-white px-2.5 py-0.5 rounded-full border border-white/10 transition-colors cursor-default text-center"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>
      </ElectricBorder>
    </div>
  )
}
