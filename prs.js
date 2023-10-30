game();RemotePlayback
function game() {
  // Keep track of the player's and computer's wins.
  let playerWins = 0;
  let computerWins = 0;

  // Play five rounds of the game.
  for (let i = 0; i < 5; i++) {
    // Get the player's and computer's selections.
    const playerSelection = prompt('Rock, paper, or scissors?');
    const computerSelection = getComputerChoice();

    // Determine the winner of the round.
    const roundWinner = determineWinner(playerSelection, computerSelection);

    // Display the round result.
    displayRoundResult(playerSelection, computerSelection, roundWinner);

    // Update the player's and computer's wins.
    if (roundWinner === 'Player wins') {
      playerWins++;
    } else if (roundWinner === 'Computer wins') {
      computerWins++;
    }
  }

  // Display the overall results of the game.
  if (playerWins > computerWins) {
    console.log('Player wins the game!');
  } else if (computerWins > playerWins) {
    console.log('Computer wins the game!');
  } else {
    console.log('The game is tied!');
  }
}

function getComputerChoice() {
  // Generate a random number between 0 and 2.
  const choice = Math.floor(Math.random() * 3);

  // Convert the random number to a rock, paper, or scissors selection.
  switch (choice) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
    default:
      // This should never happen.
      return 'unknown';
  }
}

function determineWinner(playerSelection, computerSelection) {
  // Compare the player's and computer's selections to determine the winner.
  if (playerSelection === computerSelection) {
    return 'Tie';
  } else if (playerSelection === 'rock') {
    if (computerSelection === 'paper') {
      return 'Computer wins';
    } else {
      return 'Player wins';
    }
  } else if (playerSelection === 'paper') {
    if (computerSelection === 'scissors') {
      return 'Computer wins';
    } else {
      return 'Player wins';
    }
  } else if (playerSelection === 'scissors') {
    if (computerSelection === 'rock') {
      return 'Computer wins';
    } else {
      return 'Player wins';
    }
  } else {
    // This should never happen.
    return 'Invalid selection';
  }
}

function displayRoundResult(playerSelection, computerSelection, roundWinner) {
  console.log(`Player selected ${playerSelection}.`);
  console.log(`Computer selected ${computerSelection}.`);
  console.log(`${roundWinner}`);
}
