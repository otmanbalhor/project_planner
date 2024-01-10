import * as datefns from 'https://cdn.jsdelivr.net/npm/date-fns@2.24.0/esm/index.js';


export function dayRemaining() {

    const inputDateValue = document.getElementById('inputDate').value;
    const dateInputError = document.getElementById('errorDate');


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
        let storages = JSON.parse(localStorage.getItem('items')) || [];
        let totalDR = 0;

        storages.forEach(element => {
            const fin = element.end || datefns.addDays(new Date(), 14);
            const daysDifference = datefns.differenceInDays(selectedDate, new Date(fin));
    
            if (daysDifference > 0) {
                totalDR += daysDifference; // La tâche est en retard
            } else if (daysDifference < 0) {
                totalDR -= daysDifference; // La tâche est en avance
            }
            // Si la tâche doit se terminer aujourd'hui, ne pas ajouter ni soustraire de jours, car elle est à l'heure.
        });
    
        const sentence = document.querySelector('.container__article__card__inputs__dayRemaining');
        if (totalDR > 0) {
            sentence.textContent = `${totalDR} days remaining`;
        } else if (totalDR === 0) {
            sentence.textContent = `the task must end today`;
        } else {
            sentence.textContent = `you are ${Math.abs(totalDR)} days late`;
        }
    }
   
}

