/**
 * Reusable section heading component
 * @param {string} title - Section title
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} Section heading
 */
export default function SectionHeading({ title, className = "" }) {
  return (
    <div className={`mb-4 ${className} text-center md:text-left`}>
      <h2 className="text-xl md:text-2xl font-bold text-white relative inline-block tracking-tight">
        {title}
        <span
          className="absolute -bottom-2.5 h-[2.5px] bg-[#C6F432] rounded-full w-1/3 
          left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 transition-all duration-300"
        />
      </h2>
    </div>
  )
}
