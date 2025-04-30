import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Schoolbell } from 'next/font/google'
import './globals.css'
import { Provider } from 'jotai'

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

const schoolbell = Schoolbell({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-schoolbell'
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${schoolbell.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="min-h-screen bg-gradient-to-br from-background to-background/80 text-white-400 font-mono backdrop-blur-md">
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  )
}
