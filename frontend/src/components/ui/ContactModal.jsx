"use client"

import { useState, useEffect } from "react"
import Icon from "./Icon" // Pastikan path ke komponen Icon ini benar

const messageCategories = [
  { value: "job-opportunity", label: "Job Opportunity" },
  { value: "feedback", label: "Feedback & Suggestions" },
  { value: "other", label: "Other" },
]

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Handle modal animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Please select a message category"
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Something went wrong on the server. Please try again.")
      }

      setIsSubmitted(true)

      // Reset form dan tutup modal setelah 3 detik
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          category: "",
          subject: "",
          message: "",
        })
        onClose()
      }, 3000)
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: "",
        email: "",
        category: "",
        subject: "",
        message: "",
      })
      setErrors({})
      setIsSubmitted(false)
      onClose()
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-7xl max-h-[90vh] bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-3xl border border-amber-700/30 shadow-2xl overflow-hidden transition-all duration-500 ease-out transform ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        <div className="p-8 md:p-12">
          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute top-6 right-6 p-3 text-gray-400 hover:text-amber-400 transition-all duration-300 z-10 disabled:opacity-50 hover:bg-amber-900/20 rounded-2xl group"
          >
            <Icon name="X" size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Success State */}
          {isSubmitted ? (
            <div className="text-center py-20 animate-[fadeInUp_0.6s_ease-out]">
              <div className="w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounce_1s_ease-in-out_infinite]">
                <Icon name="Check" size={36} className="text-black animate-[checkmark_0.6s_ease-out_0.3s_both]" />
              </div>
              <h3 className="text-3xl font-bold text-amber-400 mb-6">Message Sent Successfully!</h3>
              <p id="success-message" className="text-gray-300 text-xl">
                Thank you for reaching out! I will get back to you soon.
              </p>
              <div className="mt-8">
                <div className="w-16 h-1 bg-gradient-gold mx-auto rounded-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
              {/* Left Side - Header & Info */}
              <div
                className={`flex flex-col justify-center space-y-8 lg:pr-8 transition-all duration-700 delay-100 ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <div>
                  <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    SEND ME <span className="text-gradient-gold">AN EMAIL</span>
                  </h2>
                  <p className="text-gray-400 text-xl mb-10">I'm very responsive to messages</p>
                </div>

                {/* Contact Info Cards */}
                <div className="space-y-6">
                  <div
                    className={`flex items-center p-6 bg-black/30 rounded-2xl border border-amber-700/20 hover:border-amber-700/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 ${
                      isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    <div className="w-14 h-14 bg-gradient-gold rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                      <Icon name="Mail" size={24} className="text-black" />
                    </div>
                    <div>
                      <p className="text-amber-400 font-semibold text-lg">Email</p>
                      <p className="text-gray-300 text-lg">azka.abdillah@outlook.co.id</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center p-6 bg-black/30 rounded-2xl border border-amber-700/20 hover:border-amber-700/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 ${
                      isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    <div className="w-14 h-14 bg-gradient-gold rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                      <Icon name="Clock" size={24} className="text-black" />
                    </div>
                    <div>
                      <p className="text-amber-400 font-semibold text-lg">Response Time</p>
                      <p className="text-gray-300 text-lg">Usually within 24 hours</p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center p-6 bg-black/30 rounded-2xl border border-amber-700/20 hover:border-amber-700/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 ${
                      isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    <div className="w-14 h-14 bg-gradient-gold rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                      <Icon name="MessageCircle" size={24} className="text-black" />
                    </div>
                    <div>
                      <p className="text-amber-400 font-semibold text-lg">Availability</p>
                      <p className="text-gray-300 text-lg">Open for opportunities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div
                className={`lg:pl-8 lg:border-l lg:border-amber-700/20 transition-all duration-700 delay-200 ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
              >
                <form className="space-y-6 h-full flex flex-col">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="name" className="block text-amber-400 font-semibold text-base">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 bg-black/50 border rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 text-base hover:bg-black/60 ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                        }`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm flex items-center animate-[slideIn_0.3s_ease-out]">
                          <Icon name="AlertCircle" size={16} className="mr-2" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="email" className="block text-amber-400 font-semibold text-base">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 bg-black/50 border rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 text-base hover:bg-black/60 ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm flex items-center animate-[slideIn_0.3s_ease-out]">
                          <Icon name="AlertCircle" size={16} className="mr-2" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Category and Subject Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="category" className="block text-amber-400 font-semibold text-base">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 bg-black/50 border rounded-2xl text-white focus:outline-none focus:ring-2 transition-all duration-300 text-base hover:bg-black/60 ${
                          errors.category
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                        }`}
                      >
                        <option value="" className="bg-gray-800">
                          Select category
                        </option>
                        {messageCategories.map((category) => (
                          <option key={category.value} value={category.value} className="bg-gray-800">
                            {category.label}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-400 text-sm flex items-center animate-[slideIn_0.3s_ease-out]">
                          <Icon name="AlertCircle" size={16} className="mr-2" />
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="subject" className="block text-amber-400 font-semibold text-base">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 bg-black/50 border rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 text-base hover:bg-black/60 ${
                          errors.subject
                            ? "border-red-500 focus:ring-red-500/50"
                            : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                        }`}
                        placeholder="Enter subject"
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-sm flex items-center animate-[slideIn_0.3s_ease-out]">
                          <Icon name="AlertCircle" size={16} className="mr-2" />
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-3 flex-1">
                    <label htmlFor="message" className="block text-amber-400 font-semibold text-base">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-4 bg-black/50 border rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none text-base h-full min-h-[120px] hover:bg-black/60 ${
                        errors.message
                          ? "border-red-500 focus:ring-red-500/50"
                          : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                      }`}
                      placeholder="Enter your message here..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm flex items-center animate-[slideIn_0.3s_ease-out]">
                        <Icon name="AlertCircle" size={16} className="mr-2" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 bg-gradient-gold text-black font-bold text-xl rounded-2xl hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-105 active:scale-95 relative overflow-hidden group"
                    >
                      {/* Loading overlay */}
                      {isSubmitting && (
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 animate-[shimmer_2s_infinite]"></div>
                      )}

                      <div className="relative z-10 flex items-center">
                        {isSubmitting ? (
                          <>
                            <div className="w-6 h-6 border-3 border-black/30 border-t-black rounded-full animate-spin mr-3"></div>
                            <span className="animate-pulse">Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Icon
                              name="Send"
                              size={20}
                              className="mr-3 group-hover:translate-x-1 transition-transform duration-300"
                            />
                            Send Message
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
