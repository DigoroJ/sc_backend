const pool = require('../db');
const queries = require('../queries/queries')
const Pool = require('pg').Pool;
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs')

//Student
const viewNotifications = (req, res) => {
    pool.query(queries.getNotifications,(error, results) => {
        if(error){
            console.log("error:"+error);
            res.status(404).send(error);
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const reportAnIssue  = async (req,res) => {
   
    const {msg, location} = req.body
   
           pool.query(queries.reportAnIssue, 
               [msg, location],
               (error,results)=>{
               if(error){ 
                   res.status(500).json({error: 'invalid input'})
                   throw error;
               }else{
   
                   res.status(201).json("Request created successfully");
               }
           });
       
     
}

//Admin
const addNotification  = async (req,res) => {
   
    const {msg} = req.body
   
           pool.query(queries.addNotification, 
               [msg],
               (error,results)=>{
               if(error){ 
                   res.status(500).json({error: 'invalid input'})
                   throw error;
               }else{
   
                   res.status(201).json("Request created successfully");
               }
           });
       
   
   
}

const totalBookings = (req, res) => {
    pool.query(queries.totalBookings,(error, results) => {
        if(error){
            console.log("error:"+error);
            res.status(404).send(error);
            throw error;
        }
        res.status(200).json(results.rows[0]);
    });
};

const totalUsers = (req, res) => {
    pool.query(queries.totalUsers,(error, results) => {
        if(error){
            console.log("error:"+error);
            res.status(404).send(error);
            throw error;
        }
        res.status(200).json(results.rows[0]);
    });
};

const totalIssues = (req, res) => {
    pool.query(queries.totalIssues,(error, results) => {
        if(error){
            console.log("error:"+error);
            res.status(404).send(error);
            throw error;
        }
        res.status(200).json(results.rows[0]);
    });
};

const getIssues = (req, res) => {
    pool.query(queries.getIssues,(error, results) => {
        if(error){
            console.log("error:"+error);
            res.status(404).send(error);
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getCourses = (req, res) => {
    pool.query(queries.getCourses,(error, results) => {
        if(error){
            console.log("error:"+error);
            res.status(404).send(error);
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const totalNotifications = (req, res) => {
    pool.query(queries.totalNotifications,(error, results) => {
        if(error){
            console.log("error:"+error);
            res.status(404).send(error);
            throw error;
        }
        res.status(200).json(results.rows[0]);
    });
};

const addUser = async (req,res) => {
    // const {firstname, lastname, cell_no, password} = req.body;
     const {name, surname, email, password, role} = req.body
     if (name.length<3){
         res.status(400).json({error:"Name cannont be less than 2 characters"});
         return;
     } if (surname.length<3){
         res.status(400).json({error:"Surname cannont be less than 2 characters"});
         return;
     } if (password.length<8){
         res.status(400).json({error:"Your Password should be longer than 7 characters"});
         return;
     } if (email.length<1){
         res.status(400).json({error:'Please enter your email address'});
         return;
     } if (role.length<1){
         res.status(400).json({error:'Please enter your role'});
         return;
     }  else { 
 
         //check if email exists
         pool.query(queries.checkClientEmailExists, [email], (error, results) => {
             
             if (results.rows.length){
                 res.status(409).json({error:"Email already exists"});
                 
             }else{
                 const salt = bcrypt.genSaltSync(10)
                 const hashedPassword = bcrypt.hashSync(password , salt)
                 console.log(hashedPassword)
                 pool.query(queries.addClient, 
                     [name,surname, email, hashedPassword,role],
                     (error,results)=>{
                     if(error){ 
                         res.status(500).json({error: 'invalid input'})
                         throw error;
                     }else{
                         // addUserMailer(name, surname, cell_no, email, password);
                         res.status(201).json("User created successfully");
                     }
                 });
             }
         });
     
     }
 }
 
 
 const getClient = (req, res) => {
     pool.query(queries.getClients,(error, results) => {
         if(error){
             console.log("error:"+error);
             res.status(404).send(error);
             throw error;
         }
         res.status(200).json(results.rows);
     });
 };
 
 
 const removeClient = (req, res) =>{
     const id =parseInt(req.params.id);
 
     pool.query(queries.getClientById,[id],(error, results)=>{
         const noUserfound = !results.rows.length;
         if(noUserfound){
             res.status(404).json("User does not exist in the database.");
         }else{
             pool.query(queries.removeClient,[id],(error, results)=>{
                 if(error) throw error;
                 res.status(200).json("user removed successfully");
         });
         }
     });
 }
  
 
 const getClientByEmail=(req,res) =>{
     const email = req.params.email;
     console.log(email)
    
     pool.query(queries.getClientByEmail,[email],(error, results)=>{
         if(!results) return res.status(400).send("invalid input")
        
         if(!results.rows.length){ 
             res.status(404).send('user not found')
             console.log(results.rows);
             
             //throw error
         }else{
             res.status(200).json(results.rows);
         }
     } );
 };
 
 const clientLogin = async (req,res) =>{
     const { email, password } = req.body;
     pool.query(queries.getClientByEmail,[email],(error, results)=>{
         // console.log(results)
         
         if(!results.rows.length){ 
             console.log(email)
             res.status(404).json({error:'user not found'})
         }else{
             
                pool.query(queries.getClientPasswordByEmail,[email],(error, results)=>{
                    console.log(results.rows[0].password)
                    const queryPassword= bcrypt.compareSync(password, results.rows[0].password);
                    if(!queryPassword){
                        res.status(404).json({error:'Invalid credentials'});
                    }else{
                        res.status(200).json(results.rows[0]);
                    }
                });
             }
         }
     );
 }

 const book  = async (req,res) => {
   
    const {user_id, service, time, date} = req.body
   
           pool.query(queries.book, 
               [user_id, service, time, date],
               (error,results)=>{
               if(error){ 
                   res.status(500).json({error: 'invalid input'})
                   throw error;
               }else{ 
   
                   res.status(201).json("Request created successfully");
               }
           });
       
   
   
}

 const subjectPerCourse = (req, res) => {
    const course_id = req.params.course_id;
     pool.query(queries.subjectPerCourse,[course_id] ,(error, results) => {
         if(error){
             console.log("error:"+error);
             res.status(404).send(error);
             throw error;
         }
         res.status(200).json(results.rows); 
     });
 };

 const setTimetable = (req, res) => {
    const {day, time, lecturer_id, course_id, subject_id} = req.body
     pool.query(queries.setTimetable,[day, time, lecturer_id, course_id, subject_id] ,(error, results) => {
         if(error){
             console.log("error:"+error);
             res.status(404).send(error);
             throw error;
         }
         res.status(200).json(results.rows); 
     });
 };

 const lecturerTimetable = (req, res) => {
    const lecturer_id = req.params.id;
    console.log('id', lecturer_id);
    
     pool.query(queries.lecturerTimetable,[lecturer_id] ,(error, results) => {
         if(error){
             console.log("error:"+error);
             res.status(404).send(error);
             throw error;
         }
         res.status(200).json(results.rows); 
         console.log('time', results);
         
     });
 };

 const addSubjects = async (req, res) => {
    const { student_id, subjects } = req.body;

    try {
        // Use a loop to insert each subject
        for (const subject of subjects) {
            // Wait for the query to complete
            const results = await pool.query(queries.addSubjects, [student_id, subject]);
            // Optionally, you can log or process results here if needed
        }
        
        // Once all subjects are added, send a success response
        res.status(200).json({ message: 'Subjects added successfully' });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error); // Send a 500 status on error
    }
};

const studentTimetable = (req, res) => {
    const student_id = req.params.id;
    console.log('id', student_id);
    
     pool.query(queries.studentTimetable,[student_id] ,(error, results) => {
         if(error){
             console.log("error:"+error);
             res.status(404).send(error);
             throw error;
         }
         res.status(200).json(results.rows); 
         console.log('time', results);
         
     });
 };

 const addSubjectsPerCourse  = async (req,res) => {
   
    const {name, course_id} = req.body
   
           pool.query(queries. addSubjectsPerCourse, 
               [name, course_id],
               (error,results)=>{
               if(error){ 
                   res.status(500).json({error: 'invalid input'})
                   throw error;
               }else{
   
                   res.status(201).json("Subject added successfully");
               }
           });
       
   
   
}

const addCourse  = async (req,res) => {
   
    const {name} = req.body
   
           pool.query(queries. addCourse, 
               [name],
               (error,results)=>{
               if(error){ 
                   res.status(500).json({error: 'invalid input'})
                   throw error;
               }else{
   
                   res.status(201).json("Course added successfully");
               }
           });  
}

const appointmentsByid = (req, res) => {
    const user_id = req.params.user_id;
    console.log('user', user_id);
    
     pool.query(queries.appointmentsByid,[user_id] ,(error, results) => {
         if(error){
             console.log("error:"+error); 
             res.status(404).send(error);
             throw error;
         }
         res.status(200).json(results.rows); 
         console.log('response', results.rows);
         
     });
 };


module.exports = {

    //smartCampus
    viewNotifications,
    addNotification,
    totalIssues,
    totalBookings,
    totalUsers,

    totalNotifications,
    reportAnIssue,
    getIssues,
    addUser,
    getClient,
    removeClient,
    getClientByEmail,
    clientLogin,
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
}
