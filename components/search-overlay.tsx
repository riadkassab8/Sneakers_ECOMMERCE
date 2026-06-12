'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Search as SearchIcon } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUIStore } from '@/lib/store'
import { products } from '@/lib/products'
import { useLanguageStore, t as translate } from '@/lib/language-store'

export function SearchOverlay() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const { searchOpen, setSearchOpen } = useUIStore()
  const [query, setQuery] = useState('')

  const filteredProducts = query.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.colorway.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col"
        >
          <div className={`flex items-center justify-between p-6 border-b border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-lg font-semibold">{translate(language, 'search.title')}</span>
            <button
              onClick={() => {
                setSearchOpen(false)
                setQuery('')
              }}
              className="p-2 hover:bg-secondary rounded-full transition-colors cursor-pointer"
              aria-label={translate(language, 'common.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="relative">
              <SearchIcon className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${isRTL ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                placeholder={translate(language, 'search.placeholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                dir={isRTL ? 'rtl' : 'ltr'}
                className={`w-full py-4 bg-input border border-border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {query.length > 1 && filteredProducts.length === 0 && (
              <p className="text-muted-foreground text-center py-12">
                {translate(language, 'search.no-results')} &quot;{query}&quot;
              </p>
            )}

            {filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      onClick={() => {
                        setSearchOpen(false)
                        setQuery('')
                      }}
                      className={`flex items-center gap-4 p-4 bg-card rounded-xl hover:bg-card/80 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="relative w-20 h-20 bg-secondary rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>
                        <h3 className="font-medium truncate">{product.name}</h3>
                        <p className="text-sm text-accent">
                          {product.salePrice || product.price} ج.م
                          {product.salePrice && (
                            <span className={`text-muted-foreground line-through ${isRTL ? 'mr-2' : 'ml-2'}`}>
                              {product.price} ج.م
                            </span>
                          )}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {query.length === 0 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                    {translate(language, 'search.popular')}
                  </h3>
                  <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {['Nike', 'Jordan', 'Yeezy', 'Dunk', 'Air Max', 'New Balance'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-secondary rounded-full text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
