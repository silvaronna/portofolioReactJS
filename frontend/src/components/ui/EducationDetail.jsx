import Icon from "./Icon"

export default function EducationDetail({ education, activeTab }) {
  const activeEducationData = education.find((item) => item.id === activeTab)

  if (!activeEducationData) return null

  return (
    <div className="bg-[#252525] rounded-xl p-6 md:p-8 shadow-2xl border border-gray-800 animate-fadeIn min-h-[350px]">
      
      {/* Header Section: Informasi Utama */}
      <div className="mb-6 border-b border-gray-800 pb-6">
        <div className="flex flex-col gap-2 mb-4">
            {/* Nama Institusi */}
            <h3 className="text-2xl md:text-3xl font-bold text-white">
                {activeEducationData.institution}
            </h3>

            {/* Gelar & Jurusan (Tampil di bawah nama institusi) */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-lg font-medium">
                <span className="text-amber-500">{activeEducationData.degree}</span>
                {activeEducationData.field && (
                    <>
                        <span className="hidden md:inline text-gray-600">•</span>
                        <span className="text-gray-300">{activeEducationData.field}</span>
                    </>
                )}
            </div>
        </div>

        {/* Badge Metadata: Periode & Lokasi */}
        <div className="flex flex-wrap gap-3">
           {/* Badge Periode */}
           <div className="flex items-center bg-amber-900/20 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium border border-amber-900/30">
              <Icon name="Calendar" size={14} className="mr-2" />
              {activeEducationData.period}
           </div>

           {/* Badge Lokasi (Baru Ditambahkan) */}
           {activeEducationData.location && (
               <div className="flex items-center bg-black/20 text-gray-400 px-4 py-1.5 rounded-full text-sm font-medium border border-white/5">
                  <Icon name="MapPin" size={14} className="mr-2" />
                  {activeEducationData.location}
               </div>
           )}
        </div>
      </div>

      {/* Deskripsi (Menggunakan fullDescription) */}
      <p className="text-gray-400 text-base mb-8 leading-relaxed animate-on-scroll">
        {activeEducationData.fullDescription}
      </p>

      {/* Key Courses */}
      <div className="mb-4 animate-on-scroll delay-100">
        <h5 className="text-amber-400 font-semibold mb-4 text-lg flex items-center">
           <Icon name="BookOpen" size={18} className="mr-2" />
           Key Courses
        </h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeEducationData.courses.map((course, i) => (
            <div
              key={i}
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