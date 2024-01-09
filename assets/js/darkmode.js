

export const btnDarkmode = document.createElement('input');
btnDarkmode.type="checkbox";

const card = document.getElementsByClassName('container__article__card');
const navi = document.getElementById('nav');

btnDarkmode.addEventListener('change',function(){

    if(btnDarkmode.checked){
        document.body.style.backgroundColor='rgb(50,50,50)';
        document.body.style.color='rgb(255,255,255)';
        navi.style.backgroundColor='rgb(255,255,255)';
        Array.from(card).forEach(carte => {
            carte.style.backgroundColor='rgb(70,70,70)'; 
        });
        
    }else{
        document.body.style.backgroundColor='';
        document.body.style.color='';
        navi.style.backgroundColor='';
        Array.from(card).forEach(carte => {
            carte.style.backgroundColor=''; 
        });
        
    }
})