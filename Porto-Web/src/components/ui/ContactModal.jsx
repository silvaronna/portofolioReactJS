"use client"

import { useState } from "react"
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

  // --- PERUBAHAN UTAMA ADA DI SINI ---
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // 1. Mengirim data ke server backend kita, bukan lagi membuat mailto link
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Kirim semua data dari form dalam format JSON
        body: JSON.stringify(formData),
      });

      // 2. Cek apakah server merespons dengan sukses (status code 2xx)
      if (!response.ok) {
        // Jika server memberikan error, kita lempar error agar ditangkap oleh blok catch
        throw new Error('Something went wrong on the server. Please try again.');
      }

      // 3. Jika berhasil, tampilkan pesan sukses di UI
      setIsSubmitted(true)
      
      // Ubah pesan sukses agar lebih sesuai
      // (Pesan lama: "Your email client will open shortly...")
      const successMessageElement = document.querySelector("#success-message");
      if (successMessageElement) {
          successMessageElement.textContent = "Thank you for reaching out! I will get back to you soon.";
      }


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
      // Tangkap error (baik dari jaringan atau dari server) dan tampilkan ke pengguna
      console.error("Error sending message:", error)
      alert("Failed to send message. Please check your connection and try again.")
    } finally {
      // Apapun hasilnya, hentikan status submitting
      setIsSubmitting(false)
    }
  }
  // --- AKHIR DARI PERUBAHAN ---

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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-2xl border border-amber-700/30 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-amber-400 transition-colors z-10 disabled:opacity-50"
        >
          <Icon name="X" size={24} />
        </button>

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              SEND ME <span className="text-gradient-gold">AN EMAIL</span>
            </h2>
            <p className="text-gray-400 text-lg">I'm very responsive to messages</p>
          </div>

          {/* Success State */}
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Check" size={32} className="text-black" />
              </div>
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Message Sent!</h3>
              <p id="success-message" className="text-gray-300 text-lg">Thank you for reaching out! I will get back to you soon.</p>
            </div>
          ) : (
            /* Form */
            <form className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-amber-400 font-medium">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-amber-400 font-medium">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Category Field */}
              <div className="space-y-2">
                <label htmlFor="category" className="block text-amber-400 font-medium">
                  Message Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-black/50 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.category
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                  }`}
                >
                  <option value="" className="bg-gray-800">
                    Select a category
                  </option>
                  {messageCategories.map((category) => (
                    <option key={category.value} value={category.value} className="bg-gray-800">
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-1" />
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-amber-400 font-medium">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.subject
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                  }`}
                  placeholder="Enter message subject"
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-1" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-amber-400 font-medium">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`w-full px-4 py-4 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"
                  }`}
                  placeholder="Enter your message here..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm flex items-center">
                    <Icon name="AlertCircle" size={16} className="mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-gradient-gold text-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={20} className="mr-3" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
