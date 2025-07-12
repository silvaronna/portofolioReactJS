export default function EducationDetail({ education, activeTab }) {
  const activeEducationData = education.find((item) => item.id === activeTab)

  if (!activeEducationData) return null

  return (
    <div className="bg-[#252525] rounded-2xl p-10 shadow-xl border border-amber-900/20 animate-fadeIn">
      <p className="text-gray-300 text-xl mb-10 leading-relaxed animate-on-scroll">
        {activeEducationData.fullDescription}
      </p>

      <div className="mb-10 animate-on-scroll delay-100">
        <h5 className="text-amber-500 font-medium mb-6 text-xl">Key Courses</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeEducationData.courses.map((course, i) => (
            <div
              key={i}
              className="flex items-center bg-amber-900/10 rounded-lg p-4 hover:bg-amber-900/20 transition-colors animate-on-scroll"
              style={{ transitionDelay: `${200 + i * 50}ms` }}
            >
              <span className="w-3 h-3 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-gray-300 text-lg">{course}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
