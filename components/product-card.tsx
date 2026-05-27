'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Product, useCartStore, useWishlistStore, useUIStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { useLanguageStore } from '@/lib/language-store'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { t } = useLanguageStore()
  const [imageIndex, setImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { addItem } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const { setCartOpen } = useUIStore()
  const wishlisted = mounted ? isWishlisted(product.id) : false

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const size = selectedSize || product.sizes.find(s => s.available)?.size
    if (size) {
      addItem(product, size)
      setCartOpen(true)
    }
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product)
  }

  const availableSizes = product.sizes.filter(s => s.available)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.id}`} className="group block">
        <div className="relative bg-card rounded-xl overflow-hidden">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded">
                {t('product.new').toUpperCase()}
              </span>
            )}
            {product.isLimited && (
              <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
                {t('product.limited') || 'LIMITED'}
              </span>
            )}
            {product.salePrice && (
              <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
                {t('product.sale').toUpperCase()}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-destructive text-destructive' : 'text-foreground'
                }`}
            />
          </button>

          {/* Image */}
          <div
            className="relative aspect-square"
            onMouseEnter={() => product.images.length > 1 && setImageIndex(1)}
            onMouseLeave={() => setImageIndex(0)}
          >
            <Image
              src={product.images[imageIndex]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Quick Add */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button
              onClick={handleAddToCart}
              disabled={availableSizes.length === 0}
              className="w-full py-3 bg-accent text-accent-foreground font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" />
              {availableSizes.length === 0 ? t('product.out-of-stock') : t('product.add-to-cart')}
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1">
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.colorway}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="text-sm">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-accent">
              ${product.salePrice || product.price}
            </span>
            {product.salePrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.price}
              </span>
            )}
          </div>

          {/* Size dots */}
          <div className="flex gap-1 pt-2">
            {product.sizes.slice(0, 6).map((size) => (
              <span
                key={size.size}
                className={`w-2 h-2 rounded-full ${size.available ? 'bg-accent' : 'bg-muted'
                  }`}
                title={size.size}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
