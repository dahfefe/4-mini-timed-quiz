var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var timer;
var timerCount;

var questions = [{
  question: "Commonly used data types DO NOT include:",
  answers: [
    { button: "strings", value: 0},
    { button: "booleans", value: 0},
    { button: "alerts", value: 1}, 
    { button: "numbers", value: 0},
  ]
}, {
  question: "The condition in an if / else statement is enclosed within _____.", 
  answers: [
    { button: "quotes", value: 0},
    { button: "curly brackets", value: 0},
    { button: "parentheses", value: 1}, 
    { button: "square brackets", value: 0},
  ]
}, {
  question: "Arrays in JavaScript can be used to store _____.", 
  answers: [
    { button: "numbers and strings", value: 0},
    { button: "other arrays", value: 0},
    { button: "booleans", value: 0}, 
    { button: "all of the above", value: 1},
  ]
}];

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


