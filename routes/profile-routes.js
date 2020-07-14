const router = require('express').Router();


const authCheck =(req,res,next)=>{
    if(!req.user){
        res.redirect('/auth/login');
    }
    else {
        next();
    }
}

/***********Get BTNS Array**************/
function btnArr(preDate,nextDate){
    console.log(`${preDate} and ${nextDate}`)
    const btnArr = [];
    const _mon = [0,2,4,6,7,9,11]
    const monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateObj = new Date();
    var _d = dateObj.getDate();
    var _m = dateObj.getMonth();
    for(var i =0;i<20;i++){
        if(_d>28 && _m==1){
            _d=1;
            _m++
           // console.log(`one ${i}`)
        }
        if(_d>31 && _mon.includes(_m)){
            _d=1;
            _m++;
           // console.log(` two ${i}`)
        }
        if(_m>11){
            _m =0;
           // console.log(` three ${i}`)
        }
        const newDate = `${_d} ${monthArr[_m]}`;
        let btn ={};
        switch(newDate) {
            case preDate:
              btn = {
                  "date":newDate,
                  "class":"green"
              };
              break;
            case nextDate:
                btn = {
                    "date":newDate,
                    "class":"blue"
                };
              break;
            default:
                btn = {
                    "date":newDate,
                    "class":null
                };
          }
        _d++;
        btnArr.push(btn);
    }
    return btnArr;
}


router.get('/',authCheck,(req,res)=>{   
    let btns;
    let preDate;
    let newDate;
    if(req.user.preOrders[0]){
        preDate = req.user.preOrders[0].date;
    }
    if(req.user.newOrder[0]){
       newDate = req.user.newOrder[0].date;
    }
    if(req.user.preOrders[0] && req.user.newOrder[0]){
        btns= btnArr(preDate,newDate);
    }
    
    if(!preDate){
            preDate= "hell"
        }
     if(!newDate){
            newDate ="hell"
    }      
    btns= btnArr(preDate,newDate);
    res.render('profile',{user: req.user,btns:btns})

})


router.get('/order/:id',authCheck,(req,res)=>{
    const status = req.params.id.split('-')[0];
    const date = req.params.id.split('-')[1];
    const preOrder = req.user.preOrders[0];
    const nextOrder = req.user.newOrder[0];

        if(status== 'done'){
            res.render('order',{status:"done",date:date,order:preOrder,user:req.user})
        }
        if(status== "next"){
            res.render('order',{status:"next",date:date,order:nextOrder,user:req.user})
        }
        if(status== "now"){
            res.render('order',{status:"now",date:date,user:req.user})
        }
})


router.get('/user',authCheck,(req,res)=>{
    res.render('user-profile', {user:req.user})
})

module.exports = router;