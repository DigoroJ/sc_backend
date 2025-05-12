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
const reportAnIssue = "INSERT INTO issue (msg, location) VALUES ($1, $2)";
const getIssues = "SELECT * from issue";
const book  = "INSERT INTO bookings (user_id, service, time, date) values ($1, $2, $3, $4)";



module.exports ={

    getTimetable,
    getNotifications,
    addNotification,

    totalBookings,
    totalIssues,
    totalUsers,
    reportAnIssue,
    getIssues,
    
    checkClientEmailExists,
    getClients,
    getClientById,
    removeClient,
    getClientByEmail,
    getClientPasswordByEmail,
    addClient,
    book
    
};
