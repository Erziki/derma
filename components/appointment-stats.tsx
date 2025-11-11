"use client"

import type React from "react"

import { CalendarDays, CheckCircle, Users, X } from "lucide-react"

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
  bgColor: string
}

function StatCard({ icon, label, value, bgColor }: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-white rounded-lg">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}

export default function AppointmentStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        icon={<CalendarDays className="text-blue-500" />}
        label="Total Appointments"
        value={stats.total}
        bgColor="bg-blue-50"
      />
      <StatCard
        icon={<CheckCircle className="text-green-500" />}
        label="Confirmed"
        value={stats.confirmed}
        bgColor="bg-green-50"
      />
      <StatCard
        icon={<Users className="text-purple-500" />}
        label="Completed"
        value={stats.completed}
        bgColor="bg-purple-50"
      />
      <StatCard icon={<X className="text-red-500" />} label="Cancelled" value={stats.cancelled} bgColor="bg-red-50" />
    </div>
  )
}
