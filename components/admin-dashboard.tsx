"use client"

import { useState } from "react"
import { Search, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import AdminLogin from "./admin-login"
import AppointmentStats from "./appointment-stats"
import AppointmentTable from "./appointment-table"
import ScheduleManager from "./schedule-manager"
import ContactMessages from "./contact-messages"

interface Appointment {
  id: number
  patientName: string
  email: string
  phone: string
  address: string
  date: string
  time: string
  reason: string
  status: "confirmed" | "completed" | "cancelled"
  createdAt: string
}

interface DashboardStats {
  total: number
  confirmed: number
  completed: number
  cancelled: number
}

export default function AdminDashboard({
  appointments,
  updateAppointmentStatus,
  deleteAppointment,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [showScheduleManager, setShowScheduleManager] = useState(false)

  if (!isLoggedIn) {
    return <AdminLogin setIsLoggedIn={setIsLoggedIn} />
  }

  const filteredAppointments: Appointment[] = appointments
    .filter((apt: Appointment) => filterStatus === "all" || apt.status === filterStatus)
    .filter(
      (apt: Appointment) =>
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.phone.includes(searchTerm),
    )
    .sort((a: Appointment, b: Appointment) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "name") {
        return a.patientName.localeCompare(b.patientName)
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const stats: DashboardStats = {
    total: appointments.length,
    confirmed: appointments.filter((a: Appointment) => a.status === "confirmed").length,
    completed: appointments.filter((a: Appointment) => a.status === "completed").length,
    cancelled: appointments.filter((a: Appointment) => a.status === "cancelled").length,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Manage and track all patient appointments</p>
      </div>

      <AppointmentStats stats={stats} />

      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => setShowScheduleManager(!showScheduleManager)}
          className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
        >
          <Calendar size={18} />
          {showScheduleManager ? "Hide Schedule Manager" : "Manage Schedule"}
        </Button>
      </div>

      {showScheduleManager && <ScheduleManager />}

      {/* Contact Messages Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <ContactMessages />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="created">Sort by Created</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredAppointments.length} of {appointments.length} appointments
          </div>
        </div>

        <AppointmentTable
          filteredAppointments={filteredAppointments}
          updateAppointmentStatus={updateAppointmentStatus}
          deleteAppointment={deleteAppointment}
        />
      </div>
    </div>
  )
}
