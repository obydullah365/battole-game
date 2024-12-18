let score = 0;
let gameInterval;
let isGameRunning = false;
let bottles = document.querySelectorAll('.bottle');
let colorPicker = document.getElementById('color-picker');
let scoreDisplay = document.getElementById('score');
let startButton = document.getElementById('start-game');
let adSpace = document.getElementById('ad-space');

// Start/Restart the Game
startButton.addEventListener('click', () => {
  if (isGameRunning) {
    resetGame();
  } else {
    startGame();
  }
});

function startGame() {
  isGameRunning = true;
  score = 0;
  updateScore();

  // Reset all bottles
  bottles.forEach(bottle => {
    bottle.style.backgroundColor = 'white';
    bottle.querySelector('::after').style.height = '0%';
  });

  // Game Interval for automatic actions like redirection
  gameInterval = setInterval(handleGameInterval, 15000);

  startButton.textContent = 'Restart Game';
}

// Reset the game
function resetGame() {
  clearInterval(gameInterval);
  isGameRunning = false;
  startButton.textContent = 'Start Game';
  score = 0;
  updateScore();
}

// Update Score Display
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

// Handle bottle click event (filling the bottles)
bottles.forEach(bottle => {
  bottle.addEventListener('click', () => {
    if (!isGameRunning) return;

    let color = colorPicker.value;
    let currentHeight = parseFloat(getComputedStyle(bottle.querySelector('::after')).height) || 0;

    if (currentHeight < 100) {
      bottle.querySelector('::after').style.height = `${currentHeight + 20}%`;
      bottle.style.backgroundColor = color;
      score++;
      updateScore();
    }
  });
});

// Handle Redirection every 15 seconds
function handleGameInterval() {
  const externalUrl = "https://www.example.com";  // Replace with your desired URL
  window.open(externalUrl, '_blank');
}

// Optional: Implement AdSpace for ads (placeholder for integration)
adSpace.innerHTML = `
  <p>Ad Placeholder: <a href="https://www.example.com" target="_blank">Click here for offers</a></p>
`;
