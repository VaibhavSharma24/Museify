"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronDown, Heart, Download, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ArtistsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)

  // Auto-scroll effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current && !hasScrolled) {
        containerRef.current.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        })
        setHasScrolled(true)
        setShowScrollIndicator(false)
      }
    }, 3000) // Auto-scroll after 3 seconds

    return () => clearTimeout(timer)
  }, [hasScrolled])

  // Handle manual scroll
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        if (containerRef.current.scrollTop > 50) {
          setShowScrollIndicator(false)
          setHasScrolled(true)
        }
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

  // Ensure video plays
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="/videos/artists-background.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay for better text visibility */}
      <div className="fixed inset-0 bg-black/30 z-0"></div>

      {/* First section */}
      <section className="relative w-full h-screen snap-start flex flex-col justify-end z-10">
        {/* Back button - positioned absolutely */}
        <Link href="/home" className="absolute top-6 left-6">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </motion.div>
        </Link>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <p className="mb-2 text-sm font-medium">Scroll down</p>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        )}

        {/* Content for first section */}
        <div className="container mx-auto px-6 pb-16">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Featured Artists
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Discover the most talented artists from around the world
          </motion.p>
        </div>
      </section>

      {/* Second section */}
      <section className="relative w-full h-screen snap-start flex items-end z-10">
        {/* Content for second section */}
        <div className="container mx-auto px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-start"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">ElGrandeToto</h2>
            <p className="text-xl text-white/80 mb-6">Moroccan rap sensation</p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full text-lg">
              Play All
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Third section */}
      <section className="relative w-full h-screen snap-start flex items-end z-10">
        {/* Action buttons */}
        <div className="absolute top-8 right-8 flex space-x-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black/30 backdrop-blur-sm p-3 rounded-full"
          >
            <Heart className="w-6 h-6 text-white" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black/30 backdrop-blur-sm p-3 rounded-full"
          >
            <Download className="w-6 h-6 text-white" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black/30 backdrop-blur-sm p-3 rounded-full"
          >
            <MoreVertical className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* Content for third section */}
        <div className="container mx-auto px-6 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center mb-2">
              <h2 className="text-3xl md:text-5xl font-bold text-white">Inkonnu</h2>
              <div className="ml-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                <p className="text-sm text-white/80">52,646 likes / 3h 6m</p>
              </div>
            </div>
            <p className="text-xl text-white/80 mb-6 max-w-2xl">
              This is Inkonnu, Les titres incontournables, réunis dans une seule et même playlist
            </p>

            {/* Track list */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 mb-8 w-full max-w-md">
              <div className="flex items-center mb-4 p-2 hover:bg-white/10 rounded-md">
                <div className="w-12 h-12 bg-black/50 rounded-md mr-4"></div>
                <div>
                  <p className="font-medium text-white">Zahri</p>
                  <p className="text-sm text-white/70">Inkonnu</p>
                </div>
              </div>
              <div className="flex items-center mb-4 p-2 hover:bg-white/10 rounded-md">
                <div className="w-12 h-12 bg-black/50 rounded-md mr-4"></div>
                <div>
                  <p className="font-medium text-white">Arabi</p>
                  <p className="text-sm text-white/70">Inkonnu</p>
                </div>
              </div>
              <div className="flex items-center p-2 hover:bg-white/10 rounded-md">
                <div className="w-12 h-12 bg-black/50 rounded-md mr-4"></div>
                <div>
                  <p className="font-medium text-white">Magwani</p>
                  <p className="text-sm text-white/70">Inkonnu</p>
                </div>
              </div>
            </div>

            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-6 rounded-full text-lg">
              Discover
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
