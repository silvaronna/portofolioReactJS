/**
 * Reusable section heading component
 * @param {string} title - Section title
 * @param {string} className - Additional CSS classes
 * @param {boolean} centered - Whether to center the heading and underline
 * @returns {JSX.Element} Section heading
 */
export default function SectionHeading({ title, className = "" }) {
  return (
    <div className={`mb-6 ${className} text-center md:text-left`}>
      <h2 className="text-3xl md:text-4xl font-bold text-amber-400 relative inline-block">
        {title}
        <span className="absolute -bottom-2 h-1 bg-amber-500 rounded-full w-1/3 
          left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 transition-all duration-300">
        </span>
      </h2>
    </div>
  )
}