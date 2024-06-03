
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
  }
  
  if (currentQuestion > questions.length) {
    // questionText.textContent = "You have finished the quiz!";
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
      checkAnswer(choices);
    });
  }
}

function checkAnswer(choices) {
  if (choices === questionDisplayedNow.answer) {
    // If user selects a correct answer, increase score by 5
    score += 5;
    // If answer is correct display 'Correct Answer!" for one second
    correctAnswerDisplay.classList.remove("hidden");
    setTimeout(() => {
        correctAnswerDisplay.classList.add("hidden");
    }, 1000);
  } else {
    timerId = setInterval(function() {
      remainingTime = Math.max(0, parseInt(timerElement.textContent) - 5);
      timerElement.textContent = remainingTime;
      
    }, 1000);
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


/*


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
