'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguageStore } from '@/lib/language-store'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
} from 'lucide-react'

// Mock customers data
const mockCustomers = [
  { id: 'CUS-001', name: 'Ahmed Hassan', email: 'ahmed@email.com', phone: '+966 50 123 4567', location: 'Riyadh, Saudi Arabia', orders: 12, totalSpent: 2499.99, joinDate: '2023-06-15' },
  { id: 'CUS-002', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 555 123 4567', location: 'Los Angeles, USA', orders: 8, totalSpent: 1899.99, joinDate: '2023-07-22' },
  { id: 'CUS-003', name: 'Mohammed Ali', email: 'mohammed@email.com', phone: '+20 10 123 4567', location: 'Cairo, Egypt', orders: 5, totalSpent: 899.99, joinDate: '2023-08-10' },
  { id: 'CUS-004', name: 'Emily Chen', email: 'emily@email.com', phone: '+86 138 1234 5678', location: 'Shanghai, China', orders: 15, totalSpent: 3299.99, joinDate: '2023-05-01' },
  { id: 'CUS-005', name: 'Omar Khaled', email: 'omar@email.com', phone: '+966 55 987 6543', location: 'Jeddah, Saudi Arabia', orders: 20, totalSpent: 4599.99, joinDate: '2023-04-15' },
  { id: 'CUS-006', name: 'Lisa Wang', email: 'lisa@email.com', phone: '+65 9123 4567', location: 'Singapore', orders: 3, totalSpent: 599.99, joinDate: '2023-09-20' },
  { id: 'CUS-007', name: 'Yusuf Ibrahim', email: 'yusuf@email.com', phone: '+965 9876 5432', location: 'Kuwait City, Kuwait', orders: 18, totalSpent: 3899.99, joinDate: '2023-03-10' },
  { id: 'CUS-008', name: 'Anna Smith', email: 'anna@email.com', phone: '+44 20 7123 4567', location: 'London, UK', orders: 7, totalSpent: 1499.99, joinDate: '2023-08-05' },
  { id: 'CUS-009', name: 'Khalid Mansour', email: 'khalid@email.com', phone: '+974 5555 1234', location: 'Doha, Qatar', orders: 25, totalSpent: 5999.99, joinDate: '2023-02-20' },
  { id: 'CUS-010', name: 'Jennifer Lee', email: 'jennifer@email.com', phone: '+1 416 555 1234', location: 'Toronto, Canada', orders: 4, totalSpent: 749.99, joinDate: '2023-10-01' },
]

export default function CustomersPage() {
  const { t, language } = useLanguageStore()
  const isRTL = language === 'ar'
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)
  const itemsPerPage = 8

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <h2 className="text-2xl font-bold">{t('dashboard.customers')}</h2>
        <div className="text-sm text-muted-foreground">
          {language === 'ar' 
            ? `إجمالي العملاء: ${mockCustomers.length}`
            : `Total Customers: ${mockCustomers.length}`}
        </div>
      </div>

      {/* Search */}
      <div className={`relative ${isRTL ? 'text-right' : ''}`}>
        <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
        <input
          type="text"
          placeholder={t('dashboard.search-customers')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full max-w-md bg-secondary border border-border rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}`}
        />
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedCustomer(customer)}
            className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 transition-colors cursor-pointer"
          >
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-lg">
                {customer.name.charAt(0)}
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <h3 className="font-semibold">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">{customer.id}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className={`flex items-center gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-4 h-4" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className={`flex items-center gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-4 h-4" />
                <span className="truncate">{customer.location}</span>
              </div>
            </div>

            <div className={`flex items-center justify-between mt-4 pt-4 border-t border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{customer.orders} {language === 'ar' ? 'طلب' : 'orders'}</span>
              </div>
              <span className="text-accent font-semibold">${customer.totalSpent.toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <p className="text-sm text-muted-foreground">
          {language === 'ar'
            ? `عرض ${(currentPage - 1) * itemsPerPage + 1} إلى ${Math.min(currentPage * itemsPerPage, filteredCustomers.length)} من ${filteredCustomers.length}`
            : `Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of ${filteredCustomers.length}`}
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

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedCustomer(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card border border-border rounded-xl p-6"
          >
            <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-2xl">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div className={isRTL ? 'text-right' : ''}>
                <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                <p className="text-muted-foreground">{selectedCustomer.id}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`flex items-center gap-3 p-3 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>{selectedCustomer.email}</span>
              </div>
              <div className={`flex items-center gap-3 p-3 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className={`flex items-center gap-3 p-3 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>{selectedCustomer.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className={`p-4 bg-secondary/50 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'إجمالي الطلبات' : 'Total Orders'}</p>
                  <p className="text-2xl font-bold">{selectedCustomer.orders}</p>
                </div>
                <div className={`p-4 bg-secondary/50 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'إجمالي الإنفاق' : 'Total Spent'}</p>
                  <p className="text-2xl font-bold text-accent">${selectedCustomer.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              <div className={`p-3 bg-secondary/50 rounded-lg ${isRTL ? 'text-right' : ''}`}>
                <p className="text-sm text-muted-foreground">{language === 'ar' ? 'تاريخ الانضمام' : 'Member Since'}</p>
                <p className="font-medium">{selectedCustomer.joinDate}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
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
