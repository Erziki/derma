-- Create appointments table for creaostq_derma database
CREATE TABLE IF NOT EXISTS appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  patientName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(500),
  appointmentDate DATE NOT NULL,
  appointmentTime VARCHAR(20) NOT NULL,
  reason VARCHAR(500),
  status ENUM('confirmed', 'completed', 'cancelled') DEFAULT 'confirmed',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_date (appointmentDate),
  INDEX idx_status (status),
  UNIQUE KEY unique_slot (appointmentDate, appointmentTime)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;