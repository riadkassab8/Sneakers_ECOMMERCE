'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight, ChevronLeft, LayoutDashboard } from 'lucide-react'
import { useLanguageStore, t as translate } from '@/lib/language-store'

export default function AccountPage() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const [activeTab, setActiveTab] = useState('profile')
  const Chevron = isRTL ? ChevronLeft : ChevronRight

  const tabs = [
    { id: 'profile', label: translate(language, 'account.profile'), icon: User },
    { id: 'orders', label: translate(language, 'account.orders'), icon: Package },
    { id: 'addresses', label: translate(language, 'account.addresses'), icon: MapPin },
    { id: 'wishlist', label: translate(language, 'account.wishlist'), icon: Heart },
    { id: 'settings', label: translate(language, 'account.settings'), icon: Settings },
  ]

  const mockOrders = [
    { id: 'SNK123456', date: '2024-01-15', status: translate(language, 'dashboard.delivered'), total: 180, items: 1 },
    { id: 'SNK123457', date: '2024-01-10', status: translate(language, 'dashboard.shipped'), total: 340, items: 2 },
    { id: 'SNK123458', date: '2024-01-05', status: translate(language, 'dashboard.processing'), total: 230, items: 1 },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl md:text-5xl font-display tracking-wider mb-8 ${isRTL ? 'text-right' : ''}`}
        >
          {translate(language, 'account.title').toUpperCase()}
        </motion.h1>

        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-8 ${isRTL ? 'rtl:grid-flow-row-dense' : ''}`}>
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isRTL ? 'flex-row-reverse' : ''} ${
                    activeTab === tab.id
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
              <hr className="border-border my-2" />
              <Link
                href="/dashboard"
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">{translate(language, 'nav.dashboard')}</span>
              </Link>
              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <LogOut className="w-5 h-5" />
                <span className="font-medium">{translate(language, 'account.logout')}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-6"
            >
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-semibold ${isRTL ? 'text-right' : ''}`}>{translate(language, 'account.profile-info')}</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'account.first-name')}</label>
                        <input type="text" defaultValue="John" dir={isRTL ? 'rtl' : 'ltr'} className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'account.last-name')}</label>
                        <input type="text" defaultValue="Doe" dir={isRTL ? 'rtl' : 'ltr'} className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'checkout.email')}</label>
                      <input type="email" defaultValue="john@example.com" dir="ltr" className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'checkout.phone')}</label>
                      <input type="tel" defaultValue="+1 (555) 123-4567" dir="ltr" className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <button type="submit" className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors">
                      {translate(language, 'account.save-changes')}
                    </button>
                  </form>
                  <hr className="border-border" />
                  <div>
                    <h3 className={`font-semibold mb-4 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'account.change-password')}</h3>
                    <form className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'account.current-password')}</label>
                        <input type="password" className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'account.new-password')}</label>
                        <input type="password" className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'account.confirm-password')}</label>
                        <input type="password" className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                      <button type="submit" className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors">
                        {translate(language, 'account.update-password')}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-semibold ${isRTL ? 'text-right' : ''}`}>{translate(language, 'account.order-history')}</h2>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className={`flex items-center justify-between p-4 bg-secondary/50 rounded-xl ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="font-semibold">#{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                          <p className="text-sm text-muted-foreground">{order.items} {translate(language, 'account.items')}</p>
                        </div>
                        <div className={isRTL ? 'text-left' : 'text-right'}>
                          <p className="font-semibold">${order.total}</p>
                          <span className="text-sm px-2 py-1 rounded bg-accent/20 text-accent">{order.status}</span>
                        </div>
                        <Chevron className="w-5 h-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h2 className="text-xl font-semibold">{translate(language, 'account.saved-addresses')}</h2>
                    <button className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors">
                      {translate(language, 'account.add-address')}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 border border-border rounded-xl ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm font-medium bg-accent/20 text-accent px-2 py-1 rounded">
                          {translate(language, 'account.default')}
                        </span>
                        <button className="text-sm text-accent hover:underline">{translate(language, 'account.edit')}</button>
                      </div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-muted-foreground text-sm">123 Main Street<br />New York, NY 10001<br />United States</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className={`space-y-6 ${isRTL ? 'text-right' : ''}`}>
                  <h2 className="text-xl font-semibold">{translate(language, 'account.wishlist')}</h2>
                  <p className="text-muted-foreground">{translate(language, 'account.wishlist-desc')}</p>
                  <Link
                    href="/wishlist"
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {translate(language, 'account.go-wishlist')}
                    <Chevron className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className={`text-xl font-semibold ${isRTL ? 'text-right' : ''}`}>{translate(language, 'account.preferences')}</h2>
                  <div className="space-y-4">
                    {[
                      { title: translate(language, 'account.email-notifications'), desc: translate(language, 'account.email-notifications-desc'), checked: true },
                      { title: translate(language, 'account.sms-notifications'), desc: translate(language, 'account.sms-notifications-desc'), checked: false },
                      { title: translate(language, 'account.newsletter-pref'), desc: translate(language, 'account.newsletter-pref-desc'), checked: true },
                    ].map((pref) => (
                      <label key={pref.title} className={`flex items-center justify-between p-4 bg-secondary/50 rounded-xl cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="font-medium">{pref.title}</p>
                          <p className="text-sm text-muted-foreground">{pref.desc}</p>
                        </div>
                        <input type="checkbox" defaultChecked={pref.checked} className="w-5 h-5 rounded accent-accent" />
                      </label>
                    ))}
                  </div>
                  <button className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors">
                    {translate(language, 'account.save-preferences')}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
