"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface EmojiBackgroundProps {
  emoji: string
  mood: string
}

interface EmojiPosition {
  id: number
  x: number
  y: number
  scale: number
  rotate: number
  delay: number
}

export function EmojiBackground({ emoji, mood }: EmojiBackgroundProps) {
  const [emojis, setEmojis] = useState<EmojiPosition[]>([])

  useEffect(() => {
    // Generate random positions for emojis
    const count = 30 // Number of emojis to display
    const newEmojis: EmojiPosition[] = []

    for (let i = 0; i < count; i++) {
      newEmojis.push({
        id: i,
        x: Math.random() * 100, // Random x position (0-100%)
        y: Math.random() * 100, // Random y position (0-100%)
        scale: 0.5 + Math.random() * 1.5, // Random size
        rotate: Math.random() * 360, // Random rotation
        delay: i * 0.03, // Staggered delay for animation
      })
    }

    setEmojis(newEmojis)
  }, [mood]) // Regenerate when mood changes

  // Different animation patterns based on mood
  const getAnimationVariants = () => {
    switch (mood) {
      case "happy":
        return {
          initial: { opacity: 0, scale: 0 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } },
        }
      case "calm":
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
        }
      case "romantic":
        return {
          initial: { opacity: 0, scale: 0 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } },
        }
      case "energetic":
        return {
          initial: { opacity: 0, scale: 0, rotate: -180 },
          animate: { opacity: 1, scale: 1, rotate: 0 },
          exit: { opacity: 0, scale: 0, rotate: 180, transition: { duration: 0.3 } },
        }
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0, transition: { duration: 0.3 } },
        }
    }
  }

  // Different movement animations based on mood
  const getMovementAnimation = (emojiPosition: EmojiPosition) => {
    switch (mood) {
      case "happy":
        return {
          y: [0, -20, 0, -10, 0],
          x: [0, 10, -10, 5, 0],
          transition: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 5 + Math.random() * 5,
          },
        }
      case "calm":
        return {
          y: [0, -10, 0, -5, 0],
          transition: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            duration: 8 + Math.random() * 7,
          },
        }
      case "romantic":
        return {
          scale: [emojiPosition.scale, emojiPosition.scale * 1.2, emojiPosition.scale],
          transition: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 3 + Math.random() * 2,
          },
        }
      case "energetic":
        return {
          x: [0, 20, -20, 10, -10, 0],
          y: [0, -15, 10, -5, 15, 0],
          rotate: [0, 20, -20, 10, -10, 0],
          transition: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 3 + Math.random() * 3,
          },
        }
      default:
        return {
          y: [0, -10, 0],
          transition: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 5 + Math.random() * 3,
          },
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <div className="absolute inset-0 overflow-hidden z-5 pointer-events-none">
      {emojis.map((emojiPosition) => (
        <motion.div
          key={emojiPosition.id}
          className="absolute text-2xl sm:text-3xl md:text-4xl"
          style={{
            left: `${emojiPosition.x}%`,
            top: `${emojiPosition.y}%`,
            opacity: 0.7,
          }}
          initial="initial"
          animate={["animate", getMovementAnimation(emojiPosition)]}
          exit="exit"
          variants={variants}
          transition={{
            delay: emojiPosition.delay,
            duration: 0.5,
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  )
}
