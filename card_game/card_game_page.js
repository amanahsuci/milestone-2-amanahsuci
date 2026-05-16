const imageList = [
  'ai.png',
  'aliens.png',
  'birthday-cake.png',
  'clapperboard.png',
  'coffee-cup.png',
  'coffee.png',
  'distributed.png',
  'uranus.png',
];

const backImageSrc = '../assets/game_card_pic/card-back.png';

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let steps = 0;

const gameBoard = document.getElementById('gameBoard');
const scoreBoard = document.getElementById('scoreBoard');
const stopBtn = document.getElementById('stopBtn');
const restartBtn = document.getElementById('restartBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const gameContainer = document.getElementById('gameContainer');

stopBtn.addEventListener('click', stopGame);
restartBtn.addEventListener('click', initGame);
backToHomeBtn.addEventListener('click', () => {
  window.location.href = '../home/home_page_game.html';
});

function initGame() {
  steps = 0;
  matchedPairs = 0;
  flippedCards = [];
  cards = [...imageList, ...imageList];
  cards.sort(() => 0.5 - Math.random());

  gameBoard.innerHTML = '';
  updateScore();
  generateCards();

  stopBtn.disabled = false;
  restartBtn.disabled = true;

  gameContainer.style.display = 'block';
}

function generateCards() {
  cards.forEach((imgName) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imgName;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    const backImg = document.createElement('img');
    backImg.src = backImageSrc;
    cardBack.appendChild(backImg);

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const frontImg = document.createElement('img');
    frontImg.src = `../assets/game_card_pic/${imgName}`;
    cardFront.appendChild(frontImg);

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    card.appendChild(cardInner);
    gameBoard.appendChild(card);

   
    card.addEventListener('click', () => flipCard(card));
  });
}

function flipCard(card) {
  if (card.classList.contains('flipped') || flippedCards.length === 2) return;

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    steps++;
    updateScore();
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const img1 = card1.dataset.image;
  const img2 = card2.dataset.image;

  if (img1 === img2) {
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === imageList.length) {
      setTimeout(() => alert('🎉 You Win! All cards are match!'), 300);
    }
    if (matchedPairs === imageList.length / 2) {
      restartBtn.disabled = false;
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 500);
  }
}

function updateScore() {
  scoreBoard.textContent = `Steps: ${steps}`;
}

function stopGame() {
  stopBtn.disabled = true;
  restartBtn.disabled = false;
  alert('Game stopped!');
}

window.onload = initGame;