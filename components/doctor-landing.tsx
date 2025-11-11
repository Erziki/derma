"use client"

import { useState } from "react"
import { Star, MapPin, Award, Users, Clock, CheckCircle, ArrowRight, Stethoscope } from "lucide-react"

export default function DoctorLanding({ addNotification }) {
  const [bookingStep, setBookingStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  })
  const [showBookingModal, setShowBookingModal] = useState(false)

  const doctor = {
    name: "Dr. Sarah Mitchell",
    specialty: "Board-Certified Dermatologist",
    experience: "12+ Years",
    patients: "5,000+",
    rating: 4.9,
    reviews: 248,
    bio: "Dr. Sarah Mitchell is a board-certified dermatologist with over 12 years of experience in treating various skin conditions. She specializes in cosmetic dermatology, acne treatment, and anti-aging procedures.",
    location: "123 Medical Plaza, Suite 400, Downtown Clinic",
    certifications: ["American Board of Dermatology", "Fellow of American Academy of Dermatology"],
  }

  const services = [
    {
      icon: "💆",
      name: "Skin Consultation",
      description: "Comprehensive skin analysis and personalized treatment plans",
      price: "$150",
    },
    {
      icon: "💉",
      name: "Botox & Fillers",
      description: "Professional anti-aging treatments and facial rejuvenation",
      price: "$300-800",
    },
    {
      icon: "🔬",
      name: "Acne Treatment",
      description: "Advanced acne management and scar treatment options",
      price: "$100-500",
    },
    {
      icon: "☀️",
      name: "Sun Damage Treatment",
      description: "Laser therapy and chemical peels for sun-damaged skin",
      price: "$200-600",
    },
    {
      icon: "✨",
      name: "Skin Brightening",
      description: "Treatments for hyperpigmentation and skin tone correction",
      price: "$150-400",
    },
    {
      icon: "🩹",
      name: "Dermatological Surgery",
      description: "Mole removal and other dermatological procedures",
      price: "$200-1,000",
    },
  ]

  const testimonials = [
    {
      name: "Emily Johnson",
      role: "Patient",
      text: "Dr. Mitchell is amazing! She completely transformed my skin. I couldn't be happier with the results.",
      rating: 5,
      image: "👩",
    },
    {
      name: "Michael Chen",
      role: "Patient",
      text: "Professional, knowledgeable, and caring. She explains everything clearly and has great bedside manner.",
      rating: 5,
      image: "👨",
    },
    {
      name: "Jessica Williams",
      role: "Patient",
      text: "Best dermatologist I've ever been to. She listens to your concerns and provides the best treatment options.",
      rating: 5,
      image: "👩‍🦱",
    },
  ]

  const availableSlots = {
    "2025-11-10": ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
    "2025-11-11": ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
    "2025-11-12": ["09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM"],
    "2025-11-13": ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"],
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()

    if (!patientInfo.name || !patientInfo.email || !patientInfo.phone || !selectedDate || !selectedTime) {
      addNotification("warning", "Please fill in all required fields")
      return
    }

    addNotification(
      "success",
      `Appointment booked with Dr. Sarah Mitchell on ${selectedDate} at ${selectedTime}! You will receive a confirmation email shortly.`,
    )

    setBookingStep(0)
    setSelectedDate("")
    setSelectedTime("")
    setPatientInfo({ name: "", email: "", phone: "", address: "", reason: "" })
    setShowBookingModal(false)
  }

  const getAvailableDates = () => {
    return Object.keys(availableSlots)
  }

  const getAvailableTimes = () => {
    return selectedDate ? availableSlots[selectedDate] || [] : []
  }

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
              Board-Certified Dermatologist
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">{doctor.name}</h1>
            <p className="text-xl text-blue-100 leading-relaxed">{doctor.bio}</p>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-300" size={20} />
                <span className="text-lg font-semibold">
                  {doctor.rating} ({doctor.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-blue-100" size={20} />
                <span className="text-lg font-semibold">{doctor.patients} Patients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="text-green-300" size={20} />
                <span className="text-lg font-semibold">{doctor.experience} Experience</span>
              </div>
            </div>

            <button
              onClick={() => setShowBookingModal(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition transform hover:scale-105 flex items-center space-x-2 w-fit"
            >
              <span>Book Appointment Now</span>
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="relative h-96 bg-white/10 rounded-2xl border-2 border-white/20 flex items-center justify-center">
            <div className="text-6xl">👨‍⚕️</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">About Dr. Mitchell</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl">
              <Stethoscope className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional Background</h3>
              <p className="text-gray-600">
                Graduated from Johns Hopkins University School of Medicine with distinction in dermatology. Completed
                residency at Stanford Medical Center.
              </p>
            </div>

            <div className="bg-indigo-50 p-8 rounded-xl">
              <Award className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Certifications</h3>
              <ul className="text-gray-600 space-y-2">
                {doctor.certifications.map((cert) => (
                  <li key={cert} className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 p-8 rounded-xl">
              <Users className="text-green-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Patient Care</h3>
              <p className="text-gray-600">
                Known for personalized treatment plans and compassionate patient care. Specializes in both medical and
                cosmetic dermatology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Services & Treatments</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-blue-600">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Patient Testimonials</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-blue-50 p-8 rounded-xl">
                <div className="flex items-center mb-4 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Visit Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <MapPin className="text-blue-600 mb-4" size={32} />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Clinic Location</h3>
              <p className="text-gray-600 mb-4 text-lg">{doctor.location}</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="text-blue-600" size={20} />
                  <div>
                    <p className="font-bold text-gray-900">Mon - Fri</p>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-blue-600" size={20} />
                  <div>
                    <p className="font-bold text-gray-900">Saturday</p>
                    <p className="text-gray-600">10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-100 rounded-xl h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-700 font-semibold">Clinic Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Skin?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Schedule a consultation with Dr. Sarah Mitchell today and start your journey to healthier, more radiant
            skin.
          </p>
          <button
            onClick={() => setShowBookingModal(true)}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition transform hover:scale-105"
          >
            Book Your Appointment
          </button>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-96 overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Book an Appointment</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              {bookingStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
                    <div className="grid grid-cols-2 gap-3">
                      {getAvailableDates().map((date) => (
                        <button
                          key={date}
                          onClick={() => {
                            setSelectedDate(date)
                            setBookingStep(1)
                          }}
                          className={`p-3 rounded-lg font-semibold transition ${
                            selectedDate === date
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {new Date(date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {bookingStep === 1 && (
                <div className="space-y-4">
                  <button
                    onClick={() => setBookingStep(0)}
                    className="text-blue-600 font-semibold mb-4 flex items-center space-x-1"
                  >
                    <span>← Back to Dates</span>
                  </button>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Time</label>
                    <div className="grid grid-cols-2 gap-3">
                      {getAvailableTimes().map((time) => (
                        <button
                          key={time}
                          onClick={() => {
                            setSelectedTime(time)
                            setBookingStep(2)
                          }}
                          className={`p-3 rounded-lg font-semibold transition ${
                            selectedTime === time
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {bookingStep === 2 && (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className="text-blue-600 font-semibold mb-4 flex items-center space-x-1"
                  >
                    <span>← Back to Times</span>
                  </button>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={patientInfo.name}
                      onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={patientInfo.email}
                      onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={patientInfo.phone}
                      onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="(555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Reason for Visit</label>
                    <input
                      type="text"
                      value={patientInfo.reason}
                      onChange={(e) => setPatientInfo({ ...patientInfo, reason: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="e.g., Skin consultation, Acne treatment"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    Confirm Appointment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
