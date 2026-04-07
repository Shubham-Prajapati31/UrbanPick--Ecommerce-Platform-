'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      
      if (existingItem) {
        toast.error(`${product.name} is already in your wishlist!`)
        return prev
      } else {
        toast.success(`${product.name} added to wishlist!`, {
          icon: '❤️',
          style: {
             background: '#fff',
             color: '#ec4899', // Pink-500
          }
        })
        return [...prev, product]
      }
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId))
    toast.success('Item removed from wishlist')
  }

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        toast.success('Item removed from wishlist')
        return prev.filter(item => item.id !== product.id)
      } else {
        toast.success(`${product.name} added to wishlist!`, {
          icon: '❤️',
          style: {
             background: '#fff',
             color: '#ec4899', // Pink-500
          }
        })
        return [...prev, product]
      }
    })
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlistItems, 
        addToWishlist, 
        removeFromWishlist, 
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
