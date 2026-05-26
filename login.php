<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo "<script>alert('All fields are required!'); window.history.back();</script>";
        exit();
    }

    // PASTE YOUR EXACT GOOGLE WEB APP EXEC URL HERE
    $googleAppScriptURL = "https://script.google.com/macros/s/AKfycbzd08NaJYtcOVREk8GrAN6xMyNA2soRRILgp7NqEwafOodZBe8kJ4V6xTWroTebQkOe/exec";
    
    // Call the Google Sheets GET function we just wrote
    $url = $googleAppScriptURL . "?email=" . urlencode($email);
    
    $response = file_get_contents($url);
    $result = json_decode($response, true);

    if ($result && $result['status'] === 'found') {
        // Verify if the password matches what is saved in the row
        if ($password === $result['password']) {
            $_SESSION['user_email'] = $result['email'];
            $_SESSION['user_name'] = $result['firstName'];
            
            echo "<script>alert('Login successful!'); window.location.href='profile.php';</script>";
            exit();
        } else {
            echo "<script>alert('Invalid Password!'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('User not found in our records!'); window.history.back();</script>";
    }
}
?>