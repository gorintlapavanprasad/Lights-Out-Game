document.addEventListener('DOMContentLoaded', function () {
  const boardContainer = document.getElementById('board-container');
  const moveCounter = document.getElementById('move-counter');
  const resetButton = document.getElementById('reset-button');

  // Generate a random solvable board
  let moves = 0;
  let board = generateRandomBoard();
  renderBoard(board);
  updateMoveCounter();

  // Add click event listener to each cell
  boardContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('cell')) {
      const row = parseInt(event.target.dataset.row);
      const col = parseInt(event.target.dataset.col);
      toggleLights(board, row, col);
      renderBoard(board);
      updateMoveCounter();

      // Check for win condition
      if (isBoardSolved(board)) {
        showWinAnimation();
      }
    }
  });

  // Reset button click event listener
  resetButton.addEventListener('click', function () {
    resetGame();
  });

  // Function to generate a random solvable board
  function generateRandomBoard() {
    const size = 5; // Adjust the size of the board as needed
    const board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.random() > 0.5)
    );
    return board;
  }

  // Function to toggle lights when a cell is clicked
  function toggleLights(board, row, col) {
    const directions = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];

    directions.forEach((dir) => {
      const newRow = row + dir.row;
      const newCol = col + dir.col;
      if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
        board[newRow][newCol] = !board[newRow][newCol];
      }
    });

    moves++; // Increment moves on a valid move
  }

  // Function to check if the board is solved
  function isBoardSolved(board) {
    return board.every((row) => row.every((cell) => !cell));
  }

  // Function to render the board
  function renderBoard(board) {
    boardContainer.innerHTML = '';
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const cell = document.createElement('div');
        cell.className = `cell ${board[row][col] ? 'is-off' : ''}`;
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.innerText = board[row][col] ? 'X' : '';
        boardContainer.appendChild(cell);
      }
    }
  }

  // Function to show win animation
  function showWinAnimation() {
    // Add your custom win animation here (e.g., fade out the board, display confetti, etc.)
    // You can use CSS animations or external libraries for more advanced effects.
    boardContainer.classList.add('win-animation');
    setTimeout(() => {
      window.alert('You win!');
      // Reset the game
      resetGame();
    }, 1000); // Adjust the timeout based on your animation duration
  }

  // Function to reset the game
  function resetGame() {
    moves = 0;
    board = generateRandomBoard();
    renderBoard(board);
    boardContainer.classList.remove('win-animation');
    updateMoveCounter();
  }

  // Function to update the move counter in the HTML
  function updateMoveCounter() {
    moveCounter.textContent = moves;
  }
});
