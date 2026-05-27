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

export default function ProductPage() {
  const params = useParams()
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
      addToast({ type: 'error', message: 'Please select a size' })
      return
    }
    addItem(product, selectedSize, quantity)
    addToast({ 
      type: 'success', 
      message: 'Added to cart', 
      description: `${product.name} - Size ${selectedSize}`
    })
    setCartOpen(true)
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      addToast({ type: 'error', message: 'Please select a size' })
      return
    }
    addItem(product, selectedSize, quantity)
    window.location.href = '/checkout'
  }

  const Accordion = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border-b border-border">
      <button
        onClick={() => setActiveAccordion(activeAccordion === id ? null : id)}
        className="flex items-center justify-between w-full py-4 text-left"
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
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded">
                    NEW
                  </span>
                )}
                {product.isLimited && (
                  <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
                    LIMITED
                  </span>
                )}
                {product.salePrice && (
                  <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
                    SALE
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
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
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
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
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-accent">
                ${product.salePrice || product.price}
              </span>
              {product.salePrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.price}
                  </span>
                  <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
                    {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Select Size</span>
                <button className="text-sm text-accent hover:underline">Size Guide</button>
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
              <span className="font-semibold block mb-3">Quantity</span>
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
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-accent text-accent-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_rgba(245,230,66,0.3)]"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
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
              Buy Now
            </button>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 py-4">
              {[
                { icon: Truck, text: 'Free Shipping' },
                { icon: RotateCcw, text: '30-Day Returns' },
                { icon: Shield, text: 'Authentic' },
              ].map((item) => (
                <div key={item.text} className="flex flex-col items-center gap-2 text-center">
                  <item.icon className="w-5 h-5 text-accent" />
                  <span className="text-xs text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-border">
              <Accordion id="description" title="Description">
                {product.description}
              </Accordion>
              <Accordion id="details" title="Details & Care">
                <ul className="list-disc list-inside space-y-1">
                  {product.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion id="shipping" title="Shipping & Returns">
                <div className="space-y-2">
                  <p>Free standard shipping on orders over $150.</p>
                  <p>Express shipping available for $12.99.</p>
                  <p>Free returns within 30 days of purchase.</p>
                </div>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-display tracking-wider">YOU MAY ALSO LIKE</h2>
              <Link href="/shop" className="flex items-center gap-2 text-accent hover:underline">
                View All <ArrowRight className="w-4 h-4" />
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
