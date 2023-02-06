import { useState, useEffect } from 'react';
import IState from '../interfaces/IState';
import { useNavigate } from 'react-router-dom';
import Question from '../components/Question';
import axios from 'axios';

const Quiz = () => {

  const navigate = useNavigate();

  const [quizData, setQuizData] = useState<IState>({
    id: localStorage.getItem('USER_ID'),
    questions: [
      {
        'category': '',
        'id': '',
        'correctAnswer': '',
        'incorrectAnswers': [],
        'question': '',
        'tags': [],
        'type': '',
        'difficulty': '',
        'regions': [ ],
        'isNiche': false,
        },
    ],
    currentQuestionIndex: 0,
    currentAnswer: '',
    showResults: false,
    score: 0,
    timeTaken: 0,
    errorMessage: '',
  });
  const [startTimer, setStartTimer] = useState(true);
  const [timeTaken, setTimeTaken] = useState(0);

  const nextAction = () => {
    const showResults =
    quizData.currentQuestionIndex === quizData.questions.length -1;

    const currentQuestionIndex = showResults
      ? quizData?.currentQuestionIndex
      : quizData?.currentQuestionIndex + 1;

    setQuizData({
      ...quizData,
      currentAnswer: '',
      showResults: showResults,
      currentQuestionIndex: currentQuestionIndex,
    });
    if (showResults) {
      setStartTimer(false)
      const result = {
        score: quizData.score,
        timeTaken: timeTaken,
      }
    axios.post(`http://localhost:8080/api/leaderboard/${quizData.id}`, result);
    }
  }

  const msConverter = (ms:number) => {
    const minutes:number = Math.floor(ms / 60000);
    const seconds:number = ((ms % 60000) / 1000);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds.toFixed(1)}s`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://the-trivia-api.com/api/questions')
      try {
        setQuizData({
          ...quizData,
          questions: response?.data,
        })
      } catch (err:any) {
        setQuizData({
          ...quizData,
          errorMessage: err.message,
        })
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <main className='container mt-5 mx-auto'>
      {quizData.showResults && (
        <section className='text-white text-center'>
          <h1
            className='mt-5 fw-bolder text-center text-white'
            style={{margin: '2rem auto', fontSize: '4rem'}}>QUIZZIE RASCAL</h1>
          <h2 className='mt-5'>Congratulations!!</h2>
          <h3 className='mb-5'>{`You completed the quiz in ${msConverter(timeTaken)}!`}</h3>
            <h3 className='text-white text-center mb-5'>
              {`You've got ${quizData.score} of 
              ${quizData?.questions?.length} correct`}.
            </h3>
          <h6
            onClick={() => navigate('/home')}
            className='next-button mt-5'>
            Go To Homepage
          </h6>
        </section>
      )}
      {!quizData.showResults && (
        <section className='text-white'>
          <h1
            className='mt-5 fw-bolder text-center text-white'
            style={{margin: '2rem auto', fontSize: '4rem'}}>QUIZZIE RASCAL</h1>
          <h2 className='text-center'>
            Question {quizData?.currentQuestionIndex + 1}/
            {quizData?.questions?.length}
          </h2>
          <Question
            quizData={quizData}
            setQuizData={setQuizData}
            startTimer={startTimer}
            timeTaken={timeTaken}
            setTimeTaken={setTimeTaken}/>
          <div
            className='container d-flex justify-content-center align-items-center'
            style={{height: '6rem'}}>
          {quizData.currentAnswer && (
            <button
              onClick={nextAction}
              className='next-button'>
                {quizData?.currentQuestionIndex + 1 === quizData?.questions?.length ?
                 'VIEW RESULTS' : 
                 'NEXT QUESTION'}
            </button>
          )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Quiz;
