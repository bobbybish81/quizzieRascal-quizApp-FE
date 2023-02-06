import { useEffect } from 'react';

interface StopwatchProps {
  startTimer: boolean,
  timeTaken: number, 
  setTimeTaken: (time:any) => void,
}

const Stopwatch = ({ startTimer, timeTaken, setTimeTaken } : StopwatchProps) => {

  useEffect(() => {
    let interval:any;
    if (startTimer) {
      interval = setInterval(() => {
        setTimeTaken((prevTime: number) => prevTime + 10);
      }, 10);
    } else if (!startTimer) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [setTimeTaken, startTimer]);

  return (
    <div className='text-white text-center my-3'>
      <span>{("0" + Math.floor((timeTaken / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((timeTaken / 1000) % 60)).slice(-2)}:</span>
      <span>{("0" + ((timeTaken / 10) % 100)).slice(-2)}</span>
    </div>
  );
};

export default Stopwatch;