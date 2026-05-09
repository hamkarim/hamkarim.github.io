<?php
require 'db_connect.php'; // ភ្ជាប់ទៅកាន់ Database

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $student_id = trim($_POST['student_id']);
    $student_name = trim($_POST['student_name']);
    
    // ១. បញ្ចូល ឬ ធ្វើបច្ចុប្បន្នភាពព័ត៌មាននិស្សិត
    $stmt = $pdo->prepare("INSERT INTO Students (student_id, student_name) VALUES (?, ?) ON DUPLICATE KEY UPDATE student_name = ?");
    $stmt->execute([$student_id, $student_name, $student_name]);

    // ២. ទាញយក Answer Key ពី Database
    $stmt = $pdo->query("SELECT question_id, correct_option FROM Questions");
    $answer_keys = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $answer_keys[$row['question_id']] = $row['correct_option'];
    }

    $score = 0;
    $total_questions = 5;

    // ៣. ពិនិត្យចម្លើយនីមួយៗ និងបញ្ចូលទៅក្នុងតារាង Student_Answers
    $insertAnswerStmt = $pdo->prepare("INSERT INTO Student_Answers (student_id, question_id, chosen_option, is_correct) VALUES (?, ?, ?, ?)");

    for ($i = 1; $i <= $total_questions; $i++) {
        if (isset($_POST['q'.$i])) {
            $chosen = $_POST['q'.$i];
            $correct = $answer_keys[$i];
            $is_correct = ($chosen === $correct) ? 1 : 0;
            
            if ($is_correct) {
                $score++;
            }

            // រក្សាទុកក្នុង Database
            $insertAnswerStmt->execute([$student_id, $i, $chosen, $is_correct]);
        }
    }

    // ៤. បង្ហាញលទ្ធផលទៅកាន់និស្សិត
    echo "<!DOCTYPE html><html lang='km'><head><meta charset='UTF-8'><title>លទ្ធផល</title>";
    echo "<style>
            body { font-family: 'Khmer OS Battambang', sans-serif; background-color: #f4f7f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .result-box { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; }
            h1 { color: #27ae60; }
            .score { font-size: 48px; font-weight: bold; color: #2980b9; margin: 20px 0; }
            a { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #34495e; color: white; text-decoration: none; border-radius: 5px; }
          </style></head><body>";
    echo "<div class='result-box'>";
    echo "<h2>ការបញ្ជូនជោគជ័យ!</h2>";
    echo "<p>និស្សិត៖ <strong>$student_name</strong> (ID: $student_id)</p>";
    echo "<div class='score'>$score / $total_questions</div>";
    echo "<p>ពិន្ទុរបស់អ្នកត្រូវបានកត់ត្រាចូលក្នុងប្រព័ន្ធរួចរាល់។</p>";
    echo "<a href='index.html'>ត្រឡប់ទៅទំព័រដើម</a>";
    echo "</div></body></html>";

} else {
    header("Location: index.html");
    exit();
}
?>