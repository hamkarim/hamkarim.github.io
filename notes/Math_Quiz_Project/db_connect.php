<?php
$host = 'localhost';
$dbname = 'math_quiz_db';
$username = 'root'; // ប្តូរតាម username database របស់លោកគ្រូ (ជាទូទៅ XAMPP គឺ root)
$password = '';     // ប្តូរតាម password database របស់លោកគ្រូ (ជាទូទៅ XAMPP គឺគ្មាន password ទេ)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    // កំណត់ error mode
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("បរាជ័យក្នុងការភ្ជាប់ទិន្នន័យ៖ " . $e->getMessage());
}
?>