/**
 * Reusable section heading component
 * @param {string} title - Section title
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} Section heading
 */
export default function SectionHeading({ title, className = "" }) {
  return (
    <div className={`mb-4 ${className} text-center md:text-left`}>
      <h2 className="text-2xl md:text-3xl font-bold text-white relative inline-block tracking-tight">
        {title}
        <span
          className="absolute -bottom-2.5 h-[3px] bg-[#C6F432] rounded-full w-1/3 
          left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 transition-all duration-300"
        />
      </h2>
    </div>
  )
}
