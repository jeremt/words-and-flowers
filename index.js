const words = [
    'arbre',
    'banane',
    'sphynx',
    'chat',
    'karaoke'
];

// On crée ces variables en haut pour pouvoir les utiliser partout dans le code
let isGameOver = false;
let currentWord = null;
let missed = [];

// On recupère tous les éléments HTML dont on a besoin
const wordDiv = document.querySelector("#word");
const boxDiv = document.querySelector('#box');
const messageDiv = document.querySelector('#message');
const newGameBtn = document.querySelector('#newGame');
const flowerDiv = document.querySelector('#flower');
const missedDiv = document.querySelector('#missed');
let letterDivs = document.querySelectorAll('.letter');

// Réinitialise les différentes variables pour commencer une nouvelle partie
const resetGame = () => {
    isGameOver = false;

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
    boxDiv.style.display = 'none';
};

const getLetterPositions = (letter) => {
    const positions = [];
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
            positions.push(i);
        }
    }
    return positions;
};

// On écoute sur l'évenement "keydown" (à chaque fois que l'utilisateur appuie
// sur une touche du clavier)
document.addEventListener('keydown', (e) => {
    
    // Si la touche n'est pas une lettre ou on a fini la partie on ne fait rien
    if (!isAlphabetic(e.key) || isGameOver) {
        return;
    }

    const positions = getLetterPositions(e.key);

    if (positions.length === 0 && missed.indexOf(e.key.toUpperCase()) === -1) {
        // on rajoute la lettre, puis on met à jour le HTML
        missed.push(e.key.toUpperCase());
        missedDiv.innerHTML = missed.join(', ');

        // on change l'image en fonction du nombre de lettres dans `missed`
        if (8 - missed.length > 0) {
            flowerDiv.src = "images/flower-" + (8 - missed.length) + ".png";
        } else {
            flowerDiv.src = "images/flower-lose.png";
            isGameOver = true;
            boxDiv.style.display = 'flex';
            messageDiv.innerHTML = "C'est perdu, il fallait trouver \"" + currentWord + "\" !";
            // handle lost
        }
    } else {
        // On ajoute la lettre dans les divs .letter corresponant :
        for (const position of positions) {
            letterDivs[position].innerHTML = e.key.toUpperCase();
        }
        // on vérifie si on a trouvé toutes les lettres
        for (const div of letterDivs) {
            if (div.innerHTML === '') {
                return;
            }
        }
        // si oui on gère le gameover
        isGameOver = true;
        boxDiv.style.display = 'flex';
        flowerDiv.src = "images/flower-win.png";
        messageDiv.innerHTML = "C'est gagné 🎉";
    }
});

// On permet de réinitialiser le jeu en cliquant sur le bouton
newGameBtn.addEventListener('click', resetGame);

// On le réinitialise une première fois 
resetGame();
