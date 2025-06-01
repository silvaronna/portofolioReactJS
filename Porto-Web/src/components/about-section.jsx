import SectionHeading from "./ui/SectionHeading"

export default function AboutSection() {
  return (
    <section id="about" className="section-container bg-dark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="animate-on-scroll">
          <SectionHeading title="About" />
        </div>
        <div className="md:col-span-2">
          <p className="text-gray-300 text-2xl leading-relaxed mb-10 animate-on-scroll delay-100">
            Hello, I'm Azka a college student majoring in Information Systems and Technology at Cakrawala University, 
            as well as an IT staff. I began my career in IT at 17, with a strong interest in System and Security Engineering. 
            I'm always ready to contribute and be a source of joy and inspiration in every task I take on.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
            <div className="card-dark p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll delay-200">
              <h3 className="text-3xl font-semibold mb-5 text-amber-400">Professional Goal</h3>
              <p className="text-gray-300 text-xl text-justify">
                To become a skilled Security Engineer who can design, implement, and manage cyber-attack-safe
                infrastructure solutions.
              </p>
            </div>

            <div className="card-dark p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll delay-300">
              <h3 className="text-3xl font-semibold mb-5 text-amber-400">Personal Mission</h3>
              <p className="text-gray-300 text-xl text-justify">
                To continuously learn and grow in the field of infrastructure while delivering value to organizations
                and clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
