export default function WorkDetail({ workExperience, activeWork }) {
  const activeWorkData = workExperience.find((work) => work.id === activeWork)

  if (!activeWorkData) return null

  return (
    <div className="card-dark p-[clamp(1rem,3vw,1.5rem)] animate-fadeIn mx-auto w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[clamp(25rem,65vh,40rem)] overflow-y-auto custom-scrollbar flex flex-col">
      
      <div className="mb-[clamp(0.75rem,2vw,1rem)] border-b border-white/5 text-center md:text-left pb-[clamp(0.5rem,1.5vw,0.75rem)]">
        <h3 className="font-bold text-white mb-[clamp(0.5rem,1.5vw,0.75rem)] text-[clamp(1.1rem,2.5vw,1.25rem)] tracking-tight">{activeWorkData.title}</h3>
        
        {/* Badge Container: Center di HP, Left di Desktop */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-[clamp(0.35rem,1vw,0.5rem)] text-[clamp(0.65rem,1.5vw,0.75rem)] mb-[clamp(0.3rem,1vw,0.5rem)]">
          <span className="bg-amber-900/10 text-amber-400 px-[clamp(0.6rem,1.5vw,0.75rem)] py-[clamp(0.15rem,0.5vw,0.25rem)] rounded-full border border-amber-900/20 font-medium">
            {activeWorkData.categories}
          </span>
          <span className="bg-black/20 text-gray-400 px-[clamp(0.6rem,1.5vw,0.75rem)] py-[clamp(0.15rem,0.5vw,0.25rem)] rounded-full flex items-center border border-white/5">
            {activeWorkData.period}
          </span>
        </div>
      </div>

      {/* Deskripsi Utama: Center di HP, Left di Desktop */}
      <p className="text-gray-400 mb-[clamp(1rem,3vw,1.25rem)] leading-relaxed animate-on-scroll py-1 text-center md:text-left text-[clamp(0.75rem,1.5vw,0.85rem)]">
        {activeWorkData.fullDescription}
      </p>

      <div className="mb-[clamp(1.25rem,3vw,1.5rem)] animate-on-scroll delay-100 flex-1">
        <h5 className="text-amber-400/90 font-semibold mb-[clamp(0.6rem,2vw,0.85rem)] flex items-center justify-center md:justify-start text-[clamp(0.85rem,2vw,0.95rem)]">
          Key Responsibilities
        </h5>
        <div className="grid grid-cols-1 gap-[clamp(0.4rem,1.5vw,0.6rem)]">
          {activeWorkData.jobDesc.map((responsibility, i) => (
            <div
              key={i}
              // Card Job Desc tetap rata kiri isinya agar mudah dibaca, tapi container luarnya responsif
              className="flex items-start bg-black/20 rounded-xl p-[clamp(0.6rem,1.5vw,0.85rem)] hover:bg-amber-900/10 transition-colors animate-on-scroll border border-white/5 hover:border-amber-900/20 group text-left"
              style={{ transitionDelay: `${200 + i * 50}ms` }}
            >
              <span className="w-1.5 h-1.5 bg-amber-500/80 rounded-full mr-[clamp(0.5rem,1.5vw,0.75rem)] mt-1.5 flex-shrink-0 transition-transform"></span>
              <span className="text-gray-300 leading-relaxed text-[clamp(0.7rem,1.5vw,0.8rem)]">{responsibility}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots Section */}
      {activeWorkData.screenshots && activeWorkData.screenshots.length > 0 && (
        <div className="animate-on-scroll delay-200 pt-[clamp(0.75rem,2vw,1rem)] border-t border-white/5 mt-auto">
          <h5 className="text-amber-400/90 font-semibold mb-[clamp(0.6rem,2vw,0.85rem)] text-center md:text-left text-[clamp(0.85rem,2vw,0.95rem)]">Project Snapshots</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.5rem,1.5vw,0.75rem)]">
            {activeWorkData.screenshots.map((screenshot, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-white/5 hover:border-amber-600/30 transition-all shadow-sm hover:shadow-md animate-on-scroll group relative"
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src={screenshot || "/placeholder.svg"}
                  alt={`${activeWorkData.title} screenshot ${i + 1}`}
                  className="w-full h-[clamp(8rem,15vw,10rem)] object-cover transform transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
