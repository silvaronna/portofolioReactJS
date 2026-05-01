import Icon from "./Icon"

export default function SkillCard({ skill, index, showTools = false }) {
  return (
    // Container utama
    <div
      className={`flex flex-col items-center card-dark p-[clamp(1rem,2vw,1.5rem)] animate-on-scroll text-center w-full max-w-[16rem] mx-auto hover:shadow-md transition-shadow ${skill.bgClass || ""}`}
      style={{ transitionDelay: `${100 + index * 50}ms` }}
    >
      <div className="w-[clamp(2.5rem,4vw,3rem)] h-[clamp(2.5rem,4vw,3rem)] rounded-xl bg-gradient-to-br from-amber-900/20 to-amber-700/10 flex items-center justify-center mb-[clamp(0.75rem,2vw,1rem)] text-amber-500 border border-amber-700/20 shadow-sm">
        <Icon name={skill.icon} size={20} className="scale-90 md:scale-100" />
      </div>

      <h3 className="text-[clamp(0.85rem,1.5vw,0.95rem)] font-bold mb-[clamp(0.3rem,1vw,0.5rem)] text-amber-400 text-center tracking-tight">{skill.title}</h3>
      <p className="text-gray-400 text-[clamp(0.65rem,1.2vw,0.75rem)] mb-[clamp(0.75rem,2vw,1.25rem)] leading-relaxed flex-grow text-center">{skill.description}</p>

      {showTools && skill.tools && (
        <div className="mt-auto pt-[clamp(0.5rem,1.5vw,0.75rem)] border-t border-white/5 flex flex-wrap gap-[clamp(0.2rem,0.5vw,0.3rem)] justify-center w-full">
          {skill.tools.map((tool, i) => (
            <span
              key={i}
              className="text-[clamp(0.55rem,1vw,0.65rem)] font-medium bg-black/30 text-gray-300 px-[clamp(0.4rem,1vw,0.6rem)] py-[clamp(0.15rem,0.5vw,0.25rem)] rounded-full border border-white/5 transition-colors cursor-default text-center"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}