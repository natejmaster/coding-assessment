//Variables that must be declared to be acted upon
let startButton = document.querySelector("#start-button")
let timeRemaining = document.querySelector("#time-remaining")
let questionEl = document.querySelector("#question")
let answersList = document.querySelector("#answers")


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
//Function that displays the question and a randomized set of answers
function displayQuestion(question, answers) {
    questionEl.textContent = question;

    //Clear previous answers
    answersList.innerHTML = "";

    // Shuffle the answers array
    let shuffledAnswers = shuffleArray(answers);

    // Create list items for each answer
    shuffledAnswers.forEach(function (answer) {
        let li = document.createElement("li");
        li.textContent = answer;
        answersList.appendChild(li);
        });
}
//Shuffle the answers randomly to match the question
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//Event listener for the Start Button that runs the countdown function when the Start Button is clicked
startButton.addEventListener('click', function () {
    countdown();
    
    let questions = [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5"
    ];

    let answers = [
        ["Q1A1", "Q1A2", "Q1A3","Q1A4"],
        ["Q2A1", "Q2A2", "Q2A3","Q2A4"],
        ["Q3A1", "Q3A2", "Q3A3","Q3A4"],
        ["Q4A1", "Q4A2", "Q4A3","Q4A4"],
        ["Q5A1", "Q5A2", "Q5A3","Q5A4"],
    ];

    let randomIndex = Math.floor(Math.random() * questions.length);
    let question = questions[randomIndex];
    let answerOptions = answers[randomIndex];
    
    displayQuestion(question, answerOptions);
});
    //When the start game button is clicked, the first question needs to appear in the question box

//When a question is answered, a few things need to happen
    //The question needs to be ruled correct or incorrect
    //If the answer is correct, the next question needs to appear
    //If the answer is incorrect, time should be deducted from the timer AND the next question needs to appear

//When all questions are answered or the timer reaches 0, the game ends

//When the game ends, the user can save their initials and score in local storage

//All scores stored in local storage should be rendered on a "high score" screen.