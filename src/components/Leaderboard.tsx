import { ILeaderboard } from '../interfaces/ILeaderboard';
import '../styles/Home.css';

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
    <article
      className='mobile-table w-100'>
      <h2 className='text-white mt-3 mb-3 mx-auto'>LEADERBOARD</h2>
      <table
        className="text-white mx-auto"
        style={{width: '90%'}}>
        <thead>
          <tr className='tablerow'>
            <th style={{width: '40%'}} scope='col'>Username</th>
            <th className='text-center' style={{width: '30%'}} scope='col'>Played</th>
            <th className='text-center' style={{width: '30%'}} scope='col'>Average Score</th>
          </tr>
        </thead>
        <tbody>
        {leaderboard.userData.map((user, index) => (
          <tr key={index} className='tablerow'>
            <th scope='row'>{user.username}</th>
            <td className='text-center'>{user.totalPlays}</td>
            <td className='text-center'>{user.averageScore}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </article>

    {/* desktop view */}
    <article
      className='desktop-table w-100'>
      <h2 className='mt-3 mb-3'>LEADERBOARD</h2>
      <table className='text-white w-50'>
        <thead>
          <tr className='tablerow'>
            <th className='tablerowhead' scope='col'>Username</th>
            <th className='tablehead text-center' scope='col'>Played</th>
            <th className='tablehead text-center' scope='col'>Average Score</th>
            <th className='tablehead text-center' scope='col'>Average Time</th>
            <th className='tablehead text-center' scope='col'>Quickest Time</th>
          </tr>
        </thead>
        <tbody>
        {leaderboard.userData.map((user, index) => (
          <tr key={index} className='tablerow'>
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