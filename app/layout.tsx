import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue, Almarai } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartSidebar } from '@/components/cart-sidebar'
import { SearchOverlay } from '@/components/search-overlay'
import { ToastProvider } from '@/components/toast'
import { LanguageWrapper } from '@/components/language-wrapper'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const almarai = Almarai({
  weight: ['300', '400', '700', '800'],
  subsets: ['arabic'],
  variable: '--font-almarai',
})

export const metadata: Metadata = {
  title: 'SNKRVAULT | Premium Sneaker Store',
  description: 'Step into the future with premium sneakers. Exclusive drops, limited editions, and the hottest kicks.',
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${almarai.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <LanguageWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
          <SearchOverlay />
          <ToastProvider />
        </LanguageWrapper>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
