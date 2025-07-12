export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
      <div className="w-12 h-20 rounded-full border-2 border-amber-300 flex items-start justify-center p-3">
        <div className="w-3 h-5 bg-amber-300 rounded-full animate-[scrollDown_1.5s_infinite]"></div>
      </div>
    </div>
  )
}
