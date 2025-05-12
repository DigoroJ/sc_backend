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
router.post('/reportAnIssue', controller.reportAnIssue);
router.get ('/getIssues', controller.getIssues);
router.post('/login', controller.clientLogin);
router.post('/signUp', controller.addUser);
router.delete('/delete', controller.removeClient)
router.post('/book', controller.book);

module.exports = router;