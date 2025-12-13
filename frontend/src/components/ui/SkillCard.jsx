import Icon from "./Icon"

export default function SkillCard({ skill, index, showTools = false }) {
  return (
    <div
      className={`flex flex-col card-dark p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 gold-shadow animate-on-scroll ${skill.bgClass || ""}`}
      style={{ transitionDelay: `${100 + index * 50}ms` }} // Mempercepat delay animasi
    >
      {/* Icon container diperkecil: w-20 -> w-14 */}
      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-amber-900/30 to-amber-700/20 flex items-center justify-center mb-5 text-amber-500 border border-amber-700/30">
        <Icon name={skill.icon} size={28} /> {/* Icon size 42 -> 28 */}
      </div>

      {/* Title: 2xl -> lg */}
      <h3 className="text-lg font-bold mb-2 text-amber-400">{skill.title}</h3>
      {/* Desc: lg -> sm */}
      <p className="text-gray-400 text-sm mb-5 leading-relaxed">{skill.description}</p>

      {showTools && skill.tools && (
        <div className="mt-auto pt-3 flex flex-wrap gap-2">
          {skill.tools.map((tool, i) => (
            <span
              key={i}
              // Tags diperkecil: text-base -> text-xs
              className="text-xs bg-amber-900/20 text-amber-300/90 px-3 py-1 rounded-md border border-amber-700/20"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}