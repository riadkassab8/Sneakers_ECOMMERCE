'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown, ArrowRight, Zap, Shield, Truck } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { useRef } from 'react'
import { useLanguageStore, t as translate } from '@/lib/language-store'

export default function HomePage() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const featuredProducts = products.filter(p => p.tags.includes('featured')).slice(0, 4)
  const newProducts = products.filter(p => p.isNew).slice(0, 6)
  const trendingProducts = products.filter(p => p.tags.includes('trending')).slice(0, 8)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <div ref={containerRef}>
      {/* Hero Section - Clean & Minimal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-card/50" />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRTL ? 'rtl:grid-flow-row-dense' : ''}`}>
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="text-accent text-sm tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {translate(language, 'hero.premium')}
              </motion.span>

              <motion.h1
                className="text-5xl md:text-7xl font-bold mt-4 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {translate(language, 'hero.title')}
                <br />
                <span className="text-accent">{translate(language, 'hero.subtitle')}</span>
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground mt-6 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {translate(language, 'hero.desc')}
              </motion.p>

              <motion.div
                className={`flex gap-4 mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  href="/shop"
                  className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                >
                  {translate(language, 'hero.shop')}
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 border border-border rounded-lg hover:bg-card transition-colors"
                >
                  {translate(language, 'hero.learn-more')}
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Side */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Subtle glow */}
              <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />

              {/* Sneaker Image */}
              <motion.div
                className="relative z-10"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
                  alt="Premium Sneaker"
                  width={600}
                  height={400}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {[
                  { label: translate(language, 'stats.products'), value: '500+' },
                  { label: translate(language, 'stats.brands'), value: '50+' },
                  { label: translate(language, 'stats.customers'), value: '10K+' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-accent">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-muted-foreground tracking-widest">{translate(language, 'stats.scroll')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-4 h-4 text-accent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Brand Promise */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: translate(language, 'brand.exclusive'), desc: translate(language, 'brand.exclusive-desc') },
              { icon: Shield, title: translate(language, 'brand.authentic'), desc: translate(language, 'brand.authentic-desc') },
              { icon: Truck, title: translate(language, 'brand.shipping'), desc: translate(language, 'brand.shipping-desc') },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-4 p-6 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className="p-4 bg-accent/10 rounded-xl">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex items-end justify-between mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display tracking-wider">{translate(language, 'featured.title')}</h2>
              <p className="text-muted-foreground mt-2">{translate(language, 'featured.subtitle')}</p>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-accent hover:underline"
            >
              {translate(language, 'featured.view-all')} {isRTL ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* New Drops Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&q=80"
            alt="New Drops"
            fill
            className="object-cover opacity-30"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${isRTL ? 'from-transparent via-background/80 to-background' : 'from-background via-background/80 to-transparent'}`} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-accent text-sm tracking-widest">{translate(language, 'new.badge')}</span>
            <h2 className="text-5xl md:text-7xl font-display tracking-wider mt-4">
              {translate(language, 'new.title')}
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              {translate(language, 'new.desc')}
            </p>
            <Link
              href="/shop?filter=new"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full mt-8 hover:bg-accent/90 transition-all hover:scale-105"
            >
              {translate(language, 'new.shop')}
              {isRTL ? <ArrowRight className="w-5 h-5 rotate-180" /> : <ArrowRight className="w-5 h-5" />}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Products Carousel */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex items-end justify-between mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display tracking-wider">{translate(language, 'new.drops.title')}</h2>
              <p className="text-muted-foreground mt-2">{translate(language, 'new.drops.subtitle')}</p>
            </div>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {newProducts.map((product, i) => (
              <div key={product.id} className="flex-shrink-0 w-72">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-32 bg-card relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent text-sm tracking-widest">{translate(language, 'story.badge')}</span>
            <h2 className="text-4xl md:text-6xl font-display tracking-wider mt-4 max-w-4xl mx-auto">
              {translate(language, 'story.title')}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
              {translate(language, 'story.desc')}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-accent mt-8 hover:underline"
            >
              {translate(language, 'hero.learn-more')} {isRTL ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex items-end justify-between mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display tracking-wider">{translate(language, 'trending.title')}</h2>
              <p className="text-muted-foreground mt-2">{translate(language, 'trending.subtitle')}</p>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-accent hover:underline"
            >
              {translate(language, 'common.view-all')} {isRTL ? <ArrowRight className="w-4 h-4 rotate-180" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display tracking-wider">
              {translate(language, 'newsletter.title')}
            </h2>
            <p className="text-muted-foreground mt-4">
              {translate(language, 'newsletter.desc')}
            </p>
            <form className={`mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <input
                type="email"
                placeholder={translate(language, 'newsletter.placeholder')}
                className={`flex-1 px-6 py-4 bg-input border border-border rounded-full text-center focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'sm:text-right' : 'sm:text-left'}`}
              />
              <button
                type="submit"
                className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors"
              >
                {translate(language, 'newsletter.subscribe')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
