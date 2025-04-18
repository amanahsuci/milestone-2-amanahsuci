const imageList = {
    rock: 'rock.jpg',
    paper: 'paper.jpg',
    scissors: 'scissors.jpg',
};

let playerScore = 0;
let computerScore = 0;
let round = 0;
let result = '';

const roundScore = document.getElementById('roundScore');
const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');
const stopBtn = document.getElementById('stopBtn');
const restartBtn = document.getElementById('restartBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const playerHandImg = document.querySelector('#playerHand img');
const computerHandImg = document.querySelector('#computerHand img');
const choicesDisplay = document.getElementById('choicesDisplay');

rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));

stopBtn.addEventListener('click', stopGame);
restartBtn.addEventListener('click', initGame);
backToHomeBtn.addEventListener('click', () => {
    window.location.href = 'home_page_game.html';
});

function initGame() {
    playerScore = 0;
    computerScore = 0;
    round = 0;
    result = '';
    updateScore();
    stopBtn.disabled = false;
    restartBtn.disabled = false;

    playerHandImg.src = `rps_game_pic/${imageList.rock}`;
    computerHandImg.src = `rps_game_pic/${imageList.rock}`;
    choicesDisplay.innerHTML = '';
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    round++;

    playerHandImg.src = `rps_game_pic/${imageList.rock}`;
    computerHandImg.src = `rps_game_pic/${imageList.rock}`;

    playerHandImg.classList.add('shake-left');
    computerHandImg.classList.add('shake-right');

    setTimeout(() => {
        playerHandImg.classList.remove('shake-left');
        computerHandImg.classList.remove('shake-right');

        playerHandImg.src = `rps_game_pic/${imageList[playerChoice]}`;
        computerHandImg.src = `rps_game_pic/${imageList[computerChoice]}`;

        result = getResult(playerChoice, computerChoice);
        updateScore();
        checkWinner();
        showChoices(playerChoice, computerChoice);
    }, 600);
}

function showChoices(playerChoice, computerChoice) {
    choicesDisplay.innerHTML = '';

    const playerChoiceImg = document.createElement('img');
    playerChoiceImg.src = `rps_game_pic/${imageList[playerChoice]}`;
    playerChoiceImg.alt = playerChoice;
    playerChoiceImg.classList.add('player-choice');

    const computerChoiceImg = document.createElement('img');
    computerChoiceImg.src = `rps_game_pic/${imageList[computerChoice]}`;
    computerChoiceImg.alt = computerChoice;
    computerChoiceImg.classList.add('computer-choice');

    const resultText = document.createElement('p');
    resultText.classList.add('result-text');

    if (result === 'draw') {
        resultText.innerText = "It's a draw!";
    } else if (result === 'player') {
        resultText.innerText = "You win this round!";
    } else {
        resultText.innerText = "Computer wins this round!";
    }

    choicesDisplay.appendChild(playerChoiceImg);
    choicesDisplay.appendChild(computerChoiceImg);
    choicesDisplay.appendChild(resultText);
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'draw';

    const wins =
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper');

    return wins ? 'player' : 'computer';
}

function updateScore() {
    if (result === 'player') playerScore++;
    if (result === 'computer') computerScore++;

    roundScore.innerText = `Round: ${round} | Player: ${playerScore} | Computer: ${computerScore}`;
}

function checkWinner() {
    if (playerScore === 5) {
        alert('Player wins the game! 🎉');
        stopGame();
    } else if (computerScore === 5) {
        alert('Computer wins the game! 🎉');
        stopGame();
    }
}

function stopGame() {
    stopBtn.disabled = true;
    restartBtn.disabled = false;
    alert('Game Stopped!');
}

window.onload = initGame;
