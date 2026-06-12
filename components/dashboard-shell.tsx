'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
import { useLanguageStore, t as translate } from '@/lib/language-store'
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

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { language } = useLanguageStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isRTL = language === 'ar'

  return (
    <div className={`min-h-screen bg-background flex ${isRTL ? 'flex-row-reverse' : ''}`}>
      <aside
        className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-64 bg-card border-border transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
        } md:relative md:transform-none ${isRTL ? 'border-l' : 'border-r'}`}
      >
        <div className="flex flex-col h-full">
          <div className={`p-6 ${isRTL ? 'border-l' : 'border-r'} border-b border-border`}>
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              <span className="text-foreground">SNKR</span>
              <span className="text-accent">VAULT</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-1">{translate(language, 'dashboard.title')}</p>
          </div>

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
                  <span className="text-sm font-medium">{translate(language, link.labelKey)}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <Link
              href="/"
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 hover:from-accent/20 hover:to-accent/10 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-2 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors ${isRTL ? 'rotate-180' : ''}`}>
                <ArrowLeft className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-accent">{translate(language, 'home')}</span>
                <p className="text-xs text-muted-foreground">{translate(language, 'dashboard.back-to-store')}</p>
              </div>
            </Link>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className={`sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-4 md:px-6 py-4 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-secondary md:hidden cursor-pointer"
              aria-label="Menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-bold">{translate(language, 'dashboard.title')}</h1>
          </div>
          <LanguageToggle />
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
