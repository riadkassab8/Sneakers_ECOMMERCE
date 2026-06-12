# Dashboard Code Documentation

This file contains all the code related to the dashboard pages in the Sneakers E-commerce project.

## Table of Contents
1. [Dashboard Layout](#dashboard-layout)
2. [Dashboard Main Page](#dashboard-main-page)
3. [Dashboard Products Page](#dashboard-products-page)

---

## Dashboard Layout

**File:** `app/dashboard/layout.tsx`

```tsx
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
  Search,
  Heart,
  ShoppingBag as Cart,
  User,
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
        {/* Top Bar - Matches main navbar */}
        <header className={`sticky top-0 z-30 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="container mx-auto px-4 flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              <span className="text-foreground">SNKR</span>
              <span className="text-accent">VAULT</span>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8" style={isRTL ? { direction: 'rtl' } : {}}>
              <Link href="/" className="text-sm tracking-widest uppercase transition-colors hover:text-accent text-foreground/70">HOME</Link>
              <Link href="/shop" className="text-sm tracking-widest uppercase transition-colors hover:text-accent text-foreground/70">SHOP</Link>
              <Link href="/about" className="text-sm tracking-widest uppercase transition-colors hover:text-accent text-foreground/70">ABOUT</Link>
              <Link href="/contact" className="text-sm tracking-widest uppercase transition-colors hover:text-accent text-foreground/70">CONTACT</Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Link
                href="/dashboard"
                className="p-2 hover:text-accent transition-colors hidden md:block"
                aria-label="Dashboard"
                title="Dashboard"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>
              <button
                className="p-2 hover:text-accent transition-colors hidden md:block"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/wishlist"
                className="p-2 hover:text-accent transition-colors hidden md:block"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <Link
                href="/cart"
                className="p-2 hover:text-accent transition-colors hidden md:block"
                aria-label="Cart"
              >
                <Cart className="w-5 h-5" />
              </Link>
              <Link
                href="/account"
                className="p-2 hover:text-accent transition-colors hidden md:block"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 md:hidden"
                aria-label="Menu"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
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
```

---

## Dashboard Main Page

**File:** `app/dashboard/page.tsx`

```tsx
'use client'

import { motion } from 'framer-motion'
import { useLanguageStore } from '@/lib/language-store'
import { products } from '@/lib/products'
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const recentOrders = [
  { id: 'ORD-001', customer: 'Ahmed Hassan', amount: 299.99, status: 'delivered', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Sarah Johnson', amount: 459.99, status: 'shipped', date: '2024-01-14' },
  { id: 'ORD-003', customer: 'Mohammed Ali', amount: 189.99, status: 'processing', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Emily Chen', amount: 329.99, status: 'pending', date: '2024-01-13' },
  { id: 'ORD-005', customer: 'Omar Khaled', amount: 549.99, status: 'delivered', date: '2024-01-12' },
]

export default function DashboardPage() {
  const { t, language } = useLanguageStore()
  const isRTL = language === 'ar'

  const stats = [
    {
      title: t('dashboard.total-revenue'),
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: t('dashboard.total-orders'),
      value: '2,350',
      change: '+15.3%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: t('dashboard.total-customers'),
      value: '1,247',
      change: '+5.7%',
      trend: 'up',
      icon: Users,
    },
    {
      title: t('dashboard.total-products'),
      value: products.length.toString(),
      change: '+12',
      trend: 'up',
      icon: Package,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400'
      case 'shipped':
        return 'bg-blue-500/20 text-blue-400'
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'pending':
        return 'bg-orange-500/20 text-orange-400'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    const key = `dashboard.${status}` as const
    return t(key)
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className={`flex items-center gap-1 mt-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-muted-foreground">
                {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-lg font-semibold">{t('dashboard.recent-orders')}</h3>
            <Link
              href="/dashboard/orders"
              className={`text-sm text-accent hover:underline flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('common.view-all')}
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-90' : ''}`} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className={`flex items-center justify-between p-3 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                  <span className="font-semibold">${order.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="text-lg font-semibold">{t('dashboard.top-products')}</h3>
            <Link
              href="/dashboard/products"
              className={`text-sm text-accent hover:underline flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('common.view-all')}
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-90' : ''}`} />
            </Link>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className={`flex items-center gap-3 p-3 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden relative flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>
                <div className={isRTL ? 'text-left' : 'text-right'}>
                  <p className="font-semibold">${product.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 100) + 10} {language === 'ar' ? 'مبيعات' : 'sold'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
```

---

## Dashboard Products Page

**File:** `app/dashboard/products/page.tsx`

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguageStore } from '@/lib/language-store'
import { products, Product } from '@/lib/products'
import Image from 'next/image'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

export default function ProductsPage() {
  const { t, language } = useLanguageStore()
  const isRTL = language === 'ar'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 8

  const brands = ['all', ...Array.from(new Set(products.map((p) => p.brand)))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand
    return matchesSearch && matchesBrand
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = (productId: string) => {
    // In a real app, this would make an API call
    alert(`Delete product ${productId}`)
  }

  const handleAddNew = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <h2 className="text-2xl font-bold">{t('dashboard.products')}</h2>
        <button
          onClick={handleAddNew}
          className={`flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Plus className="w-5 h-5" />
          {t('dashboard.add-product')}
        </button>
      </div>

      {/* Filters */}
      <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={`relative flex-1 ${isRTL ? 'text-right' : ''}`}>
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            placeholder={t('dashboard.search-products')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-secondary border border-border rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
          />
        </div>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className={`bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand === 'all' ? (language === 'ar' ? 'جميع العلامات' : 'All Brands') : brand}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'المنتج' : 'Product'}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'العلامة التجارية' : 'Brand'}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'السعر' : 'Price'}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'المخزون' : 'Stock'}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-left' : 'text-right'}`}>
                  {t('dashboard.action')}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-border hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden relative flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium truncate max-w-[200px]">{product.name}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-muted-foreground ${isRTL ? 'text-right' : ''}`}>{product.brand}</td>
                  <td className={`px-4 py-3 text-muted-foreground ${isRTL ? 'text-right' : ''}`}>{product.category}</td>
                  <td className={`px-4 py-3 ${isRTL ? 'text-right' : ''}`}>
                    <span className="font-semibold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </td>
                  <td className={`px-4 py-3 ${isRTL ? 'text-right' : ''}`}>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.inStock
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {product.inStock ? t('product.in-stock') : t('product.out-of-stock')}
                    </span>
                  </td>
                  <td className={`px-4 py-3 ${isRTL ? 'text-left' : 'text-right'}`}>
                    <div className={`flex items-center gap-2 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        title={t('dashboard.edit')}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                        title={t('dashboard.delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`flex items-center justify-between px-4 py-3 border-t border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
          <p className="text-sm text-muted-foreground">
            {language === 'ar'
              ? `عرض ${(currentPage - 1) * itemsPerPage + 1} إلى ${Math.min(currentPage * itemsPerPage, filteredProducts.length)} من ${filteredProducts.length}`
              : `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredProducts.length)} of ${filteredProducts.length}`}
          </p>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <span className="text-sm">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-card border border-border rounded-xl p-6"
            >
              <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h3 className="text-xl font-bold">
                  {editingProduct ? t('dashboard.edit-product') : t('dashboard.add-product')}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-secondary rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {language === 'ar' ? 'اسم المنتج' : 'Product Name'}
                  </label>
                  <input
                    type="text"
                    defaultValue={editingProduct?.name || ''}
                    className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'السعر' : 'Price'}
                    </label>
                    <input
                      type="number"
                      defaultValue={editingProduct?.price || ''}
                      className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'العلامة التجارية' : 'Brand'}
                    </label>
                    <select
                      defaultValue={editingProduct?.brand || ''}
                      className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
                    >
                      <option value="">Select Brand</option>
                      {Array.from(new Set(products.map((p) => p.brand))).map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
                    {language === 'ar' ? 'الوصف' : 'Description'}
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={editingProduct?.description || ''}
                    className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent resize-none ${isRTL ? 'text-right' : ''}`}
                  />
                </div>
                <div className={`flex gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    {t('dashboard.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    {t('dashboard.save')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

---

## Notes

### Features Implemented:
- **RTL Support**: Full right-to-left layout support for Arabic language
- **Responsive Design**: Mobile-friendly with sidebar toggle
- **Animations**: Smooth transitions using Framer Motion
- **Internationalization**: Multi-language support using custom language store
- **Dashboard Layout**: Sidebar navigation with active state highlighting
- **Main Dashboard**: Stats cards, recent orders, and top products sections
- **Products Management**: Search, filter, pagination, and CRUD operations modal

### Dependencies:
- Next.js 16.2.6 (Turbopack)
- React 18
- Framer Motion (animations)
- Lucide React (icons)
- Zustand (state management)
- Tailwind CSS (styling)

### Known Issues:
- The products page uses `product.originalPrice` and `product.inStock` properties that don't exist in the Product type definition. These should be replaced with `product.salePrice` and `product.sizes.some(s => s.available)` respectively for type safety.
