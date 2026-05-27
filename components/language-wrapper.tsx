"use client"

import { useLanguageStore } from "@/lib/language-store"
import { useEffect, ReactNode } from "react"

export function LanguageWrapper({ children }: { children: ReactNode }) {
  const { language } = useLanguageStore()

  useEffect(() => {
    // Update html attributes for RTL and lang
    const html = document.documentElement
    html.setAttribute("lang", language)
    html.setAttribute("dir", language === "ar" ? "rtl" : "ltr")
    
    // Update font class
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
    </div>
  )
}
