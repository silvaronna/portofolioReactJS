"use client"

import { useState, useRef, useEffect } from "react"
import Icon from "./Icon"

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  // GANTI FILE INI DENGAN FILE MP3 KAMU NANTI
  // Simpan file di folder: public/audio/my-song.mp3
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
    <div className="flex items-center gap-4 bg-black/30 border border-white/5 rounded-xl p-3 pr-6 hover:border-amber-500/30 transition-all duration-300 w-fit backdrop-blur-sm group">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-all shadow-lg shadow-amber-500/20 group-hover:scale-105 active:scale-95"
      >
        <Icon name={isPlaying ? "Pause" : "Play"} size={20} className="fill-current" />
      </button>

      {/* Track Info & Visualizer */}
      <div className="flex flex-col justify-center min-w-[140px]">
        <span className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-1">
          Currently Listening
        </span>
        <div className="text-white text-sm font-medium truncate">
          Lofi Coding Mode ☕
        </div>
        
        {/* Simple Progress Bar */}
        <div className="w-full h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-amber-500 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}