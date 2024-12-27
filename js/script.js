const YOU_LOSE = 'You Lose';
const YOU_WIN = 'You Win';
const TIE = 'TIE';

const score = {
    wins: 0,
    losses: 0,
    ties: 0
}; 

function getComputerMove() {
    const randomNumber = Math.random(); 
    let computerMove = '';

    if (randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    return computerMove;
}

function getGameResult(playerChoice, computerMove) {
    if (playerChoice === computerMove) {
        return TIE;
    } else if (
        (playerChoice === 'rock' && computerMove === 'scissors') ||
        (playerChoice === 'paper' && computerMove === 'rock') ||
        (playerChoice === 'scissors' && computerMove === 'paper')
    ) {
        return YOU_WIN;
    }

    return YOU_LOSE;
}

function handleScore(result) {
    if (result === YOU_WIN) {
        score.wins++;
    } else if (result === YOU_LOSE) {
        score.losses++;
    } else {
        score.ties++;
    }
}

function getMessageForUser(playerChoice, computerMove, result) {
    return `You picked ${playerChoice}. Computer picked ${computerMove}. ${result}.
Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function playGame(playerChoice) {
    if (!['rock', 'paper', 'scissors'].includes(playerChoice)) {
        alert('Invalid choice. Please select rock, paper, or scissors.');
        return;
    }

    const computerMove = getComputerMove();
    const result = getGameResult(playerChoice, computerMove);

    handleScore(result);

    // Display the result in the message element
    const messageElement = document.getElementById('gameMessage');
    if (messageElement) {
        messageElement.textContent = getMessageForUser(playerChoice, computerMove, result);
    } else {
        console.error('Message element not found.');
    }

    if(result === YOU_WIN) {
        confetti({
            spread: 270,
            angle:90,
            particleCount: 1000,
        });
    }
}
  
function toggleTheme() {
    const themeIcon = document.getElementById("themeIcon");
    const currentSrc = themeIcon.getAttribute("src");

    // Toggle between sun and moon images
    if (currentSrc === "assets/sun.png") {
        themeIcon.setAttribute("src", "assets/moon.png");
        themeIcon.setAttribute("alt", "light mode");
        document.body.classList.add("dark-mode");
    } else {
        themeIcon.setAttribute("src", "assets/sun.png");
        themeIcon.setAttribute("alt", "dark mode");
        document.body.classList.remove("dark-mode");
    }
}

