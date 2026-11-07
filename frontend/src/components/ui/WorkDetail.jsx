import Icon from "./Icon"

export default function WorkDetail({ workExperience, activeWork }) {
  const activeWorkData = workExperience.find((work) => work.id === activeWork)

  if (!activeWorkData) return null

  return (
    <div className="card-dark p-[clamp(1.25rem,3vw,1.75rem)] animate-fadeIn mx-auto w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[clamp(26rem,68vh,42rem)] overflow-y-auto custom-scrollbar flex flex-col">
      <div className="mb-4 border-b border-white/10 text-center md:text-left pb-3.5">
        <h3 className="font-bold text-white mb-2.5 text-[clamp(1.1rem,2.5vw,1.3rem)] tracking-tight">
          {activeWorkData.title}
        </h3>

        {/* Badge Container */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
          <span className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/15 font-semibold">
            {activeWorkData.categories}
          </span>
          <span className="bg-[#0B0B0C] text-white/70 px-3 py-1 rounded-full flex items-center border border-white/10 font-medium">
            <Icon name="Calendar" size={11} className="mr-1.5 text-[#C6F432]" />
            {activeWorkData.period}
          </span>
        </div>
      </div>

      {/* Main Description */}
      <p className="text-white/75 mb-5 leading-relaxed animate-on-scroll py-1 text-center md:text-left text-xs sm:text-sm">
        {activeWorkData.fullDescription}
      </p>

      {/* Responsibilities */}
      <div className="mb-5 animate-on-scroll delay-100 flex-1">
        <h5 className="text-white/60 font-bold uppercase tracking-wider mb-3 flex items-center justify-center md:justify-start text-xs">
          <Icon name="CheckCircle2" size={13} className="mr-1.5 text-[#C6F432]" />
          Key Responsibilities
        </h5>
        <div className="grid grid-cols-1 gap-2.5">
          {activeWorkData.jobDesc.map((responsibility, i) => (
            <div
              key={i}
              className="flex items-start bg-[#0B0B0C]/80 rounded-xl p-3 hover:bg-[#0B0B0C] transition-all duration-300 animate-on-scroll border border-white/10 hover:border-white/25 group text-left"
              style={{ transitionDelay: `${150 + i * 40}ms` }}
            >
              <span className="w-1.5 h-1.5 bg-[#C6F432] rounded-full mr-3 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
              <span className="text-white/85 leading-relaxed text-xs sm:text-[13px]">
                {responsibility}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots Section */}
      {activeWorkData.screenshots && activeWorkData.screenshots.length > 0 && (
        <div className="animate-on-scroll delay-200 pt-4 border-t border-white/10 mt-auto">
          <h5 className="text-white/60 font-bold uppercase tracking-wider mb-3 text-center md:text-left text-xs flex items-center justify-center md:justify-start">
            <Icon name="Image" size={13} className="mr-1.5 text-[#C6F432]" />
            Project Snapshots
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeWorkData.screenshots.map((screenshot, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-sm hover:shadow-lg animate-on-scroll group relative bg-[#0B0B0C]"
                style={{ transitionDelay: `${250 + i * 80}ms` }}
              >
                <img
                  src={screenshot || "/placeholder.svg"}
                  alt={`${activeWorkData.title} screenshot ${i + 1}`}
                  className="w-full h-[clamp(8rem,15vw,10rem)] object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
