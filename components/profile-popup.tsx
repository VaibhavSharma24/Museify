"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  User,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
  X,
  Music,
  Heart,
  Clock,
  UserPlus,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProfilePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfilePopup({ isOpen, onClose }: ProfilePopupProps) {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<"account" | "activity">("account")

  // Mock user data
  const user = {
    name: "James Rodriguez",
    email: "james.rodriguez@example.com",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ellipse%201-tKOo7FglivvkW5MFe0U8pJbvMJ9jJK.png",
    premium: true,
    followers: 245,
    following: 118,
    playlists: 12,
    recentActivity: [
      { id: 1, type: "liked", content: "Shape of You", artist: "Ed Sheeran", time: "2 hours ago" },
      { id: 2, type: "playlist", content: "Chill Vibes", count: 12, time: "Yesterday" },
      { id: 3, type: "followed", content: "Taylor Swift", time: "2 days ago" },
      { id: 4, type: "listened", content: "Levitating", artist: "Dua Lipa", time: "3 days ago" },
    ],
  }

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-zinc-900 rounded-xl overflow-hidden w-full max-w-md shadow-2xl border border-zinc-800"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header with user info */}
            <div className="relative">
              {/* Background gradient */}
              <div className="h-24 bg-gradient-to-r from-[rgb(154,87,222)] to-purple-900"></div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/30 text-white p-1.5 rounded-full hover:bg-black/50 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Profile picture */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-zinc-900 overflow-hidden">
                    <Image
                      src={user.image || "/placeholder.svg"}
                      alt={user.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  {user.premium && (
                    <Badge className="absolute bottom-1 right-1 bg-yellow-500 text-black font-bold px-2 py-1">
                      PREMIUM
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* User info */}
            <div className="pt-16 pb-4 px-6 text-center">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-zinc-400 text-sm mt-1">{user.email}</p>

              {/* Stats */}
              <div className="flex justify-center gap-6 mt-2">
                <div className="text-center">
                  <p className="text-xl font-bold">{user.followers}</p>
                  <p className="text-xs text-zinc-400">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{user.following}</p>
                  <p className="text-xs text-zinc-400">Following</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{user.playlists}</p>
                  <p className="text-xs text-zinc-400">Playlists</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-zinc-800 mt-3">
                <button
                  className={`flex-1 py-3 text-sm font-medium relative ${activeTab === "account" ? "text-white" : "text-zinc-400"}`}
                  onClick={() => setActiveTab("account")}
                >
                  Account
                  {activeTab === "account" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(154,87,222)]"
                      layoutId="activeTab"
                    />
                  )}
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-medium relative ${activeTab === "activity" ? "text-white" : "text-zinc-400"}`}
                  onClick={() => setActiveTab("activity")}
                >
                  Activity
                  {activeTab === "activity" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(154,87,222)]"
                      layoutId="activeTab"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="px-6 pb-4">
              <AnimatePresence mode="wait">
                {activeTab === "account" ? (
                  <motion.div
                    key="account"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Account settings */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[rgb(154,87,222)]/20 flex items-center justify-center">
                            <User size={16} className="text-[rgb(154,87,222)]" />
                          </div>
                          <span>Edit Profile</span>
                        </div>
                        <ChevronRight size={16} className="text-zinc-400" />
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[rgb(154,87,222)]/20 flex items-center justify-center">
                            <CreditCard size={16} className="text-[rgb(154,87,222)]" />
                          </div>
                          <span>Subscription</span>
                        </div>
                        <Badge className="bg-yellow-500 text-black text-xs">PREMIUM</Badge>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[rgb(154,87,222)]/20 flex items-center justify-center">
                            <Bell size={16} className="text-[rgb(154,87,222)]" />
                          </div>
                          <span>Notifications</span>
                        </div>
                        <ChevronRight size={16} className="text-zinc-400" />
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[rgb(154,87,222)]/20 flex items-center justify-center">
                            {theme === "dark" ? (
                              <Moon size={16} className="text-[rgb(154,87,222)]" />
                            ) : (
                              <Sun size={16} className="text-[rgb(154,87,222)]" />
                            )}
                          </div>
                          <span>Dark Mode</span>
                        </div>
                        <Switch
                          checked={theme === "dark"}
                          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                        />
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[rgb(154,87,222)]/20 flex items-center justify-center">
                            <Settings size={16} className="text-[rgb(154,87,222)]" />
                          </div>
                          <span>Settings</span>
                        </div>
                        <ChevronRight size={16} className="text-zinc-400" />
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                            <LogOut size={16} className="text-red-500" />
                          </div>
                          <span className="text-red-500">Log Out</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="activity"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Activity feed */}
                    <div className="space-y-4">
                      {user.recentActivity.slice(0, 3).map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-[rgb(154,87,222)]/20 flex items-center justify-center mt-1">
                            {activity.type === "liked" && <Heart size={16} className="text-[rgb(154,87,222)]" />}
                            {activity.type === "playlist" && <Music size={16} className="text-[rgb(154,87,222)]" />}
                            {activity.type === "followed" && <UserPlus size={16} className="text-[rgb(154,87,222)]" />}
                            {activity.type === "listened" && <Clock size={16} className="text-[rgb(154,87,222)]" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">
                              {activity.type === "liked" && (
                                <>
                                  You liked <span className="font-medium">{activity.content}</span> by {activity.artist}
                                </>
                              )}
                              {activity.type === "playlist" && (
                                <>
                                  You created playlist <span className="font-medium">{activity.content}</span> with{" "}
                                  {activity.count} songs
                                </>
                              )}
                              {activity.type === "followed" && (
                                <>
                                  You followed <span className="font-medium">{activity.content}</span>
                                </>
                              )}
                              {activity.type === "listened" && (
                                <>
                                  You listened to <span className="font-medium">{activity.content}</span> by{" "}
                                  {activity.artist}
                                </>
                              )}
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full mt-4 bg-zinc-800 hover:bg-zinc-700 text-white">View All Activity</Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
