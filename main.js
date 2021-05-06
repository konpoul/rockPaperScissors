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
let button = document.querySelector(".btn");
let playing = true;

// Initialization function
const init = function () {
  playing = true;
  userScore = 0;
  compScore = 0;
  score = 0;
  round_span.textContent = score;
  for (let i = 0; i < 3; i++) points_div.children[i].style.color = "";
  for (let i = 0; i < 3; i++) points_div2.children[i].style.color = "";
  questionmarkImage.src = `questionmark.png`;
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
  console.log("User " + userPick);
  console.log("computer " + computerPick);

  if (playing) {
    let isWin;
    let tie;
    if (userPick === computerPick) tie = true;
    else if ((userPick - computerPick) % 3 == 1) isWin = true;
    else if ((userPick - computerPick) % 3 == -2) isWin = true;
    else isWin = false;

    if (tie === true) {
      console.log("tie");
    } else if (isWin === true) {
      console.log("won");
      points_div.children[userScore].style.color = "red";
      userScore++;
    } else if (!isWin) {
      points_div2.children[compScore].style.color = "red";
      console.log("lost");
      compScore++;
    }

    // Counting rounds
    let roundCound = parseInt(round_span.textContent);
    roundCound++;
    round_span.textContent = roundCound;
  }
  // Messages when game ends
  endGameMessage();
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

// Play again button
button.addEventListener("click", function () {
  init();
});

// End game message function
const endGameMessage = () => {
  if (userScore === 3)
    alert(
      `You won with score ${userScore}:${compScore} press play again button`
    );
  else if (compScore === 3)
    alert(
      `You lost with score ${userScore}:${compScore} press play again button`
    );

  if (userScore === 3 || compScore == 3) playing = false;
};
