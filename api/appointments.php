<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $query = "SELECT * FROM appointments ORDER BY appointmentDate DESC, appointmentTime DESC";
    $result = $conn->query($query);
    
    if (!$result) {
        http_response_code(500);
        die(json_encode(['error' => $conn->error]));
    }
    
    $appointments = [];
    while ($row = $result->fetch_assoc()) {
        $appointments[] = $row;
    }
    
    echo json_encode($appointments);
    
} else if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $patientName = $conn->real_escape_string($data['patientName'] ?? '');
    $email = $conn->real_escape_string($data['email'] ?? '');
    $phone = $conn->real_escape_string($data['phone'] ?? '');
    $address = $conn->real_escape_string($data['address'] ?? '');
    $appointmentDate = $conn->real_escape_string($data['date'] ?? '');
    $appointmentTime = $conn->real_escape_string($data['time'] ?? '');
    $reason = $conn->real_escape_string($data['reason'] ?? '');
    $status = 'confirmed';
    $createdAt = date('Y-m-d H:i:s');
    
    $query = "INSERT INTO appointments (patientName, email, phone, address, appointmentDate, appointmentTime, reason, status, createdAt) 
              VALUES ('$patientName', '$email', '$phone', '$address', '$appointmentDate', '$appointmentTime', '$reason', '$status', '$createdAt')";
    
    if ($conn->query($query) === TRUE) {
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'id' => $conn->insert_id,
            'message' => 'Appointment booked successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
    }
    
} else if ($method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = intval($data['id'] ?? 0);
    $status = $conn->real_escape_string($data['status'] ?? '');
    
    // Log the request for debugging
    error_log("PUT request - ID: $id, Status: $status");
    
    if (empty($id) || empty($status)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request - missing id or status']);
        exit();
    }
    
    // Validate status value
    $validStatuses = ['confirmed', 'completed', 'cancelled'];
    if (!in_array($status, $validStatuses)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid status value']);
        exit();
    }
    
    $query = "UPDATE appointments SET status = '$status' WHERE id = $id";
    
    if ($conn->query($query) === TRUE) {
        if ($conn->affected_rows > 0) {
            echo json_encode([
                'success' => true, 
                'message' => 'Appointment updated successfully',
                'affected_rows' => $conn->affected_rows
            ]);
        } else {
            // Check if appointment exists
            $checkQuery = "SELECT id FROM appointments WHERE id = $id";
            $checkResult = $conn->query($checkQuery);
            if ($checkResult->num_rows === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Appointment not found']);
            } else {
                echo json_encode([
                    'success' => true,
                    'message' => 'Status unchanged (already set to this value)'
                ]);
            }
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
    }
    
} else if ($method === 'DELETE') {
    // Get the raw input
    $rawInput = file_get_contents('php://input');
    error_log("DELETE request - Raw input: $rawInput");
    
    $data = json_decode($rawInput, true);
    
    // Check if JSON decode was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        error_log("JSON decode error: " . json_last_error_msg());
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON: ' . json_last_error_msg()]);
        exit();
    }
    
    $id = intval($data['id'] ?? 0);
    
    // Log the request for debugging
    error_log("DELETE request - Parsed ID: $id");
    
    if (empty($id) || $id <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request - missing or invalid id', 'received_id' => $id]);
        exit();
    }
    
    // First check if the appointment exists
    $checkQuery = "SELECT id FROM appointments WHERE id = $id";
    $checkResult = $conn->query($checkQuery);
    
    if (!$checkResult) {
        error_log("Database error on check query: " . $conn->error);
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $conn->error]);
        exit();
    }
    
    if ($checkResult->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Appointment not found', 'id' => $id]);
        exit();
    }
    
    // Proceed with deletion
    $query = "DELETE FROM appointments WHERE id = $id";
    
    if ($conn->query($query) === TRUE) {
        if ($conn->affected_rows > 0) {
            echo json_encode([
                'success' => true, 
                'message' => 'Appointment deleted successfully',
                'affected_rows' => $conn->affected_rows,
                'id' => $id
            ]);
        } else {
            // This shouldn't happen since we checked existence above
            http_response_code(500);
            echo json_encode(['error' => 'Delete query executed but no rows affected']);
        }
    } else {
        error_log("Database error on delete query: " . $conn->error);
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $conn->error]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();
?>