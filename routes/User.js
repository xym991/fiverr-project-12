const express = require('express');
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../middleware/jwtSecret");
const multer = require("multer");



router.get('/register',(req,res)=>{
    res.sendFile(__dirname + '/pages/register.html');
})
router.post('/register',(req,res)=>{
   try{
    const {username , password} = req.body;
    User.find({username: username}, (err, user)=>{
        if(err)return res.send(res.send({error:"some error occured"}));
        console.log(user);
        if(user[0])return res.send({error:"user already exists"});
        bcrypt.hash(password,10, (err, hash)=>{
            if(err)res.send({error:"some error occured"});
            const newUser = new User({username, password:hash});
            newUser.save((err, newUser)=>{
                if(err)return res.send({error:"some error occured"});
                const token = createToken({username:newUser.username, admin:newUser.admin});
             
                return res.send({username:newUser.username, admin:newUser.admin, token: token});
            });
        });
    })
   }catch(err){
    console.log(err);
   }
   
})

router.get('/login', (req, res)=>{
    res.sendFile(__dirname+ "/pages/login.html")
})
router.post('/login', (req,res)=>{
   try{
    const {username , password} = req.body;
    User.find({username: username}, (err, user)=>{
        if(err)return res.send(res.send({error:"some error occured"}));
        console.log(user);
        if(!user[0])return res.send({error:"user does not exist"});
        bcrypt.compare(password, user[0].password, function(err, result) {
            if(err)return res.send({error:"some error occured"});
            if(!result)return res.send({error:"wrong password"});
            const token = createToken({username:user[0].username, admin:user[0].admin});
            
            return  res.send({username:user[0].username, admin:user[0].admin, token: token});
        });
    })
   }catch(err){
    console.log(err);
   }
})


function createToken(obj){
    return jwt.sign(obj, secret);
}

module.exports = router;


