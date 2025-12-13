/**
 * Reusable section heading component
 * @param {string} title - Section title
 * @param {string} className - Additional CSS classes
 * @param {boolean} centered - Whether to center the heading and underline
 * @returns {JSX.Element} Section heading
 */
export default function SectionHeading({ title, className = "" }) {
  return (
    <h2
      // REFACTOR: Ukuran font diperkecil jadi text-3xl md:text-4xl agar lebih standar
      className={`text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block ${className}`}
    >
      {title}
      {/* Underline Amber */}
      <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-amber-500 rounded-full"></span>
    </h2>
  )
}