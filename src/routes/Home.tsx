import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { ILeaderboard } from '../interfaces/ILeaderboard';
import PlayPanel from '../components/PlayPanel';
import Leaderboard from '../components/Leaderboard';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {

  const [leaderboard, setLeaderboard] = useState<ILeaderboard>({
    loading: false,
    userData: [],
    errorMessage: '',
  });

  useEffect(() => {
    setLeaderboard({...leaderboard, loading: true})
    const fetchData = async () => {
      axios.get('http://localhost:8080/api/leaderboard')
        .then(response => setLeaderboard({
          ...leaderboard,
          loading: false,
          userData: response.data,
        }))
        .catch ((error) => setLeaderboard({
          ...leaderboard,
          loading: false,
          errorMessage: error.message,
        }))
      }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const signOut = useSignOut();

  const logout = () => {
    localStorage.removeItem('USER_ID')
    signOut();
    navigate('/')
  }

  const user = leaderboard?.userData.find(obj => obj.id === localStorage.getItem('USER_ID'));

  return (
    <main className='homepage'>
      <PlayPanel user={user?.username}/>
      <div className='d-flex justify-content-center'>
        <p
          className='log-out mb-5'
          onClick={logout}>Log Out</p>
      </div>
      <Leaderboard leaderboard={leaderboard}/>
    </main>
    


  )
}

export default Home