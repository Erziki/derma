const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://derma.createvia.org/api"

console.log("[v0] API Base URL:", API_BASE)

export const appointmentAPI = {
  // Fetch all appointments from database
  getAppointments: async () => {
    try {
      console.log("[v0] Fetching appointments from:", `${API_BASE}/appointments.php`)
      const response = await fetch(`${API_BASE}/appointments.php`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) {
        console.log("[v0] Response status:", response.status)
        throw new Error(`Failed to fetch appointments: ${response.status}`)
      }
      const data = await response.json()
      console.log("[v0] Appointments fetched:", data)
      return data
    } catch (error) {
      console.error("[v0] Error fetching appointments:", error)
      return []
    }
  },

  // Book new appointment
  createAppointment: async (appointmentData: any) => {
    try {
      console.log("[v0] Creating appointment:", appointmentData)
      const response = await fetch(`${API_BASE}/appointments.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      })
      if (!response.ok) {
        console.log("[v0] Create response status:", response.status)
        const errorText = await response.text()
        console.log("[v0] Error response:", errorText)
        throw new Error(`Failed to book appointment: ${response.status}`)
      }
      const data = await response.json()
      console.log("[v0] Appointment created:", data)
      return data
    } catch (error) {
      console.error("[v0] Error booking appointment:", error)
      throw error
    }
  },

  // Update appointment status
  updateAppointmentStatus: async (id: number, status: string) => {
    try {
      console.log("[v0] Updating appointment status:", { id, status, idType: typeof id })
      
      // Validate inputs
      if (!id || isNaN(Number(id))) {
        throw new Error(`Invalid appointment ID for update: ${id}`)
      }
      
      const response = await fetch(`${API_BASE}/appointments.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: Number(id), status }),
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] Update error response:", errorText)
        throw new Error(`Failed to update appointment: ${response.status} - ${errorText}`)
      }
      
      const data = await response.json()
      console.log("[v0] Appointment updated:", data)
      return data
    } catch (error) {
      console.error("[v0] Error updating appointment:", error)
      throw error
    }
  },

  // Delete appointment
  deleteAppointment: async (id: number) => {
    try {
      console.log("[v0] Deleting appointment:", id, "Type:", typeof id)
      
      // Ensure id is a valid number
      if (!id || isNaN(Number(id))) {
        throw new Error(`Invalid appointment ID: ${id}`)
      }
      
      const response = await fetch(`${API_BASE}/appointments.php`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ id: Number(id) }),
      })
      
      console.log("[v0] Delete response status:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] Delete error response:", errorText)
        throw new Error(`Failed to delete appointment: ${response.status} - ${errorText}`)
      }
      
      const data = await response.json()
      console.log("[v0] Appointment deleted:", data)
      return data
    } catch (error) {
      console.error("[v0] Error deleting appointment:", error)
      throw error
    }
  },

  // Get booked slots to prevent double booking
  getBookedSlots: async () => {
    try {
      console.log("[v0] Fetching booked slots from:", `${API_BASE}/booked-slots.php`)
      const response = await fetch(`${API_BASE}/booked-slots.php`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) {
        console.log("[v0] Booked slots response status:", response.status)
        throw new Error(`Failed to fetch booked slots: ${response.status}`)
      }
      const data = await response.json()
      console.log("[v0] Booked slots:", data)
      return data
    } catch (error) {
      console.error("[v0] Error fetching booked slots:", error)
      return {}
    }
  },
}

export const contactAPI = {
  // Fetch all contact messages
  getMessages: async () => {
    try {
      console.log("[v0] Fetching contact messages from:", `${API_BASE}/contact-messages.php`)
      const response = await fetch(`${API_BASE}/contact-messages.php`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) {
        console.log("[v0] Response status:", response.status)
        throw new Error(`Failed to fetch messages: ${response.status}`)
      }
      const data = await response.json()
      console.log("[v0] Messages fetched:", data)
      return data
    } catch (error) {
      console.error("[v0] Error fetching messages:", error)
      return []
    }
  },

  // Send new contact message
  createMessage: async (messageData: any) => {
    try {
      console.log("[v0] Creating contact message:", messageData)
      const response = await fetch(`${API_BASE}/contact-messages.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      })
      if (!response.ok) {
        console.log("[v0] Create response status:", response.status)
        throw new Error(`Failed to send message: ${response.status}`)
      }
      const data = await response.json()
      console.log("[v0] Message created:", data)
      return data
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      throw error
    }
  },

  // Update message status
  updateMessageStatus: async (id: number, status: string) => {
    try {
      const response = await fetch(`${API_BASE}/contact-messages.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (!response.ok) throw new Error("Failed to update message")
      return await response.json()
    } catch (error) {
      console.error("[v0] Error updating message:", error)
      throw error
    }
  },

  // Delete message
  deleteMessage: async (id: number) => {
    try {
      const response = await fetch(`${API_BASE}/contact-messages.php`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!response.ok) throw new Error("Failed to delete message")
      return await response.json()
    } catch (error) {
      console.error("[v0] Error deleting message:", error)
      throw error
    }
  },
}