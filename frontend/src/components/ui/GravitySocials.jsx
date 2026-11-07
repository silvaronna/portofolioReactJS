import { useEffect, useRef, useState } from "react"
import Matter from "matter-js"
import { socialLinks } from "../../data"
import Icon from "./Icon"

export default function GravitySocials() {
  const containerRef = useRef(null)
  const engineRef = useRef(null)
  const runnerRef = useRef(null)
  const bodiesRef = useRef([])
  const floorRef = useRef(null)
  const leftWallRef = useRef(null)
  const rightWallRef = useRef(null)

  const [socialBodies, setSocialBodies] = useState([])

  useEffect(() => {
    const handleSpawn = (e) => {
      spawnBalls(e.detail)
    }
    window.addEventListener("spawn-socials", handleSpawn)
    return () => window.removeEventListener("spawn-socials", handleSpawn)
  }, [])

  const spawnBalls = (startPos) => {
    if (!engineRef.current) {
      const engine = Matter.Engine.create()
      engine.world.gravity.y = 0.4
      engineRef.current = engine

      const runner = Matter.Runner.create()
      runnerRef.current = runner
      Matter.Runner.run(runner, engine)

      const w = window.innerWidth
      const h = window.innerHeight
      const wallOptions = { isStatic: true, render: { visible: false } }

      const floor = Matter.Bodies.rectangle(w / 2, h + 25, w, 50, wallOptions)
      const leftWall = Matter.Bodies.rectangle(-25, h / 2, 50, h * 2, wallOptions)
      const rightWall = Matter.Bodies.rectangle(w + 25, h / 2, 50, h * 2, wallOptions)

      floorRef.current = floor
      leftWallRef.current = leftWall
      rightWallRef.current = rightWall

      Matter.Composite.add(engine.world, [floor, leftWall, rightWall])

      Matter.Events.on(engine, "afterUpdate", () => {
        bodiesRef.current.forEach(({ body, element }) => {
          if (element && body) {
            element.style.transform = `translate(${body.position.x - 16}px, ${body.position.y - 16}px) rotate(${body.angle}rad)`
          }
        })
      })
    }

    const engine = engineRef.current
    const newBodies = []

    socialLinks.forEach((social) => {
      const radius = 16
      const body = Matter.Bodies.circle(
        startPos.x + (Math.random() - 0.5) * 20,
        startPos.y + (Math.random() - 0.5) * 20,
        radius,
        {
          restitution: 0.6,
          friction: 0.1,
          frictionAir: 0.01,
          density: 0.05,
          render: { visible: false },
        }
      )

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 10,
        y: -3 - Math.random() * 5,
      })

      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3)

      Matter.Composite.add(engine.world, body)
      const id = Math.random().toString(36).substr(2, 9)
      newBodies.push({ body, id, social })

      setTimeout(() => {
        if (engineRef.current) {
          Matter.Composite.remove(engineRef.current.world, body)
        }
        setSocialBodies((prev) => prev.filter((b) => b.id !== id))
        bodiesRef.current = bodiesRef.current.filter((b) => b.id !== id)
      }, 30000)
    })

    setSocialBodies((prev) => [...prev, ...newBodies])
  }

  useEffect(() => {
    const handleResize = () => {
      if (engineRef.current && floorRef.current && leftWallRef.current && rightWallRef.current) {
        const w = window.innerWidth
        const h = window.innerHeight
        Matter.Body.setPosition(floorRef.current, { x: w / 2, y: h + 25 })
        Matter.Body.setVertices(floorRef.current, Matter.Bodies.rectangle(w / 2, h + 25, w, 50).vertices)

        Matter.Body.setPosition(leftWallRef.current, { x: -25, y: h / 2 })
        Matter.Body.setPosition(rightWallRef.current, { x: w + 25, y: h / 2 })
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {socialBodies.map(({ id, social, body }) => {
        return (
          <a
            key={id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => {
              const existing = bodiesRef.current.find((b) => b.id === id)
              if (existing) {
                existing.element = el
              } else {
                bodiesRef.current.push({ id, body, element: el })
              }
            }}
            className="absolute top-0 left-0 w-[34px] h-[34px] rounded-full bg-[#C6F432] text-[#0B0B0C] flex items-center justify-center pointer-events-auto shadow-[0_4px_14px_rgba(198,244,50,0.35)] hover:scale-110 transition-transform"
            style={{
              transform: `translate(${body.position.x - 16}px, ${body.position.y - 16}px) rotate(${body.angle}rad)`,
            }}
            title={social.label}
          >
            <Icon name={social.icon} size={15} />
          </a>
        )
      })}
    </div>
  )
}
