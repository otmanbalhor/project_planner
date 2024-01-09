
//
//FONCTION POUR ACTIVER LA ZONE A DRAG
//
function drag(event){
    event.dataTransfer.effectAllowed="move";
    console.log(event.dataTransfer.effectAllowed);
    let item = event.target.id;
    event.dataTransfer.setData("text",item);
}

//
//FONCTION POUR ACCEPTER LE DROP
//
function allowDrop(event){
    event.preventDefault();
}

//
//FONCTION POUR PLACER LE CONTENU A DROP
//
function drop(event){
   item = event.dataTransfer.getData("text");
   
   event.currentTarget.append(document.getElementById(item));
}