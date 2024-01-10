
function ElementClass(elementName,className){

    const element=document.createElement(elementName);
    element.classList.add(className);

    return element;
}


const menu = ElementClass('img','.header__nav__div__img');
menu.id="menuBurger";
menu.src = "./img/Menu.png";


const popup = ElementClass('div', '.header__nav__div__img__popup');
popup.id = "popup";


const contenuPopup = ElementClass('div', 'check-panier__popup__contenu');

const paraPopup = document.createElement('p');
paraPopup.innerText = `Your basket is empty`;

const buttonPopup = document.createElement('button');
buttonPopup.innerText = 'Close menu';
buttonPopup.id = "closeMenu"

menu.addEventListener('click',function(){
    popup.style.display = '';
})
buttonPopup.addEventListener('click', () => {

    popup.style.display = 'none';

});

export { menu, popup, contenuPopup, paraPopup, buttonPopup };


