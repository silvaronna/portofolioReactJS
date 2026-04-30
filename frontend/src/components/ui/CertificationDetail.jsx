import Icon from "./Icon"

export default function CertificationDetail({ certification }) {
  if (!certification) return null

  return (
    <div className="bg-[#252525] rounded-xl p-5 md:p-6 border border-gray-800 shadow-2xl animate-[fadeIn_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Kolom Kiri: Gambar (Center di Mobile) */}
        <div className="md:w-1/3 animate-on-scroll">
          <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg relative group max-w-sm mx-auto md:max-w-none">
             <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img
              src={certification.image || "/placeholder.svg"}
              alt={certification.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Kolom Kanan: Detail (Center di Mobile, Left di Desktop) */}
        <div className="md:w-2/3 animate-on-scroll delay-100 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-3 gap-3 md:gap-0">
            <h3 className="text-xl font-bold text-white leading-tight">{certification.title}</h3>
            
            <a
              href={certification.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-all text-xs font-medium shadow-lg hover:shadow-amber-500/25 transform hover:-translate-y-0.5"
            >
              <Icon name="ExternalLink" size={16} className="mr-2" />
              Verify Credential
            </a>
          </div>

          {/* Metadata Badge (Center di Mobile) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-5 text-[13px]">
            <div className="flex items-center text-amber-400 font-medium bg-amber-900/20 px-3 py-1 rounded-full border border-amber-900/30">
              <Icon name="Award" className="mr-1.5" size={14} />
              <span>{certification.issuer}</span>
            </div>
            <div className="flex items-center text-gray-400 bg-black/20 px-3 py-1 rounded-full border border-white/5">
              <Icon name="Calendar" className="mr-1.5" size={14} />
              <span>Issued: {certification.issuedDate}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6 border-l-0 md:border-l-2 border-amber-500/50 md:pl-3 py-1.5 bg-transparent md:bg-black/10 rounded-r-lg">
            {certification.description}
          </p>

          <div>
            <h4 className="text-gray-400 font-medium mb-2.5 text-[13px] uppercase tracking-wider flex items-center justify-center md:justify-start">
              <Icon name="Tag" className="mr-1.5" size={12} />
              Skills Validated
            </h4>

            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
              {certification.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#1a1a1a] text-gray-300 hover:text-amber-300 rounded-full text-[11px] border border-gray-700 hover:border-amber-500/50 transition-colors cursor-default font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 md:hidden">
             <a
              href={certification.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full justify-center items-center px-5 py-2.5 bg-amber-600 text-white rounded-full font-medium shadow-lg hover:bg-amber-500 transition-all text-sm"
            >
              <Icon name="ExternalLink" size={16} className="mr-2" />
              Verify Credential
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
