const navigationItems = [
  { id: "about", label: "About" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "activities", label: "Portfolio" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]

export default function Navigation() {
  return (
    <nav>
      <ul className="flex gap-6 md:gap-8">
        {navigationItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="font-medium text-[13px] transition-all duration-300 hover:scale-105 transform inline-block text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
