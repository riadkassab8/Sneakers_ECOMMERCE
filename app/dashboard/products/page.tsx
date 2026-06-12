'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguageStore, t as translate } from '@/lib/language-store'
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
  const { language } = useLanguageStore()
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
        <h2 className="text-2xl font-bold">{translate(language, 'dashboard.products')}</h2>
        <button
          onClick={handleAddNew}
          className={`flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors ${isRTL ? 'flex-row-reverse' : ''} cursor-pointer`}
        >
          <Plus className="w-5 h-5" />
          {translate(language, 'dashboard.add-product')}
        </button>
      </div>

      {/* Filters */}
      <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={`relative flex-1 ${isRTL ? 'text-right' : ''}`}>
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
          <input
            type="text"
            placeholder={translate(language, 'dashboard.search-products')}
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
                  {translate(language, 'dashboard.action')}
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
                    <span className="font-semibold">${product.salePrice || product.price}</span>
                    {product.salePrice && (
                      <span className={`text-sm text-muted-foreground line-through ${isRTL ? 'mr-2' : 'ml-2'}`}>
                        ${product.price}
                      </span>
                    )}
                  </td>
                  <td className={`px-4 py-3 ${isRTL ? 'text-right' : ''}`}>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.sizes.some((s) => s.available)
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {product.sizes.some((s) => s.available) ? translate(language, 'product.in-stock') : translate(language, 'product.out-of-stock')}
                    </span>
                  </td>
                  <td className={`px-4 py-3 ${isRTL ? 'text-left' : 'text-right'}`}>
                    <div className={`flex items-center gap-2 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer"
                        title={translate(language, 'dashboard.edit')}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-destructive/20 text-destructive rounded-lg transition-colors cursor-pointer"
                        title={translate(language, 'dashboard.delete')}
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
              className="p-2 rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            <span className="text-sm">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                  {editingProduct ? translate(language, 'dashboard.edit-product') : translate(language, 'dashboard.add-product')}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-secondary rounded-lg cursor-pointer"
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
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                  >
                    {translate(language, 'dashboard.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors cursor-pointer"
                  >
                    {translate(language, 'dashboard.save')}
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
