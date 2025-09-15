import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Codegrip.cz - Web Design Agency',
  description: 'Professional web design services by Codegrip.cz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-gray-100 font-light">
        {children}
      </body>
    </html>
  )
}
