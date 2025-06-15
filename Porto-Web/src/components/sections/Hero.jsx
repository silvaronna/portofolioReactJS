import ScrollIndicator from "../ui/ScrollIndicator"
import RunningText from "../ui/RunningText"

export default function Hero() {
  return (
    <section className="flex items-center justify-center h-[calc(100vh-8rem)] relative">
      <div className="container mx-auto px-12 relative h-full flex flex-col items-center justify-center max-w-[1800px]">
        <div className="mb-20 opacity-0 animate-[fadeIn_1s_ease-in-out_0.5s_forwards]">
          <h1 className="text-white text-6xl md:text-8xl font-bold text-center mb-6">Hello, I'm Azka</h1>
          <p className="text-gray-300 text-2xl md:text-3xl text-center max-w-4xl mx-auto">
            Building secure and scalable infrastructure with a passion for system security.
          </p>
        </div>

        <RunningText />
        <ScrollIndicator />
      </div>
    </section>
  )
}
