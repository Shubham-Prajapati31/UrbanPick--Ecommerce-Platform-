'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/components/Context/CartContext'
import Link from 'next/link'
import { X } from 'lucide-react'
import Image from 'next/image'

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col justify-center items-center px-4 text-center bg-white"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <Link
          href="/#products"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              
              {/* Desktop Header */}
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 border-b text-gray-800">
                <div className="col-span-6 font-semibold">Product</div>
                <div className="col-span-2 font-semibold">Price</div>
                <div className="col-span-2 font-semibold">Qty</div>
                <div className="col-span-2 font-semibold text-right">Total</div>
              </div>

              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b last:border-none"
                  >
                    
                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 items-center text-gray-900">
                      <div className="col-span-6 flex items-center">
                        <Image
                          src={item.image}
                          width={80}
                          height={80}
                          alt={item.name}
                          className="rounded-lg object-cover mr-4"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-500 mt-1 flex items-center"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 font-medium">
                        ₹{item.price}
                      </div>

                      <div className="col-span-2">
                        <div className="flex border rounded-lg w-24">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-2 text-gray-900"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 text-gray-900"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-right font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden p-4 space-y-3 text-gray-900">
                      <div className="flex gap-4">
                        <Image
                          src={item.image}
                          width={80}
                          height={80}
                          alt={item.name}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            ₹{item.price}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-500 mt-1 flex items-center"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex border rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 text-gray-900"
                          >
                            -
                          </button>
                          <span className="px-4 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 text-gray-900"
                          >
                            +
                          </button>
                        </div>
                        <div className="font-semibold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4 text-gray-900">
              <h2 className="text-xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{cartTotal > 1000 ? 'Free' : '₹50'}</span>
                </div>
                <div className="flex justify-between border-t pt-4 font-bold">
                  <span>Total</span>
                  <span>
                    ₹{(cartTotal > 1000 ? cartTotal : cartTotal + 50).toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg mb-4">
                Proceed to Checkout
              </button>

              <Link
                href="/#products"
                className="block text-center text-sm text-gray-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CartPage
