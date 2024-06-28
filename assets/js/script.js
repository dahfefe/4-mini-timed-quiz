
var timerElement = document.querySelector(".timer-count");
var startButton = document.getElementById("start-button");
var highScoresLink = document.querySelector(".view-high-score-button");
const questionContainer = document.getElementById("questionContainer");
const questionText = document.getElementById("question");
const scoreboard = document.getElementById("scoreboard");
const startPage = document.getElementById("start-page");
var gameOverHeading = document.getElementById("game-over-heading");
const quizStart = document.getElementById("start-button");
const questionDisplay = document.getElementById("question");
const answersDisplay = document.getElementById("answers");
const wrongAnswerDisplay = document.getElementById("wrong-answer");
const correctAnswerDisplay = document.getElementById("correct-answer");
const initialPage = document.getElementById("enter-initials-page");
const goBackButton = document.getElementById("go-back-button");
const clearButton = document.getElementById("clear-button");
const highScoreText = document.getElementById("high-scores-display");
const highScoresList = document.getElementById("high-scores");

// Show contents for quiz instructions and "start" button when opening the page
startPage.classList.remove("hidden")

// Keeps track of the current question
let currentQuestionIndex = 0; 
let timerId;
// set starting time for 60 seconds
let remainingTime = 60;
let score = 0;

// coding quiz questions
let questions = [  
  { 
    question: "Commonly used data types DO NOT include:", 
    correctAnswer: "C)  alerts", 
    answers: ["A)  strings", "B)  booleans", "C)  alerts", "D)  numbers"] 
  },
  { 
    question: "The condition in an if / else statement is enclosed within _____.", 
    correctAnswer: "C)  parentheses", 
    answers: ["A)  quotes", "B)  curly brackets", "C)  parentheses", "D)  square brackets"] 
  },
  { 
    question: "Arrays in JavaScript can be used to store _____.", 
    correctAnswer: "D)  all of the above", 
    answers: ["A)  numbers and strings", "B)  other arrays", "C)  booleans", "D)  all of the above"] 
  },
  { 
    question: "Will the grader give this assignment 100/100?", 
    correctAnswer: "D)  most definitely", 
    answers: ["A)  possibly", "B)  no, this assignment came out terrible", "C)  I have to think about it", "D)  most definitely"] 
  },
];
console.log(questions)

// Function initiated when user starts the quiz
function startQuiz() {
  startPage.classList.add("hidden")
  startTimer();
  showQuestion();
  questionContainer.classList.remove("hidden");
}

// timer function
function startTimer() {
  timerId = setInterval(function() {
    remainingTime--;
    timerElement.textContent = remainingTime;
    // if time runs out, end the quiz and return time to 60 seconds
    if (remainingTime <= 0) {
      clearInterval(timerId);
      gameOver();
    }
  }, 1000);
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionDisplay.textContent = currentQuestion.question;
  answersDisplay.innerHTML = ""; 
  var answerOrder;  

  for (let i = 0; i < currentQuestion.answers.length; i++) {
      const answer = currentQuestion.answers[i];
      const button = document.createElement("button");
      answerOrder = i + 1;

      button.textContent = answerOrder +" "+ answer;
      button.addEventListener("click", function() {
          checkAnswer(answer);
      });
      answersDisplay.appendChild(button);
  }
}

function checkAnswer(answer) {
  const currentQuestion = questions[currentQuestionIndex];
  if (answer === currentQuestion.correctAnswer) {
    // If user selects a correct answer, increase score by 1
    score += 1;
    // If answer is correct display 'Correct Answer!" for one second
    correctAnswerDisplay.classList.remove("hidden");
    setTimeout(() => {
        correctAnswerDisplay.classList.add("hidden");
    }, 1000);
    // Move to the next question even if the answer is correct
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
        gameOver();
    }
  } else {
    // If answer is wrong display 'Wrong Answer!" for one second
    wrongAnswerDisplay.classList.remove("hidden");
    setTimeout(() => {
        wrongAnswerDisplay.classList.add("hidden");
    }, 1000);

    // When user answers a question incorrectly, then time is subtracted by -10 seconds
    remainingTime = remainingTime - 10       
    
    // Move to the next question even if the answer is wrong
    currentQuestionIndex++; 
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        gameOver();
    }
  }
}

function gameOver() {
  gameOverHeading.textContent = "";

  if (score < 3 ){
    gameOverHeading.textContent = "You did NOT pass. Please try again!"   
  } else {
    gameOverHeading.textContent = "You passed! Congratulations!"
  }
  
  questionContainer.classList.add("hidden");
  initialPage.classList.remove("hidden");

  clearInterval(timerId);
  initialPage.addEventListener("submit", saveHighScore);
  highScoresLink.classList.remove("hidden");
}

// When user submits intitials, it saves to local storage with both intials and score 
function saveHighScore(event) {
  event.preventDefault();
  const initials = document.getElementById("initials").value.toUpperCase();
  const finishedTime = remainingTime;
  const highScoreData = JSON.parse(localStorage.getItem("Scores")) || [];
  highScoreData.push({ initials, score, finishedTime});
  // Sorted by high scores
  highScoreData.sort((a, b) => b.score - a.score);
  localStorage.setItem("Scores", JSON.stringify(highScoreData));
  displayHighScores();
}

function displayHighScores() {
  initialPage.classList.add("hidden");
  questionContainer.classList.add("hidden");
  highScoresList.classList.remove("hidden")
  goBackButton.classList.remove("hidden")
  clearButton.classList.remove("hidden")
  highScoreText.classList.remove("hidden")
  const highScoreData = JSON.parse(localStorage.getItem("Scores")) || [];
  let html = ''; // Initialize an empty string to store the HTML content
  // Iterate over each item in highScoreData
  for (let i = 0; i < highScoreData.length; i++) {
    const data = highScoreData[i];
    // Concatenate the HTML content for each item
    // html += '<li>' + data.initials + ': <span>' + data.score + ' % </span></li>';

    html += "<li>" + data.initials + ": <span>" + data.score + "/4 </span>" + "  Completed the quiz with: " + data.finishedTime + " seconds remaining</li>";
  }
  // Set the innerHTML of highscoresList with the concatenated HTML
  highScoresList.innerHTML = html;
};

highScoresLink.addEventListener("click", function() {
  initialPage.classList.add("hidden");
  questionContainer.classList.add("hidden");
  highScoresList.classList.remove("hidden");
  // Call displayHighScores to update highScoresList
  displayHighScores(); 
  }
);

function goBack() {
 // Reset variables to initial state
 currentQuestionIndex = 0;
 remainingTime = 60;
 score = 0;
 // Reset timer display
 timerElement.textContent = remainingTime;
 // Show quiz start screen only
 initialPage.classList.add("hidden");
 questionContainer.classList.remove("hidden");
 goBackButton.classList.add("hidden")
 clearButton.classList.add("hidden")
 highScoreText.classList.add("hidden")
 // Clear the high scores list
 highScoresList.innerHTML = "";
}

function clearLocalStorage() {
  //Remove the "Scores" key from local storage
  localStorage.removeItem("Scores");
  // Clear the highScoresList
  highScoresList.innerHTML = ""; 
}

startButton.addEventListener("click", startQuiz);
goBackButton.addEventListener("click", goBack);
clearButton.addEventListener("click", clearLocalStorage);
