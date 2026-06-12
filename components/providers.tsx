"use client"

import { useLanguageStore } from "@/lib/language-store"
import { useCartStore, useWishlistStore } from "@/lib/store"
import { ToastProvider } from "@/components/toast"
import { useEffect, ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  const { language } = useLanguageStore()

  useEffect(() => {
    useLanguageStore.persist.rehydrate()
    useCartStore.persist.rehydrate()
    useWishlistStore.persist.rehydrate()
  }, [])

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute("lang", language)
    html.setAttribute("dir", language === "ar" ? "rtl" : "ltr")

    if (language === "ar") {
      html.classList.add("font-arabic")
      html.classList.remove("font-sans")
    } else {
      html.classList.remove("font-arabic")
      html.classList.add("font-sans")
    }
  }, [language])

  return (
    <div className={language === "ar" ? "font-arabic" : "font-sans"}>
      {children}
      <ToastProvider />
    </div>
  )
}
