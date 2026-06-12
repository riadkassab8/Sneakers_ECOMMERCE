'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { create } from 'zustand'
import { useLanguageStore } from '@/lib/language-store'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
  description?: string
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).slice(2)
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 4000)
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  },
}))

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore()
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  }

  const colors = {
    success: 'text-green-500',
    error: 'text-destructive',
    info: 'text-accent',
  }

  return (
    <div className={`fixed top-20 z-50 space-y-3 ${isRTL ? 'left-4' : 'right-4'}`}>
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: isRTL ? -100 : 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: isRTL ? -100 : 100, scale: 0.9 }}
              className={`flex items-start gap-3 p-4 bg-card border border-border rounded-xl shadow-xl max-w-sm ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${colors[toast.type]}`} />
              <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                <p className="font-medium">{toast.message}</p>
                {toast.description && (
                  <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-secondary rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
