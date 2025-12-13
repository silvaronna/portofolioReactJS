import Icon from "./Icon"

export default function CertificationDetail({ certification }) {
  if (!certification) return null

  return (
    <div className="bg-[#252525] rounded-xl p-6 md:p-8 border border-gray-800 shadow-2xl animate-[fadeIn_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Kolom Kiri: Gambar */}
        <div className="md:w-1/3 animate-on-scroll">
          <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg relative group"> {/* Ensure container is also rounded-xl */}
             <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img
              src={certification.image || "/placeholder.svg"}
              alt={certification.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Kolom Kanan: Detail */}
        <div className="md:w-2/3 animate-on-scroll delay-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-white leading-tight">{certification.title}</h3>
            
            {/* REFACTOR: Tombol Desktop rounded-lg -> rounded-full */}
            <a
              href={certification.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-all text-sm font-medium shadow-lg hover:shadow-amber-500/25 transform hover:-translate-y-0.5"
            >
              <Icon name="ExternalLink" size={18} className="mr-2" />
              Verify Credential
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            {/* Issuer Badge: Consistently rounded-full */}
            <div className="flex items-center text-amber-400 font-medium bg-amber-900/20 px-4 py-1.5 rounded-full border border-amber-900/30">
              <Icon name="Award" className="mr-2" size={16} />
              <span>{certification.issuer}</span>
            </div>
            <div className="flex items-center text-gray-400 bg-black/20 px-4 py-1.5 rounded-full">
              <Icon name="Calendar" className="mr-2" size={16} />
              <span>Issued: {certification.issuedDate}</span>
            </div>
          </div>

          <p className="text-gray-300 text-base leading-relaxed mb-8 border-l-2 border-amber-500/50 pl-4 py-2 bg-black/10 rounded-r-lg">
            {certification.description}
          </p>

          <div>
            <h4 className="text-gray-400 font-medium mb-3 text-sm uppercase tracking-wider flex items-center">
              <Icon name="Tag" className="mr-2" size={14} />
              Skills Validated
            </h4>

            <div className="flex flex-wrap gap-2">
              {certification.skills.map((skill, index) => (
                <span
                  key={index}
                  // REFACTOR: Badge Skills rounded-md -> rounded-full
                  className="px-4 py-1.5 bg-[#1a1a1a] text-gray-300 hover:text-amber-300 rounded-full text-xs border border-gray-700 hover:border-amber-500/50 transition-colors cursor-default font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* REFACTOR: Tombol Mobile rounded-lg -> rounded-full */}
          <div className="mt-8 md:hidden">
             <a
              href={certification.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full justify-center items-center px-6 py-3 bg-amber-600 text-white rounded-full font-medium shadow-lg hover:bg-amber-500 transition-all"
            >
              <Icon name="ExternalLink" size={18} className="mr-2" />
              Verify Credential
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}