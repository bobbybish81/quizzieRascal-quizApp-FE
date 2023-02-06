import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

interface PlayPanelProps {
  user: string | undefined,
}
const PlayPanel = ({user}: PlayPanelProps) => {
  
  const navigate = useNavigate();

  return (
      <section className='d-flex flex-column justify-content-center align-items-center pt-5'>
        <h1 className='heading fw-bolder text-center text-white'>QUIZZIE RASCAL</h1>
        <p className='greeting text-center text-white'>Welcome<b>{` ${user}`}</b></p>
        <div className='d-flex justify-content-center m-5'>
          <button
            className='play-btn fw-bold px-5 py-2'
            onClick={() => navigate('/quiz')}>Play Quiz</button>
        </div>
    </section>
  )
}

export default PlayPanel