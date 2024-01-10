

//
//label
//
export const switchLabel = document.createElement('label');
switchLabel.classList.add('header__nav__div__label')

//
//input
//
export const btnDarkmode = document.createElement('input');
btnDarkmode.type="checkbox";
btnDarkmode.classList.add('header__nav__div__label__input');

//
//span
//
export const slider = document.createElement('span');
slider.classList.add('header__nav__div__label__span');



const card = document.getElementsByClassName('container__article__card');
const navi = document.getElementById('nav');

btnDarkmode.addEventListener('change',function(){

    if(btnDarkmode.checked){
        document.body.style.backgroundColor='rgb(50,50,50)';
        document.body.style.color='rgb(255,255,255)';
        document.body.style.transition='0.5s';
        navi.style.backgroundColor='rgb(255,255,255)';
        Array.from(card).forEach(carte => {
            carte.style.backgroundColor='rgb(70,70,70)'; 
        });
        
    }else{
        document.body.style.backgroundColor='';
        document.body.style.color='';
        document.body.style.transition='0.5s';
        navi.style.backgroundColor='';
        Array.from(card).forEach(carte => {
            carte.style.backgroundColor=''; 
        });
        
    }
})