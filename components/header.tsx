"use client"

import { useState } from "react"
import { Menu, LogOut, Calendar } from "lucide-react"
import Link from "next/link"

export default function Header({ currentView, setCurrentView, isAdminLoggedIn, setIsAdminLoggedIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Calendar className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HealthCare Clinic</h1>
              <p className="text-xs text-gray-500">Appointment Management System</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-4">
            <Link
              href="/dermatologist"
              className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Dr. Sarah Mitchell
            </Link>
            <button
              onClick={() => {
                setCurrentView("patient")
                setMobileMenuOpen(false)
              }}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentView === "patient" ? "bg-blue-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => {
                setCurrentView("admin")
                setMobileMenuOpen(false)
              }}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentView === "admin" ? "bg-blue-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Admin Dashboard
            </button>
            {isAdminLoggedIn && currentView === "admin" && (
              <button
                onClick={() => setIsAdminLoggedIn(false)}
                className="px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in">
            <Link
              href="/dermatologist"
              className="block px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Dr. Sarah Mitchell
            </Link>
            <button
              onClick={() => {
                setCurrentView("patient")
                setMobileMenuOpen(false)
              }}
              className={`w-full px-4 py-2 rounded-lg font-medium transition ${
                currentView === "patient" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => {
                setCurrentView("admin")
                setMobileMenuOpen(false)
              }}
              className={`w-full px-4 py-2 rounded-lg font-medium transition ${
                currentView === "admin" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Admin Dashboard
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
