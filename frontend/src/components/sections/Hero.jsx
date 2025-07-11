import ScrollIndicator from "../ui/ScrollIndicator"
import RunningText from "../ui/RunningText"

export default function Hero() {
  return (
    <section className="flex items-center justify-center h-[calc(100vh-8rem)] relative overflow-hidden">
      <div className="container mx-auto px-12 relative h-full flex flex-col items-center justify-center max-w-[1800px]">
        {/* Main Content - Moved higher */}
        <div className="text-center z-10 relative -mt-32">
          <h1 className="text-white text-6xl md:text-8xl font-bold text-center mb-6 animate-fadeIn">Hello, I'm Azka</h1>
          <p className="text-gray-300 text-2xl md:text-3xl text-center max-w-4xl mx-auto animate-fadeIn delay-100">
            Building secure and scalable infrastructure with a passion for system security.
          </p>
        </div>

        {/* Running Text - Positioned at bottom */}
        <RunningText />

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </div>
    </section>
  )
}
