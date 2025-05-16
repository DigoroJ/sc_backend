const addClient = "INSERT into users (name, surname, email, password, role) values($1, $2, $3, $4, $5)";
const checkClientEmailExists = "SELECT * FROM users WHERE email= $1";
const getClients = "SELECT * FROM users";
const removeClient= "DELETE FROM users WHERE id=$1";
const getClientById = "SELECT * FROM users WHERE id= $1"
const getClientByEmail = "SELECT * FROM users WHERE email= $1"
const getClientPasswordByEmail="SELECT * FROM users WHERE email=$1 ";


//smartCampus
const getTimetable = "SELECT s.student_id, s.name AS student_name, c.course_name, sub.subject_name, t.day, t.time_slot, t.location FROM  Student s JOIN  Course c ON s.student_id = c.course_id JOIN Course_Timetable ct ON c.course_id = ct.course_id JOIN Timetable t ON ct.timetable_id = t.timetable_id JOIN  Subject sub ON t.subject_id = sub.subject_id WHERE s.student_id = $1; ";
const getNotifications = "SELECT * FROM notification";
const addNotification = "INSERT INTO notification (msg) VALUES ($1)";
const totalBookings = "SELECT COUNT(*) FROM bookings";
const totalIssues = "SELECT COUNT(*) FROM issue";
const totalUsers = "SELECT COUNT(*) FROM users";
const totalNotifications = "SELECT COUNT(*) FROM notification";
const reportAnIssue = "INSERT INTO issue (msg, location) VALUES ($1, $2)";
const getIssues = "SELECT * from issue";
const book  = "INSERT INTO bookings (user_id, service, time, date) values ($1, $2, $3, $4)";
const getCourses = "SELECT * FROM course";
const subjectPerCourse = "select * from subject where course_id = $1";
const setTimetable = "INSERT INTO timetable (day, time, lecturer_id, course_id, subject_id) values ($1, $2, $3, $4, $5)";
const lecturerTimetable = "SELECT t.day AS day, t.time AS time, s.name AS subject FROM timetable t, subject s WHERE t.subject_id = s.id AND lecturer_id = $1";
const addSubjects = "INSERT INTO student_subject (student_id, subject_id) values ($1, $2)";
const studentTimetable = "SELECT t.day, s.name AS subject, t.time  FROM timetable t JOIN student_subject ss ON ss.subject_id = t.subject_id JOIN subject s ON ss.subject_id = s.id WHERE ss.student_id = $1";
const addSubjectsPerCourse = "INSERT INTO subject (name, course_id) values ($1, $2)";
const addCourse = "INSERT INTO course (name) values ($1)";
const appointmentsByid = "SELECT * FROM bookings WHERE user_id =$1";



module.exports ={

    getTimetable,
    getNotifications,
    addNotification,

    totalBookings,
    totalIssues,
    totalUsers,
    totalNotifications,
    reportAnIssue,
    getIssues,
    
    checkClientEmailExists,
    getClients,
    getClientById,
    removeClient,
    getClientByEmail,
    getClientPasswordByEmail,
    addClient,
    book,
    getCourses,
    subjectPerCourse,
    setTimetable,
    lecturerTimetable,
    addSubjects,
    studentTimetable,
    addSubjectsPerCourse,
    addCourse,
    appointmentsByid
}; 
