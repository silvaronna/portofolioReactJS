export default function Card({ title, content, className = "" }) {
  return (
    <div
      className={`card-dark p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll text-center flex flex-col items-center ${className}`}
    >
      <h3 className="text-lg md:text-xl font-bold mb-2 text-amber-400">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
    </div>
  )
}