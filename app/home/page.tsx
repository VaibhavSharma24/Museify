"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
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
  Heart,
  ChevronLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Maximize2,
  ListMusic,
  Bell,
  MoreHorizontal,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MusicQuiz } from "@/components/music-quiz"
import { ProfilePopup } from "@/components/profile-popup"
import { toast } from "@/components/ui/use-toast"

// Define types for our data
interface Mix {
  id: string
  title: string
  image: string
  artists: string[]
}

interface Song {
  id: string
  title: string
  artist: string
  image: string
  duration: string
  playedAt?: string
  liked?: boolean
  audioUrl?: string
}

interface Artist {
  id: string
  name: string
  image: string
}

interface Category {
  id: string
  name: string
  image: string
}

// Memoized MixCard component to prevent re-renders
const MixCard = memo(({ mix, size = "large" }: { mix: Mix; size?: "small" | "large" }) => (
  <div className={`group relative ${size === "small" ? "w-full" : "w-[200px]"}`}>
    <div className="relative overflow-hidden rounded-md aspect-square bg-zinc-800 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(154,87,222,0.5)] group-hover:-translate-y-1">
      <Image
        src={mix.image || "/placeholder.svg"}
        alt={mix.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
      <button className="absolute bottom-2 right-2 w-10 h-10 bg-[rgb(154,87,222)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 hover:bg-[rgb(174,107,242)]">
        <Play className="w-5 h-5 text-black" />
      </button>
    </div>
    <div className="mt-2">
      <h3 className="font-medium truncate group-hover:text-[rgb(154,87,222)] transition-colors duration-300">
        {mix.title}
      </h3>
      <p className="text-sm text-zinc-400 truncate">{mix.artists.join(", ")}</p>
    </div>
  </div>
))

MixCard.displayName = "MixCard"

// Memoized MorningMixCard component
const MorningMixCard = memo(({ mix }: { mix: Mix }) => (
  <div className="group relative flex items-center bg-zinc-800/50 hover:bg-zinc-700/70 rounded-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_10px_rgba(154,87,222,0.3)] hover:-translate-y-0.5">
    <div className="w-12 h-12 mr-3 overflow-hidden">
      <Image
        src={mix.image || "/placeholder.svg"}
        alt={mix.title}
        width={48}
        height={48}
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <span className="font-medium group-hover:text-[rgb(154,87,222)] transition-colors duration-300">{mix.title}</span>
    <button className="absolute right-2 w-8 h-8 bg-[rgb(154,87,222)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-[rgb(174,107,242)]">
      <Play className="w-4 h-4 text-black" />
    </button>
  </div>
))

MorningMixCard.displayName = "MorningMixCard"

// Memoized SongRow component
const SongRow = memo(
  ({
    song,
    index,
    isCurrentSong,
    isPlaying,
    isLiked,
    onPlay,
    onToggleLike,
  }: {
    song: Song
    index: number
    isCurrentSong: boolean
    isPlaying: boolean
    isLiked: boolean
    onPlay: () => void
    onToggleLike: (e: React.MouseEvent) => void
  }) => (
    <tr className={`hover:bg-zinc-700/30 ${isCurrentSong ? "bg-zinc-700/50" : ""}`}>
      <td className="px-4 py-3 text-sm text-zinc-400">{index + 1}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
            <Image
              src={song.image || "/placeholder.svg"}
              alt={song.title}
              width={40}
              height={40}
              className="object-cover"
            />
            {isCurrentSong && isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            )}
          </div>
          <div>
            <p className={`font-medium ${isCurrentSong && isPlaying ? "text-[rgb(154,87,222)]" : ""}`}>{song.title}</p>
          </div>
        </div>
      </td>
      <td
        className={`px-4 py-3 text-sm hidden md:table-cell ${isCurrentSong && isPlaying ? "text-[rgb(154,87,222)]" : "text-zinc-400"}`}
      >
        {song.artist}
      </td>
      <td
        className={`px-4 py-3 text-sm text-right hidden md:table-cell ${isCurrentSong && isPlaying ? "text-[rgb(154,87,222)]" : "text-zinc-400"}`}
      >
        {song.duration}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-3">
          <button className="text-zinc-400 hover:text-white" onClick={onPlay}>
            {isCurrentSong && isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button className="text-zinc-400 hover:text-white" onClick={onToggleLike}>
            <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <button className="text-zinc-400 hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  ),
)

SongRow.displayName = "SongRow"

// Memoized RecentPlayedItem component
const RecentPlayedItem = memo(({ song }: { song: Song }) => (
  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-x-1 group cursor-pointer">
    <div className="w-10 h-10 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
      <Image src={song.image || "/placeholder.svg"} alt={song.title} width={40} height={40} className="object-cover" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="font-medium text-sm truncate group-hover:text-[rgb(154,87,222)] transition-colors duration-300">
        {song.title}
      </p>
      <p className="text-xs text-zinc-400 truncate group-hover:text-zinc-300 transition-colors duration-300">
        {song.artist}
      </p>
    </div>
    <div className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
      {song.playedAt}
    </div>
  </div>
))

RecentPlayedItem.displayName = "RecentPlayedItem"

// Memoized CategoryCard component
const CategoryCard = memo(({ category }: { category: Category }) => (
  <div className="relative rounded-lg overflow-hidden aspect-[2/1] group cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(154,87,222,0.4)]">
    <Image
      src={category.image || "/placeholder.svg"}
      alt={category.name}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/30 group-hover:bg-gradient-to-t group-hover:from-[rgba(154,87,222,0.6)] group-hover:to-black/40 transition-all duration-300 flex items-center justify-center">
      <h3 className="font-bold text-lg group-hover:text-white group-hover:scale-110 transition-all duration-300">
        {category.name}
      </h3>
    </div>
  </div>
))

CategoryCard.displayName = "CategoryCard"

// Interactive title component for "Good morning"
const InteractiveTitle = memo(({ text }: { text: string }) => {
  return (
    <h2 className="text-2xl font-bold">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-colors duration-200 ${
            char === " " ? "mr-1" : "hover:text-[rgb(154,87,222)] hover:scale-110"
          }`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  )
})

InteractiveTitle.displayName = "InteractiveTitle"

// Section component for reusability
const Section = memo(
  ({
    title,
    children,
    showAll = true,
  }: {
    title: string
    children: React.ReactNode
    showAll?: boolean
  }) => (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {title === "Good Morning" ? (
          <InteractiveTitle text="Good Morning" />
        ) : (
          <h2 className="text-2xl font-bold">{title}</h2>
        )}
        {showAll && <button className="text-sm text-zinc-400 hover:text-white">see all</button>}
      </div>
      {children}
    </section>
  ),
)

Section.displayName = "Section"

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moodParam = searchParams.get("mood")

  const [currentMood, setCurrentMood] = useState(moodParam || "lofi")
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [totalTime, setTotalTime] = useState("0:00")
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(75)
  const [likedSongs, setLikedSongs] = useState<Record<string, boolean>>({})
  const [audioError, setAudioError] = useState<string | null>(null)
  const [attemptedAutoPlay, setAttemptedAutoPlay] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [showFeaturedSong, setShowFeaturedSong] = useState(true)

  const pathname = usePathname()

  // Use a ref for the audio element to maintain a reference across renders
  const audioElementRef = useRef<HTMLAudioElement | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressUpdateRef = useRef<number>(0)

  // Mock data for morning mixes
  const morningMixes: Mix[] = [
    {
      id: "1",
      title: "Chill Mix",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.09-jVo3wFizNt05xH7LYfuCqDsKNYjdqW.png",
      artists: ["Julia Wolf", "Khalid", "ayokay"],
    },
    {
      id: "2",
      title: "Pop Mix",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.05-3i94xP4YTYWq8DTI2akf9IJ157wloA.png",
      artists: ["The Weeknd", "Dua Lipa", "Taylor Swift"],
    },
    {
      id: "3",
      title: "Daily Mix 1",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.05%20%281%29-1dXDl1VWNYRGjeNua38einkNcK4VE9.png",
      artists: ["Ed Sheeran", "Shawn Mendes", "Justin Bieber"],
    },
    {
      id: "4",
      title: "Daily Mix 5",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.06-Cqoetxk7MR78DzVcNwdaTE02GqNpJO.png",
      artists: ["Post Malone", "Drake", "Travis Scott"],
    },
    {
      id: "5",
      title: "Folk & Acoustic Mix",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.06%20%281%29-1u3AFOkXx8jU7Y0rbFQvrGRyEAgpzS.png",
      artists: ["Mumford & Sons", "The Lumineers", "Vance Joy"],
    },
    {
      id: "6",
      title: "Daily Mix 4",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.06%20%282%29-lnOFRicZ0oxDrwzq1DcBElsrYDMMo3.png",
      artists: ["Imagine Dragons", "OneRepublic", "Coldplay"],
    },
  ]

  // Mock data for made for you
  const madeForYou: Mix[] = [
    {
      id: "11",
      title: "Vinyl Classics",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.05%20%284%29-XRTSEdIkjbhXCR4xtspcqK1G801Tbq.png",
      artists: ["Nina Simone", "Fleetwood Mac", "The Beatles"],
    },
    {
      id: "12",
      title: "Live Concert Mix",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.05%20%282%29-2C4zUqgt8utaBKMcjgl6rHl8bZ7sKX.png",
      artists: ["Coldplay", "U2", "Florence + The Machine"],
    },
    {
      id: "13",
      title: "DJ Sessions",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.05-RE5qoaGYAkZVGx5NaseBo6NgsvmwzK.png",
      artists: ["David Guetta", "Calvin Harris", "Tiësto"],
    },
    {
      id: "14",
      title: "Acoustic Performances",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202022-06-04%20at%2020.05%20%281%29-FoGBwB7Qh9KN9tvKJXGGzcw6VsauY0.png",
      artists: ["John Mayer", "Ed Sheeran", "Adele"],
    },
  ]

  // Mock data for popular songs - using direct URLs for all songs
  const popularSongs: Song[] = [
    {
      id: "1",
      title: "Shape of You",
      artist: "Ed Sheeran",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%206150-u19tvNCgqeOieIgoFyElwdyb80Q5Nh.png",
      duration: "3:53",
      liked: true,
      // Using the provided Shape of You audio file
      audioUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ed%20Sheeran%20-%20Shape%20of%20You%20%28Official%20Music%20Video%29-ZsIzipy8B2CRDzMKw7kJQyC6vSAlWl.mp3",
    },
    {
      id: "2",
      title: "Tu Aake Dekhle",
      artist: "King",
      image: "/images/tu-aake-dekhle.jpeg",
      duration: "3:20",
      liked: false,
      audioUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/King%20-%20Tu%20Aake%20Dekhle%20%20The%20Carnival%20%20The%20Last%20Ride%20%20Prod.%20by%20Shahbeatz%20%20Latest%20Hit%20Songs%202020-YVUlorMaAttlrWRd5xfDbKbLVJAnPL.mp3",
    },
    {
      id: "3",
      title: "ily (i love you baby)",
      artist: "Surf Mesa ft. Emilee",
      image: "/images/surf-mesa-ily.jpeg",
      duration: "2:54",
      liked: false,
      // Updated to use direct URL instead of local file
      audioUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Surf%20Mesa%20-%20ily%20%28i%20love%20you%20baby%29%28feat.%20Emilee%29%20%5BOfficial%20Audio%5D-oHLG9q0S9uM9qWNQUtDhpYbqDzMJQl.mp3",
    },
    {
      id: "4",
      title: "Tum se hi",
      artist: "Pritam, Mohit Chauhan",
      image: "/images/tum-se-hi.jpeg",
      duration: "5:22",
      liked: true,
      // Updated to use direct URL instead of local file
      audioUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Full%20Video_%20Tum%20Se%20Hi%20%20Jab%20We%20Met%20%20Kareena%20Kapoor%2C%20Shahid%20Kapoor%20%20Mohit%20Chauhan%20%20Pritam-YcbNNs9h3u5p0yCe7YMvDEtlcn7NkV.mp3",
    },
    {
      id: "5",
      title: "APT.",
      artist: "ROSÉ & Bruno Mars",
      image: "/images/apt-rose-bruno-mars.jpeg",
      duration: "3:05",
      liked: false,
      audioUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ROSE%20%26%20Bruno%20Mars%20-%20APT.%20%28Official%20Music%20Video%29-hoCBAARX9cpx3PlvQ1REffNu3PEm8y.mp3",
    },
    {
      id: "6",
      title: "Blue",
      artist: "Yung Kai",
      image: "/images/blue-yung-kai.png",
      duration: "2:42",
      liked: false,
      audioUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yung%20kai%20-%20blue%20%28Lyrics%29-wVKPIC4PVcBO1GxsRGnPoLrjMQmzEI.mp3",
    },
    {
      id: "7",
      title: "Levitating",
      artist: "Dua Lipa ft. DaBaby",
      image: "/images/levitating-dua-lipa.jpeg",
      duration: "3:23",
      liked: true,
      audioUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dua%20Lipa%20-%20Levitating%20Featuring%20DaBaby%20%28Official%20Music%20Video%29-NRQVddnWhWhW4LmWM2895Nw4hUNGKS.mp3",
    },
    {
      id: "8",
      title: "Husn",
      artist: "Anuv Jain",
      image: "/images/husn-anuv-jain.jpeg",
      duration: "3:42",
      liked: false,
      audioUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Anuv%20Jain%20-%20HUSN%20%28Official%20Video%29-dUNxE4Ww3GDvSnmb93wnmHFnZBJqIc.mp3",
    },
  ]

  // Mock data for fans also like
  const fansAlsoLike: Artist[] = [{ id: "1", name: "James Arthur", image: "/images/james-arthur.png" }]

  // Mock data for recent played
  const recentPlayed: Song[] = [
    {
      id: "1",
      title: "Perfect",
      artist: "Ed Sheeran",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%206166-oXIGkPVMFa6NPNZ7Y9Yj8X71nBA18D.png",
      duration: "4:23",
      playedAt: "2min ago",
    },
    {
      id: "2",
      title: "Roman Picisan",
      artist: "Hanin Dhiya, Alffy Rev",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%206166%20%2810%29-9gpTNXk39d2hDoKpFmSEa7z1ejmDTX.png",
      duration: "3:45",
      playedAt: "8min ago",
    },
    {
      id: "3",
      title: "Title (Deluxe)",
      artist: "Meghan Trainor",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%206166%20%2812%29-XgfnrJHr4vdKpyvjZRJGpLTxKuDeZq.png",
      duration: "3:09",
      playedAt: "1hr ago",
    },
    {
      id: "4",
      title: "Shiver",
      artist: "Ed Sheeran",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%206166%20%281%29-TLlFH8r1aVMBBUFTpxpXBvlS0t8UQx.png",
      duration: "3:47",
      playedAt: "4hr ago",
    },
    {
      id: "5",
      title: "Feel Something",
      artist: "Jaymes Young",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%206166-yiPHQIRoHG2wsIwdclii6jCQreh0f0.png",
      duration: "3:55",
      playedAt: "5hr ago",
    },
    {
      id: "6",
      title: "Shape of You",
      artist: "Ed Sheeran",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%206166-oXIGkPVMFa6NPNZ7Y9Yj8X71nBA18D.png",
      duration: "3:53",
      playedAt: "12hr ago",
    },
    {
      id: "7",
      title: "Bad Habits",
      artist: "Ed Sheeran",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%206166%20%281%29-TLlFH8r1aVMBBUFTpxpXBvlS0t8UQx.png",
      duration: "3:50",
      playedAt: "14hr ago",
    },
  ]

  // Mock data for categories
  const categories: Category[] = [
    {
      id: "1",
      name: "Pop",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unsplash_kFRKvJQtNHg-13G39kU3wetw8ziCaYQl0GQBtOSGmC.png",
    },
    {
      id: "2",
      name: "Podcast",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unsplash_gKKB13zJ1ss-1ahI6B16kw1VFNmMUC8BbcRA4D6vlU.png",
    },
    {
      id: "3",
      name: "Romance",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unsplash_cNGUw-CEsp0-ik3pF9EBFIIpl9Hs4Ru3fpmXt8ioaH.png",
    },
    {
      id: "4",
      name: "Rock",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unsplash_dBdxW36Mxd8-Ik3pF9EBFIIpl9Hs4Ru3fpmXt8ioaH.png",
    },
    {
      id: "5",
      name: "Chill",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unsplash_9rZuPJmTMZs-Ik3pF9EBFIIpl9Hs4Ru3fpmXt8ioaH.png",
    },
    {
      id: "6",
      name: "Christmas",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unsplash_SBdmQcW8qag-Srz4jOafa4MWPHtpXsnrnwlSDsPi47.png",
    },
    {
      id: "7",
      name: "Hip Hop",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unsplash_RLH_Wmlnj2k.png-Ik3pF9EBFIIpl9Hs4Ru3fpmXt8ioaH.png",
    },
    {
      id: "8",
      name: "Jazz",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unsplash_A10y2Eq7OHY.png-Ik3pF9EBFIIpl9Hs4Ru3fpmXt8ioaH.png",
    },
  ]

  // Function to handle back button click
  const handleBackClick = useCallback(() => {
    // Navigate to the mood selection page
    router.push("/mood-selection")
  }, [router])

  // Set current song and initialize liked songs on component mount
  useEffect(() => {
    // Check if the mood is "happy" and prioritize "Shape of You"
    const initialSong =
      moodParam === "happy"
        ? popularSongs.find((song) => song.title === "Shape of You") || popularSongs[0]
        : popularSongs[0]

    setCurrentSong(initialSong)
    setTotalTime(initialSong.duration)
    setCurrentTime("0:00")
    setProgress(0)

    // Initialize liked songs
    const initialLikedSongs: Record<string, boolean> = {}
    popularSongs.forEach((song) => {
      initialLikedSongs[song.id] = song.liked || false
    })
    setLikedSongs(initialLikedSongs)

    // Create audio element if it doesn't exist
    if (!audioElementRef.current) {
      audioElementRef.current = new Audio()

      // Enable low latency mode where supported
      if ("mozAutoplayEnabled" in audioElementRef.current) {
        // @ts-ignore - Firefox-specific property
        audioElementRef.current.mozAutoplayEnabled = true
      }

      // Set preload attribute
      audioElementRef.current.preload = "auto"

      // Set up event listeners
      audioElementRef.current.addEventListener("play", () => setIsPlaying(true))
      audioElementRef.current.addEventListener("pause", () => setIsPlaying(false))
      audioElementRef.current.addEventListener("ended", () => {
        setIsPlaying(false)
        setProgress(0)
      })
      audioElementRef.current.addEventListener("timeupdate", updateProgress)
      audioElementRef.current.addEventListener("error", handleAudioError)
      audioElementRef.current.addEventListener("canplaythrough", () => {
        console.log("Audio can play through without buffering")
      })

      // Set initial volume
      audioElementRef.current.volume = volume / 100
    }

    // Cleanup function
    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause()
        audioElementRef.current.removeEventListener("play", () => setIsPlaying(true))
        audioElementRef.current.removeEventListener("pause", () => setIsPlaying(false))
        audioElementRef.current.removeEventListener("ended", () => {
          setIsPlaying(false)
          setProgress(0)
        })
        audioElementRef.current.removeEventListener("timeupdate", updateProgress)
        audioElementRef.current.removeEventListener("error", handleAudioError)
      }
    }
  }, [moodParam])

  // Update progress function for timeupdate event - optimized to reduce re-renders
  const updateProgress = useCallback(() => {
    if (audioElementRef.current && currentSong) {
      const duration = timeToSeconds(currentSong.duration)
      const currentTime = audioElementRef.current.currentTime
      const progressPercent = (currentTime / duration) * 100

      // Only update state if progress has changed significantly (0.5%)
      if (Math.abs(progressPercent - progressUpdateRef.current) > 0.5) {
        progressUpdateRef.current = progressPercent
        setProgress(progressPercent)
        setCurrentTime(secondsToTime(currentTime))
      }
    }
  }, [currentSong])

  // Handle audio error function
  const handleAudioError = useCallback((e: Event) => {
    const audioElement = e.target as HTMLAudioElement
    console.error("HTML Audio element error:", audioElement.error)
    setAudioError(`Error playing audio: ${audioElement.error?.message || "Unknown error"}. Please try another song.`)
  }, [])

  // Connect to the HTML audio element
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = volume / 100
    }
  }, [volume])

  // Start/stop progress tracking based on isPlaying state
  useEffect(() => {
    if (isPlaying) {
      startProgressTracking()
    } else if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }, [isPlaying])

  // Update audio source when current song changes
  useEffect(() => {
    if (!currentSong?.audioUrl) return

    console.log("Current song changed to:", currentSong.title)
    setAudioError(null)

    // Reset attempted autoplay flag when song changes
    setAttemptedAutoPlay(false)

    // Validate the audio URL
    const audioUrl = currentSong.audioUrl.trim()
    if (!audioUrl) {
      console.error("Empty audio URL detected")
      setAudioError("No valid audio URL available for this song")
      return
    }

    // Update the HTML audio element
    if (audioElementRef.current) {
      try {
        // Pause any current playback
        audioElementRef.current.pause()

        // Don't set src if it's empty
        audioElementRef.current.src = audioUrl
        console.log("Set HTML audio element source to:", audioUrl)
        audioElementRef.current.load()
      } catch (err) {
        console.error("Error setting HTML audio element source:", err)
        setAudioError(`Error setting audio source: ${err}`)
      }
    }
  }, [currentSong])

  const startProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    // Use a less frequent interval to reduce re-renders
    progressIntervalRef.current = setInterval(() => {
      // Try to get time from HTML audio element
      if (audioElementRef.current) {
        const duration = timeToSeconds(currentSong?.duration || "0:00")
        const currentTime = audioElementRef.current.currentTime
        const progressPercent = (currentTime / duration) * 100

        // Only update if significant change
        if (Math.abs(progressPercent - progressUpdateRef.current) > 0.5) {
          progressUpdateRef.current = progressPercent
          setProgress(progressPercent)
          setCurrentTime(secondsToTime(currentTime))
        }
      }
    }, 250) // Less frequent updates (250ms instead of 100ms)
  }, [currentSong])

  // Modify the playSong function to better handle play/pause toggling and add a small delay before playing
  const playSong = useCallback(
    (song: Song) => {
      setAudioError(null)

      // If it's the same song that's already selected, just toggle play/pause
      if (currentSong?.id === song.id) {
        // If the song is already playing, pause it
        if (isPlaying && audioElementRef.current) {
          audioElementRef.current.pause()
          setIsPlaying(false)
          return
        }
        // If the song is paused, play it
        else if (audioElementRef.current) {
          // Show a temporary "loading" message
          setAudioError("Starting playback...")

          const playPromise = audioElementRef.current.play()

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("Playback resumed successfully")
                setIsPlaying(true)
                // Clear the temporary message
                setAudioError(null)
              })
              .catch((err) => {
                console.error("Failed to resume playback:", err)
                handlePlaybackError(err)
              })
          }
          return
        }
      }

      // Set the new song
      setCurrentSong(song)
      setTotalTime(song.duration)

      // Reset the attempted autoplay flag
      setAttemptedAutoPlay(false)

      // If there's no audio URL, show an error
      if (!song.audioUrl || song.audioUrl.trim() === "") {
        setAudioError("No audio available for this song")
        return
      }

      // Try to play using the HTML audio element
      if (audioElementRef.current) {
        try {
          // Validate the URL before setting it
          const audioUrl = song.audioUrl.trim()
          console.log("Setting audio source to:", audioUrl)

          // Pause any current playback
          audioElementRef.current.pause()

          // Set the source and load the audio
          audioElementRef.current.src = audioUrl
          audioElementRef.current.load()

          // Show a temporary "loading" message
          setAudioError("Starting playback...")

          // Add a small delay before attempting to play to avoid race conditions
          setTimeout(() => {
            if (audioElementRef.current) {
              const playPromise = audioElementRef.current.play()

              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    console.log("Playback started successfully")
                    setIsPlaying(true)
                    // Clear the temporary message
                    setAudioError(null)
                  })
                  .catch((err) => {
                    console.error("Failed to play HTML audio element:", err)
                    handlePlaybackError(err)
                  })
              }
            }
          }, 300) // 300ms delay to ensure the audio is loaded
        } catch (err) {
          console.error("Error setting HTML audio element source:", err)
          setAudioError(`Error setting up audio: ${err}. Please try clicking play in the audio player below.`)
        }
      }
    },
    [currentSong, isPlaying],
  )

  // Add a helper function to handle playback errors with better messages
  const handlePlaybackError = useCallback((err: any) => {
    if (err.name === "NotAllowedError") {
      setAudioError("Browser blocked autoplay. Please click play again.")
    } else if (err.name === "AbortError") {
      setAudioError("Playback was interrupted. Please try again.")
    } else {
      setAudioError(`Playback error: ${err.message}. Please try again.`)
    }
  }, [])

  // Update the togglePlay function to use the same error handler
  const togglePlay = useCallback(() => {
    if (!currentSong?.audioUrl) {
      setAudioError("No audio available to play")
      return
    }

    // Try to play/pause using the HTML audio element
    if (audioElementRef.current) {
      if (isPlaying) {
        audioElementRef.current.pause()
        setIsPlaying(false)
      } else {
        // Clear any previous errors
        setAudioError(null)

        // Make sure the audio source is set correctly
        if (audioElementRef.current.src !== currentSong.audioUrl && currentSong.audioUrl) {
          audioElementRef.current.src = currentSong.audioUrl
          audioElementRef.current.load()
        }

        console.log("Attempting to play:", currentSong.title)

        // Show a temporary "loading" message
        setAudioError("Starting playback...")

        const playPromise = audioElementRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Playback started successfully")
              setIsPlaying(true)
              // Clear the temporary message
              setAudioError(null)
            })
            .catch((err) => {
              console.error("Failed to play HTML audio element:", err)
              handlePlaybackError(err)
            })
        }
      }
    }
  }, [currentSong, isPlaying, handlePlaybackError])

  const toggleLike = useCallback((songId: string) => {
    setLikedSongs((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }))
  }, [])

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    if (audioElementRef.current) {
      audioElementRef.current.volume = newVolume / 100
    }
  }, [])

  const handleProgressChange = useCallback(
    (value: number[]) => {
      const newProgress = value[0]
      setProgress(newProgress)

      if (currentSong) {
        const duration = timeToSeconds(currentSong.duration)
        const newTime = (newProgress / 100) * duration
        setCurrentTime(secondsToTime(newTime))

        // Update time in HTML audio element
        if (audioElementRef.current) {
          audioElementRef.current.currentTime = newTime
        }
      }
    },
    [currentSong],
  )

  const timeToSeconds = (time: string) => {
    const [minutes, seconds] = time.split(":").map(Number)
    return minutes * 60 + seconds
  }

  const secondsToTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  // Memoize song row handlers to prevent re-renders
  const handleSongPlay = useCallback((song: Song) => () => playSong(song), [playSong])
  const handleSongLike = useCallback(
    (songId: string) => (e: React.MouseEvent) => {
      e.stopPropagation()
      toggleLike(songId)
    },
    [toggleLike],
  )

  // You can use currentMood to customize the content based on the selected mood

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white">
      {/* Audio messages */}
      {audioError && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${audioError === "Starting playback..." ? "bg-green-500" : "bg-red-500"} text-white px-4 py-2 rounded-md shadow\`}-lg flex items-center`}
        >
          {audioError === "Starting playback..." ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {audioError}
            </>
          ) : (
            <>
              {audioError}
              <button
                className="ml-2 bg-white text-red-500 px-2 py-0.5 rounded text-xs"
                onClick={() => setAudioError(null)}
              >
                Dismiss
              </button>
            </>
          )}
        </div>
      )}

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[240px] bg-black flex flex-col h-full">
          <div className="p-6 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[rgb(154,87,222)] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 18V6L21 3V15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-md ${
                    pathname === "/home" ? "text-white bg-zinc-800" : "text-zinc-400 hover:text-white"
                  }`}
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
                <Link href="/radio" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white">
                  <Radio className="w-5 h-5" />
                  <span>Radio</span>
                </Link>
              </li>
              <li>
                <Link href="/albums" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white">
                  <Disc className="w-5 h-5" />
                  <span>Albums</span>
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white">
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
                <button
                  onClick={() => {
                    // Play the most recent song
                    if (recentPlayed.length > 0) {
                      const recentSong = popularSongs.find((song) => song.title === recentPlayed[0].title)
                      if (recentSong) playSong(recentSong)
                    }
                    toast({ title: "Recently Added", description: "Playing your recent tracks" })
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white text-left"
                >
                  <Clock className="w-5 h-5" />
                  <span>Recently Added</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    // Filter and play liked songs
                    const likedSongsList = popularSongs.filter((song) => likedSongs[song.id])
                    if (likedSongsList.length > 0) {
                      playSong(likedSongsList[0])
                      toast({ title: "Favorite Songs", description: `Playing ${likedSongsList[0].title}` })
                    } else {
                      toast({ title: "Favorite Songs", description: "No favorite songs yet. Like some songs first!" })
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white text-left"
                >
                  <Star className="w-5 h-5" />
                  <span>Favorite Songs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => toast({ title: "Local Files", description: "Local files feature coming soon!" })}
                  className="w-full flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white text-left"
                >
                  <FileText className="w-5 h-5" />
                  <span>Local Files</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="mt-8 px-4">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-xs font-semibold text-zinc-400">PLAYLIST</h2>
              <button
                onClick={() => toast({ title: "Create Playlist", description: "Create playlist feature coming soon!" })}
                className="text-zinc-400 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentMood("lofi")
                    toast({ title: "Lo-fi Music", description: "Playing Lo-fi playlist" })
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white text-left"
                >
                  <span>Lo-fi Music</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => toast({ title: "Bon Jovi", description: "Bon Jovi playlist coming soon!" })}
                  className="w-full flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white text-left"
                >
                  <span>Best of Bon Jovi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => toast({ title: "John Mayer", description: "John Mayer playlist coming soon!" })}
                  className="w-full flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white text-left"
                >
                  <span>Best of John Mayer</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="mt-8 px-4">
            <h2 className="text-xs font-semibold text-zinc-400 mb-4 px-2">TOP STREAMERS</h2>
            <ul className="space-y-4">
              {[
                { name: "Mistletoe", artist: "Justin Bieber" },
                { name: "Levitating", artist: "Dua Lipa" },
                { name: "Shape of You", artist: "Ed Sheeran" },
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between px-2">
                  <button
                    className="flex items-center gap-3 hover:bg-zinc-800/30 p-1 rounded-md w-full"
                    onClick={() => {
                      const song = popularSongs.find(
                        (s) => s.title.includes(item.name) || s.artist.includes(item.artist),
                      )
                      if (song) {
                        playSong(song)
                        toast({ title: "Now Playing", description: `${item.name} by ${item.artist}` })
                      } else {
                        toast({
                          title: "Coming Soon",
                          description: `${item.name} by ${item.artist} will be available soon!`,
                        })
                      }
                    }}
                  >
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
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-zinc-400">{item.artist}</p>
                    </div>
                  </button>
                  <button
                    className="text-zinc-400 hover:text-white"
                    onClick={() => {
                      toggleLike(`streamer-${i}`)
                      toast({
                        title: likedSongs[`streamer-${i}`] ? "Removed from favorites" : "Added to favorites",
                        description: `${item.name} by ${item.artist}`,
                      })
                    }}
                  >
                    <Heart className={`w-4 h-4 ${likedSongs[`streamer-${i}`] ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Center Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
                  onClick={handleBackClick}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="relative w-[400px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search music, artist, albums..."
                    className="w-full bg-zinc-800/50 rounded-full py-2 pl-10 pr-4 text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  className="bg-[rgb(154,87,222)] hover:bg-[rgb(174,107,242)] text-black rounded-full px-4 py-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(154,87,222,0.6)] hover:scale-105 hover:-translate-y-0.5"
                  onClick={() => setQuizOpen(true)}
                >
                  Music Quiz
                </Button>
                <button className="w-10 h-10 bg-zinc-800/50 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </button>
                <div
                  className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setProfileOpen(true)}
                >
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

            {/* Good Morning Section */}
            <Section title="Good Morning" showAll={false}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {morningMixes.map((mix) => (
                  <MorningMixCard key={mix.id} mix={mix} />
                ))}
              </div>
            </Section>

            {/* Featured Song based on Mood */}
            {(currentMood === "happy" ||
              currentMood === "calm" ||
              currentMood === "romantic" ||
              currentMood === "energetic") &&
              showFeaturedSong && (
                <Section
                  title={`Suggested for your ${
                    currentMood === "happy"
                      ? "Happy"
                      : currentMood === "calm"
                        ? "Calm"
                        : currentMood === "romantic"
                          ? "Romantic"
                          : "Energetic"
                  } Mood`}
                >
                  <div
                    className="bg-zinc-800/30 rounded-lg p-4 flex flex-col md:flex-row items-center gap-6 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer relative"
                    onClick={() => {
                      // Play the appropriate song based on mood
                      if (currentMood === "happy") {
                        playSong(popularSongs.find((song) => song.title === "Shape of You") || popularSongs[0])
                      } else if (currentMood === "calm") {
                        playSong(popularSongs.find((song) => song.title === "Blue") || popularSongs[5])
                      } else if (currentMood === "romantic") {
                        playSong(popularSongs.find((song) => song.title === "Tum se hi") || popularSongs[3])
                      } else if (currentMood === "energetic") {
                        playSong(popularSongs.find((song) => song.title === "Levitating") || popularSongs[6])
                      }
                    }}
                  >
                    {/* Close button */}
                    <button
                      className="absolute top-3 right-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-colors z-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowFeaturedSong(false)
                      }}
                      aria-label="Close suggestion"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="relative w-40 h-40 rounded-lg overflow-hidden">
                      <Image
                        src={
                          currentMood === "happy"
                            ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%206150-u19tvNCgqeOieIgoFyElwdyb80Q5Nh.png"
                            : currentMood === "calm"
                              ? "/images/blue-yung-kai.png"
                              : currentMood === "romantic"
                                ? "/images/tum-se-hi.jpeg"
                                : "/images/levitating-dua-lipa.jpeg"
                        }
                        alt={
                          currentMood === "happy"
                            ? "Shape of You"
                            : currentMood === "calm"
                              ? "Blue"
                              : currentMood === "romantic"
                                ? "Tum se hi"
                                : "Levitating"
                        }
                        width={160}
                        height={160}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-[rgb(154,87,222)] rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-[rgb(154,87,222)] text-white">Perfect Match</Badge>
                        <Badge
                          className={`${
                            currentMood === "happy"
                              ? "bg-orange-500"
                              : currentMood === "calm"
                                ? "bg-blue-500"
                                : currentMood === "romantic"
                                  ? "bg-pink-500"
                                  : "bg-purple-500"
                          } text-white`}
                        >
                          {currentMood === "happy"
                            ? "Happy Mood"
                            : currentMood === "calm"
                              ? "Calm Mood"
                              : currentMood === "romantic"
                                ? "Romantic Mood"
                                : "Energetic Mood"}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">
                        {currentMood === "happy"
                          ? "Shape of You"
                          : currentMood === "calm"
                            ? "Blue"
                            : currentMood === "romantic"
                              ? "Tum se hi"
                              : "Levitating"}
                      </h3>
                      <p className="text-zinc-400 mb-3">
                        {currentMood === "happy"
                          ? "Ed Sheeran"
                          : currentMood === "calm"
                            ? "Yung Kai"
                            : currentMood === "romantic"
                              ? "Pritam, Mohit Chauhan"
                              : "Dua Lipa ft. DaBaby"}
                      </p>
                      <p className="text-sm text-zinc-300 mb-4 max-w-xl">
                        {currentMood === "happy"
                          ? "This upbeat track with its catchy rhythm is perfect for your happy mood. The cheerful melody and positive lyrics will keep your spirits high."
                          : currentMood === "calm"
                            ? "This relaxing track with its smooth melody is perfect for your calm mood. The gentle beats and soothing vocals will help you unwind and find your peace."
                            : currentMood === "romantic"
                              ? "This heartfelt ballad from the movie 'Jab We Met' perfectly captures the essence of romance. The soulful vocals and beautiful lyrics make it ideal for your romantic mood."
                              : "This high-energy dance-pop track is perfect for your energetic mood. With its disco-inspired beats and catchy chorus, it's guaranteed to get you moving and boost your energy."}
                      </p>
                      <div className="flex items-center gap-3">
                        <Button
                          className="bg-[rgb(154,87,222)] hover:bg-[rgb(174,107,242)] text-white rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (currentMood === "happy") {
                              playSong(popularSongs.find((song) => song.title === "Shape of You") || popularSongs[0])
                            } else if (currentMood === "calm") {
                              playSong(popularSongs.find((song) => song.title === "Blue") || popularSongs[5])
                            } else if (currentMood === "romantic") {
                              playSong(popularSongs.find((song) => song.title === "Tum se hi") || popularSongs[3])
                            } else if (currentMood === "energetic") {
                              playSong(popularSongs.find((song) => song.title === "Levitating") || popularSongs[6])
                            }
                          }}
                        >
                          Play Now
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (currentMood === "happy") {
                              toggleLike(
                                popularSongs.find((song) => song.title === "Shape of You")?.id || popularSongs[0].id,
                              )
                            } else if (currentMood === "calm") {
                              toggleLike(popularSongs.find((song) => song.title === "Blue")?.id || popularSongs[5].id)
                            } else if (currentMood === "romantic") {
                              toggleLike(
                                popularSongs.find((song) => song.title === "Tum se hi")?.id || popularSongs[3].id,
                              )
                            } else if (currentMood === "energetic") {
                              toggleLike(
                                popularSongs.find((song) => song.title === "Levitating")?.id || popularSongs[6].id,
                              )
                            }
                          }}
                        >
                          {currentMood === "happy"
                            ? likedSongs[
                                popularSongs.find((song) => song.title === "Shape of You")?.id || popularSongs[0].id
                              ]
                              ? "Liked"
                              : "Like"
                            : currentMood === "happy"
                              ? likedSongs[
                                  popularSongs.find((song) => song.title === "Shape of You")?.id || popularSongs[0].id
                                ]
                                ? "Liked"
                                : "Like"
                              : currentMood === "calm"
                                ? likedSongs[
                                    popularSongs.find((song) => song.title === "Blue")?.id || popularSongs[5].id
                                  ]
                                  ? "Liked"
                                  : "Like"
                                : currentMood === "romantic"
                                  ? likedSongs[
                                      popularSongs.find((song) => song.title === "Tum se hi")?.id || popularSongs[3].id
                                    ]
                                    ? "Liked"
                                    : "Like"
                                  : likedSongs[
                                        popularSongs.find((song) => song.title === "Levitating")?.id ||
                                          popularSongs[6].id
                                      ]
                                    ? "Liked"
                                    : "Like"}
                          <Heart
                            className={`ml-2 w-4 h-4 ${
                              currentMood === "happy"
                                ? likedSongs[
                                    popularSongs.find((song) => song.title === "Shape of You")?.id || popularSongs[0].id
                                  ]
                                  ? "fill-red-500 text-red-500"
                                  : ""
                                : currentMood === "calm"
                                  ? likedSongs[
                                      popularSongs.find((song) => song.title === "Blue")?.id || popularSongs[5].id
                                    ]
                                    ? "fill-red-500 text-red-500"
                                    : ""
                                  : currentMood === "romantic"
                                    ? likedSongs[
                                        popularSongs.find((song) => song.title === "Tum se hi")?.id ||
                                          popularSongs[3].id
                                      ]
                                      ? "fill-red-500 text-red-500"
                                      : ""
                                    : likedSongs[
                                          popularSongs.find((song) => song.title === "Levitating")?.id ||
                                            popularSongs[6].id
                                        ]
                                      ? "fill-red-500 text-red-500"
                                      : ""
                            }`}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Section>
              )}

            {/* Made for You Section */}
            <Section title="Made for you">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {madeForYou.map((mix) => (
                  <MixCard key={mix.id} mix={mix} />
                ))}
              </div>
            </Section>

            {/* Popular Songs Section */}
            <Section title="Popular Songs">
              <div className="bg-zinc-800/30 rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-700/50 text-left text-xs text-zinc-400">
                      <th className="px-4 py-2 w-12">#</th>
                      <th className="px-4 py-2">Title</th>
                      <th className="px-4 py-2 hidden md:table-cell">Artist</th>
                      <th className="px-4 py-2 text-right hidden md:table-cell">Duration</th>
                      <th className="px-4 py-2 w-20 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularSongs.map((song, index) => (
                      <SongRow
                        key={song.id}
                        song={song}
                        index={index}
                        isCurrentSong={currentSong?.id === song.id}
                        isPlaying={isPlaying && currentSong?.id === song.id}
                        isLiked={likedSongs[song.id] || false}
                        onPlay={handleSongPlay(song)}
                        onToggleLike={handleSongLike(song.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Bottom padding for player */}
            <div className="h-24"></div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[300px] border-l border-zinc-800 p-4 overflow-y-auto">
            {/* Fans Also Like Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Fans Also Like</h2>
                <button className="text-xs text-[rgb(154,87,222)] hover:underline">See All</button>
              </div>
              <div className="space-y-4">
                {fansAlsoLike.map((artist) => (
                  <div key={artist.id} className="bg-zinc-800/30 rounded-lg p-4">
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-3">
                      <Image
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        width={180}
                        height={180}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="font-medium text-center">{artist.name}</h3>
                    <p className="text-xs text-zinc-400 text-center">Artist</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-zinc-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-zinc-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-zinc-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Recent Played Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Recent Played</h2>
                <button className="text-xs text-[rgb(154,87,222)] hover:underline">See All</button>
              </div>
              <div className="space-y-4">
                {recentPlayed.map((song) => (
                  <RecentPlayedItem key={song.id} song={song} />
                ))}
              </div>
            </div>

            {/* Categories Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Categories</h2>
                <button className="text-xs text-[rgb(154,87,222)] hover:underline">See All</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Bar */}
      {currentSong && (
        <div className="h-[90px] bg-zinc-900 border-t border-zinc-800 flex items-center px-4">
          {/* Hidden audio element for playback */}
          <audio
            ref={audioElementRef}
            className="hidden"
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false)
              setProgress(0)
            }}
            onLoadedData={() => {
              console.log("Audio loaded successfully:", currentSong?.title)
            }}
            onTimeUpdate={updateProgress}
            onError={(e) => {
              const audioElement = e.currentTarget
              console.error("HTML Audio element error:", audioElement.error)
              setAudioError(
                `Error playing audio: ${audioElement.error?.message || "Unknown error"}. Please try another song.`,
              )
            }}
          />
          <div className="flex items-center gap-3 w-[30%]">
            <div className="w-14 h-14 bg-zinc-800 rounded-md overflow-hidden">
              <Image
                src={currentSong.image || "/placeholder.svg"}
                alt={currentSong.title}
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{currentSong.title}</h4>
              <p className="text-sm text-zinc-400">{currentSong.artist}</p>
            </div>
            <button className="ml-4 text-zinc-400 hover:text-white">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-6 mb-2">
              <button className="text-zinc-400 hover:text-white">
                <Shuffle className="w-5 h-5" />
              </button>
              <button className="text-zinc-400 hover:text-white">
                <SkipBack className="w-5 h-5" />
              </button>
              {/* Make the player bar play button more prominent when Tum se hi is selected */}
              <button
                className={`w-10 h-10 bg-[rgb(154,87,222)] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg ${!isPlaying && currentSong ? "animate-bounce" : ""}`}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <button className="text-zinc-400 hover:text-white">
                <SkipForward className="w-5 h-5" />
              </button>
              <button className="text-zinc-400 hover:text-white">
                <Repeat className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full flex items-center gap-2">
              <span className="text-xs text-zinc-400">{currentTime}</span>
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                className="w-full"
                onValueChange={(value) => handleProgressChange(value)}
              />
              <span className="text-xs text-zinc-400">{totalTime}</span>
            </div>
          </div>

          <div className="w-[30%] flex items-center justify-end gap-3">
            <button className="text-zinc-400 hover:text-white">
              <ListMusic className="w-5 h-5" />
            </button>
            <button className="text-zinc-400 hover:text-white">
              <Volume2 className="w-5 h-5" />
            </button>
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={(value) => handleVolumeChange(value)}
            />
            <button className="text-zinc-400 hover:text-white ml-2">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      {/* Profile Popup */}
      <ProfilePopup isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      {/* Music Quiz Modal */}
      <MusicQuiz isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  )
}
