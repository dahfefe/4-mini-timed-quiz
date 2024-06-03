
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
const questionContainer = document.getElementById("questionContainer");
const questionText = document.getElementById("question");
const scoreboard = document.getElementById("scoreboard");
const startPage = document.getElementById("start-page");

const choiceA = document.getElementById("choiceA");
const choiceB = document.getElementById("choiceB");
const choiceC = document.getElementById("choiceC");
const choiceD = document.getElementById("choiceD");
const wrongAnswerDisplay = document.getElementById("wrong-answer");
const correctAnswerDisplay = document.getElementById("correct-answer");

const initialPage = document.getElementById("enter-initials-page");

const goBackButton = document.getElementById("go-back-button")
const clearButton = document.getElementById("clear-button")
const highScoreText =document.getElementById("high-scores-display")

let currentQuestion = 0; // Keeps track of the current question
let timerId;
let score = 0;

// coding quiz questions
let questions = [  
  { 
    question: "Commonly used data types DO NOT include:", 
    answer: "C)  alerts", 
    choices: ["A)  strings", "B)  booleans", "C)  alerts", "D)  numbers"] 
  },
  { 
    question: "The condition in an if / else statement is enclosed within _____.", 
    answer: "C)  parentheses", 
    choices: ["A)  quotes", "B)  curly brackets", "C)  parentheses", "D)  square brackets"] 
  },
  { 
    question: "Arrays in JavaScript can be used to store _____.", 
    answer: "D)  all of the above", 
    choices: ["A)  numbers and strings", "B)  other arrays", "C)  booleans", "D)  all of the above"] 
  },
  { 
    question: "Will the grader give this assignment 100/100?", 
    answer: "D)  most definitely", 
    choices: ["A)  possibly", "B)  no, this assignment came out terrible", "C)  I have to think about it", "D)  most definitely"] 
  },
];
console.log(questions)

// timer function
function startTimer() {
  // set starting time for 60 seconds
  let remainingTime = 60;
  timerId = setInterval(function() {
    remainingTime--;
    timerElement.textContent = remainingTime;
    // if time runs out, end the quiz and return time to 60 seconds
    if (remainingTime === 0) {
      clearInterval(timerId);
      gameOver();
    }
  }, 1000);
}

function showQuestion() {
  
  if (currentQuestion < questions.length) {
    startPage.style.display = "none";
    questionText.style.display = "block";
    choiceA.style.display = "inline-block";
    choiceB.style.display = "inline-block";
    choiceC.style.display = "inline-block";
    choiceD.style.display = "inline-block";
  } else {
    startPage.style.display = "none";
    gameOver();
  } 
  
  const questionDisplayedNow = questions[currentQuestion];
  questionText.textContent = questionDisplayedNow.question;
  
  const choices = questionContainer.querySelectorAll("button");
  for (let i = 0; i < choices.length; i++) {
    const userSelection = questionDisplayedNow.choices[i];
    choices[i].textContent = questionDisplayedNow.choices[i];
    choices[i].addEventListener("click", function() {
      checkAnswer(userSelection);
    });
  }
}

function checkAnswer(userSelection) {
  if (userSelection === questionDisplayedNow.answer) {
    // If user selects a correct answer, increase score by 5
    score += 5;
    // If answer is correct display 'Correct Answer!" for one second
    correctAnswerDisplay.classList.remove("hidden");
    setTimeout(() => {
        correctAnswerDisplay.classList.add("hidden");
    }, 1000);
  } else {
    // If answer is wrong display 'Wrong Answer!" for one second
    wrongAnswerDisplay.classList.remove("hidden");
    setTimeout(() => {
        wrongAnswerDisplay.classList.add("hidden");
    }, 1000);

    // When user selects the wrong answer, then time is subtracted from the clock by -10 seconds
    remainingTime = remainingTime - 10  
  }
  currentQuestion++;
  showQuestion();
}

function gameOver() {
  clearInterval(timerId);
  startButton.style.display = "none";
  questionText.style.display = "none";
  choiceA.style.display = "none";
  choiceB.style.display = "none";
  choiceC.style.display = "none";
  choiceD.style.display = "none";
  initialPage.style.display = "block";

  // scoreboard.textContent = `Your Score: ${score}`;
  // You can implement high score storage here (local storage, database etc.)
}

startButton.addEventListener("click", function() {
  currentQuestion++;
  showQuestion();
  startTimer();
});

