"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Home, Disc, Radio, Mic2, Clock, Star, FileText, Plus, Bell, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface PodcastCategory {
  id: string
  name: string
  active: boolean
}

interface PodcastAlbum {
  id: string
  title: string
  artist: string
  image: string
}

export default function PodcastPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<PodcastCategory[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Album data with the provided images
  const albums = [
    {
      id: "1",
      title: "Vault",
      artist: "ElGrandeToto",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%2057-pD6dey0YzgytlrxGPF14T6d9q49cQJ.png",
    },
    {
      id: "2",
      title: "Wiki",
      artist: "Wegz",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%2059-a1sLviXzQv7OhBvW1bj2Yuag7I80v9.png",
    },
    {
      id: "3",
      title: "Double Zuksh",
      artist: "Marwan Pablo",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%2058-H0RWnR6GrUq5O5kWJ7IF9phqoADPDs.png",
    },
    {
      id: "4",
      title: "MCA L'Sechrane",
      artist: "Dizzy DROS",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%2060-5Yp12rLbArz5DC0N1ZrxT8N8xcLJDL.png",
    },
  ]

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true)

    // Mock categories
    const categoriesData: PodcastCategory[] = [
      { id: "new", name: "New Releases", active: true },
      { id: "popular", name: "Popular", active: false },
      { id: "mood", name: "Mood and Genre", active: false },
    ]

    setCategories(categoriesData)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    setCategories(
      categories.map((category) => ({
        ...category,
        active: category.id === categoryId,
      })),
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-[rgb(154,87,222)] border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading podcasts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0014] to-[#1a0033] text-white flex">
      {/* Left Sidebar */}
      <div className="w-[240px] bg-black/40 backdrop-blur-sm flex flex-col h-screen">
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
                className="flex items-center gap-3 px-4 py-3 rounded-md text-zinc-400 hover:text-white group transition-all duration-300"
                prefetch={true}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Home className="w-5 h-5 transition-transform duration-300 group-hover:text-[rgb(154,87,222)]" />
                </motion.div>
                <span className="transition-all duration-300 group-hover:translate-x-1">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/artists"
                className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white group transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Search className="w-5 h-5 transition-transform duration-300 group-hover:text-[rgb(154,87,222)]" />
                </motion.div>
                <span className="transition-all duration-300 group-hover:translate-x-1">Artists</span>
              </Link>
            </li>
            <li>
              <Link
                href="/radio"
                className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white group transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Radio className="w-5 h-5 transition-transform duration-300 group-hover:text-[rgb(154,87,222)]" />
                </motion.div>
                <span className="transition-all duration-300 group-hover:translate-x-1">Radio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/albums"
                className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white group transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Disc className="w-5 h-5 transition-transform duration-300 group-hover:text-[rgb(154,87,222)]" />
                </motion.div>
                <span className="transition-all duration-300 group-hover:translate-x-1">Albums</span>
              </Link>
            </li>
            <li>
              <Link
                href="/podcast"
                className="flex items-center gap-3 px-4 py-3 text-white bg-zinc-800/40 rounded-md group transition-all duration-300"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0, -5, 0],
                    color: ["rgb(255, 255, 255)", "rgb(154, 87, 222)", "rgb(255, 255, 255)"],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <Mic2 className="w-5 h-5" />
                </motion.div>
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
        <div className="flex items-center justify-between p-4 bg-transparent z-10">
          <div className="flex items-center gap-4">
            <Link href="/home" prefetch={true}>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 bg-zinc-800/50 rounded-full flex items-center justify-center"
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
                placeholder="Search podcasts, episodes..."
                className="w-full bg-zinc-800/50 backdrop-blur-sm rounded-full py-2 pl-10 pr-4 text-sm border border-zinc-700/50 focus:border-[rgb(154,87,222)] focus:ring-1 focus:ring-[rgb(154,87,222)] transition-all duration-300 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-zinc-800/50 rounded-full flex items-center justify-center">
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
        <div className="flex-1 overflow-y-auto">
          {/* Hero Section */}
          <div className="relative px-8 py-16">
            {/* Decorative background elements */}
            <div className="absolute right-0 top-0 w-3/4 h-full overflow-hidden z-0">
              {/* Blue wavy lines */}
              <svg
                className="absolute right-0 top-0 w-full h-full"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M370,270 Q350,290 330,270 T290,270 T250,270 T210,270 T170,270"
                  fill="none"
                  stroke="rgba(0,50,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M370,290 Q350,310 330,290 T290,290 T250,290 T210,290 T170,290"
                  fill="none"
                  stroke="rgba(0,50,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M370,310 Q350,330 330,310 T290,310 T250,310 T210,310 T170,310"
                  fill="none"
                  stroke="rgba(0,50,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M370,330 Q350,350 330,330 T290,330 T250,330 T210,330 T170,330"
                  fill="none"
                  stroke="rgba(0,50,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M370,350 Q350,370 330,350 T290,350 T250,350 T210,350 T170,350"
                  fill="none"
                  stroke="rgba(0,50,255,0.3)"
                  strokeWidth="2"
                />
              </svg>

              {/* Pink wavy lines */}
              <svg
                className="absolute right-0 top-0 w-full h-full"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M470,170 Q450,190 430,170 T390,170 T350,170 T310,170 T270,170"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,190 Q450,210 430,190 T390,190 T350,190 T310,190 T270,190"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,210 Q450,230 430,210 T390,210 T350,210 T310,210 T270,210"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,230 Q450,250 430,230 T390,230 T350,230 T310,230 T270,230"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,250 Q450,270 430,250 T390,250 T350,250 T310,250 T270,250"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,270 Q450,290 430,270 T390,270 T350,270 T310,270 T270,270"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,290 Q450,310 430,290 T390,290 T350,290 T310,290 T270,290"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,310 Q450,330 430,310 T390,310 T350,310 T310,310 T270,310"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,330 Q450,350 430,330 T390,330 T350,330 T310,330 T270,330"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,350 Q450,370 430,350 T390,350 T350,350 T310,350 T270,350"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,370 Q450,390 430,370 T390,370 T350,370 T310,370 T270,370"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,390 Q450,410 430,390 T390,390 T350,390 T310,390 T270,390"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,410 Q450,430 430,410 T390,410 T350,410 T310,410 T270,410"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,430 Q450,450 430,430 T390,430 T350,430 T310,430 T270,430"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M470,450 Q450,470 430,450 T390,450 T350,450 T310,450 T270,450"
                  fill="none"
                  stroke="rgba(255,0,255,0.3)"
                  strokeWidth="2"
                />
              </svg>

              {/* Circular element */}
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-blue-500/20"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: 360,
                  borderColor: ["rgba(0,50,255,0.2)", "rgba(154,87,222,0.3)", "rgba(0,50,255,0.2)"],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-blue-500/30"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: -360,
                  borderColor: ["rgba(0,50,255,0.3)", "rgba(154,87,222,0.4)", "rgba(0,50,255,0.3)"],
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-blue-500/40"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: 360,
                  borderColor: ["rgba(0,50,255,0.4)", "rgba(154,87,222,0.5)", "rgba(0,50,255,0.4)"],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500/50"
                animate={{
                  scale: [1, 1.5, 1],
                  backgroundColor: ["rgba(0,50,255,0.5)", "rgba(154,87,222,0.6)", "rgba(0,50,255,0.5)"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>

            {/* Featured Albums */}
            <div className="absolute right-0 top-0 w-3/4 h-full z-10">
              <div className="relative w-full h-full">
                {/* Album 1 - Top Right */}
                <motion.div
                  className="absolute top-[10%] right-[10%] w-[180px] h-[180px] rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 3,
                    boxShadow: "0 0 30px rgba(154, 87, 222, 0.7)",
                    transition: { duration: 0.3, type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={albums[0].image || "/placeholder.svg"}
                    alt={albums[0].title}
                    width={180}
                    height={180}
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="absolute bottom-2 left-2 text-white font-bold text-sm">{albums[0].title}</div>
                  </motion.div>
                </motion.div>

                {/* Album 2 - Bottom Right */}
                <motion.div
                  className="absolute bottom-[15%] right-[15%] w-[150px] h-[150px] rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{
                    scale: 1.1,
                    rotate: -3,
                    boxShadow: "0 0 30px rgba(154, 87, 222, 0.7)",
                    transition: { duration: 0.3, type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={albums[1].image || "/placeholder.svg"}
                    alt={albums[1].title}
                    width={150}
                    height={150}
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="absolute bottom-2 left-2 text-white font-bold text-sm">{albums[1].title}</div>
                  </motion.div>
                </motion.div>

                {/* Album 3 - Center Right */}
                <motion.div
                  className="absolute top-[40%] right-[30%] w-[200px] h-[200px] rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 0 30px rgba(154, 87, 222, 0.7)",
                    transition: { duration: 0.3, type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={albums[2].image || "/placeholder.svg"}
                    alt={albums[2].title}
                    width={200}
                    height={200}
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="absolute bottom-2 left-2 text-white font-bold text-sm">{albums[2].title}</div>
                  </motion.div>
                </motion.div>

                {/* Album 4 - Bottom Left */}
                <motion.div
                  className="absolute bottom-[20%] left-[20%] w-[170px] h-[170px] rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    rotate: -5,
                    boxShadow: "0 0 30px rgba(154, 87, 222, 0.7)",
                    transition: { duration: 0.3, type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={albums[3].image || "/placeholder.svg"}
                    alt={albums[3].title}
                    width={170}
                    height={170}
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="absolute bottom-2 left-2 text-white font-bold text-sm">{albums[3].title}</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="relative z-20 max-w-xl">
              <motion.h1
                className="text-5xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  ALL
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  THE
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  MUSIC
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  YOU
                </motion.span>{" "}
                <motion.span
                  className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  LOVE,
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  ALL
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  THE
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  FREEDOM
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  YOU
                </motion.span>{" "}
                <motion.span
                  className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  NEED
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-zinc-400 mb-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1.1, type: "spring", stiffness: 100 }}
                whileHover={{
                  color: "rgb(255, 255, 255)",
                  x: 5,
                  transition: { duration: 0.2 },
                }}
              >
                Arabic and International in one place
              </motion.p>
            </div>
          </div>

          {/* Categories */}
          <div className="px-8 py-4">
            <ul className="flex flex-col space-y-4">
              {categories.map((category) => (
                <motion.li
                  key={category.id}
                  className={`flex items-center gap-3 cursor-pointer ${
                    category.active ? "text-white" : "text-zinc-500"
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                  whileHover={{
                    x: 10,
                    color: "white",
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={category.active ? { x: 0, color: "white" } : { x: 0 }}
                  animate={
                    category.active
                      ? {
                          x: 5,
                          color: "white",
                          transition: { type: "spring", stiffness: 400, damping: 10 },
                        }
                      : {
                          x: 0,
                          transition: { type: "spring", stiffness: 400, damping: 10 },
                        }
                  }
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full ${category.active ? "bg-white" : "bg-zinc-500"}`}
                    animate={
                      category.active
                        ? {
                            scale: [1, 1.5, 1],
                            backgroundColor: "rgb(255, 255, 255)",
                            transition: { duration: 0.5 },
                          }
                        : {}
                    }
                  />
                  <span className={`text-xl ${category.active ? "font-bold" : "font-normal"}`}>{category.name}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Bottom padding for player */}
          <div className="h-24"></div>
        </div>
      </div>
    </div>
  )
}
