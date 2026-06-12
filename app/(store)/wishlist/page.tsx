'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, ShoppingBag, Share2, Trash2 } from 'lucide-react'
import { useWishlistStore, useCartStore, useUIStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { useToastStore } from '@/components/toast'
import { useLanguageStore, t as translate } from '@/lib/language-store'

export default function WishlistPage() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const { items, toggle } = useWishlistStore()
  const { addItem } = useCartStore()
  const { setCartOpen } = useUIStore()
  const { addToast } = useToastStore()

  const handleMoveToCart = (product: typeof items[0]) => {
    const availableSize = product.sizes.find(s => s.available)?.size
    if (availableSize) {
      addItem(product, availableSize)
      toggle(product)
      setCartOpen(true)
      addToast({
        type: 'success',
        message: translate(language, 'wishlist.moved-to-cart'),
        description: `${product.name} ${translate(language, 'wishlist.moved-desc')}`
      })
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      addToast({
        type: 'success',
        message: translate(language, 'wishlist.link-copied'),
        description: translate(language, 'wishlist.link-copied-desc')
      })
    } catch {
      addToast({
        type: 'error',
        message: translate(language, 'wishlist.copy-failed')
      })
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display tracking-wider"
          >
            {translate(language, 'wishlist.title').toUpperCase()}
          </motion.h1>
          {items.length > 0 && (
            <button
              onClick={handleShare}
              className={`flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <Share2 className="w-4 h-4" />
              {translate(language, 'wishlist.share')}
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-6"
            >
              <Heart className="w-24 h-24 mx-auto text-muted-foreground" />
            </motion.div>
            <h2 className="text-2xl font-semibold mb-4">{translate(language, 'wishlist.empty')}</h2>
            <p className="text-muted-foreground mb-8">
              {translate(language, 'wishlist.empty-desc')}
            </p>
            <Link
              href="/shop"
              className={`inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {translate(language, 'wishlist.start-shopping')}
            </Link>
          </motion.div>
        ) : (
          <>
            <p className={`text-muted-foreground mb-8 ${isRTL ? 'text-right' : ''}`}>
              {items.length} {translate(language, 'wishlist.items-saved')}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={product} index={i} />
                  <div className={`flex gap-2 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="flex-1 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      {translate(language, 'wishlist.move-to-cart')}
                    </button>
                    <button
                      onClick={() => toggle(product)}
                      className="p-2 bg-secondary rounded-lg hover:bg-destructive/20 hover:text-destructive transition-colors"
                      aria-label={translate(language, 'cart.remove')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
