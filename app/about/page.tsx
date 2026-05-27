'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Globe, Users, Leaf } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '100+', label: 'Brand Partners' },
    { value: '500K+', label: 'Sneakers Sold' },
    { value: '99%', label: 'Authenticity Rate' },
  ]

  const values = [
    {
      icon: Award,
      title: '100% Authentic',
      description: 'Every sneaker is verified by our team of experts before it reaches you.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'We ship to over 100 countries, bringing the best kicks worldwide.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Built by sneakerheads, for sneakerheads. We get it.',
    },
    {
      icon: Leaf,
      title: 'Sustainable',
      description: 'Eco-friendly packaging and carbon-neutral shipping options.',
    },
  ]

  const timeline = [
    { year: '2019', title: 'The Beginning', description: 'Started as a passion project by two sneaker enthusiasts.' },
    { year: '2020', title: 'Going Digital', description: 'Launched our online platform during the pandemic.' },
    { year: '2021', title: 'Rapid Growth', description: 'Expanded to 50+ countries and 100K customers.' },
    { year: '2022', title: 'Authentication Lab', description: 'Opened our state-of-the-art authentication facility.' },
    { year: '2023', title: 'Global Presence', description: 'Became a trusted name in the sneaker community worldwide.' },
    { year: '2024', title: 'The Future', description: 'Continuing to innovate and serve sneaker culture.' },
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
            <span className="text-accent text-sm tracking-widest">OUR STORY</span>
            <h1 className="text-5xl md:text-7xl font-display tracking-wider mt-4">
              BORN FROM PASSION
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              SNKRVAULT was founded with a simple mission: to bring the world&apos;s most coveted sneakers to collectors and enthusiasts everywhere. We believe every pair tells a story.
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
            <h2 className="text-4xl md:text-5xl font-display tracking-wider">OUR VALUES</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              What drives us every day to deliver the best sneaker experience.
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
            <h2 className="text-4xl md:text-5xl font-display tracking-wider">OUR JOURNEY</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8"
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
              JOIN THE VAULT
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Be part of a community that shares your passion for sneakers.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-full mt-8 hover:bg-accent/90 transition-all hover:scale-105"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
