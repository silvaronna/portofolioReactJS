import ScrollIndicator from "../ui/ScrollIndicator"
import RunningText from "../ui/RunningText"
import Snowfall from "react-snowfall"

export default function Hero() {
  return (
    <section className="flex items-center justify-center h-[calc(100vh-6rem)] relative overflow-hidden">
      {/* Container max-w-7xl agar konsisten dengan section lain */}
      <div className="container mx-auto px-6 relative h-full flex flex-col items-center justify-center max-w-7xl">
        
        <div className="text-center z-10 relative -mt-20"> {/* Margin top negatif dikurangi */}
          {/* Title: 6xl/8xl -> 5xl/7xl */}
          <h1 className="text-white text-5xl md:text-7xl font-bold text-center mb-4 animate-fadeIn tracking-tight">
            Hello, I'm Azka
          </h1>
          {/* Subtitle: 2xl/3xl -> xl/2xl. text-gray-400 lebih lembut di mata */}
          <p className="text-gray-400 text-xl md:text-2xl text-center max-w-2xl mx-auto animate-fadeIn delay-100 font-light leading-relaxed">
            Building secure and scalable infrastructure with a passion for system security.
          </p>
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Snowfall 
            color="white" 
            snowflakeCount={500}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <RunningText />
        <ScrollIndicator />
      </div>
    </section>
  )
}