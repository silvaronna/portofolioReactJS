export default function WorkDetail({ workExperience, activeWork }) {
  const activeWorkData = workExperience.find((work) => work.id === activeWork)

  if (!activeWorkData) return null

  return (
    <div className="bg-[#252525] rounded-2xl p-10 shadow-xl border border-amber-900/20 animate-fadeIn">
      <p className="text-gray-300 text-xl mb-10 leading-relaxed animate-on-scroll">{activeWorkData.fullDescription}</p>

      <div className="mb-10 animate-on-scroll delay-100">
        <h5 className="text-amber-500 font-medium mb-6 text-xl">Responsibilities</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeWorkData.jobDesc.map((responsibility, i) => (
            <div
              key={i}
              className="flex items-start bg-amber-900/10 rounded-lg p-4 hover:bg-amber-900/20 transition-colors animate-on-scroll"
              style={{ transitionDelay: `${200 + i * 50}ms` }}
            >
              <span className="w-3 h-3 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <span className="text-gray-300 text-lg">{responsibility}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-on-scroll delay-200">
        <h5 className="text-amber-500 font-medium mb-6 text-xl">Project Screenshot</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeWorkData.screenshots.map((screenshot, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden border border-gray-700 hover:border-amber-600/50 transition-all shadow-lg hover:shadow-xl animate-on-scroll"
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <img
                src={screenshot || "/placeholder.svg"}
                alt={`${activeWorkData.title} screenshot ${i + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
