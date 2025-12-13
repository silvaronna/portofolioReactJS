"use client"

import { useState, useRef, useEffect } from "react"
import Icon from "./Icon"

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  // Pastikan path ini benar sesuai struktur file kamu
  const audioSrc = "/audio/cannon-inD.mp3" 
  
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      const duration = audioRef.current.duration
      if (duration) {
        setProgress((current / duration) * 100)
      }
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
  }

  return (
    // REFACTOR: Desain lebih pipih (h-10 atau h-12) dan rounded-full
    <div className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-full pl-1 pr-5 py-1 hover:bg-black/50 hover:border-amber-500/20 transition-all duration-300 w-fit backdrop-blur-sm group shadow-sm mx-auto">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Play/Pause Button - Lebih kecil */}
      <button
        onClick={togglePlay}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all shadow-sm ${
          isPlaying 
            ? "bg-amber-500 text-black shadow-amber-500/20" 
            : "bg-white/10 text-gray-300 hover:bg-amber-500 hover:text-black"
        }`}
      >
        <Icon name={isPlaying ? "Pause" : "Play"} size={14} className="fill-current" />
      </button>

      {/* Info & Progress - Layout Horizontal Compact */}
      <div className="flex flex-col justify-center min-w-[100px]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider leading-none">
            {isPlaying ? "Now Playing" : "Music"}
          </span>
        </div>
        
        <div className="text-white text-xs font-medium truncate leading-none mb-1.5">
          Cannon in D 🎻
        </div>
        
        {/* Micro Progress Bar */}
        <div className="w-full h-0.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}