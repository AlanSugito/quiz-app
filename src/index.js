window.addEventListener("DOMContentLoaded", () => {
  
submitButton.addEventListener("click", logIn)
submitButton.addEventListener("submit", logIn)
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
exitButton.addEventListener("click", exitQuiz);

login.addEventListener("submit", logIn)
})



