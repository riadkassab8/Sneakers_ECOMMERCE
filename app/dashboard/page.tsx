'use client'

import { motion } from 'framer-motion'
import { useLanguageStore, t as translate } from '@/lib/language-store'
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
import { useMemo, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, Bar, AreaChart, Area
} from 'recharts'

const productSoldCounts: Record<string, number> = {
  'snkr-001': 87, 'snkr-002': 64, 'snkr-003': 92, 'snkr-004': 45, 'snkr-005': 73,
}

const recentOrders = [
  { id: 'ORD-001', customer: 'Ahmed Hassan', amount: 299.99, status: 'delivered', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Sarah Johnson', amount: 459.99, status: 'shipped', date: '2024-01-14' },
  { id: 'ORD-003', customer: 'Mohammed Ali', amount: 189.99, status: 'processing', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Emily Chen', amount: 329.99, status: 'pending', date: '2024-01-13' },
  { id: 'ORD-005', customer: 'Omar Khaled', amount: 549.99, status: 'delivered', date: '2024-01-12' },
]

const revenueData = [
  { day: 'Mon', revenue: 1200 },
  { day: 'Tue', revenue: 1900 },
  { day: 'Wed', revenue: 1500 },
  { day: 'Thu', revenue: 2800 },
  { day: 'Fri', revenue: 2200 },
  { day: 'Sat', revenue: 3100 },
  { day: 'Sun', revenue: 2600 },
]

const orderStatusData = [
  { name: 'Delivered', value: 45, color: '#22c55e' },
  { name: 'Shipped', value: 25, color: '#3b82f6' },
  { name: 'Processing', value: 20, color: '#eab308' },
  { name: 'Pending', value: 10, color: '#f97316' },
]

const salesByCategoryData = [
  { category: 'Nike', sales: 4500 },
  { category: 'Jordan', sales: 3200 },
  { category: 'Yeezy', sales: 2800 },
  { category: 'Dunk', sales: 2100 },
  { category: 'Air Max', sales: 1900 },
  { category: 'New Balance', sales: 1500 },
]

export default function DashboardPage() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const [chartType, setChartType] = useState<'pie' | 'bar' | 'area'>('pie')

  const stats = useMemo(() => [
    {
      title: translate(language, 'dashboard.total-revenue'),
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: translate(language, 'dashboard.total-orders'),
      value: '2,350',
      change: '+15.3%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: translate(language, 'dashboard.total-products'),
      value: products.length.toString(),
      change: '+12',
      trend: 'up',
      icon: Package,
    },
  ], [language])

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
    return translate(language, key)
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                {translate(language, 'dashboard.from-last-month')}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">
            {translate(language, 'dashboard.revenue-chart')}
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1c1c1c',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
                itemStyle={{ color: '#FFFFFF' }}
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ fill: 'var(--accent)', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Orders Status Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">
            {translate(language, 'dashboard.orders-status')}
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: 'var(--muted-foreground)', fontSize: 12 }}>{value}</span>
                )}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1c1c1c',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
                itemStyle={{ color: '#FFFFFF' }}
                labelStyle={{ color: '#FFFFFF' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Sales by Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h3 className="text-lg font-semibold">
            {translate(language, 'dashboard.sales-by-category')}
          </h3>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => setChartType('pie')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                chartType === 'pie' ? 'bg-accent text-accent-foreground' : 'bg-secondary hover:bg-secondary/80'
              }`}
              title="Pie Chart"
            >
              <div className="w-4 h-4 rounded-full border-2 border-current" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                chartType === 'bar' ? 'bg-accent text-accent-foreground' : 'bg-secondary hover:bg-secondary/80'
              }`}
              title="Bar Chart"
            >
              <div className="w-4 h-4 border-2 border-current" />
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                chartType === 'area' ? 'bg-accent text-accent-foreground' : 'bg-secondary hover:bg-secondary/80'
              }`}
              title="Area Chart"
            >
              <div className="w-4 h-4 border-2 border-current border-t-4" />
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          {chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={salesByCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="sales"
              >
                {salesByCategoryData.map((entry, index) => (
                  <Cell key={index} fill={['#22c55e', '#3b82f6', '#eab308', '#f97316', '#ec4899', '#8b5cf6'][index % 6]} />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: 'var(--muted-foreground)', fontSize: 12 }}>{value}</span>
                )}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1c1c1c',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
                itemStyle={{ color: '#FFFFFF' }}
                labelStyle={{ color: '#FFFFFF' }}
              />
            </PieChart>
          ) : chartType === 'bar' ? (
            <BarChart data={salesByCategoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="category" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1c1c1c',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
                itemStyle={{ color: '#FFFFFF' }}
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Bar dataKey="sales" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={salesByCategoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="category" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1c1c1c',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
                itemStyle={{ color: '#FFFFFF' }}
                labelStyle={{ color: '#FFFFFF' }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="var(--accent)"
                fill="var(--accent)"
                fillOpacity={0.3}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h3 className="text-lg font-semibold">{translate(language, 'dashboard.recent-orders')}</h3>
          <Link
            href="/dashboard/orders"
            className={`text-sm text-accent hover:underline flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {translate(language, 'common.view-all')}
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
    </div>
  )
}
