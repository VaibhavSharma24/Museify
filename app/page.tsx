"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function IntroPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }

    return () => clearTimeout(timer)
  }, [])

  const handleGetStarted = () => {
    router.push("/mood-selection")
  }

  // Letter animation for title
  const titleLetters = "Museify".split("")

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Albums_VIdeo_original-61a3955739d4c13858555dfc61501eb9-tz1m5r3HA3oTMNmGBJod5fSHPVfWRJ.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[rgb(154,87,222)] flex items-center justify-center mb-4">
              <Music className="w-8 h-8 text-white animate-pulse" />
            </div>
            <motion.div
              className="h-1 bg-[rgb(154,87,222)] rounded-full mt-4"
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 2 }}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.2,
              }}
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
                transition: { duration: 0.5 },
              }}
              className="w-24 h-24 rounded-full bg-[rgb(154,87,222)] flex items-center justify-center mb-6 cursor-pointer shadow-[0_0_15px_rgba(154,87,222,0.6)]"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18V6L21 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="2" />
                <circle cx="18" cy="15" r="3" stroke="white" strokeWidth="2" />
              </svg>
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h1 className="text-5xl font-bold mb-4" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                {titleLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: -150, opacity: 0, scale: 2 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 0.4 + index * 0.1,
                    }}
                    whileHover={{
                      scale: 1.5,
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.3 },
                    }}
                    className="inline-block cursor-pointer text-[rgb(154,87,222)] hover:text-white"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            <motion.p
              className="text-xl text-zinc-300 mb-8 max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 1.2,
              }}
            >
              Your personalized music experience tailored to your mood and preferences
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 1.4,
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 25px rgba(154,87,222,0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleGetStarted}
                  className="bg-[rgb(154,87,222)] hover:bg-[rgb(174,107,242)] text-white px-8 py-6 rounded-full text-lg font-medium flex items-center gap-2 transition-all duration-300"
                >
                  <span>Get Started</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 1,
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 1.6,
              }}
            >
              {[
                {
                  title: "Personalized",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="rgb(154,87,222)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                        stroke="rgb(154,87,222)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                        stroke="rgb(154,87,222)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Mood-based",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="rgb(154,87,222)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                        stroke="rgb(154,87,222)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 9H9.01"
                        stroke="rgb(154,87,222)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 9H15.01"
                        stroke="rgb(154,87,222)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Immersive",
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 16L10.879 13.121M10.879 13.121C11.1537 13.4071 11.4819 13.6346 11.8427 13.7897C12.2034 13.9447 12.5899 14.0244 12.9799 14.0244C13.3699 14.0244 13.7564 13.9447 14.1171 13.7897C14.4779 13.6346 14.8061 13.4071 15.0808 13.121M10.879 13.121L13.121 10.879M15.0808 13.121C15.3665 12.8353 15.5941 12.5071 15.7491 12.1464C15.9042 11.7856 15.9839 11.3991 15.9839 11.0091C15.9839 10.6191 15.9042 10.2326 15.7491 9.87187C15.5941 9.51114 15.3665 9.18291 15.0808 8.89718M15.0808 13.121L12.879 10.9192M15.0808 8.89718C14.8061 8.61147 14.4779 8.38397 14.1171 8.22894C13.7564 8.0739 13.3699 7.99414 12.9799 7.99414C12.5899 7.99414 12.2034 8.0739 11.8427 8.22894C11.4819 8.38397 11.1537 8.61147 10.879 8.89718M15.0808 8.89718L12.879 11.0992M10.879 8.89718C10.5933 9.18291 10.3658 9.51114 10.2107 9.87187C10.0557 10.2326 9.97594 10.6191 9.97594 11.0091C9.97594 11.3991 10.0557 11.7856 10.2107 12.1464C10.3658 12.5071 10.5933 12.8353 10.879 13.121M10.879 8.89718L13.121 11.1392M16 8L8 16"
                        stroke="rgb(154,87,222)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.2 }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-[rgb(154,87,222)]/20 flex items-center justify-center mx-auto mb-2"
                    whileHover={{
                      backgroundColor: "rgba(154,87,222,0.4)",
                      boxShadow: "0 0 15px rgba(154,87,222,0.6)",
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-sm font-medium">{feature.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
