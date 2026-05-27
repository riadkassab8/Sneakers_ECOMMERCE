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
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import Link from 'next/link'
import Image from 'next/image'

// Mock data
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
  { name: 'Jul', revenue: 7000 },
]

const salesByCategory = [
  { name: 'Running', sales: 4000 },
  { name: 'Basketball', sales: 3000 },
  { name: 'Lifestyle', sales: 5000 },
  { name: 'Training', sales: 2500 },
]

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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
            {t('dashboard.revenue-chart')}
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.9 0.15 95)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.9 0.15 95)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                <XAxis dataKey="name" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(0.12 0 0)',
                    border: '1px solid oklch(0.2 0 0)',
                    borderRadius: '8px',
                    color: 'oklch(0.98 0 0)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(0.9 0.15 95)"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sales by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'المبيعات حسب الفئة' : 'Sales by Category'}
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                <XAxis dataKey="name" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(0.12 0 0)',
                    border: '1px solid oklch(0.2 0 0)',
                    borderRadius: '8px',
                    color: 'oklch(0.98 0 0)',
                  }}
                />
                <Bar dataKey="sales" fill="oklch(0.9 0.15 95)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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
          transition={{ delay: 0.7 }}
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
