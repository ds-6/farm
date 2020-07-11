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
    for(var i =0;i<15;i++){
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
                    "date":newDate
                };
          }
        _d++;
        btnArr.push(btn);
    }
    return btnArr;
}


router.get('/',authCheck,(req,res)=>{
    const preOrders = JSON.parse(req.user.preOrders[0]);
    const newOrder = JSON.parse(req.user.newOrder[0]);
    const btns= btnArr(preOrders.date,newOrder.date);
    console.log(btns);
    res.render('profile',{user: req.user,btns:btns});

})
router.get('/order-now',authCheck,(req,res)=>{
    res.render('order-now');
})
module.exports = router;