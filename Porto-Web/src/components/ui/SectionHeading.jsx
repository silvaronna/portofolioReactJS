/**
 * Reusable section heading component
 * @param {string} title - Section title
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} Section heading
 */
export default function SectionHeading({ title, className = "" }) {
  return <h2 className={`section-heading text-amber-400 ${className}`}>{title}</h2>
}
