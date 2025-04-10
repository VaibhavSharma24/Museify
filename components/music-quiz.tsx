"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { ConfettiEffect } from "@/components/confetti-effect"

interface Question {
  id: number
  question: string
  answers: string[]
  correctAnswer: string
}

interface MusicQuizProps {
  isOpen: boolean
  onClose: () => void
}

// Changed from default export to named export
export function MusicQuiz({ isOpen, onClose }: MusicQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [score, setScore] = useState(0)
  const resultTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Sample music quiz questions
  const questions: Question[] = [
    {
      id: 1,
      question: "Which artist released the album 'Thriller'?",
      answers: ["Michael Jackson", "Prince", "Madonna", "Whitney Houston"],
      correctAnswer: "Michael Jackson",
    },
    {
      id: 2,
      question: "What instrument does a drummer play?",
      answers: ["Drums", "Guitar", "Piano", "Violin"],
      correctAnswer: "Drums",
    },
    {
      id: 3,
      question: "Which of these is NOT a music genre?",
      answers: ["Jazz", "Rock", "Polka", "Fizzle"],
      correctAnswer: "Fizzle",
    },
    {
      id: 4,
      question: "Who sang 'Shape of You'?",
      answers: ["Ed Sheeran", "Justin Bieber", "Bruno Mars", "The Weeknd"],
      correctAnswer: "Ed Sheeran",
    },
    {
      id: 5,
      question: "Which band performed 'Bohemian Rhapsody'?",
      answers: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"],
      correctAnswer: "Queen",
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]

  // Reset quiz when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentQuestionIndex(0)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setShowResult(false)
        setScore(0)
      }, 300)
    }
  }, [isOpen])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    const correct = answer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    // Update score for correct answers
    if (correct) {
      setScore((prev) => prev + 1)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }

    // Clear any existing timeout
    if (resultTimeoutRef.current) {
      clearTimeout(resultTimeoutRef.current)
    }

    // Set a timeout to move to the next question or close the quiz
    resultTimeoutRef.current = setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setShowResult(false)
      } else {
        // Quiz completed - show final score for a moment before closing
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <AnimatePresence>
        <motion.div
          className="relative bg-zinc-900 rounded-xl shadow-2xl p-8 max-w-md w-full border border-zinc-700"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            aria-label="Close quiz"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Quiz header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Music Quiz</h2>
            <div className="flex justify-center space-x-1 mb-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-6 rounded-full ${
                    index === currentQuestionIndex
                      ? "bg-[rgb(154,87,222)]"
                      : index < currentQuestionIndex
                        ? "bg-green-500"
                        : "bg-zinc-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-zinc-400 text-sm">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          {/* Question card with swipe animation */}
          <motion.div
            className="bg-zinc-800 rounded-lg p-6 mb-6"
            animate={
              showResult
                ? {
                    x: isCorrect ? [0, 20, 0] : [0, -20, 0],
                    transition: { duration: 0.3 },
                  }
                : {}
            }
          >
            <h3 className="text-xl font-medium text-white mb-4">{currentQuestion.question}</h3>
          </motion.div>

          {/* Answer options */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {currentQuestion.answers.map((answer) => (
              <motion.button
                key={answer}
                className={`p-4 rounded-lg text-white text-left transition-colors ${
                  selectedAnswer === answer
                    ? isCorrect && selectedAnswer === currentQuestion.correctAnswer
                      ? "bg-green-600"
                      : "bg-red-600"
                    : "bg-zinc-700 hover:bg-zinc-600"
                }`}
                onClick={() => !selectedAnswer && handleAnswerSelect(answer)}
                disabled={selectedAnswer !== null}
                whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
                whileTap={{ scale: selectedAnswer ? 1 : 0.98 }}
              >
                {answer}
              </motion.button>
            ))}
          </div>

          {/* Result message */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                className={`text-center p-3 rounded-lg ${
                  isCorrect ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <p className="font-bold text-lg">{isCorrect ? "Correct! 🎉" : "Wrong! Try again next time."}</p>
                {currentQuestionIndex === questions.length - 1 && showResult && (
                  <p className="mt-2 font-medium">
                    Final Score: {score} out of {questions.length}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confetti effect for correct answers */}
          <ConfettiEffect isActive={showConfetti} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
