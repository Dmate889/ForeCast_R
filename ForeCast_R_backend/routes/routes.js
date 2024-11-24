const express = require('express');
const db = require('../database/db'); 

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to ForeCast_R!');
});

router.post('/login', (req,res) =>{
    const {username, password} = req.body;
    db.getUser(username,password, (err,result) =>{
        if(err) {
            console.error(`An error has occurred when ${username} tried to login`);
            return res.status(500).json({error: 'Internal server error'});
        }
        if(result.success){
            res.status(200).json({message: 'Login successful', token: result.token})
        }
        else res.status(401).json({message: 'UNAUTHORIZED'});
    });
});

router.post('/register', (req,res) =>{
    const {username, email, password} = req.body;
    db.registerUser(username,email,password, (err,result) =>{
        if(err){
            console.error('Unable to register user');
            res.status(500).json({error: 'Internal server error'});
        } 
        else res.status(200).json({message: result.message});
    });
});

module.exports = router;

