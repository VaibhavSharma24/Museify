"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface Toast {
  id: string
  title: string
  description: string
  action?: React.ReactNode
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (toast: Omit<Toast, "id">) => {
    setToasts([...toasts, { ...toast, id: Math.random().toString(36).substring(2) }])
  }

  const removeToast = (id: string) => {
    setToasts(toasts.filter((t) => t.id !== id))
  }

  return <ToastContext.Provider value={{ toasts, showToast, removeToast }}>{children}</ToastContext.Provider>
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const toast = (toast: Omit<Toast, "id">) => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("toast must be used within a ToastProvider")
  }
  context.showToast(toast)
}
