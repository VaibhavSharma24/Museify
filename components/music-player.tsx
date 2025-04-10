"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface MusicPlayerProps {
  isPlaying: boolean
  togglePlay: () => void
  currentMood: string
}

export function MusicPlayer({ isPlaying, togglePlay, currentMood }: MusicPlayerProps) {
  const [volume, setVolume] = useState(80)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  // Simulate track progress
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0
          }
          return prev + 0.5
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying])

  // Reset progress when mood changes
  useEffect(() => {
    setProgress(0)
  }, [currentMood])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (progress: number) => {
    // Assuming a 3-minute song
    const totalSeconds = (progress / 100) * 180
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const trackInfo = {
    lofi: { title: "Chill Study Beats", artist: "Lo-Fi Collective" },
    edm: { title: "Electric Dreams", artist: "Neon Pulse" },
    rock: { title: "Midnight Highway", artist: "The Stone Rebels" },
    jazz: { title: "Blue Note Serenade", artist: "Smooth Quartet" },
    acoustic: { title: "Autumn Leaves", artist: "Acoustic Harmony" },
  }

  const currentTrack = trackInfo[currentMood as keyof typeof trackInfo]

  return (
    <motion.div
      className="w-full max-w-md p-4 rounded-xl bg-background/80 backdrop-blur-sm shadow-lg border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMood}
            className="text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-medium text-lg">{currentTrack.title}</h3>
            <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
          </motion.div>
        </AnimatePresence>

        <div className="space-y-2">
          <div className="relative pt-1">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={(value) => setProgress(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatTime(progress)}</span>
              <span>3:00</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
              className="w-20"
              disabled={isMuted}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <SkipBack className="h-5 w-5" />
            </Button>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="default"
                className="bg-[rgb(154,87,222)] hover:bg-[rgb(154,87,222)/90] rounded-full h-12 w-12"
                size="icon"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
              </Button>
            </motion.div>

            <Button variant="ghost" size="icon" className="rounded-full">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          <div className="w-12">{/* Spacer to balance the layout */}</div>
        </div>
      </div>
    </motion.div>
  )
}
