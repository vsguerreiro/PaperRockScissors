// Keep track of the player's and computer's wins.
let playerWins = 0;
let computerWins = 0;
let roundsPlayed = 0;

// Function to start the game and handle each round.
function startGame() {

  // Get the player's selection.
  const choiceButtons = document.querySelectorAll(".choice-button");
  choiceButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Check if the game has already ended (after 5 rounds).

      // Increment the rounds played.
      roundsPlayed++;
      
      if (roundsPlayed > 5) {
        displayGameResults(roundsPlayed);
      }
      
      const playerSelection = button.id;

      // Get the computer's selection.
      const computerSelection = getComputerChoice();
      
      // Determine the winner of the round.
      const roundWinner = determineWinner(playerSelection, computerSelection);

      // Update the player's and computer's wins.
      if (roundWinner === "Player wins") {
        playerWins++;
      } else if (roundWinner === "Computer wins") {
        computerWins++;
      }

      // Display the round result in the DOM.
      displayRoundResult(playerSelection, computerSelection, roundWinner);

      // Check if the game is over after this round.
      if (roundsPlayed === 5) {
        displayGameResults(playerWins, computerWins);
        // Remove event listeners from choice buttons to prevent further selection.
        choiceButtons.forEach((button) => {
          button.removeEventListener("click", function (e) {});
        });
      }
    });
  });
}

function getComputerChoice() {
  // Generate a random number between 0 and 2.
  const choice = Math.floor(Math.random() * 3);

  // Convert the random number to a rock, paper, or scissors selection.
  switch (choice) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
  }
}

function determineWinner(playerSelection, computerSelection) {
  // Compare the player's and computer's selections to determine the winner.
  if (playerSelection === computerSelection) {
    return "Tie";
  } else if (playerSelection === "rock") {
    if (computerSelection === "paper") {
      return "Computer wins";
    } else {
      return "Player wins";
    }
  } else if (playerSelection === "paper") {
    if (computerSelection === "scissors") {
      return "Computer wins";
    } else {
      return "Player wins";
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "rock") {
      return "Computer wins";
    } else {
      return "Player wins";
    }
  } else {
    // This should never happen.
    return "Invalid selection";
  }
}

// In the displayRoundResult function, update the round result in the DOM.
function displayRoundResult(playerSelection, computerSelection, roundWinner) {
  // Check if the game is over after this round.
  if (isGameOver()) {
    displayGameResults(playerWins, computerWins);
    // Show the "Game Over" button when the game ends.
    gameOverButton.style.display = "block";
    // Remove event listeners from choice buttons to prevent further selection.
    choiceButtons.forEach((button) => {
      button.removeEventListener("click", function (e) {});
    });
      
  } else {
    // Display the round result and updated scores in the DOM.
    const roundsPlayedInElement = document.querySelector("#roundsPlayed");
    const playerScoreElement = document.querySelector("#playerScore");
    const computerScoreElement = document.querySelector("#computerScore");
    const roundResultElement = document.querySelector("#roundResult");

    roundsPlayedInElement.textContent = roundsPlayed;
    playerScoreElement.textContent = playerWins;
    computerScoreElement.textContent = computerWins;

    roundResultElement.textContent = `Player selected ${playerSelection}, Computer selected ${computerSelection}. ${roundWinner}`;
  }
}

function displayGameResults(playerWins, computerWins) {
  // Display the final game result in the DOM.
  const gameResultElement = document.querySelector("#gameResult");

  if (playerWins > computerWins) {
    gameResultElement.textContent = "Congratulations! You win the game!";
  } else if (computerWins > playerWins) {
    gameResultElement.textContent = "Computer wins the game!";
  } else {
    gameResultElement.textContent = "It's a tie! No overall winner.";
  }
}

function resetGame() {
  playerWins = 0;
  computerWins = 0;
  roundsPlayed = 0;
  // Clear the round result and game result in the DOM.
  const roundResultElement = document.querySelector("#roundResult");
  const gameResultElement = document.querySelector("#gameResult");
  roundResultElement.textContent = "";
  gameResultElement.textContent = "";
  // Reset the scores in the DOM.
  const roundsPlayedInElement = document.querySelector("#roundsPlayed");
  const playerScoreElement = document.querySelector("#playerScore");
  const computerScoreElement = document.querySelector("#computerScore");
  roundsPlayedInElement.textContent = roundsPlayed;
  playerScoreElement.textContent = playerWins;
  computerScoreElement.textContent = computerWins;
  // Add back the click event listeners to the choice buttons.
  const choiceButtons = document.querySelectorAll(".choice-button");
  choiceButtons.forEach((button) => {
    button.addEventListener("click", startGame);
  });
  // Hide the "Game Over" button again when the game is reset.
  const gameOverButton = document.getElementById("gameOverButton");
  gameOverButton.style.display = "none";
  startGame();
}

// Function to check if the game is over.
function isGameOver() {
  return roundsPlayed === 5;
}

// Add a click event listener to the "Game Over" button to reset the game.
const gameOverButton = document.getElementById("gameOverButton");
gameOverButton.addEventListener("click", resetGame);


// Start the game when the first button is pressed.
startGame();

