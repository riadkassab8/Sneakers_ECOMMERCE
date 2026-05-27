'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag, User, Menu, X, LayoutDashboard } from 'lucide-react'
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store'
import { useLanguageStore } from '@/lib/language-store'
import { LanguageToggle } from '@/components/language-toggle'
import { useState, useEffect } from 'react'

export function Header() {
  const pathname = usePathname()
  const { getItemCount } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { setCartOpen, setSearchOpen, mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const { t, language } = useLanguageStore()
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
    { href: '/', label: t('nav.home') },
    { href: '/shop', label: t('nav.shop') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ]

  const itemCount = mounted ? getItemCount() : 0
  const wishlistCount = mounted ? wishlistItems.length : 0
  const isRTL = language === 'ar'

  // Prevent hydration mismatch by not rendering nav links until mounted
  if (!mounted) {
    return (
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-xl py-3' : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            <span className="text-foreground">SNKR</span>
            <span className="text-accent">VAULT</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5" />
            <div className="w-5 h-5" />
            <div className="w-5 h-5" />
            <div className="w-5 h-5" />
          </div>
        </div>
      </motion.header>
    )
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-xl py-3' : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`container mx-auto px-4 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            <span className="text-foreground">SNKR</span>
            <span className="text-accent">VAULT</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
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
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <LanguageToggle />
            <Link
              href="/dashboard"
              className="p-2 hover:text-accent transition-colors hidden md:block"
              aria-label={t('nav.dashboard')}
              title={t('nav.dashboard')}
            >
              <LayoutDashboard className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:text-accent transition-colors"
              aria-label={t('nav.search')}
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/wishlist"
              className="p-2 hover:text-accent transition-colors relative"
              aria-label={t('nav.wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center`}>
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 hover:text-accent transition-colors relative"
              aria-label={t('nav.cart')}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center`}>
                  {itemCount}
                </span>
              )}
            </button>
            <Link
              href="/account"
              className="p-2 hover:text-accent transition-colors hidden md:block"
              aria-label={t('nav.account')}
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden"
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
                  {t('nav.dashboard')}
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
                  {t('nav.account')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
