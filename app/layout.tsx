import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL('https://web-matrix.com'),
  title: {
    default: 'Web Matrix | Web Development & UI/UX Design Services',
    template: '%s | Web Matrix',
  },
  description: 'Top-tier web development company and UI/UX design services. We provide innovative software solutions, IoT projects, and student project solutions globally.',
  keywords: [
    'web development company', 
    'UI/UX design services', 
    'software development company', 
    'IoT projects', 
    'student project solutions',
    'web development agency',
    'custom software solutions',
    'digital transformation'
  ],
  authors: [{ name: 'Web Matrix' }],
  creator: 'Web Matrix',
  publisher: 'Web Matrix',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Web Matrix | Web Development & UI/UX Design Services',
    description: 'Top-tier web development company and UI/UX design services. We provide innovative software solutions, IoT projects, and student project solutions globally.',
    url: 'https://web-matrix.com',
    siteName: 'Web Matrix',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Web Matrix - Web & Software Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Matrix | Web Development & UI/UX Design Services',
    description: 'Top-tier web development company and UI/UX design services. We provide innovative software solutions, IoT projects, and student project solutions globally.',
    images: ['/images/og-image.jpg'],
    creator: '@webmatrix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/icon.svg',
    apple: '/images/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#050510] text-[#f0f0ff] overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Web Matrix",
              "url": "https://web-matrix.com",
              "logo": "https://web-matrix.com/images/icon.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-123-456-7890",
                "contactType": "customer service",
                "areaServed": "Global",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://twitter.com/webmatrix",
                "https://linkedin.com/company/webmatrix"
              ]
            })
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
