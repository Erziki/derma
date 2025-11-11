// Helper function to ensure appointments have proper numeric IDs
export const mapAppointmentFromDB = (apt: any) => {
  const id = Number(apt.id)
  
  if (!id || isNaN(id)) {
    console.error("[mapAppointmentFromDB] Invalid ID detected:", apt)
    throw new Error(`Invalid appointment ID: ${apt.id}`)
  }
  
  return {
    id: id, // Numeric ID
    patientName: apt.patientName || '',
    email: apt.email || '',
    phone: apt.phone || '',
    address: apt.address || '',
    date: apt.appointmentDate || apt.date || '',
    time: apt.appointmentTime || apt.time || '',
    reason: apt.reason || '',
    status: apt.status || "confirmed",
    createdAt: apt.createdAt || new Date().toISOString(),
  }
}

// Helper function to map array of appointments
export const mapAppointmentsFromDB = (appointments: any[]): any[] => {
  if (!Array.isArray(appointments)) {
    console.error("[mapAppointmentsFromDB] Expected array, got:", typeof appointments)
    return []
  }
  
  return appointments
    .map(apt => {
      try {
        return mapAppointmentFromDB(apt)
      } catch (error) {
        console.error("[mapAppointmentsFromDB] Skipping invalid appointment:", apt, error)
        return null
      }
    })
    .filter((apt): apt is NonNullable<typeof apt> => apt !== null)
}