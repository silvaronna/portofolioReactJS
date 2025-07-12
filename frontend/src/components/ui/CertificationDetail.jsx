import Icon from "./Icon"

export default function CertificationDetail({ certification }) {
  console.log("CertificationDetail rendered with:", certification) // Debug log

  if (!certification) {
    console.log("No certification data provided") // Debug log
    return null
  }

  return (
    <div className="bg-[#252525] rounded-xl p-10 border border-gray-800 animate-[fadeIn_0.3s_ease-out] shadow-xl">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3 animate-on-scroll">
          <img
            src={certification.image || "/placeholder.svg"}
            alt={certification.title}
            className="w-full h-auto rounded-lg border border-gray-700"
          />
        </div>

        <div className="md:w-2/3 animate-on-scroll delay-100">
          <h3 className="text-3xl font-bold text-amber-400 mb-3">{certification.title}</h3>

          <div className="flex items-center mb-6">
            <Icon name="Award" className="text-amber-500 mr-2" size={24} />
            <span className="text-gray-300 text-xl">{certification.issuer}</span>
            <span className="mx-4 text-gray-600">•</span>
            <Icon name="Calendar" className="text-amber-500 mr-2" size={20} />
            <span className="text-gray-300 text-xl">{certification.issuedDate}</span>
          </div>

          <p className="text-gray-300 text-xl mb-8">{certification.description}</p>

          <h4 className="text-amber-500 font-medium mb-4 text-xl flex items-center">
            <Icon name="Tag" className="mr-2" size={20} />
            Skills
          </h4>

          <div className="flex flex-wrap gap-3 mb-8">
            {certification.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-amber-900/20 text-amber-300 rounded-full text-lg border border-amber-700/30 animate-on-scroll"
                style={{ transitionDelay: `${200 + index * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>

          <a
            href={certification.credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-amber-700/20 hover:bg-amber-700/40 text-amber-300 rounded-lg transition-colors text-lg animate-on-scroll delay-300"
          >
            <Icon name="ExternalLink" size={20} className="mr-2" />
            View Certificate
          </a>
        </div>
      </div>
    </div>
  )
}
