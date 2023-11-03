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
      const playerSelection = button.id;

      // Get the computer's selection.
      const computerSelection = getComputerChoice();

      // Check if the game has already ended (after 5 rounds).
      if (roundsPlayed >= 5) {
        return;
      }

      // Increment the rounds played.
      roundsPlayed++;

      //
      // Determine the winner of the round.
      const roundWinner = determineWinner(playerSelection, computerSelection);

      // Display the round result in the DOM.
      displayRoundResult(playerSelection, computerSelection, roundWinner);

      // Update the player's and computer's wins.
      if (roundWinner === "Player wins") {
        playerWins++;
      } else if (roundWinner === "Computer wins") {
        computerWins++;
      }

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

function displayRoundResult(playerSelection, computerSelection, roundWinner) {
  // Display the round result in the DOM.
  const resultsDiv = document.querySelector("#results");
  resultsDiv.innerHTML += `
  <p>Player selected ${playerSelection}.</p>
  <p>Computer selected ${computerSelection}.</p>
  <p>${roundWinner}</p>
  `;
}

function displayGameResults(playerWins, computerWins) {
  // Display the overall results of the game in the DOM.
  const resultsDiv = document.querySelector("#results");
  resultsDiv.innerHTML += `
    <p>Player wins: ${playerWins}</p>
    <p>Computer wins: ${computerWins}</p>
  `;

  // Determine the game winner.
  let gameResult = "";
  if (playerWins > computerWins) {
    gameResult = "Congratulations! You win the game!";
  } else if (computerWins > playerWins) {
    gameResult = "Computer wins the game!";
  } else {
    gameResult = "It's a tie! No overall winner.";
  }

  resultsDiv.innerHTML += `<p>${gameResult}</p>`;
}

// Start the game when the first button is pressed.
startGame();
