"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Star, Sparkles, Shield, Clock, Users } from "lucide-react"
import BookingModal from "./booking-modal"

interface DoctorLandingPageProps {
  onNotification: (type: "success" | "info" | "warning", message: string) => void
  appointments: any[]
  addAppointment: (appointment: any) => void
  availableSlots: { [key: string]: string[] }
}

export default function DoctorLandingPage({
  onNotification,
  appointments,
  addAppointment,
  availableSlots,
}: DoctorLandingPageProps) {
  const [showBookingModal, setShowBookingModal] = useState(false)

  const services = [
    { name: "Acne Treatment", description: "Advanced treatments for all acne types" },
    { name: "Anti-Aging", description: "Botox, fillers, and skin rejuvenation" },
    { name: "Skin Cancer Screening", description: "Comprehensive skin analysis and prevention" },
    { name: "Eczema & Psoriasis", description: "Specialized care for chronic conditions" },
    { name: "Hair Loss Treatment", description: "Solutions for all hair loss concerns" },
    { name: "Laser Therapy", description: "Cutting-edge laser treatments" },
  ]

  const testimonials = [
    {
      name: "Emily Rodriguez",
      role: "Patient",
      text: "Dr. Mitchell completely transformed my skin. Her acne treatment protocol is life-changing!",
      rating: 5,
    },
    {
      name: "James Chen",
      role: "Patient",
      text: "Professional, knowledgeable, and genuinely cares about her patients. Highly recommend.",
      rating: 5,
    },
    {
      name: "Maria Santos",
      role: "Patient",
      text: "The best dermatologist I've ever seen. Results are incredible and worth every penny.",
      rating: 5,
    },
  ]

  const handleBookingClick = () => {
    setShowBookingModal(true)
  }

  return (
    <>
      {/* BookingModal component */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onNotification={onNotification}
        appointments={appointments}
        addAppointment={addAppointment}
        availableSlots={availableSlots}
      />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-4 pt-16 pb-24 md:pt-32 md:pb-40">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-pretty">
                    Clear, Healthy, Beautiful Skin
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Experience premium dermatological care with Dr. Sarah Mitchell. Specializing in acne treatment,
                    anti-aging solutions, and comprehensive skin health.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleBookingClick}
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-700 text-white h-12"
                  >
                    Book Appointment
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 bg-transparent">
                    Learn More
                  </Button>
                </div>

                <div className="flex gap-8 pt-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-teal-600">15+</span>
                    <span className="text-sm text-muted-foreground">Years Experience</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-teal-600">5000+</span>
                    <span className="text-sm text-muted-foreground">Happy Patients</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-teal-600">98%</span>
                    <span className="text-sm text-muted-foreground">Satisfaction Rate</span>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-200 to-blue-200 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/professional-female-dermatologist-in-clinic.jpg"
                    alt="Dr. Sarah Mitchell"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Doctor Section */}
        <section className="px-4 py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Dr. Sarah Mitchell</h2>
              <p className="text-lg text-muted-foreground">
                Board-certified dermatologist committed to your skin health
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 bg-teal-50">
                <CardHeader className="text-center">
                  <Shield className="w-10 h-10 text-teal-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Board Certified</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Certified by the American Academy of Dermatology with continuous education
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-blue-50">
                <CardHeader className="text-center">
                  <Sparkles className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Advanced Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Uses cutting-edge equipment and latest treatment protocols
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-indigo-50">
                <CardHeader className="text-center">
                  <Users className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Patient-Focused</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Personalized treatment plans tailored to each patient's needs
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
              <p className="text-lg text-foreground leading-relaxed text-pretty">
                Dr. Sarah Mitchell is a board-certified dermatologist with over 15 years of experience in treating a
                wide range of skin conditions. She combines scientific expertise with a compassionate approach to
                deliver exceptional results for all her patients. Her mission is to help you achieve healthy, radiant
                skin through personalized care and advanced treatments.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="px-4 py-16 md:py-24 bg-gradient-to-br from-teal-50 via-white to-blue-50">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground">Comprehensive dermatological solutions</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <Card key={idx} className="border-0 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Patients Say</h2>
              <p className="text-lg text-muted-foreground">Trusted by thousands of satisfied patients</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="border-0 bg-gradient-to-br from-teal-50 to-blue-50">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 md:py-24 bg-gradient-to-r from-teal-600 to-blue-600">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for Your Best Skin?</h2>
            <p className="text-lg text-teal-50 mb-8">Schedule your consultation with Dr. Sarah Mitchell today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleBookingClick} size="lg" className="bg-white text-teal-600 hover:bg-teal-50 h-12">
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 h-12 bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>

        {/* Info Section with Icons */}
        <section className="px-4 py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <Clock className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Quick Appointments</h3>
                <p className="text-muted-foreground">Available same-week appointments for new patients</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Proven Results</h3>
                <p className="text-muted-foreground">98% patient satisfaction rate with visible improvements</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Latest Technology</h3>
                <p className="text-muted-foreground">Access to state-of-the-art dermatological equipment</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
