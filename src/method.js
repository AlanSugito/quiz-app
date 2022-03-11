let shuffledQuestion, currentQuestionIndex;
let correctPoint = 0;
let wrongPoint = 0;

function startQuiz() {
  exitButton.classList.remove("hide");
  questionContainer.classList.remove("hide");
  startButton.classList.add("hide");
  shuffledQuestion = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
  startAudio.play()
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
    startButton.addEventListener("click", () => {
      correctScore.innerText = correctPoint *= 0;
      wrongScore.innerText = wrongPoint *= 0;
    });
    endAudio.play()
  }
  if (selectedAnswer.dataset.correct) {
    correctAudio.play();
    correctPoint++;
  } else {
    wrongAudio.play();
    wrongPoint++;
  }
  correctScore.innerText = correctPoint;
  wrongScore.innerText = wrongPoint;
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
  correctScore.innerText = correctPoint *= 0;
  wrongScore.innerText = wrongPoint *= 0;
}

function logIn() {
  login.classList.add("hide");
  quiz.classList.remove("hide");
  quiz.classList.add("animate");
  dashboard.classList.add("animate")
  dashboard.classList.remove("hide");
  nameTag.innerText = inputName.value;
  inputName.value = "";
}
