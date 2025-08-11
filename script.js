const questions = [
  {
    question: "What does 'var' stand for in JavaScript?",
    options: ["Variable", "Variant", "Variation", "None of the above"],
    answer: "Variable"
  },
  {
    question: "Which method converts JSON to a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.objectify()", "JSON.convert()"],
    answer: "JSON.parse()"
  },
  {
    question: "How do you declare an arrow function?",
    options: ["function => {}", "() => {}", "=> function() {}", "arrow() => {}"],
    answer: "() => {}"
  },
  {
    question: "What is the output of `typeof NaN`?",
    options: ["NaN", "number", "undefined", "object"],
    answer: "number"
  },
  {
    question: "Which keyword is used to prevent reassignment?",
    options: ["let", "var", "const", "static"],
    answer: "const"
  },
  {
    question: "What does `setTimeout()` do?",
    options: ["Repeats code", "Stops code", "Delays code", "Skips code"],
    answer: "Delays code"
  },
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A type of loop",
      "A function inside another function with access to outer scope",
      "A data type",
      "An error"
    ],
    answer: "A function inside another function with access to outer scope"
  }
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("light", themeToggle.checked);
});

function startTimer() {
  timeLeft = 30;
  timerEl.textContent = `Time: ${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer(null); // auto-fail
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreEl.textContent = "";
  startTimer();

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentIndex].answer;
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "var(--correct)";
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "var(--wrong)";
    }
  });

  if (selected === correct) {
    correctSound.play();
    score++;
  } else {
    wrongSound.play();
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  questionEl.textContent = "🎉 Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreEl.textContent = `Your Score: ${score} out of ${questions.length}`;
  timerEl.textContent = "";
}

showQuestion();

