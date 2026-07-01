// RECUPERER LE PLATEAU DE JEU ET P
const GAME = document.getElementById(`game`);
const P = document.getElementById(`message`);

// SYMBOLES A UTILISER
const SYMBOLS = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🥝", "🍍"];

// TOUTES LES CARTES DU JEU > DOUBLER LA LISTE
const CARDS_SYMBOLS = [...SYMBOLS, ...SYMBOLS];
console.log(CARDS_SYMBOLS); 

// CREER LISTE VIDE > CARTES RETOURNEES POUR COMPARER
const FACE_UP_CARDS = [];

// SCORE POUR VERIFIER LA VICTOIRE FINALE
let score = 0;


// ATTRIBUER VALEURS ALEATOIRES
CARDS_SYMBOLS.sort(() => (Math.random() - 0.5));


// COMPARER LES VALEURS FACE_UP_CARDS
function verification() {
    const [CARD_1, CARD_2] = FACE_UP_CARDS;
    console.log(FACE_UP_CARDS);

    if (CARD_1.value === CARD_2.value) {
        score ++; 
        console.log(`Ton score est de ${score}`);         
    } else {
        setTimeout(() => {
            CARD_1.front.classList.remove(`face_up`);
            CARD_2.front.classList.remove(`face_up`);
            CARD_1.front.classList.add(`face_down`);
            CARD_2.front.classList.add(`face_down`);

            CARD_1.back.classList.remove(`face_down`);
            CARD_2.back.classList.remove(`face_down`);
            CARD_1.back.classList.add(`face_up`);
            CARD_2.back.classList.add(`face_up`);
        }, 500);   
    };

    if (score === 8) {
        P.innerText = `··· Bravo ! 🏆 Tu as remporté la partie 🎉 ···`
    }

    FACE_UP_CARDS.length = 0;
};


CARDS_SYMBOLS.forEach((symbol) => {
    // CREER LES CARTES > CONTAINER, BACK, FRONT
    const CARD_CONTAINER = document.createElement(`div`);
    const CARD_BACK = document.createElement(`div`);
    const CARD_FRONT = document.createElement(`div`);

    // AJOUTER CLASS AUX DIVS POUR STYLISER
    CARD_CONTAINER.classList.add(`container`);
    CARD_BACK.classList.add(`card_back`);
    CARD_BACK.classList.add(`face_up`);
    CARD_FRONT.classList.add(`card_front`);
    CARD_FRONT.classList.add(`face_down`);

    // INSERER SYMBOLS
    CARD_FRONT.innerText = symbol;
    CARD_FRONT.dataset.value = symbol;

    // CSS CARD_FRONT
    CARD_FRONT.style.fontSize = `45px`;

    // INSERER CONTAINER DANS GAME
    GAME.append(CARD_CONTAINER);
    // INSERER LES DEUX DIVS DANS CONTAINER
    CARD_CONTAINER.append(CARD_BACK);
    CARD_CONTAINER.append(CARD_FRONT);

    // EVENT AU CLICK
    CARD_CONTAINER.onclick = () => {
        // EMPECHER DE SELECTIONNER UNE CARTE DEJA VISIBLE
        if (CARD_FRONT.classList.contains(`face_up`)) {
            return;
        };

        // EMPECHER DE SELECTIONNER PLUS DE 2 CARTES
        if (FACE_UP_CARDS.length >= 2)
            return;

            // CHANGER CLASS POUR VISIBILITE
            CARD_FRONT.classList.toggle(`face_up`);
            CARD_BACK.classList.toggle(`face_down`);

            // RECUPERER ELEMENTS DE LA CARTE RETOURNEE
            // REUTILISER VALEUR, BACK ET FRONT
            FACE_UP_CARDS.push({
                value: CARD_FRONT.dataset.value,
                front: CARD_FRONT,
                back: CARD_BACK,
            });

            console.log(FACE_UP_CARDS);
        
        if (FACE_UP_CARDS.length === 2) {
            verification();    
        };
    };
});