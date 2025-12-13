"use client"

import { useState, useEffect, useReducer, useMemo } from "react"
import Icon from "./Icon"

// Reducer for form state management
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value }
    case "RESET_FORM":
      return initialFormState
    default:
      return state
  }
}

// Initial state for the form
const initialFormState = {
  name: "",
  email: "",
  category: "",
  subject: "",
  message: "",
}

export default function ContactModal({ isOpen, onClose, buttonRect }) {
  const [formData, dispatch] = useReducer(formReducer, initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [modalContentStyle, setModalContentStyle] = useState({})

  const messageCategories = useMemo(
    () => [
      { value: "job-opportunity", label: "Job Opportunity" },
      { value: "feedback", label: "Feedback & Suggestions" },
      { value: "other", label: "Other" },
    ],
    [],
  )

  // --- LOGIKA ANIMASI & POSISI (TIDAK DIUBAH AGAR EFEK TETAP JALAN) ---
  useEffect(() => {
    if (!buttonRect) {
      setModalContentStyle({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "scale(1)" : "scale(0.95)",
        transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
      })
      if (isOpen) setIsVisible(true)
      else setTimeout(() => setIsVisible(false), 300)
      return
    }

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const assumedModalWidth = Math.min(1280, viewportWidth - 48) // Margin adjusted
    const assumedModalHeight = viewportHeight * 0.85

    const buttonCenterX = buttonRect.left + buttonRect.width / 2
    const buttonCenterY = buttonRect.top + buttonRect.height / 2
    const modalTargetCenterX = viewportWidth / 2
    const modalTargetCenterY = viewportHeight / 2
    const translateX = buttonCenterX - modalTargetCenterX
    const translateY = buttonCenterY - modalTargetCenterY
    const scaleX = buttonRect.width / assumedModalWidth
    const scaleY = buttonRect.height / assumedModalHeight

    if (isOpen) {
      setIsVisible(true)
      setModalContentStyle({
        opacity: 0,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
        transition: "none",
      })
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setModalContentStyle({
            opacity: 1,
            transform: `translate(0px, 0px) scale(1)`,
            transition: `transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.4s ease-out`,
          })
        })
      })
    } else {
      setModalContentStyle({
        opacity: 0,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
        transition: `transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.4s ease-out`,
      })
      setTimeout(() => setIsVisible(false), 600)
    }
  }, [isOpen, buttonRect])
  // -------------------------------------------------------------------

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters"

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address"

    if (!formData.category) newErrors.category = "Please select a message category"

    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    else if (formData.subject.trim().length < 5) newErrors.subject = "Subject must be at least 5 characters"

    if (!formData.message.trim()) newErrors.message = "Message is required"
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    dispatch({ type: "UPDATE_FIELD", field: name, value })
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Mock API Call - replace with actual endpoint if needed
      // const response = await fetch("/api/send-email", { ... }) 
      
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        dispatch({ type: "RESET_FORM" })
        onClose()
      }, 3000)
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      dispatch({ type: "RESET_FORM" })
      setErrors({})
      setIsSubmitted(false)
      onClose()
    }
  }

  if (!isVisible) return null

  // Helper class for consistent inputs
  // REFACTOR: py-4 -> py-3, rounded-2xl -> rounded-xl, text-base -> text-sm
  const inputClassName = (error) => `
    w-full px-4 py-3 bg-black/40 border rounded-xl text-white placeholder-gray-500 
    focus:outline-none focus:ring-2 transition-all duration-300 text-sm hover:bg-black/50
    ${error ? "border-red-500 focus:ring-red-500/50" : "border-gray-700 focus:border-amber-500 focus:ring-amber-500/50"}
  `

  const labelClassName = "block text-amber-400 font-semibold text-sm mb-1.5"

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
      <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={handleClose} />

      {/* REFACTOR: max-h-[90vh] -> max-h-[85vh] agar tidak terlalu mepet */}
      <div
        className={`relative w-full max-w-6xl max-h-[85vh] bg-gradient-to-br from-[#1a1a1a] via-[#242424] to-[#1a1a1a] rounded-3xl border border-amber-700/30 shadow-2xl overflow-hidden flex flex-col`}
        style={modalContentStyle}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 md:p-10">
            {/* REFACTOR: Close Button rounded-2xl -> rounded-full */}
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="absolute top-5 right-5 p-2 bg-black/20 hover:bg-amber-900/40 text-gray-400 hover:text-amber-400 transition-all duration-300 z-10 disabled:opacity-50 rounded-full group border border-transparent hover:border-amber-500/30"
            >
              <Icon name="X" size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-20 animate-[fadeInUp_0.6s_ease-out] flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mb-6 animate-[bounce_1s_ease-in-out_infinite]">
                  <Icon name="Check" size={32} className="text-black animate-[checkmark_0.6s_ease-out_0.3s_both]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-amber-400 mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-300 text-lg max-w-md mx-auto">Thank you for reaching out! I will get back to you soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 h-full">
                {/* Left Side - Info */}
                <div className={`lg:col-span-5 flex flex-col justify-center space-y-8 transition-all duration-700 delay-100 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                  <div>
                    {/* REFACTOR: Font size text-6xl -> text-4xl */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white">
                      SEND ME <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">AN EMAIL</span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg">I'm very responsive to messages and always open to new opportunities.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Contact Cards - Compact Version */}
                    {[
                      { icon: "Mail", title: "Email", value: "azka.abdillah@outlook.co.id" },
                      { icon: "Clock", title: "Response Time", value: "Usually within 24 hours" },
                      { icon: "MessageCircle", title: "Availability", value: "Open for opportunities" }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center p-4 bg-black/20 rounded-xl border border-white/5 hover:border-amber-700/30 transition-all duration-300 hover:transform hover:translate-x-1 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                        style={{ transitionDelay: `${200 + idx * 100}ms` }}
                      >
                        <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center mr-4 shadow-lg shrink-0">
                          <Icon name={item.icon} size={20} className="text-black" />
                        </div>
                        <div>
                          <p className="text-amber-400 font-semibold text-sm">{item.title}</p>
                          <p className="text-gray-300 text-sm md:text-base">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className={`lg:col-span-7 lg:pl-8 lg:border-l lg:border-white/5 transition-all duration-700 delay-200 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
                  <form className="space-y-5 h-full flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={labelClassName}>Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={inputClassName(errors.name)}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1 flex items-center"><Icon name="AlertCircle" size={12} className="mr-1" />{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClassName}>Your Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={inputClassName(errors.email)}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1 flex items-center"><Icon name="AlertCircle" size={12} className="mr-1" />{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="category" className={labelClassName}>Category *</label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className={inputClassName(errors.category)}
                        >
                          <option value="" className="bg-gray-800 text-gray-400">Select category</option>
                          {messageCategories.map((category) => (
                            <option key={category.value} value={category.value} className="bg-gray-800 text-white">{category.label}</option>
                          ))}
                        </select>
                        {errors.category && <p className="text-red-400 text-xs mt-1 flex items-center"><Icon name="AlertCircle" size={12} className="mr-1" />{errors.category}</p>}
                      </div>
                      <div>
                        <label htmlFor="subject" className={labelClassName}>Subject *</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={inputClassName(errors.subject)}
                          placeholder="Project Inquiry"
                        />
                        {errors.subject && <p className="text-red-400 text-xs mt-1 flex items-center"><Icon name="AlertCircle" size={12} className="mr-1" />{errors.subject}</p>}
                      </div>
                    </div>

                    <div className="flex-1 min-h-[100px]">
                      <label htmlFor="message" className={labelClassName}>Your Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`${inputClassName(errors.message)} resize-none h-32`}
                        placeholder="Tell me about your project..."
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1 flex items-center"><Icon name="AlertCircle" size={12} className="mr-1" />{errors.message}</p>}
                    </div>

                    {/* REFACTOR: Submit Button rounded-2xl -> rounded-full */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-8 bg-gradient-gold text-black font-bold text-lg rounded-full hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-[1.02] active:scale-95 relative overflow-hidden group"
                      >
                        {isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 animate-[shimmer_2s_infinite]"></div>}
                        <div className="relative z-10 flex items-center">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3"></div>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Icon name="Send" size={18} className="mr-2 group-hover:translate-x-1 transition-transform duration-300" />
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
    </div>
  )
}