import SectionHeading from "../ui/SectionHeading"
import Card from "../ui/Card"

const aboutCards = [
  {
    title: "Professional Goal",
    content:
      "To become a skilled Security Engineer who can design, implement, and manage cyber-attack-safe infrastructure solutions.",
  },
  {
    title: "Personal Mission",
    content:
      "To continuously learn and grow in the field of infrastructure while delivering value to organizations and clients.",
  },
]

export default function About() {
  return (
    <section id="about" className="section-container bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="animate-on-scroll">
          <SectionHeading title="About" />
        </div>

        <div className="md:col-span-2">
          <p className="text-gray-300 text-2xl leading-relaxed mb-10 animate-on-scroll delay-100">
            Hello, I'm Azka a college student majoring in Information Systems and Technology at Cakrawala University, as
            well as an IT staff. I began my career in IT at 17, with a strong interest in System and Security
            Engineering. I'm always ready to contribute and be a source of joy and inspiration in every task I take on.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            {aboutCards.map((card, index) => (
              <Card
                key={card.title}
                title={card.title}
                content={card.content}
                className={`animate-on-scroll delay-${200 + index * 100}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
