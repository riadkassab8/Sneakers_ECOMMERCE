'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight } from 'lucide-react'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const mockOrders = [
    { id: 'SNK123456', date: '2024-01-15', status: 'Delivered', total: 180, items: 1 },
    { id: 'SNK123457', date: '2024-01-10', status: 'Shipped', total: 340, items: 2 },
    { id: 'SNK123458', date: '2024-01-05', status: 'Processing', total: 230, items: 1 },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display tracking-wider mb-8"
        >
          MY ACCOUNT
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
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
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-6"
            >
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="john@example.com"
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      Save Changes
                    </button>
                  </form>

                  <hr className="border-border" />

                  <div>
                    <h3 className="font-semibold mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Order History</h2>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
                      >
                        <div>
                          <p className="font-semibold">#{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                          <p className="text-sm text-muted-foreground">{order.items} item(s)</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total}</p>
                          <span
                            className={`text-sm px-2 py-1 rounded ${
                              order.status === 'Delivered'
                                ? 'bg-green-500/20 text-green-500'
                                : order.status === 'Shipped'
                                ? 'bg-blue-500/20 text-blue-500'
                                : 'bg-accent/20 text-accent'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Saved Addresses</h2>
                    <button className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors">
                      Add New Address
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium bg-accent/20 text-accent px-2 py-1 rounded">
                          Default
                        </span>
                        <button className="text-sm text-accent hover:underline">Edit</button>
                      </div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-muted-foreground text-sm">
                        123 Main Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                    <div className="p-4 border border-border rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Work</span>
                        <button className="text-sm text-accent hover:underline">Edit</button>
                      </div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-muted-foreground text-sm">
                        456 Office Park<br />
                        San Francisco, CA 94102<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Wishlist</h2>
                  <p className="text-muted-foreground">
                    View and manage your saved items.
                  </p>
                  <Link
                    href="/wishlist"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Go to Wishlist
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Preferences</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl cursor-pointer">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about orders and promotions
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded accent-accent"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl cursor-pointer">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Get text updates for shipping and delivery
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded accent-accent"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl cursor-pointer">
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-muted-foreground">
                          Weekly updates on new drops and exclusive offers
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-5 h-5 rounded accent-accent"
                      />
                    </label>
                  </div>

                  <hr className="border-border" />

                  <div>
                    <h3 className="font-semibold mb-4">Preferred Size</h3>
                    <select className="w-full md:w-auto px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                      <option>US 8</option>
                      <option>US 9</option>
                      <option>US 10</option>
                      <option>US 11</option>
                      <option>US 12</option>
                    </select>
                  </div>

                  <button className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors">
                    Save Preferences
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
