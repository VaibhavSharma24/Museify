"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Headphones, Zap, Flame, Music, Guitar } from "lucide-react"
import type { JSX } from "react"

interface GenreBubblesProps {
  currentMood: string
  onMoodChange: (mood: string) => void
}

interface Bubble {
  id: string
  x: number
  y: number
  size: number
  icon: JSX.Element
  color: string
}

export function GenreBubbles({ currentMood, onMoodChange }: GenreBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    // Create bubbles with random positions
    const newBubbles: Bubble[] = [
      {
        id: "lofi",
        x: Math.random() * 80,
        y: Math.random() * 80,
        size: 70,
        icon: <Headphones className="w-6 h-6" />,
        color: "bg-purple-500",
      },
      {
        id: "edm",
        x: Math.random() * 80,
        y: Math.random() * 80,
        size: 80,
        icon: <Zap className="w-6 h-6" />,
        color: "bg-[rgb(154,87,222)]",
      },
      {
        id: "rock",
        x: Math.random() * 80,
        y: Math.random() * 80,
        size: 75,
        icon: <Flame className="w-6 h-6" />,
        color: "bg-red-500",
      },
      {
        id: "jazz",
        x: Math.random() * 80,
        y: Math.random() * 80,
        size: 65,
        icon: <Music className="w-6 h-6" />,
        color: "bg-amber-500",
      },
      {
        id: "acoustic",
        x: Math.random() * 80,
        y: Math.random() * 80,
        size: 60,
        icon: <Guitar className="w-6 h-6" />,
        color: "bg-teal-500",
      },
    ]

    setBubbles(newBubbles)
  }, [])

  return (
    <div className="relative w-full h-full">
      {bubbles.map((bubble) => (
        <motion.button
          key={bubble.id}
          className={`absolute rounded-full flex items-center justify-center text-white shadow-lg ${
            currentMood === bubble.id ? `${bubble.color} ring-4 ring-white/50` : `${bubble.color} opacity-70`
          }`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 20 - 10, 0],
            y: [0, Math.random() * 20 - 10, 0],
            scale: currentMood === bubble.id ? 1.2 : 1,
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          whileHover={{
            scale: 1.2,
            opacity: 1,
            boxShadow: "0 0 20px rgba(255,255,255,0.5)",
          }}
          onClick={() => onMoodChange(bubble.id)}
        >
          {bubble.icon}
        </motion.button>
      ))}
    </div>
  )
}
