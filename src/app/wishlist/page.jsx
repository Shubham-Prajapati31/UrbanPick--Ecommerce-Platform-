'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useWishlist } from '@/components/Context/WishlistContext'
import { useCart } from '@/components/Context/CartContext'
import { Star, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
          <p className="text-gray-600 mt-2">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">❤️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't saved any items to your wishlist yet. Start exploring our collection and save your favorites!
            </p>
            <Link 
              href="/#products"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Discover Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative pt-[100%] bg-gray-100 overflow-hidden group">
                  <Link href={`/products/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 bg-white text-gray-400 hover:text-red-500 p-2 rounded-full shadow-md transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors text-lg line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="font-bold text-indigo-600 mb-2">₹{product.price}</div>

                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors font-medium flex items-center justify-center"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
