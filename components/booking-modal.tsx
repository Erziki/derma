"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Calendar, Clock, User, Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react"
import StepIndicator from "./step-indicator"
import { appointmentAPI } from "@/lib/api"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  onNotification: (type: "success" | "info" | "warning", message: string) => void
  appointments: any[]
  addAppointment: (appointment: any) => void
  availableSlots: { [key: string]: string[] }
}

interface FormData {
  patientName: string
  email: string
  phone: string
  address: string
  reason: string
}

export default function BookingModal({
  isOpen,
  onClose,
  onNotification,
  appointments,
  addAppointment,
  availableSlots,
}: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (isOpen) {
      const fetchBookedSlots = async () => {
        try {
          console.log("[v0] Modal opened - fetching booked slots")
          const slots = await appointmentAPI.getBookedSlots()
          console.log("[v0] Booked slots received in modal:", slots)
          setBookedSlots(slots)
        } catch (error) {
          console.error("[v0] Error fetching booked slots in modal:", error)
          setBookedSlots({})
        }
      }
      fetchBookedSlots()
    }
  }, [isOpen])

  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  })

  if (!isOpen) return null

  const availableDates = Object.keys(availableSlots)
    .filter((date) => {
      const dateObj = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return dateObj >= today
    })
    .sort()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-+()]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Full name is required"
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime("")
    setStep(2)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    try {
      const appointmentData = {
        ...formData,
        date: selectedDate,
        time: selectedTime,
      }

      await appointmentAPI.createAppointment(appointmentData)

      const slots = await appointmentAPI.getBookedSlots()
      setBookedSlots(slots)

      onNotification("success", "Appointment booked successfully!")
      setShowSuccess(true)
      setTimeout(() => {
        resetModal()
      }, 3000)
    } catch (error) {
      onNotification("warning", "Error booking appointment. Please try again.")
    }
  }

  const resetModal = () => {
    setShowSuccess(false)
    setStep(1)
    setSelectedDate("")
    setSelectedTime("")
    setFormData({
      patientName: "",
      email: "",
      phone: "",
      address: "",
      reason: "",
    })
    setErrors({})
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-6 flex justify-between items-center rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-white">Book Your Appointment</h2>
            <p className="text-teal-100 text-sm mt-1">3 easy steps to schedule your visit</p>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {showSuccess ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle className="text-green-500" size={56} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h3>
              <p className="text-gray-600 mb-4">Your appointment has been successfully booked.</p>
              <div className="bg-teal-50 p-4 rounded-xl mb-4">
                <p className="text-gray-700 mb-2">
                  <strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <strong>Time:</strong> {selectedTime}
                </p>
              </div>
              <p className="text-sm text-gray-500">A confirmation email has been sent to {formData.email}</p>
            </div>
          ) : (
            <>
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                <StepIndicator step={1} currentStep={step} label="Date" />
                <div className="flex-1 h-1 bg-gray-200 mx-2">
                  <div className={`h-full transition-all ${step >= 2 ? "bg-teal-500" : "bg-gray-200"}`} />
                </div>
                <StepIndicator step={2} currentStep={step} label="Time" />
                <div className="flex-1 h-1 bg-gray-200 mx-2">
                  <div className={`h-full transition-all ${step >= 3 ? "bg-teal-500" : "bg-gray-200"}`} />
                </div>
                <StepIndicator step={3} currentStep={step} label="Details" />
              </div>

              {/* Step 1: Date Selection */}
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="mr-2 text-teal-600" size={20} />
                    Select a Date
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableDates.map((date) => {
                      const dateObj = new Date(date)
                      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" })
                      const monthDay = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })

                      return (
                        <button
                          key={date}
                          onClick={() => handleDateSelect(date)}
                          className="p-4 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition text-center group"
                        >
                          <div className="text-xs text-gray-500 font-medium group-hover:text-teal-600">{dayName}</div>
                          <div className="text-base font-bold text-gray-900 group-hover:text-teal-600">{monthDay}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Time Selection */}
              {step === 2 && (
                <div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-teal-600 hover:text-teal-700 mb-4 flex items-center text-sm font-medium"
                  >
                    ← Back to dates
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="mr-2 text-teal-600" size={20} />
                    Select Time Slot
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm bg-blue-50 p-3 rounded-lg">
                    <span className="font-semibold">{new Date(selectedDate).toLocaleDateString()}</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableSlots[selectedDate]?.map((time) => {
                      const isBooked = bookedSlots[`${selectedDate}-${time}`]
                      return (
                        <button
                          key={time}
                          onClick={() => !isBooked && handleTimeSelect(time)}
                          disabled={isBooked}
                          className={`p-3 border-2 rounded-lg transition text-sm font-semibold ${
                            isBooked
                              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "border-gray-200 hover:border-teal-500 hover:bg-teal-50 text-gray-900"
                          }`}
                        >
                          <div>{time}</div>
                          {isBooked && <div className="text-xs mt-0.5 opacity-70">Booked</div>}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Patient Details */}
              {step === 3 && (
                <div>
                  <button
                    onClick={() => setStep(2)}
                    className="text-teal-600 hover:text-teal-700 mb-4 flex items-center text-sm font-medium"
                  >
                    ← Back to times
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm border-l-4 border-blue-600">
                    <p className="text-gray-700">
                      <strong>Selected:</strong> {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <User className="inline mr-2" size={14} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 bg-white border-2 rounded-lg text-sm focus:ring-0 focus:border-blue-500 transition ${
                          errors.patientName ? "border-red-500" : "border-blue-200"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.patientName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.patientName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Mail className="inline mr-2" size={14} />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 bg-white border-2 rounded-lg text-sm focus:ring-0 focus:border-blue-500 transition ${
                          errors.email ? "border-red-500" : "border-blue-200"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Phone className="inline mr-2" size={14} />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 bg-white border-2 rounded-lg text-sm focus:ring-0 focus:border-blue-500 transition ${
                          errors.phone ? "border-red-500" : "border-blue-200"
                        }`}
                        placeholder="555-0123"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <MapPin className="inline mr-2" size={14} />
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 bg-white border-2 rounded-lg text-sm focus:ring-0 focus:border-blue-500 transition ${
                          errors.address ? "border-red-500" : "border-blue-200"
                        }`}
                        placeholder="123 Main Street"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle size={12} className="mr-1" />
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                      <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-2 bg-white border-2 border-blue-200 rounded-lg text-sm focus:ring-0 focus:border-blue-500 transition"
                        placeholder="Brief description..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl"
                    >
                      Confirm Appointment
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
