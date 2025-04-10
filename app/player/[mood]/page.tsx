"use client"
import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Home,
  ChevronLeft,
  Play,
  Pause,
  Heart,
  MoreHorizontal,
  Radio,
  Disc,
  Mic2,
  Clock,
  Star,
  FileText,
  Plus,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define mood to genre mapping
const moodToGenre = {
  happy: "pop",
  calm: "ambient",
  romantic: "love",
  energetic: "dance",
}

interface Artist {
  id: string
  name: string
  image: string
  verified: boolean
  monthlyListeners?: number
}

interface Song {
  id: string
  title: string
  artist: string
  artistId: string
  liked: boolean
  image?: string
  audioUrl?: string
  duration?: number
  bpm?: number
}

interface Comment {
  id: string
  user: {
    name: string
    image: string
  }
  time: string
  text: string
}

export default function PlayerPage() {
  const params = useParams()
  const mood = params.mood as string
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [likedSongs, setLikedSongs] = useState<Record<string, boolean>>({})
  const [artists, setArtists] = useState<Artist[]>([])
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredArtist, setFeaturedArtist] = useState<Artist | null>(null)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [audioError, setAudioError] = useState<string | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [message, setMessage] = useState("")
  const [listeners, setListeners] = useState(67)
  const [subscribers, setSubscribers] = useState(432)
  const [isLive, setIsLive] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Create audio element on component mount
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  // Set up initial data
  useEffect(() => {
    const setupData = async () => {
      setLoading(true)
      setAudioError(null)

      try {
        // Featured artist - Young Stunners
        const youngStunners = {
          id: "1",
          name: "Young Stunners",
          image: "/images/young-stunners.png",
          verified: true,
          monthlyListeners: 4608755,
        }

        // Additional artists
        const additionalArtists = [
          {
            id: "2",
            name: "Emilee",
            image:
              "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3c/6c/e5/3c6ce5d8-5906-1631-0618-85a9d7e84418/source/300x300bb.jpg",
            verified: true,
          },
          {
            id: "3",
            name: "Billie Eilish",
            image:
              "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b0/bc/50/b0bc50be-dea8-d2f9-8360-5fe437e0b18a/source/300x300bb.jpg",
            verified: true,
          },
          {
            id: "4",
            name: "The Weeknd",
            image:
              "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/18/93/6a/18936a18-83c8-8e43-9f92-afb5d85d9a8a/source/300x300bb.jpg",
            verified: true,
          },
        ]

        // Set up songs
        const songsList = [
          {
            id: "1",
            title: "Gumaan",
            artist: "Young Stunners",
            artistId: "1",
            liked: true,
            image: "/images/young-stunners.png",
            audioUrl: "/music/surf-mesa-ily.mp3",
            duration: 176,
            bpm: 47,
          },
          {
            id: "2",
            title: "Rabtaa",
            artist: "Young Stunners",
            artistId: "1",
            liked: false,
            image: "/images/young-stunners.png",
            audioUrl: "/music/surf-mesa-ily.mp3",
            duration: 180,
            bpm: 45,
          },
          {
            id: "3",
            title: "Yaad",
            artist: "Young Stunners",
            artistId: "1",
            liked: false,
            image: "/images/young-stunners.png",
            audioUrl: "/music/surf-mesa-ily.mp3",
            duration: 165,
            bpm: 46,
          },
          {
            id: "4",
            title: "Busy Earnin'",
            artist: "Young Stunners",
            artistId: "1",
            liked: false,
            image: "/images/young-stunners.png",
            audioUrl: "/music/surf-mesa-ily.mp3",
            duration: 170,
            bpm: 48,
          },
          {
            id: "5",
            title: "Truth",
            artist: "Young Stunners",
            artistId: "1",
            liked: false,
            image: "/images/young-stunners.png",
            audioUrl: "/music/surf-mesa-ily.mp3",
            duration: 185,
            bpm: 44,
          },
          {
            id: "6",
            title: "Keep Moving",
            artist: "Young Stunners",
            artistId: "1",
            liked: false,
            image: "/images/young-stunners.png",
            audioUrl: "/music/surf-mesa-ily.mp3",
            duration: 175,
            bpm: 46,
          },
          {
            id: "7",
            title: "Casio",
            artist: "Young Stunners",
            artistId: "1",
            liked: false,
            image: "/images/young-stunners.png",
            audioUrl: "/music/surf-mesa-ily.mp3",
            duration: 168,
            bpm: 45,
          },
          {
            id: "8",
            title: "Romeo (feat. Bas)",
            artist: "Young Stunners",
            artistId: "1",
            liked: false,
            image: "/images/young-stunners.png",
            audioUrl: "/music/surf-mesa-ily.mp3",
            duration: 172,
            bpm: 47,
          },
          {
            id: "9",
            title: "Busy Earnin'",
            artist: "Young Stunners",
            artistId: "1",
            liked: false,
            image: "/images/young-stunners.png",
            audioUrl: "/music/surf-mesa-ily.mp3",
            duration: 170,
            bpm: 48,
          },
          {
            id: "10",
            title: "Truth",
            artist: "Young Stunners",
            artistId: "1",
            liked: false,
            image: "/images/young-stunners.png",
            audioUrl: "/music/surf-mesa-ily.mp3",
            duration: 185,
            bpm: 44,
          },
        ]

        // Set up comments
        const commentsList = [
          {
            id: "1",
            user: {
              name: "Chloe Taylor",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:32pm",
            text: "'The man in me and the woman in you' is one of the best lines I've heard in a minute, Madi is the best",
          },
          {
            id: "2",
            user: {
              name: "Alde Faye",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:32pm",
            text: "The tea 👀 I wonder how Teddy Geiger feels about this song about her",
          },
          {
            id: "3",
            user: {
              name: "Alyssa Burgos",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:33pm",
            text: "This is my favorite!",
          },
          {
            id: "4",
            user: {
              name: "Ammaar West",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:34pm",
            text: "10/10 flawless drumming",
          },
          {
            id: "5",
            user: {
              name: "Joseph Curd",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:34pm",
            text: "I didn't know she played drums?",
          },
          {
            id: "6",
            user: {
              name: "Maleah Panter",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:35pm",
            text: "so good ❤️",
          },
          {
            id: "7",
            user: {
              name: "Kara Anacleto",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:36pm",
            text: "This is gorgeous",
          },
          {
            id: "8",
            user: {
              name: "Rachel Sweeney",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:36pm",
            text: "one more song for my Like playlist",
          },
          {
            id: "9",
            user: {
              name: "Chad Akers",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:36pm",
            text: "lol",
          },
          {
            id: "10",
            user: {
              name: "Matt Walker (You)",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:36pm",
            text: "Any requests?",
          },
          {
            id: "11",
            user: {
              name: "Jada",
              image: "/placeholder.svg?height=40&width=40",
            },
            time: "2:39pm",
            text: "The Staves have a new album!",
          },
        ]

        // Combine artists
        const allArtists = [youngStunners, ...additionalArtists]

        setArtists(allArtists)
        setSongs(songsList)
        setFeaturedArtist(youngStunners)
        setComments(commentsList)

        // Set Gumaan song as current song
        setCurrentSong(songsList[0])

        // Initialize liked songs
        const initialLikedSongs: Record<string, boolean> = {}
        songsList.forEach((song) => {
          initialLikedSongs[song.id] = song.liked
        })
        setLikedSongs(initialLikedSongs)

        // Preload the audio source
        if (audioRef.current && songsList[0].audioUrl) {
          console.log("Preloading audio source:", songsList[0].audioUrl)
          audioRef.current.src = songsList[0].audioUrl
          audioRef.current.load()
        }
      } catch (error) {
        console.error("Error setting up music data:", error)
        setAudioError("Failed to load music data")
      } finally {
        setLoading(false)
      }
    }

    setupData()
  }, [mood])

  // Set up audio event listeners
  useEffect(() => {
    if (!audioRef.current) return

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
    }

    const handleError = (e: Event) => {
      console.error("Audio playback error:", e)
      setIsPlaying(false)
      setAudioError("Failed to play audio. Please try another song.")
    }

    // Add event listeners
    audioRef.current.addEventListener("ended", handleEnded)
    audioRef.current.addEventListener("error", handleError)

    // Set volume
    audioRef.current.volume = volume / 100
    audioRef.current.muted = isMuted

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded)
        audioRef.current.removeEventListener("error", handleError)
      }
    }
  }, [volume, isMuted])

  // Update audio source when current song changes
  useEffect(() => {
    if (!currentSong?.audioUrl || !audioRef.current) return

    console.log("Current song changed to:", currentSong.title)

    // Check if the source actually needs to be updated
    const currentSrc = audioRef.current.src
    const newSrc = currentSong.audioUrl
    const needsSourceUpdate = !currentSrc.endsWith(newSrc.split("/").pop() || "")

    if (needsSourceUpdate) {
      console.log("Updating audio source to:", newSrc)
      // Reset progress for new songs
      setProgress(0)
      setAudioError(null)

      // Update audio source
      audioRef.current.src = newSrc
      audioRef.current.load()
    }

    // If was playing, continue playing the new song
    if (isPlaying) {
      // Small timeout to allow the browser to register the new source
      setTimeout(() => {
        if (audioRef.current) {
          console.log("Attempting to play after source change")
          const playPromise = audioRef.current.play()

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Playback started successfully
                console.log("Playback started successfully after source change")
                startProgressTracking()
              })
              .catch((err) => {
                console.error("Failed to play audio after source change:", err)
                setIsPlaying(false)
                setAudioError(`Playback was blocked: ${err.message}. Try clicking play again.`)
              })
          }
        }
      }, 100)
    }
  }, [currentSong, isPlaying])

  // Start/stop progress tracking based on isPlaying state
  const startProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    progressIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const duration = currentSong?.duration || audioRef.current.duration || 30
        const currentTime = audioRef.current.currentTime
        const progressPercent = (currentTime / duration) * 100
        setProgress(progressPercent)
      }
    }, 100)
  }

  // Update the togglePlay function to ensure it doesn't reset position
  const togglePlay = () => {
    if (!currentSong?.audioUrl || !audioRef.current) {
      setAudioError("No audio available for this song")
      return
    }

    setAudioError(null)

    // Make sure the audio element has a valid source
    if (!audioRef.current.src || audioRef.current.src === window.location.href) {
      console.log("Setting audio source before playing:", currentSong.audioUrl)
      audioRef.current.src = currentSong.audioUrl
      audioRef.current.load()
    }

    if (isPlaying) {
      // Pause - this preserves the current position
      audioRef.current.pause()

      // Stop progress tracking but don't reset progress
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }

      setIsPlaying(false)
    } else {
      // Play from current position - no need to reset anything
      try {
        console.log("Attempting to play audio from source:", audioRef.current.src)
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
              console.log("Playback started successfully")
              setIsPlaying(true)
              startProgressTracking()
            })
            .catch((err) => {
              console.error("Failed to play audio:", err)
              setAudioError(`Playback was blocked: ${err.message}. Try clicking play again.`)
            })
        }
      } catch (err) {
        console.error("Error attempting to play:", err)
        setAudioError("Error playing audio. Please try again.")
      }
    }
  }

  // Update the playSong function to ensure audio source is properly set
  const playSong = (song: Song) => {
    // If it's the same song that's already playing, just toggle play/pause
    if (currentSong?.id === song.id) {
      togglePlay()
      return
    }

    // Otherwise, set the new song (this is a different song, so we do want to start from beginning)
    setCurrentSong(song)

    // Explicitly set the audio source and load it
    if (audioRef.current && song.audioUrl) {
      console.log("Setting new song source:", song.audioUrl)

      // Stop any current playback
      if (isPlaying) {
        audioRef.current.pause()
      }

      // Set new source
      audioRef.current.src = song.audioUrl
      audioRef.current.load()

      // Set isPlaying to true - the useEffect will handle actual playback
      setIsPlaying(true)
    }
  }

  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0]
    setProgress(newProgress)

    if (audioRef.current && currentSong) {
      const duration = currentSong.duration || audioRef.current.duration || 30
      audioRef.current.currentTime = (newProgress / 100) * duration
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)

    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const getCurrentTime = () => {
    if (!audioRef.current || !currentSong) return "0:00"

    const duration = currentSong.duration || audioRef.current.duration || 30
    const currentTime = (progress / 100) * duration
    return formatTime(currentTime)
  }

  const getTotalTime = () => {
    if (!currentSong) return "0:30"

    const duration = currentSong.duration || 30
    return formatTime(duration)
  }

  const toggleLike = (songId: string) => {
    setLikedSongs((prevLikedSongs) => ({
      ...prevLikedSongs,
      [songId]: !prevLikedSongs[songId],
    }))
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newComment: Comment = {
      id: `${comments.length + 1}`,
      user: {
        name: "Matt Walker (You)",
        image: "/placeholder.svg?height=40&width=40",
      },
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: message,
    }

    setComments([...comments, newComment])
    setMessage("")
  }

  const toggleLive = () => {
    setIsLive(!isLive)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-orange-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading your music...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      {/* Audio element - hidden but accessible */}
      <audio
        className="hidden"
        ref={audioRef}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.error("Audio error:", e)
          setAudioError("Error loading audio. Please check the audio source.")
        }}
      />

      {/* Audio error message */}
      {audioError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-md">
          {audioError}
        </div>
      )}

      {/* Left Sidebar */}
      <div className="w-[212px] bg-[#121212] border-r border-zinc-800 flex flex-col h-screen">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[rgb(154,87,222)] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18V6L21 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="2" />
              <circle cx="18" cy="15" r="3" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[rgb(154,87,222)] to-white bg-clip-text text-transparent">
            Museify
          </h1>
        </div>

        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 px-6 py-2 text-white bg-[rgb(154,87,222)]/10 border-l-4 border-[rgb(154,87,222)]"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/artists" className="flex items-center gap-3 px-6 py-2 text-zinc-400 hover:text-white">
                <Search className="w-5 h-5" />
                <span>Artists</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-6 py-2 text-zinc-400 hover:text-white">
                <Radio className="w-5 h-5" />
                <span>Radio</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-6 py-2 text-zinc-400 hover:text-white">
                <Disc className="w-5 h-5" />
                <span>Albums</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 px-6 py-2 text-zinc-400 hover:text-white">
                <Mic2 className="w-5 h-5" />
                <span>Podcast</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8 px-6">
          <h2 className="text-xs font-semibold text-zinc-400 mb-4">LIBRARY</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="flex items-center gap-3 py-2 text-zinc-400 hover:text-white">
                <Clock className="w-5 h-5" />
                <span>Recently Added</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 py-2 text-zinc-400 hover:text-white">
                <Star className="w-5 h-5" />
                <span>Favorite Songs</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 py-2 text-zinc-400 hover:text-white">
                <FileText className="w-5 h-5" />
                <span>Local Files</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-8 px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-zinc-400">PLAYLIST</h2>
            <button className="text-zinc-400 hover:text-white">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="flex items-center gap-3 py-2 text-zinc-400 hover:text-white">
                <span>Lo-fi Music</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 py-2 text-zinc-400 hover:text-white">
                <span>Best of Bon Jovi</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 py-2 text-zinc-400 hover:text-white">
                <span>Best of John Mayer</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-8 px-6">
          <h2 className="text-xs font-semibold text-zinc-400 mb-4">TOP STREAMERS</h2>
          <ul className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-md overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=40&width=40`}
                      alt="Streamer"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mistletoe</p>
                    <p className="text-xs text-zinc-400">Justin Bieber</p>
                  </div>
                </div>
                <button className="text-zinc-400 hover:text-white">
                  <Heart className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navigation */}
        <div className="flex items-center justify-between p-4 bg-[#121212]">
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="relative flex-1 w-[500px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search music, artist, albums..."
                className="w-full bg-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm"
              />
            </div>
          </div>
          <button className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Artist Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Artist Header */}
            <div className="relative mb-8">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                {featuredArtist && (
                  <Image
                    src={featuredArtist.image || "/placeholder.svg"}
                    alt={featuredArtist.name}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500 rounded-full p-1">
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">ARTIST</span>
                    </div>
                    <h1 className="text-6xl font-bold mb-2">Young Stunners</h1>
                    <p className="text-zinc-300 mb-4">
                      {featuredArtist?.monthlyListeners?.toLocaleString()} monthly listeners
                    </p>

                    <div className="flex items-center gap-4 mt-6">
                      <Button
                        onClick={togglePlay}
                        className="bg-[rgb(154,87,222)] hover:bg-[rgb(154,87,222)/90] text-black rounded-full px-8 py-2 font-medium flex items-center gap-2"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        {isPlaying ? "PAUSE" : "FOLLOWING"}
                      </Button>
                      <button className="text-zinc-400 hover:text-white">
                        <MoreHorizontal className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Status */}
                <div className="absolute top-4 right-4 flex items-center gap-4">
                  {isLive && <div className="bg-red-500 text-white px-4 py-1 rounded-md font-medium text-sm">LIVE</div>}
                  <Button
                    onClick={toggleLive}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-1 font-medium text-sm"
                  >
                    {isLive ? "END STREAM" : "START STREAM"}
                  </Button>
                  <button className="bg-zinc-800/80 rounded-full p-1">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Stats */}
                <div className="absolute top-4 right-40 flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-3xl font-bold">{listeners}</p>
                    <p className="text-sm text-zinc-400">Listening</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[rgb(154,87,222)]">
                      {subscribers}
                      <span className="text-sm">↑</span>
                    </p>
                    <p className="text-sm text-zinc-400">Subscribers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-2 gap-8">
              {/* Popular Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Popular</h2>
                <div className="space-y-2">
                  {songs.slice(0, 10).map((song, index) => (
                    <div
                      key={song.id}
                      className={`flex items-center justify-between p-2 hover:bg-zinc-800/30 rounded-md cursor-pointer ${
                        currentSong?.id === song.id ? "bg-zinc-800/50" : ""
                      }`}
                      onClick={() => playSong(song)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-6 text-center text-zinc-400">{index + 1}</span>
                        <div className="w-10 h-10 bg-zinc-800 rounded-md overflow-hidden relative">
                          <Image
                            src={song.image || '/placeholder.svg?height=40&width=40"'}
                            alt={song.title}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                          {currentSong?.id === song.id && isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <p
                            className={`font-medium ${currentSong?.id === song.id && isPlaying ? "text-[rgb(154,87,222)]" : ""}`}
                          >
                            {song.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          className="text-zinc-400 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(song.id)
                          }}
                        >
                          <Heart className={`w-5 h-5 ${likedSongs[song.id] ? "fill-red-500 text-red-500" : ""}`} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Artist Pick Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Artist pick</h2>
                <div className="bg-zinc-900 rounded-md p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-zinc-800 rounded-md overflow-hidden relative">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Album cover"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-white text-black text-xs px-2 py-0.5 rounded-full">
                        Loving in Stereo out now!
                      </div>
                    </div>
                    <p className="font-medium">Loving in Stereo</p>
                    <p className="text-sm text-zinc-400">Album</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Chat */}
          <div className="w-[350px] border-l border-zinc-800 flex flex-col">
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="bg-zinc-800 rounded-md p-2">
                  <Image
                    src={currentSong?.image || "/placeholder.svg?height=48&width=48"}
                    alt={currentSong?.title || "Now playing"}
                    width={48}
                    height={48}
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Gumaan</h3>
                  <p className="text-sm text-zinc-400">Young Stunners</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm">{currentSong?.bpm} BPM</p>
                  <p className="text-sm text-zinc-400">3:18</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="queue" className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-2 mx-4 mt-2">
                <TabsTrigger value="queue">QUEUE</TabsTrigger>
                <TabsTrigger value="chat">CHAT</TabsTrigger>
              </TabsList>

              <TabsContent value="queue" className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {songs.slice(0, 5).map((song) => (
                    <div key={song.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-800 rounded-md overflow-hidden">
                        <Image
                          src={song.image || "/placeholder.svg?height=40&width=40"}
                          alt={song.title}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{song.title}</p>
                        <p className="text-sm text-zinc-400">{song.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="chat" className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-zinc-800 rounded-full overflow-hidden">
                          <Image
                            src={comment.user.image || "/placeholder.svg"}
                            alt={comment.user.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{comment.user.name}</p>
                            <span className="text-xs text-zinc-400">{comment.time}</span>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-zinc-800 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="You"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Send a message..."
                      className="flex-1 bg-zinc-800 rounded-full py-2 px-4 text-sm"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-[rgb(154,87,222)] hover:bg-[rgb(154,87,222)/90] text-black rounded-full px-4 py-2 font-medium"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Bottom Player */}
      <div className="w-full h-[90px] bg-[#121212] border-t border-zinc-800 flex items-center justify-between p-4">
        {/* Song Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-zinc-800 rounded-md overflow-hidden">
            <Image
              src={currentSong?.image || "/placeholder.svg?height=64&width=64"}
              alt={currentSong?.title || "Now playing"}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{currentSong?.title || "No song selected"}</p>
            <p className="text-sm text-zinc-400">{currentSong?.artist || "No artist"}</p>
          </div>
          <button
            className="text-zinc-400 hover:text-white"
            onClick={() => {
              if (currentSong) {
                toggleLike(currentSong.id)
              }
            }}
          >
            <Heart
              className={`w-5 h-5 ${currentSong?.id && likedSongs[currentSong.id] ? "fill-red-500 text-red-500" : ""}`}
            />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11 5L6 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 5L13 9L18 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 19L6 15L11 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 19L13 15L18 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button onClick={togglePlay} className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              {isPlaying ? <Pause className="w-6 h-6 text-black" /> : <Play className="w-6 h-6 text-black" />}
            </button>
            <button className="text-zinc-400 hover:text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 5L18 9L13 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 5L11 9L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 19L18 15L13 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 19L11 15L6 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="w-[500px] flex items-center gap-4 mt-2">
            <span className="text-sm text-zinc-400">{getCurrentTime()}</span>
            <input
              type="range"
              min={0}
              max={100}
              value={[progress]}
              className="w-full h-1 bg-zinc-700 rounded-full appearance-none cursor-pointer"
              onChange={(e) => handleProgressChange([Number(e.target.value)])}
            />
            <span className="text-sm text-zinc-400">{getTotalTime()}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-4">
          <button onClick={toggleMute} className="text-zinc-400 hover:text-white">
            {isMuted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9H7L12 4V20L7 15H3V9ZM16.47 14.47L19 17L17.59 18.41L15.17 16H14V14H16.47ZM16.47 9.53L14 12H14.17L15.41 10.76L17.59 5.59L19 7.01L16.47 9.53Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 9H7L12 4V20L7 15H3V9ZM14 11V13H16.17L18.41 15.24L19 14.64L16.76 12.41L14 11ZM16.76 6.76L19 4.59L18.41 4L16.17 6H14V8H16.41L18.41 9.99L19 9.39L16.76 6.76Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={[volume]}
            className="w-[120px] h-1 bg-zinc-700 rounded-full appearance-none cursor-pointer"
            onChange={(e) => handleVolumeChange([Number(e.target.value)])}
          />
        </div>
      </div>
    </div>
  )
}
