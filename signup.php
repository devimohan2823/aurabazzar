<?php
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form text inputs safely
    $firstName    = trim($_POST['firstName'] ?? '');
    $lastName     = trim($_POST['lastName'] ?? '');
    $email        = trim($_POST['email'] ?? '');
    $mobileNumber = trim($_POST['mobileNumber'] ?? '');
    $gender       = $_POST['gender'] ?? '';
    $dob          = $_POST['dob'] ?? '';
    $password     = $_POST['password'] ?? '';

    // Securely hash the password before saving (Never store raw text passwords!)
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    try {
        // Prepare SQL insert statement
        $sql = "INSERT INTO users (firstName, lastName, email, mobileNumber, gender, dob, password) 
                VALUES (:firstName, :lastName, :email, :mobileNumber, :gender, :dob, :password)";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            'firstName'    => $firstName,
            'lastName'     => $lastName,
            'email'        => $email,
            'mobileNumber' => $mobileNumber,
            'gender'       => $gender,
            'dob'          => $dob,
            'password'     => $hashedPassword
        ]);

        echo "<script>alert('Account created successfully! Welcome to Aura Bazar.'); window.location.href='login.html';</script>";
        exit();

    } catch(PDOException $e) {
        if ($e->getCode() == 23000) { // Check for Duplicate entry code
            echo "<script>alert('Error: This email address is already registered!'); window.history.back();</script>";
        } else {
            echo "Registration error occurred: " . $e->getMessage();
        }
    }
}
?>