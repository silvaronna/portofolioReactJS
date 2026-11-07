import { useState } from "react"
import { createPortal } from "react-dom"

const TooltipComponent = ({ content, position }) => {
  if (!content || !position) return null

  const style = {
    position: "fixed",
    left: `${position.left + position.width / 2}px`,
    top: `${position.top}px`,
    transform: `translate(-50%, calc(-100% - 14px))`,
    zIndex: 1000,
    pointerEvents: "none",
    animation: "fadeInUp 0.2s ease-out forwards",
  }

  return createPortal(
    <div style={style}>
      <div className="relative px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md bg-[#121215]/95 border border-white/15">
        <div
          className="absolute"
          style={{
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "6px solid #121215",
          }}
        />
        <div className="text-center">
          <h4 className="text-[#C6F432] font-bold text-xs mb-0.5 tracking-wide">
            {content.name}
          </h4>
          <p
            className="text-white/85 text-[11px] leading-relaxed font-medium"
            style={{ whiteSpace: "normal" }}
          >
            {content.description}
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export function useTooltip() {
  const [tooltipContent, setTooltipContent] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState(null)

  const showTooltip = (content, element) => {
    const img = element.querySelector("img")
    if (img) {
      const rect = img.getBoundingClientRect()
      setTooltipContent(content)
      setTooltipPosition(rect)
    }
  }

  const hideTooltip = () => {
    setTooltipContent(null)
    setTooltipPosition(null)
  }

  return {
    showTooltip,
    hideTooltip,
    Tooltip: () => <TooltipComponent content={tooltipContent} position={tooltipPosition} />,
  }
}
