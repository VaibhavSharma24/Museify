"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Home,
  Disc,
  Radio,
  Mic2,
  Clock,
  Star,
  FileText,
  Plus,
  Bell,
  ChevronLeft,
  Play,
  Pause,
  Heart,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Globe,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface RadioStation {
  id: string
  name: string
  genre: string
  frequency: string
  streamUrl: string
  image: string
  listeners: number
  isLive: boolean
  location: string
}

export default function RadioPage() {
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [stations, setStations] = useState<RadioStation[]>([])
  const [filteredStations, setFilteredStations] = useState<RadioStation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(64).fill(0))
  const [showStationInfo, setShowStationInfo] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  // Initialize radio stations
  useEffect(() => {
    // Simulate loading data
    setIsLoading(true)

    // Mock radio stations data
    const radioStations: RadioStation[] = [
      {
        id: "1",
        name: "Lofi Beats",
        genre: "Lo-Fi",
        frequency: "98.5",
        streamUrl: "https://streams.ilovemusic.de/iloveradio17.mp3", // Lo-fi beats stream
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%206166%20%2810%29-9gpTNXk39d2hDoKpFmSEa7z1ejmDTX.png",
        listeners: 1245,
        isLive: true,
        location: "Global",
      },
      {
        id: "2",
        name: "EDM Central",
        genre: "EDM",
        frequency: "101.3",
        streamUrl: "https://streams.ilovemusic.de/iloveradio103.mp3", // EDM stream
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.05%20%282%29-2C4zUqgt8utaBKMcjgl6rHl8bZ7sKX.png",
        listeners: 2134,
        isLive: true,
        location: "Amsterdam",
      },
      {
        id: "3",
        name: "Rock Classics",
        genre: "Rock",
        frequency: "105.7",
        streamUrl: "https://streams.ilovemusic.de/iloveradio21.mp3", // Rock stream
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.06%20%282%29-lnOFRicZ0oxDrwzq1DcBElsrYDMMo3.png",
        listeners: 1876,
        isLive: true,
        location: "London",
      },
      {
        id: "4",
        name: "Smooth Jazz",
        genre: "Jazz",
        frequency: "92.1",
        streamUrl: "https://streams.ilovemusic.de/iloveradio10.mp3", // Jazz-like stream
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.05%20%284%29-XRTSEdIkjbhXCR4xtspcqK1G801Tbq.png",
        listeners: 943,
        isLive: true,
        location: "New Orleans",
      },
      {
        id: "5",
        name: "Acoustic Vibes",
        genre: "Acoustic",
        frequency: "94.8",
        streamUrl: "https://streams.ilovemusic.de/iloveradio16.mp3", // Acoustic-like stream
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.06%20%281%29-1u3AFOkXx8jU7Y0rbFQvrGRyEAgpzS.png",
        listeners: 1102,
        isLive: true,
        location: "Nashville",
      },
      {
        id: "6",
        name: "Hip Hop Now",
        genre: "Hip Hop",
        frequency: "97.3",
        streamUrl: "https://streams.ilovemusic.de/iloveradio3.mp3", // Hip Hop stream
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.09-jVo3wFizNt05xH7LYfuCqDsKNYjdqW.png",
        listeners: 2567,
        isLive: true,
        location: "Atlanta",
      },
      {
        id: "7",
        name: "Pop Hits",
        genre: "Pop",
        frequency: "99.9",
        streamUrl: "https://streams.ilovemusic.de/iloveradio109.mp3", // Pop stream
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.05-3i94xP4YTYWq8DTI2akf9IJ157wloA.png",
        listeners: 3421,
        isLive: true,
        location: "Los Angeles",
      },
      {
        id: "8",
        name: "Classical Moments",
        genre: "Classical",
        frequency: "90.5",
        streamUrl: "https://streams.ilovemusic.de/iloveradio18.mp3", // Classical-like stream
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.05%20%281%29-1dXDl1VWNYRGjeNua38einkNcK4VE9.png",
        listeners: 782,
        isLive: true,
        location: "Vienna",
      },
    ]

    setStations(radioStations)
    setFilteredStations(radioStations)

    // Set default station
    setCurrentStation(radioStations[0])

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = volume / 100
    }

    // Set up audio context for visualizer
    setupVisualizer()

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Filter stations based on search and genre
  useEffect(() => {
    let filtered = stations

    if (searchQuery) {
      filtered = filtered.filter(
        (station) =>
          station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedGenre) {
      filtered = filtered.filter((station) => station.genre === selectedGenre)
    }

    setFilteredStations(filtered)
  }, [searchQuery, selectedGenre, stations])

  // Set up audio event listeners
  useEffect(() => {
    if (!audioRef.current) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      setAudioError("Error playing radio stream. Please try another station.")
      setIsPlaying(false)
    }

    audioRef.current.addEventListener("play", handlePlay)
    audioRef.current.addEventListener("pause", handlePause)
    audioRef.current.addEventListener("error", handleError)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", handlePlay)
        audioRef.current.removeEventListener("pause", handlePause)
        audioRef.current.removeEventListener("error", handleError)
      }
    }
  }, [])

  // Update audio source when current station changes
  useEffect(() => {
    if (!currentStation?.streamUrl || !audioRef.current) return

    // Reset error state
    setAudioError(null)

    // Update audio source
    audioRef.current.src = currentStation.streamUrl
    audioRef.current.load()

    // If was playing, continue playing the new station
    if (isPlaying) {
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error playing audio:", error)
          setAudioError("Playback was blocked. Please click play again.")
          setIsPlaying(false)
        })
      }
    }

    // Show station info when changing stations
    setShowStationInfo(true)
    const timer = setTimeout(() => {
      setShowStationInfo(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentStation, isPlaying])

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  // Set up audio visualizer
  const setupVisualizer = () => {
    if (!window.AudioContext) {
      console.log("AudioContext not supported")
      return
    }

    try {
      const audioContext = new AudioContext()
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 128

      if (audioRef.current) {
        const source = audioContext.createMediaElementSource(audioRef.current)
        source.connect(analyser)
        analyser.connect(audioContext.destination)

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const updateVisualizer = () => {
          if (!analyser) return

          analyser.getByteFrequencyData(dataArray)

          // Convert to array of numbers for our state
          const normalizedData = Array.from(dataArray).map((value) => value / 255)
          setVisualizerData(normalizedData)

          // Draw on canvas if available
          drawVisualizer(dataArray)

          animationRef.current = requestAnimationFrame(updateVisualizer)
        }

        updateVisualizer()
      }
    } catch (error) {
      console.error("Error setting up audio visualizer:", error)
    }
  }

  // Draw visualizer on canvas
  const drawVisualizer = (dataArray: Uint8Array) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Center line
    const centerY = canvas.height / 2

    // Create gradient for bars
    const barGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    barGradient.addColorStop(0, "rgba(154, 87, 222, 1)")
    barGradient.addColorStop(0.5, "rgba(194, 87, 232, 0.8)")
    barGradient.addColorStop(1, "rgba(154, 87, 222, 0.4)")

    // Draw bars in mirror effect
    const barWidth = (canvas.width / dataArray.length) * 2.5
    let x = 0

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i] / 1.5

      // Top bar (flipped)
      ctx.fillStyle = barGradient
      ctx.fillRect(x, centerY - barHeight, barWidth, barHeight)

      // Bottom bar
      ctx.fillRect(x, centerY, barWidth, barHeight)

      // Add glow effect for higher amplitudes
      if (barHeight > 30) {
        ctx.shadowColor = "rgba(154, 87, 222, 0.8)"
        ctx.shadowBlur = 15
        ctx.fillRect(x, centerY - barHeight, barWidth, barHeight)
        ctx.fillRect(x, centerY, barWidth, barHeight)
        ctx.shadowBlur = 0
      }

      // Add connecting line between bars
      if (i > 0) {
        ctx.beginPath()
        ctx.moveTo(x - barWidth / 2, centerY)
        ctx.lineTo(x + barWidth / 2, centerY)
        ctx.strokeStyle = "rgba(154, 87, 222, 0.5)"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      x += barWidth + 1
    }

    // Add pulsing circle in the center
    const pulseSize = 5 + Math.sin(Date.now() * 0.005) * 3
    ctx.beginPath()
    ctx.arc(canvas.width / 2, centerY, pulseSize, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.fill()
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (!currentStation?.streamUrl || !audioRef.current) {
      setAudioError("No radio station selected")
      return
    }

    setAudioError(null)

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Error playing audio:", error)
          setAudioError("Playback was blocked. Please try again.")
        })
      }
    }
  }

  // Change station
  const changeStation = (station: RadioStation) => {
    setCurrentStation(station)
  }

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
  }

  // Get unique genres
  const genres = Array.from(new Set(stations.map((station) => station.genre)))

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-[rgb(154,87,222)] border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Tuning in to radio stations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Left Sidebar */}
      <div className="w-[240px] bg-black flex flex-col h-screen">
        <div className="p-6 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[rgb(154,87,222)] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18V6L21 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="2" />
                <circle cx="18" cy="15" r="3" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[rgb(154,87,222)] to-white bg-clip-text text-transparent">
              Museify
            </h1>
          </Link>
        </div>

        <nav className="mt-2">
          <ul className="space-y-2 px-2">
            <li>
              <Link
                href="/home"
                className="flex items-center gap-3 px-4 py-3 rounded-md text-zinc-400 hover:text-white"
                prefetch={true}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/artists" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white">
                <Search className="w-5 h-5" />
                <span>Artists</span>
              </Link>
            </li>
            <li>
              <Link href="/radio" className="flex items-center gap-3 px-4 py-3 text-white bg-zinc-800 rounded-md">
                <Radio className="w-5 h-5" />
                <span>Radio</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white">
                <Disc className="w-5 h-5" />
                <span>Albums</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white">
                <Mic2 className="w-5 h-5" />
                <span>Podcast</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8 px-4">
          <h2 className="text-xs font-semibold text-zinc-400 mb-4 px-2">LIBRARY</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white">
                <Clock className="w-5 h-5" />
                <span>Recently Added</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white">
                <Star className="w-5 h-5" />
                <span>Favorite Songs</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white">
                <FileText className="w-5 h-5" />
                <span>Local Files</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-8 px-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-xs font-semibold text-zinc-400">PLAYLIST</h2>
            <button className="text-zinc-400 hover:text-white">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white">
                <span>Lo-fi Music</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white">
                <span>Best of Bon Jovi</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white">
                <span>Best of John Mayer</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navigation */}
        <div className="flex items-center justify-between p-4 bg-[#121212]">
          <div className="flex items-center gap-4">
            <Link href="/home" prefetch={true}>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="relative w-[400px]">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search radio stations..."
                className="w-full bg-zinc-800/70 backdrop-blur-sm rounded-full py-2 pl-10 pr-4 text-sm border border-zinc-700 focus:border-[rgb(154,87,222)] focus:ring-1 focus:ring-[rgb(154,87,222)] transition-all duration-300 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar>
                <AvatarImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ellipse%201-tKOo7FglivvkW5MFe0U8pJbvMJ9jJK.png"
                  alt="James Rodriguez"
                />
                <AvatarFallback>JR</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">James Rodriguez</p>
                <div className="flex items-center">
                  <p className="text-xs text-zinc-400">Premium</p>
                  <Badge className="ml-1 bg-yellow-500 text-black text-[10px] py-0 px-1">★</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Radio Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Audio error message */}
            {audioError && <div className="bg-red-500/80 text-white px-4 py-2 rounded-md mb-6">{audioError}</div>}

            {/* Radio Header */}
            <div className="relative mb-8 overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-purple-600/20 to-pink-900/30 animate-gradient-x"></div>

              {/* Animated particles */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white/30"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                      opacity: Math.random() * 0.5 + 0.3,
                    }}
                    animate={{
                      y: [null, Math.random() * 100 + "%"],
                      opacity: [null, Math.random() * 0.5 + 0.1],
                    }}
                    transition={{
                      duration: 5 + Math.random() * 10,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    style={{ width: Math.random() * 3 + 1, height: Math.random() * 3 + 1 }}
                  />
                ))}
              </div>

              <div className="relative z-10 py-12 px-8">
                <motion.h1
                  className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Radio
                </motion.h1>
                <motion.p
                  className="text-xl text-zinc-300 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Listen to live radio stations from around the world with immersive audio quality
                </motion.p>
              </div>
            </div>

            {/* Genre Filter */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Genres</h2>
              <div className="flex flex-wrap gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={selectedGenre === null ? "default" : "outline"}
                    className={`rounded-full transition-all duration-300 ${
                      selectedGenre === null
                        ? "bg-gradient-to-r from-[rgb(154,87,222)] to-[rgb(174,107,242)] shadow-lg shadow-purple-500/30"
                        : "hover:border-purple-500/50 hover:text-purple-400"
                    }`}
                    onClick={() => setSelectedGenre(null)}
                  >
                    All
                  </Button>
                </motion.div>
                {genres.map((genre) => (
                  <motion.div key={genre} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={selectedGenre === genre ? "default" : "outline"}
                      className={`rounded-full transition-all duration-300 ${
                        selectedGenre === genre
                          ? "bg-gradient-to-r from-[rgb(154,87,222)] to-[rgb(174,107,242)] shadow-lg shadow-purple-500/30"
                          : "hover:border-purple-500/50 hover:text-purple-400"
                      }`}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Featured Station */}
            {currentStation && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Now Playing</h2>
                <motion.div
                  className="bg-gradient-to-br from-zinc-800/80 via-zinc-800/60 to-zinc-800/80 backdrop-blur-sm rounded-lg p-6 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(154,87,222,0.1)] to-transparent opacity-50"></div>

                  {/* Animated circles */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[rgba(154,87,222,0.1)] blur-3xl animate-pulse"></div>
                  <div
                    className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[rgba(154,87,222,0.05)] blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden group">
                      <Image
                        src={currentStation.image || "/placeholder.svg"}
                        alt={currentStation.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
                        <motion.button
                          onClick={togglePlay}
                          className="w-16 h-16 bg-[rgb(154,87,222)] rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isPlaying ? (
                            <Pause className="w-8 h-8 text-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                          )}
                        </motion.button>
                      </div>

                      {/* Rotating disc effect when playing */}
                      {isPlaying && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-white/20"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
                        <Badge className="bg-[rgb(154,87,222)]">{currentStation.genre}</Badge>
                        <Badge className="bg-zinc-700">{currentStation.frequency} FM</Badge>
                      </div>
                      <h3 className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        {currentStation.name}
                      </h3>
                      <div className="flex items-center gap-4 text-zinc-300 mb-4">
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4 text-[rgb(154,87,222)]" />
                          <span>{currentStation.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Radio className="w-4 h-4 text-[rgb(154,87,222)]" />
                          <span>{currentStation.listeners.toLocaleString()} listeners</span>
                        </div>
                      </div>

                      {/* Enhanced visualizer */}
                      <div className="h-20 mb-4 bg-zinc-900/70 rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
                        <canvas ref={canvasRef} className="w-full h-full"></canvas>
                      </div>

                      <div className="flex items-center gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            onClick={togglePlay}
                            className="bg-gradient-to-r from-[rgb(154,87,222)] to-[rgb(174,107,242)] hover:from-[rgb(174,107,242)] hover:to-[rgb(194,127,255)] text-white rounded-full px-6 shadow-lg shadow-purple-500/30"
                          >
                            {isPlaying ? "Pause" : "Play"}
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            className="rounded-full border-purple-500/50 hover:bg-purple-500/10"
                          >
                            <Heart className="w-5 h-5 mr-2 text-pink-500" />
                            Favorite
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Station List */}
            <div>
              <h2 className="text-xl font-bold mb-4">All Stations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStations.map((station) => (
                  <motion.div
                    key={station.id}
                    className={`bg-zinc-800/30 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group relative ${
                      currentStation?.id === station.id ? "ring-2 ring-[rgb(154,87,222)]" : ""
                    }`}
                    onClick={() => changeStation(station)}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 30px -10px rgba(154, 87, 222, 0.5)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(154,87,222,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

                    <div className="relative z-10 p-4">
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
                          <Image
                            src={station.image || "/placeholder.svg"}
                            alt={station.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {currentStation?.id === station.id && isPlaying && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <motion.div
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              {currentStation?.id === station.id && isPlaying ? (
                                <Pause className="w-4 h-4 text-[rgb(154,87,222)]" />
                              ) : (
                                <Play className="w-4 h-4 text-[rgb(154,87,222)] ml-0.5" />
                              )}
                            </motion.div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium group-hover:text-[rgb(154,87,222)] transition-colors duration-300">
                              {station.name}
                            </h3>
                            {station.isLive && (
                              <Badge className="bg-red-500 text-[10px] group-hover:animate-pulse">LIVE</Badge>
                            )}
                          </div>
                          <p className="text-sm text-zinc-400 mb-1 group-hover:text-zinc-300 transition-colors duration-300">
                            {station.genre}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
                              {station.frequency} FM
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
                                {station.listeners.toLocaleString()}
                              </span>
                              <Radio className="w-3 h-3 text-zinc-500 group-hover:text-[rgb(154,87,222)] transition-colors duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Animated wave effect on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Player Bar */}
        {currentStation && (
          <div className="h-[90px] bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 border-t border-zinc-800 backdrop-blur-sm flex items-center px-4 relative overflow-hidden">
            {/* Background glow effect */}
            <div className="absolute -top-20 left-1/4 w-64 h-64 rounded-full bg-[rgba(154,87,222,0.15)] blur-3xl"></div>

            {/* Hidden audio element for playback */}
            <audio ref={audioRef} className="hidden" preload="auto" crossOrigin="anonymous" />

            <div className="flex items-center gap-3 w-[30%] relative z-10">
              <motion.div
                className="w-14 h-14 bg-zinc-800 rounded-md overflow-hidden shadow-lg shadow-purple-500/10"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={currentStation.image || "/placeholder.svg"}
                  alt={currentStation.name}
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </motion.div>
              <div>
                <h4 className="font-medium">{currentStation.name}</h4>
                <p className="text-sm text-zinc-400">
                  {currentStation.genre} • {currentStation.frequency} FM
                </p>
              </div>
              <motion.button
                className="ml-4 text-zinc-400 hover:text-pink-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex-1 flex flex-col items-center relative z-10">
              <div className="flex items-center gap-6 mb-2">
                <motion.button
                  className="text-zinc-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipBack className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="w-10 h-10 bg-gradient-to-r from-[rgb(154,87,222)] to-[rgb(174,107,242)] rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </motion.button>
                <motion.button
                  className="text-zinc-400 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipForward className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 animate-pulse">LIVE</Badge>
                <span className="text-sm text-zinc-400">{currentStation.listeners.toLocaleString()} listeners</span>
              </div>
            </div>

            <div className="w-[30%] flex items-center justify-end gap-3 relative z-10">
              <motion.button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>
              <div className="w-24 h-1 bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[rgb(154,87,222)] to-[rgb(174,107,242)]"
                  style={{ width: `${volume}%` }}
                ></div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => handleVolumeChange([Number(e.target.value)])}
                  className="absolute inset-0 w-24 h-1 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Station Info Popup */}
        <AnimatePresence>
          {showStationInfo && currentStation && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-zinc-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex items-center gap-4 z-50"
            >
              <div className="w-12 h-12 rounded-md overflow-hidden">
                <Image
                  src={currentStation.image || "/placeholder.svg"}
                  alt={currentStation.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">Now Playing: {currentStation.name}</h4>
                <p className="text-sm text-zinc-400">
                  {currentStation.genre} • {currentStation.location}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
