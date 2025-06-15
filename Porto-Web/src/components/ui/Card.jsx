export default function Card({ title, content, className = "" }) {
  return (
    <div className={`card-dark p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <h3 className="text-3xl font-semibold mb-5 text-amber-400">{title}</h3>
      <p className="text-gray-300 text-xl text-justify">{content}</p>
    </div>
  )
}
