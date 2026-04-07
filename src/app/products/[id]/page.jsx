'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, ShoppingCart, Heart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { products } from '@/components/Data/products'
import { useCart } from '@/components/Context/CartContext'
import { useWishlist } from '@/components/Context/WishlistContext'
import toast from 'react-hot-toast'

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (params?.id) {
      const foundProduct = products.find(p => p.id === params.id)
      if (foundProduct) {
        setProduct(foundProduct)
        setActiveImage(foundProduct.image)
      } else {
        router.push('/#products')
      }
    }
  }, [params, router])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const isFavorited = isInWishlist(product.id)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Breadcrumb & Back */}
        <div className="mb-8">
          <Link href="/#products" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Image Gallery Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-12 border-r border-gray-100">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={activeImage}
                className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-6 flex justify-center items-center"
              >
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain p-4"
                />
              </motion.div>
              
              {/* Thumbnail strip */}
              {(product.images && product.images.length > 0) ? (
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  <button 
                    onClick={() => setActiveImage(product.image)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${activeImage === product.image ? 'border-indigo-600' : 'border-transparent hover:border-gray-300'}`}
                  >
                     <img src={product.image} alt="Thumbnail main" className="w-full h-full object-cover" />
                  </button>
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-indigo-600' : 'border-transparent hover:border-gray-300'}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Product Details Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center">
              <div className="mb-2 uppercase tracking-wide text-sm font-semibold text-indigo-600">
                {product.brand}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-500">({product.reviews} customer reviews)</span>
              </div>

              <div className="mb-6 flex items-end">
                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="ml-3 text-xl text-gray-500 line-through mb-1">₹{product.oldPrice}</span>
                )}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Quantity and Actions */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded-lg h-14 bg-gray-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 text-gray-600 hover:text-indigo-600 h-full flex items-center"
                  >-</button>
                  <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 text-gray-600 hover:text-indigo-600 h-full flex items-center"
                  >+</button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white h-14 rounded-lg flex items-center justify-center font-semibold text-lg transition-colors shadow-sm"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </button>

                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`h-14 w-14 flex items-center justify-center rounded-lg border flex-shrink-0 transition-colors
                    ${isFavorited ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-gray-300 bg-white text-gray-400 hover:border-pink-500 hover:text-pink-500'}
                  `}
                >
                  <Heart className={`h-6 w-6 ${isFavorited ? 'fill-pink-500' : ''}`} />
                </button>
              </div>

              {/* Features container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                 <div className="flex items-center text-gray-600">
                    <ShieldCheck className="h-5 w-5 mr-3 text-indigo-600" />
                    <span className="font-medium">1 Year Warranty</span>
                 </div>
                 <div className="flex items-center text-gray-600">
                    <Truck className="h-5 w-5 mr-3 text-indigo-600" />
                    <span className="font-medium">Free Fast Delivery</span>
                 </div>
                 <div className="flex items-center text-gray-600">
                    <RotateCcw className="h-5 w-5 mr-3 text-indigo-600" />
                    <span className="font-medium">30 Days Return</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Tab */}
        {product.specifications && (
          <div className="mt-12 bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">{key}</span>
                  <span className="font-medium text-gray-900 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
