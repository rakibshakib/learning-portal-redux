export const calculateScore = (quizData, userSelectedData) => {
  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;
  userSelectedData.forEach((userAnswer) => {
    const quizQuestion = quizData.find((q) => q.id === userAnswer.id);
    if (quizQuestion) {
      const correctOptions = quizQuestion.options.filter((o) => o.isCorrect);
      const selectedOptions = userAnswer.selected;
      if (
        correctOptions.length === selectedOptions.length &&
        correctOptions.every((o) => selectedOptions.find((s) => s.id === o.id))
      ) {
        score += 5;
        correctCount += 1;
      } else {
        wrongCount += 1;
      }
    }
  });
  return { correctCount, score, wrongCount };
};
