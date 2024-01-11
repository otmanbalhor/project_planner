import { switchLabel, btnDarkmode, slider } from "./darkmode.js";
import * as datefns from 'https://cdn.jsdelivr.net/npm/date-fns@2.24.0/esm/index.js';
import { filter } from "./filtre.js";
import { menu, popup, contenuPopup, paraPopup, buttonPopup } from "./menu.js";

//
//DECLARATION TABLEAU LOCAL STORAGE ET CONVERSION EN JSON
//
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];


const task = document.getElementById('task');

//
//AJOUTER UN ECOUTEUR EVENT CLICK SUR SEND
//
task.addEventListener('click', function () {

    //
    //VA CHERCHER LES ZONES DE SAISIES
    //
    const itemDate = document.querySelector('#inputDate');
    const itemText = document.querySelector('#text');
    const itemDescri = document.querySelector('#description');


    const saisis = {
        date: itemDate,
        text: itemText,
        description: itemDescri,
    };

    //
    //MET LES SAISIES USER DANS ITEMSARRAY(LOCALSTORAGE)
    //
    itemsArray.push(saisis);

    //
    // STOCKE LES DONNÉES MISES À JOUR DANS LE LOCAL STORAGE
    //
    localStorage.setItem("items", JSON.stringify(itemsArray));

    //
    //RECHARGE LA PAGE
    //
    location.reload();

});

//
//FONCTION POUR AFFICHER DATE TACHE DESCRIPTION
//
function displayItems() {

    let objet = "";

    itemsArray.forEach((item, i) => {
        if (item) {
            objet += `
    <div id="item${i}" id="item" class="item" draggable="true" ondragstart="drag(event)">
            <div class="item__input-controller">
                <label class="item__input-controller__label">Select a date please:</label>
                <input class="item__input-controller__datetime" type="datetime-local" value="${item.date || ''}" name="date" id="date${i}">
                <span class="item__input-controller__errormsg" id="errorDate${i}"></span>
                <p class="item__input-controller__dayRemaining"></p>
                <label class="item__input-controller__label">Add a task:</label>
                <input class="item__input-controller__text" type="text" id="text${i}" name="text" placeholder="Add a task..."value="${item.text || ''}" required minlength="3" maxlength="256"/>
                <p class="item__input-controller__minCharTxt"></p>
                <label class="item__input-controller__label">Description:</label>
                <input class="item__input-controller__description" type="text" id="description${i}" name="description" placeholder="Describe your task..." value="${item.description || ''}" required minlength="5" maxlength="1024"/>
                <p class="item__input-controller__minCharDescri"></p>
                <button class="item__delete__btn">Delete</button>
            </div>
        </div>`
        }

    });

    const add = document.querySelector(".container__article__card__add");
    add.innerHTML = objet;

    // ON APPELLE LA FONCTION activateDelete APRES AVOIR CREE LES ELEMENTS
    activateDelete();

    itemsArray.forEach((item, i) => {
        const inputDateElement = document.getElementById(`date${i}`);
        const storedInputDate = localStorage.getItem(`inputDate${i}`);

        if (inputDateElement && storedInputDate) {
            inputDateElement.value = storedInputDate;
        }
    });

    itemsArray.forEach((item, i) => {
        const inputTextElement = document.getElementById(`text${i}`);
        const storedTextValue = localStorage.getItem(`text${i}`);

        const inputDescriptionElement = document.getElementById(`description${i}`);
        const storedDescriptionValue = localStorage.getItem(`description${i}`);

        if (inputTextElement && storedTextValue) {
            inputTextElement.value = storedTextValue;
        }

        if (inputDescriptionElement && storedDescriptionValue) {
            inputDescriptionElement.value = storedDescriptionValue;
        }
    });

    // ON APPELLE LA FONCTION activateDelete APRES AVOIR INITIALISE LES ELEMENTS
    activateDelete();
}


function activateDelete() {
    let supprimer = document.querySelectorAll(".item__delete__btn");

    
    supprimer.forEach((deleteBtn, i) => {
        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault();

            let itemContainer = deleteBtn.parentNode;
            itemContainer.remove();

            itemsArray.splice(i, 1);

            localStorage.setItem("items", JSON.stringify(itemsArray))
            
        })

    });

}

