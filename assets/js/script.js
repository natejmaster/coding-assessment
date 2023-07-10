//Variables that must be declared to be acted upon
let startButton = document.querySelector("#start-button");
let timeRemaining = document.querySelector("#time-remaining");
let questionEl = document.querySelector("#question");
let answersList = document.querySelector("#answers");
let correctAnswer = "";

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

  //Set the correctAnswer variable as the first answer in the answers array.
  correctAnswer = answers[0];
  // Shuffle the answers array
  let shuffledAnswers = shuffleArray(answers);

  // Create buttons for each answer that will show up in a random order
  shuffledAnswers.forEach(function (answer) {
    let button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-choice");
    answersList.appendChild(button);
  });
}

//Shuffle the answers relatively randomly using a Fisher-Yates shuffle (researched on Stack Overflow: https://stackoverflow.com/questions/59810241/how-to-fisher-yates-shuffle-a-javascript-array)
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

  //Creates an array of possible questions
  let questions = [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5"
  ];
  //Creates an array of possible answers for each question (these are linked to the corresponding questions in the array above-- i.e. they have the same index)
  let answers = [
    ["Q1A1", "Q1A2", "Q1A3", "Q1A4"],
    ["Q2A1", "Q2A2", "Q2A3", "Q2A4"],
    ["Q3A1", "Q3A2", "Q3A3", "Q3A4"],
    ["Q4A1", "Q4A2", "Q4A3", "Q4A4"],
    ["Q5A1", "Q5A2", "Q5A3", "Q5A4"],
  ];
  //Randomly chooses a number based on the Math.floor and Math.random elements multiplied by the length of the array.
  let randomIndex = Math.floor(Math.random() * questions.length);
  //The question is whichever index # was just selected
  let question = questions[randomIndex];
  //The answers are the array of four choices based on the index # just selected.
  let answerOptions = answers[randomIndex];

  displayQuestion(question, answerOptions);
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
        //This alerts the player  that they got the question wrong.
      window.alert("Incorrect!");
    }
  }
});