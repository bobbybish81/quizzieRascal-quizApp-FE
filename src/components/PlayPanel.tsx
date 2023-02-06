import { useNavigate } from 'react-router-dom';
import '../styles/Quiz.css';

interface PlayPanelProps {
  user: string | undefined,
}
const PlayPanel = ({user}: PlayPanelProps) => {
  
  const navigate = useNavigate();

  return (
      <section className='d-flex flex-column justify-content-center align-items-center pt-5'>
        <h1 className='heading mt-5 fw-bolder text-center text-white'>QUIZZIE RASCAL</h1>
        <h3 className='text-center text-white'>{`Greetings ${user}!`}</h3>
        <div className='d-flex justify-content-center m-5'>
          <button
            className='play-btn fw-bold px-5 py-2'
            onClick={() => navigate('/quiz')}>Play Quiz</button>
        </div>
    </section>
  )
}

export default PlayPanel