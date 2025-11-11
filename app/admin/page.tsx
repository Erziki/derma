"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"
import NotificationCenter from "@/components/notification-center"
import { appointmentAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [appointments, setAppointments] = useState<any[]>([])
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true)
  const [notifications, setNotifications] = useState<
    Array<{
      id: string
      type: "success" | "info" | "warning"
      message: string
      timestamp: number
    }>
  >([])

  useEffect(() => {
    const fetchAppointmentsFromDB = async () => {
      try {
        setIsLoadingAppointments(true)
        const dbAppointments = await appointmentAPI.getAppointments()
        if (dbAppointments && Array.isArray(dbAppointments) && dbAppointments.length > 0) {
          console.log("[Admin] Database appointments loaded:", dbAppointments)
          const mappedAppointments = dbAppointments.map((apt: any) => ({
            id: apt.id,
            patientName: apt.patientName,
            email: apt.email,
            phone: apt.phone,
            address: apt.address,
            date: apt.appointmentDate,
            time: apt.appointmentTime,
            reason: apt.reason,
            status: apt.status || "confirmed",
            createdAt: apt.createdAt,
          }))
          setAppointments(mappedAppointments)
        } else {
          console.log("[Admin] No appointments in database")
          setAppointments([])
        }
      } catch (error) {
        console.error("[Admin] Error loading appointments:", error)
        setAppointments([])
      } finally {
        setIsLoadingAppointments(false)
      }
    }

    fetchAppointmentsFromDB()
  }, [])

  const addNotification = (type: "success" | "info" | "warning", message: string) => {
    const id = Date.now().toString()
    setNotifications((prev) => [...prev, { id, type, message, timestamp: Date.now() }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3000)
  }

  const updateAppointmentStatus = async (id: number, status: string) => {
    try {
      await appointmentAPI.updateAppointmentStatus(id, status)
      const dbAppointments = await appointmentAPI.getAppointments()
      if (dbAppointments && Array.isArray(dbAppointments)) {
        const mappedAppointments = dbAppointments.map((apt: any) => ({
          id: apt.id,
          patientName: apt.patientName,
          email: apt.email,
          phone: apt.phone,
          address: apt.address,
          date: apt.appointmentDate,
          time: apt.appointmentTime,
          reason: apt.reason,
          status: apt.status || "confirmed",
          createdAt: apt.createdAt,
        }))
        setAppointments(mappedAppointments)
      }
      const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)
      addNotification("info", `Appointment status updated to ${statusLabel}`)
    } catch (error) {
      console.error("[Admin] Error updating appointment:", error)
      addNotification("warning", "Error updating appointment")
    }
  }

  const deleteAppointment = async (id: number) => {
    try {
      await appointmentAPI.deleteAppointment(id)
      const dbAppointments = await appointmentAPI.getAppointments()
      if (dbAppointments && Array.isArray(dbAppointments)) {
        const mappedAppointments = dbAppointments.map((apt: any) => ({
          id: apt.id,
          patientName: apt.patientName,
          email: apt.email,
          phone: apt.phone,
          address: apt.address,
          date: apt.appointmentDate,
          time: apt.appointmentTime,
          reason: apt.reason,
          status: apt.status || "confirmed",
          createdAt: apt.createdAt,
        }))
        setAppointments(mappedAppointments)
      }
      addNotification("warning", "Appointment deleted")
    } catch (error) {
      console.error("[Admin] Error deleting appointment:", error)
      addNotification("warning", "Error deleting appointment")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <NotificationCenter notifications={notifications} />
      
      {/* Back to Home Button */}
      <Button
        onClick={() => router.push("/")}
        className="fixed top-4 left-4 z-40 bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
      >
        <Home size={18} />
        Back to Home
      </Button>

      <AdminDashboard
        appointments={appointments}
        updateAppointmentStatus={updateAppointmentStatus}
        deleteAppointment={deleteAppointment}
        isLoggedIn={isAdminLoggedIn}
        setIsLoggedIn={setIsAdminLoggedIn}
      />
    </div>
  )
}