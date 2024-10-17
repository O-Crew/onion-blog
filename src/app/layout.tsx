import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Navigation } from '@/components/Navigation'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Onion-L Blog',
  description: 'Personal Blog website (Onion-L)'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900  to-green-950 text-white-400 font-mono backdrop-blur-md">
          <header className="py-4  bg-opacity-20 backdrop-filter backdrop-blur-sm text-gray-500">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Onion-L&apos;s Blog</h1>
              <Navigation />
            </div>
          </header>
          <main className="container mx-auto px-4 py-8 text-white">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
