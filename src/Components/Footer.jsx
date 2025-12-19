'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/#products' },
        { name: 'Featured', href: '/#products?filter=featured' },
        { name: 'New Arrivals', href: '/#products?filter=new' },
        { name: 'Sale', href: '/#products?filter=sale' },
      ]
    },
    {
      title: 'About',
      links: [
        { name: 'Our Story', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Track Order', href: '/track-order' },
        { name: 'Returns & Refunds', href: '/returns' },
        { name: 'Contact Us', href: '/#contact' },
      ]
    }
  ]

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gray-800 text-white pt-16 pb-8"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">UrbanPick</h3>
            <p className="text-gray-400 mb-6">
              Your one-stop shop for all your needs. Quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-7 w-7" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-7 w-7" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-7 w-7" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-7 w-7" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} UrbanPick. All rights reserved.
          </p>
         
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer