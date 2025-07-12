/**
 * Reusable section heading component
 * @param {string} title - Section title
 * @param {string} className - Additional CSS classes
 * @param {boolean} centered - Whether to center the heading and underline
 * @returns {JSX.Element} Section heading
 */
export default function SectionHeading({ title, className = "", centered = false }) {
  return (
    <h2
      className={`section-heading text-amber-400 ${centered ? "text-center section-heading-centered" : ""} ${className}`}
    >
      {title}
    </h2>
  )
}
