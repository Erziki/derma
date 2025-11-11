"use client"

import { Trash2, CheckCircle2, AlertCircle } from "lucide-react"

export default function AppointmentTable({ filteredAppointments, updateAppointmentStatus, deleteAppointment }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gray-50">
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Patient</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Contact</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Date & Time</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Reason</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-12 text-gray-500">
                <AlertCircle className="mx-auto mb-2 text-gray-400" size={32} />
                <p>No appointments found</p>
              </td>
            </tr>
          ) : (
            filteredAppointments.map((apt, index) => {
              console.log("[AppointmentTable] Rendering appointment:", { id: apt.id, index, aptData: apt })
              return (
                <tr key={apt.id || `appointment-${index}-${apt.date}-${apt.time}`} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{apt.patientName}</div>
                  <div className="text-sm text-gray-500">{apt.address}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-900">{apt.email}</div>
                  <div className="text-sm text-gray-500">{apt.phone}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{apt.date}</div>
                  <div className="text-sm text-gray-500">{apt.time}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-700">{apt.reason || "N/A"}</div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      apt.status === "confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : apt.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2 flex-wrap">
                    {apt.status === "confirmed" && (
                      <button
                        onClick={() => {
                          console.log("[AppointmentTable] Complete button clicked, ID:", apt.id)
                          updateAppointmentStatus(apt.id, "completed")
                        }}
                        className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 flex items-center gap-1 transition"
                      >
                        <CheckCircle2 size={14} />
                        Complete
                      </button>
                    )}
                    {apt.status !== "cancelled" && (
                      <button
                        onClick={() => {
                          console.log("[AppointmentTable] Cancel button clicked, ID:", apt.id)
                          updateAppointmentStatus(apt.id, "cancelled")
                        }}
                        className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => {
                        console.log("[AppointmentTable] Delete button clicked, ID:", apt.id, "Type:", typeof apt.id)
                        if (confirm("Are you sure you want to delete this appointment?")) {
                          console.log("[AppointmentTable] Delete confirmed for ID:", apt.id)
                          deleteAppointment(apt.id)
                        }
                      }}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 flex items-center gap-1 transition"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )})
          )}
        </tbody>
      </table>
    </div>
  )
}