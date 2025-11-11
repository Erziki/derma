"use client"

import { CheckCircle } from "lucide-react"

export default function StepIndicator({ step, currentStep, label }) {
  const isActive = currentStep === step
  const isCompleted = currentStep > step

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
          isCompleted ? "bg-green-500 text-white" : isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
        }`}
      >
        {isCompleted ? <CheckCircle size={20} /> : step}
      </div>
      <span className="text-xs mt-2 text-gray-600 hidden sm:block">{label}</span>
    </div>
  )
}
