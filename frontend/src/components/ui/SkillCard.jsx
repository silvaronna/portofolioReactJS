import Icon from "./Icon"

export default function SkillCard({ skill, index, showTools = false }) {
  return (
    <div
      className={`flex flex-col card-dark p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 gold-shadow animate-on-scroll ${skill.bgClass || ""}`}
      style={{ transitionDelay: `${300 + index * 100}ms` }}
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-900/30 to-amber-700/20 flex items-center justify-center mb-8 text-amber-500 border border-amber-700/30">
        <Icon name={skill.icon} size={42} />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-amber-400">{skill.title}</h3>
      <p className="text-gray-300 text-lg mb-6">{skill.description}</p>

      {showTools && skill.tools && (
        <div className="mt-auto pt-4 flex flex-wrap gap-3">
          {skill.tools.map((tool, i) => (
            <span
              key={i}
              className="text-base bg-amber-900/30 text-amber-300 px-4 py-2 rounded-full border border-amber-700/30"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
