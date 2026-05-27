'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguageStore } from '@/lib/language-store'
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
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

const COLORS = ['oklch(0.9 0.15 95)', 'oklch(0.7 0.15 200)', 'oklch(0.65 0.25 25)', 'oklch(0.8 0.1 150)']

export default function AnalyticsPage() {
  const { t, language } = useLanguageStore()
  const isRTL = language === 'ar'
  const [timeRange, setTimeRange] = useState('this-week')

  const timeRanges = [
    { value: 'today', label: t('dashboard.today') },
    { value: 'this-week', label: t('dashboard.this-week') },
    { value: 'this-month', label: t('dashboard.this-month') },
    { value: 'this-year', label: t('dashboard.this-year') },
  ]

  const stats = [
    {
      title: language === 'ar' ? 'الزوار' : 'Visitors',
      value: '32,450',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
    },
    {
      title: language === 'ar' ? 'مشاهدات الصفحة' : 'Page Views',
      value: '124,500',
      change: '+8.3%',
      trend: 'up',
      icon: Eye,
    },
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
        <h2 className="text-2xl font-bold">{t('dashboard.analytics')}</h2>
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
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'الزوار ومشاهدات الصفحة' : 'Visitors & Page Views'}
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.9 0.15 95)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.9 0.15 95)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.7 0.15 200)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.7 0.15 200)" stopOpacity={0} />
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
                  dataKey="visitors"
                  stroke="oklch(0.9 0.15 95)"
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  stroke="oklch(0.7 0.15 200)"
                  fillOpacity={1}
                  fill="url(#colorPageViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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
                    backgroundColor: 'oklch(0.12 0 0)',
                    border: '1px solid oklch(0.2 0 0)',
                    borderRadius: '8px',
                    color: 'oklch(0.98 0 0)',
                  }}
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
          transition={{ delay: 0.7 }}
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
                    backgroundColor: 'oklch(0.12 0 0)',
                    border: '1px solid oklch(0.2 0 0)',
                    borderRadius: '8px',
                    color: 'oklch(0.98 0 0)',
                  }}
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

      {/* Top Pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>
          {language === 'ar' ? 'أفضل الصفحات' : 'Top Pages'}
        </h3>
        <div className="space-y-3">
          {[
            { page: '/shop', views: '45,230', change: '+12%' },
            { page: '/product/air-jordan-1', views: '32,100', change: '+8%' },
            { page: '/', views: '28,450', change: '+5%' },
            { page: '/product/nike-air-max', views: '21,300', change: '+15%' },
            { page: '/checkout', views: '18,900', change: '+3%' },
          ].map((item, index) => (
            <div
              key={item.page}
              className={`flex items-center justify-between p-3 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-muted-foreground w-6">{index + 1}.</span>
                <span className="font-medium">{item.page}</span>
              </div>
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-muted-foreground">{item.views} {language === 'ar' ? 'مشاهدة' : 'views'}</span>
                <span className="text-green-500 text-sm">{item.change}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
