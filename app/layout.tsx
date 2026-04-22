import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Web Matrix - Next-Gen AI & Digital Solutions',
  description: 'The future of web & software innovation. Web Matrix provides cutting-edge Web Development, UI/UX Design, Software Development, IoT Projects, and College Student Projects.',
  generator: 'Web Matrix',
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
