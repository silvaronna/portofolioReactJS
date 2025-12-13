import SectionHeading from "../ui/SectionHeading"
import Card from "../ui/Card"
import AudioPlayer from "../ui/audioPlayer"

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="animate-on-scroll">
          <SectionHeading title="About" />
        </div>

        <div className="lg:col-span-2">
          <p className="text-gray-300 text-lg leading-relaxed mb-8 animate-on-scroll delay-100">
            College student as well as System Engineer, 
            who has a deep interest in Infrastructure and Security. 
            Starting Career as an IT since 17.yo with work experience in the telecommunications industry and government, 
            I'm ready to work and be a source of joy and inspiration in every task i take on.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-16">
            {aboutCards.map((card, index) => (
              <Card
                key={card.title}
                title={card.title}
                content={card.content}
                className={`animate-on-scroll delay-${200 + index * 100}`}
              />
            ))}
          </div>

          {/* AUDIO PLAYER - DI BAWAH QUOTE */}
          <div className="flex justify-center animate-on-scroll delay-400 pb-8">
             <AudioPlayer />
          </div>


          {/* QUOTE SECTION */}
          <div className="text-center mb-8 animate-on-scroll delay-300 px-4">
            <p className="text-gray-500 text-sm md:text-base italic max-w-xl mx-auto leading-relaxed relative font-serif">
              <span className="text-amber-500/30 text-3xl absolute -top-4 -left-4">"</span>
              Mistakes is a best teacher, never stop making step only because you make mistakes. Embrace it, learn from it, and keep moving forward with greater wisdom and resilience.
              <span className="text-amber-500/30 text-3xl absolute -bottom-6 -right-4">"</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}