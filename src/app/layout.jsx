'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
        <Footer />
          <Toaster position="bottom-right" />
       </CartProvider>
      </body>
    </html>
  )
}