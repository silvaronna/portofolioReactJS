import SectionHeading from "../ui/SectionHeading"
import AudioPlayer from "../ui/audioPlayer"
import TiltedCard from "../ui/TiltedCard"
import Icon from "../ui/Icon"
import { about } from "../../data"

export default function About() {
  const cardIcons = ["Target", "Compass"]

  return (
    <section id="about" className="section-container bg-dark py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="animate-on-scroll">
          <SectionHeading title="About" />
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Intro Text */}
          <p className="text-center md:text-left text-white/80 leading-relaxed text-sm md:text-base max-w-3xl">
            {about.description}
          </p>

          {/* MOTION CARDS SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {about.cards.map((card, index) => {
              const iconName = cardIcons[index % cardIcons.length]
              return (
                <div
                  key={card.title}
                  className={`w-full flex justify-center animate-on-scroll delay-${200 + index * 100}`}
                >
                  {/* MOBILE CARD (Static) */}
                  <div className="md:hidden w-full card-dark p-6 rounded-2xl text-center flex flex-col items-center justify-center min-h-[180px] group">
                    <div className="w-8 h-1 bg-[#C6F432] rounded-full mb-3.5" />
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-2.5">
                      <Icon name={iconName} size={17} />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2 tracking-wide">
                      {card.title}
                    </h3>
                    <p className="text-white/65 text-xs leading-relaxed">
                      {card.content}
                    </p>
                  </div>

                  {/* DESKTOP CARD (3D Tilted) */}
                  <div className="hidden md:flex w-full items-center justify-center">
                    <TiltedCard
                      altText={card.title}
                      captionText={card.title}
                      containerHeight="210px"
                      containerWidth="100%"
                      imageHeight="210px"
                      imageWidth="100%"
                      rotateAmplitude={10}
                      scaleOnHover={1.03}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent={true}
                      overlayContent={
                        <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 rounded-2xl border border-white/10 hover:border-white/25 bg-[#121215]/95 backdrop-blur-md transition-all duration-300 shadow-[0_14px_34px_-8px_rgba(0,0,0,0.85)] group relative overflow-hidden">
                          {/* Small Lime accent indicator bar */}
                          <div className="w-8 h-1 bg-[#C6F432] rounded-full mb-3.5 group-hover:w-12 transition-all duration-300" />
                          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 mb-2.5 group-hover:scale-110 group-hover:border-[#C6F432]/40 group-hover:text-[#C6F432] transition-all duration-300">
                            <Icon name={iconName} size={17} />
                          </div>
                          <h3 className="text-white font-bold text-base lg:text-lg mb-2 tracking-tight">
                            {card.title}
                          </h3>
                          <p className="text-white/65 text-xs leading-relaxed max-w-[240px]">
                            {card.content}
                          </p>
                        </div>
                      }
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Audio Player & Quote Section */}
          <div className="flex flex-col items-center gap-4 pt-2 animate-on-scroll delay-300">
            <div className="w-full max-w-sm flex justify-center">
              <AudioPlayer />
            </div>

            <div className="text-center px-4 md:px-8 max-w-xl">
              <p className="text-white/55 text-xs md:text-sm italic relative font-serif leading-loose">
                <span className="text-[#C6F432]/60 text-2xl font-sans not-italic mr-1.5">&ldquo;</span>
                {about.quote}
                <span className="text-[#C6F432]/60 text-2xl font-sans not-italic ml-1.5">&rdquo;</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
