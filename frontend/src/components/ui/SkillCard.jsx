import Icon from "./Icon"

export default function SkillCard({ skill, index, showTools = false }) {
  return (
    // Container utama rounded-xl
    <div
      className={`flex flex-col items-center card-dark p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 gold-shadow animate-on-scroll text-center ${skill.bgClass || ""}`}
      style={{ transitionDelay: `${100 + index * 50}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-900/30 to-amber-700/20 flex items-center justify-center mb-4 text-amber-500 border border-amber-700/30 shadow-inner-gold">
        <Icon name={skill.icon} size={24} />
      </div>

      <h3 className="text-base font-bold mb-1.5 text-amber-400 text-center">{skill.title}</h3>
      <p className="text-gray-400 text-xs mb-4 leading-relaxed flex-grow text-center">{skill.description}</p>

      {showTools && skill.tools && (
        <div className="mt-auto pt-3 border-t border-gray-800/50 flex flex-wrap gap-1.5 justify-center">
          {skill.tools.map((tool, i) => (
            <span
              key={i}
              // REFACTOR: rounded-md -> rounded-full. Ukuran font dan padding disesuaikan.
              className="text-[10px] font-medium bg-[#1a1a1a] text-gray-300 px-2 py-1 rounded-full border border-gray-700/50 hover:border-amber-500/50 hover:text-amber-300 transition-colors cursor-default text-center"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}