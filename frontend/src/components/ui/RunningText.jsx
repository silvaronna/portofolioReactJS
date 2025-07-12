const textItems = ["System Engineer", "Security Enthusiast"]

export default function RunningText() {
  return (
    <div className="absolute bottom-[15%] left-0 w-full overflow-hidden z-20">
      <div className="relative whitespace-nowrap w-full overflow-hidden">
        <div className="inline-block animate-runningText text-[clamp(6rem,15vw,14rem)] font-bold text-gradient-gold">
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
