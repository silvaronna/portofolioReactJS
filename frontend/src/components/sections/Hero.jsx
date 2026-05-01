"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import ScrollIndicator from "../ui/ScrollIndicator"
import RunningText from "../ui/RunningText"

export default function Hero() {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine)
  }, [])

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-6rem)] relative overflow-hidden">
      
      {/* Interactive Node-Link Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab", // Grab effect looks very premium for node links
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5,
                },
              },
            },
          },
          particles: {
            color: {
              value: "#d97706", // amber-600
            },
            links: {
              color: "#d97706",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 70, // Subtle density
            },
            opacity: {
              value: 0.4,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Container max-w-6xl */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center max-w-6xl h-full mt-10 md:mt-0 pointer-events-none">
        
        <div className="text-center relative -mt-8 md:-mt-16">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 text-4xl md:text-6xl font-bold text-center mb-4 tracking-tight drop-shadow-sm">
            Hello, I'm Azka
          </h1>
          <p className="text-gray-400 text-[clamp(1rem,2vw,1.15rem)] text-center max-w-xl mx-auto font-light leading-relaxed">
            Building secure and scalable infrastructure with a passion for system security.
          </p>
        </div>
        
      </div>
      
      {/* Decorative Bottom Elements */}
      <ScrollIndicator />
      <RunningText />
    </section>
  )
}
