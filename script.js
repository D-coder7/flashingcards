// Global Variables
var gameBoard = document.getElementById('gameBoard');
var blocks;
var pattern;
var score;
var level;
var pattern_length;
var grid_size;

// Add blocks to game board
function addBlocks(no_of_Blocks) {
  for (var i = 0; i < no_of_Blocks; i++) {
    var block = document.createElement('div');
    block.className = 'block';
    block.addEventListener('click', checkPattern);
    gameBoard.appendChild(block);
    blocks.push(block);
  }
}

// Generate random pattern
function generatePattern() {
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].style.backgroundColor = 'lightgray';
  }
  pattern = [];
  for (var i = 0; i < pattern_length; i++) {
    var index = Math.floor(Math.random() * blocks.length);
    if (pattern.indexOf(index) === -1) { 
      pattern.push(index);
    }
  }
}

// Show pattern to the player
function showPattern() {
  for (var i = 0; i < pattern.length; i++) {
    var index = pattern[i];
    blocks[index].style.backgroundColor = 'green';
  }
  setTimeout(hidePattern, 750);
}

// Hide pattern from the player
function hidePattern() {
  for (var i = 0; i < pattern.length; i++) {
    var index = pattern[i]
    blocks[index].style.backgroundColor = 'lightgray';
  }
}

// Check player's input against the pattern
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
      document.getElementById('startButton').innerText = 'Restart Game';
      if (level%2 === 0){
        if (level%4 === 0) {
          grid_size += 1;
          gameBoard.style.gridTemplateColumns = "repeat(" + grid_size + ", 1fr)";
        }
        addBlocks(grid_size);
        arrangeBlocks();
        pattern_length += 1;
      }
      generatePattern();
      score += 50;
      level += 1;
      document.getElementById('score').innerText = 'Score: ' + score;
      document.getElementById('level').innerText = 'Level: ' + level;
      setTimeout(showPattern, 2000);
    }
  } else {
    alert('Game Over! Please try again.');
    restartGame();
  }
}

// Arrange the blocks in a grid layout
function arrangeBlocks() {
  gameBoard.style.width = '240px'; // Adjust the width for the grid layout
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].style.width = '50px';
    blocks[i].style.height = '50px';
    blocks[i].style.margin = '5px';
    blocks[i].style.float = 'left';
  }
}

// Restart the game
function restartGame() {
  gameBoard.innerHTML = "";
  document.getElementById('startButton').innerText = 'Start Game';
  blocks = [];
  pattern = [];
  score = 0;
  level = 1;
  pattern_length = 3;
  grid_size = 3;
  gameBoard.style.gridTemplateColumns = "repeat(" + grid_size + ", 1fr)";
  document.getElementById('score').innerText = 'Score: ' + score;
  document.getElementById('level').innerText = 'Level: ' + level;
  addBlocks(grid_size**2);
  arrangeBlocks();
  generatePattern();
  showPattern();
}

document.getElementById('startButton').addEventListener('click', restartGame);

// restartGame();
