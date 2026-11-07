const textItems = ["Site Reliability Engineer", "Tech Enthusiast"]

export default function RunningText() {
  return (
    <div className="absolute bottom-52 md:bottom-[20%] left-0 w-full overflow-hidden z-20 pointer-events-none">
      <div className="relative whitespace-nowrap w-full overflow-hidden">
        <div className="inline-block animate-runningText text-[clamp(2rem,8vw,8rem)] font-bold text-white/15">
          {textItems.map((text, index) => (
            <span key={index} className="inline-block pr-[100px]">
              <span className="text-[#C6F432]/60 mr-4">—</span>
              {text}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {textItems.map((text, index) => (
            <span key={`duplicate-${index}`} className="inline-block pr-[100px]">
              <span className="text-[#C6F432]/60 mr-4">—</span>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
