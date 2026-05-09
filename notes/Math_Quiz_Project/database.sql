-- បង្កើត Database
CREATE DATABASE IF NOT EXISTS math_quiz_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE math_quiz_db;

-- តារាងព័ត៌មាននិស្សិត
CREATE TABLE IF NOT EXISTS Students (
    student_id VARCHAR(50) PRIMARY KEY,
    student_name VARCHAR(150) NOT NULL
);

-- តារាងសំណួរ និងចម្លើយត្រឹមត្រូវ (Answer Key)
CREATE TABLE IF NOT EXISTS Questions (
    question_id INT PRIMARY KEY,
    correct_option CHAR(1) NOT NULL
);

-- បញ្ចូល Answer Key សម្រាប់ ៥ សំណួរដំបូង
INSERT INTO Questions (question_id, correct_option) VALUES 
(1, 'C'), (2, 'B'), (3, 'B'), (4, 'A'), (5, 'B')
ON DUPLICATE KEY UPDATE correct_option=VALUES(correct_option);

-- តារាងកត់ត្រាចម្លើយរបស់និស្សិត
CREATE TABLE IF NOT EXISTS Student_Answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50),
    question_id INT,
    chosen_option CHAR(1),
    is_correct BOOLEAN,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (question_id) REFERENCES Questions(question_id)
);