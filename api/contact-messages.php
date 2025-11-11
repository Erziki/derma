<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch all contact messages
    $query = "SELECT * FROM contact_messages ORDER BY createdAt DESC";
    $result = $conn->query($query);
    
    if (!$result) {
        http_response_code(500);
        die(json_encode(['error' => $conn->error]));
    }
    
    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    
    echo json_encode($messages);
    
} else if ($method === 'POST') {
    // Create new contact message
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = $conn->real_escape_string($data['name'] ?? '');
    $email = $conn->real_escape_string($data['email'] ?? '');
    $phone = $conn->real_escape_string($data['phone'] ?? '');
    $message = $conn->real_escape_string($data['message'] ?? '');
    $status = 'unread';
    
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
        exit();
    }
    
    $query = "INSERT INTO contact_messages (name, email, phone, message, status) 
              VALUES ('$name', '$email', '$phone', '$message', '$status')";
    
    if ($conn->query($query) === TRUE) {
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'id' => $conn->insert_id,
            'message' => 'Message sent successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
    }
    
} else if ($method === 'PUT') {
    // Update message status
    $data = json_decode(file_get_contents('php://input'), true);
    $id = intval($data['id'] ?? 0);
    $status = $conn->real_escape_string($data['status'] ?? '');
    
    if (empty($id) || empty($status)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request - missing id or status']);
        exit();
    }
    
    // Validate status value
    $validStatuses = ['unread', 'read', 'replied'];
    if (!in_array($status, $validStatuses)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid status value']);
        exit();
    }
    
    $query = "UPDATE contact_messages SET status = '$status' WHERE id = $id";
    
    if ($conn->query($query) === TRUE) {
        if ($conn->affected_rows > 0) {
            echo json_encode([
                'success' => true, 
                'message' => 'Message status updated successfully'
            ]);
        } else {
            $checkQuery = "SELECT id FROM contact_messages WHERE id = $id";
            $checkResult = $conn->query($checkQuery);
            if ($checkResult->num_rows === 0) {
                http_response_code(404);
                echo json_encode(['error' => 'Message not found']);
            } else {
                echo json_encode([
                    'success' => true,
                    'message' => 'Status unchanged'
                ]);
            }
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
    }
    
} else if ($method === 'DELETE') {
    // Delete message
    $data = json_decode(file_get_contents('php://input'), true);
    $id = intval($data['id'] ?? 0);
    
    if (empty($id)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request - missing id']);
        exit();
    }
    
    $query = "DELETE FROM contact_messages WHERE id = $id";
    
    if ($conn->query($query) === TRUE) {
        if ($conn->affected_rows > 0) {
            echo json_encode([
                'success' => true, 
                'message' => 'Message deleted successfully'
            ]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Message not found']);
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
    }
}

$conn->close();
?>