import Icon from "./Icon"

export default function EducationDetail({ education, activeTab }) {
  const activeEducationData = education.find((item) => item.id === activeTab)

  if (!activeEducationData) return null

  return (
    <div className="card-dark p-[clamp(1.25rem,3vw,1.75rem)] shadow-lg animate-fadeIn w-full mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[clamp(25rem,65vh,40rem)] overflow-y-auto custom-scrollbar flex flex-col">
      {/* Header Section */}
      <div className="mb-4 border-b border-white/10 pb-3.5 text-center md:text-left">
        <div className="flex flex-col gap-1.5 mb-3">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            {activeEducationData.institution}
          </h3>

          <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-1 md:gap-2 text-xs font-medium">
            <span className="text-white font-semibold">{activeEducationData.degree}</span>
            {activeEducationData.field && (
              <>
                <span className="hidden md:inline text-[#C6F432]">•</span>
                <span className="text-white/65">{activeEducationData.field}</span>
              </>
            )}
          </div>
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <div className="flex items-center bg-white/5 text-white px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/15">
            <Icon name="Calendar" size={11} className="mr-1.5 text-[#C6F432]" />
            {activeEducationData.period}
          </div>

          {activeEducationData.location && (
            <div className="flex items-center bg-[#0B0B0C] text-white/70 px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/10">
              <Icon name="MapPin" size={11} className="mr-1.5 text-[#C6F432]" />
              {activeEducationData.location}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-white/75 text-xs mb-5 leading-relaxed animate-on-scroll text-center md:text-left">
        {activeEducationData.fullDescription}
      </p>

      {/* Key Courses */}
      <div className="mb-2 animate-on-scroll delay-100 flex-1">
        <h5 className="text-white/60 font-bold uppercase tracking-wider mb-3 text-xs flex items-center justify-center md:justify-start">
          <Icon name="BookOpen" size={13} className="mr-1.5 text-[#C6F432]" />
          Key Courses
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {activeEducationData.courses.map((course, i) => (
            <div
              key={i}
              className="flex items-center bg-[#0B0B0C]/80 hover:bg-[#0B0B0C] rounded-xl p-2.5 transition-all duration-300 animate-on-scroll border border-white/10 hover:border-white/25 group text-left"
              style={{ transitionDelay: `${150 + i * 40}ms` }}
            >
              <span className="w-1.5 h-1.5 bg-[#C6F432] rounded-full mr-2.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
              <span className="text-white/85 text-xs font-medium leading-snug">
                {course}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
