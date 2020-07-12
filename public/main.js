/**********Global Functions*************/
function _fn(id){
    return document.querySelector(id);
}


/**********Main Part*************/

_fn('.menu-bars').addEventListener('click',(e)=>{
    _fn('.nav-menu').classList.add('show');
})
_fn('.cross').addEventListener('click',(e)=>{
    _fn('.nav-menu').classList.remove('show');
})

_fn('.profile').addEventListener('click',(e)=>{
    _fn('.profile-div').classList.add('show');
    _fn('.nav-menu').classList.remove('show');
})
_fn('.profile-div .crossBTN').addEventListener('click',(e)=>{
    _fn('.profile-div').classList.remove('show');
})

 /***********ADDRESS Update***********/
 _fn('.btn-save').addEventListener('click',(e)=>{
    let textVal = {
       "address": _fn('.userAddress textarea').value
    };

        fetch('/save-address',{
            method:'POST',
            credentials: 'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(textVal)
        })
        .then(res=>res.json())
        .then(data=>window.location.href=data.redirect)
        .catch(err=>console.log(err));
    })