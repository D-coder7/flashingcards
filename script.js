// Global Variables
var gameBoard = document.getElementById('gameBoard');
var blocks = [];
var pattern = [];
var score = 0;

// Create game board
for (var i = 0; i < 16; i++) {
  var block = document.createElement('div');
  block.className = 'block';
  block.addEventListener('click', checkPattern);
  gameBoard.appendChild(block);
  blocks.push(block);
}

// Generate a random pattern
function generatePattern() {
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].style.backgroundColor = 'lightgray';
  }
  pattern = [];
  for (var i = 0; i < 2; i++) {
    var index = Math.floor(Math.random() * blocks.length);
    pattern.push(index);
  }
}

// Show the pattern to the player
function showPattern() {
  for (var i = 0; i < pattern.length; i++) {
    var index = pattern[i];
    blocks[index].style.backgroundColor = 'green';
  }
  setTimeout(hidePattern, 750);
}

// Hide the pattern from the player
function hidePattern() {
  for (var i = 0; i < pattern.length; i++) {
    var index = pattern[i]
    blocks[index].style.backgroundColor = 'lightgray';
  }
}

// Check the player's input against the pattern
function checkPattern(event) {
  var clickedBlock = event.target;
  var index = blocks.indexOf(clickedBlock);
  if (pattern.indexOf(index) != -1) {
    var ind = pattern.indexOf(index)
    pattern.splice(ind, 1);
    clickedBlock.style.backgroundColor = 'green';
    score += 10;
    document.getElementById('score').innerText = 'Score: ' + score;
    if (pattern.length === 0) {
      alert('Congratulations! You cleared the level.');
      generatePattern();
      score += 50;
      document.getElementById('score').innerText = 'Score: ' + score;
      setTimeout(showPattern, 2000);
    }
  } else {
    alert('Game Over! Please try again.');
    generatePattern();
    score = 0;
    document.getElementById('score').innerText = 'Score: ' + score;
    setTimeout(showPattern, 2000);
  }
}

// Arrange the blocks in a 4x4 grid layout
function arrangeBlocks() {
  gameBoard.style.width = '240px'; // Adjust the width for the grid layout
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].style.width = '50px';
    blocks[i].style.height = '50px';
    blocks[i].style.margin = '5px';
    blocks[i].style.float = 'left';
  }
}

// Start the game
document.getElementById('startButton').addEventListener('click', function() {
  generatePattern();
  score = 0;
  document.getElementById('score').innerText = 'Score: ' + score;
  showPattern();
});

// Arrange the blocks in a 4x4 grid layout when the page loads
arrangeBlocks();
