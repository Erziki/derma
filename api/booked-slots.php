<?php
require_once 'config.php';

$query = "SELECT appointmentDate, appointmentTime FROM appointments WHERE status != 'cancelled'";
$result = $conn->query($query);

$bookedSlots = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $key = $row['appointmentDate'] . '-' . $row['appointmentTime'];
        $bookedSlots[$key] = true;
    }
}

header('Content-Type: application/json');
echo json_encode($bookedSlots);

$conn->close();
?>