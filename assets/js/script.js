import { btnDarkmode } from "./darkmode.js";
import { filter } from "./filtre.js";
//import * as datefns from "https://cdn.jsdelivr.net/npm/date-fns@3.1.0/index.min.js";

//
//DECLARATION TABLEAU LOCAL STORAGE ET CONVERSION EN JSON
//
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

//
//VA CHERCHER BOUTON SEND
//
const task = document.getElementById('task');

//
//AJOUTER UN ECOUTEUR EVENT CLICK SUR SEND
//
task.addEventListener('click', function () {

    //
    //VA CHERCHER LA ZONE DE SAISIE
    //
    const item = document.querySelector('#text');

    //
    //MET LE SAISIE USER DANS ITEMSARRAY(LOCALSTORAGE)
    //
    itemsArray.push(item.value);

    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();

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

    itemsArray.forEach((date, task, description) => {
        objet += `<div id="item" class="item" draggable="true" ondragstart="drag(event)">
        <div class="item__input-controller">
            <label class="item__input-controller__label">Select a date please:</label>
            <input class="item__input-controller__datetime" type="datetime-local" name="date" value="${date || ''}" id="date">
            <label item__input-controller__label>Add a task:</label>
            <input input class="item__input-controller__text type="text" id="text" name="text" placeholder="Add a task..."value="${task || ''}" required minlength="3" maxlength="256"/>
            <label item__input-controller__label>Description:</label>
            <input input class="item__input-controller__description type="text" id="description" name="description" placeholder="Describe your task..." value="${description || ''}" required minlength="5" maxlength="1024"/>
        </div>
    </div>
    <div id="delete" class="item__delete" draggable="true" ondragstart="drag(event)">
        <button class="item__delete__btn">Delete</button>
    </div>`
    });

    const add = document.querySelector(".container__article__card__add");
    add.innerHTML = objet;

    const deleteButtons = document.querySelectorAll('.item__delete__btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', activateDelete);
    });

    activateDelete();
}


function activateDelete() {
    let supprimer = document.querySelectorAll(".item__delete__btn");

    supprimer.forEach((deleteBtn, i) => {
        deleteBtn.addEventListener('click', () => {
            itemsArray.splice(i, 1);
            localStorage.setItem("items", JSON.stringify(itemsArray))
            location.reload();
        })

    });

}


document.addEventListener('DOMContentLoaded', function () {

    displayItems();
    //
    //ON SELECTIONNE NAV POUR LE LIER A SON ENFANT BTN DARKMODE
    //
    const nav = document.querySelector('nav');

    const all = document.getElementById('all');
    const toDo = document.getElementById('to do');
    const doing = document.getElementById('doing');
    const done = document.getElementById('done');

    all.addEventListener('click',function(){

        filter('All');
    });

    toDo.addEventListener('click',function(){
        filter('To do');
    });

    doing.addEventListener('click',function(){
        filter('Doing');
    });

    done.addEventListener('click',function(){
        filter('Done');
    });

    nav.append(btnDarkmode);
});