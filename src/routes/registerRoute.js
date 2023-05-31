const express=require('express');
const User = require('../models/user');

const registerRouter=express.Router();

registerRouter.get('/',(req,res)=>{
    res.render("register",{
        message: ''
    });
})

registerRouter.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const email=req.body.email;
        const alreadyUser=await User.findOne({email: email});
        if (alreadyUser) {
            res.render('register',{
                message: 'Already registered'
            });
            return;
        }
        const password = req.body.password;
        const confPassword = req.body.confPassword;
        if (password === confPassword) {
            console.log("password matched");
            const newUser = new User(req.body);
            
            // first generate token and save in database
            // const token=await newUser.generateToken();

            const result = await newUser.save();
            console.log("added successfully");
            
            res.redirect(302,`http://localhost:${process.env.port}/login`);
            // res.status( 201).render('login');
            // res.send(result);
        }
        else {
            console.log("password not matched");
            res.status(500).render('register',{
                message: 'Password not matched'
            });
        }
    } catch (e) {
        console.log('error in mongodb');
        console.log(e);
        res.status(500).render('register',{
            message: 'Wrong Details'
        });
    }
});

module.exports=registerRouter;