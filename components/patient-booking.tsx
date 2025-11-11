"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, User, Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react"
import StepIndicator from "./step-indicator"

interface FormData {
  patientName: string
  email: string
  phone: string
  address: string
  reason: string
}

export default function PatientBooking({ appointments, addAppointment, availableSlots }) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  })

  const bookedSlots = appointments.reduce((acc, apt) => {
    const key = `${apt.date}-${apt.time}`
    acc[key] = true
    return acc
  }, {})

  const availableDates = Object.keys(availableSlots).filter((date) => {
    const dateObj = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return dateObj >= today
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-+$$$$]+$/
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    addAppointment({
      ...formData,
      date: selectedDate,
      time: selectedTime,
    })
    setShowSuccess(true)
    setTimeout(() => {
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
    }, 3000)
  }

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-500" size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
          <p className="text-gray-600 mb-2">Your appointment has been successfully booked.</p>
          <p className="text-gray-600 mb-6">
            <strong>Date:</strong> {selectedDate} at <strong>{selectedTime}</strong>
          </p>
          <p className="text-sm text-gray-500">A confirmation email has been sent to {formData.email}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
          <h2 className="text-3xl font-bold text-white mb-2">Book Your Appointment</h2>
          <p className="text-blue-100">Quick and easy - no sign-up required</p>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <StepIndicator step={1} currentStep={step} label="Select Date" />
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className={`h-full transition-all ${step >= 2 ? "bg-blue-500" : "bg-gray-200"}`} />
            </div>
            <StepIndicator step={2} currentStep={step} label="Select Time" />
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className={`h-full transition-all ${step >= 3 ? "bg-blue-500" : "bg-gray-200"}`} />
            </div>
            <StepIndicator step={3} currentStep={step} label="Your Details" />
          </div>

          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="mr-2 text-blue-500" />
                Select a Date
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableDates.map((date) => {
                  const dateObj = new Date(date)
                  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" })
                  const monthDay = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })

                  return (
                    <button
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-center"
                    >
                      <div className="text-sm text-gray-500 font-medium">{dayName}</div>
                      <div className="text-lg font-bold text-gray-900">{monthDay}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="text-blue-500 hover:text-blue-600 mb-4 flex items-center">
                ← Back to dates
              </button>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="mr-2 text-blue-500" />
                Select a Time Slot
              </h3>
              <p className="text-gray-600 mb-4">
                Selected date: <span className="font-semibold">{selectedDate}</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableSlots[selectedDate]?.map((time) => {
                  const isBooked = bookedSlots[`${selectedDate}-${time}`]
                  return (
                    <button
                      key={time}
                      onClick={() => !isBooked && handleTimeSelect(time)}
                      disabled={isBooked}
                      className={`p-4 border-2 rounded-xl transition ${
                        isBooked
                          ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900"
                      }`}
                    >
                      <div className="font-semibold">{time}</div>
                      {isBooked && <div className="text-xs mt-1">Booked</div>}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <button onClick={() => setStep(2)} className="text-blue-500 hover:text-blue-600 mb-4 flex items-center">
                ← Back to time slots
              </button>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Information</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Selected:</strong> {selectedDate} at {selectedTime}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline mr-2" size={16} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.patientName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.patientName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.patientName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline mr-2" size={16} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline mr-2" size={16} />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="555-0123"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline mr-2" size={16} />
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your symptoms or reason for visit..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition shadow-lg"
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
