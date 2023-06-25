// Global Variables
var gameBoard = document.getElementById('gameBoard');
var blocks;
var pattern;
var score;
var level;
var max_pattern_length;
var grid_col_size;
var grid_row_size;

// Add blocks to game board
function addBlocks(no_of_Blocks) {
  for (var i = 0; i < no_of_Blocks; i++) {
    var block = document.createElement('img');
    block.className = 'block';
    block.addEventListener('click', checkPattern);
    gameBoard.appendChild(block);
    blocks.push(block);
  }
}

// Arrange the blocks in a grid layout
// function arrangeBlocks() {
//   gameBoard.style.width = '0px'; // Adjust the width for the grid layout
//   for (var i = 0; i < blocks.length; i++) {
//     blocks[i].style.width = '50px';
//     blocks[i].style.height = '50px';
//     blocks[i].style.margin = 'auto auto';
//     blocks[i].style.float = 'center';
//   }
// }

// Generate random pattern
function generatePattern() {
  for (var i = 0; i < max_pattern_length; i++) {
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
    blocks[index].style.background = '#900056';
  }
  setTimeout(hidePattern, 750);
}

// Hide pattern from the player
function hidePattern() {
  for (var i = 0; i < pattern.length; i++) {
    var index = pattern[i]
    blocks[index].style.background = '#C69EF8';

  }
}

// Check player's input against the pattern
function checkPattern(event) {
  var clickedBlock = event.target;
  var index = blocks.indexOf(clickedBlock);
  if (pattern.indexOf(index) != -1) {
    var ind = pattern.indexOf(index)
    pattern.splice(ind, 1);
    clickedBlock.style.background = '#900056';
    clickedBlock.removeEventListener('click', checkPattern);
    score += 10;
    document.getElementById('score').innerText = 'Score: ' + score;
    if (pattern.length === 0) {
      alert('Congratulations! You cleared the level.');
      nextLevel();
    }
  } else {
    location.href = "game-over.html";
  }
}

// Next level
function nextLevel() {
  if (level === 15){
    location.href = "congratulations.html";
  }
  else{
    if (level%2 === 0){
      if (level%4 === 0) {
        grid_col_size += 1;
        gameBoard.style.gridTemplateColumns = "repeat(" + grid_col_size + ", 1fr)";
      }
      else{
        grid_row_size += 1;
        gameBoard.style.gridTemplateRows = "repeat(" + grid_row_size + ", 1fr)";
      }
      max_pattern_length += 1;
    }
    score += 50;
    level += 1;
    goToLevel(grid_row_size, grid_col_size);
  }
}

// Go to level
function goToLevel(rows, columns){
  // document.getElementById('startButton').innerText = 'Restart';
  gameBoard.innerHTML = "";
  blocks = [];
  pattern = [];
  gameBoard.style.gridTemplateColumns = "repeat(" + columns + ", 1fr)";
  gameBoard.style.gridTemplateRows = "repeat(" + rows + ", 1fr)";
  // gameBoard.setAttribute('margin', 'auto auto');
  document.getElementById('score').innerText = 'Score: ' + score;
  document.getElementById('level').innerText = 'Level: ' + level + " /15";
  gameBoard.style.marginLeft = -40*columns + 'px';
  gameBoard.style.marginTop = -40*rows + 'px';
  addBlocks(rows*columns);
  // arrangeBlocks();
  generatePattern();
  setTimeout(showPattern, 500);
}

// Restart the game
function restartGame() {
  score = 0;
  level = 1;
  max_pattern_length = 3;
  grid_col_size = 3;
  grid_row_size = 3;
  goToLevel(grid_row_size, grid_col_size);
}

document.getElementById('startButton').addEventListener('click', restartGame);

restartGame();