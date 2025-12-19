import SectionHeading from "../ui/SectionHeading"
import AudioPlayer from "../ui/audioPlayer"
import TiltedCard from "../ui/TiltedCard"
// 1. Import data 'about' dari index.js
import { about } from "../../data"

export default function About() {
  return (
    <section id="about" className="section-container bg-dark py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="animate-on-scroll">
          <SectionHeading title="About" />
        </div>

        <div className="lg:col-span-2">
            
            {/* 2. Intro Text: Ambil dari about.description */}
            <p className="text-center md:text-left text-gray-300 leading-relaxed text-base md:text-lg mb-10">
              {about.description}
            </p>

            {/* MOTION CARDS SECTION */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
              {/* 3. Cards Map: Ambil dari about.cards */}
              {about.cards.map((card, index) => (
                <div key={card.title} className={`w-full flex justify-center animate-on-scroll delay-${200 + index * 100}`}>
                  
                  {/* MOBILE CARD (Static) */}
                  <div className="md:hidden w-full bg-[#252525] p-8 rounded-[15px] border border-white/10 shadow-2xl text-center flex flex-col items-center justify-between">
                      <div>
                        <div className="w-12 h-1 bg-amber-500 rounded-full mb-6 mx-auto"></div>
                        <h3 className="text-white font-bold text-xl mb-4 tracking-wide">
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {card.content}
                      </p>
                  </div>

                  {/* DESKTOP CARD (Tilted) */}
                  <div className="hidden md:block flex items-center">
                    <TiltedCard
                      imageSrc="https://placehold.co/600x600/1a1a1a/1a1a1a.png"
                      altText={card.title}
                      captionText={card.title}
                      
                      containerHeight="340px" 
                      containerWidth="340px"
                      imageHeight="340px"
                      imageWidth="340px"
                      
                      rotateAmplitude={25}
                      scaleOnHover={1.05}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent={true}
                      overlayContent={
                        <div className="w-full h-full flex flex-col justify-center items-center text-center p-8 rounded-[15px] border border-white/10 bg-[#252525] hover:bg-[#2a2a2a] transition-colors shadow-2xl">
                          <div className="w-12 h-1 bg-amber-500 rounded-full mb-4"></div>
                          <h3 className="text-white font-bold text-2xl mb-4 tracking-wide">
                            {card.title}
                          </h3>
                          <p className="text-gray-400 text-base leading-relaxed">
                            {card.content}
                          </p>
                        </div>
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

          <div className="flex flex-col items-center gap-2 mt-8 md:-mt-8 animate-on-scroll delay-300">
             
             {/* Audio Player */}
             <div className="w-full max-w-md flex justify-center">
                <AudioPlayer />
             </div>

             {/* 4. Quote Section: Ambil dari about.quote */}
             <div className="text-center px-2 md:px-8 max-w-2xl">
                <p className="text-gray-500 text-sm md:text-base italic relative font-serif leading-loose">
                  <span className="text-amber-500/30 text-4xl absolute -top-4 -left-2 md:-left-6">"</span>
                  {about.quote}
                  <span className="text-amber-500/30 text-4xl absolute -bottom-4 -right-2 md:-right-6">"</span>
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}