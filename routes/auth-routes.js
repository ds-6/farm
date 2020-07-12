const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');
require('dotenv').config();



const authCheck =(req,res,next)=>{
    if(req.user){
        res.redirect('/profile');
    }
    else {
        next();
    }
}

const authAdmin =(req,res,next)=>{
    if(req.user.googleID==process.env.GOOGLE_ADMIN_ID){
        next();
    }
    else {
        res.redirect('/profile');
    }
}

router.get('/login',authCheck,(req, res)=>{
    res.render('login');
})

router.get('/admin',authAdmin,(req, res)=>{    
    User.find().sort({updatedAt:-1})
    .then(result=>{
        res.render('admin',{users:result});
    })
    .catch(err=>console.log(err))
})

router.get('/logout',(req, res)=>{
    req.logOut();
    res.redirect('/');
})
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req, res)=>{
    //console.log(req.user.username);
    res.redirect('/profile/');
})

module.exports = router;