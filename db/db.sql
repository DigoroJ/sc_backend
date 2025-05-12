-- Create the 'user' table
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('student', 'teacher', 'admin')) NOT NULL,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE SET NULL
);

-- Create the 'course' table
CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create the 'timetable' table
CREATE TABLE timetable (
    id SERIAL PRIMARY KEY,
    day VARCHAR(9) CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')) NOT NULL,
    time TIME NOT NULL,
    subject_id INT,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

-- Create the 'course_timetable' table
CREATE TABLE course_timetable (
    course_id INT,
    timetable_id INT,
    PRIMARY KEY (course_id, timetable_id),
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (timetable_id) REFERENCES timetable(id) ON DELETE CASCADE
);


--querying a timetime
SELECT 
    s.student_id,
    s.name AS student_name,
    c.course_name,
    sub.subject_name,
    t.day,
    t.time_slot,
    t.location
FROM 
    Student s
JOIN 
    Course c ON s.student_id = c.course_id  -- Assuming there's an enrollment relationship
JOIN 
    Course_Timetable ct ON c.course_id = ct.course_id
JOIN 
    Timetable t ON ct.timetable_id = t.timetable_id
JOIN 
    Subject sub ON t.subject_id = sub.subject_id
WHERE 
    s.student_id = ?;  -- Replace ? with the specific student's ID

--new
-- Users Table (replaces 'students')
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'student', 'admin', etc.
    course_id INTEGER REFERENCES courses(id) ON DELETE SET NULL
);

-- Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Subjects Table
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE
);

-- Timetable Table
CREATE TABLE timetables (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    room VARCHAR(50),
    day_of_week VARCHAR(20),
    start_time TIME,
    end_time TIME
);

-- Bookings Table (by users)
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    service VARCHAR(255) NOT NULL,
    time TIMESTAMP NOT NULL
);
