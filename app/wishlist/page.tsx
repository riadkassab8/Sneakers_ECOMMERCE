'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, ShoppingBag, Share2, Trash2 } from 'lucide-react'
import { useWishlistStore, useCartStore, useUIStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { useState, useEffect } from 'react'
import { useToastStore } from '@/components/toast'

export default function WishlistPage() {
  const { items, toggle } = useWishlistStore()
  const { addItem } = useCartStore()
  const { setCartOpen } = useUIStore()
  const { addToast } = useToastStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMoveToCart = (product: typeof items[0]) => {
    const availableSize = product.sizes.find(s => s.available)?.size
    if (availableSize) {
      addItem(product, availableSize)
      toggle(product)
      setCartOpen(true)
      addToast({
        type: 'success',
        message: 'Moved to cart',
        description: `${product.name} added to your cart`
      })
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      addToast({
        type: 'success',
        message: 'Link copied',
        description: 'Wishlist link copied to clipboard'
      })
    } catch {
      addToast({
        type: 'error',
        message: 'Failed to copy link'
      })
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display tracking-wider"
          >
            WISHLIST
          </motion.h1>
          {items.length > 0 && (
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
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
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <>
            <p className="text-muted-foreground mb-8">{items.length} items saved</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={product} index={i} />
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="flex-1 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => toggle(product)}
                      className="p-2 bg-secondary rounded-lg hover:bg-destructive/20 hover:text-destructive transition-colors"
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
