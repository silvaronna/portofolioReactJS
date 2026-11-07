import { useRef, useState } from "react"
import Icon from "./Icon"

export default function SkillCard({ skill, index, showTools = false }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col items-center card-dark p-[clamp(1.1rem,2vw,1.5rem)] animate-on-scroll text-center w-full max-w-[16.5rem] mx-auto hover:-translate-y-1.5 transition-all duration-300 overflow-hidden ${
        skill.bgClass || ""
      }`}
      style={{ transitionDelay: `${100 + index * 50}ms` }}
    >
      {/* Subtle Spotlight Cursor Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(198, 244, 50, 0.08), transparent 80%)`,
        }}
      />

      {/* Icon Container */}
      <div className="relative z-10 w-[clamp(2.6rem,4vw,3.1rem)] h-[clamp(2.6rem,4vw,3.1rem)] rounded-xl bg-white/5 flex items-center justify-center mb-[clamp(0.75rem,2vw,1rem)] text-white/85 group-hover:text-[#0B0B0C] group-hover:bg-[#C6F432] border border-white/10 group-hover:border-[#C6F432] shadow-sm transition-all duration-300 group-hover:scale-110">
        <Icon name={skill.icon} size={20} className="scale-90 md:scale-100" />
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
              className="text-[10px] font-medium bg-[#0B0B0C] text-white/80 hover:text-white hover:border-white/30 px-2.5 py-0.5 rounded-full border border-white/10 transition-colors cursor-default text-center"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
