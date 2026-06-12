'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag, User, Menu, X, LayoutDashboard } from 'lucide-react'
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store'
import { useLanguageStore, t as translate } from '@/lib/language-store'
import { LanguageToggle } from '@/components/language-toggle'
import { useState, useEffect } from 'react'

export function Header() {
  const pathname = usePathname()
  const { getItemCount } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { setCartOpen, setSearchOpen, mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const { language } = useLanguageStore()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: translate(language, 'nav.home') },
    { href: '/shop', label: translate(language, 'nav.shop') },
    { href: '/about', label: translate(language, 'nav.about') },
    { href: '/contact', label: translate(language, 'nav.contact') },
  ]

  const itemCount = getItemCount()
  const wishlistCount = wishlistItems.length
  const isRTL = language === 'ar'

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-xl py-3' : 'bg-transparent py-5'
        }`}
        initial={false}
      >
        <div className="container mx-auto px-4 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className={`text-2xl font-bold tracking-tighter ${isRTL ? 'order-3' : 'order-1'}`}>
            <span className="text-foreground">SNKR</span>
            <span className="text-accent">VAULT</span>
          </Link>

          {/* Desktop Navigation - absolutely centered */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors hover:text-accent ${
                  pathname === link.href ? 'text-accent' : 'text-foreground/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className={`flex items-center gap-3 ${isRTL ? 'order-1' : 'order-3'}`}>
            <LanguageToggle />
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-accent transition-colors cursor-pointer"
              aria-label={translate(language, 'nav.search')}
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/wishlist"
              className="p-2 hover:text-accent transition-colors relative"
              aria-label={translate(language, 'nav.wishlist')}
            >
              <Heart className="w-5 h-5" />
              {mounted && wishlistCount > 0 && (
                <span className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center`}>
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 hover:text-accent transition-colors relative cursor-pointer"
              aria-label={translate(language, 'nav.cart')}
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemCount > 0 && (
                <span className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center`}>
                  {itemCount}
                </span>
              )}
            </button>
            <Link
              href="/account"
              className="p-2 hover:text-accent transition-colors hidden md:block"
              aria-label={translate(language, 'nav.account')}
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? '-100%' : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-3xl font-bold tracking-wider uppercase ${
                      pathname === link.href ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-bold tracking-wider uppercase text-foreground"
                >
                  {translate(language, 'nav.dashboard')}
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-bold tracking-wider uppercase text-foreground"
                >
                  {translate(language, 'nav.account')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
