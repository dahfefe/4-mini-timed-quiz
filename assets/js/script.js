
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

let currentQuestion = 0; // Keeps track of the current question
let timerId;
let score = 0;

let questions = [  
  { question: "Commonly used data types DO NOT include:", answer: "C", choices: ["A)  strings", "B)  booleans", "C)  alerts", "D)  numbers"] },
  { question: "The condition in an if / else statement is enclosed within _____.", answer: "C", choices: ["A)  quotes", "B)  curly brackets", "C)  parentheses", "D)  square brackets"] },
  { question: "Arrays in JavaScript can be used to store _____.", answer: "D", choices: ["A)  numbers and strings", "B)  other arrays", "C)  booleans", "D)  all of the above"] },
  { question: "Will the grader give this assignment 100/100?", answer: "D", choices: ["A)  possibly", "B)  no, this assignment came out terrible", "C)  I have to think about it", "D)  most definitely"] },
];

function startTimer() {
  let remainingTime = 60;
  timerId = setInterval(function() {
    remainingTime--;
    timerElement.textContent = remainingTime;
    if (remainingTime <= 0) {
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
  }
  
  if (currentQuestion >= questions.length) {
    questionText.textContent = "You have finished the quiz!";
    startPage.style.display = "none";
    gameOver();
    return;
  } 
  
  const questionDisplayedNow = questions[currentQuestion];
  questionText.textContent = questionDisplayedNow.question;
  
  const choices = questionContainer.querySelectorAll("button");
  for (let i = 0; i < choices.length; i++) {
    choices[i].textContent = questionDisplayedNow.choices[i];
    choices[i].addEventListener("click", function() {
      checkAnswer(questionDisplayedNow.answer === this.textContent);
    });
  }
}

function checkAnswer(isCorrect) {
  if (isCorrect) {
    score += 5;
  } else {
    clearInterval(timerId);
    timerId = setInterval(function() {
      let remainingTime = Math.max(0, parseInt(timeLeftSpan.textContent) - 5);
      timeLeftSpan.textContent = remainingTime;
      if (remainingTime <= 0) {
        clearInterval(timerId);
        gameOver();
      }
    }, 1000);
  }
  currentQuestion++;
  showQuestion();
}

function gameOver() {
  clearInterval(timerId);
  startButton.style.display = "none";
  scoreboard.textContent = `Your Score: ${score}`;
  // You can implement high score storage here (local storage, database etc.)
}

startButton.addEventListener("click", function() {
  currentQuestion++;
  showQuestion();
  startTimer();
});


/*

// Initialize the total score
let totalScore = 0;

function startGame() {
  timerCount = 60;
  startButton.disabled = true;

  startTimer();
}

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    // Tests if time has run out
    if (timerCount === 0) {
      clearInterval(timer);
      }  
  })
}

// Add the value of the selected answer to the total score and uncheck the other radio buttons
function updateScore(selectedAnswer) {
  // Check if a radio button has been selected
  if (!selectedAnswer.checked) {
    return;
  }

  // Add the value of the selected answer to the total score
  totalScore += parseInt(selectedAnswer.value);

  // Get all the radio buttons
  const radioButtons = document.getElementsByName("answer");
  // Loop through the radio buttons
  for (const radioButton of radioButtons) {
    // If the radio button is not the selected answer, uncheck it
    if (radioButton !== selectedAnswer) {
      radioButton.checked = false;
    }
  }
}
// Show the next question
function showNextQuestion() {

  // Hide the form
  document.getElementById("#form").style.display = "none";

  // Show the question and answers
  document.getElementById("question").style.display = "block";
  document.getElementById("answers").style.display = "block";
  document.getElementById("next-button").style.display = "block";

  // Check if the current question is the last question
  if(currentQuestionIndex < questions.length){
    // If it is not, get the current question
    const currentQuestion = questions[currentQuestionIndex];

    // Update the question text
    document.getElementById("question").innerHTML = currentQuestion.question;
    //clear answers
    document.getElementById("answers").innerHTML = '';
    // Show the answers for the current question
    for (const answer of currentQuestion.answers) {
      document.getElementById("answers").innerHTML += `
        <input type="radio" name="answer" value="${answer.value}" onchange="updateScore(this)"> ${answer.text}<br>
      `;
    }

    // Update the current question index
    currentQuestionIndex++;
  }
  if (currentQuestionIndex === questions.length) {
      // If it is, hide the "Next" button and show the "Submit" button
      document.getElementById("next-button").style.display = "none";
      document.getElementById("submit-button").style.display = "block";
  }
}

// Show the total score
function showTotalScore() {
  // Hide the question and answers
  document.getElementById("question").style.display = "none";
  document.getElementById("answers").style.display = "none";
  document.getElementById("submit-button").style.display = "none";

  // Show the total score
  document.getElementById("total-score").style.display = "block";
  document.getElementById("total-score").innerHTML = "Total Score: " + totalScore;
}; 

startButton.on('click', startGame);

*/
