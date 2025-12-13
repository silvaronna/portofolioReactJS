export default function WorkDetail({ workExperience, activeWork }) {
  const activeWorkData = workExperience.find((work) => work.id === activeWork)

  if (!activeWorkData) return null

  return (
    <div className="bg-[#252525] rounded-xl p-6 md:p-8 shadow-2xl border border-gray-800 animate-fadeIn min-h-[400px]">
      
      <div className="mb-6 border-b border-gray-800 pb-6">
        <h3 className="text-2xl font-bold text-white mb-3">{activeWorkData.title}</h3>
        
        {/* BAGIAN INI TADI BOCOR - SUDAH DIPERBAIKI */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="bg-amber-900/20 text-amber-400 px-4 py-1.5 rounded-full border border-amber-900/30 font-medium">
            {activeWorkData.categories}
          </span>
          <span className="bg-black/20 text-gray-400 px-4 py-1.5 rounded-full flex items-center border border-white/5">
            {activeWorkData.period}
          </span>
        </div>
      </div>

      <p className="text-gray-400 text-base mb-8 leading-relaxed animate-on-scroll py-2">
        {activeWorkData.fullDescription}
      </p>

      <div className="mb-8 animate-on-scroll delay-100">
        <h5 className="text-amber-400 font-semibold mb-4 text-lg flex items-center">
          Key Responsibilities
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeWorkData.jobDesc.map((responsibility, i) => (
            <div
              key={i}
              className="flex items-start bg-black/20 rounded-xl p-4 hover:bg-amber-900/10 transition-colors animate-on-scroll border border-white/5 hover:border-amber-900/30 group"
              style={{ transitionDelay: `${200 + i * 50}ms` }}
            >
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-4 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
              <span className="text-gray-300 text-sm leading-relaxed">{responsibility}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots Section */}
      {activeWorkData.screenshots && activeWorkData.screenshots.length > 0 && (
        <div className="animate-on-scroll delay-200 pt-6 border-t border-gray-800">
          <h5 className="text-amber-400 font-semibold mb-4 text-lg">Project Snapshots</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}