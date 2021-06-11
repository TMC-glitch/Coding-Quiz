var timerId;
var time = 60;
var currentQuestionIndex = 0;
var correctAnswer = 0;
var finalScore = 0;

// DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var reportEl = document.getElementById("report");
var timerDiv = document.getElementById("timer");
var questionTitle = document.getElementById("question-title");
var startScreenEl = document.getElementById("start-screen");
var finalScoreEl = document.getElementById("final-score");
var endScreenEl = document.getElementById("end-screen");

function startQuiz() {
  //  Resets variable
  correctAnswer = 0;
  currentQuestionIndex = 0;
  time = 60;

  // hides starting screen
  timerDiv.classList.remove("hide");
  startScreenEl.setAttribute("class", "hide");

  //   un-hides questions
  questionsEl.classList.remove("hide");

  //   starts the timer
  timerId = setInterval(clockTick, 1000);

  //   shows current time
  timerEl.textContent = time;

  getQuestion();
}

function clockTick() {
  time = time - 1;
  timerEl.textContent = time;

  if (time === 0) {
    endQuiz();
  }
}

// Gets question object from array
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function (choice, i) {
    var choicesBtn = document.createElement("button");

    choicesBtn.setAttribute("class", "choice");

    choicesBtn.setAttribute("value", choice);

    choicesBtn.textContent = i + 1 + ". " + choice;

    choicesBtn.onclick = questionClick;

    choicesEl.appendChild(choicesBtn);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    // docs time
    time -= 10;

    if (time <= 0) {
      endQuiz();
      time = 0;
    }

    // displays new time to page
    timerEl.textContent = time;

    // Displays if answered Incorrect or Correct
    reportEl.textContent = "Incorrect!";
  } else {
    reportEl.textContent = "Correct!";
    correctAnswer++;
  }

  reportEl.setAttribute("class", "report");
  setTimeout(function () {
    reportEl.setAttribute("class", "hide report");
  }, 1000);

  // moves on to next question
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

function endQuiz() {
  // stops timer
  clearInterval(timerId);

  // shows the end screen
  endScreenEl.removeAttribute("class");
  finalScore = (correctAnswer / 6) * 100;
  finalScore = finalScore.toFixed(2);

  //  shows final score
  finalScoreEl.textContent =
    "You answered " +
    correctAnswer +
    " correct out of 6 your score is" +
    " " +
    finalScore;

  // hides questions
  questionsEl.setAttribute("class", "hide");
}
function saveScore() {
  var initials = initialsEl.value;
  if (initials != "") {
  }
  var store = {
    initials: initials,
    score: finalScore,
  };

  // Empty array to store
  var a = [];
  a = JSON.parse(localStorage.getItem("Highscores")) || [];
  a.push(store);
  localStorage.setItem("Highscores", JSON.stringify(a));
  startScreenEl.classList.remove("hide");
  finalScoreEl.setAttribute("class", "hide");
  endScreenEl.setAttribute("class", "hide");
  reportEl.textContent = "";
}

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveScore);
