'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react'
import { useLanguageStore } from '@/lib/language-store'
import { LanguageToggle } from '@/components/language-toggle'
import { useState, ReactNode } from 'react'

const sidebarLinks = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'dashboard.overview' },
  { href: '/dashboard/products', icon: Package, labelKey: 'dashboard.products' },
  { href: '/dashboard/orders', icon: ShoppingCart, labelKey: 'dashboard.orders' },
  { href: '/dashboard/customers', icon: Users, labelKey: 'dashboard.customers' },
  { href: '/dashboard/analytics', icon: BarChart3, labelKey: 'dashboard.analytics' },
  { href: '/dashboard/settings', icon: Settings, labelKey: 'dashboard.settings' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { t, language } = useLanguageStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isRTL = language === 'ar'

  return (
    <div className={`min-h-screen bg-background flex ${isRTL ? 'flex-row-reverse' : ''}`}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-64 bg-card border-border transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
        } md:relative md:transform-none ${isRTL ? 'border-l' : 'border-r'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`p-6 ${isRTL ? 'border-l' : 'border-r'} border-b border-border`}>
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              <span className="text-foreground">SNKR</span>
              <span className="text-accent">VAULT</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-1">{t('dashboard.title')}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  } ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{t(link.labelKey)}</span>
                </Link>
              )
            })}
          </nav>

          {/* Back to Store */}
          <div className="p-4 border-t border-border">
            <Link
              href="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="text-sm font-medium">{t('common.back')}</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className={`sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-4 md:px-6 py-4 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-secondary md:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-bold">{t('dashboard.title')}</h1>
          </div>
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <LanguageToggle />
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 md:p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
