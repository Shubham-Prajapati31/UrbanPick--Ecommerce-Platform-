'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { categories } from '@/Components/Data/categories'

const Categories = () => {
  return (
    <section id="categories" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Shop by Category
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully curated collections designed for every need and style
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Link 
                href={`/#products?category=${category.id}`}
                className="block h-full"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg h-full flex flex-col">
                  {/* Image with gradient overlay */}
                  <div className="relative pt-[80%]">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                  </div>
                  
                  {/* Category info */}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
                    <motion.h3 
                      className="text-2xl font-bold mb-1"
                      whileHover={{ x: 5 }}
                    >
                      {category.name}
                    </motion.h3>
                    <p className="text-white/90">{category.items} items</p>
                  </div>
                  
                  {/* Floating button */}
                  <motion.div 
                    className="absolute top-4 right-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm text-indigo-600 rounded-full p-3 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </motion.div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-all duration-300"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link 
            href="/#products" 
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            View All Categories
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Categories