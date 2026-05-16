let step = 5;

const stepDisplay = document.getElementById('stepCounter');
const playerInput = document.getElementById('playerInput');
const submitPlayerBtn = document.getElementById('submitPlayerBtn');
const messageDisplay = document.getElementById('messageDisplay');
const stopBtn = document.getElementById('stopBtn');
const restartBtn = document.getElementById('restartBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');

let secretNumber = Math.floor(Math.random() * 100) + 1;

function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    step = 5;
    playerInput.value = '';
    stepDisplay.innerText = `Remaining steps: ${step}`;
}

function checkGuess() {
    const playerGuess = parseInt(playerInput.value);

    if (submitPlayerBtn.disabled) return;
 
    if (isNaN(playerGuess)) {
        messageDisplay.innerText = 'Please enter a valid number!';
        return;
    }
    
    step--;
    stepDisplay.innerText = `Remaining steps: ${step}`;
    
    if (playerGuess === secretNumber) {
        messageDisplay.innerText = 'Congratulations! You guessed the correct number!';
        submitPlayerBtn.disabled = true;
    } else if (step === 0) {
        messageDisplay.innerText = `Game over! You have used all your attempts. The correct number was ${secretNumber}`;
        submitPlayerBtn.disabled = true;
    } else if (playerGuess < secretNumber) {
        messageDisplay.innerText = 'Too low! Try again.';
    } else {
        messageDisplay.innerText = 'Too high! Try again.';
    } 

    playerInput.value = '';
    restartBtn.disabled = false;

}

submitPlayerBtn.addEventListener(`click`, checkGuess);
stopBtn.addEventListener('click', stopGame);
restartBtn.addEventListener('click', () => {
    submitPlayerBtn.disabled = false;
    stopBtn.disabled = false;
    restartBtn.disabled = false;
    initGame();
});

backToHomeBtn.addEventListener('click', () => {
  window.location.href = '../home/home_page_game.html';
});

function stopGame() {
    stopBtn.disabled = true;
    alert('Game stopped!');
}

window.onload = initGame;
