interface IQuestions {
  category: string,
  id: string,
  correctAnswer: string,
  incorrectAnswers: string[],
  question: string,
  tags: string[],
  type: string,
  difficulty: string,
  regions: string[],
  isNiche: boolean,
}

export default IQuestions