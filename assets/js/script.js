//Variables that must be declared to be acted upon
let startButton = document.querySelector("#start-button")
let timeRemaining = document.querySelector("#time-remaining")


//Countdown function that runs the 60 second timer for the game
function countdown() {
    let timer = 60;
    let runningTimer = setInterval(function () {
    timer--;
    timeRemaining.textContent = timer;
    
    if (timer === 0) {
        clearInterval(runningTimer);
    }
    }, 1000);
    }
//Event listener for the Start Button that runs the countdown function when the Start Button is clicked
startButton.addEventListener('click', function() {
    countdown();
});
    //When the start game button is clicked, the first question needs to appear in the question box

//When a question is answered, a few things need to happen
    //The question needs to be ruled correct or incorrect
    //If the answer is correct, the next question needs to appear
    //If the answer is incorrect, time should be deducted from the timer AND the next question needs to appear

//When all questions are answered or the timer reaches 0, the game ends

//When the game ends, the user can save their initials and score in local storage

//All scores stored in local storage should be rendered on a "high score" screen.