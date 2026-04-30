import Icon from "./Icon"

export default function EducationDetail({ education, activeTab }) {
  const activeEducationData = education.find((item) => item.id === activeTab)

  if (!activeEducationData) return null

  return (
    <div className="bg-[#252525] rounded-xl p-5 md:p-6 shadow-2xl border border-gray-800 animate-fadeIn min-h-[350px]">
      
      {/* Header Section: Informasi Utama (Center Mobile, Left Desktop) */}
      <div className="mb-1 border-b border-gray-800 pb-5 text-center md:text-left">
        <div className="flex flex-col gap-1.5 mb-3">
            {/* Nama Institusi */}
            <h3 className="text-xl md:text-2xl font-bold text-white">
                {activeEducationData.institution}
            </h3>

            {/* Gelar & Jurusan (Tampil di bawah nama institusi) */}
            <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-1 md:gap-2 text-base font-medium">
                <span className="text-amber-500">{activeEducationData.degree}</span>
                {activeEducationData.field && (
                    <>
                        <span className="hidden md:inline text-gray-600">•</span>
                        <span className="text-gray-300">{activeEducationData.field}</span>
                    </>
                )}
            </div>
        </div>

        {/* Badge Metadata: Periode & Lokasi (Center Mobile) */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
           {/* Badge Periode */}
           <div className="flex items-center bg-amber-900/20 text-amber-400 px-3 py-1 rounded-full text-[13px] font-medium border border-amber-900/30">
              <Icon name="Calendar" size={12} className="mr-1.5" />
              {activeEducationData.period}
           </div>

           {/* Badge Lokasi */}
           {activeEducationData.location && (
               <div className="flex items-center bg-black/20 text-gray-400 px-3 py-1 rounded-full text-[13px] font-medium border border-white/5">
                  <Icon name="MapPin" size={12} className="mr-1.5" />
                  {activeEducationData.location}
               </div>
           )}
        </div>
      </div>

      {/* Deskripsi (Center Mobile) */}
      <p className="text-gray-400 text-sm mb-3 leading-relaxed animate-on-scroll text-center md:text-left">
        {activeEducationData.fullDescription}
      </p>

      {/* Key Courses (Tetap text-left untuk readability, tapi judulnya responsif) */}
      <div className="mb-3 animate-on-scroll delay-100">
        <h5 className="text-amber-400 font-semibold mb-3 text-base flex items-center justify-center md:justify-start">
           <Icon name="BookOpen" size={16} className="mr-2" />
           Key Courses
        </h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeEducationData.courses.map((course, i) => (
            <div
              key={i}
              className="flex items-center bg-black/20 rounded-xl p-3 hover:bg-amber-900/10 transition-colors animate-on-scroll border border-white/5 hover:border-amber-900/30 group text-left"
              style={{ transitionDelay: `${200 + i * 50}ms` }}
            >
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2.5 flex-shrink-0 group-hover:scale-125 transition-transform"></span>
              <span className="text-gray-300 text-xs font-medium leading-snug">{course}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}