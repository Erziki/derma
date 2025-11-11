"use client"

import { useState } from "react"
import { Calendar, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export default function ScheduleManager() {
  const [scheduleMode, setScheduleMode] = useState<"weekly" | "specific">("weekly")
  const [selectedDays, setSelectedDays] = useState<string[]>(DAYS_OF_WEEK)
  const [workingHours, setWorkingHours] = useState({ start: "9:00 AM", end: "5:00 PM" })
  const [specificDate, setSpecificDate] = useState("")
  const [specificSlots, setSpecificSlots] = useState<string[]>(TIME_SLOTS)
  const [saveMessage, setSaveMessage] = useState("")

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const toggleSlot = (slot: string) => {
    setSpecificSlots((prev) => (prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]))
  }

  const handleSaveSchedule = () => {
    const scheduleData = {
      mode: scheduleMode,
      weeklyDays: selectedDays,
      workingHours,
      specificDate,
      specificSlots,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem("doctorSchedule", JSON.stringify(scheduleData))
    window.dispatchEvent(new Event("storage"))
    setSaveMessage("Schedule saved successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  return (
    <Card className="mb-6 border-teal-200 bg-teal-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-teal-900">
          <Calendar size={20} />
          Doctor Availability Manager
        </CardTitle>
        <CardDescription>Set your weekly schedule or block specific dates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Schedule Mode Selection */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="weekly"
              checked={scheduleMode === "weekly"}
              onChange={(e) => setScheduleMode(e.target.value as "weekly")}
              className="w-4 h-4"
            />
            <span className="text-gray-700 font-medium">Weekly Schedule</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="specific"
              checked={scheduleMode === "specific"}
              onChange={(e) => setScheduleMode(e.target.value as "specific")}
              className="w-4 h-4"
            />
            <span className="text-gray-700 font-medium">Specific Date</span>
          </label>
        </div>

        {/* Weekly Schedule Section */}
        {scheduleMode === "weekly" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Available Days</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`p-3 rounded-lg border-2 transition font-medium text-sm ${
                      selectedDays.includes(day)
                        ? "border-teal-600 bg-teal-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-teal-400"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <select
                  value={workingHours.start}
                  onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <select
                  value={workingHours.end}
                  onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Specific Date Section */}
        {scheduleMode === "specific" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                value={specificDate}
                onChange={(e) => setSpecificDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Available Time Slots</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => toggleSlot(slot)}
                    className={`p-2 rounded-lg border-2 transition font-medium text-xs ${
                      specificSlots.includes(slot)
                        ? "border-teal-600 bg-teal-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-teal-400"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex items-center gap-3 pt-4 border-t border-teal-200">
          <Button
            onClick={handleSaveSchedule}
            className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
          >
            <Save size={18} />
            Save Schedule
          </Button>
          {saveMessage && <span className="text-teal-700 font-medium">{saveMessage}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
