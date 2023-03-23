const words = [
    'arbre',
    'banane',
    'sphynx',
    'chat',
    'karaoke'
];

// On crée ces variables en haut pour pouvoir les utiliser partout dans le code
let currentWord = null;
let missed = [];

// On recupère tous les éléments HTML dont on a besoin
const wordDiv = document.querySelector("#word");
const newGameBtn = document.querySelector('#newGame');
const flowerDiv = document.querySelector('#flower');
const missedDiv = document.querySelector('#missed');
let letterDivs = document.querySelectorAll('.letter');

// Réinitialise les différentes variables pour commencer une nouvelle partie
const resetGame = () => {

    // On vide le tableau de lettres et on remette la fleur avec tous ses pétales
    missed = [];
    missedDiv.innerHTML = '';
    flowerDiv.src = "images/flower-8.png";

    // On choisit un mot aléatoire dans la liste
    currentWord = words[Math.floor(Math.random() * words.length)];

    // On crée une div par lettre en fonction de la taille du mot
    wordDiv.innerHTML = new Array(currentWord.length).fill(0).map(() => `<div class="letter"></div>`).join('');

    // On recupère à nouveau les divs en fonction des nouvelles lettres
    letterDivs = document.querySelectorAll('.letter');
};

// On écoute sur l'évenement "keydown" (à chaque fois que l'utilisateur appuie
// sur une touche du clavier)
document.addEventListener('keydown', (e) => {
    
    // Si la touche n'est pas une lettre on ne fait rien
    if (!isAlphabetic(e.key)) {
        return;
    }

    // Si le mot ne contient pas la lettre et qu'on ne l'a pas déjà ajoutée à `missed` :
    if ( currentWord.indexOf(e.key) === -1 && missed.indexOf(e.key.toUpperCase()) === -1) {

        // on rajoute la lettre, puis on met à jour le HTML
        missed.push(e.key.toUpperCase());
        missedDiv.innerHTML = missed.join(', ');

        // on change l'image en fonction du nombre de lettres dans `missed`
        if (8 - missed.length >= 0) {
            flowerDiv.src = "images/flower-" + (8 - missed.length) + ".png";
        }

    } else {
        
        let index = -1;

        // tant qu'on a pas parcouru tout le monde :
        while (index < currentWord.length) {

            // on récupère l'index de la touche dans le mot
            index = currentWord.indexOf(e.key, index + 1);

            // si on trouve
            if (index !== -1) {
                // on met à jour le HTML de la lettre
                letterDivs[index].innerHTML = e.key.toUpperCase();
            } else { // si on ne trouve rien on s'arrête là
                return;
            }
            // sinon on continue jusqu'à faire l'ensemble du mot
            // (pour gérer le cas ou la lettre apparaît plusieurs fois)
        }
    }
});

// On permet de réinitialiser le jeu en cliquant sur le bouton
newGameBtn.addEventListener('click', resetGame);

// On le réinitialise une première fois 
resetGame();