//FONCTION DAY REMAINING
function dayRemaining(sentenceElement, i) {

    //
    //ON VA CHERCHER CHAQUE VALEUR SAISIE DU DATETIME POUR CHAQUE TACHE
    //
    const inputDateValue = document.getElementById(`date${i}`).value;

    const dateInputError = document.getElementById(`errorDate${i}`);

    console.log(`inputDateValue: ${inputDateValue}`);
    console.log(`dateInputError: ${dateInputError}`);
    //
    //SI EXISTE PAS ALORS AFFICHER MESSAGE D'ERREUR
    //
    if (!inputDateValue) {

        dateInputError.textContent = "Please select a valid date";
    } else {

        dateInputError.textContent = "Good date";

        //
        //ON CONVERTIT LA VALEUR DE L'INPUT EN UN OBJET DATE
        //
        const selectedDate = new Date(inputDateValue);

        //
        //ON RECUPERE LES DONNEES DEPUIS LE LOCAL STORAGE
        //

        const finito = datefns.addDays(new Date(), 1);
        const daysDifference = datefns.differenceInMilliseconds(selectedDate, new Date());
        const daysDiff = datefns.differenceInMilliseconds(selectedDate, new Date(finito));


        const days = Math.floor(daysDifference / (24 * 3600 * 1000));

        const hours = Math.floor((daysDifference % (24 * 3600 * 1000)) / (3600 * 1000));

        const minutes = Math.floor((daysDifference % (3600 * 1000)) / (60 * 1000));

        const day = Math.floor(daysDiff / (24 * 3600 * 1000));

        const hour = Math.floor((daysDiff % (24 * 3600 * 1000)) / (3600 * 1000));

        const minute = Math.floor((daysDiff % (3600 * 1000)) / (60 * 1000));


        if (days > 0) {
            sentenceElement.textContent = `${days} days, ${hours} hours and ${minutes} minutes remaining`;
        }

        else if (hours > 0) {
            sentenceElement.textContent = `${hours} hours and ${minutes} minutes remaining`;
        }
        else if (minutes > 0) {
            sentenceElement.textContent = `${minutes} minutes remaining`;
        }
        else if (day < 0) {
            sentenceElement.textContent = `You are ${Math.abs(days)} days, ${Math.abs(hours)} hours, and ${Math.abs(minutes)} minutes late`;
        }

        else if (hour < 0) {
            sentenceElement.textContent = `You are ${Math.abs(hours)} hours and ${Math.abs(minutes)} minutes late`;
        }
        else if (minute < 0) {
            sentenceElement.textContent = `You are ${Math.abs(minutes)} minutes late`;
        }
        else {
            sentenceElement.textContent = `The task must end now`;
        }


        localStorage.setItem(`inputDate${i}`, inputDateValue);

        localStorage.setItem(`text${i}`, document.getElementById(`text${i}`).value);

        localStorage.setItem(`description${i}`, document.getElementById(`description${i}`).value);

    }

}


document.addEventListener('DOMContentLoaded', function () {
    //
    //ON SELECTIONNE NAV POUR LE LIER A SON ENFANT BTN DARKMODE
    //
    const toggleSwitch = document.querySelector('.header__nav__div');

    displayItems();

    const all = document.getElementById('all');
    const toDo = document.getElementById('to do');
    const doing = document.getElementById('doing');
    const done = document.getElementById('done');

    all.addEventListener('click', function () {

        filter('All');
    });

    toDo.addEventListener('click', function () {
        filter('To do');
    });

    doing.addEventListener('click', function () {
        filter('Doing');
    });

    done.addEventListener('click', function () {
        filter('Done');
    });

    const sentences = document.querySelectorAll('.item__input-controller__dayRemaining');


    sentences.forEach((sentence, i) => {
        dayRemaining(sentence, i);
    });


    setInterval(() => {
        sentences.forEach((sentence, i) => {
            dayRemaining(sentence, i);
        });
    }, 1000);

    toggleSwitch.append(switchLabel);
    switchLabel.append(btnDarkmode);
    switchLabel.append(slider);

    const nav = document.querySelector('.header__nav');
    const divCheck = document.createElement('div')
    divCheck.classList.add('popup');
    nav.append(divCheck);
    divCheck.append(menu);
    divCheck.append(popup);
    popup.append(contenuPopup);
    contenuPopup.append(paraPopup);
    contenuPopup.append(buttonPopup)

});