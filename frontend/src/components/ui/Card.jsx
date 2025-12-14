export default function Card({ title, content, className = "" }) {
  return (
    <div
      // REVISI: Tambahkan 'text-center' agar tulisan Judul & Isi rata tengah
      className={`card-dark p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll text-center flex flex-col items-center ${className}`}
    >
      {/* Title: 3xl -> xl */}
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-amber-400">{title}</h3>
      {/* Content: xl -> base (standar) & text-gray-400 (sedikit lebih redup agar elegan) */}
      <p className="text-gray-400 text-base leading-relaxed">{content}</p>
    </div>
  )
}