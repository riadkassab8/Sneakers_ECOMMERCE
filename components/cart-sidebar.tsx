'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore, useUIStore } from '@/lib/store'
import { useLanguageStore, t as translate } from '@/lib/language-store'

export function CartSidebar() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  const { cartOpen, setCartOpen } = useUIStore()
  const total = getTotal()

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-50"
          />

          <motion.div
            initial={{ x: isRTL ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed ${isRTL ? 'left-0 border-r' : 'right-0 border-l'} top-0 bottom-0 w-full max-w-md bg-background border-border z-50 flex flex-col`}
          >
            <div className={`flex items-center justify-between p-6 border-b border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-lg font-semibold tracking-wide">
                {translate(language, 'cart.sidebar-title')} ({items.length})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-secondary rounded-full transition-colors cursor-pointer"
                aria-label={translate(language, 'common.close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ShoppingBag className="w-16 h-16 text-muted-foreground" />
                  </motion.div>
                  <p className="text-muted-foreground">{translate(language, 'cart.empty')}</p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors cursor-pointer"
                  >
                    {translate(language, 'cart.start-shopping')}
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <motion.li
                      key={`${item.product.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 100 : -100 }}
                      className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="relative w-24 h-24 bg-card rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                        <h3 className="font-medium truncate">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                        <p className="text-sm text-muted-foreground">
                          {translate(language, 'product.size')}: {item.size}
                        </p>
                        <div className={`flex items-center justify-between mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.quantity - 1)
                              }
                              className="p-1 bg-secondary rounded hover:bg-secondary/80 cursor-pointer"
                              aria-label="-"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.quantity + 1)
                              }
                              className="p-1 bg-secondary rounded hover:bg-secondary/80 cursor-pointer"
                              aria-label="+"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="text-sm text-destructive hover:underline cursor-pointer"
                          >
                            {translate(language, 'cart.remove')}
                          </button>
                        </div>
                      </div>
                      <div className={isRTL ? 'text-left' : 'text-right'}>
                        <p className="font-semibold">
                          {((item.product.salePrice || item.product.price) * item.quantity).toLocaleString()} ج.م
                        </p>
                        {item.product.salePrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {(item.product.price * item.quantity).toLocaleString()} ج.م
                          </p>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className={`flex items-center justify-between text-lg font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{translate(language, 'cart.subtotal')}</span>
                  <span>{total.toLocaleString()} ج.م</span>
                </div>
                <p className={`text-sm text-muted-foreground ${isRTL ? 'text-right' : ''}`}>
                  {translate(language, 'cart.shipping-note')}
                </p>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full py-4 bg-accent text-accent-foreground font-semibold text-center rounded-lg hover:bg-accent/90 transition-colors cursor-pointer"
                >
                  {translate(language, 'cart.checkout')}
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="block w-full py-4 bg-secondary text-secondary-foreground font-semibold text-center rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  {translate(language, 'cart.view-cart')}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
