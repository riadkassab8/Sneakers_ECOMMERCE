'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Globe, Users, Leaf } from 'lucide-react'
import { useLanguageStore, t as translate } from '@/lib/language-store'

export default function AboutPage() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const stats = [
    { value: '50K+', label: translate(language, 'about.stats.customers') },
    { value: '100+', label: translate(language, 'about.stats.partners') },
    { value: '500K+', label: translate(language, 'about.stats.sold') },
    { value: '99%', label: translate(language, 'about.stats.authenticity') },
  ]

  const values = [
    {
      icon: Award,
      title: translate(language, 'about.values.authentic.title'),
      description: translate(language, 'about.values.authentic.description'),
    },
    {
      icon: Globe,
      title: translate(language, 'about.values.global.title'),
      description: translate(language, 'about.values.global.description'),
    },
    {
      icon: Users,
      title: translate(language, 'about.values.community.title'),
      description: translate(language, 'about.values.community.description'),
    },
    {
      icon: Leaf,
      title: translate(language, 'about.values.sustainable.title'),
      description: translate(language, 'about.values.sustainable.description'),
    },
  ]

  const timeline = [
    { year: '2019', title: translate(language, 'about.timeline.2019.title'), description: translate(language, 'about.timeline.2019.description') },
    { year: '2020', title: translate(language, 'about.timeline.2020.title'), description: translate(language, 'about.timeline.2020.description') },
    { year: '2021', title: translate(language, 'about.timeline.2021.title'), description: translate(language, 'about.timeline.2021.description') },
    { year: '2022', title: translate(language, 'about.timeline.2022.title'), description: translate(language, 'about.timeline.2022.description') },
    { year: '2023', title: translate(language, 'about.timeline.2023.title'), description: translate(language, 'about.timeline.2023.description') },
    { year: '2024', title: translate(language, 'about.timeline.2024.title'), description: translate(language, 'about.timeline.2024.description') },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&q=80"
            alt="About"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-accent text-sm tracking-widest">{translate(language, 'about.story')}</span>
            <h1 className="text-5xl md:text-7xl font-display tracking-wider mt-4">
              {translate(language, 'about.title')}
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              {translate(language, 'about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="text-4xl md:text-5xl font-bold text-accent">{stat.value}</span>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display tracking-wider">{translate(language, 'about.values.title')}</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {translate(language, 'about.values.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-card rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display tracking-wider">{translate(language, 'about.journey')}</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: isRTL ? (i % 2 === 0 ? 40 : -40) : (i % 2 === 0 ? -40 : 40) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex gap-6 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm">
                    {item.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-accent text-sm">{item.year}</span>
                  <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display tracking-wider">
              {translate(language, 'about.cta.title')}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              {translate(language, 'about.cta.description')}
            </p>
            <Link
              href="/shop"
              className={`inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full mt-8 hover:bg-accent/90 transition-all hover:scale-105 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {translate(language, 'about.cta.button')}
              {isRTL ? <ArrowRight className="w-5 h-5 rotate-180" /> : <ArrowRight className="w-5 h-5" />}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
