import * as datefns from 'https://cdn.jsdelivr.net/npm/date-fns@2.24.0/esm/index.js';

//FONCTION DAY REMAINING OTMAN
export function dayRemaining() {

    const inputDateValue = document.getElementById('inputDate').value;
    const inputDateValueAdd = document.getElementById('date')

    const dateInputError = document.getElementById('errorDate');


    //
    //SI EXISTE PAS ALORS AFFICHER MESSAGE D'ERREUR
    //
    if (!inputDateValue || !inputDateValueAdd) {


        dateInputError.textContent = "Please select a valid date";

    } else {

        dateInputError.textContent = "Good date";

        //
        //ON CONVERTIT LA VALEUR DE L'INPUT EN UN OBJET DATE
        //
        const selectedDate = new Date(inputDateValue);
        const selectedDateAdd = new Date(inputDateValueAdd);

        //
        //ON RECUPERE LES DONNEES DEPUIS LE LOCAL STORAGE
        //
        const fin = datefns.addDays(new Date(), 1);
        const daysDifferenceAdd = datefns.differenceInDays(selectedDateAdd, new Date(fin));
        const daysDifference = datefns.differenceInDays(selectedDate, new Date(fin));
        console.log(daysDifference);

        const sentence = document.querySelector('.container__article__card__inputs__dayRemaining');
        const sentenceAdd = document.querySelectorAll('.item__input-controller__dayRemaining');

        if (daysDifference > 0 || daysDifferenceAdd > 0) {
            sentence.textContent = `${daysDifference} days remaining`;
            sentenceAdd.textContent = `${daysDifferenceAdd} days remaining`;
        } else if (daysDifference === 0 || daysDifferenceAdd === 0) {
            sentence.textContent = `the task must end today`;
            sentenceAdd.textContent = `the task must end today`;
        } else {
            sentence.textContent = `you are ${Math.abs(daysDifference)} days late`;
            sentenceAdd.textContent = `you are ${Math.abs(daysDifferenceAdd)} days late`;
        }
       
    }

}