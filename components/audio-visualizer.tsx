"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface AudioVisualizerProps {
  audioData: number[]
  mood: string
}

export function AudioVisualizer({ audioData, mood }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Color schemes for different moods
  const moodColors = {
    lofi: {
      primary: "rgba(154, 87, 222, 0.7)",
      secondary: "rgba(154, 87, 222, 0.5)",
      tertiary: "rgba(154, 87, 222, 0.3)",
    },
    edm: {
      primary: "rgba(16, 185, 129, 0.7)",
      secondary: "rgba(37, 99, 235, 0.5)",
      tertiary: "rgba(5, 150, 105, 0.3)",
    },
    rock: {
      primary: "rgba(239, 68, 68, 0.7)",
      secondary: "rgba(249, 115, 22, 0.5)",
      tertiary: "rgba(220, 38, 38, 0.3)",
    },
    jazz: {
      primary: "rgba(245, 158, 11, 0.7)",
      secondary: "rgba(252, 211, 77, 0.5)",
      tertiary: "rgba(217, 119, 6, 0.3)",
    },
    acoustic: {
      primary: "rgba(20, 184, 166, 0.7)",
      secondary: "rgba(16, 185, 129, 0.5)",
      tertiary: "rgba(6, 148, 162, 0.3)",
    },
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Animation function
    const draw = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Get colors for current mood
      const colors = moodColors[mood as keyof typeof moodColors] || moodColors.lofi

      // Draw based on mood
      if (mood === "lofi") {
        // Lo-Fi: Soft circular waves
        for (let i = 0; i < audioData.length; i += 4) {
          const amplitude = audioData[i] || 5
          const radius = 100 + amplitude * 2

          ctx.beginPath()
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
          ctx.strokeStyle = `rgba(154, 87, 222, ${0.1 + amplitude / 200})`
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Floating particles
        for (let i = 0; i < audioData.length; i++) {
          const angle = (i / audioData.length) * Math.PI * 2
          const amplitude = audioData[i] || 5
          const x = centerX + Math.cos(angle) * (150 + amplitude * 3)
          const y = centerY + Math.sin(angle) * (150 + amplitude * 2)

          ctx.beginPath()
          ctx.arc(x, y, 2 + amplitude / 20, 0, 2 * Math.PI)
          ctx.fillStyle = i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary
          ctx.fill()
        }
      } else if (mood === "edm") {
        // EDM: Energetic bars and pulses
        const barWidth = canvas.width / (audioData.length * 2)

        for (let i = 0; i < audioData.length; i++) {
          const amplitude = audioData[i] || 5
          const height = amplitude * 2

          // Bottom bars
          ctx.fillStyle = i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary

          // Left side
          ctx.fillRect(centerX - i * barWidth * 1.5 - barWidth / 2, centerY + 50, barWidth, height)

          // Right side
          ctx.fillRect(centerX + i * barWidth * 1.5 - barWidth / 2, centerY + 50, barWidth, height)

          // Top bars (mirrored)
          ctx.fillRect(centerX - i * barWidth * 1.5 - barWidth / 2, centerY - 50 - height, barWidth, height)

          ctx.fillRect(centerX + i * barWidth * 1.5 - barWidth / 2, centerY - 50 - height, barWidth, height)
        }

        // Center pulse
        const maxAmplitude = Math.max(...audioData)
        ctx.beginPath()
        ctx.arc(centerX, centerY, 30 + maxAmplitude, 0, 2 * Math.PI)
        ctx.fillStyle = `rgba(16, 185, 129, ${0.2 + maxAmplitude / 200})`
        ctx.fill()
      } else if (mood === "rock") {
        // Rock: Angular, sharp visualizations
        ctx.beginPath()
        ctx.moveTo(centerX, centerY - 100)

        for (let i = 0; i < audioData.length; i++) {
          const amplitude = audioData[i] || 5
          const angle = (i / audioData.length) * Math.PI * 2
          const radius = 100 + amplitude * 2
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius

          ctx.lineTo(x, y)
        }

        ctx.closePath()
        ctx.strokeStyle = colors.primary
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)"
        ctx.fill()

        // Jagged lines
        for (let j = 0; j < 3; j++) {
          ctx.beginPath()

          for (let i = 0; i < canvas.width; i += 20) {
            const index = Math.floor((i / canvas.width) * audioData.length)
            const amplitude = audioData[index] || 5

            ctx.lineTo(i, j * 200 + 100 + amplitude * (j + 1))
          }

          ctx.strokeStyle = j === 0 ? colors.primary : j === 1 ? colors.secondary : colors.tertiary
          ctx.lineWidth = 2
          ctx.stroke()
        }
      } else if (mood === "jazz") {
        // Jazz: Smooth, flowing curves
        for (let j = 0; j < 3; j++) {
          ctx.beginPath()

          for (let i = 0; i < audioData.length; i++) {
            const amplitude = audioData[i] || 5
            const x = (i / audioData.length) * canvas.width
            const y = centerY + Math.sin(i * 0.2 + j) * amplitude * (j + 1)

            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }

          ctx.strokeStyle = j === 0 ? colors.primary : j === 1 ? colors.secondary : colors.tertiary
          ctx.lineWidth = 3
          ctx.stroke()
        }

        // Floating notes
        for (let i = 0; i < 10; i++) {
          const amplitude = audioData[i * 5] || 5
          const x = centerX + Math.cos(i) * 200
          const y = centerY + Math.sin(i * 2) * 100 + Math.sin(Date.now() * 0.001 + i) * 50

          ctx.beginPath()
          ctx.arc(x, y, 5 + amplitude / 10, 0, 2 * Math.PI)
          ctx.fillStyle = colors.secondary
          ctx.fill()

          // Stem for music note
          if (i % 2 === 0) {
            ctx.beginPath()
            ctx.moveTo(x + 5, y)
            ctx.lineTo(x + 5, y - 20 - amplitude / 5)
            ctx.strokeStyle = colors.primary
            ctx.lineWidth = 2
            ctx.stroke()
          }
        }
      } else if (mood === "acoustic") {
        // Acoustic: Gentle ripples and waves
        for (let j = 0; j < 5; j++) {
          ctx.beginPath()

          for (let i = 0; i < canvas.width; i += 5) {
            const index = Math.floor((i / canvas.width) * audioData.length)
            const amplitude = audioData[index] || 5

            const y = centerY + (Math.sin(i * 0.01 + Date.now() * 0.001 + j) * (20 + amplitude / 2) * (j + 1)) / 3

            if (i === 0) {
              ctx.moveTo(i, y)
            } else {
              ctx.bezierCurveTo(i - 5, y - 5, i - 2, y + 5, i, y)
            }
          }

          ctx.strokeStyle = `rgba(20, 184, 166, ${0.1 + j * 0.05})`
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Gentle circles
        for (let i = 0; i < audioData.length; i += 8) {
          const amplitude = audioData[i] || 5
          const angle = (i / audioData.length) * Math.PI * 2
          const radius = 50 + amplitude / 2
          const x = centerX + Math.cos(angle) * 200
          const y = centerY + Math.sin(angle) * 100

          ctx.beginPath()
          ctx.arc(x, y, radius / 10, 0, 2 * Math.PI)
          ctx.fillStyle = i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary
          ctx.fill()
        }
      }

      requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [audioData, mood])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
