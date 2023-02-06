import { ILeaderboard } from '../interfaces/ILeaderboard';
import '../styles/Quiz.css';

interface TableProps {
  leaderboard: ILeaderboard,
}

const Leaderboard = ({leaderboard} : TableProps) => {

  const msConverter = (ms:number) => {
    const minutes:number = Math.floor(ms / 60000);
    const seconds:number = ((ms % 60000) / 1000);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds.toFixed(1)}s`;
  }

  return (
    /* mobile view */
    <>
    <h2 className='mt-3 mb-3'>LEADERBOARD</h2>
    <table className="mobile-table text-white w-100">
      <thead>
        <tr>
          <th scope='col'>Username</th>
          <th className='text-center' scope='col'>Played</th>
          <th className='text-center' scope='col'>Average Score</th>
        </tr>
      </thead>
      <tbody>
      {leaderboard.userData.map((user, index) => (
        <tr key={index}>
          <th scope='row'>{user.username}</th>
          <td className='text-center'>{user.totalPlays}</td>
          <td className='text-center'>{user.averageScore}</td>
        </tr>
      ))}
      </tbody>
    </table>

    {/* desktop view */}
    <article
      className='text-white mx-auto d-flex flex-column align-items-center'>
      <h2 className='mt-3 mb-3'>LEADERBOARD</h2>
      <table className="desktop-table text-white">
        <thead>
          <tr>
            <th scope='col'>Username</th>
            <th className='text-center' scope='col'>Played</th>
            <th className='text-center' scope='col'>Average Score</th>
            <th className='text-center' scope='col'>Average Time</th>
            <th className='text-center' scope='col'>Quickest Time</th>
          </tr>
        </thead>
        <tbody>
        {leaderboard.userData.map((user, index) => (
          <tr key={index}>
            <th scope='row'>{user.username}</th>
            <td className='text-center'>{user.totalPlays}</td>
            <td className='text-center'>{user.averageScore}</td>
            <td className='text-center'>{msConverter(user.averageTime)}</td>
            <td className='text-center'>{msConverter(user.quickestTime)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </article>
    </>
  )
}

export default Leaderboard