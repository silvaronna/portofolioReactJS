const textItems = ["- System Engineer", "- Security Enthusiast"]

export default function RunningText() {
  return (
    <div className="w-full overflow-hidden absolute bottom-[15%] left-0 z-20">
      <div className="relative whitespace-nowrap w-full overflow-hidden">
        <div className="inline-block animate-runningText text-[clamp(6rem,15vw,14rem)] font-bold text-white shadow-text">
          {textItems.map((text, index) => (
            <span key={index} className="inline-block pr-[100px] text-gradient-gold">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
