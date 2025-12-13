const navigationItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
    { id: "activities", label: "Portofolio" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]

export default function Navigation({ isWhiteSection }) {
  return (
    <nav>
      {/* REFACTOR: Gap dikurangi gap-16 -> gap-8 */}
      <ul className="flex gap-6 md:gap-8">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              // REFACTOR: Font text-2xl -> text-sm font-medium
              className={`font-medium text-sm transition-all duration-300 hover:scale-105 transform inline-block ${
                isWhiteSection
                  ? "text-amber-900 hover:text-amber-700 bg-amber-100/90 backdrop-blur-sm px-5 py-2 rounded-full shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-full"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}