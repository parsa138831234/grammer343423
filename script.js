
let current = 0;
let score = 0;
let timer;
let selectedAnswer = null;

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const timeSpan = document.getElementById("time");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const feedbackText = document.getElementById("feedback-text");

function startQuiz() {
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  questionNumber.textContent = `سوال ${current + 1} از ${questions.length}`;
  questionText.textContent = q.text;
  optionsContainer.innerHTML = "";
  submitBtn.style.display = "none";
  nextBtn.style.display = "none";
  selectedAnswer = null;

  const shuffled = [...q.options].sort(() => Math.random() - 0.5);
  shuffled.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => selectOption(div, opt);
    optionsContainer.appendChild(div);
  });

  let seconds = 15;
  timeSpan.textContent = seconds;
  clearInterval(timer);
  timer = setInterval(() => {
    seconds--;
    timeSpan.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(timer);
      submitAnswer();
    }
  }, 1000);
}

function selectOption(div, value) {
  selectedAnswer = value;
  Array.from(document.getElementsByClassName("option")).forEach(el => {
    el.style.border = "none";
  });
  div.style.border = "2px solid #fff";
  submitBtn.style.display = "inline-block";
}

submitBtn.onclick = () => {
  clearInterval(timer);
  submitAnswer();
};

function submitAnswer() {
  const correct = questions[current].answer;
  const options = document.getElementsByClassName("option");

  Array.from(options).forEach(opt => {
    if (opt.textContent === correct) {
      opt.classList.add("correct");
    } else if (opt.textContent === selectedAnswer) {
      opt.classList.add("wrong");
    }
  });

  if (selectedAnswer === correct) score++;

  submitBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("question-box").style.display = "none";
  resultBox.style.display = "block";
  const percent = Math.round((score / questions.length) * 100);
  scoreText.textContent = `نمره شما: ${percent}%`;
  feedbackText.textContent = percent >= 80
    ? "آفرین! عملکرد بسیار خوبی داشتید."
    : percent >= 50
    ? "خوب بود، ولی می‌توانید بهتر عمل کنید."
    : "نیاز به تمرین بیشتری دارید.";
}

window.onload = startQuiz;
