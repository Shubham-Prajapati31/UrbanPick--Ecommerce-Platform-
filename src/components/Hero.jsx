'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero.png"
          alt="Featured Banner"
          fill
          // mobile: shift a little left, desktop: normal center
          className="object-cover object-[70%_center] md:object-center"
          priority
        />
      </motion.div>

      {/* Gradient Overlay with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/5 z-10"
      />

      {/* Text Overlay */}
      <div
        className="
          relative z-20 h-full px-5 sm:px-6 md:px-16
          flex items-end md:items-center
          pb-7 sm:pb-8 md:pb-0
        "
      >
        <div className="max-w-xl text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -130 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="
              text-white 
              text-[1.9rem] leading-tight 
              sm:text-4xl sm:leading-snug 
              md:text-7xl md:leading-tight 
              font-bold 
              mb-2 sm:mb-3 md:mb-8
            "
          >
            Summer Collection 2025
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, x: -180 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="
              text-white 
              text-[0.9rem] leading-relaxed 
              sm:text-lg sm:leading-relaxed 
              md:text-2xl 
              mb-4 sm:mb-6 md:mb-10 
              max-w-sm md:max-w-none
            "
          >
            Discover our new arrivals with exclusive discounts. Limited time offer!
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: -110 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="flex space-x-4"
          >
            <Link 
              href="/#products"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Shop Now
            </Link>
            <Link 
              href="/#categories"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Explore
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
