const navigationItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]

export default function Navigation({ isWhiteSection }) {
  return (
    <nav>
      <ul className="flex gap-16">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`font-medium text-2xl transition-all duration-300 hover:scale-110 transform inline-block ${
                isWhiteSection
                  ? "text-amber-900 hover:text-amber-700 bg-amber-100/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-md"
                  : "text-white hover:text-amber-300"
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
