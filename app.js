const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
require('dotenv').config();


const app = express();
app.listen(process.env.PORT||3000);

const dbURI = 'mongodb://'+process.env.MONGO_KEY+'@project-1-shard-00-00-ea9wt.mongodb.net:27017,project-1-shard-00-01-ea9wt.mongodb.net:27017,project-1-shard-00-02-ea9wt.mongodb.net:27017/project1?ssl=true&replicaSet=project-1-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    console.log('Database is connected...');
});


app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[process.env.COOKIE_KEY]
}));

 app.use(passport.initialize());
 app.use(passport.session());

 app.use('/auth',authRoutes);
 app.use('/profile',profileRoutes);

 app.get('/', (req,res)=>{
   res.redirect('/profile/')
 })
 app.post('/order-update',(req,res)=>{
    const order = req.body;
    var latest = { $set: { newOrder: order} };
    User.findOneAndUpdate({_id:req.user.id},latest)
    .then(result=>{
      res.json({redirect:'/profile'});
    })
   .catch(err=>{
     console.log(err);
   })
 })