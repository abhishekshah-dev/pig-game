"use strict";

//Selecting Elements

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//Starting conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

//switch player functionality

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling Dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3. Check for dailed 1
    if (dice !== 1) {
      //ADD DICE TO CURRENT SCORE
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. ADD CURRENT SCORE TO ACTIVE PLAYER SCORE
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. CHECK IF PLAYER SCORE IS >=100
    if (scores[activePlayer] >= 20) {
      //FINISH THE GAME
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //SWITCH TO THE NEXT PLAYER
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
