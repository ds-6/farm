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