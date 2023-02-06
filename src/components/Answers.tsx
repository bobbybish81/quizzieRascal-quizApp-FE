import '../styles/Answers.css';

interface AnswerProps {
  answerText: string,
  index: any,
  onSelectAnswer: (string:string) => void,
  currentAnswer: string,
  correctAnswer: string | null,
}

const Answers = ({ 
  answerText,
  index,
  onSelectAnswer,
  currentAnswer,
  correctAnswer} : AnswerProps ) => {


  const letterMapping = ['A', 'B', 'C', 'D'];
  const isCorrectAnswer = currentAnswer && answerText === correctAnswer;
  const isWrongAnswer = currentAnswer === answerText && currentAnswer !== correctAnswer;
  const correctAnswerClass = isCorrectAnswer ? 'correct-answer' : '';
  const wrongAnswerClass = isWrongAnswer ? 'wrong-answer' : '';
  const disabledClass = currentAnswer ? 'disabled-answer' : '';

  return (
    <div
      className={`answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`}
      onClick={() => onSelectAnswer(answerText)}
    >
      <div className='answer-letter'>{letterMapping[index]}</div>
      <div className='answer-text'>{answerText}</div>
    </div>
  );
};

export default Answers;