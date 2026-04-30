export default function WorkDetail({ workExperience, activeWork }) {
  const activeWorkData = workExperience.find((work) => work.id === activeWork)

  if (!activeWorkData) return null

  return (
    <div className="bg-[#252525] rounded-xl p-5 md:p-6 shadow-2xl border border-gray-800 animate-fadeIn min-h-[400px]">
      
      <div className="mb-4 border-b border-gray-800 text-center md:text-left">
        <h3 className="text-xl font-bold text-white mb-3">{activeWorkData.title}</h3>
        
        {/* Badge Container: Center di HP, Left di Desktop */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-[13px] mb-4">
          <span className="bg-amber-900/20 text-amber-400 px-3 py-1 rounded-full border border-amber-900/30 font-medium">
            {activeWorkData.categories}
          </span>
          <span className="bg-black/20 text-gray-400 px-3 py-1 rounded-full flex items-center border border-white/5">
            {activeWorkData.period}
          </span>
        </div>
      </div>

      {/* Deskripsi Utama: Center di HP, Left di Desktop */}
      <p className="text-gray-400 text-sm mb-3 leading-relaxed animate-on-scroll py-1 text-center md:text-left">
        {activeWorkData.fullDescription}
      </p>

      <div className="mb-6 animate-on-scroll delay-100">
        <h5 className="text-amber-400 font-semibold mb-3 text-base flex items-center justify-center md:justify-start">
          Key Responsibilities
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeWorkData.jobDesc.map((responsibility, i) => (
            <div
              key={i}
              // Card Job Desc tetap rata kiri isinya agar mudah dibaca, tapi container luarnya responsif
              className="flex items-start bg-black/20 rounded-xl p-3 hover:bg-amber-900/10 transition-colors animate-on-scroll border border-white/5 hover:border-amber-900/30 group text-left"
              style={{ transitionDelay: `${200 + i * 50}ms` }}
            >
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
              <span className="text-gray-300 text-xs leading-relaxed">{responsibility}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots Section */}
      {activeWorkData.screenshots && activeWorkData.screenshots.length > 0 && (
        <div className="animate-on-scroll delay-200 pt-1 border-t border-gray-800">
          <h5 className="text-amber-400 font-semibold mb-2 text-base text-center md:text-left">Project Snapshots</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeWorkData.screenshots.map((screenshot, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-gray-700 hover:border-amber-600/50 transition-all shadow-md hover:shadow-lg animate-on-scroll group relative"
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src={screenshot || "/placeholder.svg"}
                  alt={`${activeWorkData.title} screenshot ${i + 1}`}
                  className="w-full h-40 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
