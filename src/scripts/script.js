import { easyList, mediumList, hardList } from './listByDifficulty.js';

const containerCard = document.querySelector('[data-container]');
const restartButton = document.querySelector('[data-restart-game]');
const modalArea = document.querySelector('[data-modal]');
const difficultyButtons = document.querySelectorAll('[data-difficulty-button]');
const difficultyArea = document.querySelector('[data-difficulty-area]');
const gameArea = document.querySelector('[data-game-area]');
const timerArea = document.querySelector('[data-timer]');
const messageModal = document.querySelector('[data-modal-message]');

let selectedCardList = [];
let imagesList = [];
let timer = 60;
let timeoutId;

function initGame(listImage) {
    countInitGamer();
    imagesList = listImage;
    let randomImages = listImage.sort(() => {
        return Math.random() > 0.5 ? 2 : -1;
    });
    
    for (let index in listImage) {
        const cardImage = document.createElement('img');
        cardImage.setAttribute('src', randomImages[index]);
    
        const cardArea = document.createElement('div');
        cardArea.classList.add('card-game');
        cardArea.addEventListener('click', handleCardPress);
    
        cardArea.appendChild(cardImage);
        containerCard.appendChild(cardArea);
    }
}

function openModal() {
    modalArea.style.display = "flex";
    clearInterval(timeoutId);
}

function countInitGamer() {
    timeoutId = setInterval(() => {
        timerArea.textContent = `Tempo: ${timer--}`;

        if (timer < 0) {
            clearInterval(timeoutId);
            messageModal.textContent = 'Que pena! Você perdeu :(';
            openModal();
        }
    }, 1000);
}

function handleCardPress() {
    if (selectedCardList.length < 2) {
        this.classList.add('selected');
        selectedCardList.push(this);

        if (selectedCardList.length === 2) {
            setTimeout(verifyCard, 500);
        }
    }
}

function verifyCard() {
    if (selectedCardList[0].innerHTML === selectedCardList[1].innerHTML) {
        selectedCardList[0].classList.add('correct-card');
        selectedCardList[1].classList.add('correct-card');

        const allCorrects = document.querySelectorAll('.correct-card');

        if (allCorrects.length === imagesList.length) {
            openModal();
        }

    } else {
        selectedCardList[0].classList.remove('selected');
        selectedCardList[1].classList.remove('selected');
    }

    selectedCardList = [];
}

function handleRestartPress() {
    location.reload(location.href);
}

for (let difficultyButton of difficultyButtons) {
    difficultyButton.addEventListener('click', () => {
        const difficultySelected = difficultyButton.attributes['data-difficulty-button'].value;
        if (difficultySelected === 'easy') {
            initGame(easyList);
            timer = 50;
            timerArea.textContent = `Tempo: ${timer--}`;
        } else if (difficultySelected === 'medium') {
            initGame(mediumList);
            timer = 70;
            timerArea.textContent = `Tempo: ${timer--}`;
        } else {
            initGame(hardList);
            timer = 100;
            timerArea.textContent = `Tempo: ${timer--}`;
        }

        difficultyArea.style.display = 'none';
        gameArea.style.display = 'flex';
    })
}

restartButton.addEventListener('click', handleRestartPress);
