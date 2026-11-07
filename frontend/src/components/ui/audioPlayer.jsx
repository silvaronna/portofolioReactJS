"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "motion/react"
import Icon from "./Icon"

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const audioRef = useRef(null)
  const progressBarRef = useRef(null)

  const audioSrc = "/audio/cannon-inD.mp3"

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
    }

    audio.addEventListener("loadedmetadata", updateMetadata)
    return () => audio.removeEventListener("loadedmetadata", updateMetadata)
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    const current = audioRef.current.currentTime
    const total = audioRef.current.duration
    setCurrentTime(current)
    if (total && !isNaN(total)) {
      setDuration(total)
      setProgress((current / total) * 100)
    }
  }

  const handleSeek = (e) => {
    if (!audioRef.current || !progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const total = audioRef.current.duration || duration
    if (total && !isNaN(total)) {
      const newTime = (clickX / rect.width) * total
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
      setProgress((clickX / rect.width) * 100)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
  }

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00"
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-full bg-[#121215]/90 backdrop-blur-xl border transition-colors duration-300 shadow-[0_12px_34px_-6px_rgba(0,0,0,0.85)] w-full max-w-[330px] select-none ${
        isPlaying
          ? "border-[#C6F432]/45"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Play / Pause Dock Button */}
      <motion.button
        type="button"
        onClick={togglePlay}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className={`relative w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6F432] ${
          isPlaying
            ? "bg-[#C6F432] text-[#0B0B0C] shadow-[0_0_16px_rgba(198,244,50,0.35)]"
            : "bg-white/10 text-white hover:bg-[#C6F432] hover:text-[#0B0B0C] border border-white/10"
        }`}
      >
        <Icon
          name={isPlaying ? "Pause" : "Play"}
          size={16}
          className={`fill-current ${!isPlaying ? "ml-0.5" : ""}`}
        />
      </motion.button>

      {/* Track Metadata & Interactive Scrubber */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <div className="flex items-center gap-1.5">
            {/* Animated Equalizer Bars */}
            <div className="flex items-end gap-[2px] h-2.5">
              {[0, 1, 2, 3].map((bar) => (
                <motion.span
                  key={bar}
                  animate={
                    isPlaying
                      ? { height: ["3px", "10px", "5px", "9px", "3px"] }
                      : { height: "3px" }
                  }
                  transition={
                    isPlaying
                      ? { duration: 0.9 + bar * 0.15, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.2 }
                  }
                  className={`w-[2px] rounded-full ${
                    isPlaying ? "bg-[#C6F432]" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
              {isPlaying ? "Now Playing" : "Soundtrack"}
            </span>
          </div>

          <span className="text-[10px] font-mono text-white/50 tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-semibold text-white truncate">
            Cannon in D — Pachelbel
          </span>
        </div>

        {/* Interactive Scrubber Bar */}
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          role="slider"
          aria-label="Seek audio timeline"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
          className="relative w-full h-1.5 bg-white/10 rounded-full cursor-pointer overflow-visible flex items-center"
        >
          <div
            className="h-full bg-[#C6F432] rounded-full transition-all duration-100 ease-linear relative"
            style={{ width: `${progress}%` }}
          >
            <span
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0B0B0C] shadow-sm transition-transform duration-200 ${
                isHovered || isPlaying ? "scale-100" : "scale-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Mute / Unmute Dock Action */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        className="w-7 h-7 rounded-full flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 transition-colors shrink-0 focus:outline-none"
      >
        <Icon name={isMuted ? "VolumeX" : "Volume2"} size={14} />
      </button>
    </motion.div>
  )
}
