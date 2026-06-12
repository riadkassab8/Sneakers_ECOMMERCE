'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/products'
import { useLanguageStore, t as translate } from '@/lib/language-store'

export default function CartPage() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const subtotal = getTotal()
  const shipping = subtotal > 150 ? 0 : 12.99
  const total = subtotal - discount + shipping

  const suggestedProducts = products.slice(0, 4)

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1)
    } else {
      setDiscount(0)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display tracking-wider mb-8"
        >
          {translate(language, 'cart.title') || 'YOUR CART'}
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-6"
            >
              <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground" />
            </motion.div>
            <h2 className="text-2xl font-semibold mb-4">{translate(language, 'cart.empty') || 'Your cart is empty' || 'Your cart is empty'}</h2>
            <p className="text-muted-foreground mb-8">
              {translate(language, 'cart.empty-desc') || 'Looks like you haven\'t added any sneakers to your cart yet.' || 'Looks like you haven\'t added any sneakers to your cart yet.'}
            </p>
            <Link
              href="/shop"
              className={`inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {translate(language, 'cart.start-shopping')}
              {isRTL ? <ArrowRight className="w-5 h-5 rotate-180" /> : <ArrowRight className="w-5 h-5" />}
            </Link>
          </motion.div>
        ) : (
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 ${isRTL ? 'rtl:grid-flow-row-dense' : ''}`}>
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, i) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex gap-6 p-6 bg-card rounded-2xl ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Link
                    href={`/product/${item.product.id}`}
                    className="relative w-32 h-32 bg-secondary rounded-xl overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-semibold text-lg hover:text-accent transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.product.colorway}</p>
                        <p className="text-sm text-muted-foreground">{translate(language, 'product.size')}: {item.size}</p>
                      </div>
                      <div className={`text-right ${isRTL ? 'text-left' : 'text-right'}`}>
                        <p className="font-semibold text-lg">
                          {((item.product.salePrice || item.product.price) * item.quantity).toLocaleString()} ج.م
                        </p>
                        {item.product.salePrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {(item.product.price * item.quantity).toLocaleString()} ج.م
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={`flex items-center justify-between mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className={`flex items-center gap-2 text-sm text-destructive hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <Trash2 className="w-4 h-4" />
                        {translate(language, 'cart.remove')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                {translate(language, 'cart.clear-all')}
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 space-y-6">
                <h2 className="text-xl font-semibold">{translate(language, 'cart.summary') || 'Order Summary' || 'Order Summary'}</h2>

                {/* Promo Code */}
                <div>
                  <label className="text-sm font-medium block mb-2">{translate(language, 'cart.promo-code')}</label>
                  <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder={translate(language, 'cart.enter-code')}
                      className="flex-1 px-4 py-3 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      {translate(language, 'cart.apply')}
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-500 mt-2">{translate(language, 'cart.promo-applied') || 'Promo code applied!'}</p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 py-4 border-t border-b border-border">
                  <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-muted-foreground">{translate(language, 'cart.subtotal')}</span>
                    <span>{subtotal.toLocaleString()} ج.م</span>
                  </div>
                  {discount > 0 && (
                    <div className={`flex justify-between text-green-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{translate(language, 'cart.discount')}</span>
                      <span>-{discount.toLocaleString()} ج.م</span>
                    </div>
                  )}
                  <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-muted-foreground">{translate(language, 'cart.shipping')}</span>
                    <span>{shipping === 0 ? translate(language, 'cart.free') : `${shipping.toLocaleString()} ج.م`}</span>
                  </div>
                </div>

                <div className={`flex justify-between text-lg font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{translate(language, 'cart.total')}</span>
                  <span className="text-accent">{total.toLocaleString()} ج.م</span>
                </div>

                {shipping > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {translate(language, 'cart.free-shipping-msg')}
                  </p>
                )}

                <Link
                  href="/checkout"
                  className="block w-full py-4 bg-accent text-accent-foreground font-semibold text-center rounded-xl hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_rgba(245,230,66,0.3)]"
                >
                  {translate(language, 'cart.checkout')}
                </Link>

                <Link
                  href="/shop"
                  className="block w-full py-4 bg-secondary text-secondary-foreground font-semibold text-center rounded-xl hover:bg-secondary/80 transition-colors"
                >
                  {translate(language, 'cart.continue-shopping')}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Suggested Products */}
        {items.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl md:text-3xl font-display tracking-wider mb-8">
              {translate(language, 'cart.suggested')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {suggestedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
