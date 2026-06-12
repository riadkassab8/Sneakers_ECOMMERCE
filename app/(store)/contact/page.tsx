'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, ChevronDown, Send } from 'lucide-react'
import { useToastStore } from '@/components/toast'
import { useLanguageStore, t as translate } from '@/lib/language-store'

export default function ContactPage() {
  const { addToast } = useToastStore()
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addToast({
      type: 'success',
      message: translate(language, 'contact.message-sent'),
      description: translate(language, 'contact.message-sent-desc'),
    })
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const faqs = [
    {
      question: translate(language, 'contact.faq.track.question'),
      answer: translate(language, 'contact.faq.track.answer'),
    },
    {
      question: translate(language, 'contact.faq.return.question'),
      answer: translate(language, 'contact.faq.return.answer'),
    },
    {
      question: translate(language, 'contact.faq.authentic.question'),
      answer: translate(language, 'contact.faq.authentic.answer'),
    },
    {
      question: translate(language, 'contact.faq.shipping.question'),
      answer: translate(language, 'contact.faq.shipping.answer'),
    },
    {
      question: translate(language, 'contact.faq.international.question'),
      answer: translate(language, 'contact.faq.international.answer'),
    },
    {
      question: translate(language, 'contact.faq.size.question'),
      answer: translate(language, 'contact.faq.size.answer'),
    },
  ]

  const contactInfo = [
    { icon: Mail, label: translate(language, 'contact.info.email'), value: 'support@snkrvault.com', href: 'mailto:support@snkrvault.com' },
    { icon: Phone, label: translate(language, 'contact.info.phone'), value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, label: translate(language, 'contact.info.address'), value: '123 Sneaker Street, New York, NY 10001', href: '#' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display tracking-wider">{translate(language, 'contact.title')}</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            {translate(language, 'contact.description')}
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 ${isRTL ? 'rtl:grid-flow-row-dense' : ''}`}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl p-8">
              <h2 className={`text-2xl font-semibold mb-6 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'contact.form-title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'contact.name')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={translate(language, 'contact.name-placeholder')}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'contact.email')}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    dir="ltr"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={translate(language, 'contact.email-placeholder')}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'contact.subject')}</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="">{translate(language, 'contact.select-topic')}</option>
                    <option value="order">{translate(language, 'contact.topic.order')}</option>
                    <option value="product">{translate(language, 'contact.topic.product')}</option>
                    <option value="return">{translate(language, 'contact.topic.return')}</option>
                    <option value="other">{translate(language, 'contact.topic.other')}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'contact.message')}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={5}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder={translate(language, 'contact.message-placeholder')}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-4 bg-accent text-accent-foreground font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Send className="w-5 h-5" />
                  {translate(language, 'contact.send')}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-card rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">{translate(language, 'contact.get-in-touch')}</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-start gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium group-hover:text-accent transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-card rounded-2xl p-8 overflow-hidden">
              <h2 className="text-2xl font-semibold mb-6">{translate(language, 'contact.location')}</h2>
              <div className="h-64 rounded-xl overflow-hidden border border-border">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02,40.70,-73.99,40.73&layer=mapnik&marker=40.7128,-74.0060"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Live Chat */}
            <button className={`w-full py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
              <MessageCircle className="w-5 h-5" />
              {translate(language, 'contact.live-chat')}
            </button>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <section id="faq">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display tracking-wider">
              {translate(language, 'contact.faq.title')}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between p-6 text-start ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <span className={`font-medium ${isRTL ? 'pl-4' : 'pr-4'}`}>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted-foreground">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
