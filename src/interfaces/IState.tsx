import IQuestions from './IQuestions';

interface IState {
  id: string | null,
  questions: IQuestions[]
  currentQuestionIndex: number,
  currentAnswer: string,
  showResults: boolean,
  score: number,
  timeTaken: number,
  errorMessage: string,
}

export default IState