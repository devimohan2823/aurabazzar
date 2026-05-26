<?php
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Extract inputs sent by the booking form inputs
    $fullName = trim($_POST['name'] ?? '');
    $phone    = trim($_POST['mobile'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $city     = trim($_POST['location'] ?? '');

    if (empty($fullName) || empty($phone) || empty($email) || empty($city)) {
        echo "<script>alert('Please fill out all booking fields completely.'); window.history.back();</script>";
        exit();
    }

    try {
        // Construct SQL statement execution
        $sql = "INSERT INTO bookings (fullName, phone, email, city) VALUES (:fullName, :phone, :email, :city)";
        $stmt = $conn->prepare($sql);
        
        $stmt->execute([
            'fullName' => $fullName,
            'phone'    => $phone,
            'email'    => $email,
            'city'     => $city
        ]);

        echo "<script>alert('Booking submitted successfully to Aura Bazar!'); window.location.href='booking.html';</script>";
        exit();

    } catch(PDOException $e) {
        echo "Booking compilation failure: " . $e->getMessage();
    }
}
?>