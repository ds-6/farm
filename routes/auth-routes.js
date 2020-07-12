const router = require('express').Router();
const passport = require('passport');

const authCheck =(req,res,next)=>{
    if(req.user){
        res.redirect('/profile');
    }
    else {
        next();
    }
}

router.get('/login',authCheck,(req, res)=>{
    res.render('login');
})
router.get('/logout',(req, res)=>{
    res.send('logout page is here...')
})
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req, res)=>{
    //console.log(req.user.username);
    res.redirect('/profile/');
})

module.exports = router;