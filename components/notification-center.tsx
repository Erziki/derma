"use client"

import { CheckCircle, Info, AlertTriangle, X } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "info" | "warning"
  message: string
  timestamp: number
}

export default function NotificationCenter({ notifications }: { notifications: Notification[] }) {
  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-l-4 border-green-500 text-green-800"
      case "info":
        return "bg-blue-50 border-l-4 border-blue-500 text-blue-800"
      case "warning":
        return "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800"
      default:
        return "bg-gray-50 border-l-4 border-gray-500 text-gray-800"
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} className="text-green-500" />
      case "info":
        return <Info size={20} className="text-blue-500" />
      case "warning":
        return <AlertTriangle size={20} className="text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center gap-3 p-4 rounded-lg shadow-lg max-w-xs animate-in fade-in slide-in-from-right-5 ${getNotificationStyles(notification.type)}`}
        >
          {getIcon(notification.type)}
          <p className="text-sm font-medium flex-1">{notification.message}</p>
          <button className="text-opacity-50 hover:text-opacity-100 transition">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
