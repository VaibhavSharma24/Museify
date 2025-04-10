"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotation: number
}

interface ConfettiEffectProps {
  isActive: boolean
}

export function ConfettiEffect({ isActive }: ConfettiEffectProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (!isActive) {
      setConfetti([])
      return
    }

    // Generate confetti pieces
    const pieces: ConfettiPiece[] = []
    const colors = [
      "#9A57DE", // Purple
      "#FF5733", // Orange
      "#33FF57", // Green
      "#3357FF", // Blue
      "#FF33A8", // Pink
      "#FFD700", // Gold
    ]

    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 10,
        rotation: Math.random() * 360,
      })
    }

    setConfetti(pieces)

    // Clean up after animation
    const timer = setTimeout(() => {
      setConfetti([])
    }, 5000)

    return () => clearTimeout(timer)
  }, [isActive])

  if (!isActive || confetti.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: piece.size,
            height: piece.size * 1.5,
            backgroundColor: piece.color,
            borderRadius: "1px",
          }}
          initial={{ y: piece.y, x: piece.x, rotate: 0 }}
          animate={{
            y: `calc(100vh + ${piece.size}px)`,
            x: `calc(${piece.x}% + ${(Math.random() - 0.5) * 200}px)`,
            rotate: piece.rotation + Math.random() * 360,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
