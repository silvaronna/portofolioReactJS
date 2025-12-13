import Icon from "./Icon"

export default function SkillCard({ skill, index, showTools = false }) {
  return (
    // Container utama rounded-xl
    <div
      className={`flex flex-col card-dark p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 gold-shadow animate-on-scroll ${skill.bgClass || ""}`}
      style={{ transitionDelay: `${100 + index * 50}ms` }}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-900/30 to-amber-700/20 flex items-center justify-center mb-5 text-amber-500 border border-amber-700/30 shadow-inner-gold">
        <Icon name={skill.icon} size={28} />
      </div>

      <h3 className="text-lg font-bold mb-2 text-amber-400">{skill.title}</h3>
      <p className="text-gray-400 text-sm mb-5 leading-relaxed flex-grow">{skill.description}</p>

      {showTools && skill.tools && (
        <div className="mt-auto pt-4 border-t border-gray-800/50 flex flex-wrap gap-2">
          {skill.tools.map((tool, i) => (
            <span
              key={i}
              // REFACTOR: rounded-md -> rounded-full. Ukuran font dan padding disesuaikan.
              className="text-xs font-medium bg-[#1a1a1a] text-gray-300 px-3 py-1.5 rounded-full border border-gray-700/50 hover:border-amber-500/50 hover:text-amber-300 transition-colors cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}