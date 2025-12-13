import Icon from "./Icon"

export default function EducationDetail({ education, activeTab }) {
  const activeEducationData = education.find((item) => item.id === activeTab)

  if (!activeEducationData) return null

  return (
    // REFACTOR: rounded-2xl -> rounded-xl, padding disesuaikan
    <div className="bg-[#252525] rounded-xl p-6 md:p-8 shadow-2xl border border-gray-800 animate-fadeIn min-h-[350px]">
      
      {/* Header Baru: Nama Institusi & Badge Tahun */}
      <div className="mb-6 border-b border-gray-800 pb-6">
        <h3 className="text-2xl font-bold text-white mb-3">{activeEducationData.institution}</h3>
        <div className="flex flex-wrap gap-3">
           {/* REFACTOR: Badge Tahun menggunakan rounded-full */}
           <div className="flex items-center bg-amber-900/20 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium border border-amber-900/30">
              <Icon name="Calendar" size={14} className="mr-2" />
              {activeEducationData.period}
           </div>
        </div>
      </div>

      {/* REFACTOR: text-xl -> text-base text-gray-400 */}
      <p className="text-gray-400 text-base mb-8 leading-relaxed animate-on-scroll">
        {activeEducationData.fullDescription}
      </p>

      <div className="mb-4 animate-on-scroll delay-100">
        <h5 className="text-amber-400 font-semibold mb-4 text-lg flex items-center">
           <Icon name="BookOpen" size={18} className="mr-2" />
           Key Courses
        </h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeEducationData.courses.map((course, i) => (
            <div
              key={i}
              // REFACTOR: List item background rounded-lg -> rounded-xl (Sesuai Request)
              className="flex items-center bg-black/20 rounded-xl p-4 hover:bg-amber-900/10 transition-colors animate-on-scroll border border-white/5 hover:border-amber-900/30 group"
              style={{ transitionDelay: `${200 + i * 50}ms` }}
            >
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
              <span className="text-gray-300 text-sm font-medium leading-snug">{course}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}