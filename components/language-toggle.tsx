"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLanguageStore } from "@/lib/language-store"
import { Globe } from "lucide-react"
import { useState } from "react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = (lang: "en" | "ar") => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium uppercase">{language}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-50 min-w-[140px]"
            >
              <button
                onClick={() => toggleLanguage("en")}
                className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-white/5 transition-colors ${language === "en" ? "text-accent" : "text-foreground"
                  }`}
              >
                <span className="text-lg">🇺🇸</span>
                <span>English</span>
                {language === "en" && (
                  <motion.div
                    layoutId="language-check"
                    className="ml-auto w-2 h-2 rounded-full bg-accent"
                  />
                )}
              </button>
              <button
                onClick={() => toggleLanguage("ar")}
                className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-white/5 transition-colors ${language === "ar" ? "text-accent" : "text-foreground"
                  }`}
              >
                <span className="text-lg">🇸🇦</span>
                <span>العربية</span>
                {language === "ar" && (
                  <motion.div
                    layoutId="language-check"
                    className="ml-auto w-2 h-2 rounded-full bg-accent"
                  />
                )}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
