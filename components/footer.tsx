'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube, Facebook, ArrowUp } from 'lucide-react'
import { useLanguageStore } from '@/lib/language-store'

export function Footer() {
  const { t } = useLanguageStore()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    shop: [
      { label: t('footer.new-arrivals'), href: '/shop?filter=new' },
      { label: t('footer.best-sellers'), href: '/shop?filter=bestseller' },
      { label: t('footer.sale'), href: '/shop?filter=sale' },
      { label: t('footer.all-products'), href: '/shop' },
    ],
    help: [
      { label: t('footer.contact-us'), href: '/contact' },
      { label: t('footer.faqs'), href: '/contact#faq' },
      { label: t('footer.shipping'), href: '/shipping' },
      { label: t('footer.returns'), href: '/returns' },
    ],
    company: [
      { label: t('footer.about-us'), href: '/about' },
      { label: t('footer.careers'), href: '/careers' },
      { label: t('footer.press'), href: '/press' },
      { label: t('footer.sustainability'), href: '/sustainability' },
    ],
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              <span className="text-foreground">SNKR</span>
              <span className="text-accent">VAULT</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.brand-desc')}
            </p>
            <div className="flex gap-4">
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
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">{t('footer.shop-title')}</h3>
            <ul className="space-y-3">
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
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">{t('footer.help-title')}</h3>
            <ul className="space-y-3">
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
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">{t('footer.stay-updated')}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('footer.newsletter-desc')}
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-lg hover:bg-accent/90 transition-colors"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-muted-foreground text-sm hover:text-foreground">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="text-muted-foreground text-sm hover:text-foreground">
              {t('footer.terms')}
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="p-3 bg-secondary rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
