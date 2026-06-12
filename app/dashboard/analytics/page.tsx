'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguageStore, t as translate } from '@/lib/language-store'
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'

// Mock analytics data
const visitorData = [
  { name: 'Mon', visitors: 2400, pageViews: 4400 },
  { name: 'Tue', visitors: 1398, pageViews: 3400 },
  { name: 'Wed', visitors: 9800, pageViews: 12400 },
  { name: 'Thu', visitors: 3908, pageViews: 5908 },
  { name: 'Fri', visitors: 4800, pageViews: 7800 },
  { name: 'Sat', visitors: 3800, pageViews: 5800 },
  { name: 'Sun', visitors: 4300, pageViews: 6300 },
]

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
]

const categoryData = [
  { name: 'Running', value: 35 },
  { name: 'Basketball', value: 25 },
  { name: 'Lifestyle', value: 30 },
  { name: 'Training', value: 10 },
]

const conversionData = [
  { name: 'Week 1', rate: 2.5 },
  { name: 'Week 2', rate: 3.2 },
  { name: 'Week 3', rate: 2.8 },
  { name: 'Week 4', rate: 4.1 },
]

const topCustomers = [
  { rank: 1, name: 'Ahmed Hassan', orders: 24, spent: '$8,450', avatar: 'AH', trend: 'up' },
  { rank: 2, name: 'Sarah Johnson', orders: 19, spent: '$6,230', avatar: 'SJ', trend: 'up' },
  { rank: 3, name: 'Mohammed Ali', orders: 17, spent: '$5,890', avatar: 'MA', trend: 'down' },
  { rank: 4, name: 'Emily Chen', orders: 15, spent: '$4,720', avatar: 'EC', trend: 'up' },
  { rank: 5, name: 'Omar Khaled', orders: 12, spent: '$3,980', avatar: 'OK', trend: 'down' },
]

const COLORS = ['oklch(0.9 0.15 95)', 'oklch(0.7 0.15 200)', 'oklch(0.65 0.25 25)', 'oklch(0.8 0.1 150)']

export default function AnalyticsPage() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const [timeRange, setTimeRange] = useState('this-week')
  const analyticsRef = useState<HTMLDivElement | null>(null)[0]

  const timeRanges = [
    { value: 'today', label: translate(language, 'dashboard.today') },
    { value: 'this-week', label: translate(language, 'dashboard.this-week') },
    { value: 'this-month', label: translate(language, 'dashboard.this-month') },
    { value: 'this-year', label: translate(language, 'dashboard.this-year') },
  ]

  const handleExportAnalytics = async () => {
    const html2canvas = (await import('html2canvas')).default
    const jsPDF = (await import('jspdf')).default
    
    const element = document.querySelector('div[class*="space-y-6"]') as HTMLElement
    if (!element) {
      console.error('Analytics element not found')
      return
    }

    // Create a style override to convert oklch colors to hex
    const style = document.createElement('style')
    style.textContent = `
      * {
        color: #ffffff !important;
        background-color: #0a0a0a !important;
        border-color: #333333 !important;
      }
      [style*="oklch"] {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
      }
    `
    document.head.appendChild(style)

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#0a0a0a',
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: true,
        ignoreElements: (element) => element.tagName === 'BUTTON',
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`analytics_export_${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      document.head.removeChild(style)
    }
  }

  const stats = [
    {
      title: language === 'ar' ? 'معدل التحويل' : 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      title: language === 'ar' ? 'متوسط وقت الجلسة' : 'Avg. Session',
      value: '4m 32s',
      change: '-0.8%',
      trend: 'down',
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <h2 className="text-2xl font-bold">{translate(language, 'dashboard.analytics')}</h2>
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className={`bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleExportAnalytics}
            className={`flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer`}
          >
            <Download className="w-5 h-5" />
            {translate(language, 'dashboard.export')}
          </button>
        </div>
      </div>

      {/* Stats + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'أكثر العملاء شراءً' : 'Top Customers'}
          </h3>
          <div className="space-y-3">
            {topCustomers.map((customer, index) => (
              <div
                key={customer.rank}
                className={`flex items-center gap-3 p-3 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {/* Rank */}
                <span className={`text-sm font-bold w-5 text-center ${
                  index === 0 ? 'text-yellow-400' :
                  index === 1 ? 'text-gray-400' :
                  index === 2 ? 'text-orange-400' :
                  'text-muted-foreground'
                }`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : customer.rank}
                </span>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
                  {customer.avatar}
                </div>

                {/* Name */}
                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                  <p className="font-medium text-sm truncate">{customer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {customer.orders} {language === 'ar' ? 'طلب' : 'orders'}
                  </p>
                </div>

                {/* Spent + trend */}
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="font-semibold text-accent text-sm">{customer.spent}</span>
                  {customer.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 content-start">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-card border border-border rounded-xl p-5"
            >
              <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 bg-secondary rounded-lg">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'المبيعات الشهرية' : 'Monthly Sales'}
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                <XAxis dataKey="name" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                  }}
                  itemStyle={{ color: '#FFFFFF' }}
                  labelStyle={{ color: '#FFFFFF' }}
                />
                <Bar dataKey="sales" fill="oklch(0.9 0.15 95)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'المبيعات حسب الفئة' : 'Sales by Category'}
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                  }}
                  itemStyle={{ color: '#FFFFFF' }}
                  labelStyle={{ color: '#FFFFFF' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={`flex flex-wrap justify-center gap-4 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {categoryData.map((entry, index) => (
              <div key={entry.name} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-muted-foreground">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Conversion Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'معدل التحويل' : 'Conversion Rate'}
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0 0)" />
                <XAxis dataKey="name" stroke="oklch(0.55 0 0)" fontSize={12} />
                <YAxis stroke="oklch(0.55 0 0)" fontSize={12} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                  }}
                  itemStyle={{ color: '#FFFFFF' }}
                  labelStyle={{ color: '#FFFFFF' }}
                  formatter={(value: number) => [`${value}%`, 'Rate']}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="oklch(0.9 0.15 95)"
                  strokeWidth={3}
                  dot={{ fill: 'oklch(0.9 0.15 95)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
          {language === 'ar' ? 'أفضل المنتجات' : 'Top Products'}
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Air Jordan 1 High', sales: 245, revenue: '$73,500' },
            { name: 'Nike Air Max 90', sales: 198, revenue: '$59,400' },
            { name: 'Yeezy Boost 350', sales: 176, revenue: '$61,600' },
            { name: 'Nike Dunk Low', sales: 154, revenue: '$46,200' },
            { name: 'New Balance 550', sales: 132, revenue: '$39,600' },
          ].map((item, index) => (
            <div
              key={item.name}
              className={`flex items-center justify-between p-3 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-muted-foreground w-6">{index + 1}.</span>
                <span className="font-medium">{item.name}</span>
              </div>
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-muted-foreground">{item.sales} {language === 'ar' ? 'مبيعات' : 'sales'}</span>
                <span className="text-accent font-semibold">{item.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
