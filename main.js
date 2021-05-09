"use strict";
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");
let round_span = document.querySelector(".roundCount");
let userScore = 0;
let compScore = 0;
let score = 0;
let points_div = document.querySelector(".points-0");
let points_div2 = document.querySelector(".points-1");
const questionmarkImage = document.querySelector(".quest");
const resultMessage = document.querySelector(".result-message");
let button = document.querySelector(".btn");
let playing = true;
var timeoutID;
var timeoutID2;

// Initialization function
const init = function () {
  playing = true;
  score = 0;
  round_span.textContent = score;
  for (let i = 0; i < 3; i++) points_div.children[i].style.color = "";
  for (let i = 0; i < 3; i++) points_div2.children[i].style.color = "";
  questionmarkImage.src = `questionmark.png`;
  resultMessage.classList.add("hidden");
};

// Computer's pick functionality
function compPick() {
  if (playing) {
    const picks = [0, 1, 2];
    const randomPick = Math.trunc(Math.random() * 3);
    questionmarkImage.src = `choice-${randomPick}.png`;
    return picks[randomPick];
  }
}

// Game functionality
function game(userPick) {
  const computerPick = compPick();

  if (playing) {
    let isWin;
    let tie;
    resultMessage.classList.remove("hidden");
    // tie, win, lose logic
    if (userPick === computerPick) tie = true;
    else if ((userPick - computerPick) % 3 == 1) isWin = true;
    else if ((userPick - computerPick) % 3 == -2) isWin = true;
    else isWin = false;

    // Hearts color turns red in win of each player also win-tie-lose message
    if (tie === true) {
      resultMessage.textContent = "TIE";
    } else if (isWin === true) {
      points_div.children[userScore].style.color = "red";
      userScore++;
      resultMessage.textContent = "WIN";
    } else if (!isWin) {
      points_div2.children[compScore].style.color = "red";
      compScore++;
      resultMessage.textContent = "LOST";
    }

    // Counting rounds
    let roundCount = parseInt(round_span.textContent);
    roundCount++;
    round_span.textContent = roundCount;
  }
  // When score is 3 game ends
  if (userScore === 3 || compScore === 3) {
    endGame();
    playing = false;
    compScore = 0;
    userScore = 0;
  }
}

// Function for user's pick
function userPick() {
  // rock
  rock_div.addEventListener("click", function () {
    game(0);
  });
  // paper
  paper_div.addEventListener("click", function () {
    game(1);
  });
  // scissors
  scissors_div.addEventListener("click", function () {
    game(2);
  });
}

userPick();

// End game with alert delay functionality
const endGame = () => {
  if (userScore === 3)
    timeoutID = window.setTimeout(
      window.alert,
      250,
      `You won with score ${userScore}:${compScore} press play again button`
    );
  else if (compScore === 3)
    timeoutID2 = window.setTimeout(
      window.alert,
      250,
      `You lost with score ${userScore}:${compScore} press play again button`
    );
};

// Play again button
button.addEventListener("click", function () {
  init();
});
