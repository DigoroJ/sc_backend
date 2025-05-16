const {Router} = require('express');
const controller = require('../controllers/controller')
const router = Router();

router.get('/test', (req, res) => {
    res.send('User route working!');
  });

//smartCampus
//router.get('getTimetable/:id', controller.getTimetable);
router.get('/getNotifications', controller.viewNotifications);
router.post('/addNotifications', controller.addNotification);
router.get('/totalBookings', controller.totalBookings);
router.get('/totalIssues', controller.totalIssues);
router.get('/totalUsers', controller.totalUsers);
router.get('/totalNotifications', controller.totalNotifications);
router.post('/reportAnIssue', controller.reportAnIssue);
router.get ('/getIssues', controller.getIssues);
router.post('/login', controller.clientLogin);
router.post('/signUp', controller.addUser);
router.delete('/delete', controller.removeClient)
router.post('/book', controller.book);
router.get('/courses', controller.getCourses);
router.get('/subjects/:course_id', controller.subjectPerCourse);
router.post('/setTimetable', controller.setTimetable);
router.get('/studentTimetable/:id', controller.studentTimetable);
router.get('/lecturerTimetable/:id', controller.lecturerTimetable);
router.post('/addSubjects', controller.addSubjects);
router.post('/addSubjectsPerCourse', controller.addSubjectsPerCourse)
router.post('/addCourse', controller.addCourse);
router.get('/appointments/:user_id', controller.appointmentsByid);
module.exports = router;