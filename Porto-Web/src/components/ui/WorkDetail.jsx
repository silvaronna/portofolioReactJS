import Icon from "./Icon"

export default function WorkDetail({ workExperience, activeWork }) {
  return (
    <>
      {workExperience.map((work) => (
        <div
          key={work.id}
          className={`transition-all duration-500 ${
            activeWork === work.id
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 absolute -z-10 transform translate-y-8"
          }`}
        >
          {activeWork === work.id && (
            <div className="bg-[#252525] rounded-2xl p-10 shadow-xl border border-amber-900/20 animate-fadeIn">
              <div className="mb-8 pb-8 border-b border-amber-900/20">
                <h3 className="text-4xl font-bold mb-3 text-amber-400">{work.title}</h3>
                <h4 className="text-2xl mb-6 text-gray-300">
                  <span className="text-amber-500">{work.categories}</span>
                </h4>

                <div className="flex items-center text-gray-400 text-lg mb-6">
                  <Icon name="Calendar" size={20} className="mr-3 text-amber-600/70" />
                  <span>{work.period}</span>
                </div>

                <p className="text-gray-300 text-xl">{work.fullDescription}</p>
              </div>

              <div className="mb-10">
                <h5 className="text-amber-500 font-medium mb-6 text-xl">Responsibilities</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {work.jobDesc.map((responsibility, i) => (
                    <div
                      key={i}
                      className="flex items-start bg-amber-900/10 rounded-lg p-4 hover:bg-amber-900/20 transition-colors"
                    >
                      <span className="w-3 h-3 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="text-gray-300 text-lg">{responsibility}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-amber-500 font-medium mb-6 text-xl">Project Screenshot</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {work.screenshots.map((screenshot, i) => (
                    <div
                      key={i}
                      className="rounded-lg overflow-hidden border border-gray-700 hover:border-amber-600/50 transition-all shadow-lg hover:shadow-xl"
                    >
                      <img
                        src={screenshot || "/placeholder.svg"}
                        alt={`${work.title} screenshot ${i + 1}`}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}
