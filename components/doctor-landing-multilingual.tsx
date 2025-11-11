"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Star, Sparkles, Shield, Users, MapPin, Phone, ClockIcon } from "lucide-react"
import BookingModal from "./booking-modal"
import LanguageSelector from "./language-selector"
import { translations, type Language, getLanguageDir } from "@/lib/i18n"

interface DoctorLandingMultilingualProps {
  onNotification: (type: "success" | "info" | "warning", message: string) => void
  appointments: any[]
  addAppointment: (appointment: any) => void
  availableSlots: { [key: string]: string[] }
}

export default function DoctorLandingMultilingual({
  onNotification,
  appointments,
  addAppointment,
  availableSlots,
}: DoctorLandingMultilingualProps) {
  const [language, setLanguage] = useState<Language>("fr")
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const t = translations[language]
  const dir = getLanguageDir(language)

  useEffect(() => {
    localStorage.setItem("preferredLanguage", language)
    document.documentElement.dir = dir
  }, [language, dir])

  const services = [
    { name: t.services.acne, description: "Advanced treatments for all acne types" },
    { name: t.services.antiaging, description: "Botox, fillers, and skin rejuvenation" },
    { name: t.services.cancer, description: "Comprehensive skin analysis and prevention" },
    { name: t.services.eczema, description: "Specialized care for chronic conditions" },
    { name: t.services.hair, description: "Solutions for all hair loss concerns" },
    { name: t.services.laser, description: "Cutting-edge laser treatments" },
  ]

  const testimonials = [
    {
      name: "Amina Khalid",
      role: "Patient",
      text:
        language === "fr"
          ? "Dr. Bennani a complètement transformé ma peau. Un service exceptionnel!"
          : language === "ar"
            ? "قررت لي د. بنعني تحويل بشرتي بالكامل. خدمة استثنائية!"
            : "Dr. Bennani completely transformed my skin. Exceptional service!",
      rating: 5,
    },
    {
      name: "Hassan Rachid",
      role: "Patient",
      text:
        language === "fr"
          ? "Professionnelle, compétente et vraiment soucieuse de ses patients."
          : language === "ar"
            ? "محترفة وماهرة ومهتمة حقًا برفاهية مرضاها."
            : "Professional, knowledgeable, and genuinely cares about her patients.",
      rating: 5,
    },
    {
      name: "Layla Mourad",
      role: "Patient",
      text:
        language === "fr"
          ? "La meilleure dermatologue que j'ai jamais vue. Des résultats incroyables!"
          : language === "ar"
            ? "أفضل طبيبة جلدية رأيتها على الإطلاق. نتائج رائعة!"
            : "The best dermatologist I've ever seen. Incredible results!",
      rating: 5,
    },
  ]

  return (
    <div className={dir === "rtl" ? "rtl" : "ltr"}>
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onNotification={onNotification}
        appointments={appointments}
        addAppointment={addAppointment}
        availableSlots={availableSlots}
      />

      <main className="overflow-hidden">
        {/* Header with Language Selector */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
          <div className="px-4 py-4 md:py-6 max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-teal-600">Dr. Bennani</div>
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative px-4 pt-20 pb-24 md:pt-32 md:pb-40 bg-gradient-to-br from-teal-50 via-white to-blue-50">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-pretty">
                    {t.hero.title}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">{t.hero.subtitle}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => setShowBookingModal(true)}
                    size="lg"
                    className="bg-teal-600 hover:bg-teal-700 text-white h-12"
                  >
                    {t.hero.cta}
                  </Button>
                  <Button variant="outline" size="lg" className="h-12 bg-transparent">
                    {t.nav.about}
                  </Button>
                </div>

                <div className="flex gap-8 pt-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-teal-600">15+</span>
                    <span className="text-sm text-muted-foreground">{t.hero.years}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-teal-600">5000+</span>
                    <span className="text-sm text-muted-foreground">{t.hero.patients}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-teal-600">98%</span>
                    <span className="text-sm text-muted-foreground">{t.hero.rating}</span>
                  </div>
                </div>
              </div>

              <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-200 to-blue-200">
                <img
                  src="/professional-female-dermatologist-in-clinic.jpg"
                  alt="Dr. Fatima Bennani"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="px-4 py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.about.title}</h2>
              <p className="text-lg text-muted-foreground">{t.about.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-0 bg-teal-50">
                <CardHeader className="text-center">
                  <Shield className="w-10 h-10 text-teal-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">{t.about.certified}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="border-0 bg-blue-50">
                <CardHeader className="text-center">
                  <Sparkles className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">{t.about.technology}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="border-0 bg-indigo-50">
                <CardHeader className="text-center">
                  <Users className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">{t.about.care}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <div className="p-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
              <p className="text-lg text-foreground leading-relaxed">{t.about.description}</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="px-4 py-16 md:py-24 bg-gradient-to-br from-teal-50 via-white to-blue-50">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.services.title}</h2>
              <p className="text-lg text-muted-foreground">{t.services.subtitle}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.testimonials.title}</h2>
              <p className="text-lg text-muted-foreground">{t.testimonials.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="border-0 bg-gradient-to-br from-teal-50 to-blue-50">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.cta.title}</h2>
            <p className="text-lg text-teal-50 mb-8">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowBookingModal(true)}
                size="lg"
                className="bg-white text-teal-600 hover:bg-teal-50 h-12"
              >
                {t.cta.book}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 h-12 bg-transparent"
              >
                {t.cta.contact}
              </Button>
            </div>
          </div>
        </section>

        <footer className="bg-slate-900 text-white px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">{t.footer.address}</h3>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-5 h-5" />
                  <span>Tanger, Maroc</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">{t.footer.phone}</h3>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-5 h-5" />
                  <span>+212 539 94 22 98</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">{t.footer.hours}</h3>
                <div className="flex items-center gap-2 text-slate-300">
                  <ClockIcon className="w-5 h-5" />
                  <span>{t.footer.hours}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Quick Links</h3>
                <nav className="space-y-2">
                  <a href="#" className="text-slate-300 hover:text-white transition">
                    {t.nav.about}
                  </a>
                  <a href="#" className="text-slate-300 hover:text-white transition">
                    {t.nav.services}
                  </a>
                </nav>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400">© 2025 Dr. Fatima Bennani. {t.footer.rights}</p>
              <Button
                onClick={() => setShowAdminLogin(true)}
                variant="outline"
                className="border-teal-600 text-teal-400 hover:bg-teal-600/10"
              >
                {t.nav.admin}
              </Button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
