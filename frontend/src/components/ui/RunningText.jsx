const textItems = ["System Engineer", "Security Enthusiast"]

export default function RunningText() {
  return (
    // REVISI: 
    // bottom-52 : Di Mobile naik tinggi (208px) agar tidak ketutupan mouse.
    // md:bottom-[22%] : Di Desktop tetap seperti settingan awal Anda.
    <div className="absolute bottom-60 md:bottom-[22%] left-0 w-full overflow-hidden z-20">
      <div className="relative whitespace-nowrap w-full overflow-hidden">
        <div className="inline-block animate-runningText text-[clamp(2rem,8vw,8rem)] font-bold text-gradient-gold">
          {textItems.map((text, index) => (
            <span key={index} className="inline-block pr-[100px]">
              - {text}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {textItems.map((text, index) => (
            <span key={`duplicate-${index}`} className="inline-block pr-[100px]">
              - {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}