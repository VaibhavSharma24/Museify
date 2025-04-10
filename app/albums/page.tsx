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
  MoreHorizontal,
  Filter,
  Calendar,
  Music,
  Shuffle,
  ListMusic,
  ChevronRight,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/components/ui/use-toast"
import "./styles.css"

interface Album {
  id: string
  title: string
  artist: string
  coverImage: string
  releaseYear: number
  genre: string
  tracks: number
  duration: string
  isFeatured?: boolean
  isNew?: boolean
  description?: string
}

interface Artist {
  id: string
  name: string
  image: string
}

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([])
  const [featuredAlbum, setFeaturedAlbum] = useState<Album | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"recent" | "alphabetical" | "artist">("recent")
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [artists, setArtists] = useState<Artist[]>([])

  const headerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize album data
  useEffect(() => {
    // Simulate loading data
    setIsLoading(true)

    // Mock album data
    const albumsData: Album[] = [
      {
        id: "1",
        title: "Midnights",
        artist: "Taylor Swift",
        coverImage: "/images/artists/taylor-swift.jpg",
        releaseYear: 2022,
        genre: "Pop",
        tracks: 13,
        duration: "44:10",
        isFeatured: true,
        description:
          "The tenth studio album by American singer-songwriter Taylor Swift, a conceptual album about insomnia and the thoughts that keep one up at night.",
      },
      {
        id: "2",
        title: "Happier Than Ever",
        artist: "Billie Eilish",
        coverImage: "/images/artists/billie-eilish.jpg",
        releaseYear: 2021,
        genre: "Alternative",
        tracks: 16,
        duration: "56:15",
        isNew: true,
      },
      {
        id: "3",
        title: "Future Nostalgia",
        artist: "Dua Lipa",
        coverImage: "/images/artists/dua-lipa.jpg",
        releaseYear: 2020,
        genre: "Pop",
        tracks: 11,
        duration: "37:17",
      },
      {
        id: "4",
        title: "Renaissance",
        artist: "Beyoncé",
        coverImage: "/images/artists/beyonce.jpg",
        releaseYear: 2022,
        genre: "R&B",
        tracks: 16,
        duration: "62:41",
        isNew: true,
      },
      {
        id: "5",
        title: "SOUR",
        artist: "Olivia Rodrigo",
        coverImage: "/images/artists/olivia-rodrigo.jpg",
        releaseYear: 2021,
        genre: "Pop",
        tracks: 11,
        duration: "34:46",
      },
      {
        id: "6",
        title: "Rare",
        artist: "Selena Gomez",
        coverImage: "/images/artists/selena-gomez.jpg",
        releaseYear: 2020,
        genre: "Pop",
        tracks: 13,
        duration: "41:35",
      },
      {
        id: "7",
        title: "Positions",
        artist: "Ariana Grande",
        coverImage: "/images/artists/ariana-grande.jpg",
        releaseYear: 2020,
        genre: "R&B",
        tracks: 14,
        duration: "41:14",
      },
      {
        id: "8",
        title: "Emails I Can't Send",
        artist: "Sabrina Carpenter",
        coverImage: "/images/artists/sabrina-carpenter.jpg",
        releaseYear: 2022,
        genre: "Pop",
        tracks: 13,
        duration: "40:22",
        isNew: true,
      },
      {
        id: "9",
        title: "Lover",
        artist: "Taylor Swift",
        coverImage: "/images/artists/taylor-swift.jpg",
        releaseYear: 2019,
        genre: "Pop",
        tracks: 18,
        duration: "61:48",
      },
      {
        id: "10",
        title: "When We All Fall Asleep, Where Do We Go?",
        artist: "Billie Eilish",
        coverImage: "/images/artists/billie-eilish.jpg",
        releaseYear: 2019,
        genre: "Alternative",
        tracks: 14,
        duration: "42:58",
      },
      {
        id: "11",
        title: "Lemonade",
        artist: "Beyoncé",
        coverImage: "/images/artists/beyonce.jpg",
        releaseYear: 2016,
        genre: "R&B",
        tracks: 12,
        duration: "45:41",
      },
      {
        id: "12",
        title: "Short n' Sweet",
        artist: "Sabrina Carpenter",
        coverImage: "/images/artists/sabrina-carpenter.jpg",
        releaseYear: 2023,
        genre: "Pop",
        tracks: 12,
        duration: "36:15",
        isNew: true,
      },
    ]

    // Mock artists data
    const artistsData: Artist[] = [
      {
        id: "1",
        name: "Taylor Swift",
        image: "/images/artists/taylor-swift.jpg",
      },
      {
        id: "2",
        name: "Billie Eilish",
        image: "/images/artists/billie-eilish.jpg",
      },
      {
        id: "3",
        name: "Dua Lipa",
        image: "/images/artists/dua-lipa.jpg",
      },
      {
        id: "4",
        name: "Beyoncé",
        image: "/images/artists/beyonce.jpg",
      },
      {
        id: "5",
        name: "Olivia Rodrigo",
        image: "/images/artists/olivia-rodrigo.jpg",
      },
    ]

    setAlbums(albumsData)
    setFilteredAlbums(albumsData)
    setFeaturedAlbum(albumsData.find((album) => album.isFeatured) || null)
    setArtists(artistsData)

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Add scroll event listener
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Filter albums based on search and genre
  useEffect(() => {
    let filtered = albums

    if (searchQuery) {
      filtered = filtered.filter(
        (album) =>
          album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          album.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          album.genre.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedGenre) {
      filtered = filtered.filter((album) => album.genre === selectedGenre)
    }

    // Sort albums
    if (sortBy === "alphabetical") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === "artist") {
      filtered = [...filtered].sort((a, b) => a.artist.localeCompare(b.artist))
    } else {
      // recent
      filtered = [...filtered].sort((a, b) => b.releaseYear - a.releaseYear)
    }

    setFilteredAlbums(filtered)
  }, [searchQuery, selectedGenre, sortBy, albums])

  // Toggle play/pause
  const togglePlay = (albumId: string) => {
    if (currentlyPlayingId === albumId) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentlyPlayingId(albumId)
      setIsPlaying(true)
    }

    // Show toast notification
    const album = albums.find((a) => a.id === albumId)
    if (album) {
      toast({
        title: isPlaying && currentlyPlayingId === albumId ? "Paused" : "Now Playing",
        description: `${album.title} by ${album.artist}`,
      })
    }
  }

  // Get unique genres
  const genres = Array.from(new Set(albums.map((album) => album.genre)))

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-[rgb(154,87,222)] border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading your album collection...</p>
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
              <Link href="/albums" className="flex items-center gap-3 px-4 py-3 text-white bg-zinc-800 rounded-md">
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
        <div className="flex items-center justify-between p-4 bg-[#121212] z-10">
          <div className="flex items-center gap-4">
            <Link href="/home">
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
                placeholder="Search albums, artists..."
                className="w-full bg-zinc-800/70 backdrop-blur-sm rounded-full py-2 pl-10 pr-4 text-sm border border-zinc-700 focus:border-[rgb(154,87,222)] focus:ring-1 focus:ring-[rgb(154,87,222)] transition-all duration-300 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
        <div ref={containerRef} className="flex-1 overflow-y-auto">
          {/* Header with parallax effect */}
          <div
            ref={headerRef}
            className="relative h-[400px] overflow-hidden"
            style={{
              backgroundImage: "url('/images/artists/taylor-swift-banner.jpg')",
              backgroundSize: "cover",
              backgroundPosition: `center ${scrollY * 0.5}px`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#121212]"></div>

            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="w-fit mb-2 bg-[rgb(154,87,222)]">ALBUMS</Badge>
              <h1 className="text-5xl font-bold mb-4">Your Music Collection</h1>
              <p className="text-xl text-zinc-300 max-w-2xl">
                Discover and enjoy your favorite albums from artists around the world
              </p>

              <div className="flex items-center gap-4 mt-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-[rgb(154,87,222)] hover:bg-[rgb(174,107,242)] text-white rounded-full px-6">
                    <Shuffle className="w-4 h-4 mr-2" />
                    Shuffle Play
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="rounded-full border-white/30 hover:border-white">
                    <ListMusic className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            {/* Filter and View Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="rounded-full border-zinc-700 hover:border-[rgb(154,87,222)]"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </motion.div>

                {/* Genre filter pills */}
                <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={selectedGenre === null ? "default" : "outline"}
                      className={`rounded-full text-sm px-4 py-1 h-8 ${
                        selectedGenre === null
                          ? "bg-[rgb(154,87,222)] hover:bg-[rgb(174,107,242)]"
                          : "border-zinc-700 hover:border-[rgb(154,87,222)]"
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
                        className={`rounded-full text-sm px-4 py-1 h-8 ${
                          selectedGenre === genre
                            ? "bg-[rgb(154,87,222)] hover:bg-[rgb(174,107,242)]"
                            : "border-zinc-700 hover:border-[rgb(154,87,222)]"
                        }`}
                        onClick={() => setSelectedGenre(genre)}
                      >
                        {genre}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-zinc-800 rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full px-3 ${currentView === "grid" ? "bg-zinc-700" : ""}`}
                    onClick={() => setCurrentView("grid")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full px-3 ${currentView === "list" ? "bg-zinc-700" : ""}`}
                    onClick={() => setCurrentView("list")}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 6H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 12H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 18H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 6H3.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 12H3.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 18H3.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-400">Sort:</span>
                  <select
                    className="bg-zinc-800 rounded-md border border-zinc-700 text-sm p-1 outline-none focus:border-[rgb(154,87,222)]"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="recent">Recent</option>
                    <option value="alphabetical">A-Z</option>
                    <option value="artist">Artist</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Expanded filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-4 border border-zinc-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Release Year</h3>
                        <div className="flex flex-wrap gap-2">
                          {[2023, 2022, 2021, 2020, 2019].map((year) => (
                            <Badge
                              key={year}
                              className="bg-zinc-700 hover:bg-[rgb(154,87,222)] cursor-pointer transition-colors"
                            >
                              {year}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Artists</h3>
                        <div className="flex flex-wrap gap-2">
                          {artists.slice(0, 5).map((artist) => (
                            <Badge
                              key={artist.id}
                              className="bg-zinc-700 hover:bg-[rgb(154,87,222)] cursor-pointer transition-colors"
                            >
                              {artist.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Features</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-zinc-700 hover:bg-[rgb(154,87,222)] cursor-pointer transition-colors">
                            New Releases
                          </Badge>
                          <Badge className="bg-zinc-700 hover:bg-[rgb(154,87,222)] cursor-pointer transition-colors">
                            Featured
                          </Badge>
                          <Badge className="bg-zinc-700 hover:bg-[rgb(154,87,222)] cursor-pointer transition-colors">
                            Downloaded
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Featured Album */}
            {featuredAlbum && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Featured Album</h2>
                <motion.div
                  className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-[300px] aspect-square">
                      <Image
                        src={featuredAlbum.coverImage || "/placeholder.svg"}
                        alt={featuredAlbum.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <motion.button
                          className="w-16 h-16 bg-[rgb(154,87,222)] rounded-full flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => togglePlay(featuredAlbum.id)}
                        >
                          {isPlaying && currentlyPlayingId === featuredAlbum.id ? (
                            <Pause className="w-8 h-8 text-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                          )}
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[rgb(154,87,222)]">Featured</Badge>
                        <Badge className="bg-zinc-700">{featuredAlbum.genre}</Badge>
                        <Badge className="bg-zinc-700">{featuredAlbum.releaseYear}</Badge>
                      </div>

                      <h3 className="text-3xl font-bold mb-1">{featuredAlbum.title}</h3>
                      <p className="text-zinc-400 mb-4">{featuredAlbum.artist}</p>

                      <p className="text-zinc-300 mb-6 max-w-2xl">
                        {featuredAlbum.description ||
                          `A stunning album by ${featuredAlbum.artist} featuring ${featuredAlbum.tracks} tracks with a total duration of ${featuredAlbum.duration}.`}
                      </p>

                      <div className="flex items-center gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            className="bg-[rgb(154,87,222)] hover:bg-[rgb(174,107,242)] text-white rounded-full"
                            onClick={() => togglePlay(featuredAlbum.id)}
                          >
                            {isPlaying && currentlyPlayingId === featuredAlbum.id ? "Pause" : "Play"}
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline" className="rounded-full">
                            <Heart className="w-4 h-4 mr-2" />
                            Add to Favorites
                          </Button>
                        </motion.div>
                      </div>

                      <div className="flex items-center gap-4 mt-6 text-sm text-zinc-400">
                        <div className="flex items-center gap-1">
                          <Music className="w-4 h-4" />
                          <span>{featuredAlbum.tracks} tracks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredAlbum.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{featuredAlbum.releaseYear}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* New Releases */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">New Releases</h2>
                <Button variant="link" className="text-[rgb(154,87,222)]">
                  See All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredAlbums
                  .filter((album) => album.isNew)
                  .map((album) => (
                    <motion.div
                      key={album.id}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      onHoverStart={() => setHoveredAlbum(album.id)}
                      onHoverEnd={() => setHoveredAlbum(null)}
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-zinc-800">
                        <Image
                          src={album.coverImage || "/placeholder.svg"}
                          alt={album.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay with play button */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            className="w-12 h-12 bg-[rgb(154,87,222)] rounded-full flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => togglePlay(album.id)}
                          >
                            {isPlaying && currentlyPlayingId === album.id ? (
                              <Pause className="w-6 h-6 text-white" />
                            ) : (
                              <Play className="w-6 h-6 text-white ml-0.5" />
                            )}
                          </motion.button>
                        </div>

                        {/* New badge */}
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-[rgb(154,87,222)]">NEW</Badge>
                        </div>
                      </div>

                      <h3 className="font-medium truncate group-hover:text-[rgb(154,87,222)] transition-colors duration-300">
                        {album.title}
                      </h3>
                      <p className="text-sm text-zinc-400 truncate">{album.artist}</p>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* All Albums */}
            <div>
              <h2 className="text-2xl font-bold mb-4">All Albums</h2>

              {currentView === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredAlbums.map((album) => (
                    <motion.div
                      key={album.id}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                      onHoverStart={() => setHoveredAlbum(album.id)}
                      onHoverEnd={() => setHoveredAlbum(null)}
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-zinc-800 shadow-md group-hover:shadow-lg group-hover:shadow-[rgba(154,87,222,0.2)] transition-all duration-300">
                        <Image
                          src={album.coverImage || "/placeholder.svg"}
                          alt={album.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay with play button */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            className="w-12 h-12 bg-[rgb(154,87,222)] rounded-full flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => togglePlay(album.id)}
                          >
                            {isPlaying && currentlyPlayingId === album.id ? (
                              <Pause className="w-6 h-6 text-white" />
                            ) : (
                              <Play className="w-6 h-6 text-white ml-0.5" />
                            )}
                          </motion.button>
                        </div>

                        {/* New badge */}
                        {album.isNew && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-[rgb(154,87,222)]">NEW</Badge>
                          </div>
                        )}
                      </div>

                      <h3 className="font-medium truncate group-hover:text-[rgb(154,87,222)] transition-colors duration-300">
                        {album.title}
                      </h3>
                      <p className="text-sm text-zinc-400 truncate">{album.artist}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-zinc-800/30 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-700/50 text-left text-xs text-zinc-400">
                        <th className="px-4 py-2 w-12">#</th>
                        <th className="px-4 py-2">Album</th>
                        <th className="px-4 py-2">Artist</th>
                        <th className="px-4 py-2">Genre</th>
                        <th className="px-4 py-2">Year</th>
                        <th className="px-4 py-2 text-right">Duration</th>
                        <th className="px-4 py-2 w-20 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAlbums.map((album, index) => (
                        <motion.tr
                          key={album.id}
                          className={`hover:bg-zinc-700/30 ${currentlyPlayingId === album.id ? "bg-zinc-700/50" : ""}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ backgroundColor: "rgba(154, 87, 222, 0.1)" }}
                        >
                          <td className="px-4 py-3 text-sm text-zinc-400">{index + 1}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={album.coverImage || "/placeholder.svg"}
                                  alt={album.title}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                                {currentlyPlayingId === album.id && isPlaying && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                  </div>
                                )}
                              </div>
                              <div>
                                <p
                                  className={`font-medium ${currentlyPlayingId === album.id && isPlaying ? "text-[rgb(154,87,222)]" : ""}`}
                                >
                                  {album.title}
                                </p>
                                {album.isNew && <Badge className="bg-[rgb(154,87,222)] text-[10px] mt-1">NEW</Badge>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{album.artist}</td>
                          <td className="px-4 py-3 text-sm">{album.genre}</td>
                          <td className="px-4 py-3 text-sm">{album.releaseYear}</td>
                          <td className="px-4 py-3 text-sm text-right">{album.duration}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-3">
                              <button className="text-zinc-400 hover:text-white" onClick={() => togglePlay(album.id)}>
                                {currentlyPlayingId === album.id && isPlaying ? (
                                  <Pause className="w-5 h-5" />
                                ) : (
                                  <Play className="w-5 h-5" />
                                )}
                              </button>
                              <button className="text-zinc-400 hover:text-white">
                                <Heart className="w-5 h-5" />
                              </button>
                              <button className="text-zinc-400 hover:text-white">
                                <MoreHorizontal className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Artists Section */}
            <div className="mt-10 mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Featured Artists</h2>
                <Button variant="link" className="text-[rgb(154,87,222)]">
                  See All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {artists.map((artist) => (
                  <motion.div key={artist.id} className="flex-shrink-0 w-[180px] group" whileHover={{ y: -5 }}>
                    <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden mb-3 bg-zinc-800 group-hover:shadow-lg group-hover:shadow-[rgba(154,87,222,0.2)] transition-all duration-300">
                      <Image
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                      {/* Artist icon */}
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-[rgb(154,87,222)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <h3 className="font-medium text-center truncate group-hover:text-[rgb(154,87,222)] transition-colors duration-300">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-zinc-400 text-center">Artist</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom padding for player */}
            <div className="h-24"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
