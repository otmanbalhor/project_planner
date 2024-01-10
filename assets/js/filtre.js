
//
// filtre pour les cartes (to do, doing, done)
//
export function filter(categorie) {

    const cards = document.querySelectorAll('.container__article__card');


    //
    //FONCTION POUR TRI
    //
    cards.forEach(function(card){

        const h2Card = card.querySelector(".container__article__card__haut__titre");

        if (categorie === 'All' || categorie === h2Card.textContent) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }

    });

}


