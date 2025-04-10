"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface Mood {
  id: string
  name: string
  emoji: string
  description: string
  color: string
}

export default function MoodSelectionPage() {
  const router = useRouter()
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const moods: Mood[] = [
    {
      id: "happy",
      name: "Happy",
      emoji: "😀",
      description: "Upbeat tunes to brighten your day",
      color: "bg-orange-500",
    },
    {
      id: "calm",
      name: "Calm",
      emoji: "😌",
      description: "Peaceful melodies for relaxation",
      color: "bg-purple-500",
    },
    {
      id: "romantic",
      name: "Romantic",
      emoji: "❤️",
      description: "Love songs to set the mood",
      color: "bg-pink-500",
    },
    {
      id: "energetic",
      name: "Energetic",
      emoji: "⚡",
      description: "High-tempo beats to boost your energy",
      color: "bg-blue-500",
    },
  ]

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
  }

  const handleContinue = () => {
    if (!selectedMood) return

    setIsAnimating(true)

    // Simulate loading and then navigate
    setTimeout(() => {
      router.push(`/home?mood=${selectedMood}`)
    }, 1000)
  }

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation Bar */}
      <header className="w-full py-4 px-6 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-[rgb(154,87,222)]/20"
              onClick={handleBackClick}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[rgb(154,87,222)] flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="font-bold text-lg">Museify</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full text-sm px-4">
              Log in
            </Button>
            <Button className="bg-[rgb(154,87,222)] hover:bg-[rgb(174,107,242)] text-white rounded-full text-sm px-4">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Background text */}
      <div className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none">
        <h1 className="text-[20vw] font-bold text-zinc-900">Museify</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-6xl px-6">
          {moods.map((mood) => (
            <motion.div
              key={mood.id}
              className={`flex flex-col items-center cursor-pointer`}
              onClick={() => handleMoodSelect(mood.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`${mood.color} w-44 h-44 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center p-4 ${selectedMood === mood.id ? "ring-4 ring-white" : ""}`}
                animate={{
                  scale: selectedMood === mood.id ? 1.1 : 1,
                  boxShadow: selectedMood === mood.id ? "0 0 20px rgba(255,255,255,0.5)" : "none",
                }}
              >
                <motion.span
                  className="text-5xl mb-3"
                  whileHover={{
                    scale: 1.3,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {mood.emoji}
                </motion.span>
                <h3 className="text-xl font-bold text-white">{mood.name}</h3>
                <p className="text-xs text-center text-white/90 mt-1">{mood.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continue button */}
      {selectedMood && (
        <div className="fixed bottom-10 left-0 right-0 flex justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Button
              onClick={handleContinue}
              disabled={isAnimating}
              className="bg-[rgb(154,87,222)] hover:bg-[rgb(174,107,242)] text-white px-8 py-6 rounded-full text-lg font-medium"
            >
              {isAnimating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
