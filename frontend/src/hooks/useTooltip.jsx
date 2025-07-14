// file: hooks/useTooltip.js

import { useState } from "react";
import { createPortal } from "react-dom";

// Ini adalah komponen Tooltip-nya. Perhatikan `pointerEvents: 'none'`
const TooltipComponent = ({ content, position }) => {
  if (!content || !position) return null;

  const style = {
    position: 'fixed',
    left: `${position.left + position.width / 2}px`,
    top: `${position.top}px`,
    transform: `translate(-50%, calc(-100% - 15px))`, // Mengurangi margin agar lebih dekat
    zIndex: 1000,
    pointerEvents: 'none', // ✨ KUNCI UNTUK MENGATASI FLICKERING
    animation: "fadeInUp 0.2s ease-out forwards",
  };

  return createPortal(
    <div style={style}>
      <div
        className="relative px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm border border-gray-600/30"
        style={{
          background: "linear-gradient(135deg, rgba(37, 37, 37, 0.95) 0%, rgba(45, 45, 45, 0.9) 50%, rgba(37, 37, 37, 0.95) 100%)",
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(156, 163, 175, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          className="absolute"
          style={{
            top: "100%", left: "50%", transform: "translateX(-50%)",
            width: 0, height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "6px solid rgba(37, 37, 37, 0.95)",
          }}
        />
        <div className="text-center">
          <h4 className="text-amber-400 font-bold text-base mb-1 tracking-wide">{content.name}</h4>
          <p className="text-gray-300 text-xs leading-relaxed font-medium" style={{ whiteSpace: "normal" }}>
            {content.description}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};


// Ini adalah hook-nya
export function useTooltip() {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);

  const showTooltip = (content, element) => {
    const img = element.querySelector('img');
    if (img) {
      const rect = img.getBoundingClientRect();
      setTooltipContent(content);
      setTooltipPosition(rect);
    }
  };

  const hideTooltip = () => {
    setTooltipContent(null);
    setTooltipPosition(null);
  };
  
  // Hook ini mengembalikan fungsi dan komponennya
  return {
    showTooltip,
    hideTooltip,
    Tooltip: () => <TooltipComponent content={tooltipContent} position={tooltipPosition} />,
  };
}