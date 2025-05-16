const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const userRouter = require('./Routes/route');

const app = express();
const PORT =  5000;
//const SECRET = 'smartcampus_secret';

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL pool setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smart_campus',
  password: '123456',
  port: 5432,
});

pool.query(`
  --Smart campus

-- Create the 'user' table
CREATE TABLE IF NOT EXISTS users (
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
CREATE TABLE IF NOT EXISTS "course" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create the 'timetable' table
CREATE TABLE IF NOT EXISTS timetable (
    id SERIAL PRIMARY KEY,
    day VARCHAR(9) CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')) NOT NULL,
    time TIME NOT NULL,
    lecturer_id INT,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (lecturer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the 'course_timetable' table
CREATE TABLE IF NOT EXISTS course_timetable (
    course_id INT,
    timetable_id INT,
    PRIMARY KEY (course_id, timetable_id),
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    FOREIGN KEY (timetable_id) REFERENCES timetable(id) ON DELETE CASCADE
);

-- Create the 'issue' table
CREATE TABLE IF NOT EXISTS issue (
    id SERIAL PRIMARY KEY,
    msg TEXT NOT NULL,
    location TEXT 
);

-- Create the 'notification' table
CREATE TABLE IF NOT EXISTS notification (
    id SERIAL PRIMARY KEY,
    msg TEXT NOT NULL
);

-- Bookings Table (by users)
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    service VARCHAR(255) NOT NULL,
    time VARCHAR(5) NOT NULL,
    date date NOT NULL
);

CREATE TABLE IF NOT EXISTS subject (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);


`);

//Sample route
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.use("/api/",userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
