import SectionHeading from "../ui/SectionHeading"
import AudioPlayer from "../ui/audioPlayer"
import TiltedCard from "../ui/TiltedCard"
// 1. Import data 'about' dari index.js
import { about } from "../../data"

export default function About() {
  return (
    <section id="about" className="section-container bg-dark py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="animate-on-scroll">
          <SectionHeading title="About" />
        </div>

        <div className="lg:col-span-2">
            
            {/* 2. Intro Text: Ambil dari about.description */}
            <p className="text-center md:text-left text-gray-300 leading-relaxed text-sm mb-8 max-w-3xl">
              {about.description}
            </p>

            {/* MOTION CARDS SECTION */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-full">
              {/* 3. Cards Map: Ambil dari about.cards */}
              {about.cards.map((card, index) => (
                <div key={card.title} className={`w-full flex justify-center animate-on-scroll delay-${200 + index * 100}`}>
                  
                  {/* MOBILE CARD (Static) */}
                  <div className="md:hidden w-full bg-[#222222] p-5 rounded-2xl border border-white/5 shadow-lg text-center flex flex-col items-center justify-between">
                      <div>
                        <div className="w-8 h-1 bg-amber-500/80 rounded-full mb-3 mx-auto"></div>
                        <h3 className="text-white font-bold text-base mb-2 tracking-wide">
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {card.content}
                      </p>
                  </div>

                  {/* DESKTOP CARD (Tilted) */}
                  <div className="hidden md:block flex items-center">
                    <TiltedCard
                      imageSrc="https://placehold.co/600x600/1a1a1a/1a1a1a.png"
                      altText={card.title}
                      captionText={card.title}
                      
                      containerHeight="240px" 
                      containerWidth="240px"
                      imageHeight="240px"
                      imageWidth="240px"
                      
                      rotateAmplitude={15}
                      scaleOnHover={1.03}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent={true}
                      overlayContent={
                        <div className="w-full h-full flex flex-col justify-center items-center text-center p-5 rounded-2xl border border-white/5 bg-[#222222] hover:bg-[#282828] transition-colors shadow-lg">
                          <div className="w-8 h-1 bg-amber-500/80 rounded-full mb-3"></div>
                          <h3 className="text-white font-bold text-lg mb-2 tracking-wide">
                            {card.title}
                          </h3>
                          <p className="text-gray-400 text-xs leading-relaxed">
                            {card.content}
                          </p>
                        </div>
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

          <div className="flex flex-col items-center gap-2 mt-6 md:-mt-6 animate-on-scroll delay-300">
             
             {/* Audio Player */}
             <div className="w-full max-w-sm flex justify-center">
                <AudioPlayer />
             </div>

             {/* 4. Quote Section: Ambil dari about.quote */}
             <div className="text-center px-2 md:px-8 max-w-xl">
                <p className="text-gray-500 text-xs md:text-sm italic relative font-serif leading-loose">
                  <span className="text-amber-500/20 text-3xl absolute -top-3 -left-2 md:-left-4">"</span>
                  {about.quote}
                  <span className="text-amber-500/20 text-3xl absolute -bottom-3 -right-2 md:-right-4">"</span>
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}
