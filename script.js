const startButton = document.querySelector(".start-button");
const nextButton = document.querySelector(".next-button");
const questionContainer = document.querySelector(".question-container");
const answerButtonContainer = document.querySelector(".answer-buttons");
const questionElement = document.querySelector(".question");
const exitButton = document.querySelector(".exit-button");
const correctAudio = document.querySelector(".correct-sound");
const wrongAudio = document.querySelector(".wrong-sound");
const backsound = document.querySelector(".backsound");

let shuffledQuestion, currentQuestionIndex;

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
exitButton.addEventListener("click", exitQuiz);

console.log(answerButtonContainer);
function startQuiz() {
  exitButton.classList.remove("hide");
  questionContainer.classList.remove("hide");
  startButton.classList.add("hide");
  shuffledQuestion = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
  // backsound.play();
}

function setNextQuestion() {
  resetQuestion();
  showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonContainer.append(button);
  });
}

function resetQuestion() {
  nextButton.classList.add("hide");
  while (answerButtonContainer.firstChild) {
    answerButtonContainer.removeChild(answerButtonContainer.firstChild);
  }
}

function selectAnswer(e) {
  const selectedAnswer = e.target;
  setStatus(selectedAnswer, selectedAnswer.dataset.correct);
  Array.from(answerButtonContainer.children).forEach((button) => {
    setStatus(button, button.dataset.correct);
  });
  if (shuffledQuestion.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
  if (selectedAnswer.dataset.correct) {
    correctAudio.play();
  } else {
    wrongAudio.play();
  }
}

function setStatus(element, correct) {
  clearStatus(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatus(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function exitQuiz() {
  startButton.innerText = "Start";
  startButton.classList.remove("hide");
  questionContainer.classList.add("hide");
  exitButton.classList.add("hide");
  nextButton.classList.add("hide");
}
