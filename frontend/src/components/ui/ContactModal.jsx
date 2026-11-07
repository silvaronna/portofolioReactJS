"use client"

import { useState, useEffect, useReducer, useMemo } from "react"
import Icon from "./Icon"

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
    []
  )

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
    const assumedModalWidth = Math.min(1280, viewportWidth - 48)
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

  const inputClassName = (error) => `
    w-full px-3.5 py-2.5 bg-[#0B0B0C] border rounded-xl text-white placeholder-white/35 
    focus:outline-none focus:ring-2 transition-all duration-300 text-sm hover:border-white/25
    ${
      error
        ? "border-red-400 focus:ring-red-400/50"
        : "border-white/10 focus:border-[#C6F432] focus:ring-[#C6F432]/25"
    }
  `

  const labelClassName = "block text-white/85 font-semibold text-xs uppercase tracking-wider mb-1.5"

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/85 backdrop-blur-md transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        className="relative w-full max-w-5xl max-h-[85vh] bg-[#121215] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col"
        style={modalContentStyle}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 md:p-10">
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-[#C6F432] text-white hover:text-[#0B0B0C] transition-all duration-300 z-10 disabled:opacity-50 rounded-full group border border-white/10"
            >
              <Icon name="X" size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-20 animate-[fadeInUp_0.6s_ease-out] flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 bg-[#C6F432] rounded-full flex items-center justify-center mb-6 animate-[bounce_1s_ease-in-out_infinite] shadow-[0_0_30px_rgba(198,244,50,0.35)]">
                  <Icon name="Check" size={32} className="text-[#0B0B0C] animate-[checkmark_0.6s_ease-out_0.3s_both]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Message Sent Successfully!
                </h3>
                <p className="text-white/65 text-base max-w-md mx-auto">
                  Thank you for reaching out! I will get back to you soon.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 h-full">
                {/* Left Side - Info */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center space-y-6 transition-all duration-700 delay-100 ${
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                >
                  <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight text-white">
                      SEND ME <br />
                      <span className="text-[#C6F432]">AN EMAIL</span>
                    </h2>
                    <p className="text-white/60 text-sm">
                      I&apos;m very responsive to messages and always open to new infrastructure opportunities.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      { icon: "Mail", title: "Email", value: "azka.abdillah@outlook.co.id" },
                      { icon: "Clock", title: "Response Time", value: "Usually within 24 hours" },
                      { icon: "MessageCircle", title: "Availability", value: "Open for opportunities" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center p-3.5 bg-[#0B0B0C] rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:translate-x-1 ${
                          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: `${200 + idx * 100}ms` }}
                      >
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mr-3.5 shadow-sm shrink-0">
                          <Icon name={item.icon} size={18} className="text-[#C6F432]" />
                        </div>
                        <div>
                          <p className="text-white/50 font-semibold text-xs uppercase tracking-wider">
                            {item.title}
                          </p>
                          <p className="text-white text-sm font-medium">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Form */}
                <div
                  className={`lg:col-span-7 lg:pl-8 lg:border-l lg:border-white/10 transition-all duration-700 delay-200 ${
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                >
                  <form className="space-y-4 h-full flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className={labelClassName}>
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={inputClassName(errors.name)}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1 flex items-center">
                            <Icon name="AlertCircle" size={12} className="mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClassName}>
                          Your Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={inputClassName(errors.email)}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1 flex items-center">
                            <Icon name="AlertCircle" size={12} className="mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="category" className={labelClassName}>
                          Category *
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className={inputClassName(errors.category)}
                        >
                          <option value="" className="bg-[#121215] text-white/50">
                            Select category
                          </option>
                          {messageCategories.map((category) => (
                            <option
                              key={category.value}
                              value={category.value}
                              className="bg-[#121215] text-white"
                            >
                              {category.label}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="text-red-400 text-xs mt-1 flex items-center">
                            <Icon name="AlertCircle" size={12} className="mr-1" />
                            {errors.category}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="subject" className={labelClassName}>
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={inputClassName(errors.subject)}
                          placeholder="Project Inquiry"
                        />
                        {errors.subject && (
                          <p className="text-red-400 text-xs mt-1 flex items-center">
                            <Icon name="AlertCircle" size={12} className="mr-1" />
                            {errors.subject}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-h-[100px]">
                      <label htmlFor="message" className={labelClassName}>
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`${inputClassName(errors.message)} resize-none h-28`}
                        placeholder="Tell me about your project..."
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1 flex items-center">
                          <Icon name="AlertCircle" size={12} className="mr-1" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 bg-[#C6F432] hover:bg-[#b5e222] text-[#0B0B0C] font-bold text-sm rounded-full shadow-[0_8px_25px_-6px_rgba(198,244,50,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-[1.01] active:scale-95 relative overflow-hidden group"
                      >
                        <div className="relative z-10 flex items-center">
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-[#0B0B0C]/30 border-t-[#0B0B0C] rounded-full animate-spin mr-2.5" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Icon
                                name="Send"
                                size={16}
                                className="mr-2 group-hover:translate-x-1 transition-transform duration-300"
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
    </div>
  )
}
