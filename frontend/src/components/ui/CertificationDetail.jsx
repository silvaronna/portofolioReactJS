import Icon from "./Icon"

export default function CertificationDetail({ certification }) {
  if (!certification) return null

  return (
    <div className="card-dark p-[clamp(1rem,3vw,1.5rem)] animate-[fadeIn_0.4s_ease-out] max-w-4xl mx-auto mt-4">
      <div className="flex flex-col md:flex-row gap-[clamp(1rem,3vw,1.5rem)]">
        
        {/* Kolom Kiri: Gambar (Center di Mobile) */}
        <div className="md:w-1/3 animate-on-scroll">
          <div className="rounded-xl overflow-hidden border border-white/5 shadow-sm relative group max-w-[14rem] mx-auto md:max-w-none">
             <div className="absolute inset-0 bg-amber-500/5 opacity-0 transition-opacity"></div>
            <img
              src={certification.image || "/placeholder.svg"}
              alt={certification.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Kolom Kanan: Detail (Center di Mobile, Left di Desktop) */}
        <div className="md:w-2/3 animate-on-scroll delay-100 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-[clamp(0.5rem,1.5vw,0.75rem)] gap-2 md:gap-0">
            <h3 className="text-[clamp(1.1rem,2vw,1.25rem)] font-bold text-white leading-tight">{certification.title}</h3>
            
            <a
              href={certification.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.25rem,1vw,0.4rem)] bg-gradient-gold text-black rounded-full transition-all text-[clamp(0.65rem,0.5vw,0.75rem)] font-bold shadow-sm hover:opacity-90"
            >
              <Icon name="ExternalLink" size={12} className="mr-1.5" />
              Verify Credential
            </a>
          </div>

          {/* Metadata Badge (Center di Mobile) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-[clamp(0.3rem,1vw,0.5rem)] mb-[clamp(0.75rem,1.5vw,1rem)] text-[clamp(0.6rem,1.2vw,0.7rem)]">
            <div className="flex items-center text-amber-400 font-medium bg-amber-900/10 px-2 py-[0.15rem] rounded-full border border-amber-500/20">
              <Icon name="Award" className="mr-1" size={12} />
              <span>{certification.issuer}</span>
            </div>
            <div className="flex items-center text-gray-400 bg-black/20 px-2 py-[0.15rem] rounded-full border border-white/5">
              <Icon name="Calendar" className="mr-1" size={12} />
              <span>Issued: {certification.issuedDate}</span>
            </div>
          </div>

          <p className="text-gray-400 text-[clamp(0.75rem,1.5vw,0.85rem)] leading-relaxed mb-[clamp(1rem,2vw,1.25rem)] md:pl-3 md:border-l-[2px] border-white/10 rounded-r-lg">
            {certification.description}
          </p>

          <div>
            <h4 className="text-gray-500 font-medium mb-[clamp(0.3rem,1vw,0.5rem)] text-[clamp(0.6rem,1vw,0.65rem)] uppercase tracking-wider flex items-center justify-center md:justify-start">
              <Icon name="Tag" className="mr-1" size={10} />
              Skills Validated
            </h4>

            <div className="flex flex-wrap gap-[clamp(0.2rem,0.5vw,0.3rem)] justify-center md:justify-start">
              {certification.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-[0.15rem] bg-black/40 text-gray-300 hover:text-amber-300 rounded-full text-[clamp(0.6rem,1vw,0.65rem)] border border-white/5 transition-colors cursor-default font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 md:hidden">
             <a
              href={certification.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full justify-center items-center px-4 py-2 bg-gradient-gold text-black rounded-full font-bold shadow-sm transition-all text-[clamp(0.7rem,1.5vw,0.8rem)]"
            >
              <Icon name="ExternalLink" size={14} className="mr-1.5" />
              Verify Credential
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
