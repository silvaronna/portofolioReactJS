import * as LucideIcons from "lucide-react"

/**
 * Dynamic icon component that renders Lucide icons
 * @param {string} name - Icon name from Lucide
 * @param {Object} props - Additional props for the icon
 * @returns {JSX.Element} Lucide icon component
 */
export default function Icon({ name, ...props }) {
  const LucideIcon = LucideIcons[name]

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in Lucide icons`)
    return null
  }

  return <LucideIcon {...props} />
}
