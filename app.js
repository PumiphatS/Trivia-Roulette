const newQuestionBtn = document.getElementById("newQuestionBtn");
const scoreElement = document.getElementById("score");
const container = document.getElementById("questionContainer");

const questions = [
  {
    question: "Which planet is closest to the sun?",
    correctAns: "Mercury",
    incorrectAns: ["Venus", "Mars", "Earth"],
  },
  {
    question: "What is the capital of Canada?",
    correctAns: "Ottawa",
    incorrectAns: ["Toronto", "Vancouver", "Montreal"],
  },
  {
    question: "What is the chemical symbol for gold?",
    correctAns: "Au",
    incorrectAns: ["Ag", "Gd", "Go"],
  },
  {
    question: "Who painted the Mona Lisa?",
    correctAns: "Leonardo da Vinci",
    incorrectAns: ["Michelangelo", "Raphael", "Vincent van Gogh"],
  },
  {
    question: "In which year did World War II end?",
    correctAns: "1945",
    incorrectAns: ["1939", "1942", "1950"],
  },
  {
    question: "What does CPU stand for?",
    correctAns: "Central Processing Unit",
    incorrectAns: ["Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],
  },
  {
    question: "What is the smallest bone in the human body?",
    correctAns: "Stapes (in the ear)",
    incorrectAns: ["Pinky toe bone", "Coccyx", "Hyoid"],
  },
  {
    question: "How many sides does a hexagon have?",
    correctAns: "6",
    incorrectAns: ["5", "7", "8"],
  },
  {
    question: "Which element has the atomic number 1?",
    correctAns: "Hydrogen",
    incorrectAns: ["Helium", "Oxygen", "Carbon"],
  },
  {
    question: "Which city hosted the 2016 Summer Olympics?",
    correctAns: "Rio de Janeiro",
    incorrectAns: ["Tokyo", "London", "Beijing"],
  },
];

let currentQuestion = null;
let score = 0;
let totalAnswered = 0;

function getRandomQuestion() {
  // to avoid same question twice in a row
  const choices =
    questions.length > 1
      ? questions.filter((q) => q !== currentQuestion)
      : questions;

  return choices[Math.floor(Math.random() * choices.length)];
}

function shuffle(array) {
  const copy = [...array];

  copy.forEach((_, step) => {
    const i = copy.length - 1 - step;
    if (i === 0) return;

    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  });

  return copy;
}

function renderQuestion(q) {
  container.innerHTML = "";

  const header = document.createElement("h2");
  header.textContent = q.question;
  container.appendChild(header);

  const answers = shuffle([q.correctAns, ...q.incorrectAns]);

  answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = answer;
    btn.addEventListener("click", () => handleAnswer(btn, answer, q));
    container.appendChild(btn);
  });

  const feedback = document.createElement("p");
  feedback.id = "feedback";
  container.appendChild(feedback);
}

function handleAnswer(clickedBtn, answer, q) {
  const isCorrect = answer === q.correctAns;
  const feedback = document.getElementById("feedback");

  // disable all answer buttons so the question can't be answered twice
  container.querySelectorAll(".answer").forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === q.correctAns) btn.classList.add("correct");
  });

  totalAnswered++;
  if (isCorrect) {
    score++;
    feedback.textContent = "Correct!";
  } else {
    clickedBtn.classList.add("wrong");
    feedback.textContent = `No!!! The correct answer is: ${q.correctAns}`;
  }

  updateScore();
}

function updateScore() {
  scoreElement.textContent = `Score: ${score} / ${totalAnswered}`
}

newQuestionBtn.addEventListener("click", () => {
  currentQuestion = getRandomQuestion();
  renderQuestion(currentQuestion);
});ß