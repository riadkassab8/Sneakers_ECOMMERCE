'use client'

import { useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Star, Truck, RotateCcw, Shield, ChevronDown, Minus, Plus, ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'
import { useCartStore, useWishlistStore, useUIStore } from '@/lib/store'
import { ProductCard } from '@/components/product-card'
import { useToastStore } from '@/components/toast'
import { useLanguageStore, t as translate } from '@/lib/language-store'

export default function ProductPage() {
  const params = useParams()
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const product = products.find(p => p.id === params.id)
  
  if (!product) {
    notFound()
  }

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeAccordion, setActiveAccordion] = useState<string | null>('description')

  const { addItem } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const { setCartOpen } = useUIStore()
  const { addToast } = useToastStore()
  
  const wishlisted = isWishlisted(product.id)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast({ type: 'error', message: translate(language, 'product.select-size-error') })
      return
    }
    addItem(product, selectedSize, quantity)
    addToast({
      type: 'success',
      message: translate(language, 'product.added-to-cart'),
      description: `${product.name} - ${translate(language, 'product.size')} ${selectedSize}`
    })
    setCartOpen(true)
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      addToast({ type: 'error', message: translate(language, 'product.select-size-error') })
      return
    }
    addItem(product, selectedSize, quantity)
    window.location.href = '/checkout'
  }

  const Accordion = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border-b border-border">
      <button
        onClick={() => setActiveAccordion(activeAccordion === id ? null : id)}
        className={`flex items-center justify-between w-full py-4 text-start ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === id ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {activeAccordion === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-muted-foreground">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className={`mb-8 text-sm text-muted-foreground flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link href="/" className="hover:text-foreground">{translate(language, 'nav.home')}</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-foreground">{translate(language, 'nav.shop')}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${isRTL ? 'rtl:grid-flow-row-dense' : ''}`}>
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-card rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} flex flex-col gap-2`}>
                {product.isNew && (
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded">
                    {translate(language, 'product.new')}
                  </span>
                )}
                {product.isLimited && (
                  <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
                    {translate(language, 'product.limited')}
                  </span>
                )}
                {product.salePrice && (
                  <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
                    {translate(language, 'product.sale')}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className={`flex gap-3 overflow-x-auto pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground">{product.brand}</p>
              <h1 className="text-3xl md:text-4xl font-bold mt-1">{product.name}</h1>
              <p className="text-muted-foreground mt-1">{product.colorway}</p>
            </div>

            {/* Rating */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-accent text-accent'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviewCount} {translate(language, 'product.reviews-count')})</span>
            </div>

            {/* Price */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-3xl font-bold text-accent">
                {product.salePrice || product.price} ج.م
              </span>
              {product.salePrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {product.price} ج.م
                  </span>
                  <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
                    {Math.round((1 - product.salePrice / product.price) * 100)}% {translate(language, 'product.off')}
                  </span>
                </>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="font-semibold">{translate(language, 'product.select-size')}</span>
                <button className="text-sm text-accent hover:underline">{translate(language, 'product.size-guide')}</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    disabled={!size.available}
                    onClick={() => setSelectedSize(size.size)}
                    className={`py-3 rounded-lg border text-sm font-medium transition-all ${
                      !size.available
                        ? 'border-border text-muted-foreground cursor-not-allowed opacity-50'
                        : selectedSize === size.size
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border hover:border-accent'
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="font-semibold block mb-3">{translate(language, 'cart.quantity')}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 bg-secondary rounded-lg hover:bg-secondary/80"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 bg-secondary rounded-lg hover:bg-secondary/80"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-accent text-accent-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_rgba(245,230,66,0.3)]"
              >
                <ShoppingBag className="w-5 h-5" />
                {translate(language, 'product.add-to-cart')}
              </button>
              <button
                onClick={() => toggle(product)}
                className={`p-4 rounded-xl border transition-colors ${
                  wishlisted
                    ? 'bg-destructive/10 border-destructive text-destructive'
                    : 'border-border hover:border-accent'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-colors"
            >
              {translate(language, 'product.buy-now')}
            </button>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 py-4">
              {[
                { icon: Truck, text: translate(language, 'product.free-shipping') },
                { icon: RotateCcw, text: translate(language, 'product.returns') },
                { icon: Shield, text: translate(language, 'product.authentic') },
              ].map((item) => (
                <div key={item.text} className="flex flex-col items-center gap-2 text-center">
                  <item.icon className="w-5 h-5 text-accent" />
                  <span className="text-xs text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-border">
              <Accordion id="description" title={translate(language, 'product.description')}>
                {product.description}
              </Accordion>
              <Accordion id="details" title={translate(language, 'product.details')}>
                <ul className="list-disc list-inside space-y-1">
                  {product.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion id="shipping" title={translate(language, 'product.shipping')}>
                <div className="space-y-2">
                  <p>{translate(language, 'product.shipping-desc-1')}</p>
                  <p>{translate(language, 'product.shipping-desc-2')}</p>
                  <p>{translate(language, 'product.shipping-desc-3')}</p>
                </div>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div className={`flex items-end justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-2xl md:text-3xl font-display tracking-wider">{translate(language, 'product.related')}</h2>
              <Link href="/shop" className={`flex items-center gap-2 text-accent hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}>
                {translate(language, 'common.view-all')} {isRTL ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
