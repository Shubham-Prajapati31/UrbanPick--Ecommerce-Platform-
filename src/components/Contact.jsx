'use client'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target)
      formData.append(
        'access_key',
        '0d9dd6d5-4016-440f-89ad-cc076a2e806b'
      )

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Message sent successfully!')
        formRef.current.reset()
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactItems = [
    {
      icon: <MapPin className="h-6 w-6 text-indigo-600" />,
      title: 'Address',
      content: 'Mumbai West Maharashtra 400050',
    },
    {
      icon: <Phone className="h-6 w-6 text-indigo-600" />,
      title: 'Phone',
      content: '+91 999999990',
    },
    {
      icon: <Mail className="h-6 w-6 text-indigo-600" />,
      title: 'Email',
      content: 'support@urbanpick.com',
    },
    {
      icon: <Clock className="h-6 w-6 text-indigo-600" />,
      title: 'Working Hours',
      content: 'Mon-Fri: 9AM - 6PM\nSat-Sun: 10AM - 4PM',
    },
  ]

  const socialMedia = [
    { name: 'Facebook', icon: <FaFacebookF />, url: '#' },
    { name: 'Twitter', icon: <FaTwitter />, url: '#' },
    { name: 'Instagram', icon: <FaInstagram />, url: '#' },
  ]

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800">Get In Touch</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-indigo-700 mb-6">
              Send Us a Message
            </h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="subject" value="New Contact Message" />
              <input type="hidden" name="from_name" value="UrbanPick Website" />

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl transition ${
                  isSubmitting ? 'opacity-70' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactItems.map((item, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-md flex gap-4"
              >
                <div className="p-3 bg-indigo-100 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-white/60 p-6 rounded-xl shadow-md">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialMedia.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    className="w-10 h-10 bg-indigo-700 hover:bg-indigo-500 rounded-full flex items-center justify-center text-white"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
