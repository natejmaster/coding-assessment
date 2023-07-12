//Variables that must be declared to be acted upon
let startButton = document.querySelector("#start-button");
let clearScoresButton = document.querySelector("#clear-scores-button");
let timeRemaining = document.querySelector("#time-remaining");
let questionEl = document.querySelector("#question");
let answersList = document.querySelector("#answers");
let highScoresList = document.querySelector("#high-scores");
let questionBox = document.querySelector("#question-box");
let timerBox = document.querySelector("#timer-box");
//Empty variables that will be declared later in the algorithm
let correctAnswer = "";
let timerInterval;
//Creates an array of possible questions
let questions = [
  "Which of the following coding languages is most exclusively associated with the styling and appearance of a website?",
  "Where in a website's HTML should the script element that contains the link to the JavaScript document be located?",
  "Which of the following is NOT a primitive data type?",
  "If the value assigned to an object has [] on both sides of it, then that value is also known as a(n) _________.",
  "Which of the following would be the appropriate way to call a function titled playFunction in JavaScript?"
];
//Creates an array of possible answers for each question (these are linked to the corresponding questions in the array above-- i.e. they have the same index)
let answers = [
  ["CSS", "HTML", "JavaScript", "Python"],
  ["At the bottom of the body element", "At the top of the body element ", "At the top of the head element", "At the bottom of the head element"],
  ["Variable", "Boolean", "String", "Number"],
  ["Array", "Function", "Object", "Variable Pair"],
  ["playFunction()", "()playFunction", "PlayFunction()", "play-function()"],
];
//Starts with the first question so the game can increment after each answer
let currentQuestionIndex = 0;
//Countdown function that runs the 60 second timer for the game
function countdown() {
  timer = 60;
  timerInterval = setInterval(function () {
    timer--;
    timeRemaining.textContent = timer;

    if (timer === 0) {
      clearInterval(timerInterval);
      window.alert("Game Over!");
      renderHighScores();
    }
  }, 1000);
}

//Function that displays the question and corresponding answers in a random order
function displayQuestion() {
  //Matches current question to current answer set
  let question = questions[currentQuestionIndex];
  let answerOptions = answers[currentQuestionIndex];
  //Points out that the correct answer will always be the first answer from each set in the initial declaration of the array.
  correctAnswer = answerOptions[0];
  //Renders the question and answers
  questionEl.textContent = question;
  answersList.innerHTML = "";
// Declares variable shuffledAnswers that will create the four answer buttons
  let shuffledAnswers = shuffleArray(answerOptions);
//Each answer gets its own corresponding button
  shuffledAnswers.forEach(function (answer) {
    let button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-choice");
    //The buttons are appended to a list of answers
    answersList.appendChild(button);
  });
}

//Shuffle the answers relatively randomly using a Fisher-Yates shuffle (researched on Stack Overflow: https://stackoverflow.com/questions/59810241/how-to-fisher-yates-shuffle-a-javascript-array)
function shuffleArray(array) {
  //Uses a for loop to run through the possible answer options until none remain
  for (let i = array.length - 1; i > 0; i--) {
    //Uses a combination of Math.floor and Math.Random methods to choose one of the remaining answers to be rendered
    let j = Math.floor(Math.random() * (i + 1));
    //Replaces the order each answer is displayed in the original array display
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Event listener for the Start Button that runs the countdown function when the Start Button is clicked
startButton.addEventListener('click', function () {
  //This hides the start button and the clear high scores button during the game
  startButton.style.display = 'none';
  clearScoresButton.style.display = 'none';
  highScoresList.innerHTML = '';
  //Once the Start Game button is pressed, the timer begins counting down and the first question is displayed.
  countdown();
  displayQuestion();
  questionBox.style.display = "block";
  timerBox.style.display = "block";
});

//Event listener for the Clear Scores Button that clears high scores from localStorage:
clearScoresButton.addEventListener("click", function () {
  //Empties local storage and removes all entries from the high score list
  localStorage.removeItem("highScores");
  highScoresList.innerHTML = "";
});

//Adds an event listener for each button
answersList.addEventListener('click', function (event) {
  //This targets the correct button
  let clickedElement = event.target;
  //This code verifies that the button i'm clicking is an 'answer-choice' button
  if (clickedElement.matches('.answer-choice')) {
    let selectedAnswer = clickedElement.textContent;
    //This checks if the selected answer matches the correct answer
    if (selectedAnswer === correctAnswer) {
      //This alerts the player that they've gotten the question correct
      window.alert("Correct!");
    } else {
      //This alerts the player  that they got the question wrong and subtracts 5 seconds from the timer
      window.alert("Incorrect!");
      timer -= 5;
      timer = Math.max(timer, 0);
      timeRemaining.textContent = timer;
    }
    //Increment the current question
    currentQuestionIndex++;
    // Check if there are more questions available
    if (currentQuestionIndex < questions.length) {
      // Display the next question
      displayQuestion();
    } else {
      // When there are no more questions, the game is over, the user is alerted as such, and the timer is cleared
      window.alert("Game Over!");
      clearInterval(timerInterval);
      //The user is prompted by a window.prompt to enter their initials
      const initials = prompt("Enter your initials for the High Score Board");
      //If the user enters their initials, a score is rendered based on how much time it took to complete the quiz (with penalties for incorrect answers)
      if (initials) {
        //An object is created with two values: the initials, and the time
        const timeEntry = { initials, time: 60 -timer };
        //The high score is moved through the JavaScript and transformed back into a string as it is pushed into the high score list
        let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        highScores.push(timeEntry);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        showHighScores();
    }
  }
}
});

// Function to render the high scores
function renderHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.forEach(function (score) {
    const listItem = document.createElement("li");
    listItem.textContent = `${score.initials}: ${score.time}`;
    highScoresList.appendChild(listItem);
  });
}

// Function to display the high scores
function showHighScores() {
  questionBox.style.display = "none";
  timerBox.style.display = "none";
  startButton.style.display = "block";
  clearScoresButton.style.display = "block";
  highScoresList.innerHTML = "";
  renderHighScores();
}

// Initial rendering of high scores
renderHighScores();