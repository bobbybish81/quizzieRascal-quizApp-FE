import { useState, useEffect } from 'react';
import Stopwatch from './Stopwatch';
import Answers from './Answers';
import IState from '../interfaces/IState';
import IQuestions from '../interfaces/IQuestions';

interface QuestionProps {
  quizData: IState,
  setQuizData: (quizData: IState) => void,
  startTimer: boolean,
  timeTaken: number, 
  setTimeTaken: (time:any) => void,
}

const Question = ({ quizData, setQuizData, startTimer, timeTaken, setTimeTaken } : QuestionProps) => {

  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion:IQuestions = quizData?.questions[quizData?.currentQuestionIndex]

  const selectAnswer = (answer: string) => {
    let score:number
    if (quizData?.questions) {
      score =
      answer ===
      currentQuestion.correctAnswer
          ? quizData.score + 1
          : quizData.score;
      setQuizData({
        ...quizData,
        currentAnswer: answer,
        score: score,
      })
    }
  }

  useEffect(()=> {
    const mergeAnswers = (question:IQuestions) => {
      if (!question) {
        return [];
      }
      setAnswers([
        question.correctAnswer,
        ...question.incorrectAnswers,
      ]);
    };
    if (quizData?.questions) {
      mergeAnswers(currentQuestion)
    }
  }, [currentQuestion, quizData?.questions])

  return (
    <div>
      <h3 className='text-white text-center my-3'>{currentQuestion.question}</h3>
      <Stopwatch
        startTimer={startTimer}
        timeTaken={timeTaken}
        setTimeTaken={setTimeTaken}/>
      <div className='answers mt-5'>
        {answers.sort().map((answer: string, index: number) => (
          <Answers
            answerText={answer}
            currentAnswer={quizData?.currentAnswer}
            correctAnswer={quizData.questions ? quizData?.questions[quizData?.currentQuestionIndex].correctAnswer : null}
            key={index}
            index={index}
            onSelectAnswer={() =>
              selectAnswer(answer)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Question;