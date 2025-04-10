"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface MoodSelectorProps {
  currentMood: string
  onMoodChange: (mood: string) => void
}

export function MoodSelector({ currentMood, onMoodChange }: MoodSelectorProps) {
  const moods = [
    { id: "lofi", label: "Lo-Fi" },
    { id: "edm", label: "EDM" },
    { id: "rock", label: "Rock" },
    { id: "jazz", label: "Jazz" },
    { id: "acoustic", label: "Acoustic" },
  ]

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {moods.map((mood) => (
        <motion.div key={mood.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={currentMood === mood.id ? "default" : "outline"}
            onClick={() => onMoodChange(mood.id)}
            className={`rounded-full px-6 transition-all duration-300 ${
              currentMood === mood.id ? "shadow-lg" : "hover:shadow-md"
            }`}
          >
            {mood.label}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
