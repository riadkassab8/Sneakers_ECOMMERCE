'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube, Facebook, ArrowUp } from 'lucide-react'
import { useLanguageStore, t as translate } from '@/lib/language-store'

export function Footer() {
  const { language } = useLanguageStore()
  const isRTL = language === 'ar'

  const footerLinks = {
    shop: [
      { label: translate(language, 'footer.new-arrivals'), href: '/shop?filter=new' },
      { label: translate(language, 'footer.best-sellers'), href: '/shop?filter=bestseller' },
      { label: translate(language, 'footer.sale'), href: '/shop?filter=sale' },
      { label: translate(language, 'footer.all-products'), href: '/shop' },
    ],
    help: [
      { label: translate(language, 'footer.contact-us'), href: '/contact' },
      { label: translate(language, 'footer.faqs'), href: '/contact#faq' },
      { label: translate(language, 'footer.shipping'), href: '/shipping' },
      { label: translate(language, 'footer.returns'), href: '/returns' },
    ],
    company: [
      { label: translate(language, 'footer.about-us'), href: '/about' },
      { label: translate(language, 'footer.careers'), href: '/careers' },
      { label: translate(language, 'footer.press'), href: '/press' },
      { label: translate(language, 'footer.sustainability'), href: '/sustainability' },
    ],
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ]

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${isRTL ? 'text-right' : ''}`}>
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              <span className="text-foreground">SNKR</span>
              <span className="text-accent">VAULT</span>
            </Link>
            <p className={`text-muted-foreground text-sm leading-relaxed ${isRTL ? 'text-right' : ''}`}>
              {translate(language, 'footer.brand-desc')}
            </p>
            <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-secondary rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className={`text-sm font-semibold tracking-widest uppercase mb-4 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'footer.shop-title')}</h3>
            <ul className={`space-y-3 ${isRTL ? 'items-end flex flex-col' : ''}`}>
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className={`text-sm font-semibold tracking-widest uppercase mb-4 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'footer.help-title')}</h3>
            <ul className={`space-y-3 ${isRTL ? 'items-end flex flex-col' : ''}`}>
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={`text-sm font-semibold tracking-widest uppercase mb-4 ${isRTL ? 'text-right' : ''}`}>{translate(language, 'footer.newsletter')}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {translate(language, 'footer.newsletter-desc')}
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder={translate(language, 'newsletter.placeholder')}
                className={`w-full px-4 py-3 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-lg hover:bg-accent/90 transition-colors cursor-pointer"
              >
                {translate(language, 'footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-muted-foreground text-sm">
            {translate(language, 'footer.copyright')}
          </p>
          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="/privacy" className="text-muted-foreground text-sm hover:text-foreground">
              {translate(language, 'footer.privacy')}
            </Link>
            <Link href="/terms" className="text-muted-foreground text-sm hover:text-foreground">
              {translate(language, 'footer.terms')}
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="p-3 bg-secondary rounded-full hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
