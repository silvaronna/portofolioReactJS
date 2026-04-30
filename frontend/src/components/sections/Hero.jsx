import ScrollIndicator from "../ui/ScrollIndicator"
import RunningText from "../ui/RunningText"
import Snowfall from "react-snowfall"

export default function Hero() {
  return (
    <section className="flex items-center justify-center h-[calc(100vh-6rem)] relative overflow-hidden">
      {/* Container max-w-7xl agar konsisten dengan section lain */}
      <div className="container mx-auto px-6 relative h-full flex flex-col items-center justify-center max-w-7xl">
        
        <div className="text-center z-10 relative -mt-12"> {/* Reduced negative margin for better balance */}
          {/* Title: 5xl/7xl -> 4xl/6xl */}
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center mb-4 animate-fadeIn tracking-tight">
            Hello, I'm Azka
          </h1>
          {/* Subtitle: xl/2xl -> lg/xl */}
          <p className="text-gray-400 text-lg md:text-xl text-center max-w-2xl mx-auto animate-fadeIn delay-100 font-light leading-relaxed">
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