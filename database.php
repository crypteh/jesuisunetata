<?php
$host = 'localhost';  // Server address
$dbname = 'farming_game';  // Your database name
$user = 'root';  // Default MySQL username for XAMPP
$pass = '';  // Default MySQL password for XAMPP is empty

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to the database successfully!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
