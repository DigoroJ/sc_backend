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
         res.status(400).json('Your Password should be longer than 7 characters');
         return;
     } if (role.length<1){
         res.status(400).json('Please enter your role');
         return;
     } else { 
 
         //check if email exists
         pool.query(queries.checkClientEmailExists, [email], (error, results) => {
             
             if (results.rows.length){
                 res.status(409).json("Email already exists");
                 
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


module.exports = {

    //smartCampus
    viewNotifications,
    addNotification,
    totalIssues,
    totalBookings,
    totalUsers,
    reportAnIssue,
    getIssues,
    addUser,
    getClient,
    removeClient,
    getClientByEmail,
    clientLogin,
    book

    
}
