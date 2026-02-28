'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { products } from '@/components/Data/products'
import { Star, ShoppingCart, ArrowRight } from 'lucide-react'
import { useCart } from '@/components/Context/CartContext'
import toast from 'react-hot-toast'

const Products = () => {
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: '#4f46e5',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#4f46e5',
      },
    })
  }

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative"
        >
          <span className="inline-block px-4 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full mb-4">
            Premium Collection
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Featured Products
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover our handpicked selection of exceptional products
          </p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              
              <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Product Image */}
                <Link href={`/products/${product.id}`} className="block relative">
                  <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.isNew && (
                      <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        New Arrival
                      </span>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors text-lg">
                        {product.name}
                      </h3>
                    </Link>
                    <span className="font-bold text-indigo-600">₹{product.price}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-5">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors font-medium flex items-center justify-center"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                    <Link 
                      href={`/products/${product.id}`}
                      className="inline-flex items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      title="View Details"
                    >
                      <ArrowRight className="h-4 w-4 text-gray-600" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link 
            href="/#products"
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-medium rounded-full border-2 border-indigo-100 hover:border-indigo-200 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <span>View All Products</span>
            <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Products