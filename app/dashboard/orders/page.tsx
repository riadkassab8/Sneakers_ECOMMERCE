'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguageStore } from '@/lib/language-store'
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
} from 'lucide-react'

// Mock orders data
const mockOrders = [
  { id: 'ORD-001', customer: 'Ahmed Hassan', email: 'ahmed@email.com', items: 3, amount: 299.99, status: 'delivered', date: '2024-01-15', address: 'Riyadh, Saudi Arabia' },
  { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@email.com', items: 2, amount: 459.99, status: 'shipped', date: '2024-01-14', address: 'Dubai, UAE' },
  { id: 'ORD-003', customer: 'Mohammed Ali', email: 'mohammed@email.com', items: 1, amount: 189.99, status: 'processing', date: '2024-01-14', address: 'Cairo, Egypt' },
  { id: 'ORD-004', customer: 'Emily Chen', email: 'emily@email.com', items: 4, amount: 329.99, status: 'pending', date: '2024-01-13', address: 'Los Angeles, USA' },
  { id: 'ORD-005', customer: 'Omar Khaled', email: 'omar@email.com', items: 2, amount: 549.99, status: 'delivered', date: '2024-01-12', address: 'Jeddah, Saudi Arabia' },
  { id: 'ORD-006', customer: 'Lisa Wang', email: 'lisa@email.com', items: 1, amount: 199.99, status: 'cancelled', date: '2024-01-11', address: 'Singapore' },
  { id: 'ORD-007', customer: 'Yusuf Ibrahim', email: 'yusuf@email.com', items: 3, amount: 679.99, status: 'delivered', date: '2024-01-10', address: 'Kuwait City, Kuwait' },
  { id: 'ORD-008', customer: 'Anna Smith', email: 'anna@email.com', items: 2, amount: 389.99, status: 'shipped', date: '2024-01-09', address: 'London, UK' },
  { id: 'ORD-009', customer: 'Khalid Mansour', email: 'khalid@email.com', items: 5, amount: 899.99, status: 'processing', date: '2024-01-08', address: 'Doha, Qatar' },
  { id: 'ORD-010', customer: 'Jennifer Lee', email: 'jennifer@email.com', items: 1, amount: 149.99, status: 'pending', date: '2024-01-07', address: 'Toronto, Canada' },
]

export default function OrdersPage() {
  const { t, language } = useLanguageStore()
  const isRTL = language === 'ar'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null)
  const itemsPerPage = 8

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
    const statusKey = `dashboard.${status}` as const
    return t(statusKey)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <h2 className="text-2xl font-bold">{t('dashboard.orders')}</h2>
        <button
          className={`flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg hover:bg-secondary/80 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Download className="w-5 h-5" />
          {t('dashboard.export')}
        </button>
      </div>

      {/* Filters */}
      <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={`relative flex-1 ${isRTL ? 'text-right' : ''}`}>
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            placeholder={t('dashboard.search-orders')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-secondary border border-border rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
          />
        </div>
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Filter className="w-5 h-5 text-muted-foreground" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'all' ? (language === 'ar' ? 'جميع الحالات' : 'All Status') : getStatusText(status)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'رقم الطلب' : 'Order ID'}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('dashboard.customer')}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? 'المنتجات' : 'Items'}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('dashboard.amount')}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('dashboard.status')}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('dashboard.date')}
                </th>
                <th className={`px-4 py-3 text-sm font-medium text-muted-foreground ${isRTL ? 'text-left' : 'text-right'}`}>
                  {t('dashboard.action')}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t border-border hover:bg-secondary/50 transition-colors"
                >
                  <td className={`px-4 py-3 font-medium ${isRTL ? 'text-right' : ''}`}>{order.id}</td>
                  <td className={`px-4 py-3 ${isRTL ? 'text-right' : ''}`}>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                    {order.items} {language === 'ar' ? 'منتج' : 'items'}
                  </td>
                  <td className={`px-4 py-3 font-semibold ${isRTL ? 'text-right' : ''}`}>${order.amount}</td>
                  <td className={`px-4 py-3 ${isRTL ? 'text-right' : ''}`}>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-muted-foreground ${isRTL ? 'text-right' : ''}`}>{order.date}</td>
                  <td className={`px-4 py-3 ${isRTL ? 'text-left' : 'text-right'}`}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      title={t('dashboard.view')}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
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
              ? `عرض ${(currentPage - 1) * itemsPerPage + 1} إلى ${Math.min(currentPage * itemsPerPage, filteredOrders.length)} من ${filteredOrders.length}`
              : `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredOrders.length)} of ${filteredOrders.length}`}
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
              {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card border border-border rounded-xl p-6"
          >
            <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h3 className="text-xl font-bold">{selectedOrder.id}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                {getStatusText(selectedOrder.status)}
              </span>
            </div>

            <div className="space-y-4">
              <div className={`p-4 bg-secondary/50 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                <p className="text-sm text-muted-foreground">{t('dashboard.customer')}</p>
                <p className="font-medium">{selectedOrder.customer}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.email}</p>
              </div>

              <div className={`p-4 bg-secondary/50 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                <p className="text-sm text-muted-foreground">{language === 'ar' ? 'العنوان' : 'Address'}</p>
                <p className="font-medium">{selectedOrder.address}</p>
              </div>

              <div className={`grid grid-cols-2 gap-4`}>
                <div className={`p-4 bg-secondary/50 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'المنتجات' : 'Items'}</p>
                  <p className="font-medium">{selectedOrder.items}</p>
                </div>
                <div className={`p-4 bg-secondary/50 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                  <p className="text-sm text-muted-foreground">{t('dashboard.amount')}</p>
                  <p className="font-medium text-accent">${selectedOrder.amount}</p>
                </div>
              </div>

              <div className={`p-4 bg-secondary/50 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                <p className="text-sm text-muted-foreground">{t('dashboard.date')}</p>
                <p className="font-medium">{selectedOrder.date}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-6 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
            >
              {t('common.close')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
