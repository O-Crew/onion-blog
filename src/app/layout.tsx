import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Provider } from 'jotai'
import { AnimateSign } from '@/components/AnimateSign'

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
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-950 text-white-400 font-mono backdrop-blur-md">
          <header className="py-4 bg-opacity-20 backdrop-filter backdrop-blur-sm z-50">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
              <AnimateSign />
              <Navigation />
            </div>
          </header>
          <main className="container mx-auto px-4 py-8 text-white min-h-[calc(100vh-5rem)]">
            <Provider>{children}</Provider>
          </main>
        </div>
      </body>
    </html>
  )
}
