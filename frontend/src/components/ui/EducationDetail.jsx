import Icon from "./Icon"

export default function EducationDetail({ education, activeTab }) {
  const activeEducationData = education.find((item) => item.id === activeTab)

  if (!activeEducationData) return null

  return (
    <div className="card-dark p-[clamp(1rem,3vw,1.5rem)] shadow-lg animate-fadeIn w-full mx-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[clamp(25rem,65vh,40rem)] overflow-y-auto custom-scrollbar flex flex-col">
      
      {/* Header Section: Informasi Utama (Center Mobile, Left Desktop) */}
      <div className="mb-[clamp(0.75rem,2vw,1rem)] border-b border-white/5 pb-[clamp(0.5rem,1.5vw,0.75rem)] text-center md:text-left">
        <div className="flex flex-col gap-[clamp(0.2rem,1vw,0.4rem)] mb-[clamp(0.5rem,1.5vw,0.75rem)]">
            {/* Nama Institusi */}
            <h3 className="text-[clamp(1.1rem,2.5vw,1.25rem)] font-bold text-white tracking-tight">
                {activeEducationData.institution}
            </h3>

            {/* Gelar & Jurusan (Tampil di bawah nama institusi) */}
            <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-1 md:gap-[clamp(0.3rem,1vw,0.5rem)] text-[clamp(0.8rem,1.5vw,0.9rem)] font-medium">
                <span className="text-amber-500">{activeEducationData.degree}</span>
                {activeEducationData.field && (
                    <>
                        <span className="hidden md:inline text-white/20">•</span>
                        <span className="text-gray-300">{activeEducationData.field}</span>
                    </>
                )}
            </div>
        </div>

        {/* Badge Metadata: Periode & Lokasi (Center Mobile) */}
        <div className="flex flex-wrap gap-[clamp(0.35rem,1vw,0.5rem)] justify-center md:justify-start">
           {/* Badge Periode */}
           <div className="flex items-center bg-amber-900/10 text-amber-400 px-[clamp(0.5rem,1vw,0.6rem)] py-[clamp(0.15rem,0.5vw,0.25rem)] rounded-full text-[clamp(0.65rem,1.2vw,0.7rem)] font-medium border border-amber-500/20">
              <Icon name="Calendar" size={10} className="mr-1" />
              {activeEducationData.period}
           </div>

           {/* Badge Lokasi */}
           {activeEducationData.location && (
               <div className="flex items-center bg-black/20 text-gray-400 px-[clamp(0.5rem,1vw,0.6rem)] py-[clamp(0.15rem,0.5vw,0.25rem)] rounded-full text-[clamp(0.65rem,1.2vw,0.7rem)] font-medium border border-white/5">
                  <Icon name="MapPin" size={10} className="mr-1" />
                  {activeEducationData.location}
               </div>
           )}
        </div>
      </div>

      {/* Deskripsi (Center Mobile) */}
      <p className="text-gray-400 text-[clamp(0.75rem,1.5vw,0.85rem)] mb-[clamp(1rem,3vw,1.25rem)] leading-relaxed animate-on-scroll text-center md:text-left">
        {activeEducationData.fullDescription}
      </p>

      {/* Key Courses (Tetap text-left untuk readability, tapi judulnya responsif) */}
      <div className="mb-2 animate-on-scroll delay-100 flex-1">
        <h5 className="text-amber-400/90 font-semibold mb-[clamp(0.6rem,2vw,0.85rem)] text-[clamp(0.85rem,2vw,0.95rem)] flex items-center justify-center md:justify-start">
           <Icon name="BookOpen" size={14} className="mr-1.5" />
           Key Courses
        </h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(0.4rem,1.5vw,0.6rem)]">
          {activeEducationData.courses.map((course, i) => (
            <div
              key={i}
              className="flex items-center bg-black/20 rounded-xl p-[clamp(0.5rem,1vw,0.6rem)] transition-colors animate-on-scroll border border-white/5 group text-left"
              style={{ transitionDelay: `${200 + i * 50}ms` }}
            >
              <span className="w-1 h-1 bg-amber-500/80 rounded-full mr-[clamp(0.4rem,1vw,0.5rem)] flex-shrink-0 transition-transform"></span>
              <span className="text-gray-300 text-[clamp(0.7rem,1.5vw,0.75rem)] font-medium leading-snug">{course}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}