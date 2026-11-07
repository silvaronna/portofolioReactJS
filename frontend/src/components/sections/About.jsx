import SectionHeading from "../ui/SectionHeading"
import AudioPlayer from "../ui/audioPlayer"
import TiltedCard from "../ui/TiltedCard"
import ReflectiveCard from "../ui/ReflectiveCard"
import Icon from "../ui/Icon"
import { about } from "../../data"

export default function About() {
  const cardIcons = ["Target", "Compass"]

  return (
    <section id="about" className="section-container bg-dark py-12 md:py-13">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Section Heading + Compact Reflective Profile Card */}
        <div className="animate-on-scroll flex flex-col items-center md:items-start gap-5">
          <SectionHeading title="About" className="mb-1" />
          <ReflectiveCard />
        </div>

        {/* Right Column: Intro, Goal/Mission Cards, and Audio Player */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Intro Text */}
          <p className="text-center md:text-left text-white/75 leading-relaxed text-xs md:text-sm max-w-2xl">
            {about.description}
          </p>

          {/* MOTION CARDS SECTION (Compact Size) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mx-auto md:mx-0">
            {about.cards.map((card, index) => {
              const iconName = cardIcons[index % cardIcons.length]
              return (
                <div
                  key={card.title}
                  className={`w-full flex justify-center md:justify-start animate-on-scroll delay-${200 + index * 100}`}
                >
                  {/* MOBILE CARD (Static Compact) */}
                  <div className="md:hidden w-full max-w-[260px] card-dark p-4 rounded-xl text-center flex flex-col items-center justify-center min-h-[140px] group">
                    <div className="w-6 h-0.5 bg-[#C6F432] rounded-full mb-2" />
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-2">
                      <Icon name={iconName} size={14} />
                    </div>
                    <h3 className="text-white font-bold text-xs sm:text-sm mb-1 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-white/60 text-[11px] leading-relaxed">
                      {card.content}
                    </p>
                  </div>

                  {/* DESKTOP CARD (3D Tilted Compact) */}
                  <div className="hidden md:flex w-full max-w-[260px] items-center justify-center">
                    <TiltedCard
                      altText={card.title}
                      captionText={card.title}
                      containerHeight="148px"
                      containerWidth="100%"
                      imageHeight="148px"
                      imageWidth="100%"
                      rotateAmplitude={8}
                      scaleOnHover={1.02}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent={true}
                      overlayContent={
                        <div className="w-full h-full flex flex-col justify-center items-center text-center p-4 rounded-xl border border-white/10 hover:border-white/25 bg-[#121215]/95 backdrop-blur-md transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.85)] group relative overflow-hidden">
                          {/* Small Lime accent indicator bar */}
                          <div className="w-6 h-0.5 bg-[#C6F432] rounded-full mb-2 group-hover:w-10 transition-all duration-300" />
                          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 mb-2 group-hover:scale-105 group-hover:border-[#C6F432]/40 group-hover:text-[#C6F432] transition-all duration-300">
                            <Icon name={iconName} size={14} />
                          </div>
                          <h3 className="text-white font-bold text-xs sm:text-sm mb-1 tracking-tight">
                            {card.title}
                          </h3>
                          <p className="text-white/60 text-[11px] leading-relaxed max-w-[210px]">
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
          <div className="flex flex-col items-center md:items-start gap-3 pt-1 max-w-xl animate-on-scroll delay-300">
            <div className="w-full flex justify-center">
              <AudioPlayer />
            </div>

            <div className="w-full text-center px-4">
              <p className="text-white/55 text-xs italic relative font-serif leading-loose">
                <span className="text-[#C6F432]/60 text-lg font-sans not-italic mr-1">&ldquo;</span>
                {about.quote}
                <span className="text-[#C6F432]/60 text-lg font-sans not-italic ml-1">&rdquo;</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
