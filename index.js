// Selecting elements
const dino = document.querySelector('#dino');
const obstacale = document.querySelector('#obstacale');
const gamend = document.querySelector('#Gameover');
const startBtn = document.querySelector('#startbtn');
const gameContainer = document.querySelector('#game');
const startGameScreen = document.querySelector('#startgame');
const nameInput = document.querySelector('#name');
const scoringDisplay = document.querySelector('#scoring');
let playerName = ''; // Variable to hold the player's name
let score = 0; // Initial score

// Function to start the game
const startGame = () => {
    playerName = nameInput.value.trim(); // Capture the player's name
    if (!playerName) {
        alert('Please enter your name to start the game!');
        return;
    }

    // Hide start screen and show the game container
    startGameScreen.style.display = 'none';
    gameContainer.style.display = 'block';

    // Display the initial score with player's name
    scoringDisplay.innerText = `${playerName}: 0`;

    startScoring();
};

// Add both click and tap support for the start button
startBtn.addEventListener('click', startGame);
startBtn.addEventListener('touchstart', startGame);

// Dino jump logic
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') { // Check if the key pressed is the Spacebar
        dino.classList.add('active');

        // Allow multiple jumps
        setTimeout(() => {
            dino.classList.remove('active');
        }, 200);
    }
});

// Scoring logic
let scoringInterval;
function startScoring() {
    scoringInterval = setInterval(() => {
        score++;
        scoringDisplay.innerText = `${playerName}: ${score}`;
    }, 200);
}

// Collision detection and game-over logic
let gameover = setInterval(() => {
    // Get positions of dino and obstacle
    let dinotop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let obstacleleft = parseInt(window.getComputedStyle(obstacale).getPropertyValue("left"));

    // Check collision
    if (obstacleleft > 0 && obstacleleft <= 60 && dinotop >= 200) {
        // Stop the game
        dino.style.display = "none"; // Hide the dino
        obstacale.style.display = "none"; // Hide the obstacle
        scoringDisplay.style.display = "none"; // Hide scoring display
        gamend.style.display = "block"; // Show the game-over screen

        // Display final score with the player's name
        let finalscore = document.getElementById('finalscore');
        finalscore.innerText = `${playerName}, your score: ${score}`;

        // Focus the play again button
        let btn = document.querySelector('#playbutton');
        btn.focus();

        clearInterval(gameover); // Stop collision detection
        clearInterval(scoringInterval); // Stop the scoring interval
    }
}, 1); // Check collision every 1 millisecond
