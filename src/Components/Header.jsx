'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Search, Heart, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '@/Components/Context/CartContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { cartItems } = useCart()

  const searchRef = useRef(null)
  const userDropdownRef = useRef(null)
  const cartRef = useRef(null)

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/#products' },
    { name: 'Categories', href: '/#categories' },
    { name: 'Contact', href: '/#contact' },
  ]

  const userLinks = [
    { name: 'My Account', href: '/account' },
    { name: 'Orders', href: '/orders' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Logout', href: '/logout' },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white shadow-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Left section - Menu button and Logo */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              className="md:hidden text-gray-700 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/" className="text-xl sm:text-2xl font-bold text-indigo-600">
              UrbanPick
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium text-sm lg:text-base"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right section - Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-700 hover:text-indigo-600 transition-colors p-1"
                aria-label="Search"
              >
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-white p-2 rounded-md shadow-lg border border-gray-200"
                  >
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              className="text-gray-700 hover:text-indigo-600 transition-colors relative p-1"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="text-gray-700 hover:text-indigo-600 transition-colors p-1"
                aria-label="User menu"
              >
                <User className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  >
                    {userLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart Dropdown */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative text-gray-700 hover:text-indigo-600 transition-colors p-1"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-md shadow-lg p-4 z-50 border border-gray-200"
                  >
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Cart Items</h4>
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500 text-sm py-2">Your cart is empty.</p>
                    ) : (
                      <ul className="space-y-2 max-h-48 sm:max-h-60 overflow-y-auto">
                        {cartItems.map((item, index) => (
                          <li key={index} className="text-gray-700 text-sm border-b pb-2 last:border-b-0">
                            <div className="flex justify-between items-center">
                              <span className="truncate flex-1">{item.name}</span>
                              <span className="text-indigo-600 font-medium ml-2">
                                × {item.quantity}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <Link
                        href="/Cart"
                        className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                        onClick={() => setIsCartOpen(false)}
                      >
                        View Cart
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg border-t border-gray-200 overflow-hidden"
          >
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium py-3 px-4 rounded-lg hover:bg-indigo-50 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile-only user actions */}
              <div className="pt-4 mt-2 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2 px-2">
                  <Link 
                    href="/wishlist" 
                    className="flex items-center justify-center text-gray-700 hover:text-indigo-600 transition-colors py-2 px-3 rounded-lg hover:bg-indigo-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    <span>Wishlist</span>
                  </Link>
                  <Link 
                    href="/account" 
                    className="flex items-center justify-center text-gray-700 hover:text-indigo-600 transition-colors py-2 px-3 rounded-lg hover:bg-indigo-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    <span>Account</span>
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header