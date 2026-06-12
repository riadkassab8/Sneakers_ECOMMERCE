'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Check, CreditCard, Truck, ShoppingBag, ChevronLeft, Lock } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useLanguageStore, t as translate } from '@/lib/language-store'

type CheckoutStep = 'shipping' | 'delivery' | 'payment' | 'review'

export default function CheckoutPage() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const { items, getTotal, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping')
  const [orderComplete, setOrderComplete] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    saveInfo: false,
    shippingMethod: 'standard',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  })

  const subtotal = getTotal()
  const shipping = formData.shippingMethod === 'express' ? 12.99 : formData.shippingMethod === 'overnight' ? 29.99 : (subtotal > 150 ? 0 : 9.99)
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const steps: { id: CheckoutStep; label: string; icon: typeof ShoppingBag }[] = [
    { id: 'shipping', label: translate(language, 'checkout.shipping'), icon: Truck },
    { id: 'delivery', label: translate(language, 'checkout.delivery'), icon: Truck },
    { id: 'payment', label: translate(language, 'checkout.payment'), icon: CreditCard },
    { id: 'review', label: translate(language, 'checkout.review'), icon: Check },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === currentStep)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 'shipping') setCurrentStep('delivery')
    else if (currentStep === 'delivery') setCurrentStep('payment')
    else if (currentStep === 'payment') setCurrentStep('review')
    else if (currentStep === 'review') {
      setOrderComplete(true)
      clearCart()
    }
  }

  const updateForm = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4 text-center py-20">
          <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold mb-4">{translate(language, 'checkout.empty-cart')}</h2>
          <Link
            href="/shop"
            className={`inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {translate(language, 'checkout.continue-shopping')}
          </Link>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase. Your order number is:
            </p>
            <p className="text-2xl font-mono text-accent mb-8">
              #SNK{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <p className="text-muted-foreground mb-8">
              {translate(language, 'checkout.confirmation')}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {isRTL ? <ChevronLeft className="w-4 h-4 rotate-180" /> : <ChevronLeft className="w-4 h-4" />}
            {translate(language, 'checkout.back-cart')}
          </Link>
          <h1 className="text-4xl md:text-5xl font-display tracking-wider">{translate(language, 'checkout.title')}</h1>
        </div>

        {/* Progress Steps */}
        <div className={`flex items-center justify-center mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {steps.map((step, i) => (
            <div key={step.id} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  i <= currentStepIndex
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                <step.icon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 md:w-16 h-0.5 mx-2 ${
                    i < currentStepIndex ? 'bg-accent' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 ${isRTL ? 'rtl:grid-flow-row-dense' : ''}`}>
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {currentStep === 'shipping' && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold mb-6">Contact & Shipping</h2>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => updateForm('firstName', e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => updateForm('lastName', e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">{translate(language, 'checkout.address')}</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => updateForm('address', e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateForm('city', e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => updateForm('state', e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">ZIP</label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) => updateForm('zip', e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <label className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <input
                        type="checkbox"
                        checked={formData.saveInfo}
                        onChange={(e) => updateForm('saveInfo', e.target.checked)}
                        className="w-4 h-4 rounded border-border bg-input accent-accent"
                      />
                      <span className="text-sm">{translate(language, 'checkout.save-info')}</span>
                    </label>
                  </motion.div>
                )}

                {currentStep === 'delivery' && (
                  <motion.div
                    key="delivery"
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold mb-6">{translate(language, 'checkout.shipping-method')}</h2>
                    
                    {[
                      { id: 'standard', name: translate(language, 'checkout.standard'), price: subtotal > 5000 ? translate(language, 'cart.free') : '60 ج.م', time: `5-7 ${translate(language, 'checkout.business-days')}` },
                      { id: 'express', name: translate(language, 'checkout.express'), price: '120 ج.م', time: `2-3 ${translate(language, 'checkout.business-days')}` },
                      { id: 'overnight', name: translate(language, 'checkout.overnight'), price: '250 ج.م', time: translate(language, 'checkout.next-day') },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={formData.shippingMethod === method.id}
                            onChange={(e) => updateForm('shippingMethod', e.target.value)}
                            className="w-4 h-4 accent-accent"
                          />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.time}</p>
                          </div>
                        </div>
                        <span className="font-semibold">{method.price}</span>
                      </label>
                    ))}
                  </motion.div>
                )}

                {currentStep === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                    
                    <div className="p-4 bg-card rounded-xl border border-border">
                      <div className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CreditCard className="w-5 h-5" />
                        <span className="font-medium">Credit / Debit Card</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Card Number</label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => updateForm('cardNumber', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            required
                            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">{translate(language, 'checkout.card-name')}</label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => updateForm('cardName', e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">{translate(language, 'checkout.expiry')}</label>
                            <input
                              type="text"
                              value={formData.expiry}
                              onChange={(e) => updateForm('expiry', e.target.value)}
                              placeholder="MM/YY"
                              required
                              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">{translate(language, 'checkout.cvv')}</label>
                            <input
                              type="text"
                              value={formData.cvv}
                              onChange={(e) => updateForm('cvv', e.target.value)}
                              placeholder="123"
                              required
                              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Lock className="w-4 h-4" />
                      {translate(language, 'checkout.secure')}
                    </div>
                  </motion.div>
                )}

                {currentStep === 'review' && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                    
                    <div className="p-4 bg-card rounded-xl border border-border">
                      <h3 className="font-medium mb-2">{translate(language, 'checkout.shipping-address')}</h3>
                      <p className="text-muted-foreground">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zip}
                      </p>
                    </div>

                    <div className="p-4 bg-card rounded-xl border border-border">
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <p className="text-muted-foreground">
                        Card ending in {formData.cardNumber.slice(-4)}
                      </p>
                    </div>

                    <div className="p-4 bg-card rounded-xl border border-border">
                      <h3 className="font-medium mb-4">Order Items</h3>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={`${item.product.id}-${item.size}`} className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="relative w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {translate(language, 'product.size')}: {item.size} | {translate(language, 'cart.quantity')}: {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium">
                              {((item.product.salePrice || item.product.price) * item.quantity).toLocaleString()} ج.م
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={`flex gap-4 mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {currentStep !== 'shipping' && (
                  <button
                    type="button"
                    onClick={() => {
                      const prevIndex = currentStepIndex - 1
                      if (prevIndex >= 0) setCurrentStep(steps[prevIndex].id)
                    }}
                    className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 py-4 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_rgba(245,230,66,0.3)]"
                >
                  {currentStep === 'review' ? translate(language, 'checkout.place-order') : translate(language, 'common.continue')}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="relative w-16 h-16 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} w-5 h-5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center`}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{translate(language, 'product.size')}: {item.size}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {((item.product.salePrice || item.product.price) * item.quantity).toLocaleString()} ج.م
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-t border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{subtotal.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `${shipping.toLocaleString()} ج.م`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{tax.toLocaleString()} ج.م</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-accent">{total.toLocaleString()} ج.م</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
